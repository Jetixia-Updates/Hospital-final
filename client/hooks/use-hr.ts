import { useState, useCallback } from 'react';
import {
  Employee,
  Department,
  LeaveRequest,
  AttendanceRecord,
  PayrollRecord,
  Training,
  TrainingEnrollment,
  ShiftSchedule,
  HRStatistics,
  EmployeeFilters,
  LeaveFilters,
  AttendanceFilters,
  PayrollFilters,
  EmployeeStatus,
  EmployeeType,
  ContractType,
  LeaveStatus,
  AttendanceStatus,
  PayrollStatus,
  HOSPITAL_DEPARTMENTS,
  MEDICAL_SPECIALIZATIONS,
  JOB_POSITIONS,
} from '@shared/hr';

// Sample data generator
const generateSampleEmployees = (): Employee[] => {
  const today = new Date();
  
  return [
    {
      id: 'EMP001',
      employeeNumber: 'EMP-2020-001',
      personalInfo: {
        firstName: 'Hassan',
        middleName: 'Ali',
        lastName: 'Al-Rashid',
        fullNameAr: 'حسن علي الراشد',
        fullNameEn: 'Hassan Ali Al-Rashid',
        dateOfBirth: '1985-03-15',
        age: 39,
        gender: 'male',
        nationality: 'Saudi',
        nationalId: '1234567890',
        maritalStatus: 'married',
        numberOfDependents: 3,
      },
      contactInfo: {
        phone: '+966 11 234 5678',
        mobilePhone: '+966 50 123 4567',
        email: 'hassan.rashid@hospital.com',
        emergencyContact: {
          name: 'Fatima Al-Rashid',
          relationship: 'Wife',
          phone: '+966 55 111 2222',
        },
        address: {
          street: 'King Fahd Road',
          city: 'Riyadh',
          region: 'Riyadh',
          postalCode: '11564',
          country: 'Saudi Arabia',
        },
      },
      employmentInfo: {
        employeeType: 'doctor',
        position: 'Consultant',
        positionId: 'consultant',
        department: 'Cardiology Department',
        departmentId: 'cardiology',
        specialization: 'Cardiology',
        specializationId: 'cardiology',
        contractType: 'permanent',
        employmentStatus: 'active',
        hireDate: '2020-01-15',
        confirmationDate: '2020-07-15',
        probationEndDate: '2020-07-14',
        workLocation: 'Main Building - 3rd Floor',
        shiftType: 'morning',
        directReports: ['EMP007', 'EMP008'],
      },
      compensation: {
        baseSalary: 28000,
        currency: 'SAR',
        allowances: {
          housing: 5000,
          transportation: 1500,
          medical: 1000,
          phone: 500,
        },
        deductions: {
          tax: 0,
          socialInsurance: 2240,
          pension: 2800,
        },
        totalMonthlyCompensation: 36000,
      },
      qualifications: {
        education: [
          {
            degree: 'MD',
            field: 'Cardiology',
            institution: 'King Saud University',
            graduationYear: 2010,
            country: 'Saudi Arabia',
          },
          {
            degree: 'Fellowship',
            field: 'Interventional Cardiology',
            institution: 'Cleveland Clinic',
            graduationYear: 2015,
            country: 'USA',
          },
        ],
        certifications: [
          {
            name: 'Board Certified Cardiologist',
            issuingOrganization: 'Saudi Commission for Health Specialties',
            issueDate: '2015-06-01',
            certificateNumber: 'SCFHS-2015-1234',
          },
          {
            name: 'ACLS',
            issuingOrganization: 'American Heart Association',
            issueDate: '2023-01-15',
            expiryDate: '2025-01-15',
            certificateNumber: 'AHA-ACLS-2023-5678',
          },
        ],
        licenses: [
          {
            type: 'Medical License',
            licenseNumber: 'ML-123456',
            issuingAuthority: 'Ministry of Health',
            issueDate: '2015-08-01',
            expiryDate: '2025-08-01',
            status: 'active',
          },
        ],
        languages: [
          { language: 'Arabic', proficiency: 'native' },
          { language: 'English', proficiency: 'fluent' },
        ],
      },
      experience: {
        yearsOfExperience: 14,
        previousPositions: [
          {
            position: 'Registrar',
            company: 'King Fahad Medical City',
            startDate: '2015-09-01',
            endDate: '2020-01-14',
            responsibilities: 'Cardiology resident and registrar duties',
          },
        ],
      },
      performance: {
        currentRating: 'excellent',
        lastEvaluationDate: '2024-01-15',
        nextEvaluationDate: '2025-01-15',
        reviews: [
          {
            date: '2024-01-15',
            rating: 'excellent',
            reviewedBy: 'Dr. Ahmed Al-Saud',
            comments: 'Outstanding performance in patient care and research',
            goals: ['Publish research paper', 'Mentor junior doctors', 'Improve patient satisfaction'],
          },
        ],
      },
      leaveBalance: {
        annualLeave: { total: 30, used: 12, remaining: 18 },
        sickLeave: { total: 15, used: 3, remaining: 12 },
        emergencyLeave: { total: 5, used: 1, remaining: 4 },
      },
      documents: [],
      status: 'active',
      isActive: true,
      createdAt: '2020-01-15T08:00:00Z',
      updatedAt: '2024-11-15T10:30:00Z',
      createdBy: 'HR-Admin',
      lastModifiedBy: 'HR-Manager',
    },
    {
      id: 'EMP002',
      employeeNumber: 'EMP-2021-045',
      personalInfo: {
        firstName: 'Fatima',
        lastName: 'Al-Dosari',
        fullNameAr: 'فاطمة الدوسري',
        fullNameEn: 'Fatima Al-Dosari',
        dateOfBirth: '1990-07-22',
        age: 34,
        gender: 'female',
        nationality: 'Saudi',
        nationalId: '2345678901',
        maritalStatus: 'single',
        numberOfDependents: 0,
      },
      contactInfo: {
        phone: '+966 11 345 6789',
        mobilePhone: '+966 55 234 5678',
        email: 'fatima.dosari@hospital.com',
        emergencyContact: {
          name: 'Abdullah Al-Dosari',
          relationship: 'Father',
          phone: '+966 50 222 3333',
        },
        address: {
          street: 'Olaya Street',
          city: 'Riyadh',
          region: 'Riyadh',
          postalCode: '11543',
          country: 'Saudi Arabia',
        },
      },
      employmentInfo: {
        employeeType: 'doctor',
        position: 'Specialist',
        positionId: 'specialist',
        department: 'Neurology Department',
        departmentId: 'neurology',
        specialization: 'Neurology',
        specializationId: 'neurology',
        contractType: 'permanent',
        employmentStatus: 'active',
        hireDate: '2021-06-01',
        confirmationDate: '2021-12-01',
        workLocation: 'Main Building - 2nd Floor',
        shiftType: 'rotating',
        reportsTo: 'EMP001',
      },
      compensation: {
        baseSalary: 18000,
        currency: 'SAR',
        allowances: {
          housing: 3500,
          transportation: 1000,
          medical: 800,
        },
        deductions: {
          socialInsurance: 1440,
          pension: 1800,
        },
        totalMonthlyCompensation: 23300,
      },
      qualifications: {
        education: [
          {
            degree: 'MD',
            field: 'Neurology',
            institution: 'King Abdulaziz University',
            graduationYear: 2016,
            country: 'Saudi Arabia',
          },
        ],
        certifications: [
          {
            name: 'Neurology Specialist',
            issuingOrganization: 'Saudi Commission for Health Specialties',
            issueDate: '2020-03-01',
            certificateNumber: 'SCFHS-2020-789',
          },
        ],
        licenses: [
          {
            type: 'Medical License',
            licenseNumber: 'ML-234567',
            issuingAuthority: 'Ministry of Health',
            issueDate: '2020-04-01',
            expiryDate: '2025-04-01',
            status: 'active',
          },
        ],
        languages: [
          { language: 'Arabic', proficiency: 'native' },
          { language: 'English', proficiency: 'fluent' },
        ],
      },
      experience: {
        yearsOfExperience: 8,
      },
      performance: {
        currentRating: 'very-good',
        lastEvaluationDate: '2024-06-01',
        nextEvaluationDate: '2025-06-01',
        reviews: [],
      },
      leaveBalance: {
        annualLeave: { total: 30, used: 8, remaining: 22 },
        sickLeave: { total: 15, used: 2, remaining: 13 },
        emergencyLeave: { total: 5, used: 0, remaining: 5 },
      },
      documents: [],
      status: 'active',
      isActive: true,
      createdAt: '2021-06-01T09:00:00Z',
      updatedAt: '2024-11-15T10:30:00Z',
      createdBy: 'HR-Admin',
      lastModifiedBy: 'HR-Manager',
    },
    {
      id: 'EMP003',
      employeeNumber: 'EMP-2022-089',
      personalInfo: {
        firstName: 'Noor',
        lastName: 'Al-Otaibi',
        fullNameAr: 'نور العتيبي',
        fullNameEn: 'Noor Al-Otaibi',
        dateOfBirth: '1992-11-10',
        age: 32,
        gender: 'female',
        nationality: 'Saudi',
        nationalId: '3456789012',
        maritalStatus: 'married',
        numberOfDependents: 2,
      },
      contactInfo: {
        phone: '+966 11 456 7890',
        mobilePhone: '+966 56 345 6789',
        email: 'noor.otaibi@hospital.com',
        emergencyContact: {
          name: 'Mohammed Al-Otaibi',
          relationship: 'Husband',
          phone: '+966 55 333 4444',
        },
        address: {
          street: 'Al-Malaz',
          city: 'Riyadh',
          region: 'Riyadh',
          country: 'Saudi Arabia',
        },
      },
      employmentInfo: {
        employeeType: 'nurse',
        position: 'Head Nurse',
        positionId: 'head-nurse',
        department: 'Cardiology Department',
        departmentId: 'cardiology',
        specialization: 'Cardiac Nursing',
        contractType: 'permanent',
        employmentStatus: 'on-leave',
        hireDate: '2022-08-01',
        workLocation: 'Main Building - 3rd Floor',
        shiftType: 'rotating',
        directReports: ['EMP009', 'EMP010', 'EMP011'],
      },
      compensation: {
        baseSalary: 9500,
        currency: 'SAR',
        allowances: {
          housing: 2000,
          transportation: 500,
          medical: 500,
        },
        deductions: {
          socialInsurance: 760,
          pension: 950,
        },
        totalMonthlyCompensation: 12500,
      },
      qualifications: {
        education: [
          {
            degree: 'BSN',
            field: 'Nursing',
            institution: 'Princess Nourah University',
            graduationYear: 2014,
            country: 'Saudi Arabia',
          },
        ],
        certifications: [
          {
            name: 'Cardiac Nursing Specialist',
            issuingOrganization: 'Saudi Nursing Society',
            issueDate: '2019-05-01',
            certificateNumber: 'SNS-2019-456',
          },
        ],
        licenses: [
          {
            type: 'Nursing License',
            licenseNumber: 'NL-345678',
            issuingAuthority: 'Ministry of Health',
            issueDate: '2014-07-01',
            expiryDate: '2024-07-01',
            status: 'active',
          },
        ],
        languages: [
          { language: 'Arabic', proficiency: 'native' },
          { language: 'English', proficiency: 'intermediate' },
        ],
      },
      experience: {
        yearsOfExperience: 10,
      },
      performance: {
        currentRating: 'excellent',
        reviews: [],
      },
      leaveBalance: {
        annualLeave: { total: 30, used: 20, remaining: 10 },
        sickLeave: { total: 15, used: 5, remaining: 10 },
        emergencyLeave: { total: 5, used: 2, remaining: 3 },
      },
      documents: [],
      status: 'on-leave',
      isActive: true,
      createdAt: '2022-08-01T08:00:00Z',
      updatedAt: '2024-11-15T10:30:00Z',
      createdBy: 'HR-Admin',
      lastModifiedBy: 'HR-Manager',
    },
  ];
};

