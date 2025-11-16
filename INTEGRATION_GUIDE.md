# دليل التكامل - نظام الفوترة مع جميع الأقسام

## نظرة عامة
هذا الدليل يشرح كيفية دمج نظام الفوترة التلقائي مع كل قسم من أقسام المستشفى.

---

## 1. الصيدلية (Pharmacy)

### عند صرف دواء للمريض:

```typescript
import { usePatientBilling } from "@/hooks/use-patient-billing";

const { addMedication } = usePatientBilling();

const handleDispenseMedicine = (patientId, patientName, medicine, quantity) => {
  // صرف الدواء
  dispenseMedicine(medicine, quantity);
  
  // إضافة تلقائية للفاتورة
  addMedication(
    patientId,           // "P001"
    patientName,         // "أحمد محمد"
    medicine.name,       // "باراسيتامول 500mg"
    quantity,            // 2 علب
    medicine.price       // 50 جنيه للعلبة
  );
  // النتيجة: سيتم إضافة خدمة بقيمة 100 جنيه (2 × 50)
};
```

### إضافة مكون تتبع الخدمات:

```tsx
<PatientServiceTracker
  patientId={selectedPatient?.id}
  patientName={selectedPatient?.name}
  departmentName="الصيدلية"
/>
```

---

## 2. المختبر (Laboratory)

### عند إتمام تحليل طبي:

```typescript
const { addLabTest } = usePatientBilling();

const handleCompleteTest = (patientId, patientName, test) => {
  // إتمام التحليل
  completeLabTest(test);
  
  // إضافة للفاتورة
  addLabTest(
    patientId,           // "P001"
    patientName,         // "أحمد محمد"
    test.name,           // "تحليل دم شامل"
    test.price           // 800 جنيه
  );
};
```

### تحليلات متعددة دفعة واحدة:

```typescript
const handleCompleteMultipleTests = (patientId, patientName, tests) => {
  tests.forEach(test => {
    completeLabTest(test);
    addLabTest(patientId, patientName, test.name, test.price);
  });
};
```

---

## 3. الأشعة (Radiology)

### عند إجراء فحص أشعة:

```typescript
const { addRadiology } = usePatientBilling();

const handleCompleteScan = (patientId, patientName, scan) => {
  // إجراء الفحص
  performScan(scan);
  
  // إضافة للفاتورة
  addRadiology(
    patientId,           // "P001"
    patientName,         // "أحمد محمد"
    scan.name,           // "أشعة مقطعية على الرأس"
    scan.price           // 1500 جنيه
  );
};
```

---

## 4. العمليات الجراحية (Surgery)

### عند إجراء عملية جراحية:

```typescript
const { addSurgery } = usePatientBilling();

const handleCompleteSurgery = (patientId, patientName, surgery, surgeon) => {
  // تسجيل العملية
  recordSurgery(surgery);
  
  // إضافة للفاتورة
  addSurgery(
    patientId,           // "P001"
    patientName,         // "أحمد محمد"
    surgery.name,        // "استئصال الزائدة الدودية"
    surgeon.name,        // "د. محمد أحمد"
    surgery.cost         // 15000 جنيه
  );
};
```

### تكلفة شاملة (عملية + تخدير + أدوات):

```typescript
const handleCompleteSurgeryWithExtras = (patientId, patientName, surgery) => {
  // العملية الأساسية
  addSurgery(patientId, patientName, surgery.name, surgery.surgeon, surgery.baseCost);
  
  // التخدير
  addServiceToBilling({
    patientId,
    patientName,
    type: "surgery",
    name: "تخدير كامل",
    department: "التخدير",
    provider: surgery.anesthesiologist,
    unitPrice: 3000,
  });
  
  // غرفة العمليات
  addServiceToBilling({
    patientId,
    patientName,
    type: "surgery",
    name: "استخدام غرفة العمليات",
    department: "العمليات",
    unitPrice: 2000,
  });
};
```

---

## 5. الغرف والإقامة (Rooms/Accommodation)

### عند خروج المريض من الغرفة:

