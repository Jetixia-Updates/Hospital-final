import { RequestHandler } from "express";
import { prisma } from "../lib/prisma";

// Get all medicines
export const getAllMedicines: RequestHandler = async (req, res) => {
  try {
    const medicines = await prisma.medicine.findMany({
      orderBy: { name: 'asc' }
    });
    res.json(medicines);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch medicines" });
  }
};

// Get low stock medicines
export const getLowStockMedicines: RequestHandler = async (req, res) => {
  try {
    const medicines = await prisma.medicine.findMany({
      where: {
        quantity: {
          lte: prisma.medicine.fields.reorderLevel
        }
      }
    });
    res.json(medicines);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch low stock medicines" });
  }
};

// Create medicine
export const createMedicine: RequestHandler = async (req, res) => {
  try {
    const medicine = await prisma.medicine.create({
      data: req.body
    });
    res.status(201).json(medicine);
  } catch (error) {
    res.status(500).json({ error: "Failed to create medicine" });
  }
};

// Update medicine
export const updateMedicine: RequestHandler = async (req, res) => {
  try {
    const medicine = await prisma.medicine.update({
      where: { id: req.params.id },
      data: req.body
    });
    res.json(medicine);
  } catch (error) {
    res.status(500).json({ error: "Failed to update medicine" });
  }
};

// Create prescription
export const createPrescription: RequestHandler = async (req, res) => {
  try {
    const { patientId, doctorId, notes, items } = req.body;
    
    const prescription = await prisma.prescription.create({
      data: {
        prescriptionNumber: `RX-${Date.now()}`,
        patientId,
        doctorId,
        notes,
        items: {
          create: items
        }
      },
      include: {
        items: {
          include: {
            medicine: true
          }
        }
      }
    });
    
    res.status(201).json(prescription);
  } catch (error) {
    res.status(500).json({ error: "Failed to create prescription" });
  }
};

// Dispense medicine
export const dispenseMedicine: RequestHandler = async (req, res) => {
  try {
    const { prescriptionId, medicineId, patientId, quantityDispensed, dispensedBy, insuranceCovered, copayAmount } = req.body;
    
    // Create dispensing record
    const dispensing = await prisma.dispensingRecord.create({
      data: {
        prescriptionId,
        medicineId,
        patientId,
        quantityDispensed,
        dispensedBy,
        insuranceCovered,
        copayAmount
      }
    });
    
    // Update medicine quantity
    await prisma.medicine.update({
      where: { id: medicineId },
      data: {
        quantity: {
          decrement: quantityDispensed
        }
      }
    });
    
    // Update prescription status
    await prisma.prescription.update({
      where: { id: prescriptionId },
      data: { status: 'dispensed' }
    });
    
    res.status(201).json(dispensing);
  } catch (error) {
    res.status(500).json({ error: "Failed to dispense medicine" });
  }
};

// Get prescriptions by patient
export const getPrescriptionsByPatient: RequestHandler = async (req, res) => {
  try {
    const prescriptions = await prisma.prescription.findMany({
      where: { patientId: req.params.patientId },
      include: {
        items: {
          include: {
            medicine: true
          }
        },
        doctor: true
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(prescriptions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch prescriptions" });
  }
};
