import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Plus, Save } from "lucide-react";
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
import { ItemCategory, UnitType, StorageCondition } from "@shared/warehouse";

interface InventoryItemDialogProps {
  onItemAdded?: (item: any) => void;
  trigger?: React.ReactNode;
}

export function InventoryItemDialog({ onItemAdded, trigger }: InventoryItemDialogProps) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    nameAr: "",
    nameEn: "",
    category: "consumables" as ItemCategory,
    barcode: "",
    currentStock: 0,
    minimumStock: 0,
    maximumStock: 0,
    reorderLevel: 0,
    reorderQuantity: 0,
    unit: "piece" as UnitType,
    unitPrice: 0,
    location: "",
    warehouse: "mainWarehouse",
    manufacturer: "",
    batchNumber: "",
    expiryDate: "",
    storageConditions: "roomTemperature" as StorageCondition,
    leadTime: 7,
  });

  const handleSubmit = () => {
    const newItem = {
      id: `item_${Date.now()}`,
      name: formData.nameAr,
      ...formData,
      totalValue: formData.currentStock * formData.unitPrice,
      status: formData.currentStock === 0 ? "outOfStock" : 
              formData.currentStock <= formData.minimumStock ? "lowStock" : "inStock",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    onItemAdded?.(newItem);
    setOpen(false);
    
    // Reset form
    setFormData({
      nameAr: "",
      nameEn: "",
      category: "consumables",
      barcode: "",
      currentStock: 0,
      minimumStock: 0,
      maximumStock: 0,
      reorderLevel: 0,
      reorderQuantity: 0,
      unit: "piece",
      unitPrice: 0,
      location: "",
      warehouse: "mainWarehouse",
      manufacturer: "",
      batchNumber: "",
      expiryDate: "",
      storageConditions: "roomTemperature",
      leadTime: 7,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            {t("warehouse.addItem")}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t("warehouse.addNewItem", "إضافة صنف جديد")}</DialogTitle>
          <DialogDescription>
            {t("warehouse.fillItemDetails", "أدخل تفاصيل الصنف الجديد")}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4">
          {/* Basic Information */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{t("warehouse.nameAr", "الاسم بالعربي")}</Label>
              <Input
                value={formData.nameAr}
                onChange={(e) => setFormData({ ...formData, nameAr: e.target.value })}
                placeholder={t("warehouse.enterNameAr", "أدخل الاسم بالعربي")}
              />
            </div>
            <div className="space-y-2">
              <Label>{t("warehouse.nameEn", "الاسم بالإنجليزي")}</Label>
              <Input
                value={formData.nameEn}
                onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                placeholder={t("warehouse.enterNameEn", "Enter name in English")}
              />
            </div>
          </div>

          {/* Category and Unit */}
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>{t("warehouse.category")}</Label>
              <Select
                value={formData.category}
                onValueChange={(v) => setFormData({ ...formData, category: v as ItemCategory })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="medical_equipment">{t("warehouse.categories.medical_equipment")}</SelectItem>
                  <SelectItem value="surgical_instruments">{t("warehouse.categories.surgical_instruments")}</SelectItem>
                  <SelectItem value="medications">{t("warehouse.categories.medications")}</SelectItem>
                  <SelectItem value="consumables">{t("warehouse.categories.consumables")}</SelectItem>
                  <SelectItem value="laboratory">{t("warehouse.categories.laboratory")}</SelectItem>
                  <SelectItem value="radiology">{t("warehouse.categories.radiology")}</SelectItem>
                  <SelectItem value="cleaning">{t("warehouse.categories.cleaning")}</SelectItem>
                  <SelectItem value="office">{t("warehouse.categories.office")}</SelectItem>
                  <SelectItem value="nutrition">{t("warehouse.categories.nutrition")}</SelectItem>
                  <SelectItem value="ppe">{t("warehouse.categories.ppe")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>{t("warehouse.unit")}</Label>
              <Select
                value={formData.unit}
                onValueChange={(v) => setFormData({ ...formData, unit: v as UnitType })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="unit">{t("warehouse.unit")}</SelectItem>
                  <SelectItem value="box">{t("warehouse.box")}</SelectItem>
                  <SelectItem value="pack">{t("warehouse.pack")}</SelectItem>
                  <SelectItem value="bottle">{t("warehouse.bottle")}</SelectItem>
                  <SelectItem value="piece">{t("warehouse.piece")}</SelectItem>
                  <SelectItem value="set">{t("warehouse.set")}</SelectItem>
                  <SelectItem value="roll">{t("warehouse.roll")}</SelectItem>
                  <SelectItem value="kg">{t("warehouse.kg")}</SelectItem>
                  <SelectItem value="liter">{t("warehouse.liter")}</SelectItem>
                  <SelectItem value="meter">{t("warehouse.meter")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>{t("warehouse.barcode")}</Label>
              <Input
                value={formData.barcode}
                onChange={(e) => setFormData({ ...formData, barcode: e.target.value })}
                placeholder="SKU-001"
              />
            </div>
          </div>

          {/* Stock Levels */}
          <div className="grid grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>{t("warehouse.currentStock")}</Label>
              <Input
                type="number"
                value={formData.currentStock}
                onChange={(e) => setFormData({ ...formData, currentStock: parseInt(e.target.value) || 0 })}
              />
            </div>
            <div className="space-y-2">
              <Label>{t("warehouse.minimumStock")}</Label>
              <Input
                type="number"
                value={formData.minimumStock}
                onChange={(e) => setFormData({ ...formData, minimumStock: parseInt(e.target.value) || 0 })}
              />
            </div>
            <div className="space-y-2">
              <Label>{t("warehouse.maximumStock")}</Label>
              <Input
                type="number"
                value={formData.maximumStock}
                onChange={(e) => setFormData({ ...formData, maximumStock: parseInt(e.target.value) || 0 })}
              />
            </div>
            <div className="space-y-2">
              <Label>{t("warehouse.reorderLevel")}</Label>
              <Input
                type="number"
                value={formData.reorderLevel}
                onChange={(e) => setFormData({ ...formData, reorderLevel: parseInt(e.target.value) || 0 })}
              />
            </div>
          </div>

          {/* Pricing */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{t("warehouse.unitPrice")}</Label>
              <Input
                type="number"
                step="0.01"
                value={formData.unitPrice}
                onChange={(e) => setFormData({ ...formData, unitPrice: parseFloat(e.target.value) || 0 })}
              />
            </div>
            <div className="space-y-2">
              <Label>{t("warehouse.reorderQuantity")}</Label>
              <Input
                type="number"
                value={formData.reorderQuantity}
                onChange={(e) => setFormData({ ...formData, reorderQuantity: parseInt(e.target.value) || 0 })}
              />
            </div>
          </div>

          {/* Location and Storage */}
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>{t("warehouse.location")}</Label>
              <Input
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="A1-01"
              />
            </div>
            <div className="space-y-2">
              <Label>{t("warehouse.warehouse", "المخزن")}</Label>
              <Select
                value={formData.warehouse}
                onValueChange={(v) => setFormData({ ...formData, warehouse: v })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mainWarehouse">{t("warehouse.mainWarehouse")}</SelectItem>
                  <SelectItem value="pharmacyWarehouse">{t("warehouse.pharmacyWarehouse")}</SelectItem>
                  <SelectItem value="surgeryWarehouse">{t("warehouse.surgeryWarehouse")}</SelectItem>
                  <SelectItem value="emergencyWarehouse">{t("warehouse.emergencyWarehouse")}</SelectItem>
                  <SelectItem value="labWarehouse">{t("warehouse.labWarehouse")}</SelectItem>
                  <SelectItem value="radiologyWarehouse">{t("warehouse.radiologyWarehouse")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>{t("warehouse.storageConditions")}</Label>
              <Select
                value={formData.storageConditions}
                onValueChange={(v) => setFormData({ ...formData, storageConditions: v as StorageCondition })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="roomTemperature">{t("warehouse.roomTemperature")}</SelectItem>
                  <SelectItem value="refrigerated">{t("warehouse.refrigerated")}</SelectItem>
                  <SelectItem value="frozen">{t("warehouse.frozen")}</SelectItem>
                  <SelectItem value="controlled">{t("warehouse.controlled")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Additional Info */}
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>{t("warehouse.manufacturer")}</Label>
              <Input
                value={formData.manufacturer}
                onChange={(e) => setFormData({ ...formData, manufacturer: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>{t("warehouse.batchNumber")}</Label>
              <Input
                value={formData.batchNumber}
                onChange={(e) => setFormData({ ...formData, batchNumber: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>{t("warehouse.expiryDate")}</Label>
              <Input
                type="date"
                value={formData.expiryDate}
                onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>{t("warehouse.leadTime")} ({t("warehouse.days")})</Label>
            <Input
              type="number"
              value={formData.leadTime}
              onChange={(e) => setFormData({ ...formData, leadTime: parseInt(e.target.value) || 7 })}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            {t("common.cancel")}
          </Button>
          <Button onClick={handleSubmit}>
            <Save className="mr-2 h-4 w-4" />
            {t("common.save")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
