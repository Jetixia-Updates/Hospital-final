import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";

// Patient routes
import {
  getAllPatients,
  getPatientById,
  createPatient,
  updatePatient,
  deletePatient,
  searchPatients
} from "./routes/patients";

// Staff routes
import {
  getAllStaff,
  getStaffById,
  createStaff,
  updateStaff,
  getStaffByDepartment
} from "./routes/staff";

// Pharmacy routes
import {
  getAllMedicines,
  getLowStockMedicines,
  createMedicine,
  updateMedicine,
  createPrescription,
  dispenseMedicine,
  getPrescriptionsByPatient
} from "./routes/pharmacy";

// Appointment routes
import {
  getAllAppointments,
  createAppointment,
  updateAppointment,
  getAppointmentsByDate
} from "./routes/appointments";

// Finance routes
import {
  getAllBills,
  createBill,
  addPayment,
  getRevenueStats
} from "./routes/finance";

// Laboratory routes
import {
  getAllLabTests,
  createLabTest,
  updateLabTest,
  getTestsByPatient
} from "./routes/laboratory";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Health check
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // ============================================
  // PATIENT ROUTES
  // ============================================
  app.get("/api/patients", getAllPatients);
  app.get("/api/patients/search", searchPatients);
  app.get("/api/patients/:id", getPatientById);
  app.post("/api/patients", createPatient);
  app.put("/api/patients/:id", updatePatient);
  app.delete("/api/patients/:id", deletePatient);

  // ============================================
  // STAFF ROUTES
  // ============================================
  app.get("/api/staff", getAllStaff);
  app.get("/api/staff/:id", getStaffById);
  app.get("/api/staff/department/:department", getStaffByDepartment);
  app.post("/api/staff", createStaff);
  app.put("/api/staff/:id", updateStaff);

  // ============================================
  // PHARMACY ROUTES
  // ============================================
  app.get("/api/medicines", getAllMedicines);
  app.get("/api/medicines/low-stock", getLowStockMedicines);
  app.post("/api/medicines", createMedicine);
  app.put("/api/medicines/:id", updateMedicine);
  
  app.post("/api/prescriptions", createPrescription);
  app.get("/api/prescriptions/patient/:patientId", getPrescriptionsByPatient);
  app.post("/api/dispensing", dispenseMedicine);

  // ============================================
  // APPOINTMENT ROUTES
  // ============================================
  app.get("/api/appointments", getAllAppointments);
  app.get("/api/appointments/date/:date", getAppointmentsByDate);
  app.post("/api/appointments", createAppointment);
  app.put("/api/appointments/:id", updateAppointment);

  // ============================================
  // FINANCE ROUTES
  // ============================================
  app.get("/api/bills", getAllBills);
  app.post("/api/bills", createBill);
  app.post("/api/payments", addPayment);
  app.get("/api/finance/stats", getRevenueStats);

  // ============================================
  // LABORATORY ROUTES
  // ============================================
  app.get("/api/lab-tests", getAllLabTests);
  app.get("/api/lab-tests/patient/:patientId", getTestsByPatient);
  app.post("/api/lab-tests", createLabTest);
  app.put("/api/lab-tests/:id", updateLabTest);

  return app;
}