```typescript
const { addAccommodation } = usePatientBilling();

const handleCheckout = (patientId, patientName, room, checkInDate, checkOutDate) => {
  // حساب عدد الأيام
  const days = calculateDays(checkInDate, checkOutDate);
  
  // خروج المريض
  checkoutPatient(patientId);
  
  // إضافة تكلفة الإقامة
  addAccommodation(
    patientId,           // "P001"
    patientName,         // "أحمد محمد"
    room.type,           // "غرفة عادية"
    days,                // 3 أيام
    room.pricePerDay     // 500 جنيه/يوم
  );
  // النتيجة: 1500 جنيه (3 × 500)
};
```

### غرف مختلفة (VIP, عادية, عناية مركزة):

```typescript
const ROOM_PRICES = {
  standard: 500,      // غرفة عادية
  private: 1000,      // غرفة خاصة
  vip: 2000,          // غرفة VIP
  icu: 3000,          // عناية مركزة
};

const handleCheckout = (patientId, patientName, roomType, days) => {
  addAccommodation(
    patientId,
    patientName,
    getRoomTypeName(roomType),
    days,
    ROOM_PRICES[roomType]
  );
};
```

---

## 6. الطوارئ (Emergency)

### عند استقبال حالة طارئة:

```typescript
const { addEmergency, addConsultation } = usePatientBilling();

const handleEmergencyAdmission = (patientId, patientName) => {
  // رسوم الطوارئ
  addEmergency(
    patientId,
    patientName,
    "رسوم دخول الطوارئ",
    300  // رسوم ثابتة
  );
  
  // كشف الطبيب
  addConsultation(
    patientId,
    patientName,
    "د. محمد أحمد",
    "الطوارئ",
    500
  );
};
```

---

## 7. العيادات الخارجية (Clinics)

### عند الكشف في العيادة:

```typescript
const { addConsultation } = usePatientBilling();

const handleClinicVisit = (patientId, patientName, doctor, clinic) => {
  // تسجيل الزيارة
  registerVisit(patientId, doctor, clinic);
  
  // إضافة للفاتورة
  addConsultation(
    patientId,           // "P001"
    patientName,         // "أحمد محمد"
    doctor.name,         // "د. سارة أحمد"
    clinic.name,         // "عيادة الأطفال"
    doctor.consultationFee  // 400 جنيه
  );
};
```

### زيارة متابعة مخفضة:

```typescript
const handleFollowUpVisit = (patientId, patientName, doctor, clinic) => {
  const isFollowUp = checkIfFollowUp(patientId, doctor);
  const fee = isFollowUp ? doctor.followUpFee : doctor.consultationFee;
  
  addConsultation(patientId, patientName, doctor.name, clinic.name, fee);
};
```

---

## 8. العلاج الطبيعي (Physiotherapy)

### عند جلسة علاج طبيعي:

```typescript
const { addTherapy } = usePatientBilling();

const handleTherapySession = (patientId, patientName, sessionType, sessions) => {
  // تسجيل الجلسة
  recordTherapySession(patientId, sessionType);
  
  // إضافة للفاتورة
  addTherapy(
    patientId,           // "P001"
    patientName,         // "أحمد محمد"
    sessionType.name,    // "جلسة علاج طبيعي - ظهر"
    sessions,            // 5 جلسات
    sessionType.price    // 200 جنيه/جلسة
  );
  // النتيجة: 1000 جنيه (5 × 200)
};
```

### باقات علاج (Sessions Package):

```typescript
const handleTherapyPackage = (patientId, patientName, packageType) => {
  const discount = packageType.sessions >= 10 ? 0.15 : 0; // خصم 15% لـ 10 جلسات أو أكثر
  const pricePerSession = packageType.basePrice * (1 - discount);
  
  addTherapy(
    patientId,
    patientName,
    `باقة علاج طبيعي - ${packageType.name}`,
    packageType.sessions,
    pricePerSession
  );
};
```

---

## 9. استخدام عام (Any Department)

### إضافة خدمة مخصصة:

```typescript
const { addServiceToBilling } = usePatientBilling();

const handleCustomService = (patientId, patientName, serviceName, department, price) => {
  addServiceToBilling({
    patientId,
    patientName,
    type: "consultation",  // أو أي نوع مناسب
    name: serviceName,
    department,
    provider: department,
    unitPrice: price,
    notes: "خدمة إضافية",
  });
};
```

---

## 10. عرض ملخص الخدمات في أي صفحة

