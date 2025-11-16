/**
 * Human Resources Module Types
 * Complete HR management system with departments, specializations, and employee management
 */

// ==================== ENUMS & CONSTANTS ====================

export type EmployeeStatus = 'active' | 'on-leave' | 'suspended' | 'resigned' | 'terminated' | 'retired';
export type EmployeeType = 'doctor' | 'nurse' | 'admin' | 'technician' | 'support' | 'management';
export type ContractType = 'permanent' | 'temporary' | 'contract' | 'part-time' | 'consultant';
export type ShiftType = 'morning' | 'evening' | 'night' | 'rotating' | 'flexible';
export type LeaveType = 'annual' | 'sick' | 'emergency' | 'maternity' | 'paternity' | 'unpaid' | 'study';
export type LeaveStatus = 'pending' | 'approved' | 'rejected' | 'cancelled';
export type AttendanceStatus = 'present' | 'absent' | 'late' | 'early-leave' | 'half-day' | 'on-leave';
export type PayrollStatus = 'pending' | 'processed' | 'paid' | 'cancelled';
export type PerformanceRating = 'excellent' | 'very-good' | 'good' | 'satisfactory' | 'needs-improvement';

// Medical Specializations
export const MEDICAL_SPECIALIZATIONS = [
  { id: 'cardiology', nameAr: 'أمراض القلب', nameEn: 'Cardiology', category: 'medical' },
  { id: 'neurology', nameAr: 'الأمراض العصبية', nameEn: 'Neurology', category: 'medical' },
  { id: 'orthopedics', nameAr: 'جراحة العظام', nameEn: 'Orthopedics', category: 'surgical' },
  { id: 'pediatrics', nameAr: 'طب الأطفال', nameEn: 'Pediatrics', category: 'medical' },
  { id: 'obstetrics', nameAr: 'التوليد وأمراض النساء', nameEn: 'Obstetrics & Gynecology', category: 'surgical' },
  { id: 'dermatology', nameAr: 'الأمراض الجلدية', nameEn: 'Dermatology', category: 'medical' },
  { id: 'ophthalmology', nameAr: 'طب العيون', nameEn: 'Ophthalmology', category: 'surgical' },
  { id: 'ent', nameAr: 'أنف وأذن وحنجرة', nameEn: 'ENT', category: 'surgical' },
  { id: 'psychiatry', nameAr: 'الطب النفسي', nameEn: 'Psychiatry', category: 'medical' },
  { id: 'radiology', nameAr: 'الأشعة', nameEn: 'Radiology', category: 'diagnostic' },
  { id: 'pathology', nameAr: 'علم الأمراض', nameEn: 'Pathology', category: 'diagnostic' },
  { id: 'anesthesiology', nameAr: 'التخدير', nameEn: 'Anesthesiology', category: 'surgical' },
  { id: 'emergency', nameAr: 'الطوارئ', nameEn: 'Emergency Medicine', category: 'medical' },
  { id: 'internal', nameAr: 'الباطنية', nameEn: 'Internal Medicine', category: 'medical' },
  { id: 'surgery', nameAr: 'الجراحة العامة', nameEn: 'General Surgery', category: 'surgical' },
  { id: 'urology', nameAr: 'المسالك البولية', nameEn: 'Urology', category: 'surgical' },
  { id: 'nephrology', nameAr: 'أمراض الكلى', nameEn: 'Nephrology', category: 'medical' },
  { id: 'oncology', nameAr: 'الأورام', nameEn: 'Oncology', category: 'medical' },
  { id: 'endocrinology', nameAr: 'الغدد الصماء', nameEn: 'Endocrinology', category: 'medical' },
  { id: 'gastroenterology', nameAr: 'الجهاز الهضمي', nameEn: 'Gastroenterology', category: 'medical' },
] as const;

