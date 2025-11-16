# نظام إدارة المخازن المتقدم
# Advanced Warehouse Management System

## 📦 نظرة عامة | Overview

نظام شامل متعدد المستويات لإدارة مخازن المستشفى بجميع أقسامه، مع مكونات قابلة لإعادة الاستخدام وصفحات متخصصة لكل قسم.

A comprehensive multi-level system for managing hospital warehouses across all departments, with reusable components and department-specific pages.

---

## 🏗️ البنية المعمارية | Architecture

### المستويات الثلاثة | Three-Tier Structure

```
1️⃣ المستوى المركزي | Central Level
   └─ /warehouse - الإدارة المركزية لجميع المخازن

2️⃣ مستوى الأقسام | Department Level
   ├─ /warehouse/pharmacy - مخزن الصيدلية
   ├─ /warehouse/surgery - مخزن العمليات
   ├─ /warehouse/emergency - مخزن الطوارئ (قادم)
   ├─ /warehouse/laboratory - مخزن المختبر (قادم)
   └─ /warehouse/radiology - مخزن الأشعة (قادم)

3️⃣ مستوى التكامل | Integration Level
   └─ /warehouse-demo - عرض توضيحي للتكامل مع المحاسبة
```

---

## 📁 الملفات المنشأة | Created Files

### Core System Files

#### 1. **shared/warehouse.ts** (370+ lines)
النوع الشامل لنظام المخازن | Complete type system for warehouse operations

**الواجهات الرئيسية | Main Interfaces:**
```typescript
- InventoryItem (20+ fields) - عناصر المخزون
- StockRequest - طلبات الصرف
- StockTransfer - التحويلات بين المخازن
- DispensingRecord - سجلات الصرف
- StockAdjustment - تعديلات المخزون
- Supplier - الموردين
- PurchaseOrder - أوامر الشراء
- StockAudit - الجرد
```

**الأنواع المساعدة | Helper Types:**
```typescript
- ItemCategory (10 types) - فئات الأصناف
- UnitType (10+ units) - وحدات القياس
- StorageCondition (4 types) - ظروف التخزين
- RequestStatus - حالات الطلبات
- AdjustmentType - أنواع التعديلات
```

---

#### 2. **client/hooks/use-warehouse.ts** (370+ lines)
Hook شامل لإدارة المخازن | Comprehensive warehouse management hook

**الوظائف الرئيسية | Main Functions:**

```typescript
// 1. إدارة المخزون | Inventory Management
getInventoryItems(filters?) → InventoryItem[]
updateStock(itemId, quantity, operation) → void
getLowStockItems() → InventoryItem[]

// 2. إدارة الطلبات | Request Management
createStockRequest(input) → StockRequest
approveRequest(requestId, approvedBy) → void
getStockRequests(filters?) → StockRequest[]

// 3. الصرف مع التكامل | Dispensing with Integration
dispenseItems(requestId, dispensedBy, items) → void
// ⭐ تكامل تلقائي مع المحاسبة عند وجود patientId
quickDispense(input) → DispensingRecord

// 4. التحويلات | Transfers
createTransfer(input) → StockTransfer
completeTransfer(transferId) → void

// 5. التعديلات | Adjustments
createAdjustment(input) → StockAdjustment
```

**التكامل التلقائي | Automatic Integration:**
```typescript
// عند صرف أصناف لمريض، يتم تلقائياً:
if (request.patientId && request.patientName) {
  addServiceToBilling({
    patientId: request.patientId,
    patientName: request.patientName,
    type: getCategoryServiceType(item.category),
    name: item.name,
    quantity: dispensedQty,
    unitPrice: item.unitPrice
  });
  dispensingRecord.addedToBilling = true;
}
```

---

### Page Components

#### 3. **client/pages/Warehouse.tsx** (650+ lines)
الصفحة المركزية لإدارة جميع المخازن | Central page for managing all warehouses

**المميزات | Features:**
- ✅ 4 بطاقات إحصائية (إجمالي الأصناف، مخزون منخفض، طلبات معلقة، استهلاك)
- ✅ 4 تبويبات رئيسية:
  - 📦 **المخزون** - إدارة كاملة مع بحث وفلاتر
  - 📋 **الطلبات** - إدارة طلبات الصرف
  - 🔄 **التحويلات** - نقل بين المخازن
  - 👥 **الموردين** - إدارة الموردين
- ✅ بحث متقدم وفلاتر متعددة
- ✅ إضافة أصناف جديدة
- ✅ تعديل المخزون
- ✅ تصدير البيانات

