import Layout from "@/components/Layout";
import {
  Search,
  Package,
  AlertTriangle,
  Pill,
  Plus,
  Filter,
  TrendingDown,
  AlertCircle,
  ArrowRight,
  Barcode,
} from "lucide-react";
import { useState } from "react";

const MedicineCard = ({
  name,
  dosage,
  category,
  stock,
  minLevel,
  price,
  manufacturer,
}: {
  name: string;
  dosage: string;
  category: string;
  stock: number;
  minLevel: number;
  price: number;
  manufacturer: string;
}) => {
  const isLowStock = stock <= minLevel;

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-slate-900">{name}</h3>
          <p className="text-sm text-slate-500">{dosage}</p>
        </div>
        {isLowStock && (
          <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0" />
        )}
      </div>

      <div className="space-y-3 text-sm text-slate-600 mb-4">
        <div className="flex items-center justify-between">
          <span>Category:</span>
          <span className="font-medium text-slate-900">{category}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Manufacturer:</span>
          <span className="font-medium text-slate-900">{manufacturer}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Current Stock:</span>
          <span
            className={`font-medium ${
              isLowStock ? "text-red-600" : "text-green-600"
            }`}
          >
            {stock} units
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span>Minimum Level:</span>
          <span className="font-medium text-slate-900">{minLevel} units</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Price:</span>
          <span className="font-medium text-slate-900">SAR {price.toFixed(2)}</span>
        </div>
      </div>

      {isLowStock && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-xs text-red-700 font-medium">⚠️ Low stock alert</p>
        </div>
      )}

      <button className="w-full bg-blue-50 hover:bg-blue-100 text-blue-600 font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-2">
        View Details <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};

const DrugInteractionAlert = ({
  drug1,
  drug2,
  severity,
  description,
}: {
  drug1: string;
  drug2: string;
  severity: "mild" | "moderate" | "severe";
  description: string;
}) => {
  const severityConfig = {
    mild: { color: "text-yellow-700", bg: "bg-yellow-50", badge: "Mild" },
    moderate: { color: "text-orange-700", bg: "bg-orange-50", badge: "Moderate" },
    severe: { color: "text-red-700", bg: "bg-red-50", badge: "Severe" },
  };

  const config = severityConfig[severity];

  return (
    <div className={`${config.bg} rounded-lg border border-slate-200 p-4`}>
      <div className="flex items-start justify-between mb-3">
        <h4 className="font-semibold text-slate-900">
          {drug1} + {drug2}
        </h4>
        <span className={`text-xs font-semibold px-2 py-1 rounded ${config.bg} ${config.color}`}>
          {config.badge}
        </span>
      </div>
      <p className="text-sm text-slate-700">{description}</p>
    </div>
  );
};

const TransactionItem = ({
  type,
  medicine,
  quantity,
  date,
  reference,
}: {
  type: "inbound" | "outbound" | "adjustment";
  medicine: string;
  quantity: number;
  date: string;
  reference: string;
}) => {
  const typeConfig = {
    inbound: {
      color: "text-green-700",
      bg: "bg-green-50",
      icon: "📥",
    },
    outbound: {
      color: "text-red-700",
      bg: "bg-red-50",
      icon: "📤",
    },
    adjustment: {
      color: "text-blue-700",
      bg: "bg-blue-50",
      icon: "⚙️",
    },
  };

  const config = typeConfig[type];

  return (
    <div className="flex items-center justify-between py-4 border-b border-slate-200 last:border-b-0">
      <div className="flex-1">
        <div className="flex items-center gap-3">
          <span className="text-xl">{config.icon}</span>
          <div>
            <p className="font-medium text-slate-900">{medicine}</p>
            <p className="text-xs text-slate-500">{reference}</p>
          </div>
        </div>
      </div>
      <div className="text-right">
        <p className={`font-semibold ${config.color}`}>
          {type === "outbound" ? "-" : "+"}{quantity} units
        </p>
        <p className="text-xs text-slate-500">{date}</p>
      </div>
    </div>
  );
};

