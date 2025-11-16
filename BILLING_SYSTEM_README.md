# نظام الفوترة والمحاسبة - Hospital Management System

## نظرة عامة

تم إنشاء نظام محاسبي شامل يتتبع تلقائياً جميع الخدمات المقدمة للمرضى في جميع أقسام المستشفى ويحولها إلى فواتير.

## المميزات الرئيسية

### 1. تتبع الخدمات التلقائي
- يتم تسجيل كل خدمة يحصل عليها المريض تلقائياً
- يتم حساب التكلفة بناءً على نوع الخدمة والكمية
- حالات الخدمة: معلق (Pending) → مفوتر (Billed) → مدفوع (Paid)

### 2. أنواع الخدمات المدعومة
- **استشارة طبية** (Consultation): زيارات الأطباء والكشف
- **تحاليل مختبرية** (Laboratory): جميع التحاليل الطبية
- **أشعة** (Radiology): أشعة سينية، أشعة مقطعية، رنين مغناطيسي
- **عمليات جراحية** (Surgery): جميع العمليات الجراحية
- **أدوية** (Medication): الأدوية من الصيدلية
- **إقامة** (Accommodation): إقامة المريض في الغرف
- **طوارئ** (Emergency): خدمات الطوارئ
- **علاج طبيعي** (Therapy): جلسات العلاج الطبيعي

### 3. صفحة الفواتير الرئيسية (`/billing`)
- عرض جميع المرضى مع ملخص فواتيرهم
- تتبع الخدمات المسجلة لكل مريض
- إدارة الفواتير والمدفوعات
- إحصائيات مالية شاملة
- تقارير مفصلة

### 4. مكون تتبع خدمات المريض
المكون: `PatientServiceTracker`

يمكن استخدامه في أي صفحة لعرض خدمات المريض:

```tsx
import PatientServiceTracker from "@/components/PatientServiceTracker";

<PatientServiceTracker
  patientId="P001"
  patientName="أحمد محمد"
  departmentName="الطوارئ"
/>
```

### 5. Hook لإضافة الخدمات
Hook: `usePatientBilling`

يوفر طرق سهلة لإضافة خدمات من أي قسم:

```tsx
import { usePatientBilling } from "@/hooks/use-patient-billing";

const { addMedication, addLabTest, addConsultation } = usePatientBilling();

// إضافة دواء
addMedication("P001", "أحمد محمد", "باراسيتامول 500mg", 2, 50);

// إضافة تحليل
addLabTest("P001", "أحمد محمد", "تحليل دم شامل", 800);

// إضافة استشارة
addConsultation("P001", "أحمد محمد", "د. محمد علي", "الطوارئ", 500);
```

### 6. مكون الفاتورة
المكون: `Invoice`

لإنشاء فاتورة تفصيلية قابلة للطباعة:

```tsx
import Invoice from "@/components/Invoice";

<Invoice
  invoiceNumber="INV-001"
  patientId="P001"
  patientName="أحمد محمد"
  services={services}
  invoiceDate="2024-01-20"
  dueDate="2024-02-20"
  discount={10}
  tax={14}
/>
```

## كيفية الاستخدام في الأقسام المختلفة

### في صفحة الصيدلية
```tsx
import { usePatientBilling } from "@/hooks/use-patient-billing";
import PatientServiceTracker from "@/components/PatientServiceTracker";

function Pharmacy() {
  const { addMedication } = usePatientBilling();

  const handleDispenseMedicine = (patientId, patientName, medicine) => {
    // صرف الدواء
    dispenseMedicine(medicine);
    
    // إضافة تلقائية للفاتورة
    addMedication(
      patientId,
      patientName,
      medicine.name,
      medicine.quantity,
      medicine.price
    );
  };

  return (
    <div>
      {/* محتوى الصيدلية */}
      
      {/* عرض خدمات المريض */}
      <PatientServiceTracker
        patientId={selectedPatient?.id}
        patientName={selectedPatient?.name}
        departmentName="الصيدلية"
      />
    </div>
  );
}
```

### في صفحة المختبر
```tsx
const { addLabTest } = usePatientBilling();

const handleCompleteTest = (patientId, patientName, testName, price) => {
  // إكمال التحليل
  completeLabTest();
  
  // إضافة للفاتورة
  addLabTest(patientId, patientName, testName, price);
};
```

### في صفحة العمليات الجراحية
```tsx
const { addSurgery } = usePatientBilling();

const handleCompleteSurgery = (patientId, patientName, surgeryName, surgeon, cost) => {
  // تسجيل العملية
  recordSurgery();
  
  // إضافة للفاتورة
  addSurgery(patientId, patientName, surgeryName, surgeon, cost);
};
```