export const useHR = () => {
  const [employees, setEmployees] = useState<Employee[]>(generateSampleEmployees());
  const [departments, setDepartments] = useState<Department[]>(
    HOSPITAL_DEPARTMENTS.map((dept, index) => ({
      id: dept.id,
      code: `DEPT-${String(index + 1).padStart(3, '0')}`,
      nameAr: dept.nameAr,
      nameEn: dept.nameEn,
      type: dept.type,
      employeeCount: Math.floor(Math.random() * 50) + 5,
      isActive: true,
      createdAt: '2020-01-01T00:00:00Z',
      updatedAt: '2024-11-15T10:30:00Z',
    }))
  );
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);
  const [payrollRecords, setPayrollRecords] = useState<PayrollRecord[]>([]);
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [shiftSchedules, setShiftSchedules] = useState<ShiftSchedule[]>([]);

  // Employee Management
  const addEmployee = useCallback((employee: Omit<Employee, 'id' | 'employeeNumber' | 'createdAt' | 'updatedAt' | 'createdBy' | 'lastModifiedBy'>) => {
    const newEmployee: Employee = {
      ...employee,
      id: `EMP${String(employees.length + 1).padStart(3, '0')}`,
      employeeNumber: `EMP-${new Date().getFullYear()}-${String(employees.length + 1).padStart(3, '0')}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: 'Current User',
      lastModifiedBy: 'Current User',
    };
    setEmployees(prev => [...prev, newEmployee]);
    return newEmployee;
  }, [employees.length]);

  const updateEmployee = useCallback((id: string, updates: Partial<Employee>) => {
    setEmployees(prev =>
      prev.map(emp =>
        emp.id === id
          ? { ...emp, ...updates, updatedAt: new Date().toISOString(), lastModifiedBy: 'Current User' }
          : emp
      )
    );
    return true;
  }, []);

  const deleteEmployee = useCallback((id: string) => {
    setEmployees(prev => prev.filter(emp => emp.id !== id));
    return true;
  }, []);

  const getEmployee = useCallback((id: string) => {
    return employees.find(emp => emp.id === id);
  }, [employees]);

  const getEmployees = useCallback((filters?: EmployeeFilters) => {
    let filtered = [...employees];

    if (filters?.search) {
      const search = filters.search.toLowerCase();
      filtered = filtered.filter(
        emp =>
          emp.personalInfo.fullNameEn.toLowerCase().includes(search) ||
          emp.personalInfo.fullNameAr.includes(search) ||
          emp.employeeNumber.toLowerCase().includes(search) ||
          emp.contactInfo.email.toLowerCase().includes(search)
      );
    }

    if (filters?.department) {
      filtered = filtered.filter(emp => emp.employmentInfo.departmentId === filters.department);
    }

    if (filters?.employeeType) {
      filtered = filtered.filter(emp => emp.employmentInfo.employeeType === filters.employeeType);
    }

    if (filters?.status) {
      filtered = filtered.filter(emp => emp.employmentInfo.employmentStatus === filters.status);
    }

    if (filters?.position) {
      filtered = filtered.filter(emp => emp.employmentInfo.positionId === filters.position);
    }

    if (filters?.contractType) {
      filtered = filtered.filter(emp => emp.employmentInfo.contractType === filters.contractType);
    }

    return filtered;
  }, [employees]);

  // Leave Management
  const requestLeave = useCallback((request: Omit<LeaveRequest, 'id' | 'status' | 'requestDate' | 'createdAt' | 'updatedAt'>) => {
    const newRequest: LeaveRequest = {
      ...request,
      id: `LR${String(leaveRequests.length + 1).padStart(4, '0')}`,
      status: 'pending',
      requestDate: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setLeaveRequests(prev => [...prev, newRequest]);
    return newRequest;
  }, [leaveRequests.length]);

  const approveLeave = useCallback((id: string, approvedBy: string) => {
    setLeaveRequests(prev =>
      prev.map(req =>
        req.id === id
          ? {
              ...req,
              status: 'approved' as LeaveStatus,
              approvedBy,
              approvalDate: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            }
          : req
      )
    );
    return true;
  }, []);

  const rejectLeave = useCallback((id: string, rejectionReason: string) => {
    setLeaveRequests(prev =>
      prev.map(req =>
        req.id === id
          ? {
              ...req,
              status: 'rejected' as LeaveStatus,
              rejectionReason,
              updatedAt: new Date().toISOString(),
            }
          : req
      )
    );
    return true;
  }, []);

  const getLeaveRequests = useCallback((filters?: LeaveFilters) => {
    let filtered = [...leaveRequests];

    if (filters?.employeeId) {
      filtered = filtered.filter(req => req.employeeId === filters.employeeId);
    }

    if (filters?.department) {
      filtered = filtered.filter(req => req.department === filters.department);
    }

    if (filters?.leaveType) {
      filtered = filtered.filter(req => req.leaveType === filters.leaveType);
    }

    if (filters?.status) {
      filtered = filtered.filter(req => req.status === filters.status);
    }

    return filtered;
  }, [leaveRequests]);

  // Attendance Management
  const recordAttendance = useCallback((record: Omit<AttendanceRecord, 'id' | 'createdAt'>) => {
    const newRecord: AttendanceRecord = {
      ...record,
      id: `ATT${String(attendanceRecords.length + 1).padStart(5, '0')}`,
      createdAt: new Date().toISOString(),
    };
    setAttendanceRecords(prev => [...prev, newRecord]);
    return newRecord;
  }, [attendanceRecords.length]);

  const getAttendance = useCallback((filters?: AttendanceFilters) => {
    let filtered = [...attendanceRecords];

    if (filters?.employeeId) {
      filtered = filtered.filter(rec => rec.employeeId === filters.employeeId);
    }

    if (filters?.department) {
      filtered = filtered.filter(rec => rec.department === filters.department);
    }

    if (filters?.status) {
      filtered = filtered.filter(rec => rec.status === filters.status);
    }

    if (filters?.dateRange) {
      filtered = filtered.filter(
        rec =>
          rec.date >= filters.dateRange!.startDate &&
          rec.date <= filters.dateRange!.endDate
      );
    }

    return filtered;
  }, [attendanceRecords]);

  // Payroll Management
  const generatePayroll = useCallback((month: string, employeeIds?: string[]) => {
    const targetEmployees = employeeIds
      ? employees.filter(emp => employeeIds.includes(emp.id))
      : employees.filter(emp => emp.status === 'active');

    const newRecords: PayrollRecord[] = targetEmployees.map(emp => {
      const allowancesArray = Object.entries(emp.compensation.allowances)
        .filter(([_, val]) => typeof val === 'number' && val !== undefined)
        .map(([name, amount]) => ({ name, amount: amount as number }));
      
      const totalAllowances = allowancesArray.reduce((sum, item) => sum + item.amount, 0);

      const deductionsArray = Object.entries(emp.compensation.deductions)
        .filter(([_, val]) => typeof val === 'number' && val !== undefined)
        .map(([name, amount]) => ({ name, amount: amount as number }));
      
      const totalDeductions = deductionsArray.reduce((sum, item) => sum + item.amount, 0);

      return {
        id: `PR${month.replace('-', '')}${emp.id}`,
        payrollMonth: month,
        employeeId: emp.id,
        employeeName: emp.personalInfo.fullNameEn,
        department: emp.employmentInfo.department,
        position: emp.employmentInfo.position,
        baseSalary: emp.compensation.baseSalary,
        allowances: allowancesArray,
        totalEarnings: emp.compensation.baseSalary + totalAllowances,
        deductions: deductionsArray,
        totalDeductions: totalDeductions,
        netSalary: emp.compensation.baseSalary + totalAllowances - totalDeductions,
        status: 'pending' as PayrollStatus,
        workingDays: 30,
        actualDays: 30,
        absentDays: 0,
        leaveDays: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    });

    setPayrollRecords(prev => [...prev, ...newRecords]);
    return newRecords;
  }, [employees]);

  const processPayroll = useCallback((ids: string[], processedBy: string) => {
    setPayrollRecords(prev =>
      prev.map(rec =>
        ids.includes(rec.id)
          ? {
              ...rec,
              status: 'processed' as PayrollStatus,
              processedBy,
              processedAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            }
          : rec
      )
    );
    return true;
  }, []);

  const payPayroll = useCallback((ids: string[], paymentMethod: 'bank-transfer' | 'cash' | 'cheque') => {
    setPayrollRecords(prev =>
      prev.map(rec =>
        ids.includes(rec.id)
          ? {
              ...rec,
              status: 'paid' as PayrollStatus,
              paymentDate: new Date().toISOString(),
              paymentMethod,
              updatedAt: new Date().toISOString(),
            }
          : rec
      )
    );
    return true;
  }, []);

  const getPayrollRecords = useCallback((filters?: PayrollFilters) => {
    let filtered = [...payrollRecords];

    if (filters?.employeeId) {
      filtered = filtered.filter(rec => rec.employeeId === filters.employeeId);
    }

    if (filters?.department) {
      filtered = filtered.filter(rec => rec.department === filters.department);
    }

    if (filters?.month) {
      filtered = filtered.filter(rec => rec.payrollMonth === filters.month);
    }

    if (filters?.status) {
      filtered = filtered.filter(rec => rec.status === filters.status);
    }

    return filtered;
  }, [payrollRecords]);

  // Statistics
  const getStatistics = useCallback((): HRStatistics => {
    const active = employees.filter(emp => emp.status === 'active');
    const onLeave = employees.filter(emp => emp.status === 'on-leave');

    const byDepartment = departments.map(dept => ({
      department: dept.nameEn,
      count: employees.filter(emp => emp.employmentInfo.departmentId === dept.id).length,
    }));

    const byEmployeeType = [
      { type: 'doctor' as EmployeeType, count: employees.filter(emp => emp.employmentInfo.employeeType === 'doctor').length },
      { type: 'nurse' as EmployeeType, count: employees.filter(emp => emp.employmentInfo.employeeType === 'nurse').length },
      { type: 'technician' as EmployeeType, count: employees.filter(emp => emp.employmentInfo.employeeType === 'technician').length },
      { type: 'admin' as EmployeeType, count: employees.filter(emp => emp.employmentInfo.employeeType === 'admin').length },
      { type: 'support' as EmployeeType, count: employees.filter(emp => emp.employmentInfo.employeeType === 'support').length },
    ];

    const byContractType = [
      { type: 'permanent' as ContractType, count: employees.filter(emp => emp.employmentInfo.contractType === 'permanent').length },
      { type: 'temporary' as ContractType, count: employees.filter(emp => emp.employmentInfo.contractType === 'temporary').length },
      { type: 'contract' as ContractType, count: employees.filter(emp => emp.employmentInfo.contractType === 'contract').length },
    ];

    const totalAge = employees.reduce((sum, emp) => sum + emp.personalInfo.age, 0);
    const averageAge = employees.length > 0 ? totalAge / employees.length : 0;

    const currentYear = new Date().getFullYear();
    const totalTenure = employees.reduce((sum, emp) => {
      const hireYear = new Date(emp.employmentInfo.hireDate).getFullYear();
      return sum + (currentYear - hireYear);
    }, 0);
    const averageTenure = employees.length > 0 ? totalTenure / employees.length : 0;

    const maleCount = employees.filter(emp => emp.personalInfo.gender === 'male').length;
    const femaleCount = employees.filter(emp => emp.personalInfo.gender === 'female').length;

    const monthlyPayroll = employees
      .filter(emp => emp.status === 'active')
      .reduce((sum, emp) => sum + emp.compensation.totalMonthlyCompensation, 0);

    return {
      totalEmployees: employees.length,
      activeEmployees: active.length,
      onLeaveEmployees: onLeave.length,
      byDepartment,
      byEmployeeType,
      byContractType,
      averageAge,
      averageTenure,
      genderDistribution: {
        male: maleCount,
        female: femaleCount,
      },
      monthlyPayroll,
      turnoverRate: 0, // Calculate based on historical data
      absenteeismRate: 0, // Calculate from attendance records
      trainingCompletionRate: 0, // Calculate from training enrollments
    };
  }, [employees, departments]);

  // Department Management
  const getDepartments = useCallback(() => {
    return departments;
  }, [departments]);

  const getDepartment = useCallback((id: string) => {
    return departments.find(dept => dept.id === id);
  }, [departments]);

  return {
    // Employee Management
    employees,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee,
    getEmployees,

    // Department Management
    departments,
    getDepartments,
    getDepartment,

    // Leave Management
    leaveRequests,
    requestLeave,
    approveLeave,
    rejectLeave,
    getLeaveRequests,

    // Attendance Management
    attendanceRecords,
    recordAttendance,
    getAttendance,

    // Payroll Management
    payrollRecords,
    generatePayroll,
    processPayroll,
    payPayroll,
    getPayrollRecords,

    // Statistics
    getStatistics,

    // Constants
    HOSPITAL_DEPARTMENTS,
    MEDICAL_SPECIALIZATIONS,
    JOB_POSITIONS,
  };
};
