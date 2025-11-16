// Laboratory & Tests Management Types

export type TestCategory = 
  | "hematology"           // فحوصات الدم
  | "biochemistry"         // كيمياء الدم
  | "microbiology"         // الميكروبيولوجي
  | "immunology"           // المناعة
  | "serology"             // الأمصال
  | "parasitology"         // الطفيليات
  | "urine"                // تحليل البول
  | "stool"                // تحليل البراز
  | "hormones"             // الهرمونات
  | "tumor_markers"        // دلالات الأورام
  | "coagulation"          // تجلط الدم
  | "blood_gases"          // غازات الدم
  | "drugs"                // تحليل المخدرات
  | "genetics"             // الوراثة
  | "pathology";           // علم الأمراض

export type TestStatus = 
  | "pending"              // قيد الانتظار
  | "in_progress"          // جاري التنفيذ
  | "completed"            // مكتمل
  | "reviewed"             // تمت المراجعة
  | "delivered"            // تم التسليم
  | "cancelled";           // ملغي

export type TestPriority = "routine" | "urgent" | "stat";

export type SampleType = 
  | "blood"                // دم
  | "serum"                // مصل
  | "plasma"               // بلازما
  | "urine"                // بول
  | "stool"                // براز
  | "sputum"               // بلغم
  | "csf"                  // سائل النخاع الشوكي
  | "swab"                 // مسحة
  | "tissue"               // نسيج
  | "fluid";               // سائل

