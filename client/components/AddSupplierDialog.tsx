import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Plus } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Supplier {
  id: string;
  name: string;
  nameAr: string;
  nameEn: string;
  contactPerson: string;
  email: string;
  phone: string;
  mobile: string;
  address: string;
  city: string;
  country: string;
  taxNumber: string;
  supplierType: string;
  paymentTerms: string;
  deliveryTime: number;
  rating: number;
  notes: string;
  status: "active" | "inactive";
  createdAt: string;
}

interface AddSupplierDialogProps {
  onSupplierAdded?: (supplier: Supplier) => void;
}

export function AddSupplierDialog({ onSupplierAdded }: AddSupplierDialogProps) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    nameAr: "",
    nameEn: "",
    contactPerson: "",
    email: "",
    phone: "",
    mobile: "",
    address: "",
    city: "",
    country: "مصر",
    taxNumber: "",
    supplierType: "medical",
    paymentTerms: "net30",
    deliveryTime: 7,
    rating: 5,
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newSupplier: Supplier = {
      id: `supplier_${Date.now()}`,
      name: formData.nameAr,
      nameAr: formData.nameAr,
      nameEn: formData.nameEn,
      contactPerson: formData.contactPerson,
      email: formData.email,
      phone: formData.phone,
      mobile: formData.mobile,
      address: formData.address,
      city: formData.city,
      country: formData.country,
      taxNumber: formData.taxNumber,
      supplierType: formData.supplierType,
      paymentTerms: formData.paymentTerms,
      deliveryTime: formData.deliveryTime,
      rating: formData.rating,
      notes: formData.notes,
      status: "active",
      createdAt: new Date().toISOString(),
    };

    // Call the callback
    onSupplierAdded?.(newSupplier);

    // Reset form and close dialog
    setFormData({
      nameAr: "",
      nameEn: "",
      contactPerson: "",
      email: "",
      phone: "",
      mobile: "",
      address: "",
      city: "",
      country: "مصر",
      taxNumber: "",
      supplierType: "medical",
      paymentTerms: "net30",
      deliveryTime: 7,
      rating: 5,
      notes: "",
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          {t("warehouse.addSupplier")}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t("warehouse.addSupplier")}</DialogTitle>
          <DialogDescription>
            أضف معلومات المورد الجديد
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {/* Basic Information */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nameAr">الاسم بالعربية *</Label>
                <Input
                  id="nameAr"
                  value={formData.nameAr}
                  onChange={(e) =>
                    setFormData({ ...formData, nameAr: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nameEn">الاسم بالإنجليزية *</Label>
                <Input
                  id="nameEn"
                  value={formData.nameEn}
                  onChange={(e) =>
                    setFormData({ ...formData, nameEn: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contactPerson">الشخص المسؤول *</Label>
                <Input
                  id="contactPerson"
                  value={formData.contactPerson}
                  onChange={(e) =>
                    setFormData({ ...formData, contactPerson: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">البريد الإلكتروني *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">رقم الهاتف</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="02-12345678"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mobile">رقم الموبايل *</Label>
                <Input
                  id="mobile"
                  value={formData.mobile}
                  onChange={(e) =>
                    setFormData({ ...formData, mobile: e.target.value })
                  }
                  required
                  placeholder="01012345678"
                />
              </div>
            </div>

            {/* Address Information */}
            <div className="space-y-2">
              <Label htmlFor="address">العنوان *</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">المدينة *</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">الدولة *</Label>
                <Input
                  id="country"
                  value={formData.country}
                  onChange={(e) =>
                    setFormData({ ...formData, country: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            {/* Business Information */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="taxNumber">الرقم الضريبي</Label>
                <Input
                  id="taxNumber"
                  value={formData.taxNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, taxNumber: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="supplierType">نوع المورد *</Label>
                <Select
                  value={formData.supplierType}
                  onValueChange={(value) =>
                    setFormData({ ...formData, supplierType: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="medical">مستلزمات طبية</SelectItem>
                    <SelectItem value="pharmaceutical">أدوية</SelectItem>
                    <SelectItem value="equipment">معدات</SelectItem>
                    <SelectItem value="consumables">مستهلكات</SelectItem>
                    <SelectItem value="food">مواد غذائية</SelectItem>
                    <SelectItem value="cleaning">مواد تنظيف</SelectItem>
                    <SelectItem value="other">أخرى</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="paymentTerms">شروط الدفع *</Label>
                <Select
                  value={formData.paymentTerms}
                  onValueChange={(value) =>
                    setFormData({ ...formData, paymentTerms: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediate">دفع فوري</SelectItem>
                    <SelectItem value="net15">15 يوم</SelectItem>
                    <SelectItem value="net30">30 يوم</SelectItem>
                    <SelectItem value="net60">60 يوم</SelectItem>
                    <SelectItem value="net90">90 يوم</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="deliveryTime">مدة التوصيل (أيام) *</Label>
                <Input
                  id="deliveryTime"
                  type="number"
                  min="1"
                  value={formData.deliveryTime}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      deliveryTime: parseInt(e.target.value) || 7,
                    })
                  }
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="rating">التقييم (1-5)</Label>
                <Select
                  value={formData.rating.toString()}
                  onValueChange={(value) =>
                    setFormData({ ...formData, rating: parseInt(value) })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">⭐ ضعيف</SelectItem>
                    <SelectItem value="2">⭐⭐ مقبول</SelectItem>
                    <SelectItem value="3">⭐⭐⭐ جيد</SelectItem>
                    <SelectItem value="4">⭐⭐⭐⭐ جيد جداً</SelectItem>
                    <SelectItem value="5">⭐⭐⭐⭐⭐ ممتاز</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes">ملاحظات</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
                rows={3}
                placeholder="أي ملاحظات إضافية عن المورد..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              {t("common.cancel")}
            </Button>
            <Button type="submit">{t("common.save")}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