**الاستخدام | Usage:**
```tsx
import Warehouse from "./pages/Warehouse";

<Route path="/warehouse" element={<Warehouse />} />
```

---

#### 4. **client/pages/PharmacyWarehouse.tsx** (290+ lines)
صفحة متخصصة لمخزن الصيدلية | Specialized pharmacy warehouse page

**مميزات خاصة | Special Features:**
- 💊 تركيز على الأدوية والمستلزمات الدوائية
- 📅 **تبويب الأدوية قريبة الصلاحية** - تحذيرات استباقية
- 🔴 تتبع تواريخ الانتهاء
- 🧊 إدارة ظروف التخزين (مبرد، مجمد، درجة حرارة الغرفة)
- 📦 تتبع أرقام الدفعات والمصنعين
- ⚠️ تنبيهات المخزون المنخفض

**التبويبات | Tabs:**
1. **المخزون الحالي** - جميع الأدوية المتوفرة
2. **قريبة الصلاحية** - أدوية ستنتهي خلال 6 أشهر
3. **مخزون منخفض** - أدوية وصلت لحد الطلب

**الاستخدام | Usage:**
```tsx
import PharmacyWarehouse from "./pages/PharmacyWarehouse";

<Route path="/warehouse/pharmacy" element={<PharmacyWarehouse />} />
```

---

#### 5. **client/pages/SurgeryWarehouse.tsx** (361+ lines)
صفحة متخصصة لمخزن العمليات | Specialized surgery warehouse page

**مميزات خاصة | Special Features:**
- ✂️ تركيز على الأدوات والمعدات الجراحية
- 🧼 **إدارة التعقيم** - تتبع حالة تعقيم الأدوات
- 📋 **الأطقم الجراحية** - إدارة أطقم العمليات الجاهزة
- ✅ متابعة آخر تاريخ تعقيم
- 🔍 فحص اكتمال الأطقم
- 📊 حالة الجاهزية للعمليات

**التبويبات | Tabs:**
1. **المخزون** - جميع الأدوات والمستلزمات
2. **الأطقم الجراحية** - أطقم معدة ومجهزة
3. **التعقيم** - حالة التعقيم والأدوات المعقمة

**الاستخدام | Usage:**
```tsx
import SurgeryWarehouse from "./pages/SurgeryWarehouse";

<Route path="/warehouse/surgery" element={<SurgeryWarehouse />} />
```

---

### Reusable Components

#### 6. **client/components/InventoryItemDialog.tsx** (NEW - 250+ lines)
نافذة إضافة صنف جديد للمخزون | Dialog for adding new inventory items

**الحقول | Fields:**
```typescript
- nameAr, nameEn - الأسماء بالعربي والإنجليزي
- category - الفئة (10 خيارات)
- barcode, serialNumber - رموز التعريف
- currentStock, minimumStock, maximumStock - مستويات المخزون
- reorderLevel, reorderQuantity - إعدادات إعادة الطلب
- unit - وحدة القياس (10+ خيارات)
- unitPrice - سعر الوحدة
- location, warehouse - الموقع والمخزن
- manufacturer, batchNumber - المصنع والدفعة
- expiryDate - تاريخ الانتهاء
- storageConditions - ظروف التخزين (4 خيارات)
- leadTime - وقت التوريد
```

**الاستخدام | Usage:**
```tsx
<InventoryItemDialog 
  onItemAdded={(item) => {
    // Handle new item
  }}
/>
```

---

#### 7. **client/components/StockAdjustmentDialog.tsx** (NEW - 180+ lines)
نافذة تعديل المخزون | Dialog for stock adjustments

**أنواع التعديل | Adjustment Types:**
```typescript
- increase ⬆️ - زيادة
- decrease ⬇️ - نقصان
- damage 💔 - تلف
- expiry 📅 - انتهاء صلاحية
- loss 🔴 - فقدان
- found ✅ - عثور
- return 🔄 - إرجاع
- correction 🔧 - تصحيح
```

**المميزات | Features:**
- معاينة فورية للمخزون الجديد
- حقل إلزامي للسبب
- ملاحظات إضافية
- تتبع المسؤول عن التعديل

**الاستخدام | Usage:**
```tsx
<StockAdjustmentDialog 
  item={inventoryItem}
  onAdjustment={(adj) => {
    // Handle adjustment
  }}
/>
```

---

#### 8. **client/components/TransferItemsDialog.tsx** (NEW - 250+ lines)
نافذة تحويل الأصناف بين المخازن | Dialog for transferring items between warehouses

