# 🎯 دليل استخدام مكونات الفوترة

## نظرة عامة

تم إنشاء مكونين رئيسيين للنظام المحاسبي:

1. **PatientServiceTracker** - مكون تتبع خدمات المريض
2. **Invoice** - مكون الفاتورة التفصيلية

---

## 1️⃣ مكون تتبع خدمات المريض (PatientServiceTracker)

### الوصف
مكون يعرض جميع الخدمات التي حصل عليها المريض مع ملخص مالي شامل.

### الاستخدام الأساسي

```tsx
import PatientServiceTracker from "@/components/PatientServiceTracker";

<PatientServiceTracker
  patientId="P001"
  patientName="أحمد محمد"
  departmentName="الصيدلية"
/>
```

### الخصائص (Props)

| الخاصية | النوع | مطلوب | الوصف |
|---------|------|-------|-------|
| `patientId` | string | ✅ | رقم المريض |
| `patientName` | string | ✅ | اسم المريض |
| `departmentName` | string | ✅ | اسم القسم |
| `onServiceAdded` | function | ❌ | دالة يتم استدعاؤها عند إضافة خدمة |
| `className` | string | ❌ | CSS classes إضافية |

### المميزات

✅ **عرض ملخص مالي**
- إجمالي الخدمات
- المبلغ الإجمالي
- المبلغ المدفوع
- المبلغ المتبقي

✅ **قائمة الخدمات**
- عرض آخر 5 خدمات
- أيقونات ملونة حسب نوع الخدمة
- حالة كل خدمة (معلق، مفوتر، مدفوع)

✅ **نافذة تفصيلية**
- عرض جميع الخدمات
- تفاصيل كاملة لكل خدمة
- إمكانية إنشاء فاتورة

### مثال متقدم

```tsx
import PatientServiceTracker, {
  getPatientServices,
  getPatientBillingSummary,
} from "@/components/PatientServiceTracker";

function PharmacyPage() {
  const [selectedPatient, setSelectedPatient] = useState(null);

  // جلب خدمات المريض
  const services = getPatientServices(selectedPatient?.id);
  
  // جلب الملخص المالي
  const summary = getPatientBillingSummary(selectedPatient?.id);

  return (
    <div className="grid grid-cols-3 gap-6">
      {/* المحتوى الرئيسي */}
      <div className="col-span-2">
        {/* محتوى الصفحة */}
      </div>

      {/* عمود جانبي لتتبع الخدمات */}
      <div className="col-span-1">
        {selectedPatient && (
          <PatientServiceTracker
            patientId={selectedPatient.id}
            patientName={selectedPatient.name}
            departmentName="الصيدلية"
            onServiceAdded={(service) => {
              console.log('تم إضافة خدمة:', service);
            }}
          />
        )}
      </div>
    </div>
  );
}
```

### الدوال المساعدة

#### `getPatientServices(patientId?)`
جلب جميع خدمات مريض معين أو جميع الخدمات.

```typescript
const services = getPatientServices("P001");
// Returns: PatientService[]
```

#### `getPatientBillingSummary(patientId)`
جلب ملخص مالي شامل للمريض.

```typescript
const summary = getPatientBillingSummary("P001");
// Returns: {
//   totalServices: number,
//   totalAmount: number,
//   paidAmount: number,
//   billedAmount: number,
//   pendingAmount: number,
//   remainingAmount: number,
//   services: PatientService[]
// }
```

#### `addPatientService(service)`
إضافة خدمة جديدة للمريض.

```typescript
const newService = addPatientService({
  patientId: "P001",
  patientName: "أحمد محمد",
  type: "medication",
  name: "باراسيتامول 500mg",
  date: "2024-01-20",
  department: "الصيدلية",
  provider: "الصيدلية الرئيسية",
  quantity: 2,
  unitPrice: 50,
  amount: 100,
  status: "pending",
});
```

#### `updateServiceStatus(serviceId, status)`
تحديث حالة خدمة معينة.

```typescript
updateServiceStatus("SVC-123", "paid");
```

---

## 2️⃣ مكون الفاتورة التفصيلية (Invoice)

### الوصف
مكون يعرض فاتورة تفصيلية احترافية قابلة للطباعة والتصدير.

### الاستخدام الأساسي

```tsx
import Invoice from "@/components/Invoice";
import { getPatientServices } from "@/components/PatientServiceTracker";

const services = getPatientServices("P001");

<Invoice
  invoiceNumber="INV-2024-001"
  patientId="P001"
  patientName="أحمد محمد"
  services={services}
  invoiceDate="2024-01-20"
  dueDate="2024-02-20"
/>
```

### الخصائص (Props)

