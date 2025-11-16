import { useState, useCallback } from "react";
import {
  LabTest,
  TestRequest,
  TestResult,
  TestStatus,
  TestCategory,
  TestPriority,
  LabStatistics,
  LAB_TESTS_DATABASE,
} from "@shared/laboratory";

// In-memory storage for demo (replace with API calls in production)
let labTestsStore: LabTest[] = [...LAB_TESTS_DATABASE];
let testRequestsStore: TestRequest[] = [];
let testResultsStore: TestResult[] = [];

export function useLaboratory() {
  const [, setUpdate] = useState(0);
  const forceUpdate = useCallback(() => setUpdate((n) => n + 1), []);

  // Get all available lab tests
  const getLabTests = useCallback(
    (filters?: {
      category?: TestCategory;
      searchTerm?: string;
      isActive?: boolean;
    }) => {
      let tests = [...labTestsStore];

      if (filters?.category) {
        tests = tests.filter((test) => test.category === filters.category);
      }

      if (filters?.searchTerm) {
        const term = filters.searchTerm.toLowerCase();
        tests = tests.filter(
          (test) =>
            test.name.toLowerCase().includes(term) ||
            test.nameAr.toLowerCase().includes(term) ||
            test.nameEn.toLowerCase().includes(term) ||
            test.code.toLowerCase().includes(term)
        );
      }

      if (filters?.isActive !== undefined) {
        tests = tests.filter((test) => test.isActive === filters.isActive);
      }

      return tests;
    },
    []
  );

  // Get test by ID
  const getLabTestById = useCallback((testId: string) => {
    return labTestsStore.find((test) => test.id === testId);
  }, []);

  // Add new lab test
  const addLabTest = useCallback(
    (test: Omit<LabTest, "id" | "createdAt" | "updatedAt">) => {
      const newTest: LabTest = {
        ...test,
        id: `test_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      labTestsStore.push(newTest);
      forceUpdate();
      return newTest;
    },
    [forceUpdate]
  );

  // Update lab test
  const updateLabTest = useCallback(
    (testId: string, updates: Partial<LabTest>) => {
      const index = labTestsStore.findIndex((test) => test.id === testId);
      if (index !== -1) {
        labTestsStore[index] = {
          ...labTestsStore[index],
          ...updates,
          updatedAt: new Date().toISOString(),
        };
        forceUpdate();
        return labTestsStore[index];
      }
      return null;
    },
    [forceUpdate]
  );

  // Get test requests
  const getTestRequests = useCallback(
    (filters?: {
      status?: TestStatus;
      priority?: TestPriority;
      patientId?: string;
      category?: TestCategory;
      dateFrom?: string;
      dateTo?: string;
    }) => {
      let requests = [...testRequestsStore];

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

      if (filters?.category) {
        requests = requests.filter((request) =>
          request.tests.some((test) => test.category === filters.category)
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
  const getTestRequestById = useCallback((requestId: string) => {
    return testRequestsStore.find((request) => request.id === requestId);
  }, []);

  // Create test request
  const createTestRequest = useCallback(
    (
      request: Omit<
        TestRequest,
        "id" | "requestNumber" | "createdAt" | "updatedAt"
      >
    ) => {
      const requestNumber = `LAB${Date.now().toString().slice(-8)}`;
      const newRequest: TestRequest = {
        ...request,
        id: `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        requestNumber,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      testRequestsStore.push(newRequest);
      forceUpdate();
      return newRequest;
    },
    [forceUpdate]
  );

  // Update test request status
  const updateTestRequestStatus = useCallback(
    (requestId: string, status: TestStatus, updates?: Partial<TestRequest>) => {
      const index = testRequestsStore.findIndex((req) => req.id === requestId);
      if (index !== -1) {
        testRequestsStore[index] = {
          ...testRequestsStore[index],
          status,
          ...updates,
          updatedAt: new Date().toISOString(),
        };
        forceUpdate();
        return testRequestsStore[index];
      }
      return null;
    },
    [forceUpdate]
  );

  // Add test result
  const addTestResult = useCallback(
    (result: Omit<TestResult, "id" | "createdAt" | "updatedAt">) => {
      const newResult: TestResult = {
        ...result,
        id: `result_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      testResultsStore.push(newResult);
      forceUpdate();
      return newResult;
    },
    [forceUpdate]
  );

  // Get test results
  const getTestResults = useCallback(
    (filters?: {
      requestId?: string;
      patientId?: string;
      testId?: string;
      status?: "normal" | "abnormal" | "critical";
    }) => {
      let results = [...testResultsStore];

      if (filters?.requestId) {
        results = results.filter(
          (result) => result.requestId === filters.requestId
        );
      }

      if (filters?.patientId) {
        results = results.filter(
          (result) => result.patientId === filters.patientId
        );
      }

      if (filters?.testId) {
        results = results.filter((result) => result.testId === filters.testId);
      }

      if (filters?.status) {
        results = results.filter((result) => result.status === filters.status);
      }

      return results.sort(
        (a, b) =>
          new Date(b.testedAt).getTime() - new Date(a.testedAt).getTime()
      );
    },
    []
  );

  // Update test result
  const updateTestResult = useCallback(
    (resultId: string, updates: Partial<TestResult>) => {
      const index = testResultsStore.findIndex(
        (result) => result.id === resultId
      );
      if (index !== -1) {
        testResultsStore[index] = {
          ...testResultsStore[index],
          ...updates,
          updatedAt: new Date().toISOString(),
        };
        forceUpdate();
        return testResultsStore[index];
      }
      return null;
    },
    [forceUpdate]
  );

  // Get laboratory statistics
  const getLabStatistics = useCallback((): LabStatistics => {
    const now = new Date();
    const todayStart = new Date(now.setHours(0, 0, 0, 0)).toISOString();

    const totalRequests = testRequestsStore.length;
    const pendingRequests = testRequestsStore.filter(
      (r) => r.status === "pending"
    ).length;
    const inProgressRequests = testRequestsStore.filter(
      (r) => r.status === "in_progress"
    ).length;
    const completedToday = testRequestsStore.filter(
      (r) => r.completedAt && r.completedAt >= todayStart
    ).length;
    const urgentRequests = testRequestsStore.filter(
      (r) => r.priority === "urgent" || r.priority === "stat"
    ).length;

    // Calculate average completion time
    const completedRequests = testRequestsStore.filter(
      (r) => r.completedAt && r.startedAt
    );
    let averageCompletionTime = 0;
    if (completedRequests.length > 0) {
      const totalTime = completedRequests.reduce((sum, r) => {
        const start = new Date(r.startedAt!).getTime();
        const end = new Date(r.completedAt!).getTime();
        return sum + (end - start);
      }, 0);
      averageCompletionTime = totalTime / completedRequests.length / (1000 * 60 * 60); // في ساعات
    }

    // Tests by category
    const categoryCount = new Map<TestCategory, number>();
    testRequestsStore.forEach((request) => {
      request.tests.forEach((test) => {
        categoryCount.set(test.category, (categoryCount.get(test.category) || 0) + 1);
      });
    });
    const testsByCategory = Array.from(categoryCount.entries()).map(
      ([category, count]) => ({ category, count })
    );

    const abnormalResults = testResultsStore.filter(
      (r) => r.status === "abnormal"
    ).length;
    const criticalResults = testResultsStore.filter(
      (r) => r.status === "critical"
    ).length;

    const revenue = testRequestsStore
      .filter((r) => r.status === "completed" || r.status === "delivered")
      .reduce((sum, r) => sum + r.totalAmount, 0);

    return {
      totalRequests,
      pendingRequests,
      inProgressRequests,
      completedToday,
      urgentRequests,
      averageCompletionTime,
      testsByCategory,
      abnormalResults,
      criticalResults,
      revenue,
    };
  }, []);

  return {
    // Lab Tests
    getLabTests,
    getLabTestById,
    addLabTest,
    updateLabTest,

    // Test Requests
    getTestRequests,
    getTestRequestById,
    createTestRequest,
    updateTestRequestStatus,

    // Test Results
    getTestResults,
    addTestResult,
    updateTestResult,

    // Statistics
    getLabStatistics,
  };
}

// Initialize with mock data for demo
export function initializeLaboratoryData() {
  if (testRequestsStore.length === 0) {
    // Add sample test requests
    const sampleRequests: TestRequest[] = [
      {
        id: "req_001",
        requestNumber: "LAB20241115001",
        patientId: "patient_001",
        patientName: "أحمد محمد علي",
        patientAge: 45,
        patientGender: "male",
        doctorId: "doctor_001",
        doctorName: "د. محمد أحمد",
        department: "Internal Medicine",
        requestDate: new Date().toISOString(),
        priority: "routine",
        status: "pending",
        tests: [
          {
            testId: "test_bc_001",
            testName: "سكر الدم صائم",
            testCode: "FBS",
            category: "biochemistry",
            sampleType: "serum",
            price: 70,
          },
          {
            testId: "test_hm_001",
            testName: "تحليل صورة دم كاملة",
            testCode: "CBC",
            category: "hematology",
            sampleType: "blood",
            price: 150,
          },
        ],
        totalAmount: 220,
        clinicalNotes: "متابعة دورية للسكري",
        createdBy: "nurse_001",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "req_002",
        requestNumber: "LAB20241115002",
        patientId: "patient_002",
        patientName: "فاطمة حسن",
        patientAge: 35,
        patientGender: "female",
        doctorId: "doctor_002",
        doctorName: "د. سارة محمود",
        department: "Gynecology",
        requestDate: new Date().toISOString(),
        priority: "urgent",
        status: "in_progress",
        tests: [
          {
            testId: "test_hr_001",
            testName: "هرمون الغدة الدرقية",
            testCode: "TSH",
            category: "hormones",
            sampleType: "serum",
            price: 180,
          },
        ],
        totalAmount: 180,
        clinicalNotes: "أعراض نشاط الغدة الدرقية",
        sampleCollectedAt: new Date().toISOString(),
        sampleCollectedBy: "nurse_002",
        startedAt: new Date().toISOString(),
        createdBy: "nurse_002",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];

    testRequestsStore = sampleRequests;
  }
}
