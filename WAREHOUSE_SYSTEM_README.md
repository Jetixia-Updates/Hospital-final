# نظام إدارة المخازن والمستلزمات - دليل شامل
# Warehouse & Supplies Management System - Complete Guide

## نظرة عامة | Overview

نظام متكامل لإدارة مخازن المستشفى وصرف المستلزمات لجميع الأقسام مع الربط التلقائي بنظام المحاسبة وتتبع خطوات المريض.

A comprehensive system for hospital warehouse management and supplies dispensing for all departments with automatic integration to billing system and patient service tracking.

---

## المميزات الرئيسية | Key Features

### 1. إدارة المخزون | Inventory Management
- ✅ تتبع المخزون الحالي لجميع الأصناف
- ✅ تنبيهات تلقائية للمخزون المنخفض والمنتهي
- ✅ إدارة فئات متعددة (أدوية، أدوات جراحية، معدات طبية...)
- ✅ تتبع الصلاحيات وأرقام الدفعات
- ✅ إدارة شروط التخزين المختلفة

### 2. طلبات الصرف | Stock Requests
- ✅ إنشاء طلبات من أي قسم
- ✅ تحديد مستوى الأولوية (عادي، عاجل، طارئ)
- ✅ الربط بمعلومات المريض (اختياري)
- ✅ الموافقة والتتبع التلقائي

### 3. صرف المستلزمات | Dispensing
- ✅ صرف كامل أو جزئي
- ✅ التحقق من المخزون المتاح
- ✅ تحديث المخزون تلقائياً
- ✅ سجل شامل لجميع عمليات الصرف

### 4. الربط بنظام المحاسبة | Billing Integration
- ✅ **إضافة تلقائية للفاتورة عند الصرف**
- ✅ ربط الخدمات بمعلومات المريض
- ✅ حساب التكاليف تلقائياً
- ✅ تتبع شامل لخطوات المريض

### 5. التقارير والتحليلات | Reports & Analytics
- ✅ تقارير الاستهلاك الشهري
- ✅ أكثر الأصناف طلباً
- ✅ تحليل التكاليف حسب القسم
- ✅ معدل دوران المخزون

---

## البنية التقنية | Technical Architecture

### الملفات الأساسية | Core Files

#### 1. Types Definition
**File:** `shared/warehouse.ts`

```typescript
export interface InventoryItem {
  id: string;
  name: string;
  category: ItemCategory;
  currentStock: number;
  minimumStock: number;
  unitPrice: number;
  location: string;
  // ... more fields
}

export interface StockRequest {
  id: string;
  requestNumber: string;
  department: string;
  items: RequestItem[];
  patientId?: string;  // للربط بالمريض
  patientName?: string;
  // ... more fields
}
```

#### 2. Warehouse Hook
**File:** `client/hooks/use-warehouse.ts`

الـ Hook الرئيسي لإدارة المخازن مع الربط التلقائي بالمحاسبة:

```typescript
export function useWarehouse() {
  // Inventory Management
  const getInventoryItems = () => { ... }
  const updateStock = () => { ... }
  
  // Request Management
  const createStockRequest = () => { ... }
  const approveRequest = () => { ... }
  
  // Dispensing with Auto-Billing
  const dispenseItems = () => {
    // إذا كان هناك patientId
    // يتم إضافة الخدمة تلقائياً للفاتورة
    if (patientId && patientName) {
      addServiceToBilling({
        patientId,
        patientName,
        type: getCategoryServiceType(item.category),
        name: item.name,
        quantity: quantity,
        unitPrice: item.unitPrice,
      });
    }
  }
  
  // Quick Dispense
  const quickDispense = () => { ... }
}
```

---

## كيفية الاستخدام | How to Use

### 1. طلب المستلزمات من أي قسم
#### Request Supplies from Any Department

استخدم مكون `RequestSupplies` في أي صفحة قسم:

```tsx
import { RequestSupplies } from "@/components/RequestSupplies";

// في صفحة الصيدلية
<RequestSupplies
  department="pharmacy"
  departmentName="الصيدلية"
  requestedBy="USR-001"
  requestedByName="د. سارة أحمد"
  patientId="P-2024-001"     // اختياري - للربط بالمريض
  patientName="أحمد محمد"    // اختياري
  onRequestCreated={(requestId) => {
    console.log("تم إنشاء الطلب:", requestId);
  }}
/>
```

### 2. صرف المستلزمات
#### Dispense Supplies

استخدم مكون `DispenseSupplies` لتنفيذ الطلبات:

```tsx
import { DispenseSupplies } from "@/components/DispenseSupplies";

<DispenseSupplies
  request={stockRequest}
  dispensedBy="USR-001"
  dispensedByName="موظف المخزن"
  onDispensed={(success, billingAdded) => {
    if (success) {
      console.log("تم الصرف بنجاح");
      if (billingAdded) {
        console.log("تمت إضافة الخدمة للفاتورة تلقائياً");
      }
    }
  }}
/>
```

### 3. الصرف السريع (بدون طلب)
#### Quick Dispense (Without Request)

للحالات العاجلة:

