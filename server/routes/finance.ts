import { RequestHandler } from "express";
import { prisma } from "../lib/prisma";

// Get all bills
export const getAllBills: RequestHandler = async (req, res) => {
  try {
    const bills = await prisma.bill.findMany({
      include: {
        patient: true,
        items: true,
        payments: true
      },
      orderBy: { createdAt: 'desc' },
      take: 100
    });
    res.json(bills);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch bills" });
  }
};

// Create bill
export const createBill: RequestHandler = async (req, res) => {
  try {
    const { patientId, items, discount, tax } = req.body;
    
    const totalAmount = items.reduce((sum: number, item: any) => sum + item.totalPrice, 0);
    const finalAmount = totalAmount - (discount || 0) + (tax || 0);
    
    const bill = await prisma.bill.create({
      data: {
        billNumber: `BILL-${Date.now()}`,
        patientId,
        totalAmount: finalAmount,
        remainingAmount: finalAmount,
        discount,
        tax,
        items: {
          create: items
        }
      },
      include: {
        items: true,
        patient: true
      }
    });
    
    res.status(201).json(bill);
  } catch (error) {
    res.status(500).json({ error: "Failed to create bill" });
  }
};

// Add payment
export const addPayment: RequestHandler = async (req, res) => {
  try {
    const { billId, amount, paymentMethod, receivedBy, transactionId } = req.body;
    
    const payment = await prisma.payment.create({
      data: {
        billId,
        amount,
        paymentMethod,
        receivedBy,
        transactionId
      }
    });
    
    // Update bill
    const bill = await prisma.bill.findUnique({
      where: { id: billId }
    });
    
    if (bill) {
      const newPaidAmount = bill.paidAmount + amount;
      const newRemainingAmount = bill.totalAmount - newPaidAmount;
      
      await prisma.bill.update({
        where: { id: billId },
        data: {
          paidAmount: newPaidAmount,
          remainingAmount: newRemainingAmount,
          status: newRemainingAmount === 0 ? 'paid' : newRemainingAmount < bill.totalAmount ? 'partial' : 'pending'
        }
      });
    }
    
    res.status(201).json(payment);
  } catch (error) {
    res.status(500).json({ error: "Failed to add payment" });
  }
};

// Get revenue stats
export const getRevenueStats: RequestHandler = async (req, res) => {
  try {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    
    const totalRevenue = await prisma.bill.aggregate({
      _sum: {
        paidAmount: true
      }
    });
    
    const monthlyRevenue = await prisma.bill.aggregate({
      where: {
        billDate: {
          gte: startOfMonth
        }
      },
      _sum: {
        paidAmount: true
      }
    });
    
    const pendingAmount = await prisma.bill.aggregate({
      where: {
        status: {
          in: ['pending', 'partial']
        }
      },
      _sum: {
        remainingAmount: true
      }
    });
    
    res.json({
      totalRevenue: totalRevenue._sum.paidAmount || 0,
      monthlyRevenue: monthlyRevenue._sum.paidAmount || 0,
      pendingAmount: pendingAmount._sum.remainingAmount || 0
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch revenue stats" });
  }
};
