import { useState, useCallback } from "react";
import {
  RadiologyExam,
  RadiologyRequest,
  RadiologyReport,
  RadiologyStatus,
  RadiologyModality,
  RadiologyPriority,
  RadiologyBodyPart,
  RadiologyStatistics,
  RADIOLOGY_EXAMS_DATABASE,
} from "@shared/radiology";

// In-memory storage for demo (replace with API calls in production)
let radiologyExamsStore: RadiologyExam[] = [...RADIOLOGY_EXAMS_DATABASE];
let radiologyRequestsStore: RadiologyRequest[] = [];
let radiologyReportsStore: RadiologyReport[] = [];

export function useRadiology() {
  const [, setUpdate] = useState(0);
  const forceUpdate = useCallback(() => setUpdate((n) => n + 1), []);

  // Get all available radiology exams
  const getRadiologyExams = useCallback(
    (filters?: {
      modality?: RadiologyModality;
      bodyPart?: RadiologyBodyPart;
      searchTerm?: string;
      isActive?: boolean;
    }) => {
      let exams = [...radiologyExamsStore];

      if (filters?.modality) {
        exams = exams.filter((exam) => exam.modality === filters.modality);
      }

      if (filters?.bodyPart) {
        exams = exams.filter((exam) => exam.bodyPart === filters.bodyPart);
      }

      if (filters?.searchTerm) {
        const term = filters.searchTerm.toLowerCase();
        exams = exams.filter(
          (exam) =>
            exam.name.toLowerCase().includes(term) ||
            exam.nameAr.toLowerCase().includes(term) ||
            exam.nameEn.toLowerCase().includes(term) ||
            exam.code.toLowerCase().includes(term)
        );
      }

      if (filters?.isActive !== undefined) {
        exams = exams.filter((exam) => exam.isActive === filters.isActive);
      }

      return exams;
    },
    []
  );

  // Get exam by ID
  const getRadiologyExamById = useCallback((examId: string) => {
    return radiologyExamsStore.find((exam) => exam.id === examId);
  }, []);

  // Add new radiology exam
  const addRadiologyExam = useCallback(
    (exam: Omit<RadiologyExam, "id" | "createdAt" | "updatedAt">) => {
      const newExam: RadiologyExam = {
        ...exam,
        id: `rad_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      radiologyExamsStore.push(newExam);
      forceUpdate();
      return newExam;
    },
    [forceUpdate]
  );

  // Update radiology exam
  const updateRadiologyExam = useCallback(
    (examId: string, updates: Partial<RadiologyExam>) => {
      const index = radiologyExamsStore.findIndex((exam) => exam.id === examId);
      if (index !== -1) {
        radiologyExamsStore[index] = {
          ...radiologyExamsStore[index],
          ...updates,
          updatedAt: new Date().toISOString(),
        };
        forceUpdate();
        return radiologyExamsStore[index];
      }
      return null;
    },
    [forceUpdate]
  );

  // Get radiology requests
  const getRadiologyRequests = useCallback(
    (filters?: {
      status?: RadiologyStatus;
      priority?: RadiologyPriority;
      patientId?: string;
      modality?: RadiologyModality;
      dateFrom?: string;
      dateTo?: string;
    }) => {
      let requests = [...radiologyRequestsStore];

      if (filters?.status) {
        requests = requests.filter(
          (request) => request.status === filters.status
        );
      }

      if (filters?.priority) {
        requests = requests.filter(
          (request) => request.priority === filters.priority
        );
      }

      if (filters?.patientId) {
        requests = requests.filter(
          (request) => request.patientId === filters.patientId
        );
      }

      if (filters?.modality) {
        requests = requests.filter((request) =>
          request.exams.some((exam) => exam.modality === filters.modality)
        );
      }

      if (filters?.dateFrom) {
        requests = requests.filter(
          (request) => request.requestDate >= filters.dateFrom!
        );
      }

      if (filters?.dateTo) {
        requests = requests.filter(
          (request) => request.requestDate <= filters.dateTo!
        );
      }

      return requests.sort(
        (a, b) =>
          new Date(b.requestDate).getTime() -
          new Date(a.requestDate).getTime()
      );
    },
    []
  );

  // Get request by ID
  const getRadiologyRequestById = useCallback((requestId: string) => {
    return radiologyRequestsStore.find((request) => request.id === requestId);
  }, []);

  // Create radiology request
  const createRadiologyRequest = useCallback(
    (
      request: Omit<
        RadiologyRequest,
        "id" | "requestNumber" | "createdAt" | "updatedAt"
      >
    ) => {
      const requestNumber = `RAD${Date.now().toString().slice(-8)}`;
      const newRequest: RadiologyRequest = {
        ...request,
        id: `radreq_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        requestNumber,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      radiologyRequestsStore.push(newRequest);
      forceUpdate();
      return newRequest;
    },
    [forceUpdate]
  );

  // Update radiology request status
  const updateRadiologyRequestStatus = useCallback(
    (
      requestId: string,
      status: RadiologyStatus,
      updates?: Partial<RadiologyRequest>
    ) => {
      const index = radiologyRequestsStore.findIndex(
        (req) => req.id === requestId
      );
      if (index !== -1) {
        radiologyRequestsStore[index] = {
          ...radiologyRequestsStore[index],
          status,
          ...updates,
          updatedAt: new Date().toISOString(),
        };
        forceUpdate();
        return radiologyRequestsStore[index];
      }
      return null;
    },
    [forceUpdate]
  );

  // Schedule radiology request
  const scheduleRadiologyRequest = useCallback(
    (requestId: string, scheduledDate: string, scheduledTime: string) => {
      return updateRadiologyRequestStatus(requestId, "scheduled", {
        scheduledDate,
        scheduledTime,
        scheduledBy: "current-user",
      });
    },
    [updateRadiologyRequestStatus]
  );

  // Add radiology report
  const addRadiologyReport = useCallback(
    (report: Omit<RadiologyReport, "id" | "createdAt" | "updatedAt">) => {
      const newReport: RadiologyReport = {
        ...report,
        id: `report_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      radiologyReportsStore.push(newReport);
      
      // Update request status to reported
      const request = radiologyRequestsStore.find(
        (r) => r.id === report.requestId
      );
      if (request) {
        updateRadiologyRequestStatus(report.requestId, "reported", {
          reportedAt: report.reportedAt,
          reportedBy: report.reportedBy,
          reportedByName: report.reportedByName,
        });
      }
      
      forceUpdate();
      return newReport;
    },
    [forceUpdate, updateRadiologyRequestStatus]
  );

  // Get radiology reports
  const getRadiologyReports = useCallback(
    (filters?: {
      requestId?: string;
      patientId?: string;
      examId?: string;
      reportedBy?: string;
    }) => {
      let reports = [...radiologyReportsStore];

      if (filters?.requestId) {
        reports = reports.filter(
          (report) => report.requestId === filters.requestId
        );
      }

      if (filters?.patientId) {
        reports = reports.filter(
          (report) => report.patientId === filters.patientId
        );
      }

      if (filters?.examId) {
        reports = reports.filter(
          (report) => report.examId === filters.examId
        );
      }

      if (filters?.reportedBy) {
        reports = reports.filter(
          (report) => report.reportedBy === filters.reportedBy
        );
      }

      return reports.sort(
        (a, b) =>
          new Date(b.reportedAt).getTime() - new Date(a.reportedAt).getTime()
      );
    },
    []
  );

  // Update radiology report
  const updateRadiologyReport = useCallback(
    (reportId: string, updates: Partial<RadiologyReport>) => {
      const index = radiologyReportsStore.findIndex(
        (report) => report.id === reportId
      );
      if (index !== -1) {
        radiologyReportsStore[index] = {
          ...radiologyReportsStore[index],
          ...updates,
          updatedAt: new Date().toISOString(),
        };
        forceUpdate();
        return radiologyReportsStore[index];
      }
      return null;
    },
    [forceUpdate]
  );

  // Get radiology statistics
  const getRadiologyStatistics = useCallback((): RadiologyStatistics => {
    const now = new Date();
    const todayStart = new Date(now.setHours(0, 0, 0, 0)).toISOString();

    const totalRequests = radiologyRequestsStore.length;
    const pendingRequests = radiologyRequestsStore.filter(
      (r) => r.status === "pending"
    ).length;
    const scheduledToday = radiologyRequestsStore.filter(
      (r) =>
        r.status === "scheduled" && r.scheduledDate && r.scheduledDate >= todayStart
    ).length;
    const completedToday = radiologyRequestsStore.filter(
      (r) => r.completedAt && r.completedAt >= todayStart
    ).length;
    const urgentRequests = radiologyRequestsStore.filter(
      (r) => r.priority === "urgent" || r.priority === "stat"
    ).length;

    // Calculate average completion time
    const completedRequests = radiologyRequestsStore.filter(
      (r) => r.completedAt && r.performedAt
    );
    let averageCompletionTime = 0;
    if (completedRequests.length > 0) {
      const totalTime = completedRequests.reduce((sum, r) => {
        const start = new Date(r.performedAt!).getTime();
        const end = new Date(r.completedAt!).getTime();
        return sum + (end - start);
      }, 0);
      averageCompletionTime = totalTime / completedRequests.length / (1000 * 60); // في دقائق
    }

    // Exams by modality
    const modalityCount = new Map<RadiologyModality, number>();
    radiologyRequestsStore.forEach((request) => {
      request.exams.forEach((exam) => {
        modalityCount.set(
          exam.modality,
          (modalityCount.get(exam.modality) || 0) + 1
        );
      });
    });
    const examsByModality = Array.from(modalityCount.entries()).map(
      ([modality, count]) => ({ modality, count })
    );

    // Exams by body part
    const bodyPartCount = new Map<RadiologyBodyPart, number>();
    radiologyRequestsStore.forEach((request) => {
      request.exams.forEach((exam) => {
        bodyPartCount.set(
          exam.bodyPart,
          (bodyPartCount.get(exam.bodyPart) || 0) + 1
        );
      });
    });
    const examsByBodyPart = Array.from(bodyPartCount.entries()).map(
      ([bodyPart, count]) => ({ bodyPart, count })
    );

    // Count critical findings in reports
    const criticalFindings = radiologyReportsStore.filter((report) =>
      report.impression?.toLowerCase().includes("critical") ||
      report.impression?.toLowerCase().includes("urgent") ||
      report.impression?.toLowerCase().includes("حرج") ||
      report.impression?.toLowerCase().includes("عاجل")
    ).length;

    const revenue = radiologyRequestsStore
      .filter((r) => r.status === "completed" || r.status === "delivered")
      .reduce((sum, r) => sum + r.totalAmount, 0);

    return {
      totalRequests,
      pendingRequests,
      scheduledToday,
      completedToday,
      urgentRequests,
      averageCompletionTime,
      examsByModality,
      examsByBodyPart,
      criticalFindings,
      revenue,
    };
  }, []);

  return {
    // Radiology Exams
    getRadiologyExams,
    getRadiologyExamById,
    addRadiologyExam,
    updateRadiologyExam,

    // Radiology Requests
    getRadiologyRequests,
    getRadiologyRequestById,
    createRadiologyRequest,
    updateRadiologyRequestStatus,
    scheduleRadiologyRequest,

    // Radiology Reports
    getRadiologyReports,
    addRadiologyReport,
    updateRadiologyReport,

    // Statistics
    getRadiologyStatistics,
  };
}

// Initialize with mock data for demo
export function initializeRadiologyData() {
  if (radiologyRequestsStore.length === 0) {
    // Add sample radiology requests
    const sampleRequests: RadiologyRequest[] = [
      {
        id: "radreq_001",
        requestNumber: "RAD20241115001",
        patientId: "patient_001",
        patientName: "أحمد محمد علي",
        patientAge: 45,
        patientGender: "male",
        doctorId: "doctor_001",
        doctorName: "د. محمد أحمد",
        department: "Orthopedics",
        requestDate: new Date().toISOString(),
        priority: "routine",
        status: "pending",
        exams: [
          {
            examId: "rad_xr_004",
            examName: "أشعة عادية على الفقرات القطنية",
            examCode: "XRAY-SPINE-LS",
            modality: "xray",
            bodyPart: "spine",
            price: 300,
          },
        ],
        totalAmount: 300,
        clinicalIndication: "آلام أسفل الظهر",
        createdBy: "nurse_001",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "radreq_002",
        requestNumber: "RAD20241115002",
        patientId: "patient_002",
        patientName: "فاطمة حسن",
        patientAge: 35,
        patientGender: "female",
        doctorId: "doctor_002",
        doctorName: "د. سارة محمود",
        department: "Neurology",
        requestDate: new Date().toISOString(),
        scheduledDate: new Date().toISOString(),
        scheduledTime: "14:00",
        priority: "urgent",
        status: "scheduled",
        exams: [
          {
            examId: "rad_mr_001",
            examName: "رنين مغناطيسي على المخ",
            examCode: "MRI-BRAIN",
            modality: "mri",
            bodyPart: "brain",
            price: 3000,
          },
        ],
        totalAmount: 3000,
        clinicalIndication: "صداع مستمر ودوخة",
        clinicalHistory: "لا يوجد تاريخ مرضي سابق",
        allergies: "لا توجد حساسية",
        scheduledBy: "receptionist_001",
        createdBy: "nurse_002",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];

    radiologyRequestsStore = sampleRequests;
  }
}