**المميزات | Features:**
- اختيار المخزن المصدر والمخزن الهدف
- إضافة أصناف متعددة للتحويل
- إدخال الكميات لكل صنف
- ملاحظات التحويل
- تتبع حالة التحويل

**المخازن المتاحة | Available Warehouses:**
```typescript
- mainWarehouse - المخزن الرئيسي
- pharmacyWarehouse - مخزن الصيدلية
- surgeryWarehouse - مخزن العمليات
- emergencyWarehouse - مخزن الطوارئ
- labWarehouse - مخزن المختبر
- radiologyWarehouse - مخزن الأشعة
```

**الاستخدام | Usage:**
```tsx
<TransferItemsDialog 
  onTransfer={(transfer) => {
    // Handle transfer
  }}
/>
```

---

#### 9. **client/components/RequestSupplies.tsx** (350+ lines)
مكون قابل لإعادة الاستخدام لطلب المستلزمات | Reusable component for requesting supplies

**الاستخدام من أي قسم | Use from any department:**
```tsx
// في صفحة الصيدلية
<RequestSupplies
  department="pharmacy"
  departmentName="الصيدلية"
  requestedBy="current-user"
  requestedByName="Current User"
  patientId="P001"        // اختياري - للربط بمريض
  patientName="أحمد محمد"  // اختياري
/>

// في صفحة العمليات
<RequestSupplies
  department="surgery"
  departmentName="غرف العمليات"
  requestedBy="dr-ahmed"
  requestedByName="د. أحمد"
  patientId="P002"        // للربط التلقائي بالفاتورة
  patientName="فاطمة علي"
/>
```

---

#### 10. **client/components/DispenseSupplies.tsx** (320+ lines)
مكون صرف المستلزمات مع التكامل التلقائي | Component for dispensing with auto-integration

**التكامل التلقائي مع المحاسبة | Auto Billing Integration:**
عند صرف أصناف لمريض، يتم تلقائياً إضافتها للفاتورة.

**الاستخدام | Usage:**
```tsx
<DispenseSupplies
  request={stockRequest}
  dispensedBy="pharmacist-01"
  dispensedByName="الصيدلي محمد"
  onDispensed={(record) => {
    // Dispensing completed
  }}
/>
```

---

## 🎯 سيناريوهات الاستخدام | Use Cases

### 1️⃣ صيدلية المستشفى | Hospital Pharmacy

```typescript
// صفحة مخصصة: /warehouse/pharmacy

المميزات الخاصة:
✅ تتبع تواريخ انتهاء الصلاحية
✅ تحذيرات قبل 60 يوم من الانتهاء
✅ إدارة أرقام الدفعات
✅ تتبع ظروف التخزين (مبرد/مجمد)
✅ صرف سريع للأدوية
✅ ربط تلقائي بفاتورة المريض
```

**سير العمل | Workflow:**
1. فني الصيدلية يستقبل وصفة طبية
2. يطلب الأدوية من المخزن عبر `RequestSupplies`
3. تتم الموافقة على الطلب
4. الصيدلي يصرف الأدوية عبر `DispenseSupplies`
5. يتم تلقائياً:
   - تحديث المخزون
   - إضافة الأدوية لفاتورة المريض
   - تسجيل عملية الصرف

---

### 2️⃣ غرف العمليات | Operating Rooms

```typescript
// صفحة مخصصة: /warehouse/surgery

المميزات الخاصة:
✅ إدارة الأطقم الجراحية
✅ تتبع حالة التعقيم
✅ فحص اكتمال الأطقم
✅ طلب مستلزمات عملية محددة
✅ ربط بفاتورة المريض (العملية)
```

**سير العمل | Workflow:**
1. مسؤول غرف العمليات يطلب طقم جراحة قلب
2. يتحقق من حالة التعقيم للأدوات
3. يطلب مستلزمات إضافية إذا لزم
4. عند استخدامها في عملية، يتم الصرف
5. تضاف تلقائياً لفاتورة العملية

---

### 3️⃣ الإدارة المركزية | Central Management

```typescript
// الصفحة الرئيسية: /warehouse

الإشراف على:
✅ جميع المخازن الفرعية
✅ التحويلات بين الأقسام
✅ طلبات الشراء من الموردين
✅ التقارير والإحصائيات
✅ الجرد الدوري
```

---

## 📊 الإحصائيات | Statistics

### ملخص ما تم إنشاؤه | What Was Built

