// Radiology Management Types

export type RadiologyModality = 
  | "xray"                 // أشعة سينية
  | "ct"                   // أشعة مقطعية
  | "mri"                  // رنين مغناطيسي
  | "ultrasound"           // سونار/موجات فوق صوتية
  | "mammography"          // ماموجرام
  | "fluoroscopy"          // فلوروسكوبي
  | "dexa"                 // قياس كثافة العظام
  | "nuclear"              // طب نووي
  | "pet"                  // PET Scan
  | "doppler"              // دوبلر
  | "ecg"                  // رسم قلب
  | "echo"                 // إيكو
  | "eeg";                 // رسم مخ

export type RadiologyBodyPart =
  | "head"                 // الرأس
  | "brain"                // المخ
  | "neck"                 // الرقبة
  | "chest"                // الصدر
  | "abdomen"              // البطن
  | "pelvis"               // الحوض
  | "spine"                // العمود الفقري
  | "upper_limb"           // الطرف العلوي
  | "lower_limb"           // الطرف السفلي
  | "heart"                // القلب
  | "lungs"                // الرئتين
  | "liver"                // الكبد
  | "kidney"               // الكلى
  | "joints"               // المفاصل
  | "bones"                // العظام
  | "soft_tissue"          // الأنسجة الرخوة
  | "vascular"             // الأوعية الدموية
  | "breast"               // الثدي
  | "thyroid"              // الغدة الدرقية
  | "prostate"             // البروستاتا
  | "uterus"               // الرحم
  | "ovaries";             // المبايض

export type RadiologyStatus = 
  | "pending"              // قيد الانتظار
  | "scheduled"            // تم الجدولة
  | "in_progress"          // جاري التصوير
  | "completed"            // مكتمل
  | "reported"             // تم كتابة التقرير
  | "reviewed"             // تمت المراجعة
  | "delivered"            // تم التسليم
  | "cancelled";           // ملغي

export type RadiologyPriority = "routine" | "urgent" | "stat";