```typescript
import { useWarehouse } from "@/hooks/use-warehouse";

const { quickDispense } = useWarehouse();

quickDispense({
  itemId: "item_123",
  quantity: 5,
  department: "emergency",
  departmentName: "قسم الطوارئ",
  dispensedBy: "USR-001",
  dispensedByName: "د. أحمد",
  patientId: "P-2024-001",    // اختياري
  patientName: "محمد علي",     // اختياري
  urgency: "emergency"
});
```

### 4. تتبع خدمات المريض
#### Track Patient Services

```tsx
import { PatientServiceTracker } from "@/components/PatientServiceTracker";

<PatientServiceTracker
  patientId="P-2024-001"
  patientName="أحمد محمد"
  departmentName="الصيدلية"
/>
```

---

## أمثلة الاستخدام حسب القسم
## Usage Examples by Department

### الصيدلية | Pharmacy

```tsx
// في صفحة الصيدلية
import { RequestSupplies } from "@/components/RequestSupplies";
import { useWarehouse } from "@/hooks/use-warehouse";

function PharmacyPage() {
  const { quickDispense } = useWarehouse();
  
  // صرف دواء للمريض بسرعة
  const dispenseMedication = (medicationId, patientId, patientName) => {
    quickDispense({
      itemId: medicationId,
      quantity: 1,
      department: "pharmacy",
      departmentName: "الصيدلية",
      dispensedBy: currentUser.id,
      dispensedByName: currentUser.name,
      patientId,
      patientName,
    });
    // ✅ سيتم تحديث المخزون تلقائياً
    // ✅ سيتم إضافة الدواء لفاتورة المريض تلقائياً
  };
  
  return (
    <div>
      {/* زر طلب مستلزمات جديدة */}
      <RequestSupplies
        department="pharmacy"
        departmentName="الصيدلية"
        requestedBy={currentUser.id}
        requestedByName={currentUser.name}
      />
    </div>
  );
}
```

### العمليات الجراحية | Surgery

```tsx
// في صفحة العمليات
function SurgeryPage() {
  return (
    <RequestSupplies
      department="surgery"
      departmentName="العمليات الجراحية"
      requestedBy={currentUser.id}
      requestedByName={currentUser.name}
      patientId={patient.id}
      patientName={patient.name}
      // سيتم إضافة تكلفة المستلزمات الجراحية للفاتورة
    />
  );
}
```

### قسم الطوارئ | Emergency

```tsx
// في صفحة الطوارئ
function EmergencyPage() {
  return (
    <RequestSupplies
      department="emergency"
      departmentName="قسم الطوارئ"
      requestedBy={currentUser.id}
      requestedByName={currentUser.name}
      patientId={patient.id}
      patientName={patient.name}
      // يمكن تحديد أولوية عالية للطوارئ
    />
  );
}
```

### المختبر | Laboratory

```tsx
// في صفحة المختبر
function LabPage() {
  return (
    <RequestSupplies
      department="laboratory"
      departmentName="المختبر"
      requestedBy={currentUser.id}
      requestedByName={currentUser.name}
      patientId={patient.id}
      patientName={patient.name}
    />
  );
}
```

---

## آلية الربط التلقائي بالمحاسبة
## Automatic Billing Integration Mechanism

### كيف يعمل النظام | How It Works

```
1. طلب المستلزمات
   ↓
2. الموافقة على الطلب
   ↓
3. صرف المستلزمات من المخزن
   ↓
4. [إذا كان هناك patientId]
   ↓
5. ✨ إضافة تلقائية لفاتورة المريض
   ↓
6. تحديث المخزون
   ↓
7. تسجيل عملية الصرف
```

### الكود الداخلي | Internal Code

```typescript
// في use-warehouse.ts
const dispenseItems = (...) => {
  // ... صرف المستلزمات
  
  // التكامل التلقائي مع المحاسبة
  if (request.patientId && request.patientName) {
    const billingService = addServiceToBilling({
      patientId: request.patientId,
      patientName: request.patientName,
      type: getCategoryServiceType(item.category), // medications → "medication"
      name: item.name,
      department: request.departmentName,
      quantity: quantity,
      unitPrice: item.unitPrice,
      notes: `صرف من المخزن - ${request.requestNumber}`,
    });
    
    if (billingService) {
      dispensingRecord.addedToBilling = true;
      dispensingRecord.billingServiceId = billingService.id;
    }
  }
};
```

### تحويل الفئات لأنواع الخدمات
### Category to Service Type Mapping

```typescript
const mapping = {
  medical_equipment: "therapy",
  surgical_instruments: "surgery",
  medications: "medication",
  consumables: "consultation",
  laboratory: "laboratory",
  radiology: "radiology",
  cleaning: "accommodation",
  office: "consultation",
  nutrition: "accommodation",
  ppe: "consultation",
};
```

---

## الإحصائيات والتقارير | Statistics & Reports

### البيانات المتاحة | Available Data

1. **المخزون**
   - إجمالي الأصناف
   - القيمة الإجمالية
   - الأصناف المنخفضة
   - الأصناف المنتهية

2. **الطلبات**
   - الطلبات المعلقة
   - الطلبات المعتمدة
   - الطلبات المنفذة
   - طلبات اليوم