// Hospital Departments
export const HOSPITAL_DEPARTMENTS = [
  // Clinical Departments
  { id: 'cardiology', nameAr: 'قسم القلب', nameEn: 'Cardiology Department', type: 'clinical' },
  { id: 'neurology', nameAr: 'قسم الأعصاب', nameEn: 'Neurology Department', type: 'clinical' },
  { id: 'orthopedics', nameAr: 'قسم العظام', nameEn: 'Orthopedics Department', type: 'clinical' },
  { id: 'pediatrics', nameAr: 'قسم الأطفال', nameEn: 'Pediatrics Department', type: 'clinical' },
  { id: 'obstetrics', nameAr: 'قسم النساء والولادة', nameEn: 'Obstetrics & Gynecology', type: 'clinical' },
  { id: 'emergency', nameAr: 'قسم الطوارئ', nameEn: 'Emergency Department', type: 'clinical' },
  { id: 'icu', nameAr: 'العناية المركزة', nameEn: 'Intensive Care Unit', type: 'clinical' },
  { id: 'surgery', nameAr: 'قسم الجراحة', nameEn: 'Surgery Department', type: 'clinical' },
  
  // Diagnostic Departments
  { id: 'laboratory', nameAr: 'المختبر', nameEn: 'Laboratory', type: 'diagnostic' },
  { id: 'radiology', nameAr: 'الأشعة', nameEn: 'Radiology', type: 'diagnostic' },
  { id: 'pathology', nameAr: 'علم الأمراض', nameEn: 'Pathology', type: 'diagnostic' },
  
  // Support Departments
  { id: 'pharmacy', nameAr: 'الصيدلية', nameEn: 'Pharmacy', type: 'support' },
  { id: 'nursing', nameAr: 'التمريض', nameEn: 'Nursing', type: 'support' },
  { id: 'reception', nameAr: 'الاستقبال', nameEn: 'Reception', type: 'support' },
  { id: 'medical-records', nameAr: 'السجلات الطبية', nameEn: 'Medical Records', type: 'support' },
  
  // Administrative Departments
  { id: 'hr', nameAr: 'الموارد البشرية', nameEn: 'Human Resources', type: 'administrative' },
  { id: 'finance', nameAr: 'المالية', nameEn: 'Finance', type: 'administrative' },
  { id: 'administration', nameAr: 'الإدارة', nameEn: 'Administration', type: 'administrative' },
  { id: 'it', nameAr: 'تقنية المعلومات', nameEn: 'IT', type: 'administrative' },
  
  // Facilities Departments
  { id: 'maintenance', nameAr: 'الصيانة', nameEn: 'Maintenance', type: 'facilities' },
  { id: 'housekeeping', nameAr: 'النظافة', nameEn: 'Housekeeping', type: 'facilities' },
  { id: 'security', nameAr: 'الأمن', nameEn: 'Security', type: 'facilities' },
  { id: 'kitchen', nameAr: 'المطبخ', nameEn: 'Kitchen', type: 'facilities' },
  
  // Supply Chain
  { id: 'supply-chain', nameAr: 'سلسلة الإمداد', nameEn: 'Supply Chain', type: 'logistics' },
  { id: 'procurement', nameAr: 'المشتريات', nameEn: 'Procurement', type: 'logistics' },
] as const;

// Nursing Specializations
export const NURSING_SPECIALIZATIONS = [
  { id: 'icu', nameAr: 'تمريض العناية المركزة', nameEn: 'ICU Nursing' },
  { id: 'er', nameAr: 'تمريض الطوارئ', nameEn: 'Emergency Nursing' },
  { id: 'pediatric', nameAr: 'تمريض الأطفال', nameEn: 'Pediatric Nursing' },
  { id: 'surgical', nameAr: 'تمريض الجراحة', nameEn: 'Surgical Nursing' },
  { id: 'medical', nameAr: 'تمريض الباطنية', nameEn: 'Medical Nursing' },
  { id: 'oncology', nameAr: 'تمريض الأورام', nameEn: 'Oncology Nursing' },
  { id: 'cardiac', nameAr: 'تمريض القلب', nameEn: 'Cardiac Nursing' },
  { id: 'general', nameAr: 'تمريض عام', nameEn: 'General Nursing' },
] as const;

// Job Positions
export const JOB_POSITIONS = [
  // Medical Staff
  { id: 'consultant', nameAr: 'استشاري', nameEn: 'Consultant', category: 'doctor', level: 'senior' },
  { id: 'specialist', nameAr: 'أخصائي', nameEn: 'Specialist', category: 'doctor', level: 'mid' },
  { id: 'registrar', nameAr: 'طبيب مقيم', nameEn: 'Registrar', category: 'doctor', level: 'junior' },
  { id: 'resident', nameAr: 'طبيب امتياز', nameEn: 'Resident', category: 'doctor', level: 'entry' },
  
  // Nursing Staff
  { id: 'head-nurse', nameAr: 'رئيس تمريض', nameEn: 'Head Nurse', category: 'nurse', level: 'senior' },
  { id: 'nurse-supervisor', nameAr: 'مشرف تمريض', nameEn: 'Nurse Supervisor', category: 'nurse', level: 'mid' },
  { id: 'staff-nurse', nameAr: 'ممرض/ممرضة', nameEn: 'Staff Nurse', category: 'nurse', level: 'junior' },
  { id: 'nursing-assistant', nameAr: 'مساعد تمريض', nameEn: 'Nursing Assistant', category: 'nurse', level: 'entry' },
  
  // Technical Staff
  { id: 'senior-technician', nameAr: 'فني أول', nameEn: 'Senior Technician', category: 'technician', level: 'senior' },
  { id: 'technician', nameAr: 'فني', nameEn: 'Technician', category: 'technician', level: 'mid' },
  { id: 'assistant-technician', nameAr: 'مساعد فني', nameEn: 'Assistant Technician', category: 'technician', level: 'entry' },
  
  // Administrative Staff
  { id: 'director', nameAr: 'مدير', nameEn: 'Director', category: 'management', level: 'executive' },
  { id: 'manager', nameAr: 'مدير قسم', nameEn: 'Department Manager', category: 'management', level: 'senior' },
  { id: 'supervisor', nameAr: 'مشرف', nameEn: 'Supervisor', category: 'management', level: 'mid' },
  { id: 'coordinator', nameAr: 'منسق', nameEn: 'Coordinator', category: 'admin', level: 'mid' },
  { id: 'clerk', nameAr: 'موظف', nameEn: 'Clerk', category: 'admin', level: 'entry' },
  
  // Support Staff
  { id: 'receptionist', nameAr: 'موظف استقبال', nameEn: 'Receptionist', category: 'support', level: 'entry' },
  { id: 'pharmacist', nameAr: 'صيدلي', nameEn: 'Pharmacist', category: 'support', level: 'mid' },
  { id: 'maintenance-worker', nameAr: 'عامل صيانة', nameEn: 'Maintenance Worker', category: 'support', level: 'entry' },
  { id: 'security-guard', nameAr: 'حارس أمن', nameEn: 'Security Guard', category: 'support', level: 'entry' },
  { id: 'cleaner', nameAr: 'عامل نظافة', nameEn: 'Cleaner', category: 'support', level: 'entry' },
] as const;

