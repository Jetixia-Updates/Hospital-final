// Reception Module Types
export type PatientVisitType = 
  | "clinic"           // عيادة
  | "emergency"        // طوارئ
  | "laboratory"       // معمل تحاليل
  | "radiology"        // أشعة
  | "pharmacy"         // صيدلية
  | "surgery"          // عمليات
  | "admission"        // إدخال (تنويم)
  | "insurance"        // تأمين
  | "billing";         // محاسبة

export type PatientPriority = "normal" | "urgent" | "emergency";

export type ReceptionStatus = 
  | "waiting"          // في الانتظار
  | "registered"       // تم التسجيل
  | "directed"         // تم التوجيه
  | "in_service"       // قيد الخدمة
  | "completed"        // مكتمل
  | "cancelled";       // ملغي

export interface PatientReception {
  id: string;
  receptionNumber: string;           // رقم الاستقبال
  visitDate: string;                 // تاريخ الزيارة
  visitTime: string;                 // وقت الزيارة
  
  // Patient Info
  patientId?: string;                // رقم المريض (إن كان موجود)
  isNewPatient: boolean;             // مريض جديد؟
  patientName: string;
  patientNameEn?: string;
  age: number;
  gender: "male" | "female";
  nationality: string;
  nationalId: string;
  phone: string;
  email?: string;
  address?: string;
  
  // Visit Details
  visitType: PatientVisitType;      // نوع الزيارة
  visitReason: string;               // سبب الزيارة
  priority: PatientPriority;         // الأولوية
  status: ReceptionStatus;           // حالة الاستقبال
  
  // Vital Signs (optional at reception)
  vitalSigns?: {
    bloodPressure?: string;          // ضغط الدم
    heartRate?: number;              // نبض القلب
    temperature?: number;            // الحرارة
    oxygenSaturation?: number;       // تشبع الأكسجين
    weight?: number;                 // الوزن
    height?: number;                 // الطول
  };
  
  // Direction/Routing
  directedTo?: {
    module: PatientVisitType;        // المديول الموجه إليه
    department?: string;             // القسم (إن وجد)
    doctor?: string;                 // الطبيب (إن وجد)
    room?: string;                   // الغرفة
    appointmentTime?: string;        // وقت الموعد
    notes?: string;                  // ملاحظات
  };
  
  // Insurance
  hasInsurance: boolean;
  insuranceProvider?: string;
  insurancePolicyNumber?: string;
  insuranceCoverage?: number;        // نسبة التغطية
  
  // Payment
  expectedCost?: number;
  paymentMethod?: "cash" | "insurance" | "card" | "mixed";
  
  // Staff
  receptionistId: string;
  receptionistName: string;
  
  // Timestamps
  registeredAt: string;
  directedAt?: string;
  completedAt?: string;
  
  // Notes
  notes?: string;
  medicalHistory?: string;           // التاريخ المرضي
  allergies?: string;                // الحساسية
  currentMedications?: string;       // الأدوية الحالية
}

export interface ReceptionQueue {
  id: string;
  receptionId: string;
  patientName: string;
  queueNumber: number;               // رقم الدور
  visitType: PatientVisitType;
  priority: PatientPriority;
  status: "waiting" | "called" | "serving" | "completed";
  waitTime: number;                  // وقت الانتظار بالدقائق
  estimatedTime?: number;            // الوقت المتوقع للخدمة
  calledAt?: string;
  completedAt?: string;
}

export interface ReceptionStatistics {
  todayTotal: number;
  waiting: number;
  registered: number;
  directed: number;
  completed: number;
  
  byVisitType: {
    type: PatientVisitType;
    count: number;
  }[];
  
  byPriority: {
    priority: PatientPriority;
    count: number;
  }[];
  
  newPatients: number;
  returningPatients: number;
  averageWaitTime: number;           // متوسط وقت الانتظار
  averageProcessTime: number;        // متوسط وقت المعالجة
}

export interface DirectionTemplate {
  id: string;
  name: string;
  visitType: PatientVisitType;
  defaultDepartment?: string;
  defaultDoctor?: string;
  requiredDocuments?: string[];
  estimatedDuration?: number;        // بالدقائق
  instructions?: string;
  active: boolean;
}

// Quick Registration Data
export interface QuickRegistration {
  patientName: string;
  age: number;
  gender: "male" | "female";
  phone: string;
  visitType: PatientVisitType;
  visitReason: string;
  priority: PatientPriority;
}

// Sample Data
export const VISIT_TYPES_DATA = [
  { 
    type: "clinic" as PatientVisitType, 
    nameAr: "عيادة خارجية", 
    nameEn: "Outpatient Clinic",
    icon: "🏥",
    color: "blue",
    avgDuration: 30
  },
  { 
    type: "emergency" as PatientVisitType, 
    nameAr: "طوارئ", 
    nameEn: "Emergency",
    icon: "🚨",
    color: "red",
    avgDuration: 15
  },
  { 
    type: "laboratory" as PatientVisitType, 
    nameAr: "معمل تحاليل", 
    nameEn: "Laboratory",
    icon: "🔬",
    color: "purple",
    avgDuration: 20
  },
  { 
    type: "radiology" as PatientVisitType, 
    nameAr: "أشعة وتصوير", 
    nameEn: "Radiology",
    icon: "📷",
    color: "indigo",
    avgDuration: 25
  },
  { 
    type: "pharmacy" as PatientVisitType, 
    nameAr: "صيدلية", 
    nameEn: "Pharmacy",
    icon: "💊",
    color: "green",
    avgDuration: 10
  },
  { 
    type: "surgery" as PatientVisitType, 
    nameAr: "عمليات", 
    nameEn: "Surgery",
    icon: "⚕️",
    color: "orange",
    avgDuration: 120
  },
  { 
    type: "admission" as PatientVisitType, 
    nameAr: "إدخال (تنويم)", 
    nameEn: "Admission",
    icon: "🛏️",
    color: "teal",
    avgDuration: 30
  },
  { 
    type: "insurance" as PatientVisitType, 
    nameAr: "تأمين", 
    nameEn: "Insurance",
    icon: "🛡️",
    color: "cyan",
    avgDuration: 15
  },
  { 
    type: "billing" as PatientVisitType, 
    nameAr: "محاسبة", 
    nameEn: "Billing",
    icon: "💰",
    color: "yellow",
    avgDuration: 10
  },
];

export const PRIORITY_LEVELS = [
  { value: "normal" as PatientPriority, labelAr: "عادي", labelEn: "Normal", color: "gray" },
  { value: "urgent" as PatientPriority, labelAr: "مستعجل", labelEn: "Urgent", color: "orange" },
  { value: "emergency" as PatientPriority, labelAr: "طارئ", labelEn: "Emergency", color: "red" },
];
