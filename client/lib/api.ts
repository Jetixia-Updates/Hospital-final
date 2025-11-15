const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

// ============================================
// API HELPER FUNCTIONS
// ============================================

async function apiRequest<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || `HTTP ${response.status}`);
  }

  return response.json();
}

// ============================================
// PATIENT API
// ============================================

export const patientAPI = {
  getAll: () => apiRequest<any[]>('/patients'),
  getById: (id: string) => apiRequest<any>(`/patients/${id}`),
  search: (query: string) => apiRequest<any[]>(`/patients/search?query=${query}`),
  create: (data: any) => apiRequest<any>('/patients', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: string, data: any) => apiRequest<any>(`/patients/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id: string) => apiRequest<void>(`/patients/${id}`, {
    method: 'DELETE',
  }),
};

// ============================================
// STAFF API
// ============================================

export const staffAPI = {
  getAll: () => apiRequest<any[]>('/staff'),
  getById: (id: string) => apiRequest<any>(`/staff/${id}`),
  getByDepartment: (department: string) => apiRequest<any[]>(`/staff/department/${department}`),
  create: (data: any) => apiRequest<any>('/staff', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: string, data: any) => apiRequest<any>(`/staff/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
};

// ============================================
// PHARMACY API
// ============================================

export const pharmacyAPI = {
  medicines: {
    getAll: () => apiRequest<any[]>('/medicines'),
    getLowStock: () => apiRequest<any[]>('/medicines/low-stock'),
    create: (data: any) => apiRequest<any>('/medicines', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    update: (id: string, data: any) => apiRequest<any>(`/medicines/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  },
  prescriptions: {
    create: (data: any) => apiRequest<any>('/prescriptions', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    getByPatient: (patientId: string) => apiRequest<any[]>(`/prescriptions/patient/${patientId}`),
  },
  dispense: (data: any) => apiRequest<any>('/dispensing', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
};

// ============================================
// APPOINTMENT API
// ============================================

export const appointmentAPI = {
  getAll: () => apiRequest<any[]>('/appointments'),
  getByDate: (date: string) => apiRequest<any[]>(`/appointments/date/${date}`),
  create: (data: any) => apiRequest<any>('/appointments', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: string, data: any) => apiRequest<any>(`/appointments/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
};

// ============================================
// FINANCE API
// ============================================

export const financeAPI = {
  bills: {
    getAll: () => apiRequest<any[]>('/bills'),
    create: (data: any) => apiRequest<any>('/bills', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  },
  payments: {
    add: (data: any) => apiRequest<any>('/payments', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  },
  stats: {
    getRevenue: () => apiRequest<{
      totalRevenue: number;
      monthlyRevenue: number;
      pendingAmount: number;
    }>('/finance/stats'),
  },
};

// ============================================
// LABORATORY API
// ============================================

export const laboratoryAPI = {
  getAll: () => apiRequest<any[]>('/lab-tests'),
  getByPatient: (patientId: string) => apiRequest<any[]>(`/lab-tests/patient/${patientId}`),
  create: (data: any) => apiRequest<any>('/lab-tests', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id: string, data: any) => apiRequest<any>(`/lab-tests/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
};

// ============================================
// SURGERY API (Future)
// ============================================

export const surgeryAPI = {
  getAll: () => apiRequest<any[]>('/surgeries'),
  create: (data: any) => apiRequest<any>('/surgeries', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
};

// ============================================
// INSURANCE API (Future)
// ============================================

export const insuranceAPI = {
  claims: {
    getAll: () => apiRequest<any[]>('/insurance-claims'),
    create: (data: any) => apiRequest<any>('/insurance-claims', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  },
};

// ============================================
// KITCHEN/NUTRITION API (Future)
// ============================================

export const kitchenAPI = {
  meals: {
    getAll: () => apiRequest<any[]>('/meal-orders'),
    create: (data: any) => apiRequest<any>('/meal-orders', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  },
  menu: {
    getAll: () => apiRequest<any[]>('/menu-items'),
    create: (data: any) => apiRequest<any>('/menu-items', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  },
};

// ============================================
// HR API (Future)
// ============================================

export const hrAPI = {
  attendance: {
    getAll: () => apiRequest<any[]>('/attendance'),
    create: (data: any) => apiRequest<any>('/attendance', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  },
  leave: {
    getAll: () => apiRequest<any[]>('/leave-requests'),
    create: (data: any) => apiRequest<any>('/leave-requests', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  },
  payroll: {
    getAll: () => apiRequest<any[]>('/payroll'),
    create: (data: any) => apiRequest<any>('/payroll', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  },
};

// ============================================
// INVENTORY API (Future)
// ============================================

export const inventoryAPI = {
  getAll: () => apiRequest<any[]>('/inventory'),
  create: (data: any) => apiRequest<any>('/inventory', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
};

// ============================================
// MAINTENANCE API (Future)
// ============================================

export const maintenanceAPI = {
  getAll: () => apiRequest<any[]>('/maintenance-requests'),
  create: (data: any) => apiRequest<any>('/maintenance-requests', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
};