| الخاصية | النوع | مطلوب | الوصف |
|---------|------|-------|-------|
| `invoiceNumber` | string | ✅ | رقم الفاتورة |
| `patientId` | string | ✅ | رقم المريض |
| `patientName` | string | ✅ | اسم المريض |
| `services` | PatientService[] | ✅ | قائمة الخدمات |
| `invoiceDate` | string | ✅ | تاريخ الفاتورة |
| `patientPhone` | string | ❌ | هاتف المريض |
| `patientAddress` | string | ❌ | عنوان المريض |
| `dueDate` | string | ❌ | تاريخ الاستحقاق |
| `discount` | number | ❌ | نسبة الخصم (%) |
| `tax` | number | ❌ | نسبة الضريبة (%) |
| `notes` | string | ❌ | ملاحظات إضافية |
| `className` | string | ❌ | CSS classes |

### المميزات

✅ **معلومات شاملة**
- معلومات المستشفى
- معلومات المريض
- تفاصيل الفاتورة (رقم، تاريخ، استحقاق)

✅ **جدول الخدمات**
- قائمة تفصيلية لجميع الخدمات
- نوع الخدمة، التاريخ، الكمية، السعر
- حساب تلقائي للإجمالي

✅ **حسابات مالية**
- المجموع الفرعي
- الخصم (إن وجد)
- الضريبة (إن وجدت)
- الإجمالي النهائي

✅ **أزرار إجرائية**
- طباعة الفاتورة
- تحميل كـ PDF
- إرسال بالبريد الإلكتروني

### مثال متقدم

```tsx
import Invoice from "@/components/Invoice";
import { getPatientServices } from "@/components/PatientServiceTracker";
import { Dialog } from "@/components/ui/dialog";

function BillingPage() {
  const [showInvoice, setShowInvoice] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const handleGenerateInvoice = () => {
    const services = getPatientServices(selectedPatient.id);
    
    if (services.length === 0) {
      alert("لا توجد خدمات لإنشاء فاتورة");
      return;
    }
    
    setShowInvoice(true);
  };

  return (
    <div>
      <Button onClick={handleGenerateInvoice}>
        إنشاء فاتورة
      </Button>

      <Dialog open={showInvoice} onOpenChange={setShowInvoice}>
        <DialogContent className="max-w-5xl">
          <Invoice
            invoiceNumber={`INV-${Date.now()}`}
            patientId={selectedPatient.id}
            patientName={selectedPatient.name}
            patientPhone={selectedPatient.phone}
            patientAddress={selectedPatient.address}
            services={getPatientServices(selectedPatient.id)}
            invoiceDate={new Date().toISOString().split('T')[0]}
            dueDate={calculateDueDate(30)} // 30 يوم
            discount={10} // خصم 10%
            tax={14}      // ضريبة 14%
            notes="شكراً لاختياركم - نتمنى لكم الشفاء العاجل"
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
```

### مثال: فاتورة مع تأمين

```tsx
function InvoiceWithInsurance() {
  const services = getPatientServices(patientId);
  const insuranceCoverage = 0.80; // تغطية 80%
  
  const totalAmount = services.reduce((sum, s) => sum + s.amount, 0);
  const insurancePays = totalAmount * insuranceCoverage;
  const patientPays = totalAmount * (1 - insuranceCoverage);

  return (
    <div>
      <Invoice
        invoiceNumber="INV-001"
        patientId={patientId}
        patientName={patientName}
        services={services}
        invoiceDate={new Date().toISOString().split('T')[0]}
        discount={0}
        tax={0}
        notes={`
          التأمين يغطي: ${insuranceCoverage * 100}%
          يدفع التأمين: ${insurancePays.toLocaleString()} جنيه
          يدفع المريض: ${patientPays.toLocaleString()} جنيه
        `}
      />
    </div>
  );
}
```

---

## 3️⃣ التكامل الكامل - مثال عملي

### سيناريو: صفحة الصيدلية مع النظام المحاسبي

```tsx
import { useState } from "react";
import PatientServiceTracker from "@/components/PatientServiceTracker";
import Invoice from "@/components/Invoice";
import { usePatientBilling } from "@/hooks/use-patient-billing";
import { Dialog } from "@/components/ui/dialog";

function PharmacyWithBilling() {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showInvoice, setShowInvoice] = useState(false);
  const { addMedication } = usePatientBilling();

  // عند صرف دواء
  const handleDispenseMedicine = (medicine, quantity) => {
    // 1. صرف الدواء (الكود الأساسي)
    dispenseMedicine(medicine, quantity);
    
    // 2. إضافة تلقائية للفاتورة
    addMedication(
      selectedPatient.id,
      selectedPatient.name,
      `${medicine.name} - ${medicine.dosage}`,
      quantity,
      medicine.price
    );
  };

  // إنشاء فاتورة
  const handleGenerateInvoice = () => {
    setShowInvoice(true);
  };

  return (
    <Layout>
      <div className="grid grid-cols-3 gap-6">
        {/* قائمة الأدوية (2 أعمدة) */}
        <div className="col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>الأدوية المتوفرة</CardTitle>
            </CardHeader>
            <CardContent>
              {medicines.map(medicine => (
                <div key={medicine.id}>
                  <h3>{medicine.name}</h3>
                  <Button onClick={() => handleDispenseMedicine(medicine, 1)}>
                    صرف
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* تتبع الخدمات (عمود جانبي) */}
        <div className="col-span-1">
          {selectedPatient && (
            <>
              <PatientServiceTracker
                patientId={selectedPatient.id}
                patientName={selectedPatient.name}
                departmentName="الصيدلية"
              />
              
              <Button 
                onClick={handleGenerateInvoice}
                className="w-full mt-4"
              >
                إنشاء فاتورة نهائية
              </Button>
            </>
          )}
        </div>
      </div>

      {/* نافذة الفاتورة */}
      <Dialog open={showInvoice} onOpenChange={setShowInvoice}>
        <DialogContent className="max-w-5xl">
          <Invoice
            invoiceNumber={`INV-${Date.now()}`}
            patientId={selectedPatient?.id}
            patientName={selectedPatient?.name}
            services={getPatientServices(selectedPatient?.id)}
            invoiceDate={new Date().toISOString().split('T')[0]}
            discount={5}
            tax={14}
          />
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
```

