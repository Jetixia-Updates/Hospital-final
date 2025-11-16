import { useState, useCallback, useEffect } from 'react';
import {
  PatientReception,
  ReceptionQueue,
  ReceptionStatistics,
  QuickRegistration,
  PatientVisitType,
  PatientPriority,
  ReceptionStatus,
} from '@shared/reception';

// In-memory storage
let receptionsStore: PatientReception[] = [];
let queueStore: ReceptionQueue[] = [];
let receptionCounter = 1;
let queueCounter = 1;

// Initialize with sample data
export const initializeReceptionData = () => {
  if (receptionsStore.length > 0) return;

  const now = new Date();
  const today = now.toISOString().split('T')[0];

  // Sample receptions
  receptionsStore = [
    {
      id: 'rec_001',
      receptionNumber: 'REC-2024-001',
      visitDate: today,
      visitTime: '08:30',
      patientId: 'P12847',
      isNewPatient: false,
      patientName: 'أحمد محمد علي',
      patientNameEn: 'Ahmed Mohammed Ali',
      age: 45,
      gender: 'male',
      nationality: 'Saudi',
      nationalId: '1234567890',
      phone: '+966501234567',
      email: 'ahmed@example.com',
      visitType: 'clinic',
      visitReason: 'كشف دوري - متابعة السكري',
      priority: 'normal',
      status: 'directed',
      directedTo: {
        module: 'clinic',
        department: 'Internal Medicine',
        doctor: 'Dr. Mohammed Hassan',
        room: 'Clinic-201',
        appointmentTime: '09:00',
        notes: 'مريض سكري - متابعة دورية'
      },
      hasInsurance: true,
      insuranceProvider: 'Bupa Arabia',
      insurancePolicyNumber: 'BP-123456',
      insuranceCoverage: 80,
      receptionistId: 'staff_001',
      receptionistName: 'فاطمة أحمد',
      registeredAt: new Date(now.getTime() - 30 * 60000).toISOString(),
      directedAt: new Date(now.getTime() - 25 * 60000).toISOString(),
      medicalHistory: 'سكري نوع 2، ضغط دم',
      allergies: 'البنسلين',
    },
    {
      id: 'rec_002',
      receptionNumber: 'REC-2024-002',
      visitDate: today,
      visitTime: '09:15',
      isNewPatient: true,
      patientName: 'سارة خالد',
      patientNameEn: 'Sarah Khalid',
      age: 28,
      gender: 'female',
      nationality: 'Saudi',
      nationalId: '2345678901',
      phone: '+966502345678',
      visitType: 'laboratory',
      visitReason: 'تحاليل شاملة',
      priority: 'normal',
      status: 'registered',
      hasInsurance: true,
      insuranceProvider: 'MedGulf',
      insurancePolicyNumber: 'MG-789012',
      insuranceCoverage: 90,
      receptionistId: 'staff_001',
      receptionistName: 'فاطمة أحمد',
      registeredAt: new Date(now.getTime() - 10 * 60000).toISOString(),
    },
    {
      id: 'rec_003',
      receptionNumber: 'REC-2024-003',
      visitDate: today,
      visitTime: '09:45',
      patientId: 'P11532',
      isNewPatient: false,
      patientName: 'محمد عبدالله',
      patientNameEn: 'Mohammed Abdullah',
      age: 35,
      gender: 'male',
      nationality: 'Saudi',
      nationalId: '3456789012',
      phone: '+966503456789',
      visitType: 'emergency',
      visitReason: 'ألم شديد في البطن',
      priority: 'emergency',
      status: 'directed',
      vitalSigns: {
        bloodPressure: '140/90',
        heartRate: 95,
        temperature: 38.2,
        oxygenSaturation: 96,
      },
      directedTo: {
        module: 'emergency',
        department: 'Emergency Room',
        doctor: 'Dr. Ahmed Ali',
        room: 'ER-1',
        notes: 'حالة طارئة - ألم حاد'
      },
      hasInsurance: false,
      receptionistId: 'staff_002',
      receptionistName: 'نورة سعد',
      registeredAt: new Date(now.getTime() - 5 * 60000).toISOString(),
      directedAt: new Date(now.getTime() - 3 * 60000).toISOString(),
    },
  ];

  // Sample queue
  queueStore = [
    {
      id: 'q_001',
      receptionId: 'rec_002',
      patientName: 'سارة خالد',
      queueNumber: 15,
      visitType: 'laboratory',
      priority: 'normal',
      status: 'waiting',
      waitTime: 10,
      estimatedTime: 20,
    },
    {
      id: 'q_002',
      receptionId: 'rec_003',
      patientName: 'محمد عبدالله',
      queueNumber: 1,
      visitType: 'emergency',
      priority: 'emergency',
      status: 'serving',
      waitTime: 3,
      calledAt: new Date(now.getTime() - 2 * 60000).toISOString(),
    },
  ];

  receptionCounter = receptionsStore.length + 1;
  queueCounter = queueStore.length + 1;
};