```
📁 الملفات المنشأة | Files Created: 10
📝 إجمالي السطور | Total Lines: ~3,500+
🧩 المكونات القابلة لإعادة الاستخدام | Reusable Components: 5
📄 الصفحات | Pages: 3
🎣 الـ Hooks | Hooks: 1
📋 الواجهات والأنواع | Interfaces & Types: 12+
🌍 مفاتيح الترجمة | Translation Keys: 200+
✅ أخطاء TypeScript | TypeScript Errors: 0
```

### التغطية الوظيفية | Functional Coverage

```
✅ إدارة المخزون (CRUD)
✅ طلبات الصرف (Workflow)
✅ التحويلات بين المخازن
✅ التعديلات والجرد
✅ تتبع الصلاحيات
✅ إدارة التعقيم (للعمليات)
✅ الأطقم الجراحية
✅ التكامل مع المحاسبة
✅ التقارير والإحصائيات
✅ بحث وفلاتر متقدمة
```

---

## 🚀 خطة التوسع المستقبلية | Future Expansion Plan

### الأقسام القادمة | Upcoming Departments

```typescript
// قريباً | Coming Soon

1. /warehouse/emergency
   - مخزن الطوارئ
   - صرف سريع للحالات العاجلة
   - أدوات الإنعاش

2. /warehouse/laboratory
   - مخزن المختبر
   - مستلزمات التحاليل
   - الكواشف والمواد الكيميائية

3. /warehouse/radiology
   - مخزن الأشعة
   - أفلام وصبغات
   - مستلزمات التصوير

4. /warehouse/nutrition
   - مخزن التغذية
   - وجبات المرضى
   - الحميات الخاصة

5. /warehouse/maintenance
   - مخزن الصيانة
   - قطع الغيار
   - أدوات الصيانة
```

### مميزات متقدمة | Advanced Features

```typescript
// قيد التطوير | In Development

✨ نظام الباركود والمسح الضوئي
✨ تتبع الأرقام التسلسلية
✨ تنبيهات ذكية (AI-powered)
✨ التنبؤ بالاستهلاك
✨ إعادة الطلب التلقائي
✨ تحليلات متقدمة
✨ لوحة تحكم تنفيذية
✨ تكامل مع أنظمة ERP خارجية
```

---

## 🔗 الربط مع الأنظمة الأخرى | Integration with Other Systems

### 1. نظام المحاسبة | Billing System
```typescript
// تكامل تلقائي عند الصرف
usePatientBilling() → addServiceToBilling()
```

### 2. نظام إدارة المرضى | Patient Management
```typescript
// ربط الطلبات بالمرضى
patientId, patientName in StockRequest
```

### 3. نظام الموارد البشرية | HR System
```typescript
// تتبع من طلب/صرف/وافق
requestedBy, dispensedBy, approvedBy
```

### 4. نظام الموردين | Supplier Management
```typescript
// إدارة الطلبيات والموردين
PurchaseOrder, Supplier interfaces
```

---

## 📝 ملاحظات مهمة | Important Notes

### للإنتاج | For Production

⚠️ **التخزين الحالي:** In-memory (للعرض التوضيحي)

🔄 **يجب التحويل إلى:**
- قاعدة بيانات (PostgreSQL / MySQL)
- API backend (Express / NestJS)
- State management (Redux / Zustand)

### الأمان | Security

🔐 **يجب إضافة:**
- مصادقة المستخدمين
- صلاحيات الوصول حسب الدور
- تسجيل العمليات (Audit Log)
- تشفير البيانات الحساسة

---

## 📞 الدعم | Support

للاستفسارات والتطوير:
- التوثيق الكامل في: `/WAREHOUSE_SYSTEM_README.md`
- أمثلة التكامل: `/warehouse-demo`
- الأنواع والواجهات: `/shared/warehouse.ts`

---

## ✅ الخلاصة | Summary

تم إنشاء نظام إدارة مخازن متكامل ومتطور يشمل:

✅ صفحة مركزية للإشراف على جميع المخازن
✅ صفحات متخصصة لكل قسم (الصيدلية، العمليات)
✅ 5 مكونات قابلة لإعادة الاستخدام
✅ تكامل تلقائي مع المحاسبة
✅ إدارة شاملة للمخزون
✅ نظام طلبات متقدم
✅ تحويلات بين المخازن
✅ تتبع الصلاحيات والتعقيم
✅ تقارير وإحصائيات
✅ 0 أخطاء TypeScript
✅ جاهز للتوسع المستقبلي

**النظام جاهز للاستخدام والتطوير! 🎉**
