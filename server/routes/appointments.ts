import { RequestHandler } from "express";
import { prisma } from "../lib/prisma";

// Get all appointments
export const getAllAppointments: RequestHandler = async (req, res) => {
  try {
    const appointments = await prisma.appointment.findMany({
      include: {
        patient: true,
        doctor: true
      },
      orderBy: { appointmentDate: 'desc' },
      take: 100
    });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch appointments" });
  }
};

// Create appointment
export const createAppointment: RequestHandler = async (req, res) => {
  try {
    const appointment = await prisma.appointment.create({
      data: req.body,
      include: {
        patient: true,
        doctor: true
      }
    });
    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ error: "Failed to create appointment" });
  }
};

// Update appointment
export const updateAppointment: RequestHandler = async (req, res) => {
  try {
    const appointment = await prisma.appointment.update({
      where: { id: req.params.id },
      data: req.body
    });
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ error: "Failed to update appointment" });
  }
};

// Get appointments by date
export const getAppointmentsByDate: RequestHandler = async (req, res) => {
  try {
    const { date } = req.params;
    const appointments = await prisma.appointment.findMany({
      where: {
        appointmentDate: new Date(date)
      },
      include: {
        patient: true,
        doctor: true
      }
    });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch appointments" });
  }
};
