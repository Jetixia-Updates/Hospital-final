import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ArrowRightLeft, Plus, X } from "lucide-react";
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

interface TransferItem {
  itemId: string;
  itemName: string;
  quantity: number;
  unit: string;
}

interface TransferItemsDialogProps {
  onTransfer?: (transfer: any) => void;
  trigger?: React.ReactNode;
}

export function TransferItemsDialog({ onTransfer, trigger }: TransferItemsDialogProps) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [fromWarehouse, setFromWarehouse] = useState("mainWarehouse");
  const [toWarehouse, setToWarehouse] = useState("");
  const [selectedItems, setSelectedItems] = useState<TransferItem[]>([]);
  const [notes, setNotes] = useState("");

  const warehouses = [
    { value: "mainWarehouse", label: t("warehouse.mainWarehouse") },
    { value: "pharmacyWarehouse", label: t("warehouse.pharmacyWarehouse") },
    { value: "surgeryWarehouse", label: t("warehouse.surgeryWarehouse") },
    { value: "emergencyWarehouse", label: t("warehouse.emergencyWarehouse") },
    { value: "labWarehouse", label: t("warehouse.labWarehouse") },
    { value: "radiologyWarehouse", label: t("warehouse.radiologyWarehouse") },
  ];

  const handleAddItem = () => {
    setSelectedItems([
      ...selectedItems,
      {
        itemId: "",
        itemName: "",
        quantity: 1,
        unit: "piece",
      },
    ]);
  };

  const handleRemoveItem = (index: number) => {
    setSelectedItems(selectedItems.filter((_, i) => i !== index));
  };

  const handleItemChange = (index: number, field: keyof TransferItem, value: any) => {
    const newItems = [...selectedItems];
    newItems[index] = { ...newItems[index], [field]: value };
    setSelectedItems(newItems);
  };

  const handleSubmit = () => {
    const transfer = {
      id: `trf_${Date.now()}`,
      transferNumber: `TRF-${Date.now()}`,
      transferDate: new Date().toISOString(),
      fromWarehouse,
      toWarehouse,
      items: selectedItems.map((item) => ({
        ...item,
        unitPrice: 0, // Would come from inventory lookup
      })),
      totalItems: selectedItems.length,
      transferredBy: "current-user",
      transferredByName: "Current User",
      status: "initiated",
      notes,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    onTransfer?.(transfer);
    setOpen(false);
    
    // Reset form
    setFromWarehouse("mainWarehouse");
    setToWarehouse("");
    setSelectedItems([]);
    setNotes("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button>
            <ArrowRightLeft className="mr-2 h-4 w-4" />
            {t("warehouse.newTransfer")}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t("warehouse.transferItems", "تحويل أصناف")}</DialogTitle>
          <DialogDescription>
            {t("warehouse.transferItemsDesc", "تحويل الأصناف بين المخازن المختلفة")}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Warehouses Selection */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{t("warehouse.fromWarehouse")}</Label>
              <Select value={fromWarehouse} onValueChange={setFromWarehouse}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {warehouses.map((wh) => (
                    <SelectItem key={wh.value} value={wh.value} disabled={wh.value === toWarehouse}>
                      {wh.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>{t("warehouse.toWarehouse")}</Label>
              <Select value={toWarehouse} onValueChange={setToWarehouse}>
                <SelectTrigger>
                  <SelectValue placeholder={t("warehouse.selectWarehouse", "اختر المخزن")} />
                </SelectTrigger>
                <SelectContent>
                  {warehouses.map((wh) => (
                    <SelectItem key={wh.value} value={wh.value} disabled={wh.value === fromWarehouse}>
                      {wh.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Items to Transfer */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>{t("warehouse.itemsToTransfer", "الأصناف المراد تحويلها")}</Label>
              <Button variant="outline" size="sm" onClick={handleAddItem}>
                <Plus className="mr-2 h-4 w-4" />
                {t("warehouse.addItem")}
              </Button>
            </div>

            {selectedItems.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground border rounded-lg">
                {t("warehouse.noItemsSelected", "لم يتم اختيار أصناف بعد")}
              </div>
            ) : (
              <div className="space-y-2">
                {selectedItems.map((item, index) => (
                  <div key={index} className="flex items-center gap-2 p-3 border rounded-lg">
                    <Input
                      placeholder={t("warehouse.itemName")}
                      value={item.itemName}
                      onChange={(e) => handleItemChange(index, "itemName", e.target.value)}
                      className="flex-1"
                    />
                    <Input
                      type="number"
                      min={1}
                      placeholder={t("warehouse.quantity")}
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, "quantity", parseInt(e.target.value) || 1)}
                      className="w-24"
                    />
                    <Select
                      value={item.unit}
                      onValueChange={(v) => handleItemChange(index, "unit", v)}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="piece">{t("warehouse.piece")}</SelectItem>
                        <SelectItem value="box">{t("warehouse.box")}</SelectItem>
                        <SelectItem value="pack">{t("warehouse.pack")}</SelectItem>
                        <SelectItem value="bottle">{t("warehouse.bottle")}</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveItem(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Summary */}
          {selectedItems.length > 0 && (
            <div className="rounded-lg border p-4 bg-muted/50">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">
                  {t("warehouse.totalItems")}:
                </span>
                <Badge variant="secondary">{selectedItems.length}</Badge>
              </div>
            </div>
          )}

          {/* Notes */}
          <div className="space-y-2">
            <Label>{t("warehouse.notes")}</Label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={t("warehouse.transferNotes", "ملاحظات حول عملية التحويل")}
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            {t("common.cancel")}
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!toWarehouse || selectedItems.length === 0 || selectedItems.some((item) => !item.itemName)}
          >
            <ArrowRightLeft className="mr-2 h-4 w-4" />
            {t("warehouse.executeTransfer", "تنفيذ التحويل")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
