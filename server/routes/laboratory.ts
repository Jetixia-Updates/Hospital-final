import { RequestHandler } from "express";
import { prisma } from "../lib/prisma";

// Get all lab tests
export const getAllLabTests: RequestHandler = async (req, res) => {
  try {
    const tests = await prisma.labTest.findMany({
      include: {
        patient: true
      },
      orderBy: { orderedDate: 'desc' },
      take: 100
    });
    res.json(tests);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch lab tests" });
  }
};

// Create lab test
export const createLabTest: RequestHandler = async (req, res) => {
  try {
    const test = await prisma.labTest.create({
      data: {
        ...req.body,
        testNumber: `LAB-${Date.now()}`
      },
      include: {
        patient: true
      }
    });
    res.status(201).json(test);
  } catch (error) {
    res.status(500).json({ error: "Failed to create lab test" });
  }
};

// Update lab test
export const updateLabTest: RequestHandler = async (req, res) => {
  try {
    const test = await prisma.labTest.update({
      where: { id: req.params.id },
      data: req.body
    });
    res.json(test);
  } catch (error) {
    res.status(500).json({ error: "Failed to update lab test" });
  }
};

// Get tests by patient
export const getTestsByPatient: RequestHandler = async (req, res) => {
  try {
    const tests = await prisma.labTest.findMany({
      where: { patientId: req.params.patientId },
      orderBy: { orderedDate: 'desc' }
    });
    res.json(tests);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tests" });
  }
};
