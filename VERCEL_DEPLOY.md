# 🚀 دليل النشر على Vercel

## خطوات النشر السريع

### 1. تجهيز الملفات ✅
تم إنشاء الملفات التالية:
- ✅ `vercel.json` - إعدادات Vercel
- ✅ `.vercelignore` - ملفات مستبعدة
- ✅ `api/index.ts` - Serverless function

### 2. إضافة Environment Variables

في Vercel Dashboard → Project → Settings → Environment Variables:

```
DATABASE_URL
postgresql://neondb_owner:npg_Sm3hnGs9DflM@ep-late-voice-a425w1yn-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require

POSTGRES_PRISMA_URL
postgresql://neondb_owner:npg_Sm3hnGs9DflM@ep-late-voice-a425w1yn-pooler.us-east-1.aws.neon.tech/neondb?connect_timeout=15&sslmode=require

POSTGRES_URL_NON_POOLING
postgresql://neondb_owner:npg_Sm3hnGs9DflM@ep-late-voice-a425w1yn.us-east-1.aws.neon.tech/neondb?sslmode=require

NODE_ENV
production
```

### 3. النشر

#### الطريقة الأولى: من GitHub
1. اذهب إلى [vercel.com/new](https://vercel.com/new)
2. اختر repository: `Jetixia-Updates/Hospital-final`
3. اضغط Deploy

#### الطريقة الثانية: من Terminal
```bash
# تثبيت Vercel CLI
npm i -g vercel

# تسجيل دخول
vercel login

# نشر
vercel --prod
```

### 4. بعد النشر

تأكد من:
- ✅ Database متصل
- ✅ API endpoints تعمل
- ✅ Frontend يظهر بشكل صحيح

### اختبار API:
```bash
curl https://your-app.vercel.app/api/ping
```

يجب أن تحصل على:
```json
{"message":"ping pong"}
```

## 🔧 استكشاف الأخطاء

### خطأ Database Connection:
- تأكد من إضافة `DATABASE_URL` في Environment Variables
- تأكد من أن Neon database يعمل

### خطأ Prisma:
- تأكد من تشغيل `npx prisma generate` في build
- موجود في `package.json` → `vercel-build` script

### خطأ API:
- تحقق من Vercel Logs
- تأكد من `api/index.ts` موجود

## 📊 مراقبة الأداء

في Vercel Dashboard:
- **Analytics**: لمتابعة الزيارات
- **Logs**: لمتابعة الأخطاء
- **Speed Insights**: لقياس الأداء

## 🌍 Custom Domain (اختياري)

لإضافة نطاق خاص:
1. Vercel Dashboard → Domains
2. أضف النطاق
3. اتبع تعليمات DNS

---

✅ **المشروع جاهز للنشر الآن!**