### في صفحة الغرف
```tsx
const { addAccommodation } = usePatientBilling();

const handleCheckout = (patientId, patientName, roomType, days, pricePerDay) => {
  // خروج المريض
  checkoutPatient();
  
  // إضافة تكلفة الإقامة
  addAccommodation(patientId, patientName, roomType, days, pricePerDay);
};
```

## التجميع التلقائي للخدمات

النظام يدعم تجميع الخدمات تلقائياً:

### حسب النوع
- جميع الأدوية معاً
- جميع التحاليل معاً
- جميع الأشعات معاً

### حسب القسم
- خدمات الطوارئ
- خدمات المختبر
- خدمات الصيدلية

### حسب التاريخ
- خدمات يومية
- خدمات أسبوعية
- خدمات شهرية

## واجهات البرمجة (API)

### دوال التخزين
```typescript
// إضافة خدمة
addPatientService(service: Omit<PatientService, "id">): PatientService

// جلب خدمات مريض
getPatientServices(patientId?: string): PatientService[]

// تحديث حالة الخدمة
updateServiceStatus(serviceId: string, status: "pending" | "billed" | "paid"): void

// ملخص فواتير المريض
getPatientBillingSummary(patientId: string): {
  totalServices: number
  totalAmount: number
  paidAmount: number
  billedAmount: number
  pendingAmount: number
  remainingAmount: number
  services: PatientService[]
}
```

### دوال Hook
```typescript
const {
  // دالة عامة
  addServiceToBilling,
  
  // دوال متخصصة
  addConsultation,
  addLabTest,
  addRadiology,
  addMedication,
  addSurgery,
  addAccommodation,
  addEmergency,
  addTherapy,
} = usePatientBilling();
```

## الإحصائيات والتقارير

يوفر النظام إحصائيات في الوقت الفعلي:

- **إجمالي الإيرادات**: مجموع جميع المدفوعات
- **إيرادات اليوم**: إيرادات اليوم الحالي
- **الفواتير المعلقة**: الفواتير غير المدفوعة
- **معدل التحصيل**: نسبة المبالغ المحصلة
- **أكثر الخدمات استخداماً**: تحليل الخدمات الأكثر طلباً
- **الإيرادات حسب القسم**: توزيع الإيرادات على الأقسام

## التكامل مع التأمين

النظام يدعم مطالبات التأمين:

```tsx
// معلومات التأمين
insuranceInfo: {
  policyNumber: string
  coveragePercentage: number
  insurancePays: number
  patientPays: number
}

// تقديم مطالبة
submitInsuranceClaim(invoiceId, claimData)
```

## الطباعة والتصدير

- **طباعة الفاتورة**: فواتير احترافية قابلة للطباعة
- **تصدير PDF**: تحويل الفاتورة إلى PDF
- **إرسال بالبريد**: إرسال الفاتورة للمريض

## الأمان والصلاحيات

في الإصدار الإنتاجي، يجب:

1. ربط النظام بقاعدة بيانات آمنة
2. إضافة صلاحيات للمستخدمين
3. تسجيل جميع العمليات (Audit Log)
4. حماية البيانات المالية الحساسة
5. نسخ احتياطي تلقائي

## ملاحظات مهمة

### الإصدار الحالي (Demo)
- التخزين في الذاكرة (in-memory)
- البيانات تُفقد عند إعادة تحميل الصفحة
- للعرض والاختبار فقط

### الإصدار الإنتاجي (يحتاج إلى)
1. **قاعدة بيانات**: 
   - جداول للخدمات
   - جداول للفواتير
   - جداول للمدفوعات
   - جداول لمطالبات التأمين

2. **API Backend**:
   - نقاط API للخدمات CRUD
   - نقاط API للفواتير
   - نقاط API للمدفوعات
   - تكامل مع بوابات الدفع

3. **تقارير متقدمة**:
   - تقارير مالية شهرية
   - تحليل الإيرادات
   - تتبع المدفوعات المتأخرة
   - تنبؤات مالية

## الدعم الفني

لأي استفسارات أو تطويرات إضافية، يرجى مراجعة:
- ملف التوثيق الرئيسي: `AGENTS.md`
- ملفات الترجمة: `client/i18n/locales/`
- المكونات: `client/components/`
- الصفحات: `client/pages/`

---

**تم التطوير بواسطة**: GitHub Copilot
**التاريخ**: نوفمبر 2024
**الإصدار**: 1.0.0
