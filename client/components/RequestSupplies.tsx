import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Plus, X, Package, AlertTriangle } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useWarehouse } from "@/hooks/use-warehouse";
import { RequestUrgency, ItemCategory } from "@shared/warehouse";

interface RequestSuppliesProps {
  department: string;
  departmentName: string;
  requestedBy: string;
  requestedByName: string;
  patientId?: string;
  patientName?: string;
  onRequestCreated?: (requestId: string) => void;
  buttonVariant?: "default" | "outline" | "secondary" | "ghost";
  buttonSize?: "default" | "sm" | "lg" | "icon";
  buttonText?: string;
}

interface RequestItemInput {
  itemId: string;
  itemName: string;
  quantity: number;
  unit: string;
  notes?: string;
}

/**
 * Request Supplies Component
 * Reusable component for any department to request supplies from warehouse
 * Can be used with or without patient context
 */
export function RequestSupplies({
  department,
  departmentName,
  requestedBy,
  requestedByName,
  patientId,
  patientName,
  onRequestCreated,
  buttonVariant = "default",
  buttonSize = "default",
  buttonText,
}: RequestSuppliesProps) {
  const { t } = useTranslation();
  const { getInventoryItems, createStockRequest } = useWarehouse();
  const [open, setOpen] = useState(false);
  const [urgency, setUrgency] = useState<RequestUrgency>("normal");
  const [notes, setNotes] = useState("");
  const [selectedItems, setSelectedItems] = useState<RequestItemInput[]>([]);
  const [currentCategory, setCurrentCategory] = useState<ItemCategory | "all">("all");
  const [searchTerm, setSearchTerm] = useState("");

  const inventory = getInventoryItems({
    category: currentCategory !== "all" ? currentCategory : undefined,
    searchTerm,
  });

  const handleAddItem = (itemId: string) => {
    const item = inventory.find((i) => i.id === itemId);
    if (!item) return;

    // Check if already added
    if (selectedItems.find((i) => i.itemId === itemId)) {
      // Increase quantity
      setSelectedItems((prev) =>
        prev.map((i) =>
          i.itemId === itemId ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
    } else {
      // Add new item
      setSelectedItems((prev) => [
        ...prev,
        {
          itemId: item.id,
          itemName: item.name,
          quantity: 1,
          unit: item.unit,
        },
      ]);
    }
  };

  const handleRemoveItem = (itemId: string) => {
    setSelectedItems((prev) => prev.filter((i) => i.itemId !== itemId));
  };

  const handleQuantityChange = (itemId: string, quantity: number) => {
    if (quantity < 1) return;
    setSelectedItems((prev) =>
      prev.map((i) => (i.itemId === itemId ? { ...i, quantity } : i))
    );
  };

  const handleSubmit = () => {
    if (selectedItems.length === 0) return;

    const request = createStockRequest({
      requestedBy,
      requestedByName,
      department,
      departmentName,
      items: selectedItems.map((item) => {
        const invItem = inventory.find((i) => i.id === item.itemId);
        return {
          itemId: item.itemId,
          itemName: item.itemName,
          requestedQuantity: item.quantity,
          availableQuantity: invItem?.currentStock || 0,
          dispensedQuantity: 0,
          unitPrice: invItem?.unitPrice || 0,
          unit: item.unit as any,
          notes: item.notes,
        };
      }),
      urgency,
      patientId,
      patientName,
      notes,
    });

    onRequestCreated?.(request.id);
    
    // Reset form
    setSelectedItems([]);
    setNotes("");
    setUrgency("normal");
    setSearchTerm("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={buttonVariant} size={buttonSize}>
          <Package className="mr-2 h-4 w-4" />
          {buttonText || t("warehouse.newRequest")}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t("warehouse.newRequest")}</DialogTitle>
          <DialogDescription>
            {departmentName}
            {patientName && ` - ${t("common.patientName")}: ${patientName}`}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Urgency */}
          <div className="space-y-2">
            <Label>{t("warehouse.urgency")}</Label>
            <Select value={urgency} onValueChange={(v) => setUrgency(v as RequestUrgency)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">
                  <div className="flex items-center">
                    {t("warehouse.normal")}
                  </div>
                </SelectItem>
                <SelectItem value="urgent">
                  <div className="flex items-center text-orange-600">
                    {t("warehouse.urgent")}
                  </div>
                </SelectItem>
                <SelectItem value="emergency">
                  <div className="flex items-center text-red-600">
                    <AlertTriangle className="mr-2 h-4 w-4" />
                    {t("warehouse.emergency")}
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Selected Items */}
          {selectedItems.length > 0 && (
            <div className="space-y-2">
              <Label>{t("warehouse.requestedItems")} ({selectedItems.length})</Label>
              <div className="border rounded-lg p-3 space-y-2 max-h-48 overflow-y-auto">
                {selectedItems.map((item) => (
                  <div
                    key={item.itemId}
                    className="flex items-center justify-between gap-2 p-2 bg-muted rounded-md"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.itemName}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        min={1}
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(item.itemId, parseInt(e.target.value) || 1)
                        }
                        className="w-20 h-8"
                      />
                      <span className="text-sm text-muted-foreground">
                        {t(`warehouse.${item.unit}`)}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveItem(item.itemId)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Search and Filter */}
          <div className="space-y-2">
            <Label>{t("warehouse.searchItems")}</Label>
            <div className="flex gap-2">
              <Input
                placeholder={t("warehouse.searchItems")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
              <Select
                value={currentCategory}
                onValueChange={(v) => setCurrentCategory(v as ItemCategory | "all")}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("warehouse.allCategories")}</SelectItem>
                  <SelectItem value="medical_equipment">
                    {t("warehouse.categories.medical_equipment")}
                  </SelectItem>
                  <SelectItem value="surgical_instruments">
                    {t("warehouse.categories.surgical_instruments")}
                  </SelectItem>
                  <SelectItem value="medications">
                    {t("warehouse.categories.medications")}
                  </SelectItem>
                  <SelectItem value="consumables">
                    {t("warehouse.categories.consumables")}
                  </SelectItem>
                  <SelectItem value="laboratory">
                    {t("warehouse.categories.laboratory")}
                  </SelectItem>
                  <SelectItem value="radiology">
                    {t("warehouse.categories.radiology")}
                  </SelectItem>
                  <SelectItem value="ppe">
                    {t("warehouse.categories.ppe")}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Available Items */}
          <div className="space-y-2">
            <Label>{t("warehouse.inventory")}</Label>
            <div className="border rounded-lg max-h-64 overflow-y-auto">
              {inventory.length === 0 ? (
                <div className="p-4 text-center text-muted-foreground">
                  {t("common.noData")}
                </div>
              ) : (
                <div className="divide-y">
                  {inventory.slice(0, 20).map((item) => {
                    const isSelected = selectedItems.find((i) => i.itemId === item.id);
                    return (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-3 hover:bg-muted/50 cursor-pointer"
                        onClick={() => handleAddItem(item.id)}
                      >
                        <div className="flex-1">
                          <p className="font-medium">{item.name}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {t(`warehouse.categories.${item.category}`)}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {t("warehouse.available")}: {item.currentStock}{" "}
                              {t(`warehouse.${item.unit}`)}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={
                              item.status === "inStock"
                                ? "default"
                                : item.status === "lowStock"
                                ? "secondary"
                                : "destructive"
                            }
                          >
                            {t(`warehouse.${item.status}`)}
                          </Badge>
                          {isSelected && (
                            <Badge variant="default">
                              +{isSelected.quantity}
                            </Badge>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label>{t("warehouse.notes")}</Label>
            <Textarea
              placeholder={t("warehouse.notes")}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            {t("common.cancel")}
          </Button>
          <Button onClick={handleSubmit} disabled={selectedItems.length === 0}>
            <Plus className="mr-2 h-4 w-4" />
            {t("warehouse.newRequest")} ({selectedItems.length})
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
