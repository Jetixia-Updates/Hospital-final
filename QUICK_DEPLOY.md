# ⚡ نشر سريع على Vercel

## 🎯 خطوات النشر (5 دقائق)

### 1️⃣ افتح Vercel
اذهب إلى: **https://vercel.com/new**

### 2️⃣ اختر Repository
- اختر: `Jetixia-Updates/Hospital-final`
- اضغط **Import**

### 3️⃣ إعدادات المشروع
```
Framework Preset: Other
Build Command: npm run vercel-build
Output Directory: dist
Install Command: npm install
```

### 4️⃣ Environment Variables (مهم جداً!)
أضف المتغيرات التالية:

**DATABASE_URL**
```
postgresql://neondb_owner:npg_Sm3hnGs9DflM@ep-late-voice-a425w1yn-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require
```

**POSTGRES_PRISMA_URL**
```
postgresql://neondb_owner:npg_Sm3hnGs9DflM@ep-late-voice-a425w1yn-pooler.us-east-1.aws.neon.tech/neondb?connect_timeout=15&sslmode=require
```

**NODE_ENV**
```
production
```

### 5️⃣ اضغط Deploy! 🚀

---

## ✅ بعد النشر

### اختبار API:
```bash
curl https://your-app.vercel.app/api/ping
```

### اختبار Database:
```bash
curl https://your-app.vercel.app/api/patients
```

---

## 🔧 إذا حدثت مشاكل:

### المشكلة: Database connection failed
**الحل**: تأكد من إضافة `DATABASE_URL` في Environment Variables

### المشكلة: Prisma Client not found
**الحل**: تأكد من وجود `postinstall` script في package.json

### المشكلة: 404 on API routes
**الحل**: تأكد من وجود ملف `api/index.ts`

---

## 📊 مراقبة التطبيق

في Vercel Dashboard:
- **Deployments**: لمتابعة النشر
- **Logs**: للأخطاء
- **Analytics**: للإحصائيات

---

## 🎉 تم بنجاح!

الآن تطبيقك متاح على:
`https://your-project-name.vercel.app`

---

## 📱 الخطوة التالية (اختياري)

### إضافة Custom Domain:
1. اذهب إلى: Settings → Domains
2. أضف نطاقك
3. اتبع تعليمات DNS

---

**ملاحظة مهمة:**
- جميع الملفات جاهزة ومرفوعة على GitHub ✅
- Repository: https://github.com/Jetixia-Updates/Hospital-final
- آخر commit: "Vercel Deployment Configuration"
