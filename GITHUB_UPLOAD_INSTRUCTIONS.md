# 🚀 تعليمات رفع المشروع على GitHub

## ✅ تم بالفعل:
- ✅ إنشاء Git repository محلياً
- ✅ إضافة جميع الملفات (130 ملف)
- ✅ عمل commit للمشروع (55,762 سطر من الكود)
- ✅ إعداد .gitignore

## 📋 الخطوات المتبقية:

### الطريقة الأولى: استخدام GitHub CLI (الأسرع)

إذا كان لديك GitHub CLI مُثبّت:

```bash
# قم بتسجيل الدخول
gh auth login

# أنشئ repository وارفع المشروع
gh repo create hospital-management-system --private --source=. --remote=origin --push
```

### الطريقة الثانية: يدوياً عبر الموقع

#### 1. أنشئ Repository على GitHub:
1. افتح [GitHub.com](https://github.com)
2. اضغط على زر **"+"** في الأعلى
3. اختر **"New repository"**
4. اكتب اسم الـ repository: `hospital-management-system`
5. اختر **Private** (خاص) أو **Public** (عام)
6. **لا تضف** README أو .gitignore أو license (موجودين بالفعل)
7. اضغط **"Create repository"**

#### 2. اربط المشروع المحلي بـ GitHub:

انسخ رابط الـ repository من GitHub (مثل: `https://github.com/YOUR_USERNAME/hospital-management-system.git`)

ثم نفذ هذه الأوامر:

```bash
cd "/Users/ahmed/Downloads/Hospital -ks1"

# استبدل YOUR_USERNAME باسم حسابك على GitHub
git remote add origin https://github.com/YOUR_USERNAME/hospital-management-system.git

# أو إذا كنت تستخدم SSH:
# git remote add origin git@github.com:YOUR_USERNAME/hospital-management-system.git

# ارفع المشروع
git branch -M main
git push -u origin main
```

### الطريقة الثالثة: استخدام GitHub Desktop

1. حمّل [GitHub Desktop](https://desktop.github.com/)
2. افتح التطبيق وسجل دخول
3. اختر **File → Add Local Repository**
4. حدد مجلد: `/Users/ahmed/Downloads/Hospital -ks1`
5. اضغط **Publish repository**
6. اختر الاسم والإعدادات
7. اضغط **Publish**

---

## 📦 معلومات المشروع:

- **الاسم المقترح**: `hospital-management-system`
- **الوصف**: Complete Hospital Management System with 20+ modules
- **اللغة الرئيسية**: TypeScript
- **الإطار**: React + Vite + Express

### المميزات الرئيسية:
- ✅ نظام إدارة المرضى والسجلات الطبية
- ✅ إدارة الصيدلية مع نظام صرف الأدوية
- ✅ إدارة التغذية (7 تبويبات)
- ✅ إدارة الموارد البشرية (7 تبويبات)
- ✅ الطوارئ، العيادات، والعمليات
- ✅ المالية، التأمين، وسلسلة الإمداد
- ✅ دعم متعدد اللغات (عربي/إنجليزي)
- ✅ واجهة مستخدم حديثة مع Radix UI

---

## 🔐 ملاحظات الأمان:

تأكد من أن ملف `.env` **غير مُضاف** للـ repository (موجود في .gitignore)

إذا كان يحتوي على معلومات حساسة:
```bash
# تحقق من أن .env غير متتبع
git status --ignored

# إذا كان موجود، أزله:
git rm --cached .env
git commit -m "Remove .env from tracking"
```

---

## 📝 الأوامر المفيدة:

```bash
# عرض حالة Git
git status

# عرض السجل
git log --oneline

# عرض الـ remote المُضاف
git remote -v

# إلغاء آخر commit (إذا احتجت)
git reset --soft HEAD~1
```

---

## 🎉 بعد الرفع:

سيكون المشروع متاحاً على:
`https://github.com/YOUR_USERNAME/hospital-management-system`

يمكنك إضافة:
- ⭐ Stars
- 👀 Watchers
- 🍴 Fork للمساهمين
- 📋 Issues للمشاكل
- 📖 Wiki للتوثيق
- 🔄 Actions للـ CI/CD

---

## 💡 نصائح:

1. أضف ملف `README.md` شامل يشرح المشروع
2. أضف لقطات شاشة (Screenshots) في مجلد `docs/images`
3. اكتب ملف `CONTRIBUTING.md` إذا كنت تريد مساهمات
4. استخدم GitHub Issues لتتبع المهام
5. أضف GitHub Actions للـ deployment التلقائي

---

**آخر تحديث**: November 15, 2025  
**Commit**: fa8c5d8 - Initial commit (130 files, 55,762 insertions)
