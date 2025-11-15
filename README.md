# 🏥 Hospital Management System

<div align="center">

![Hospital Management System](https://img.shields.io/badge/Hospital-Management-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue)
![React](https://img.shields.io/badge/React-18-61dafb)
![Vite](https://img.shields.io/badge/Vite-7.2-646cff)
![Express](https://img.shields.io/badge/Express-4.18-green)
![License](https://img.shields.io/badge/License-MIT-yellow)

نظام إدارة مستشفيات شامل ومتكامل مع أكثر من 20 وحدة إدارية

[العربية](#-المميزات) | [English](#-features) | [التثبيت](#-التثبيت) | [التوثيق](#-التوثيق)

</div>

---

## 📋 نظرة عامة

نظام إدارة مستشفيات حديث وشامل مبني بتقنيات الويب الحديثة، يوفر حلولاً متكاملة لإدارة جميع جوانب المستشفى من المرضى والموظفين إلى الصيدلية والمالية.

### 🎯 الهدف
توفير منصة واحدة متكاملة لإدارة جميع عمليات المستشفى بكفاءة وسهولة.

---

## ✨ المميزات

### 🏥 إدارة المرضى
- ✅ تسجيل المرضى الجدد بنموذج شامل
- ✅ السجلات الطبية الإلكترونية
- ✅ تتبع التاريخ المرضي
- ✅ إدارة الزيارات والمواعيد
- ✅ ملفات المرضى الرقمية

### 💊 إدارة الصيدلية
- ✅ نظام صرف الأدوية للمرضى
- ✅ إدارة المخزون الدوائي
- ✅ تتبع تواريخ الانتهاء
- ✅ إدارة الموردين
- ✅ التكامل مع التأمين الطبي
- ✅ طلبات الشراء التلقائية

### 👨‍⚕️ إدارة الموارد البشرية
- ✅ ملفات الموظفين الكاملة
- ✅ إدارة الأطباء والممرضين
- ✅ جداول المناوبات
- ✅ تتبع الحضور والانصراف
- ✅ إدارة الإجازات
- ✅ تقييم الأداء

### 🍽️ إدارة التغذية
- ✅ قوائم الطعام اليومية
- ✅ خطط النظام الغذائي
- ✅ وجبات المرضى المخصصة
- ✅ إدارة طلبات الوجبات
- ✅ إدارة مخزون المطبخ
- ✅ جداول التوزيع

### 🏥 وحدات إضافية
- ✅ **الطوارئ**: إدارة حالات الطوارئ والإسعاف
- ✅ **العيادات**: جدولة المواعيد والاستشارات
- ✅ **غرف العمليات**: إدارة العمليات الجراحية
- ✅ **الغرف**: إدارة الأسرة والحجوزات
- ✅ **الصيانة**: طلبات الصيانة والإصلاحات
- ✅ **المالية**: الفواتير والمدفوعات
- ✅ **التأمين**: التكامل مع شركات التأمين
- ✅ **سلسلة الإمداد**: المشتريات والمخازن
- ✅ **ERP/CRM**: إدارة علاقات العملاء

---

## 🛠️ التقنيات المستخدمة

### Frontend
- **React 18** - مكتبة واجهة المستخدم
- **TypeScript** - لغة البرمجة
- **Vite** - أداة البناء
- **TailwindCSS 3** - تصميم الواجهات
- **Radix UI** - مكونات واجهة المستخدم
- **React Router 6** - التوجيه
- **i18next** - دعم متعدد اللغات

### Backend
- **Express.js** - إطار عمل الخادم
- **Node.js** - بيئة التشغيل

### الأدوات
- **Lucide React** - الأيقونات
- **React Hook Form** - إدارة النماذج
- **Zod** - التحقق من البيانات

---

## 🚀 التثبيت

### المتطلبات
- Node.js (النسخة 18 أو أحدث)
- npm أو pnpm أو yarn

### خطوات التثبيت

```bash
# استنساخ المشروع
git clone https://github.com/YOUR_USERNAME/hospital-management-system.git
cd hospital-management-system

# تثبيت الحزم
npm install
# أو
pnpm install

# نسخ ملف البيئة
cp .env.example .env

# تشغيل المشروع في وضع التطوير
npm run dev
# أو
pnpm dev
```

سيعمل التطبيق على: `http://localhost:8080`

---

## 📦 البناء للإنتاج

```bash
# بناء المشروع
npm run build

# معاينة النسخة المبنية
npm run preview

# تشغيل الخادم
npm start
```

---

## 🗂️ هيكل المشروع

```
hospital-management-system/
├── client/                  # تطبيق React
│   ├── components/         # المكونات المشتركة
│   │   ├── ui/            # مكونات واجهة المستخدم
│   │   ├── Layout.tsx     # التخطيط الرئيسي
│   │   └── ...
│   ├── pages/             # صفحات التطبيق
│   │   ├── Index.tsx      # الصفحة الرئيسية
│   │   ├── Patients.tsx   # إدارة المرضى
│   │   ├── Pharmacy.tsx   # الصيدلية
│   │   ├── Staff.tsx      # الموارد البشرية
│   │   └── ...
│   ├── i18n/              # ملفات الترجمة
│   │   ├── locales/
│   │   │   ├── ar.json    # العربية
│   │   │   └── en.json    # الإنجليزية
│   │   └── config.ts
│   └── ...
├── server/                 # خادم Express
│   ├── index.ts           # نقطة الدخول
│   └── routes/            # المسارات
├── shared/                # الأنواع المشتركة
└── ...
```

---

## 🌍 دعم اللغات

النظام يدعم:
- 🇸🇦 العربية (الافتراضية)
- 🇺🇸 الإنجليزية

يمكن التبديل بين اللغات من خلال واجهة المستخدم.

---

## 📸 لقطات الشاشة

### الصفحة الرئيسية
![Dashboard](docs/images/dashboard.png)

### إدارة المرضى
![Patients](docs/images/patients.png)

### صرف الأدوية
![Pharmacy Dispensing](docs/images/pharmacy-dispense.png)

---

## 🔐 الأمان

- ✅ التحقق من صحة البيانات
- ✅ حماية من XSS
- ✅ حماية من CSRF
- ✅ تشفير البيانات الحساسة
- ✅ إدارة الصلاحيات

---

## 🧪 الاختبار

```bash
# تشغيل الاختبارات
npm test

# الاختبارات مع التغطية
npm run test:coverage

# فحص الأنواع
npm run typecheck
```

---

## 📝 التوثيق

التوثيق الكامل متوفر في مجلد `docs/`:
- [دليل المستخدم](docs/user-guide.md)
- [دليل المطور](docs/developer-guide.md)
- [API Documentation](docs/api.md)

---

## 🤝 المساهمة

المساهمات مرحب بها! يرجى قراءة [دليل المساهمة](CONTRIBUTING.md) أولاً.

### خطوات المساهمة:
1. Fork المشروع
2. أنشئ فرع للميزة (`git checkout -b feature/AmazingFeature`)
3. Commit التغييرات (`git commit -m 'Add some AmazingFeature'`)
4. Push للفرع (`git push origin feature/AmazingFeature`)
5. افتح Pull Request

---

## 📄 الرخصة

هذا المشروع مرخص تحت رخصة MIT - انظر ملف [LICENSE](LICENSE) للتفاصيل.

---

## 👥 الفريق

- **Ahmed** - المطور الرئيسي - [@ahmed](https://github.com/YOUR_USERNAME)

---

## 🙏 شكر وتقدير

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Lucide Icons](https://lucide.dev/)

---

## 📞 التواصل

- 📧 Email: ahmed@adsolutions.com
- 🌐 Website: [Your Website]
- 💼 LinkedIn: [Your Profile]

---

## 🗺️ خارطة الطريق

- [ ] إضافة نظام المواعيد
- [ ] تطبيق الهاتف المحمول
- [ ] تقارير متقدمة
- [ ] لوحة تحكم تحليلية
- [ ] التكامل مع أنظمة خارجية
- [ ] نظام الإشعارات الفورية

---

<div align="center">

**صُنع بـ ❤️ في السعودية**

إذا أعجبك المشروع، لا تنسى إعطاءه ⭐

</div>
