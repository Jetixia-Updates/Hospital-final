#!/bin/bash

# 🚀 Hospital Management System - GitHub Upload Script
# This script helps you upload the project to GitHub

echo "════════════════════════════════════════════════════════════════"
echo "🏥 Hospital Management System - GitHub Upload"
echo "════════════════════════════════════════════════════════════════"
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if repository name is provided
if [ -z "$1" ]; then
    echo -e "${YELLOW}⚠️  الاستخدام: ./upload_to_github.sh <repository-name>${NC}"
    echo -e "${YELLOW}   مثال: ./upload_to_github.sh hospital-management-system${NC}"
    echo ""
    echo "أو أدخل اسم الـ repository الآن:"
    read -p "اسم الـ Repository: " REPO_NAME
    
    if [ -z "$REPO_NAME" ]; then
        echo -e "${RED}❌ يجب إدخال اسم repository${NC}"
        exit 1
    fi
else
    REPO_NAME=$1
fi

echo ""
echo -e "${BLUE}📦 اسم الـ Repository: ${REPO_NAME}${NC}"
echo ""

# Ask for GitHub username
echo "أدخل اسم المستخدم على GitHub:"
read -p "Username: " GITHUB_USERNAME

if [ -z "$GITHUB_USERNAME" ]; then
    echo -e "${RED}❌ يجب إدخال اسم المستخدم${NC}"
    exit 1
fi

echo ""
echo -e "${BLUE}👤 اسم المستخدم: ${GITHUB_USERNAME}${NC}"
echo ""

# Ask for protocol (HTTPS or SSH)
echo "اختر بروتوكول الاتصال:"
echo "1) HTTPS (https://github.com/...)"
echo "2) SSH (git@github.com:...)"
read -p "اختيارك (1 أو 2): " PROTOCOL_CHOICE

if [ "$PROTOCOL_CHOICE" == "2" ]; then
    REMOTE_URL="git@github.com:${GITHUB_USERNAME}/${REPO_NAME}.git"
else
    REMOTE_URL="https://github.com/${GITHUB_USERNAME}/${REPO_NAME}.git"
fi

echo ""
echo -e "${BLUE}🔗 Remote URL: ${REMOTE_URL}${NC}"
echo ""

# Confirm
echo "════════════════════════════════════════════════════════════════"
echo -e "${YELLOW}⚠️  تأكيد المعلومات:${NC}"
echo ""
echo "  Repository: ${REPO_NAME}"
echo "  Username: ${GITHUB_USERNAME}"
echo "  Remote URL: ${REMOTE_URL}"
echo ""
read -p "هل المعلومات صحيحة؟ (y/n): " CONFIRM

if [ "$CONFIRM" != "y" ] && [ "$CONFIRM" != "Y" ]; then
    echo -e "${RED}❌ تم الإلغاء${NC}"
    exit 1
fi

echo ""
echo "════════════════════════════════════════════════════════════════"
echo -e "${GREEN}✅ جاري الإعداد...${NC}"
echo ""

# Check if remote already exists
if git remote | grep -q "^origin$"; then
    echo -e "${YELLOW}⚠️  Remote 'origin' موجود بالفعل. سيتم استبداله.${NC}"
    git remote remove origin
fi

# Add remote
echo -e "${BLUE}🔗 إضافة remote...${NC}"
git remote add origin "$REMOTE_URL"

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ فشل في إضافة remote${NC}"
    exit 1
fi

echo -e "${GREEN}✅ تم إضافة remote بنجاح${NC}"
echo ""

# Rename branch to main
echo -e "${BLUE}🔄 تغيير اسم الفرع إلى 'main'...${NC}"
git branch -M main

echo -e "${GREEN}✅ تم تغيير اسم الفرع${NC}"
echo ""

# Show instructions
echo "════════════════════════════════════════════════════════════════"
echo -e "${YELLOW}⚠️  خطوة مهمة:${NC}"
echo ""
echo "1. افتح GitHub.com وسجل دخول"
echo "2. اذهب إلى: https://github.com/new"
echo "3. أدخل اسم الـ repository: ${REPO_NAME}"
echo "4. اختر Private أو Public"
echo "5. لا تضف README أو .gitignore"
echo "6. اضغط 'Create repository'"
echo ""
read -p "هل أنشأت الـ repository؟ اضغط Enter للمتابعة..."

echo ""
echo "════════════════════════════════════════════════════════════════"
echo -e "${GREEN}🚀 جاري رفع المشروع...${NC}"
echo ""

# Push to GitHub
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "════════════════════════════════════════════════════════════════"
    echo -e "${GREEN}✅✅✅ تم رفع المشروع بنجاح! ✅✅✅${NC}"
    echo "════════════════════════════════════════════════════════════════"
    echo ""
    echo -e "${GREEN}🎉 المشروع متاح الآن على:${NC}"
    echo -e "${BLUE}   https://github.com/${GITHUB_USERNAME}/${REPO_NAME}${NC}"
    echo ""
    echo "════════════════════════════════════════════════════════════════"
    echo ""
    echo "📋 الأوامر المفيدة:"
    echo ""
    echo "  # رفع تحديثات جديدة:"
    echo "  git add ."
    echo "  git commit -m 'وصف التحديث'"
    echo "  git push"
    echo ""
    echo "  # سحب التحديثات:"
    echo "  git pull"
    echo ""
    echo "  # عرض الحالة:"
    echo "  git status"
    echo ""
else
    echo ""
    echo "════════════════════════════════════════════════════════════════"
    echo -e "${RED}❌ فشل في رفع المشروع${NC}"
    echo "════════════════════════════════════════════════════════════════"
    echo ""
    echo "الأسباب المحتملة:"
    echo "  1. الـ repository غير موجود على GitHub"
    echo "  2. صلاحيات الوصول غير صحيحة"
    echo "  3. اسم المستخدم أو الـ repository خاطئ"
    echo ""
    echo "راجع ملف GITHUB_UPLOAD_INSTRUCTIONS.md للمزيد من التفاصيل"
    echo ""
fi
