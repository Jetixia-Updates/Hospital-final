# 🏥 نظام إدارة المستشفى المتكامل

نظام شامل لإدارة المستشفيات يتضمن جميع الأقسام والإدارات المطلوبة.

## 🚀 نشر على Vercel

### الطريقة الأولى: من خلال Vercel Dashboard

1. **افتح** [Vercel Dashboard](https://vercel.com/new)
2. **اختر** الـ repository من GitHub: `Jetixia-Updates/Hospital-final`
3. **اضغط** Deploy

### الطريقة الثانية: من خلال Vercel CLI

```bash
# تثبيت Vercel CLI
npm i -g vercel

# تسجيل الدخول
vercel login

# نشر المشروع
vercel --prod
```

## ⚙️ Environment Variables المطلوبة

يجب إضافة المتغيرات التالية في Vercel Dashboard → Settings → Environment Variables:

```env
DATABASE_URL=postgresql://neondb_owner:npg_Sm3hnGs9DflM@ep-late-voice-a425w1yn-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require

NODE_ENV=production

POSTGRES_PRISMA_URL=postgresql://neondb_owner:npg_Sm3hnGs9DflM@ep-late-voice-a425w1yn-pooler.us-east-1.aws.neon.tech/neondb?connect_timeout=15&sslmode=require

POSTGRES_URL_NON_POOLING=postgresql://neondb_owner:npg_Sm3hnGs9DflM@ep-late-voice-a425w1yn.us-east-1.aws.neon.tech/neondb?sslmode=require
```

## 📋 الميزات

### الأقسام المتوفرة:
- 👥 **إدارة المرضى** - سجلات كاملة للمرضى
- 👨‍⚕️ **إدارة الموظفين** - HR متكامل مع الحضور والرواتب
- 💊 **الصيدلية** - إدارة الأدوية والوصفات
- 📅 **المواعيد** - جدولة المواعيد
- 💰 **المالية** - الفواتير والمدفوعات
- 🔬 **المعمل** - التحاليل المخبرية
- 🏥 **الطوارئ** - قسم الطوارئ
- 🔪 **العمليات الجراحية** - إدارة العمليات
- 🏢 **التأمين** - المطالبات التأمينية
- 🍽️ **التغذية** - إدارة الوجبات
- 📦 **سلسلة التوريد** - إدارة المخزون
- 🔧 **الصيانة** - طلبات الصيانة
- 📊 **السجلات الطبية** - الملفات الطبية

## 🛠️ التقنيات المستخدمة

- **Frontend**: React 18 + TypeScript + Vite + TailwindCSS
- **Backend**: Express.js + Node.js
- **Database**: PostgreSQL (Neon)
- **ORM**: Prisma
- **UI Components**: Radix UI + shadcn/ui
- **i18n**: React-i18next (عربي + إنجليزي)

## 📦 التثبيت المحلي

```bash
# تثبيت المكتبات
npm install

# تشغيل المشروع
npm run dev

# بناء المشروع
npm run build
```

## 🌐 API Endpoints

جميع الـ endpoints متاحة على `/api`:

- `GET /api/patients` - جميع المرضى
- `POST /api/patients` - إضافة مريض
- `GET /api/staff` - جميع الموظفين
- `GET /api/medicines` - جميع الأدوية
- `POST /api/prescriptions` - إنشاء وصفة
- `POST /api/dispensing` - صرف دواء
- `GET /api/appointments` - المواعيد
- `GET /api/bills` - الفواتير
- `GET /api/lab-tests` - التحاليل

[المزيد من التفاصيل في DATABASE_INTEGRATION.md]

## 📱 الوصول

- **Local**: http://localhost:8081
- **Production**: https://your-app.vercel.app

## 🔐 الأمان

- ✅ SSL مفعل لجميع الاتصالات
- ✅ Environment variables محمية
- ✅ Database connection pooling
- ✅ Input validation مع Zod

## 📞 الدعم

للمزيد من المعلومات، راجع:
- [DATABASE_INTEGRATION.md](./DATABASE_INTEGRATION.md) - شرح قاعدة البيانات
- [AGENTS.md](./AGENTS.md) - دليل المطورين

## 📄 الترخيص

Private - جميع الحقوق محفوظة
