import { RequestHandler } from "express";
import { prisma } from "../lib/prisma";

// Get all staff
export const getAllStaff: RequestHandler = async (req, res) => {
  try {
    const staff = await prisma.staff.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(staff);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch staff" });
  }
};

// Get staff by ID
export const getStaffById: RequestHandler = async (req, res) => {
  try {
    const staff = await prisma.staff.findUnique({
      where: { id: req.params.id },
      include: {
        appointments: true,
        medicalRecords: true,
        prescriptions: true,
        surgeries: true,
        attendance: true,
        leaveRequests: true,
        payrolls: true
      }
    });
    
    if (!staff) {
      return res.status(404).json({ error: "Staff not found" });
    }
    
    res.json(staff);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch staff" });
  }
};

// Create staff
export const createStaff: RequestHandler = async (req, res) => {
  try {
    const staff = await prisma.staff.create({
      data: req.body
    });
    res.status(201).json(staff);
  } catch (error) {
    res.status(500).json({ error: "Failed to create staff" });
  }
};

// Update staff
export const updateStaff: RequestHandler = async (req, res) => {
  try {
    const staff = await prisma.staff.update({
      where: { id: req.params.id },
      data: req.body
    });
    res.json(staff);
  } catch (error) {
    res.status(500).json({ error: "Failed to update staff" });
  }
};

// Get staff by department
export const getStaffByDepartment: RequestHandler = async (req, res) => {
  try {
    const staff = await prisma.staff.findMany({
      where: { department: req.params.department }
    });
    res.json(staff);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch staff" });
  }
};
