/**
 * Warehouse Management System Types
 * Shared types for warehouse, inventory, and supply management
 */

// ==================== Inventory Item ====================
export type ItemCategory =
  | "medical_equipment"
  | "surgical_instruments"
  | "medications"
  | "consumables"
  | "laboratory"
  | "radiology"
  | "cleaning"
  | "office"
  | "nutrition"
  | "ppe";

export type ItemStatus = "inStock" | "lowStock" | "outOfStock";

export type StorageCondition = "roomTemperature" | "refrigerated" | "frozen" | "controlled";

export type UnitType = "unit" | "box" | "pack" | "bottle" | "piece" | "set" | "roll" | "kg" | "liter" | "meter";

export interface InventoryItem {
  id: string;
  name: string;
  nameAr: string;
  nameEn: string;
  category: ItemCategory;
  barcode?: string;
  serialNumber?: string;
  currentStock: number;
  minimumStock: number;
  maximumStock: number;
  reorderLevel: number;
  reorderQuantity: number;
  unit: UnitType;
  unitPrice: number;
  totalValue: number;
  location: string;
  warehouse: string;
  status: ItemStatus;
  manufacturer?: string;
  batchNumber?: string;
  expiryDate?: string;
  storageConditions: StorageCondition;
  leadTime: number; // in days
  lastRestocked?: string;
  createdAt: string;
  updatedAt: string;
}

// ==================== Stock Request ====================
export type RequestUrgency = "normal" | "urgent" | "emergency";

export type RequestStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "partiallyFulfilled"
  | "fulfilled"
  | "cancelled";

export interface RequestItem {
  itemId: string;
  itemName: string;
  requestedQuantity: number;
  availableQuantity: number;
  dispensedQuantity: number;
  unitPrice: number;
  unit: UnitType;
  notes?: string;
}

export interface StockRequest {
  id: string;
  requestNumber: string;
  requestDate: string;
  requestedBy: string;
  requestedByName: string;
  department: string;
  departmentName: string;
  items: RequestItem[];
  totalItems: number;
  urgency: RequestUrgency;
  status: RequestStatus;
  approvedBy?: string;
  approvedDate?: string;
  approvalNotes?: string;
  fulfilledBy?: string;
  fulfilledDate?: string;
  notes?: string;
  patientId?: string; // If related to patient
  patientName?: string;
  createdAt: string;
  updatedAt: string;
}

// ==================== Stock Transfer ====================
export type TransferStatus = "initiated" | "inProgress" | "completed" | "cancelled";

export interface TransferItem {
  itemId: string;
  itemName: string;
  quantity: number;
  unit: UnitType;
  unitPrice: number;
  batchNumber?: string;
  expiryDate?: string;
}

export interface StockTransfer {
  id: string;
  transferNumber: string;
  transferDate: string;
  fromWarehouse: string;
  toWarehouse: string;
  fromDepartment?: string;
  toDepartment?: string;
  items: TransferItem[];
  totalItems: number;
  transferredBy: string;
  transferredByName: string;
  receivedBy?: string;
  receivedByName?: string;
  receivedDate?: string;
  status: TransferStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// ==================== Stock Adjustment ====================
export type AdjustmentType =
  | "increase"
  | "decrease"
  | "damage"
  | "expiry"
  | "loss"
  | "found"
  | "return"
  | "correction";

export interface StockAdjustment {
  id: string;
  adjustmentNumber: string;
  adjustmentDate: string;
  itemId: string;
  itemName: string;
  adjustmentType: AdjustmentType;
  quantity: number;
  unit: UnitType;
  previousStock: number;
  newStock: number;
  reason: string;
  adjustedBy: string;
  adjustedByName: string;
  batchNumber?: string;
  notes?: string;
  createdAt: string;
}

// ==================== Supplier ====================
export type SupplierStatus = "active" | "inactive";

export interface Supplier {
  id: string;
  name: string;
  contactPerson: string;
  phone: string;
  email: string;
  address: string;
  suppliedCategories: ItemCategory[];
  suppliedItems: string[]; // Item IDs
  totalOrders: number;
  totalValue: number;
  lastOrderDate?: string;
  rating: number; // 1-5
  status: SupplierStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// ==================== Purchase Order ====================
export type PurchaseOrderStatus =
  | "draft"
  | "submitted"
  | "approved"
  | "confirmed"
  | "shipped"
  | "delivered"
  | "received"
  | "closed"
  | "cancelled";

export interface PurchaseOrderItem {
  itemId: string;
  itemName: string;
  orderedQuantity: number;
  receivedQuantity: number;
  unit: UnitType;
  unitCost: number;
  totalCost: number;
  batchNumber?: string;
  expiryDate?: string;
}

export interface PurchaseOrder {
  id: string;
  poNumber: string;
  orderDate: string;
  supplierId: string;
  supplierName: string;
  items: PurchaseOrderItem[];
  totalItems: number;
  totalCost: number;
  expectedDelivery: string;
  actualDelivery?: string;
  warehouse: string;
  orderedBy: string;
  orderedByName: string;
  approvedBy?: string;
  approvedDate?: string;
  receivedBy?: string;
  receivedDate?: string;
  status: PurchaseOrderStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// ==================== Stock Audit ====================
export type AuditStatus = "scheduled" | "inProgress" | "completed" | "verified" | "discrepancy";

export interface AuditItem {
  itemId: string;
  itemName: string;
  systemCount: number;
  physicalCount: number;
  variance: number;
  unit: UnitType;
  notes?: string;
}

export interface StockAudit {
  id: string;
  auditNumber: string;
  auditDate: string;
  warehouse: string;
  department?: string;
  items: AuditItem[];
  totalVariance: number;
  auditedBy: string;
  auditedByName: string;
  verifiedBy?: string;
  verifiedDate?: string;
  status: AuditStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// ==================== Warehouse Statistics ====================
export interface WarehouseStats {
  totalItems: number;
  totalValue: number;
  lowStockItems: number;
  outOfStockItems: number;
  expiringItems30Days: number;
  expiringItems60Days: number;
  expiringItems90Days: number;
  pendingRequests: number;
  activeTransfers: number;
  monthlyConsumptionValue: number;
  stockTurnoverRate: number;
}

// ==================== Dispensing Record ====================
export interface DispensingRecord {
  id: string;
  dispensingNumber: string;
  dispensingDate: string;
  requestId: string;
  itemId: string;
  itemName: string;
  quantity: number;
  unit: UnitType;
  unitPrice: number;
  totalAmount: number;
  dispensedTo: string;
  dispensedToName: string;
  department: string;
  dispensedBy: string;
  dispensedByName: string;
  patientId?: string;
  patientName?: string;
  batchNumber?: string;
  expiryDate?: string;
  addedToBilling: boolean;
  billingServiceId?: string;
  notes?: string;
  createdAt: string;
}
