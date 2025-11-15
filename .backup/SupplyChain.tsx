import Layout from "@/components/Layout";
import {
  Search,
  Package,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Plus,
  Filter,
  Truck,
  AlertTriangle,
  ArrowRight,
  Barcode,
} from "lucide-react";
import { useState } from "react";

const SupplierCard = ({
  name,
  category,
  contact,
  email,
  phone,
  rating,
  activeOrders,
  status,
}: {
  name: string;
  category: string;
  contact: string;
  email: string;
  phone: string;
  rating: number;
  activeOrders: number;
  status: "active" | "inactive" | "blacklisted";
}) => {
  const statusConfig = {
    active: { bg: "bg-green-50", badge: "Active", color: "text-green-700" },
    inactive: { bg: "bg-slate-50", badge: "Inactive", color: "text-slate-700" },
    blacklisted: { bg: "bg-red-50", badge: "Blacklisted", color: "text-red-700" },
  };

  const config = statusConfig[status];

  return (
    <div className={`${config.bg} rounded-lg border border-slate-200 p-6 hover:shadow-md transition-shadow`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{name}</h3>
          <p className="text-sm text-slate-500">{category}</p>
        </div>
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              className={`text-lg ${
                i < Math.floor(rating) ? "text-yellow-400" : "text-slate-300"
              }`}
            >
              ★
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-2 text-sm text-slate-600 mb-4">
        <div className="flex items-center justify-between">
          <span>Contact Person:</span>
          <span className="font-medium text-slate-900">{contact}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Email:</span>
          <span className="font-medium text-slate-900 text-xs">{email}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Phone:</span>
          <span className="font-medium text-slate-900">{phone}</span>
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-slate-300">
          <span>Active Orders:</span>
          <span className="font-bold text-blue-600">{activeOrders}</span>
        </div>
      </div>

      <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full bg-white border ${config.color} border-current mb-4`}>
        {config.badge}
      </span>

      <button className="w-full bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-2">
        View Profile <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};

const PurchaseOrderCard = ({
  poNumber,
  supplier,
  orderDate,
  dueDate,
  total,
  status,
  items,
  recipient,
}: {
  poNumber: string;
  supplier: string;
  orderDate: string;
  dueDate: string;
  total: number;
  status: "pending" | "ordered" | "received" | "invoiced";
  items: number;
  recipient: string;
}) => {
  const statusConfig = {
    pending: { bg: "bg-slate-50", badge: "Pending", color: "text-slate-700" },
    ordered: { bg: "bg-blue-50", badge: "Ordered", color: "text-blue-700" },
    received: { bg: "bg-green-50", badge: "Received", color: "text-green-700" },
    invoiced: { bg: "bg-purple-50", badge: "Invoiced", color: "text-purple-700" },
  };

  const config = statusConfig[status];

  return (
    <div className={`${config.bg} rounded-lg border border-slate-200 p-6 hover:shadow-md transition-shadow`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{supplier}</h3>
          <p className="text-sm text-slate-500">PO #{poNumber}</p>
        </div>
        <span className={`text-xs font-semibold px-3 py-1 rounded-full bg-white border ${config.color} border-current`}>
          {config.badge}
        </span>
      </div>

      <div className="space-y-2 text-sm text-slate-600 mb-4">
        <div className="flex items-center justify-between">
          <span>Items:</span>
          <span className="font-medium text-slate-900">{items}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Total Amount:</span>
          <span className="font-bold text-slate-900">SAR {total.toLocaleString()}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Recipient:</span>
          <span className="font-medium text-slate-900">{recipient}</span>
        </div>
        <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-300">
          <div>
            <p className="text-xs text-slate-500">Order Date</p>
            <p className="font-medium text-slate-900">{orderDate}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500">Due Date</p>
            <p className="font-medium text-slate-900">{dueDate}</p>
          </div>
        </div>
      </div>

      <button className="w-full bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-2">
        View Order <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};

const InventoryItem = ({
  item,
  quantity,
  minLevel,
  maxLevel,
  location,
  lastReceived,
  supplier,
}: {
  item: string;
  quantity: number;
  minLevel: number;
  maxLevel: number;
  location: string;
  lastReceived: string;
  supplier: string;
}) => {
  const isLow = quantity <= minLevel;
  const isFull = quantity >= maxLevel;
  const utilizationPercent = Math.round((quantity / maxLevel) * 100);

  return (
    <div className="border border-slate-200 rounded-lg p-4 mb-4">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="font-semibold text-slate-900">{item}</h4>
          <p className="text-xs text-slate-500">{supplier}</p>
        </div>
        {isLow && (
          <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0" />
        )}
      </div>

      <div className="grid grid-cols-3 gap-4 text-sm mb-3">
        <div>
          <p className="text-slate-600">Current</p>
          <p className="font-bold text-slate-900">{quantity} units</p>
        </div>
        <div>
          <p className="text-slate-600">Min Level</p>
          <p className="font-medium text-slate-900">{minLevel}</p>
        </div>
        <div>
          <p className="text-slate-600">Max Level</p>
          <p className="font-medium text-slate-900">{maxLevel}</p>
        </div>
      </div>

      <div className="w-full bg-slate-200 rounded-full h-2 mb-2">
        <div
          className={`h-2 rounded-full transition-all ${
            isLow
              ? "bg-red-600"
              : isFull
              ? "bg-green-600"
              : "bg-blue-600"
          }`}
          style={{ width: `${utilizationPercent}%` }}
        ></div>
      </div>

      <div className="flex items-center justify-between text-xs text-slate-600">
        <span>{location}</span>
        <span>Last received: {lastReceived}</span>
      </div>
    </div>
  );
};

export default function SupplyChain() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("suppliers");

  const suppliers = [
    {
      name: "MedSupply Global",
      category: "Medical Equipment",
      contact: "Ahmad Al-Zahrani",
      email: "contact@medsupply.com",
      phone: "+966 11 123 4567",
      rating: 4.5,
      activeOrders: 5,
      status: "active" as const,
    },
    {
      name: "Pharma Distributors Inc",
      category: "Pharmaceuticals",
      contact: "Fatima Al-Dosari",
      email: "orders@pharmadist.com",
      phone: "+966 11 234 5678",
      rating: 4.8,
      activeOrders: 8,
      status: "active" as const,
    },
    {
      name: "Hospital Supplies Co",
      category: "General Supplies",
      contact: "Mohammed Al-Harbi",
      email: "support@hospsupply.com",
      phone: "+966 11 345 6789",
      rating: 4.2,
      activeOrders: 3,
      status: "active" as const,
    },
    {
      name: "Bio-Labs Equipment",
      category: "Laboratory Equipment",
      contact: "Noor Al-Otaibi",
      email: "sales@biolabs.com",
      phone: "+966 11 456 7890",
      rating: 4.6,
      activeOrders: 2,
      status: "active" as const,
    },
  ];

  const purchaseOrders = [
    {
      poNumber: "PO-2024-001",
      supplier: "MedSupply Global",
      orderDate: "Jan 15, 2024",
      dueDate: "Jan 25, 2024",
      total: 45000,
      status: "ordered" as const,
      items: 12,
      recipient: "Orthopedics Department",
    },
    {
      poNumber: "PO-2024-002",
      supplier: "Pharma Distributors Inc",
      orderDate: "Jan 18, 2024",
      dueDate: "Jan 28, 2024",
      total: 67500,
      status: "pending" as const,
      items: 25,
      recipient: "Pharmacy",
    },
    {
      poNumber: "PO-2024-003",
      supplier: "Hospital Supplies Co",
      orderDate: "Jan 10, 2024",
      dueDate: "Jan 20, 2024",
      total: 12000,
      status: "received" as const,
      items: 8,
      recipient: "General Store",
    },
  ];

  const inventory = [
    {
      item: "Surgical Gloves (Size M)",
      quantity: 450,
      minLevel: 200,
      maxLevel: 800,
      location: "Storage Room A",
      lastReceived: "Jan 15, 2024",
      supplier: "MedSupply Global",
    },
    {
      item: "IV Catheters",
      quantity: 120,
      minLevel: 150,
      maxLevel: 500,
      location: "ICU Storage",
      lastReceived: "Jan 10, 2024",
      supplier: "Pharma Distributors Inc",
    },
    {
      item: "Syringes (10ml)",
      quantity: 680,
      minLevel: 300,
      maxLevel: 1000,
      location: "Central Supply",
      lastReceived: "Jan 18, 2024",
      supplier: "Hospital Supplies Co",
    },
    {
      item: "Oxygen Masks",
      quantity: 95,
      minLevel: 100,
      maxLevel: 300,
      location: "Respiratory Storage",
      lastReceived: "Jan 12, 2024",
      supplier: "MedSupply Global",
    },
  ];

  const filteredSuppliers = suppliers.filter((supplier) =>
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    totalSuppliers: suppliers.length,
    activeOrders: purchaseOrders.filter((po) => po.status !== "received").length,
    lowStockItems: inventory.filter((inv) => inv.quantity <= inv.minLevel).length,
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Supply Chain Management</h1>
          <p className="text-lg text-slate-600">
            Suppliers, purchase orders, and inventory management
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <p className="text-sm text-slate-600 mb-1">Total Suppliers</p>
            <p className="text-3xl font-bold text-slate-900">{stats.totalSuppliers}</p>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <p className="text-sm text-slate-600 mb-1">Active POs</p>
            <p className="text-3xl font-bold text-blue-600">{stats.activeOrders}</p>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <p className="text-sm text-slate-600 mb-1">Inventory Items</p>
            <p className="text-3xl font-bold text-slate-900">{inventory.length}</p>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <p className="text-sm text-slate-600 mb-1">Low Stock</p>
            <p className="text-3xl font-bold text-red-600">{stats.lowStockItems}</p>
          </div>
        </div>

        {/* Low Stock Alert */}
        {stats.lowStockItems > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-red-900 mb-2">Low Stock Alert</h3>
                <p className="text-sm text-red-800">
                  {stats.lowStockItems} item(s) are below minimum stock levels. Consider placing new orders.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-slate-200 overflow-x-auto">
          {[
            { id: "suppliers", label: "Suppliers" },
            { id: "orders", label: "Purchase Orders" },
            { id: "inventory", label: "Inventory" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-4 font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-slate-600 hover:text-slate-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === "suppliers" && (
            <>
              {/* Search and Filter */}
              <div className="bg-white rounded-lg border border-slate-200 p-6 mb-8">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search suppliers..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                    <Plus className="w-5 h-5" />
                    Add Supplier
                  </button>
                </div>
              </div>

              {/* Suppliers Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredSuppliers.map((supplier, index) => (
                  <SupplierCard key={index} {...supplier} />
                ))}
              </div>

              {filteredSuppliers.length === 0 && (
                <div className="text-center py-12 bg-slate-50 rounded-lg border border-slate-200">
                  <p className="text-slate-600">No suppliers found matching your search.</p>
                </div>
              )}
            </>
          )}

          {activeTab === "orders" && (
            <>
              <div className="mb-8">
                <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                  <Plus className="w-5 h-5" />
                  Create Purchase Order
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {purchaseOrders.map((po, index) => (
                  <PurchaseOrderCard key={index} {...po} />
                ))}
              </div>
            </>
          )}

          {activeTab === "inventory" && (
            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-6">Stock Levels</h3>
              {inventory.map((item, index) => (
                <InventoryItem key={index} {...item} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
