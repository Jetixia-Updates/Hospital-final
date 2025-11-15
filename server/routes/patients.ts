import { RequestHandler } from "express";
import { prisma } from "../lib/prisma";

// Get all patients
export const getAllPatients: RequestHandler = async (req, res) => {
  try {
    const patients = await prisma.patient.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100
    });
    res.json(patients);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch patients" });
  }
};

// Get patient by ID
export const getPatientById: RequestHandler = async (req, res) => {
  try {
    const patient = await prisma.patient.findUnique({
      where: { id: req.params.id },
      include: {
        appointments: true,
        medicalRecords: true,
        prescriptions: true,
        labTests: true,
        surgeries: true,
        bills: true,
        insuranceClaims: true,
        meals: true
      }
    });
    
    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }
    
    res.json(patient);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch patient" });
  }
};

// Create patient
export const createPatient: RequestHandler = async (req, res) => {
  try {
    const patient = await prisma.patient.create({
      data: req.body
    });
    res.status(201).json(patient);
  } catch (error) {
    res.status(500).json({ error: "Failed to create patient" });
  }
};

// Update patient
export const updatePatient: RequestHandler = async (req, res) => {
  try {
    const patient = await prisma.patient.update({
      where: { id: req.params.id },
      data: req.body
    });
    res.json(patient);
  } catch (error) {
    res.status(500).json({ error: "Failed to update patient" });
  }
};

// Delete patient
export const deletePatient: RequestHandler = async (req, res) => {
  try {
    await prisma.patient.delete({
      where: { id: req.params.id }
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete patient" });
  }
};

// Search patients
export const searchPatients: RequestHandler = async (req, res) => {
  try {
    const { query } = req.query;
    const patients = await prisma.patient.findMany({
      where: {
        OR: [
          { firstName: { contains: query as string, mode: 'insensitive' } },
          { lastName: { contains: query as string, mode: 'insensitive' } },
          { mrn: { contains: query as string, mode: 'insensitive' } },
          { nationalId: { contains: query as string, mode: 'insensitive' } }
        ]
      },
      take: 50
    });
    res.json(patients);
  } catch (error) {
    res.status(500).json({ error: "Failed to search patients" });
  }
};