### إضافة مكون التتبع:

```tsx
import PatientServiceTracker from "@/components/PatientServiceTracker";

function AnyDepartmentPage() {
  const [selectedPatient, setSelectedPatient] = useState(null);

  return (
    <Layout>
      <div className="grid grid-cols-3 gap-6">
        {/* المحتوى الرئيسي */}
        <div className="col-span-2">
          {/* محتوى القسم */}
        </div>

        {/* عمود جانبي لتتبع الخدمات */}
        <div className="col-span-1">
          {selectedPatient && (
            <PatientServiceTracker
              patientId={selectedPatient.id}
              patientName={selectedPatient.name}
              departmentName="اسم القسم"
            />
          )}
        </div>
      </div>
    </Layout>
  );
}
```

---

## 11. التجميع التلقائي

### تجميع خدمات متعددة:

```typescript
const handleMultipleServices = (patientId, patientName, services) => {
  const { addServiceToBilling } = usePatientBilling();
  
  services.forEach(service => {
    addServiceToBilling({
      patientId,
      patientName,
      type: service.type,
      name: service.name,
      department: service.department,
      quantity: service.quantity,
      unitPrice: service.price,
    });
  });
};
```

### مثال عملي - باقة فحص شامل:

```typescript
const handleComprehensiveCheckup = (patientId, patientName) => {
  const { addConsultation, addLabTest, addRadiology } = usePatientBilling();
  
  // استشارة
  addConsultation(patientId, patientName, "د. محمد", "الباطنة", 500);
  
  // تحاليل
  addLabTest(patientId, patientName, "تحليل دم شامل", 800);
  addLabTest(patientId, patientName, "تحليل بول", 200);
  addLabTest(patientId, patientName, "وظائف كبد", 400);
  
  // أشعة
  addRadiology(patientId, patientName, "أشعة على الصدر", 600);
  
  // المجموع التلقائي: 2500 جنيه
};
```

---

## 12. إنشاء الفاتورة

### في صفحة الفواتير:

```typescript
import { getPatientServices } from "@/components/PatientServiceTracker";
import Invoice from "@/components/Invoice";

const handleGenerateInvoice = (patientId) => {
  const services = getPatientServices(patientId);
  
  return (
    <Invoice
      invoiceNumber={`INV-${Date.now()}`}
      patientId={patientId}
      patientName={patient.name}
      services={services}
      invoiceDate={new Date().toISOString().split('T')[0]}
      dueDate={calculateDueDate(30)} // 30 يوم
      discount={10}  // خصم 10%
      tax={14}       // ضريبة 14%
    />
  );
};
```

---

## نصائح مهمة

### 1. تحديد المريض دائماً
تأكد من وجود `patientId` و `patientName` قبل إضافة أي خدمة.

### 2. الأسعار الدقيقة
احتفظ بقاعدة بيانات للأسعار واستخدمها بدلاً من الأسعار الثابتة.

### 3. التحقق من التأمين
تحقق من تغطية التأمين قبل إضافة الخدمة:

```typescript
const handleServiceWithInsurance = (patientId, patientName, service) => {
  const insurance = getPatientInsurance(patientId);
  
  if (insurance && insurance.covers(service.type)) {
    const patientShare = service.price * (1 - insurance.coverage);
    // سجل الخدمة بسعر حصة المريض فقط
  }
};
```

### 4. الإشعارات
استخدم Toast لإعلام المستخدم:

```typescript
addMedication(patientId, patientName, medicine, quantity, price);
// سيظهر تلقائياً: "تم إضافة الخدمة بنجاح"
```

### 5. التكامل التدريجي
يمكنك البدء بقسم واحد واختباره قبل تطبيقه على بقية الأقسام.

---

## الخطوات التالية

1. **اختر قسم للبدء** - ننصح بالصيدلية أو المختبر
2. **أضف الكود** - استخدم الأمثلة أعلاه
3. **اختبر** - تأكد من تسجيل الخدمات بشكل صحيح
4. **راجع الفواتير** - تحقق من صفحة `/billing`
5. **كرر** - طبق على الأقسام الأخرى

---

**مستعد للبدء؟** 🚀

جرب إضافة أول خدمة في أي قسم واشاهد كيف تظهر تلقائياً في صفحة الفواتير!