// ==================== INTERFACES ====================

export interface Employee {
  id: string;
  employeeNumber: string;
  
  // Personal Information
  personalInfo: {
    firstName: string;
    middleName?: string;
    lastName: string;
    fullNameAr: string;
    fullNameEn: string;
    dateOfBirth: string;
    age: number;
    gender: 'male' | 'female';
    nationality: string;
    nationalId: string;
    passportNumber?: string;
    maritalStatus: 'single' | 'married' | 'divorced' | 'widowed';
    numberOfDependents: number;
  };
  
  // Contact Information
  contactInfo: {
    phone: string;
    mobilePhone: string;
    email: string;
    emergencyContact: {
      name: string;
      relationship: string;
      phone: string;
    };
    address: {
      street: string;
      city: string;
      region: string;
      postalCode?: string;
      country: string;
    };
  };
  
  // Employment Information
  employmentInfo: {
    employeeType: EmployeeType;
    position: string;
    positionId: string;
    department: string;
    departmentId: string;
    specialization?: string;
    specializationId?: string;
    contractType: ContractType;
    employmentStatus: EmployeeStatus;
    hireDate: string;
    confirmationDate?: string;
    probationEndDate?: string;
    workLocation: string;
    shiftType: ShiftType;
    reportsTo?: string; // Employee ID of supervisor
    directReports?: string[]; // Employee IDs
  };
  
  // Compensation
  compensation: {
    baseSalary: number;
    currency: string;
    allowances: {
      housing?: number;
      transportation?: number;
      food?: number;
      medical?: number;
      phone?: number;
      other?: { name: string; amount: number }[];
    };
    deductions: {
      tax?: number;
      socialInsurance?: number;
      pension?: number;
      other?: { name: string; amount: number }[];
    };
    bonuses?: {
      type: string;
      amount: number;
      date: string;
    }[];
    totalMonthlyCompensation: number;
  };
  
  // Qualifications
  qualifications: {
    education: {
      degree: string;
      field: string;
      institution: string;
      graduationYear: number;
      country: string;
    }[];
    certifications: {
      name: string;
      issuingOrganization: string;
      issueDate: string;
      expiryDate?: string;
      certificateNumber?: string;
    }[];
    licenses: {
      type: string;
      licenseNumber: string;
      issuingAuthority: string;
      issueDate: string;
      expiryDate: string;
      status: 'active' | 'expired' | 'suspended';
    }[];
    languages: {
      language: string;
      proficiency: 'native' | 'fluent' | 'intermediate' | 'basic';
    }[];
  };
  
  // Work Experience
  experience: {
    yearsOfExperience: number;
    previousPositions?: {
      position: string;
      company: string;
      startDate: string;
      endDate: string;
      responsibilities?: string;
    }[];
  };
  
  // Performance
  performance: {
    currentRating?: PerformanceRating;
    lastEvaluationDate?: string;
    nextEvaluationDate?: string;
    reviews: {
      date: string;
      rating: PerformanceRating;
      reviewedBy: string;
      comments?: string;
      goals?: string[];
    }[];
    kpis?: {
      name: string;
      target: number;
      actual: number;
      period: string;
    }[];
  };
  
  // Leave & Attendance
  leaveBalance: {
    annualLeave: { total: number; used: number; remaining: number };
    sickLeave: { total: number; used: number; remaining: number };
    emergencyLeave: { total: number; used: number; remaining: number };
    other?: { type: string; total: number; used: number; remaining: number }[];
  };
  