export interface RadiologyExam {
  id: string;
  code: string;
  name: string;
  nameAr: string;
  nameEn: string;
  modality: RadiologyModality;
  bodyPart: RadiologyBodyPart;
  price: number;
  duration: number;                     // مدة الفحص بالدقائق
  description?: string;
  descriptionAr?: string;
  descriptionEn?: string;
  preparations?: string;                // تحضيرات ما قبل الفحص
  preparationsAr?: string;
  preparationsEn?: string;
  requiresContrast?: boolean;           // يتطلب صبغة
  requiresFasting?: boolean;            // يتطلب صيام
  fastingHours?: number;
  contraindications?: string;           // موانع الاستعمال
  contraindicationsAr?: string;
  contraindicationsEn?: string;
  radiationDose?: string;               // جرعة الإشعاع
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface RadiologyRequest {
  id: string;
  requestNumber: string;
  patientId: string;
  patientName: string;
  patientAge: number;
  patientGender: "male" | "female";
  patientWeight?: number;
  doctorId: string;
  doctorName: string;
  department: string;
  requestDate: string;
  scheduledDate?: string;
  scheduledTime?: string;
  priority: RadiologyPriority;
  status: RadiologyStatus;
  exams: {
    examId: string;
    examName: string;
    examCode: string;
    modality: RadiologyModality;
    bodyPart: RadiologyBodyPart;
    price: number;
    requiresContrast?: boolean;
    contrastType?: string;
    contrastAmount?: string;
  }[];
  totalAmount: number;
  clinicalIndication?: string;          // الدلالة السريرية
  clinicalHistory?: string;             // التاريخ المرضي
  previousExams?: string;               // فحوصات سابقة
  allergies?: string;                   // حساسية
  isPregnant?: boolean;                 // حامل؟
  kidneyFunction?: string;              // وظائف الكلى
  scheduledBy?: string;
  performedAt?: string;
  performedBy?: string;
  performedByName?: string;
  completedAt?: string;
  reportedAt?: string;
  reportedBy?: string;
  reportedByName?: string;
  reviewedAt?: string;
  reviewedBy?: string;
  deliveredAt?: string;
  deliveredTo?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface RadiologyReport {
  id: string;
  requestId: string;
  examId: string;
  examName: string;
  patientId: string;
  patientName: string;
  technique?: string;                   // التقنية المستخدمة
  findings: string;                     // النتائج
  findingsAr?: string;
  findingsEn?: string;
  impression: string;                   // الانطباع/التشخيص
  impressionAr?: string;
  impressionEn?: string;
  recommendations?: string;             // التوصيات
  recommendationsAr?: string;
  recommendationsEn?: string;
  comparisonWithPrevious?: string;      // المقارنة مع فحوصات سابقة
  limitations?: string;                 // محددات الفحص
  imageQuality?: "excellent" | "good" | "acceptable" | "poor";
  contrastUsed?: boolean;
  contrastType?: string;
  contrastAmount?: string;
  radiationDose?: string;
  numberOfImages?: number;
  reportedBy: string;
  reportedByName: string;
  reportedByTitle: string;
  reportedAt: string;
  reviewedBy?: string;
  reviewedByName?: string;
  reviewedAt?: string;
  signedBy?: string;
  signedByName?: string;
  signedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface RadiologyEquipment {
  id: string;
  name: string;
  nameAr: string;
  nameEn: string;
  modality: RadiologyModality;
  model: string;
  manufacturer: string;
  serialNumber: string;
  installationDate: string;
  status: "operational" | "maintenance" | "out_of_service";
  lastMaintenanceDate?: string;
  nextMaintenanceDate?: string;
  calibrationDate?: string;
  nextCalibrationDate?: string;
  location: string;
  roomNumber?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface RadiologyStatistics {
  totalRequests: number;
  pendingRequests: number;
  scheduledToday: number;
  completedToday: number;
  urgentRequests: number;
  averageCompletionTime: number;        // بالدقائق
  examsByModality: { modality: RadiologyModality; count: number }[];
  examsByBodyPart: { bodyPart: RadiologyBodyPart; count: number }[];
  criticalFindings: number;
  revenue: number;
}

// Predefined Radiology Exams Data
export const RADIOLOGY_EXAMS_DATABASE: RadiologyExam[] = [
  // X-Ray - أشعة سينية
  {
    id: "rad_xr_001",
    code: "XRAY-CHEST-PA",
    name: "أشعة عادية على الصدر - وضع أمامي خلفي",
    nameAr: "أشعة عادية على الصدر - وضع أمامي خلفي",
    nameEn: "Chest X-Ray - PA View",
    modality: "xray",
    bodyPart: "chest",
    price: 200,
    duration: 15,
    requiresContrast: false,
    requiresFasting: false,
    radiationDose: "0.1 mSv",
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "rad_xr_002",
    code: "XRAY-CHEST-LAT",
    name: "أشعة عادية على الصدر - وضع جانبي",
    nameAr: "أشعة عادية على الصدر - وضع جانبي",
    nameEn: "Chest X-Ray - Lateral View",
    modality: "xray",
    bodyPart: "chest",
    price: 200,
    duration: 15,
    requiresContrast: false,
    requiresFasting: false,
    radiationDose: "0.1 mSv",
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "rad_xr_003",
    code: "XRAY-ABD",
    name: "أشعة عادية على البطن",
    nameAr: "أشعة عادية على البطن",
    nameEn: "Abdominal X-Ray",
    modality: "xray",
    bodyPart: "abdomen",
    price: 250,
    duration: 15,
    requiresContrast: false,
    requiresFasting: false,
    radiationDose: "0.7 mSv",
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "rad_xr_004",
    code: "XRAY-SPINE-LS",
    name: "أشعة عادية على الفقرات القطنية",
    nameAr: "أشعة عادية على الفقرات القطنية",
    nameEn: "Lumbar Spine X-Ray",
    modality: "xray",
    bodyPart: "spine",
    price: 300,
    duration: 20,
    requiresContrast: false,
    requiresFasting: false,
    radiationDose: "1.5 mSv",
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "rad_xr_005",
    code: "XRAY-SPINE-CS",
    name: "أشعة عادية على الفقرات العنقية",
    nameAr: "أشعة عادية على الفقرات العنقية",
    nameEn: "Cervical Spine X-Ray",
    modality: "xray",
    bodyPart: "spine",
    price: 300,
    duration: 20,
    requiresContrast: false,
    requiresFasting: false,
    radiationDose: "0.2 mSv",
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "rad_xr_006",
    code: "XRAY-KNEE",
    name: "أشعة عادية على الركبة",
    nameAr: "أشعة عادية على الركبة",
    nameEn: "Knee X-Ray",
    modality: "xray",
    bodyPart: "joints",
    price: 250,
    duration: 15,
    requiresContrast: false,
    requiresFasting: false,
    radiationDose: "0.005 mSv",
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "rad_xr_007",
    code: "XRAY-HAND",
    name: "أشعة عادية على اليد",
    nameAr: "أشعة عادية على اليد",
    nameEn: "Hand X-Ray",
    modality: "xray",
    bodyPart: "upper_limb",
    price: 200,
    duration: 15,
    requiresContrast: false,
    requiresFasting: false,
    radiationDose: "0.001 mSv",
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },

  // CT Scan - أشعة مقطعية
  {
    id: "rad_ct_001",
    code: "CT-BRAIN",
    name: "أشعة مقطعية على المخ",
    nameAr: "أشعة مقطعية على المخ",
    nameEn: "CT Brain",
    modality: "ct",
    bodyPart: "brain",
    price: 1500,
    duration: 30,
    requiresContrast: false,
    requiresFasting: false,
    radiationDose: "2 mSv",
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "rad_ct_002",
    code: "CT-BRAIN-CONTRAST",
    name: "أشعة مقطعية على المخ بالصبغة",
    nameAr: "أشعة مقطعية على المخ بالصبغة",
    nameEn: "CT Brain with Contrast",
    modality: "ct",
    bodyPart: "brain",
    price: 2000,
    duration: 45,
    requiresContrast: true,
    requiresFasting: true,
    fastingHours: 4,
    preparationsAr: "صيام 4 ساعات - فحص وظائف الكلى",
    radiationDose: "2 mSv",
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "rad_ct_003",
    code: "CT-CHEST",
    name: "أشعة مقطعية على الصدر",
    nameAr: "أشعة مقطعية على الصدر",
    nameEn: "CT Chest",
    modality: "ct",
    bodyPart: "chest",
    price: 1800,
    duration: 30,
    requiresContrast: false,
    requiresFasting: false,
    radiationDose: "7 mSv",
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "rad_ct_004",
    code: "CT-ABD-PELV",
    name: "أشعة مقطعية على البطن والحوض",
    nameAr: "أشعة مقطعية على البطن والحوض",
    nameEn: "CT Abdomen & Pelvis",
    modality: "ct",
    bodyPart: "abdomen",
    price: 2200,
    duration: 40,
    requiresContrast: false,
    requiresFasting: true,
    fastingHours: 6,
    preparationsAr: "صيام 6 ساعات",
    radiationDose: "10 mSv",
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "rad_ct_005",
    code: "CT-SPINE-LS",
    name: "أشعة مقطعية على الفقرات القطنية",
    nameAr: "أشعة مقطعية على الفقرات القطنية",
    nameEn: "CT Lumbar Spine",
    modality: "ct",
    bodyPart: "spine",
    price: 1600,
    duration: 30,
    requiresContrast: false,
    requiresFasting: false,
    radiationDose: "5 mSv",
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },

  // MRI - رنين مغناطيسي
  {
    id: "rad_mr_001",
    code: "MRI-BRAIN",
    name: "رنين مغناطيسي على المخ",
    nameAr: "رنين مغناطيسي على المخ",
    nameEn: "MRI Brain",
    modality: "mri",
    bodyPart: "brain",
    price: 3000,
    duration: 60,
    requiresContrast: false,
    requiresFasting: false,
    contraindicationsAr: "وجود معادن أو أجهزة طبية مزروعة",
    radiationDose: "0 mSv (لا إشعاع)",
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "rad_mr_002",
    code: "MRI-BRAIN-CONTRAST",
    name: "رنين مغناطيسي على المخ بالصبغة",
    nameAr: "رنين مغناطيسي على المخ بالصبغة",
    nameEn: "MRI Brain with Contrast",
    modality: "mri",
    bodyPart: "brain",
    price: 3800,
    duration: 75,
    requiresContrast: true,
    requiresFasting: true,
    fastingHours: 4,
    preparationsAr: "صيام 4 ساعات - فحص وظائف الكلى",
    contraindicationsAr: "وجود معادن أو أجهزة طبية مزروعة",
    radiationDose: "0 mSv (لا إشعاع)",
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "rad_mr_003",
    code: "MRI-SPINE-LS",
    name: "رنين مغناطيسي على الفقرات القطنية",
    nameAr: "رنين مغناطيسي على الفقرات القطنية",
    nameEn: "MRI Lumbar Spine",
    modality: "mri",
    bodyPart: "spine",
    price: 3200,
    duration: 60,
    requiresContrast: false,
    requiresFasting: false,
    contraindicationsAr: "وجود معادن أو أجهزة طبية مزروعة",
    radiationDose: "0 mSv (لا إشعاع)",
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "rad_mr_004",
    code: "MRI-KNEE",
    name: "رنين مغناطيسي على الركبة",
    nameAr: "رنين مغناطيسي على الركبة",
    nameEn: "MRI Knee",
    modality: "mri",
    bodyPart: "joints",
    price: 2800,
    duration: 50,
    requiresContrast: false,
    requiresFasting: false,
    contraindicationsAr: "وجود معادن أو أجهزة طبية مزروعة",
    radiationDose: "0 mSv (لا إشعاع)",
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "rad_mr_005",
    code: "MRI-ABD",
    name: "رنين مغناطيسي على البطن",
    nameAr: "رنين مغناطيسي على البطن",
    nameEn: "MRI Abdomen",
    modality: "mri",
    bodyPart: "abdomen",
    price: 3500,
    duration: 70,
    requiresContrast: false,
    requiresFasting: true,
    fastingHours: 6,
    preparationsAr: "صيام 6 ساعات",
    contraindicationsAr: "وجود معادن أو أجهزة طبية مزروعة",
    radiationDose: "0 mSv (لا إشعاع)",
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },

  // Ultrasound - سونار
  {
    id: "rad_us_001",
    code: "US-ABD",
    name: "سونار على البطن",
    nameAr: "سونار على البطن",
    nameEn: "Abdominal Ultrasound",
    modality: "ultrasound",
    bodyPart: "abdomen",
    price: 500,
    duration: 30,
    requiresContrast: false,
    requiresFasting: true,
    fastingHours: 6,
    preparationsAr: "صيام 6 ساعات - شرب 4 أكواب ماء قبل الفحص بساعة",
    radiationDose: "0 mSv (لا إشعاع)",
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "rad_us_002",
    code: "US-PELV",
    name: "سونار على الحوض",
    nameAr: "سونار على الحوض",
    nameEn: "Pelvic Ultrasound",
    modality: "ultrasound",
    bodyPart: "pelvis",
    price: 500,
    duration: 30,
    requiresContrast: false,
    requiresFasting: false,
    preparationsAr: "شرب 4 أكواب ماء قبل الفحص بساعة - عدم التبول",
    radiationDose: "0 mSv (لا إشعاع)",
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "rad_us_003",
    code: "US-OB",
    name: "سونار للحمل",
    nameAr: "سونار للحمل",
    nameEn: "Obstetric Ultrasound",
    modality: "ultrasound",
    bodyPart: "uterus",
    price: 600,
    duration: 30,
    requiresContrast: false,
    requiresFasting: false,
    preparationsAr: "شرب ماء كافي",
    radiationDose: "0 mSv (لا إشعاع)",
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "rad_us_004",
    code: "US-THYROID",
    name: "سونار على الغدة الدرقية",
    nameAr: "سونار على الغدة الدرقية",
    nameEn: "Thyroid Ultrasound",
    modality: "ultrasound",
    bodyPart: "thyroid",
    price: 400,
    duration: 20,
    requiresContrast: false,
    requiresFasting: false,
    radiationDose: "0 mSv (لا إشعاع)",
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "rad_us_005",
    code: "US-BREAST",
    name: "سونار على الثدي",
    nameAr: "سونار على الثدي",
    nameEn: "Breast Ultrasound",
    modality: "ultrasound",
    bodyPart: "breast",
    price: 500,
    duration: 25,
    requiresContrast: false,
    requiresFasting: false,
    radiationDose: "0 mSv (لا إشعاع)",
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },

  // Doppler - دوبلر
  {
    id: "rad_dp_001",
    code: "DOPPLER-CAROTID",
    name: "دوبلر على الشرايين السباتية",
    nameAr: "دوبلر على الشرايين السباتية",
    nameEn: "Carotid Doppler",
    modality: "doppler",
    bodyPart: "vascular",
    price: 800,
    duration: 40,
    requiresContrast: false,
    requiresFasting: false,
    radiationDose: "0 mSv (لا إشعاع)",
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "rad_dp_002",
    code: "DOPPLER-LOWER",
    name: "دوبلر على أوردة الساقين",
    nameAr: "دوبلر على أوردة الساقين",
    nameEn: "Lower Limb Venous Doppler",
    modality: "doppler",
    bodyPart: "vascular",
    price: 700,
    duration: 35,
    requiresContrast: false,
    requiresFasting: false,
    radiationDose: "0 mSv (لا إشعاع)",
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },

  // Mammography - ماموجرام
  {
    id: "rad_mm_001",
    code: "MAMMO",
    name: "ماموجرام - تصوير الثدي",
    nameAr: "ماموجرام - تصوير الثدي",
    nameEn: "Mammography",
    modality: "mammography",
    bodyPart: "breast",
    price: 800,
    duration: 30,
    requiresContrast: false,
    requiresFasting: false,
    preparationsAr: "تجنب استخدام مزيلات العرق أو البودرة",
    radiationDose: "0.4 mSv",
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },

  // DEXA Scan - قياس كثافة العظام
  {
    id: "rad_dx_001",
    code: "DEXA",
    name: "قياس كثافة العظام",
    nameAr: "قياس كثافة العظام",
    nameEn: "Bone Density Scan (DEXA)",
    modality: "dexa",
    bodyPart: "bones",
    price: 600,
    duration: 20,
    requiresContrast: false,
    requiresFasting: false,
    radiationDose: "0.001 mSv",
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },

  // ECG - رسم قلب
  {
    id: "rad_ec_001",
    code: "ECG",
    name: "رسم قلب",
    nameAr: "رسم قلب",
    nameEn: "Electrocardiogram (ECG)",
    modality: "ecg",
    bodyPart: "heart",
    price: 150,
    duration: 15,
    requiresContrast: false,
    requiresFasting: false,
    radiationDose: "0 mSv (لا إشعاع)",
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },

  // Echo - إيكو
  {
    id: "rad_eh_001",
    code: "ECHO",
    name: "إيكو على القلب",
    nameAr: "إيكو على القلب",
    nameEn: "Echocardiogram",
    modality: "echo",
    bodyPart: "heart",
    price: 800,
    duration: 40,
    requiresContrast: false,
    requiresFasting: false,
    radiationDose: "0 mSv (لا إشعاع)",
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