export default function Pharmacy() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("inventory");

  const medicines = [
    {
      name: "Lisinopril",
      dosage: "10 mg tablets",
      category: "Cardiovascular",
      stock: 450,
      minLevel: 100,
      price: 12.50,
      manufacturer: "Pharma Corp",
    },
    {
      name: "Metformin",
      dosage: "500 mg tablets",
      category: "Endocrine",
      stock: 320,
      minLevel: 150,
      price: 8.75,
      manufacturer: "Global Pharma",
    },
    {
      name: "Amoxicillin",
      dosage: "500 mg capsules",
      category: "Antibiotic",
      stock: 85,
      minLevel: 100,
      price: 5.25,
      manufacturer: "Antibiotic Ltd",
    },
    {
      name: "Aspirin",
      dosage: "81 mg tablets",
      category: "Analgesic",
      stock: 600,
      minLevel: 200,
      price: 2.50,
      manufacturer: "Pain Relief Inc",
    },
    {
      name: "Atorvastatin",
      dosage: "20 mg tablets",
      category: "Cardiovascular",
      stock: 280,
      minLevel: 120,
      price: 15.00,
      manufacturer: "Cholesterol Labs",
    },
    {
      name: "Omeprazole",
      dosage: "20 mg capsules",
      category: "Gastrointestinal",
      stock: 45,
      minLevel: 80,
      price: 9.99,
      manufacturer: "GI Health",
    },
  ];

  const interactions = [
    {
      drug1: "Warfarin",
      drug2: "Aspirin",
      severity: "severe" as const,
      description:
        "Increased risk of bleeding when combined. Monitor INR closely.",
    },
    {
      drug1: "Metformin",
      drug2: "Contrast Dye",
      severity: "moderate" as const,
      description:
        "Risk of lactic acidosis. Hold metformin 48 hours before procedure.",
    },
    {
      drug1: "ACE Inhibitors",
      drug2: "Potassium Supplements",
      severity: "moderate" as const,
      description:
        "May cause hyperkalemia. Monitor potassium levels regularly.",
    },
  ];

  const transactions = [
    {
      type: "inbound" as const,
      medicine: "Lisinopril 10mg",
      quantity: 500,
      date: "Jan 18, 2024",
      reference: "PO-2024-001",
    },
    {
      type: "outbound" as const,
      medicine: "Amoxicillin 500mg",
      quantity: 120,
      date: "Jan 17, 2024",
      reference: "DISP-2024-156",
    },
    {
      type: "adjustment" as const,
      medicine: "Aspirin 81mg",
      quantity: 50,
      date: "Jan 16, 2024",
      reference: "ADJ-2024-045",
    },
    {
      type: "outbound" as const,
      medicine: "Atorvastatin 20mg",
      quantity: 200,
      date: "Jan 15, 2024",
      reference: "DISP-2024-155",
    },
  ];

  const filteredMedicines = medicines.filter((medicine) =>
    medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    medicine.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const lowStockCount = medicines.filter((m) => m.stock <= m.minLevel).length;
  const totalValue = medicines.reduce((sum, m) => sum + m.stock * m.price, 0);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Pharmacy Management</h1>
          <p className="text-lg text-slate-600">
            Medicine inventory, drug interactions, and pharmacy transactions
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <p className="text-sm text-slate-600 mb-1">Total Medicines</p>
            <p className="text-3xl font-bold text-slate-900">{medicines.length}</p>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <p className="text-sm text-slate-600 mb-1">Inventory Value</p>
            <p className="text-3xl font-bold text-blue-600">SAR {(totalValue / 1000).toFixed(1)}K</p>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <p className="text-sm text-slate-600 mb-1">Low Stock Alerts</p>
            <p className="text-3xl font-bold text-red-600">{lowStockCount}</p>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <p className="text-sm text-slate-600 mb-1">Drug Interactions</p>
            <p className="text-3xl font-bold text-orange-600">{interactions.length}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-slate-200">
          {[
            { id: "inventory", label: "Inventory" },
            { id: "interactions", label: "Drug Interactions" },
            { id: "transactions", label: "Transactions" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-4 font-medium border-b-2 transition-colors ${
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
          {activeTab === "inventory" && (
            <>
              {/* Search and Filter */}
              <div className="bg-white rounded-lg border border-slate-200 p-6 mb-8">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search medicines..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                    <Plus className="w-5 h-5" />
                    Add Medicine
                  </button>
                </div>
              </div>

              {/* Low Stock Alert */}
              {lowStockCount > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-red-900 mb-2">
                        Low Stock Alert
                      </h3>
                      <p className="text-sm text-red-800">
                        {lowStockCount} medicine(s) are below minimum stock level.
                        Please reorder to maintain adequate supply.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Medicines Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMedicines.map((medicine, index) => (
                  <MedicineCard key={index} {...medicine} />
                ))}
              </div>

              {filteredMedicines.length === 0 && (
                <div className="text-center py-12 bg-slate-50 rounded-lg border border-slate-200">
                  <p className="text-slate-600">No medicines found matching your search.</p>
                </div>
              )}
            </>
          )}

          {activeTab === "interactions" && (
            <div className="space-y-4">
              {interactions.map((interaction, index) => (
                <DrugInteractionAlert key={index} {...interaction} />
              ))}
            </div>
          )}

          {activeTab === "transactions" && (
            <div className="bg-white rounded-lg border border-slate-200 p-6">
              {transactions.map((transaction, index) => (
                <TransactionItem key={index} {...transaction} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