  // Documents
  documents: {
    id: string;
    type: string;
    name: string;
    url: string;
    uploadDate: string;
    expiryDate?: string;
  }[];
  
  // System Fields
  status: EmployeeStatus;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  lastModifiedBy: string;
  notes?: string;
}

export interface Department {
  id: string;
  code: string;
  nameAr: string;
  nameEn: string;
  type: 'clinical' | 'diagnostic' | 'support' | 'administrative' | 'facilities' | 'logistics';
  description?: string;
  headOfDepartment?: string; // Employee ID
  parentDepartment?: string; // Department ID
  location?: string;
  capacity?: number;
  employeeCount: number;
  budget?: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  leaveType: LeaveType;
  startDate: string;
  endDate: string;
  totalDays: number;
  reason: string;
  status: LeaveStatus;
  requestDate: string;
  approvedBy?: string;
  approvalDate?: string;
  rejectionReason?: string;
  replacementEmployee?: string;
  attachments?: {
    name: string;
    url: string;
    type: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  date: string;
  checkIn?: string;
  checkOut?: string;
  status: AttendanceStatus;
  hoursWorked?: number;
  overtime?: number;
  notes?: string;
  location?: string;
  verifiedBy?: string;
  createdAt: string;
}

export interface PayrollRecord {
  id: string;
  payrollMonth: string; // YYYY-MM
  employeeId: string;
  employeeName: string;
  department: string;
  position: string;
  
  // Earnings
  baseSalary: number;
  allowances: {
    name: string;
    amount: number;
  }[];
  overtime?: number;
  bonuses?: number;
  totalEarnings: number;
  
  // Deductions
  deductions: {
    name: string;
    amount: number;
  }[];
  totalDeductions: number;
  
  // Net Pay
  netSalary: number;
  
  // Payment Details
  status: PayrollStatus;
  paymentDate?: string;
  paymentMethod?: 'bank-transfer' | 'cash' | 'cheque';
  bankAccount?: string;
  
  // Attendance Impact
  workingDays: number;
  actualDays: number;
  absentDays: number;
  leaveDays: number;
  
  // System Fields
  processedBy?: string;
  processedAt?: string;
  approvedBy?: string;
  approvalDate?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Training {
  id: string;
  title: string;
  description?: string;
  type: 'mandatory' | 'optional' | 'certification' | 'skill-development';
  targetAudience: {
    departments?: string[];
    positions?: string[];
    employeeTypes?: EmployeeType[];
  };
  startDate: string;
  endDate: string;
  duration: number; // hours
  location: string;
  trainer?: string;
  cost?: number;
  capacity?: number;
  enrolledCount: number;
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface TrainingEnrollment {
  id: string;
  trainingId: string;
  trainingTitle: string;
  employeeId: string;
  employeeName: string;
  enrollmentDate: string;
  status: 'enrolled' | 'attended' | 'completed' | 'failed' | 'cancelled';
  attendance?: number; // percentage
  score?: number;
  certificateIssued?: boolean;
  certificateUrl?: string;
  feedback?: string;
  createdAt: string;
}

export interface ShiftSchedule {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  date: string;
  shiftType: ShiftType;
  startTime: string;
  endTime: string;
  breakDuration: number; // minutes
  location?: string;
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'no-show';
  notes?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface HRStatistics {
  totalEmployees: number;
  activeEmployees: number;
  onLeaveEmployees: number;
  byDepartment: {
    department: string;
    count: number;
  }[];
  byEmployeeType: {
    type: EmployeeType;
    count: number;
  }[];
  byContractType: {
    type: ContractType;
    count: number;
  }[];
  averageAge: number;
  averageTenure: number; // years
  genderDistribution: {
    male: number;
    female: number;
  };
  monthlyPayroll: number;
  turnoverRate: number; // percentage
  absenteeismRate: number; // percentage
  trainingCompletionRate: number; // percentage
}

// Filter interfaces
export interface EmployeeFilters {
  search?: string;
  department?: string;
  employeeType?: EmployeeType;
  status?: EmployeeStatus;
  position?: string;
  specialization?: string;
  contractType?: ContractType;
  dateRange?: {
    startDate: string;
    endDate: string;
  };
}

export interface LeaveFilters {
  employeeId?: string;
  department?: string;
  leaveType?: LeaveType;
  status?: LeaveStatus;
  dateRange?: {
    startDate: string;
    endDate: string;
  };
}

export interface AttendanceFilters {
  employeeId?: string;
  department?: string;
  status?: AttendanceStatus;
  dateRange?: {
    startDate: string;
    endDate: string;
  };
}

export interface PayrollFilters {
  employeeId?: string;
  department?: string;
  month?: string;
  status?: PayrollStatus;
}