---

## 4️⃣ الصفحة التجريبية

تم إنشاء صفحة تجريبية كاملة لعرض المكونات: **`/billing-demo`**

### الوصول للصفحة
```
http://localhost:8082/billing-demo
```

### المميزات
- ✅ اختيار مريض من قائمة تجريبية
- ✅ إضافة خدمات سريعة بضغطة زر
- ✅ إضافة خدمة مخصصة
- ✅ عرض تتبع الخدمات مباشرة
- ✅ إنشاء فاتورة تفصيلية
- ✅ طباعة وتحميل الفاتورة

### الأكواد التجريبية

**إضافة خدمات تجريبية:**
```typescript
// استشارة
addConsultation(patientId, patientName, "د. أحمد", "الطوارئ", 500);

// تحاليل
addLabTest(patientId, patientName, "تحليل دم شامل", 800);
addLabTest(patientId, patientName, "تحليل بول", 200);

// أشعة
addRadiology(patientId, patientName, "أشعة على الصدر", 600);

// أدوية
addMedication(patientId, patientName, "باراسيتامول 500mg", 2, 50);

// إقامة
addAccommodation(patientId, patientName, "غرفة عادية", 2, 500);
```

---

## 5️⃣ نصائح وأفضل الممارسات

### ✅ التحقق من البيانات
```typescript
if (!patientId || !patientName) {
  console.error("يجب توفير معلومات المريض");
  return;
}
```

### ✅ التعامل مع الخدمات الفارغة
```typescript
const services = getPatientServices(patientId);

if (services.length === 0) {
  return <EmptyState message="لا توجد خدمات مسجلة" />;
}
```

### ✅ حساب الإجماليات
```typescript
const summary = getPatientBillingSummary(patientId);

console.log(`إجمالي الخدمات: ${summary.totalServices}`);
console.log(`المبلغ الإجمالي: ${summary.totalAmount}`);
console.log(`المتبقي: ${summary.remainingAmount}`);
```

### ✅ تحديث حالة الخدمة
```typescript
// عند الدفع
updateServiceStatus(serviceId, "paid");

// عند الإلغاء
updateServiceStatus(serviceId, "cancelled");
```

---

## 6️⃣ التخصيص

### تخصيص الألوان حسب نوع الخدمة

المكون يستخدم ألوان افتراضية، يمكنك تخصيصها:

```typescript
const serviceTypeColors = {
  consultation: "bg-blue-100 text-blue-700",
  laboratory: "bg-purple-100 text-purple-700",
  radiology: "bg-cyan-100 text-cyan-700",
  surgery: "bg-red-100 text-red-700",
  medication: "bg-green-100 text-green-700",
  accommodation: "bg-yellow-100 text-yellow-700",
  emergency: "bg-orange-100 text-orange-700",
  therapy: "bg-pink-100 text-pink-700",
};
```

### تخصيص معلومات المستشفى في الفاتورة

افتح `Invoice.tsx` وعدل:

```tsx
<div className="text-sm text-slate-600 space-y-1">
  <p>عنوان المستشفى</p>
  <p>هاتف: +20 123 456 7890</p>
  <p>البريد: info@hospital.com</p>
  <p>الموقع: www.hospital.com</p>
</div>
```

---

## 🎉 الخلاصة

المكونات جاهزة للاستخدام وتوفر:

✅ **تتبع شامل** لجميع خدمات المريض
✅ **فواتير احترافية** قابلة للطباعة
✅ **تكامل سهل** مع أي قسم في المستشفى
✅ **واجهة بديهية** مع RTL للعربية
✅ **دوال مساعدة** للتكامل السريع
✅ **صفحة تجريبية** للاختبار

**ابدأ الآن بزيارة**: `http://localhost:8082/billing-demo` 🚀