export const useReception = () => {
  const [, forceUpdate] = useState({});

  useEffect(() => {
    initializeReceptionData();
  }, []);

  // Register new patient
  const registerPatient = useCallback((data: Partial<PatientReception>): PatientReception => {
    const now = new Date();
    const receptionNumber = `REC-${now.getFullYear()}-${String(receptionCounter).padStart(4, '0')}`;
    
    const newReception: PatientReception = {
      id: `rec_${Date.now()}`,
      receptionNumber,
      visitDate: now.toISOString().split('T')[0],
      visitTime: now.toTimeString().slice(0, 5),
      isNewPatient: true,
      patientName: data.patientName || '',
      age: data.age || 0,
      gender: data.gender || 'male',
      nationality: data.nationality || '',
      nationalId: data.nationalId || '',
      phone: data.phone || '',
      visitType: data.visitType || 'clinic',
      visitReason: data.visitReason || '',
      priority: data.priority || 'normal',
      status: 'registered',
      hasInsurance: data.hasInsurance || false,
      receptionistId: 'staff_001',
      receptionistName: 'موظف الاستقبال',
      registeredAt: now.toISOString(),
      ...data,
    };

    receptionsStore.unshift(newReception);
    receptionCounter++;
    forceUpdate({});
    
    return newReception;
  }, []);

  // Quick registration
  const quickRegister = useCallback((data: QuickRegistration): PatientReception => {
    return registerPatient({
      patientName: data.patientName,
      age: data.age,
      gender: data.gender,
      phone: data.phone,
      visitType: data.visitType,
      visitReason: data.visitReason,
      priority: data.priority,
      nationality: 'Saudi',
      nationalId: '',
      hasInsurance: false,
    });
  }, [registerPatient]);

  // Direct patient to module
  const directPatient = useCallback((
    receptionId: string,
    direction: PatientReception['directedTo']
  ): boolean => {
    const index = receptionsStore.findIndex(r => r.id === receptionId);
    if (index === -1) return false;

    receptionsStore[index] = {
      ...receptionsStore[index],
      directedTo: direction,
      status: 'directed',
      directedAt: new Date().toISOString(),
    };

    // Add to queue if needed
    if (direction) {
      addToQueue(receptionId, direction.module);
    }

    forceUpdate({});
    return true;
  }, []);

  // Add to queue
  const addToQueue = useCallback((receptionId: string, visitType: PatientVisitType) => {
    const reception = receptionsStore.find(r => r.id === receptionId);
    if (!reception) return;

    const queueItem: ReceptionQueue = {
      id: `q_${Date.now()}`,
      receptionId,
      patientName: reception.patientName,
      queueNumber: queueCounter++,
      visitType,
      priority: reception.priority,
      status: 'waiting',
      waitTime: 0,
    };

    queueStore.unshift(queueItem);
    forceUpdate({});
  }, []);

  // Update reception status
  const updateReceptionStatus = useCallback((
    receptionId: string,
    status: ReceptionStatus
  ): boolean => {
    const index = receptionsStore.findIndex(r => r.id === receptionId);
    if (index === -1) return false;

    receptionsStore[index] = {
      ...receptionsStore[index],
      status,
      ...(status === 'completed' && { completedAt: new Date().toISOString() }),
    };

    forceUpdate({});
    return true;
  }, []);

  // Update vital signs
  const updateVitalSigns = useCallback((
    receptionId: string,
    vitalSigns: PatientReception['vitalSigns']
  ): boolean => {
    const index = receptionsStore.findIndex(r => r.id === receptionId);
    if (index === -1) return false;

    receptionsStore[index] = {
      ...receptionsStore[index],
      vitalSigns: {
        ...receptionsStore[index].vitalSigns,
        ...vitalSigns,
      },
    };

    forceUpdate({});
    return true;
  }, []);

  // Get receptions with filters
  const getReceptions = useCallback((filters?: {
    status?: ReceptionStatus;
    visitType?: PatientVisitType;
    priority?: PatientPriority;
    date?: string;
    search?: string;
  }) => {
    let filtered = [...receptionsStore];

    if (filters?.status) {
      filtered = filtered.filter(r => r.status === filters.status);
    }

    if (filters?.visitType) {
      filtered = filtered.filter(r => r.visitType === filters.visitType);
    }

    if (filters?.priority) {
      filtered = filtered.filter(r => r.priority === filters.priority);
    }

    if (filters?.date) {
      filtered = filtered.filter(r => r.visitDate === filters.date);
    }

    if (filters?.search) {
      const search = filters.search.toLowerCase();
      filtered = filtered.filter(r => 
        r.patientName.toLowerCase().includes(search) ||
        r.receptionNumber.toLowerCase().includes(search) ||
        r.phone.includes(search) ||
        r.nationalId.includes(search)
      );
    }

    return filtered;
  }, []);

  // Get queue
  const getQueue = useCallback((filters?: {
    visitType?: PatientVisitType;
    status?: ReceptionQueue['status'];
  }) => {
    let filtered = [...queueStore];

    if (filters?.visitType) {
      filtered = filtered.filter(q => q.visitType === filters.visitType);
    }

    if (filters?.status) {
      filtered = filtered.filter(q => q.status === filters.status);
    }

    // Sort by priority and queue number
    filtered.sort((a, b) => {
      const priorityOrder = { emergency: 0, urgent: 1, normal: 2 };
      const aPriority = priorityOrder[a.priority];
      const bPriority = priorityOrder[b.priority];
      
      if (aPriority !== bPriority) return aPriority - bPriority;
      return a.queueNumber - b.queueNumber;
    });

    return filtered;
  }, []);

  // Get statistics
  const getStatistics = useCallback((): ReceptionStatistics => {
    const today = new Date().toISOString().split('T')[0];
    const todayReceptions = receptionsStore.filter(r => r.visitDate === today);

    const byVisitType = todayReceptions.reduce((acc, r) => {
      const existing = acc.find(item => item.type === r.visitType);
      if (existing) {
        existing.count++;
      } else {
        acc.push({ type: r.visitType, count: 1 });
      }
      return acc;
    }, [] as { type: PatientVisitType; count: number }[]);

    const byPriority = todayReceptions.reduce((acc, r) => {
      const existing = acc.find(item => item.priority === r.priority);
      if (existing) {
        existing.count++;
      } else {
        acc.push({ priority: r.priority, count: 1 });
      }
      return acc;
    }, [] as { priority: PatientPriority; count: number }[]);

    const completedToday = todayReceptions.filter(r => r.status === 'completed');
    const avgProcessTime = completedToday.length > 0
      ? completedToday.reduce((sum, r) => {
          if (r.registeredAt && r.completedAt) {
            const diff = new Date(r.completedAt).getTime() - new Date(r.registeredAt).getTime();
            return sum + diff / 60000; // minutes
          }
          return sum;
        }, 0) / completedToday.length
      : 0;

    return {
      todayTotal: todayReceptions.length,
      waiting: todayReceptions.filter(r => r.status === 'waiting').length,
      registered: todayReceptions.filter(r => r.status === 'registered').length,
      directed: todayReceptions.filter(r => r.status === 'directed').length,
      completed: completedToday.length,
      byVisitType,
      byPriority,
      newPatients: todayReceptions.filter(r => r.isNewPatient).length,
      returningPatients: todayReceptions.filter(r => !r.isNewPatient).length,
      averageWaitTime: queueStore.reduce((sum, q) => sum + q.waitTime, 0) / (queueStore.length || 1),
      averageProcessTime: avgProcessTime,
    };
  }, []);

  // Delete reception
  const deleteReception = useCallback((receptionId: string): boolean => {
    const index = receptionsStore.findIndex(r => r.id === receptionId);
    if (index === -1) return false;

    receptionsStore.splice(index, 1);
    
    // Remove from queue
    const queueIndex = queueStore.findIndex(q => q.receptionId === receptionId);
    if (queueIndex !== -1) {
      queueStore.splice(queueIndex, 1);
    }

    forceUpdate({});
    return true;
  }, []);

  return {
    registerPatient,
    quickRegister,
    directPatient,
    updateReceptionStatus,
    updateVitalSigns,
    getReceptions,
    getQueue,
    getStatistics,
    deleteReception,
  };
};
