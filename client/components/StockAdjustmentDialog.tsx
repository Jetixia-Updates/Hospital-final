import { useState } from "react";
import { useTranslation } from "react-i18next";
import { TrendingUp, TrendingDown } from "lucide-react";
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
import { InventoryItem, AdjustmentType } from "@shared/warehouse";

interface StockAdjustmentDialogProps {
  item: InventoryItem;
  onAdjustment?: (adjustment: any) => void;
  trigger?: React.ReactNode;
}

export function StockAdjustmentDialog({ item, onAdjustment, trigger }: StockAdjustmentDialogProps) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [adjustmentType, setAdjustmentType] = useState<AdjustmentType>("increase");
  const [quantity, setQuantity] = useState(0);
  const [reason, setReason] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = () => {
    const adjustment = {
      id: `adj_${Date.now()}`,
      adjustmentNumber: `ADJ-${Date.now()}`,
      adjustmentDate: new Date().toISOString(),
      itemId: item.id,
      itemName: item.name,
      adjustmentType,
      quantity,
      unit: item.unit,
      previousStock: item.currentStock,
      newStock: adjustmentType === "increase" || adjustmentType === "found" || adjustmentType === "return"
        ? item.currentStock + quantity
        : item.currentStock - quantity,
      reason,
      adjustedBy: "current-user",
      adjustedByName: "Current User",
      notes,
      createdAt: new Date().toISOString(),
    };

    onAdjustment?.(adjustment);
    setOpen(false);
    
    // Reset form
    setAdjustmentType("increase");
    setQuantity(0);
    setReason("");
    setNotes("");
  };

  const newStock = adjustmentType === "increase" || adjustmentType === "found" || adjustmentType === "return"
    ? item.currentStock + quantity
    : item.currentStock - quantity;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            {t("warehouse.adjustStock")}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{t("warehouse.stockAdjustment")}</DialogTitle>
          <DialogDescription>
            {item.name} - {t("warehouse.currentStock")}: {item.currentStock} {t(`warehouse.${item.unit}`)}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Adjustment Type */}
          <div className="space-y-2">
            <Label>{t("warehouse.adjustmentType")}</Label>
            <Select
              value={adjustmentType}
              onValueChange={(v) => setAdjustmentType(v as AdjustmentType)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="increase">
                  <div className="flex items-center">
                    <TrendingUp className="mr-2 h-4 w-4 text-green-600" />
                    {t("warehouse.increase")}
                  </div>
                </SelectItem>
                <SelectItem value="decrease">
                  <div className="flex items-center">
                    <TrendingDown className="mr-2 h-4 w-4 text-red-600" />
                    {t("warehouse.decrease")}
                  </div>
                </SelectItem>
                <SelectItem value="damage">{t("warehouse.damage")}</SelectItem>
                <SelectItem value="expiry">{t("warehouse.expiry")}</SelectItem>
                <SelectItem value="loss">{t("warehouse.loss")}</SelectItem>
                <SelectItem value="found">{t("warehouse.found")}</SelectItem>
                <SelectItem value="return">{t("warehouse.return")}</SelectItem>
                <SelectItem value="correction">{t("warehouse.correction")}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Quantity */}
          <div className="space-y-2">
            <Label>{t("warehouse.quantity")}</Label>
            <Input
              type="number"
              min={0}
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
              placeholder="0"
            />
          </div>

          {/* Stock Preview */}
          <div className="rounded-lg border p-4 bg-muted/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{t("warehouse.currentStock")}</p>
                <p className="text-2xl font-bold">{item.currentStock}</p>
              </div>
              <div className="text-2xl font-bold text-muted-foreground">→</div>
              <div>
                <p className="text-sm text-muted-foreground">{t("warehouse.newStock", "المخزون الجديد")}</p>
                <p className={`text-2xl font-bold ${
                  newStock > item.currentStock ? "text-green-600" : 
                  newStock < item.currentStock ? "text-red-600" : ""
                }`}>
                  {newStock}
                </p>
              </div>
            </div>
          </div>

          {/* Reason */}
          <div className="space-y-2">
            <Label>{t("warehouse.reason")}</Label>
            <Input
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder={t("warehouse.enterReason", "أدخل السبب")}
            />
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label>{t("warehouse.notes")}</Label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={t("warehouse.additionalNotes", "ملاحظات إضافية")}
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            {t("common.cancel")}
          </Button>
          <Button onClick={handleSubmit} disabled={quantity === 0 || !reason}>
            {t("common.save")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
