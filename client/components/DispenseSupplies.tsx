import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Check, Package, AlertCircle, User, Calendar } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { useWarehouse } from "@/hooks/use-warehouse";
import { useToast } from "@/hooks/use-toast";
import { StockRequest } from "@shared/warehouse";

interface DispenseSuppliesProps {
  request: StockRequest;
  dispensedBy: string;
  dispensedByName: string;
  onDispensed?: (success: boolean, billingAdded: boolean) => void;
  buttonVariant?: "default" | "outline" | "secondary";
  buttonSize?: "default" | "sm" | "lg";
}

/**
 * Dispense Supplies Component
 * Component for fulfilling stock requests and dispensing items
 * Automatically integrates with billing system for patient-related requests
 */
export function DispenseSupplies({
  request,
  dispensedBy,
  dispensedByName,
  onDispensed,
  buttonVariant = "default",
  buttonSize = "default",
}: DispenseSuppliesProps) {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { dispenseItems, approveRequest, getInventoryItem } = useWarehouse();
  const [open, setOpen] = useState(false);
  const [dispensingQuantities, setDispensingQuantities] = useState<Record<string, number>>({});

  // Initialize quantities with requested amounts
  useState(() => {
    const initialQuantities: Record<string, number> = {};
    request.items.forEach((item) => {
      initialQuantities[item.itemId] = item.requestedQuantity - item.dispensedQuantity;
    });
    setDispensingQuantities(initialQuantities);
  });

  const handleQuantityChange = (itemId: string, quantity: number) => {
    if (quantity < 0) return;
    setDispensingQuantities((prev) => ({
      ...prev,
      [itemId]: quantity,
    }));
  };

  const handleDispense = async () => {
    // Auto-approve if pending
    if (request.status === "pending") {
      approveRequest(request.id, dispensedBy);
    }

    // Prepare items to dispense
    const itemsToDispense = Object.entries(dispensingQuantities)
      .filter(([_, quantity]) => quantity > 0)
      .map(([itemId, quantity]) => ({ itemId, quantity }));

    if (itemsToDispense.length === 0) {
      toast({
        title: t("common.error", "خطأ"),
        description: t("warehouse.noItemsSelected", "لم يتم اختيار أي أصناف"),
        variant: "destructive",
      });
      return;
    }

    // Dispense items
    const result = dispenseItems(
      request.id,
      dispensedBy,
      dispensedByName,
      itemsToDispense
    );

    if (result.success) {
      onDispensed?.(true, result.billingAdded);
      setOpen(false);
    } else {
      onDispensed?.(false, false);
    }
  };

  const canDispense = request.status === "approved" || request.status === "pending";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={buttonVariant} size={buttonSize} disabled={!canDispense}>
          <Package className="mr-2 h-4 w-4" />
          {t("warehouse.dispenseItems")}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t("warehouse.dispenseItems")}</DialogTitle>
          <DialogDescription>
            {t("warehouse.requestNumber")}: {request.requestNumber}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Request Information */}
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {t("warehouse.requestedBy")}
                    </p>
                    <p className="font-medium">{request.requestedByName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {t("warehouse.department")}
                    </p>
                    <p className="font-medium">{request.departmentName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {t("warehouse.requestDate")}
                    </p>
                    <p className="font-medium">
                      {new Date(request.requestDate).toLocaleDateString("ar-EG")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {t("warehouse.urgency")}
                    </p>
                    <Badge
                      variant={
                        request.urgency === "emergency"
                          ? "destructive"
                          : request.urgency === "urgent"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {t(`warehouse.${request.urgency}`)}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Patient Info if available */}
              {request.patientId && request.patientName && (
                <div className="mt-4 pt-4 border-t">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-blue-600" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {t("common.patientName")}
                      </p>
                      <p className="font-medium text-blue-600">
                        {request.patientName} ({request.patientId})
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {t("warehouse.autoAddToBilling")}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Items to Dispense */}
          <div className="space-y-2">
            <Label>{t("warehouse.requestedItems")}</Label>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("warehouse.itemName")}</TableHead>
                  <TableHead>{t("warehouse.requestedQuantity")}</TableHead>
                  <TableHead>{t("warehouse.dispensedQuantity")}</TableHead>
                  <TableHead>{t("warehouse.availableQuantity")}</TableHead>
                  <TableHead>{t("warehouse.dispenseNow", "صرف الآن")}</TableHead>
                  <TableHead>{t("warehouse.status")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {request.items.map((item) => {
                  const inventoryItem = getInventoryItem(item.itemId);
                  const remainingToDispense = item.requestedQuantity - item.dispensedQuantity;
                  const dispensingQty = dispensingQuantities[item.itemId] || 0;
                  const canFullyDispense =
                    inventoryItem && inventoryItem.currentStock >= remainingToDispense;

                  return (
                    <TableRow key={item.itemId}>
                      <TableCell className="font-medium">{item.itemName}</TableCell>
                      <TableCell>
                        {item.requestedQuantity} {t(`warehouse.${item.unit}`)}
                      </TableCell>
                      <TableCell>
                        {item.dispensedQuantity > 0 ? (
                          <Badge variant="secondary">
                            {item.dispensedQuantity} {t(`warehouse.${item.unit}`)}
                          </Badge>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            !inventoryItem || inventoryItem.currentStock === 0
                              ? "destructive"
                              : inventoryItem.currentStock < remainingToDispense
                              ? "secondary"
                              : "default"
                          }
                        >
                          {inventoryItem?.currentStock || 0} {t(`warehouse.${item.unit}`)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          min={0}
                          max={Math.min(
                            remainingToDispense,
                            inventoryItem?.currentStock || 0
                          )}
                          value={dispensingQty}
                          onChange={(e) =>
                            handleQuantityChange(item.itemId, parseInt(e.target.value) || 0)
                          }
                          className="w-24"
                          disabled={!inventoryItem || inventoryItem.currentStock === 0}
                        />
                      </TableCell>
                      <TableCell>
                        {item.dispensedQuantity >= item.requestedQuantity ? (
                          <Badge variant="default" className="bg-green-600">
                            <Check className="mr-1 h-3 w-3" />
                            {t("warehouse.fulfilled")}
                          </Badge>
                        ) : !canFullyDispense ? (
                          <Badge variant="destructive">
                            <AlertCircle className="mr-1 h-3 w-3" />
                            {t("warehouse.insufficientStock", "مخزون غير كافي")}
                          </Badge>
                        ) : (
                          <Badge variant="outline">{t("warehouse.pending")}</Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {/* Notes */}
          {request.notes && (
            <div className="space-y-2">
              <Label>{t("warehouse.notes")}</Label>
              <Card>
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground">{request.notes}</p>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Billing Information */}
          {request.patientId && request.patientName && (
            <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <DollarSign className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-blue-900 dark:text-blue-100">
                      {t("warehouse.billingIntegration", "الربط بنظام المحاسبة")}
                    </p>
                    <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                      {t(
                        "warehouse.billingAutoMessage",
                        "سيتم إضافة الأصناف المصروفة تلقائياً إلى فاتورة المريض"
                      )}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            {t("common.cancel")}
          </Button>
          <Button
            onClick={handleDispense}
            disabled={Object.values(dispensingQuantities).every((q) => q === 0)}
          >
            <Check className="mr-2 h-4 w-4" />
            {t("warehouse.dispenseItems")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Add DollarSign import
import { DollarSign } from "lucide-react";
