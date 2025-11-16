import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";
import { usePatientBilling } from "@/hooks/use-patient-billing";
import {
  InventoryItem,
  StockRequest,
  StockTransfer,
  DispensingRecord,
  RequestItem,
  ItemCategory,
  RequestUrgency,
  UnitType,
} from "@shared/warehouse";

// In-memory storage for demonstration (replace with API calls in production)
let inventoryStorage: InventoryItem[] = [];
let requestsStorage: StockRequest[] = [];
let transfersStorage: StockTransfer[] = [];
let dispensingStorage: DispensingRecord[] = [];

/**
 * Warehouse Management Hook
 * Handles inventory, stock requests, transfers, and dispensing
 * Automatically integrates with billing system for patient-related dispensing
 */
export function useWarehouse() {
  const { toast } = useToast();
  const { t } = useTranslation();
  const { addServiceToBilling } = usePatientBilling();

  // ==================== Inventory Management ====================

  /**
   * Get all inventory items
   */
  const getInventoryItems = (filters?: {
    category?: ItemCategory;
    status?: string;
    location?: string;
    searchTerm?: string;
  }): InventoryItem[] => {
    let items = [...inventoryStorage];

    if (filters?.category) {
      items = items.filter((item) => item.category === filters.category);
    }

    if (filters?.status) {
      items = items.filter((item) => item.status === filters.status);
    }

    if (filters?.location) {
      items = items.filter((item) => item.location === filters.location);
    }

    if (filters?.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      items = items.filter(
        (item) =>
          item.name.toLowerCase().includes(term) ||
          item.nameAr.includes(term) ||
          item.nameEn.toLowerCase().includes(term) ||
          item.barcode?.includes(term)
      );
    }

    return items;
  };

  /**
   * Get single inventory item
   */
  const getInventoryItem = (itemId: string): InventoryItem | undefined => {
    return inventoryStorage.find((item) => item.id === itemId);
  };

  /**
   * Update inventory stock level
   */
  const updateStock = (
    itemId: string,
    quantity: number,
    operation: "increase" | "decrease"
  ): InventoryItem | null => {
    const itemIndex = inventoryStorage.findIndex((item) => item.id === itemId);
    if (itemIndex === -1) return null;

    const item = inventoryStorage[itemIndex];
    const newStock =
      operation === "increase"
        ? item.currentStock + quantity
        : item.currentStock - quantity;

    if (newStock < 0) {
      toast({
        title: t("warehouse.error", "خطأ"),
        description: t("warehouse.insufficientStock", "المخزون غير كافي"),
        variant: "destructive",
      });
      return null;
    }

    // Update stock
    item.currentStock = newStock;
    item.totalValue = newStock * item.unitPrice;
    item.updatedAt = new Date().toISOString();

    // Update status based on stock levels
    if (newStock === 0) {
      item.status = "outOfStock";
    } else if (newStock <= item.minimumStock) {
      item.status = "lowStock";
    } else {
      item.status = "inStock";
    }

    inventoryStorage[itemIndex] = item;

    // Show alert if low stock
    if (item.status === "lowStock") {
      toast({
        title: t("warehouse.lowStockAlert"),
        description: `${item.name} - ${t("warehouse.currentStock")}: ${newStock} ${t(`warehouse.${item.unit}`)}`,
        variant: "destructive",
      });
    } else if (item.status === "outOfStock") {
      toast({
        title: t("warehouse.outOfStockAlert"),
        description: `${item.name} - ${t("warehouse.needsReorder")}`,
        variant: "destructive",
      });
    }

    return item;
  };

  // ==================== Stock Request Management ====================

  /**
   * Create a new stock request
   */
  const createStockRequest = (input: {
    requestedBy: string;
    requestedByName: string;
    department: string;
    departmentName: string;
    items: RequestItem[];
    urgency?: RequestUrgency;
    patientId?: string;
    patientName?: string;
    notes?: string;
  }): StockRequest => {
    const now = new Date().toISOString();
    const requestNumber = `REQ-${Date.now()}`;

    const newRequest: StockRequest = {
      id: `req_${Date.now()}`,
      requestNumber,
      requestDate: now,
      requestedBy: input.requestedBy,
      requestedByName: input.requestedByName,
      department: input.department,
      departmentName: input.departmentName,
      items: input.items.map((item) => ({
        ...item,
        dispensedQuantity: 0,
      })),
      totalItems: input.items.length,
      urgency: input.urgency || "normal",
      status: "pending",
      patientId: input.patientId,
      patientName: input.patientName,
      notes: input.notes,
      createdAt: now,
      updatedAt: now,
    };

    requestsStorage.push(newRequest);

    toast({
      title: t("warehouse.requestCreated", "تم إنشاء الطلب"),
      description: `${requestNumber} - ${input.items.length} ${t("warehouse.items")}`,
    });

    return newRequest;
  };

  /**
   * Approve a stock request
   */
  const approveRequest = (
    requestId: string,
    approvedBy: string,
    notes?: string
  ): StockRequest | null => {
    const requestIndex = requestsStorage.findIndex((r) => r.id === requestId);
    if (requestIndex === -1) return null;

    const request = requestsStorage[requestIndex];
    request.status = "approved";
    request.approvedBy = approvedBy;
    request.approvedDate = new Date().toISOString();
    request.approvalNotes = notes;
    request.updatedAt = new Date().toISOString();

    requestsStorage[requestIndex] = request;

    toast({
      title: t("warehouse.requestApproved"),
      description: request.requestNumber,
    });

    return request;
  };

  /**
   * Dispense items (fulfill stock request)
   * Automatically adds to patient billing if patientId is provided
   */
  const dispenseItems = (
    requestId: string,
    dispensedBy: string,
    dispensedByName: string,
    itemsToDispense: { itemId: string; quantity: number }[]
  ): {
    success: boolean;
    dispensingRecords: DispensingRecord[];
    billingAdded: boolean;
  } => {
    const request = requestsStorage.find((r) => r.id === requestId);
    if (!request) {
      toast({
        title: t("common.error", "خطأ"),
        description: t("warehouse.requestNotFound", "الطلب غير موجود"),
        variant: "destructive",
      });
      return { success: false, dispensingRecords: [], billingAdded: false };
    }

    const dispensingRecords: DispensingRecord[] = [];
    let billingAdded = false;

    // Process each item
    for (const itemToDispense of itemsToDispense) {
      const requestItem = request.items.find(
        (i) => i.itemId === itemToDispense.itemId
      );
      if (!requestItem) continue;

      const inventoryItem = getInventoryItem(itemToDispense.itemId);
      if (!inventoryItem) continue;

      // Check if we have enough stock
      if (inventoryItem.currentStock < itemToDispense.quantity) {
        toast({
          title: t("warehouse.insufficientStock", "المخزون غير كافي"),
          description: `${inventoryItem.name} - ${t("warehouse.available")}: ${inventoryItem.currentStock}`,
          variant: "destructive",
        });
        continue;
      }

      // Decrease stock
      const updatedItem = updateStock(
        itemToDispense.itemId,
        itemToDispense.quantity,
        "decrease"
      );
      if (!updatedItem) continue;

      // Update request item
      requestItem.dispensedQuantity += itemToDispense.quantity;
      requestItem.availableQuantity = inventoryItem.currentStock;

      // Create dispensing record
      const dispensingRecord: DispensingRecord = {
        id: `disp_${Date.now()}_${itemToDispense.itemId}`,
        dispensingNumber: `DISP-${Date.now()}`,
        dispensingDate: new Date().toISOString(),
        requestId: request.id,
        itemId: itemToDispense.itemId,
        itemName: inventoryItem.name,
        quantity: itemToDispense.quantity,
        unit: inventoryItem.unit,
        unitPrice: inventoryItem.unitPrice,
        totalAmount: itemToDispense.quantity * inventoryItem.unitPrice,
        dispensedTo: request.requestedBy,
        dispensedToName: request.requestedByName,
        department: request.department,
        dispensedBy,
        dispensedByName,
        patientId: request.patientId,
        patientName: request.patientName,
        batchNumber: inventoryItem.batchNumber,
        expiryDate: inventoryItem.expiryDate,
        addedToBilling: false,
        createdAt: new Date().toISOString(),
      };

      // Add to patient billing if patient info is available
      if (request.patientId && request.patientName) {
        try {
          const billingService = addServiceToBilling({
            patientId: request.patientId,
            patientName: request.patientName,
            type: getCategoryServiceType(inventoryItem.category),
            name: inventoryItem.name,
            department: request.departmentName,
            provider: request.departmentName,
            quantity: itemToDispense.quantity,
            unitPrice: inventoryItem.unitPrice,
            notes: `${t("warehouse.itemDispensed")} - ${request.requestNumber}`,
          });

          if (billingService) {
            dispensingRecord.addedToBilling = true;
            dispensingRecord.billingServiceId = billingService.id;
            billingAdded = true;
          }
        } catch (error) {
          console.error("Failed to add to billing:", error);
        }
      }

      dispensingStorage.push(dispensingRecord);
      dispensingRecords.push(dispensingRecord);
    }

    // Update request status
    const allFulfilled = request.items.every(
      (item) => item.dispensedQuantity >= item.requestedQuantity
    );
    const anyFulfilled = request.items.some((item) => item.dispensedQuantity > 0);

    if (allFulfilled) {
      request.status = "fulfilled";
    } else if (anyFulfilled) {
      request.status = "partiallyFulfilled";
    }

    request.fulfilledBy = dispensedBy;
    request.fulfilledDate = new Date().toISOString();
    request.updatedAt = new Date().toISOString();

    toast({
      title: t("warehouse.itemDispensed"),
      description: `${dispensingRecords.length} ${t("warehouse.items")}${
        billingAdded ? ` - ${t("warehouse.addedToBilling")}` : ""
      }`,
    });

    return { success: true, dispensingRecords, billingAdded };
  };

  /**
   * Get all stock requests
   */
  const getStockRequests = (filters?: {
    department?: string;
    status?: string;
    urgency?: string;
    patientId?: string;
  }): StockRequest[] => {
    let requests = [...requestsStorage];

    if (filters?.department) {
      requests = requests.filter((r) => r.department === filters.department);
    }

    if (filters?.status) {
      requests = requests.filter((r) => r.status === filters.status);
    }

    if (filters?.urgency) {
      requests = requests.filter((r) => r.urgency === filters.urgency);
    }

    if (filters?.patientId) {
      requests = requests.filter((r) => r.patientId === filters.patientId);
    }

    return requests.sort(
      (a, b) =>
        new Date(b.requestDate).getTime() - new Date(a.requestDate).getTime()
    );
  };

  /**
   * Get dispensing records
   */
  const getDispensingRecords = (filters?: {
    patientId?: string;
    department?: string;
    itemId?: string;
    dateFrom?: string;
    dateTo?: string;
  }): DispensingRecord[] => {
    let records = [...dispensingStorage];

    if (filters?.patientId) {
      records = records.filter((r) => r.patientId === filters.patientId);
    }

    if (filters?.department) {
      records = records.filter((r) => r.department === filters.department);
    }

    if (filters?.itemId) {
      records = records.filter((r) => r.itemId === filters.itemId);
    }

    return records.sort(
      (a, b) =>
        new Date(b.dispensingDate).getTime() -
        new Date(a.dispensingDate).getTime()
    );
  };

  // ==================== Helper Functions ====================

  /**
   * Map item category to billing service type
   */
  const getCategoryServiceType = (category: ItemCategory): any => {
    const mapping: Record<ItemCategory, string> = {
      medical_equipment: "therapy",
      surgical_instruments: "surgery",
      medications: "medication",
      consumables: "consultation",
      laboratory: "laboratory",
      radiology: "radiology",
      cleaning: "accommodation",
      office: "consultation",
      nutrition: "accommodation",
      ppe: "consultation",
    };
    return mapping[category] || "consultation";
  };

  /**
   * Quick dispense for common scenarios
   */
  const quickDispense = (input: {
    itemId: string;
    quantity: number;
    department: string;
    departmentName: string;
    dispensedBy: string;
    dispensedByName: string;
    patientId?: string;
    patientName?: string;
    urgency?: RequestUrgency;
  }) => {
    // Create request
    const item = getInventoryItem(input.itemId);
    if (!item) return null;

    const request = createStockRequest({
      requestedBy: input.dispensedBy,
      requestedByName: input.dispensedByName,
      department: input.department,
      departmentName: input.departmentName,
      items: [
        {
          itemId: input.itemId,
          itemName: item.name,
          requestedQuantity: input.quantity,
          availableQuantity: item.currentStock,
          dispensedQuantity: 0,
          unitPrice: item.unitPrice,
          unit: item.unit,
        },
      ],
      urgency: input.urgency || "normal",
      patientId: input.patientId,
      patientName: input.patientName,
    });

    // Auto-approve
    approveRequest(request.id, input.dispensedBy);

    // Dispense immediately
    const result = dispenseItems(request.id, input.dispensedBy, input.dispensedByName, [
      { itemId: input.itemId, quantity: input.quantity },
    ]);

    return result;
  };

  // Export storage for direct access if needed
  const getStorage = () => ({
    inventory: inventoryStorage,
    requests: requestsStorage,
    transfers: transfersStorage,
    dispensing: dispensingStorage,
  });

  return {
    // Inventory
    getInventoryItems,
    getInventoryItem,
    updateStock,

    // Requests
    createStockRequest,
    approveRequest,
    getStockRequests,

    // Dispensing
    dispenseItems,
    getDispensingRecords,
    quickDispense,

    // Storage
    getStorage,
  };
}

// Export storage setters for initialization
export const initializeWarehouseData = (data: {
  inventory?: InventoryItem[];
  requests?: StockRequest[];
  transfers?: StockTransfer[];
  dispensing?: DispensingRecord[];
}) => {
  if (data.inventory) inventoryStorage = data.inventory;
  if (data.requests) requestsStorage = data.requests;
  if (data.transfers) transfersStorage = data.transfers;
  if (data.dispensing) dispensingStorage = data.dispensing;
};