3. **الصرف**
   - عمليات الصرف اليوم
   - القيمة الإجمالية للصرف
   - أكثر الأصناف صرفاً
   - أكثر الأقسام طلباً

4. **المحاسبة**
   - الخدمات المضافة للفواتير
   - القيمة الإجمالية
   - نسبة الربط التلقائي

---

## صفحة التجربة | Demo Page

تم إنشاء صفحة تجريبية شاملة على الرابط:
**`/warehouse-demo`**

### المحتويات | Contents

1. **سير العمل التفاعلي**
   - شرح خطوات النظام
   - أزرار تجريبية للاختبار
   - مثال كود مباشر

2. **سجل الطلبات**
   - عرض جميع الطلبات
   - إمكانية الصرف المباشر
   - تتبع الحالات

3. **تتبع الفاتورة**
   - مكون تتبع خدمات المريض
   - سجل الصرف التفصيلي
   - حالة الربط بالمحاسبة

---

## الملفات المضافة | Added Files

### Core System
1. ✅ `shared/warehouse.ts` - Types & Interfaces
2. ✅ `client/hooks/use-warehouse.ts` - Main Hook
3. ✅ `client/pages/Warehouse.tsx` - Main Page
4. ✅ `client/pages/WarehouseIntegrationDemo.tsx` - Demo Page

### Components
5. ✅ `client/components/RequestSupplies.tsx` - Request Component
6. ✅ `client/components/DispenseSupplies.tsx` - Dispense Component

### Translations
7. ✅ `client/i18n/locales/ar.json` - Arabic (200+ keys)

### Routing & Navigation
8. ✅ `client/App.tsx` - Routes added
9. ✅ `client/components/Layout.tsx` - Navigation updated

---

## الخطوات التالية للإنتاج
## Next Steps for Production

### 1. قاعدة البيانات | Database

استبدال التخزين المؤقت بقاعدة بيانات:

```sql
CREATE TABLE inventory_items (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255),
  category VARCHAR(50),
  current_stock INT,
  minimum_stock INT,
  unit_price DECIMAL(10,2),
  -- ...
);

CREATE TABLE stock_requests (
  id VARCHAR(50) PRIMARY KEY,
  request_number VARCHAR(50),
  department VARCHAR(100),
  patient_id VARCHAR(50),
  status VARCHAR(20),
  -- ...
);

CREATE TABLE dispensing_records (
  id VARCHAR(50) PRIMARY KEY,
  request_id VARCHAR(50),
  item_id VARCHAR(50),
  patient_id VARCHAR(50),
  added_to_billing BOOLEAN,
  billing_service_id VARCHAR(50),
  -- ...
);
```

### 2. API Endpoints

```typescript
// server/routes/warehouse.ts
app.get("/api/warehouse/inventory", getInventory);
app.post("/api/warehouse/request", createRequest);
app.post("/api/warehouse/dispense", dispenseItems);
app.get("/api/warehouse/reports", getReports);
```

### 3. المصادقة والأمان | Authentication & Security

- تحديد صلاحيات المستخدمين
- تسجيل جميع العمليات (Audit Log)
- تشفير البيانات الحساسة

### 4. التنبيهات والإشعارات | Alerts & Notifications

- إشعارات المخزون المنخفض
- تنبيهات الصلاحية القريبة
- إشعارات الموافقة على الطلبات

---

## الدعم والمساعدة | Support & Help

### أمثلة سريعة | Quick Examples

#### 1. إضافة صنف جديد للمخزون
```typescript
const newItem: InventoryItem = {
  id: "item_new",
  name: "صنف جديد",
  category: "medications",
  currentStock: 100,
  minimumStock: 20,
  unitPrice: 50,
  // ...
};
```

#### 2. إنشاء طلب برمجياً
```typescript
const request = createStockRequest({
  requestedBy: userId,
  requestedByName: userName,
  department: "pharmacy",
  departmentName: "الصيدلية",
  items: [
    {
      itemId: "item_1",
      itemName: "قفازات",
      requestedQuantity: 10,
      // ...
    }
  ],
  patientId: "P-001",
  patientName: "أحمد محمد",
});
```

---

## الخلاصة | Summary

✅ نظام شامل لإدارة المخازن
✅ ربط تلقائي بنظام المحاسبة
✅ تتبع كامل لخطوات المريض
✅ سهل الاستخدام من أي قسم
✅ مكونات قابلة لإعادة الاستخدام
✅ صفحة تجريبية للاختبار

**الصفحات:**
- `/warehouse` - الصفحة الرئيسية
- `/warehouse-demo` - صفحة التجربة والأمثلة

**المكونات الرئيسية:**
- `<RequestSupplies />` - لطلب المستلزمات
- `<DispenseSupplies />` - لصرف المستلزمات
- `<PatientServiceTracker />` - لتتبع خدمات المريض

---

## تواريخ مهمة | Important Dates

- **تاريخ الإنشاء:** 15 نوفمبر 2025
- **الإصدار:** 1.0.0
- **الحالة:** ✅ جاهز للاستخدام (Demo)