export interface LabTest {
  id: string;
  code: string;
  name: string;
  nameAr: string;
  nameEn: string;
  category: TestCategory;
  sampleType: SampleType;
  normalRange?: string;
  normalRangeAr?: string;
  normalRangeEn?: string;
  unit?: string;
  price: number;
  duration: number;                    // مدة التحليل بالساعات
  description?: string;
  descriptionAr?: string;
  descriptionEn?: string;
  preparations?: string;               // تحضيرات ما قبل التحليل
  preparationsAr?: string;
  preparationsEn?: string;
  requiredFasting?: boolean;           // يتطلب صيام
  fastingHours?: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TestRequest {
  id: string;
  requestNumber: string;
  patientId: string;
  patientName: string;
  patientAge: number;
  patientGender: "male" | "female";
  doctorId: string;
  doctorName: string;
  department: string;
  requestDate: string;
  priority: TestPriority;
  status: TestStatus;
  tests: {
    testId: string;
    testName: string;
    testCode: string;
    category: TestCategory;
    sampleType: SampleType;
    price: number;
  }[];
  totalAmount: number;
  clinicalNotes?: string;               // ملاحظات سريرية
  sampleCollectedAt?: string;
  sampleCollectedBy?: string;
  startedAt?: string;
  completedAt?: string;
  reviewedAt?: string;
  reviewedBy?: string;
  deliveredAt?: string;
  deliveredTo?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface TestResult {
  id: string;
  requestId: string;
  testId: string;
  testName: string;
  testCode: string;
  patientId: string;
  patientName: string;
  value: string;                        // القيمة
  unit?: string;
  normalRange?: string;
  status: "normal" | "abnormal" | "critical";
  flags?: string[];                     // High, Low, Critical, etc.
  notes?: string;
  testedBy: string;
  testedByName: string;
  testedAt: string;
  reviewedBy?: string;
  reviewedByName?: string;
  reviewedAt?: string;
  method?: string;                      // طريقة الفحص
  equipment?: string;                   // الجهاز المستخدم
  createdAt: string;
  updatedAt: string;
}

export interface LabEquipment {
  id: string;
  name: string;
  nameAr: string;
  nameEn: string;
  model: string;
  manufacturer: string;
  serialNumber: string;
  category: string;
  status: "operational" | "maintenance" | "out_of_service";
  lastMaintenanceDate?: string;
  nextMaintenanceDate?: string;
  calibrationDate?: string;
  nextCalibrationDate?: string;
  location: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LabStatistics {
  totalRequests: number;
  pendingRequests: number;
  inProgressRequests: number;
  completedToday: number;
  urgentRequests: number;
  averageCompletionTime: number;       // بالساعات
  testsByCategory: { category: TestCategory; count: number }[];
  abnormalResults: number;
  criticalResults: number;
  revenue: number;
}

// Predefined Lab Tests Data
export const LAB_TESTS_DATABASE: LabTest[] = [
  // Hematology - فحوصات الدم
  {
    id: "test_hm_001",
    code: "CBC",
    name: "تحليل صورة دم كاملة",
    nameAr: "تحليل صورة دم كاملة",
    nameEn: "Complete Blood Count",
    category: "hematology",
    sampleType: "blood",
    normalRange: "حسب العمر والجنس",
    unit: "متعدد",
    price: 150,
    duration: 2,
    requiredFasting: false,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "test_hm_002",
    code: "ESR",
    name: "سرعة الترسيب",
    nameAr: "سرعة الترسيب",
    nameEn: "Erythrocyte Sedimentation Rate",
    category: "hematology",
    sampleType: "blood",
    normalRange: "0-20 mm/hr",
    unit: "mm/hr",
    price: 80,
    duration: 1,
    requiredFasting: false,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "test_hm_003",
    code: "HB",
    name: "الهيموجلوبين",
    nameAr: "الهيموجلوبين",
    nameEn: "Hemoglobin",
    category: "hematology",
    sampleType: "blood",
    normalRange: "12-16 g/dL (إناث) / 14-18 g/dL (ذكور)",
    unit: "g/dL",
    price: 60,
    duration: 1,
    requiredFasting: false,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },

  // Biochemistry - كيمياء الدم
  {
    id: "test_bc_001",
    code: "FBS",
    name: "سكر الدم صائم",
    nameAr: "سكر الدم صائم",
    nameEn: "Fasting Blood Sugar",
    category: "biochemistry",
    sampleType: "serum",
    normalRange: "70-100 mg/dL",
    unit: "mg/dL",
    price: 70,
    duration: 2,
    requiredFasting: true,
    fastingHours: 8,
    preparationsAr: "صيام 8 ساعات",
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "test_bc_002",
    code: "RBS",
    name: "سكر الدم عشوائي",
    nameAr: "سكر الدم عشوائي",
    nameEn: "Random Blood Sugar",
    category: "biochemistry",
    sampleType: "serum",
    normalRange: "< 140 mg/dL",
    unit: "mg/dL",
    price: 60,
    duration: 1,
    requiredFasting: false,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "test_bc_003",
    code: "HBA1C",
    name: "السكر التراكمي",
    nameAr: "السكر التراكمي",
    nameEn: "Glycated Hemoglobin (HbA1c)",
    category: "biochemistry",
    sampleType: "blood",
    normalRange: "< 5.7%",
    unit: "%",
    price: 200,
    duration: 3,
    requiredFasting: false,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "test_bc_004",
    code: "CREAT",
    name: "الكرياتينين",
    nameAr: "الكرياتينين",
    nameEn: "Creatinine",
    category: "biochemistry",
    sampleType: "serum",
    normalRange: "0.6-1.2 mg/dL",
    unit: "mg/dL",
    price: 80,
    duration: 2,
    requiredFasting: false,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "test_bc_005",
    code: "UREA",
    name: "اليوريا",
    nameAr: "اليوريا",
    nameEn: "Blood Urea",
    category: "biochemistry",
    sampleType: "serum",
    normalRange: "15-40 mg/dL",
    unit: "mg/dL",
    price: 70,
    duration: 2,
    requiredFasting: false,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "test_bc_006",
    code: "UA",
    name: "حمض اليوريك",
    nameAr: "حمض اليوريك",
    nameEn: "Uric Acid",
    category: "biochemistry",
    sampleType: "serum",
    normalRange: "3.5-7.2 mg/dL",
    unit: "mg/dL",
    price: 80,
    duration: 2,
    requiredFasting: false,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "test_bc_007",
    code: "LIPID",
    name: "تحليل الدهون الكامل",
    nameAr: "تحليل الدهون الكامل",
    nameEn: "Lipid Profile",
    category: "biochemistry",
    sampleType: "serum",
    normalRange: "متعدد",
    unit: "mg/dL",
    price: 250,
    duration: 3,
    requiredFasting: true,
    fastingHours: 12,
    preparationsAr: "صيام 12 ساعة",
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "test_bc_008",
    code: "ALT",
    name: "إنزيم الكبد ALT",
    nameAr: "إنزيم الكبد ALT",
    nameEn: "Alanine Aminotransferase",
    category: "biochemistry",
    sampleType: "serum",
    normalRange: "7-56 U/L",
    unit: "U/L",
    price: 90,
    duration: 2,
    requiredFasting: false,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "test_bc_009",
    code: "AST",
    name: "إنزيم الكبد AST",
    nameAr: "إنزيم الكبد AST",
    nameEn: "Aspartate Aminotransferase",
    category: "biochemistry",
    sampleType: "serum",
    normalRange: "10-40 U/L",
    unit: "U/L",
    price: 90,
    duration: 2,
    requiredFasting: false,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },

  // Hormones - الهرمونات
  {
    id: "test_hr_001",
    code: "TSH",
    name: "هرمون الغدة الدرقية",
    nameAr: "هرمون الغدة الدرقية",
    nameEn: "Thyroid Stimulating Hormone",
    category: "hormones",
    sampleType: "serum",
    normalRange: "0.4-4.0 mIU/L",
    unit: "mIU/L",
    price: 180,
    duration: 4,
    requiredFasting: false,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "test_hr_002",
    code: "T3",
    name: "هرمون T3",
    nameAr: "هرمون T3",
    nameEn: "Triiodothyronine",
    category: "hormones",
    sampleType: "serum",
    normalRange: "80-200 ng/dL",
    unit: "ng/dL",
    price: 150,
    duration: 4,
    requiredFasting: false,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "test_hr_003",
    code: "T4",
    name: "هرمون T4",
    nameAr: "هرمون T4",
    nameEn: "Thyroxine",
    category: "hormones",
    sampleType: "serum",
    normalRange: "4.5-12.0 µg/dL",
    unit: "µg/dL",
    price: 150,
    duration: 4,
    requiredFasting: false,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },

  // Tumor Markers - دلالات الأورام
  {
    id: "test_tm_001",
    code: "PSA",
    name: "دلالة سرطان البروستاتا",
    nameAr: "دلالة سرطان البروستاتا",
    nameEn: "Prostate Specific Antigen",
    category: "tumor_markers",
    sampleType: "serum",
    normalRange: "< 4.0 ng/mL",
    unit: "ng/mL",
    price: 300,
    duration: 6,
    requiredFasting: false,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "test_tm_002",
    code: "CEA",
    name: "دلالة أورام القولون",
    nameAr: "دلالة أورام القولون",
    nameEn: "Carcinoembryonic Antigen",
    category: "tumor_markers",
    sampleType: "serum",
    normalRange: "< 5.0 ng/mL",
    unit: "ng/mL",
    price: 350,
    duration: 6,
    requiredFasting: false,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "test_tm_003",
    code: "CA125",
    name: "دلالة سرطان المبيض",
    nameAr: "دلالة سرطان المبيض",
    nameEn: "Cancer Antigen 125",
    category: "tumor_markers",
    sampleType: "serum",
    normalRange: "< 35 U/mL",
    unit: "U/mL",
    price: 350,
    duration: 6,
    requiredFasting: false,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "test_tm_004",
    code: "CA153",
    name: "دلالة سرطان الثدي",
    nameAr: "دلالة سرطان الثدي",
    nameEn: "Cancer Antigen 15-3",
    category: "tumor_markers",
    sampleType: "serum",
    normalRange: "< 30 U/mL",
    unit: "U/mL",
    price: 350,
    duration: 6,
    requiredFasting: false,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },

  // Microbiology - الميكروبيولوجي
  {
    id: "test_mb_001",
    code: "CULT",
    name: "مزرعة بكتيرية",
    nameAr: "مزرعة بكتيرية",
    nameEn: "Bacterial Culture",
    category: "microbiology",
    sampleType: "swab",
    price: 200,
    duration: 48,
    requiredFasting: false,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "test_mb_002",
    code: "SENS",
    name: "اختبار الحساسية",
    nameAr: "اختبار الحساسية",
    nameEn: "Sensitivity Test",
    category: "microbiology",
    sampleType: "swab",
    price: 150,
    duration: 48,
    requiredFasting: false,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },

  // Urine Tests - تحليل البول
  {
    id: "test_ur_001",
    code: "URINE",
    name: "تحليل بول كامل",
    nameAr: "تحليل بول كامل",
    nameEn: "Complete Urine Analysis",
    category: "urine",
    sampleType: "urine",
    price: 80,
    duration: 2,
    requiredFasting: false,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },

  // Serology - الأمصال
  {
    id: "test_sr_001",
    code: "HIV",
    name: "فحص الإيدز",
    nameAr: "فحص الإيدز",
    nameEn: "HIV Test",
    category: "serology",
    sampleType: "serum",
    price: 250,
    duration: 4,
    requiredFasting: false,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "test_sr_002",
    code: "HCV",
    name: "فحص فيروس C",
    nameAr: "فحص فيروس C",
    nameEn: "Hepatitis C Virus",
    category: "serology",
    sampleType: "serum",
    price: 200,
    duration: 4,
    requiredFasting: false,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "test_sr_003",
    code: "HBV",
    name: "فحص فيروس B",
    nameAr: "فحص فيروس B",
    nameEn: "Hepatitis B Virus",
    category: "serology",
    sampleType: "serum",
    price: 200,
    duration: 4,
    requiredFasting: false,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },

  // Coagulation - تجلط الدم
  {
    id: "test_cg_001",
    code: "PT",
    name: "زمن البروثرومبين",
    nameAr: "زمن البروثرومبين",
    nameEn: "Prothrombin Time",
    category: "coagulation",
    sampleType: "plasma",
    normalRange: "11-13.5 seconds",
    unit: "seconds",
    price: 120,
    duration: 2,
    requiredFasting: false,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "test_cg_002",
    code: "PTT",
    name: "زمن الثرومبوبلاستين الجزئي",
    nameAr: "زمن الثرومبوبلاستين الجزئي",
    nameEn: "Partial Thromboplastin Time",
    category: "coagulation",
    sampleType: "plasma",
    normalRange: "25-35 seconds",
    unit: "seconds",
    price: 120,
    duration: 2,
    requiredFasting: false,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "test_cg_003",
    code: "INR",
    name: "معدل التجلط الدولي",
    nameAr: "معدل التجلط الدولي",
    nameEn: "International Normalized Ratio",
    category: "coagulation",
    sampleType: "plasma",
    normalRange: "0.8-1.2",
    unit: "ratio",
    price: 100,
    duration: 2,
    requiredFasting: false,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
