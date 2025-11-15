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
  Users,
  DollarSign,
  ShoppingCart,
  Truck,
  FileText,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  Building2,
  CreditCard,
  Receipt,
  Shield,
  Hospital,
  User,
  RefreshCw,
  Download,
  Upload,
  Eye,
  Edit,
  Trash2,
  TrendingUp,
  ArrowUpRight,
  Activity,
  BarChart3,
  Zap,
  Star,
  PackageCheck,
} from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const MedicineCard = ({
  name,
  dosage,
  category,
  stock,
  minLevel,
  price,
  manufacturer,
  batchNumber,
  expiryDate,
  warehouse,
}: {
  name: string;
  dosage: string;
  category: string;
  stock: number;
  minLevel: number;
  price: number;
  manufacturer: string;
  batchNumber?: string;
  expiryDate?: string;
  warehouse?: string;
}) => {
  const { t } = useTranslation();
  const isLowStock = stock <= minLevel;

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-slate-900">{name}</h3>
            <p className="text-sm text-slate-500">{dosage}</p>
            {batchNumber && (
              <p className="text-xs text-slate-400 mt-1">Batch: {batchNumber}</p>
            )}
          </div>
          {isLowStock && (
            <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0" />
          )}
        </div>

        <div className="space-y-2 text-sm text-slate-600 mb-4">
          <div className="flex items-center justify-between">
            <span>{t('pharmacy.category')}:</span>
            <Badge variant="outline">{category}</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span>{t('pharmacy.manufacturer')}:</span>
            <span className="font-medium text-slate-900">{manufacturer}</span>
          </div>
          {warehouse && (
            <div className="flex items-center justify-between">
              <span>{t('pharmacy.warehouse')}:</span>
              <span className="font-medium text-slate-900">{warehouse}</span>
            </div>
          )}
          <div className="flex items-center justify-between">
            <span>{t('pharmacy.currentStock')}:</span>
            <span
              className={`font-bold ${
                isLowStock ? "text-red-600" : "text-green-600"
              }`}
            >
              {stock} {t('pharmacy.units')}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span>{t('pharmacy.minimumLevel')}:</span>
            <span className="font-medium text-slate-900">{minLevel} {t('pharmacy.units')}</span>
          </div>
          {expiryDate && (
            <div className="flex items-center justify-between">
              <span>{t('pharmacy.expiryDate')}:</span>
              <span className="font-medium text-slate-900">{expiryDate}</span>
            </div>
          )}
          <div className="flex items-center justify-between">
            <span>{t('pharmacy.price')}:</span>
            <span className="font-bold text-blue-600">SAR {price.toFixed(2)}</span>
          </div>
        </div>

        {isLowStock && (
          <div className="mb-4 p-2 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-xs text-red-700 font-medium flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" />
              {t('pharmacy.lowStockAlert')}
            </p>
          </div>
        )}

        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1">
            <Eye className="w-4 h-4 mr-1" />
            {t('common.view')}
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            <ShoppingCart className="w-4 h-4 mr-1" />
            {t('pharmacy.dispense')}
          </Button>
        </div>
      </CardContent>
    </Card>
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
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const [isAddMedicineDialogOpen, setIsAddMedicineDialogOpen] = useState(false);
  const [isAddSupplierDialogOpen, setIsAddSupplierDialogOpen] = useState(false);
  const [isDispenseDialogOpen, setIsDispenseDialogOpen] = useState(false);
  const [medicineForm, setMedicineForm] = useState({
    name: "",
    dosage: "",
    category: "cardiovascular",
    stock: "",
    minLevel: "",
    price: "",
    manufacturer: "",
    batchNumber: "",
    expiryDate: "",
    warehouse: "main"
  });
  const [supplierForm, setSupplierForm] = useState({
    name: "",
    contact: "",
    email: "",
    phone: "",
    address: "",
    rating: "5",
    productsSupplied: ""
  });
  const [dispenseForm, setDispenseForm] = useState({
    patientId: "",
    patientName: "",
    medication: "",
    dosage: "",
    quantity: "",
    prescriptionNumber: "",
    prescribedBy: "",
    insuranceCompany: "",
    insuranceCovered: false,
    copayAmount: "",
    instructions: "",
    type: "outpatient"
  });

  const medicines = [
    {
      name: "Lisinopril",
      dosage: "10 mg tablets",
      category: "Cardiovascular",
      stock: 450,
      minLevel: 100,
      price: 12.50,
      manufacturer: "Pharma Corp",
      batchNumber: "LC2024-001",
      expiryDate: "2025-12-31",
      warehouse: "Main Warehouse",
    },
    {
      name: "Metformin",
      dosage: "500 mg tablets",
      category: "Endocrine",
      stock: 320,
      minLevel: 150,
      price: 8.75,
      manufacturer: "Global Pharma",
      batchNumber: "MF2024-045",
      expiryDate: "2025-08-15",
      warehouse: "Main Warehouse",
    },
    {
      name: "Amoxicillin",
      dosage: "500 mg capsules",
      category: "Antibiotic",
      stock: 85,
      minLevel: 100,
      price: 5.25,
      manufacturer: "Antibiotic Ltd",
      batchNumber: "AM2024-078",
      expiryDate: "2025-06-30",
      warehouse: "Cold Storage",
    },
    {
      name: "Aspirin",
      dosage: "81 mg tablets",
      category: "Analgesic",
      stock: 600,
      minLevel: 200,
      price: 2.50,
      manufacturer: "Pain Relief Inc",
      batchNumber: "AS2024-112",
      expiryDate: "2026-03-20",
      warehouse: "Main Warehouse",
    },
    {
      name: "Atorvastatin",
      dosage: "20 mg tablets",
      category: "Cardiovascular",
      stock: 280,
      minLevel: 120,
      price: 15.00,
      manufacturer: "Cholesterol Labs",
      batchNumber: "AT2024-055",
      expiryDate: "2025-10-10",
      warehouse: "Secondary Warehouse",
    },
    {
      name: "Omeprazole",
      dosage: "20 mg capsules",
      category: "Gastrointestinal",
      stock: 45,
      minLevel: 80,
      price: 9.99,
      manufacturer: "GI Health",
      batchNumber: "OM2024-033",
      expiryDate: "2025-04-25",
      warehouse: "Main Warehouse",
    },
  ];

  const warehouses = [
    {
      id: "WH001",
      name: "Main Warehouse",
      location: "Building A - Floor 1",
      capacity: 10000,
      occupied: 6850,
      temperature: "15-25°C",
      humidity: "45-60%",
      manager: "Mohammed Al-Rashid",
      itemsCount: 156,
    },
    {
      id: "WH002",
      name: "Cold Storage",
      location: "Building B - Basement",
      capacity: 2000,
      occupied: 1200,
      temperature: "2-8°C",
      humidity: "40-50%",
      manager: "Fatima Al-Harbi",
      itemsCount: 45,
    },
    {
      id: "WH003",
      name: "Secondary Warehouse",
      location: "Building A - Floor 2",
      capacity: 5000,
      occupied: 2800,
      temperature: "20-25°C",
      humidity: "50-65%",
      manager: "Ahmed Al-Otaibi",
      itemsCount: 89,
    },
  ];

  const suppliers = [
    {
      id: "SUP001",
      name: "Pharma Corp International",
      contact: "John Smith",
      email: "john@pharmacorp.com",
      phone: "+966 11 234 5678",
      address: "Riyadh, Saudi Arabia",
      products: 45,
      totalOrders: 156,
      totalValue: 2450000,
      rating: 4.8,
      status: "active",
      lastDelivery: "2024-01-15",
      paymentTerms: "Net 30",
    },
    {
      id: "SUP002",
      name: "Global Pharma Solutions",
      contact: "Sarah Johnson",
      email: "sarah@globalp harma.com",
      phone: "+966 12 345 6789",
      address: "Jeddah, Saudi Arabia",
      products: 78,
      totalOrders: 234,
      totalValue: 3800000,
      rating: 4.9,
      status: "active",
      lastDelivery: "2024-01-18",
      paymentTerms: "Net 45",
    },
    {
      id: "SUP003",
      name: "Medical Supplies Co",
      contact: "Ahmed Hassan",
      email: "ahmed@medsupplies.com",
      phone: "+966 13 456 7890",
      address: "Dammam, Saudi Arabia",
      products: 32,
      totalOrders: 89,
      totalValue: 1200000,
      rating: 4.5,
      status: "active",
      lastDelivery: "2024-01-12",
      paymentTerms: "Net 30",
    },
  ];

  const dispensingRecords = [
    {
      id: "DISP-2024-001",
      patientName: "Ahmed Mohammed",
      patientId: "P001",
      medication: "Lisinopril 10mg",
      quantity: 30,
      prescribedBy: "Dr. Hassan Al-Rashid",
      dispenser: "Pharmacist Noor",
      type: "outpatient",
      insuranceCovered: true,
      insuranceCompany: "Saudi Insurance",
      copay: 25,
      totalCost: 375,
      date: "2024-01-20",
      time: "09:30 AM",
      status: "completed",
    },
    {
      id: "DISP-2024-002",
      patientName: "Fatima Al-Rashid",
      patientId: "P002",
      medication: "Amoxicillin 500mg",
      quantity: 21,
      prescribedBy: "Dr. Sarah Al-Harbi",
      dispenser: "Pharmacist Omar",
      type: "inpatient",
      insuranceCovered: true,
      insuranceCompany: "BUPA Arabia",
      copay: 0,
      totalCost: 110.25,
      date: "2024-01-20",
      time: "10:15 AM",
      status: "completed",
    },
    {
      id: "DISP-2024-003",
      patientName: "Mohammed Hassan",
      patientId: "P003",
      medication: "Atorvastatin 20mg",
      quantity: 30,
      prescribedBy: "Dr. Ahmed Al-Otaibi",
      dispenser: "Pharmacist Noor",
      type: "outpatient",
      insuranceCovered: false,
      insuranceCompany: null,
      copay: 0,
      totalCost: 450,
      date: "2024-01-20",
      time: "11:00 AM",
      status: "completed",
    },
  ];

  const purchaseOrders = [
    {
      id: "PO-2024-001",
      supplier: "Pharma Corp International",
      orderDate: "2024-01-15",
      expectedDelivery: "2024-01-25",
      items: 12,
      totalAmount: 45000,
      status: "pending",
      approvedBy: "Manager Ahmed",
    },
    {
      id: "PO-2024-002",
      supplier: "Global Pharma Solutions",
      orderDate: "2024-01-18",
      expectedDelivery: "2024-01-28",
      items: 8,
      totalAmount: 32000,
      status: "approved",
      approvedBy: "Manager Ahmed",
    },
    {
      id: "PO-2024-003",
      supplier: "Medical Supplies Co",
      orderDate: "2024-01-10",
      expectedDelivery: "2024-01-20",
      items: 15,
      totalAmount: 28000,
      status: "delivered",
      approvedBy: "Manager Ahmed",
    },
  ];

  const financialTransactions = [
    {
      id: "FIN-2024-001",
      type: "revenue",
      description: "Patient Medication Sales",
      amount: 15750,
      date: "2024-01-20",
      category: "outpatient",
      reference: "Multiple Dispensing",
      paymentMethod: "Mixed",
    },
    {
      id: "FIN-2024-002",
      type: "expense",
      description: "Purchase Order Payment",
      amount: 45000,
      date: "2024-01-18",
      category: "inventory",
      reference: "PO-2024-001",
      paymentMethod: "Bank Transfer",
      supplier: "Pharma Corp International",
    },
    {
      id: "FIN-2024-003",
      type: "revenue",
      description: "Insurance Reimbursement",
      amount: 89500,
      date: "2024-01-17",
      category: "insurance",
      reference: "CLAIM-2024-JAN",
      paymentMethod: "Bank Transfer",
      insuranceCompany: "BUPA Arabia",
    },
    {
      id: "FIN-2024-004",
      type: "expense",
      description: "Warehouse Maintenance",
      amount: 8500,
      date: "2024-01-15",
      category: "operations",
      reference: "MAINT-2024-001",
      paymentMethod: "Cash",
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
  const totalWarehouseCapacity = warehouses.reduce((sum, w) => sum + w.capacity, 0);
  const totalWarehouseOccupied = warehouses.reduce((sum, w) => sum + w.occupied, 0);
  const todayDispensing = dispensingRecords.length;
  const insuranceCoverage = dispensingRecords.filter(d => d.insuranceCovered).length;
  const totalRevenue = financialTransactions
    .filter(t => t.type === "revenue")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = financialTransactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <Layout>
      <div className="space-y-6">
        {/* Enhanced Gradient Header */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-700 p-8 shadow-2xl">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                    <Pill className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold text-white mb-1">
                      {t('pharmacy.comprehensiveManagement')}
                    </h1>
                    <p className="text-purple-100 text-lg">
                      {t('pharmacy.subtitle')}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="secondary" className="gap-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/30">
                  <Download className="w-4 h-4" />
                  {t('common.export')}
                </Button>
                <Button className="gap-2 bg-white text-purple-600 hover:bg-purple-50" onClick={() => setIsAddMedicineDialogOpen(true)}>
                  <Plus className="w-4 h-4" />
                  {t('pharmacy.addMedicine')}
                </Button>
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24"></div>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-blue-50 to-indigo-50">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full -mr-16 -mt-16"></div>
            <CardContent className="pt-6 relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">{t('pharmacy.totalMedicines')}</p>
                  <p className="text-4xl font-bold text-slate-900 mb-2">{medicines.length}</p>
                  <div className="flex items-center gap-1 text-xs">
                    <TrendingUp className="w-3 h-3 text-green-600" />
                    <span className="text-green-600 font-medium">+{medicines.length} {t('pharmacy.active')}</span>
                  </div>
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Pill className="w-8 h-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-green-50 to-emerald-50">
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full -mr-16 -mt-16"></div>
            <CardContent className="pt-6 relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">{t('pharmacy.inventoryValue')}</p>
                  <p className="text-4xl font-bold text-slate-900 mb-2">SAR {(totalValue / 1000).toFixed(1)}K</p>
                  <div className="flex items-center gap-1 text-xs">
                    <ArrowUpRight className="w-3 h-3 text-green-600" />
                    <span className="text-green-600 font-medium">+12% {t('common.thisMonth')}</span>
                  </div>
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <DollarSign className="w-8 h-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-red-50 to-orange-50">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full -mr-16 -mt-16"></div>
            <CardContent className="pt-6 relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">{t('pharmacy.lowStockAlerts')}</p>
                  <p className="text-4xl font-bold text-slate-900 mb-2">{lowStockCount}</p>
                  <div className="flex items-center gap-1 text-xs">
                    <AlertTriangle className="w-3 h-3 text-red-600" />
                    <span className="text-red-600 font-medium">{t('pharmacy.requiresReorder')}</span>
                  </div>
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <AlertTriangle className="w-8 h-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-purple-50 to-pink-50">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full -mr-16 -mt-16"></div>
            <CardContent className="pt-6 relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">{t('pharmacy.todayDispensing')}</p>
                  <p className="text-4xl font-bold text-slate-900 mb-2">{todayDispensing}</p>
                  <div className="flex items-center gap-1 text-xs">
                    <Shield className="w-3 h-3 text-purple-600" />
                    <span className="text-purple-600 font-medium">{insuranceCoverage} {t('pharmacy.withInsurance')}</span>
                  </div>
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <ShoppingCart className="w-8 h-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-8 lg:w-auto">
            <TabsTrigger value="overview">{t('rooms.overview')}</TabsTrigger>
            <TabsTrigger value="inventory">{t('pharmacy.inventory')}</TabsTrigger>
            <TabsTrigger value="dispensing">{t('pharmacy.dispensing')}</TabsTrigger>
            <TabsTrigger value="warehouses">{t('pharmacy.warehouses')}</TabsTrigger>
            <TabsTrigger value="suppliers">{t('pharmacy.suppliers')}</TabsTrigger>
            <TabsTrigger value="orders">{t('pharmacy.purchaseOrders')}</TabsTrigger>
            <TabsTrigger value="insurance">{t('pharmacy.insurance')}</TabsTrigger>
            <TabsTrigger value="analytics">{t('pharmacy.analytics')}</TabsTrigger>
          </TabsList>

          {/* Overview Tab - NEW */}
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Stock Status Overview */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-blue-600" />
                    {t('pharmacy.stockStatus')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-slate-700">{t('pharmacy.inStock')}</span>
                        <PackageCheck className="w-5 h-5 text-green-600" />
                      </div>
                      <p className="text-3xl font-bold text-green-600">{medicines.filter(m => m.stock > m.minLevel).length}</p>
                      <p className="text-xs text-green-700 mt-1">{t('pharmacy.adequateSupply')}</p>
                    </div>

                    <div className="p-4 bg-orange-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-slate-700">{t('pharmacy.lowStock')}</span>
                        <AlertTriangle className="w-5 h-5 text-orange-600" />
                      </div>
                      <p className="text-3xl font-bold text-orange-600">{lowStockCount}</p>
                      <p className="text-xs text-orange-700 mt-1">{t('pharmacy.reorderNeeded')}</p>
                    </div>

                    <div className="p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-slate-700">{t('pharmacy.totalValue')}</span>
                        <DollarSign className="w-5 h-5 text-blue-600" />
                      </div>
                      <p className="text-3xl font-bold text-blue-600">SAR {(totalValue / 1000).toFixed(1)}K</p>
                      <p className="text-xs text-blue-700 mt-1">{t('pharmacy.inventoryWorth')}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-purple-600" />
                    {t('pharmacy.quickActions')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-2 gap-3">
                    <Button 
                      onClick={() => setIsAddMedicineDialogOpen(true)}
                      className="h-20 flex flex-col gap-2 bg-gradient-to-br from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                    >
                      <Package className="w-6 h-6" />
                      <span className="text-sm">{t('pharmacy.addMedicine')}</span>
                    </Button>
                    <Button 
                      onClick={() => setIsDispenseDialogOpen(true)}
                      className="h-20 flex flex-col gap-2 bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                    >
                      <ShoppingCart className="w-6 h-6" />
                      <span className="text-sm">{t('pharmacy.dispense')}</span>
                    </Button>
                    <Button className="h-20 flex flex-col gap-2 bg-gradient-to-br from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700">
                      <Truck className="w-6 h-6" />
                      <span className="text-sm">{t('pharmacy.newOrder')}</span>
                    </Button>
                    <Button className="h-20 flex flex-col gap-2 bg-gradient-to-br from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700">
                      <FileText className="w-6 h-6" />
                      <span className="text-sm">{t('pharmacy.viewReports')}</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Transactions */}
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-green-600" />
                  {t('pharmacy.recentActivity')}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  {transactions.map((transaction, idx) => (
                    <TransactionItem key={idx} {...transaction} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Inventory Tab */}
          <TabsContent value="inventory" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{t('pharmacy.medicineInventory')}</CardTitle>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                      <input
                        type="text"
                        placeholder={t('pharmacy.searchMedicines')}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <Button size="sm" variant="outline">
                      <Filter className="w-4 h-4 mr-1" />
                      {t('common.filter')}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {lowStockCount > 0 && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-red-900 text-sm">{t('pharmacy.lowStockAlert')}</h4>
                        <p className="text-xs text-red-800 mt-1">
                          {lowStockCount} {t('pharmacy.belowMinimumStock')}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredMedicines.map((medicine, index) => (
                    <MedicineCard key={index} {...medicine} />
                  ))}
                </div>

                {filteredMedicines.length === 0 && (
                  <div className="text-center py-12">
                    <Package className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                    <p className="text-slate-600">{t('pharmacy.noMedicinesFound')}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Warehouses Tab */}
          <TabsContent value="warehouses" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {warehouses.map((warehouse) => (
                <Card key={warehouse.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-slate-900">{warehouse.name}</h3>
                        <p className="text-xs text-slate-500">{warehouse.location}</p>
                      </div>
                      <Building2 className="w-8 h-8 text-blue-600" />
                    </div>

                    <div className="space-y-3 text-sm">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-slate-600">{t('pharmacy.capacity')}</span>
                          <span className="font-semibold">{((warehouse.occupied / warehouse.capacity) * 100).toFixed(0)}%</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${(warehouse.occupied / warehouse.capacity) * 100}%` }}
                          />
                        </div>
                        <p className="text-xs text-slate-500 mt-1">
                          {warehouse.occupied} / {warehouse.capacity} {t('pharmacy.units')}
                        </p>
                      </div>

                      <div className="pt-3 border-t space-y-2">
                        <div className="flex justify-between">
                          <span className="text-slate-600">{t('pharmacy.temperature')}:</span>
                          <span className="font-medium">{warehouse.temperature}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">{t('pharmacy.humidity')}:</span>
                          <span className="font-medium">{warehouse.humidity}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">{t('pharmacy.manager')}:</span>
                          <span className="font-medium">{warehouse.manager}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">{t('pharmacy.itemsStored')}:</span>
                          <Badge>{warehouse.itemsCount}</Badge>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="w-4 h-4 mr-1" />
                        {t('common.view')}
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <RefreshCw className="w-4 h-4 mr-1" />
                        {t('pharmacy.audit')}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Dispensing Tab */}
          <TabsContent value="dispensing" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{t('pharmacy.dispensingRecords')}</CardTitle>
                  <Button 
                    onClick={() => setIsDispenseDialogOpen(true)}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    صرف دواء
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">{t('pharmacy.dispensingId')}</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">{t('common.name')}</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">{t('pharmacy.medication')}</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">{t('pharmacy.quantity')}</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">{t('pharmacy.type')}</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">{t('pharmacy.insurance')}</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">{t('pharmacy.cost')}</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">{t('common.status')}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {dispensingRecords.map((record) => (
                        <tr key={record.id} className="hover:bg-slate-50">
                          <td className="py-3 px-4">
                            <span className="text-sm font-medium text-slate-900">{record.id}</span>
                            <p className="text-xs text-slate-500">{record.date} {record.time}</p>
                          </td>
                          <td className="py-3 px-4">
                            <p className="text-sm font-medium text-slate-900">{record.patientName}</p>
                            <p className="text-xs text-slate-500">{record.patientId}</p>
                          </td>
                          <td className="py-3 px-4">
                            <p className="text-sm text-slate-900">{record.medication}</p>
                            <p className="text-xs text-slate-500">By {record.prescribedBy}</p>
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-sm font-medium">{record.quantity} {t('pharmacy.units')}</span>
                          </td>
                          <td className="py-3 px-4">
                            <Badge variant={record.type === "inpatient" ? "default" : "secondary"}>
                              {record.type}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            {record.insuranceCovered ? (
                              <div>
                                <Badge variant="outline" className="mb-1">
                                  <Shield className="w-3 h-3 mr-1" />
                                  {t('pharmacy.covered')}
                                </Badge>
                                <p className="text-xs text-slate-500">{record.insuranceCompany}</p>
                              </div>
                            ) : (
                              <Badge variant="outline">{t('pharmacy.selfPay')}</Badge>
                            )}
                          </td>
                          <td className="py-3 px-4">
                            <p className="text-sm font-bold text-green-600">SAR {record.totalCost}</p>
                            {record.copay > 0 && (
                              <p className="text-xs text-slate-500">Copay: SAR {record.copay}</p>
                            )}
                          </td>
                          <td className="py-3 px-4">
                            <Badge variant="default">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              {record.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Suppliers Tab */}
          <TabsContent value="suppliers" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{t('pharmacy.supplierManagement')}</CardTitle>
                  <Button onClick={() => setIsAddSupplierDialogOpen(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    {t('pharmacy.addSupplier')}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {suppliers.map((supplier) => (
                    <Card key={supplier.id}>
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-lg text-slate-900">{supplier.name}</h3>
                              <Badge variant={supplier.status === "active" ? "default" : "secondary"}>
                                {supplier.status}
                              </Badge>
                              <div className="flex items-center gap-1 text-yellow-500">
                                <span className="text-sm font-medium">★ {supplier.rating}</span>
                              </div>
                            </div>
                            <p className="text-sm text-slate-600">{supplier.address}</p>
                          </div>
                          <Truck className="w-10 h-10 text-blue-600" />
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div>
                            <p className="text-xs text-slate-500">{t('pharmacy.products')}</p>
                            <p className="text-lg font-bold text-slate-900">{supplier.products}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500">{t('pharmacy.totalOrders')}</p>
                            <p className="text-lg font-bold text-blue-600">{supplier.totalOrders}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500">{t('pharmacy.totalValue')}</p>
                            <p className="text-lg font-bold text-green-600">SAR {(supplier.totalValue / 1000).toFixed(0)}K</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-500">{t('pharmacy.lastDelivery')}</p>
                            <p className="text-sm font-medium text-slate-900">{supplier.lastDelivery}</p>
                          </div>
                        </div>

                        <div className="pt-4 border-t">
                          <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                            <div>
                              <p className="text-slate-600">{t('pharmacy.contactPerson')}:</p>
                              <p className="font-medium">{supplier.contact}</p>
                            </div>
                            <div>
                              <p className="text-slate-600">{t('pharmacy.paymentTerms')}:</p>
                              <p className="font-medium">{supplier.paymentTerms}</p>
                            </div>
                            <div>
                              <p className="text-slate-600">{t('common.email')}:</p>
                              <p className="font-medium text-blue-600">{supplier.email}</p>
                            </div>
                            <div>
                              <p className="text-slate-600">{t('pharmacy.phone')}:</p>
                              <p className="font-medium">{supplier.phone}</p>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4 mr-1" />
                              {t('common.view')}
                            </Button>
                            <Button variant="outline" size="sm">
                              <ShoppingCart className="w-4 h-4 mr-1" />
                              {t('pharmacy.createOrder')}
                            </Button>
                            <Button variant="outline" size="sm">
                              <FileText className="w-4 h-4 mr-1" />
                              {t('pharmacy.viewContract')}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Purchase Orders Tab */}
          <TabsContent value="orders" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{t('pharmacy.purchaseOrders')}</CardTitle>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    {t('pharmacy.newOrder')}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {purchaseOrders.map((order) => (
                    <div key={order.id} className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-slate-900">{order.id}</h4>
                          <p className="text-sm text-slate-600">{order.supplier}</p>
                        </div>
                        <Badge
                          variant={
                            order.status === "delivered"
                              ? "default"
                              : order.status === "approved"
                              ? "secondary"
                              : "outline"
                          }
                        >
                          {order.status === "pending" && <Clock className="w-3 h-3 mr-1" />}
                          {order.status === "approved" && <CheckCircle className="w-3 h-3 mr-1" />}
                          {order.status === "delivered" && <CheckCircle className="w-3 h-3 mr-1" />}
                          {order.status}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                        <div>
                          <p className="text-slate-500">{t('pharmacy.orderDate')}</p>
                          <p className="font-medium">{order.orderDate}</p>
                        </div>
                        <div>
                          <p className="text-slate-500">{t('pharmacy.expectedDelivery')}</p>
                          <p className="font-medium">{order.expectedDelivery}</p>
                        </div>
                        <div>
                          <p className="text-slate-500">{t('pharmacy.items')}</p>
                          <p className="font-medium">{order.items} {t('pharmacy.items')}</p>
                        </div>
                        <div>
                          <p className="text-slate-500">{t('pharmacy.totalAmount')}</p>
                          <p className="font-bold text-green-600">SAR {order.totalAmount.toLocaleString()}</p>
                        </div>
                      </div>

                      <div className="pt-3 border-t flex items-center justify-between">
                        <p className="text-xs text-slate-500">
                          {t('pharmacy.approvedBy')}: {order.approvedBy}
                        </p>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-1" />
                            {t('common.view')}
                          </Button>
                          {order.status === "pending" && (
                            <Button size="sm" variant="default">
                              <CheckCircle className="w-4 h-4 mr-1" />
                              {t('pharmacy.approve')}
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Insurance Tab */}
          <TabsContent value="insurance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{t('pharmacy.insuranceManagement')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <Shield className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                        <p className="text-sm text-slate-600">{t('pharmacy.totalCovered')}</p>
                        <p className="text-2xl font-bold text-slate-900">{insuranceCoverage}</p>
                        <p className="text-xs text-slate-500 mt-1">{t('pharmacy.outOf')} {dispensingRecords.length}</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
                        <p className="text-sm text-slate-600">{t('pharmacy.insuranceRevenue')}</p>
                        <p className="text-2xl font-bold text-green-600">SAR 89.5K</p>
                        <p className="text-xs text-green-600 mt-1">↑ 8% {t('dashboard.vsLastMonth')}</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <Building2 className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                        <p className="text-sm text-slate-600">{t('pharmacy.insuranceCompanies')}</p>
                        <p className="text-2xl font-bold text-slate-900">8</p>
                        <p className="text-xs text-slate-500 mt-1">{t('pharmacy.activePartners')}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-slate-900">{t('pharmacy.recentInsuranceClaims')}</h3>
                  {dispensingRecords
                    .filter(r => r.insuranceCovered)
                    .map((record) => (
                      <div key={record.id} className="border border-slate-200 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <p className="font-semibold text-slate-900">{record.patientName}</p>
                            <p className="text-sm text-slate-600">{record.insuranceCompany}</p>
                          </div>
                          <Badge variant="default">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            {t('pharmacy.claimed')}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-slate-500">{t('pharmacy.medication')}</p>
                            <p className="font-medium">{record.medication}</p>
                          </div>
                          <div>
                            <p className="text-slate-500">{t('pharmacy.totalCost')}</p>
                            <p className="font-bold text-green-600">SAR {record.totalCost}</p>
                          </div>
                          <div>
                            <p className="text-slate-500">{t('pharmacy.patientCopay')}</p>
                            <p className="font-medium">SAR {record.copay}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Finance Tab */}
          <TabsContent value="finance" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">{t('pharmacy.totalRevenue')}</p>
                      <p className="text-2xl font-bold text-green-600">SAR {(totalRevenue / 1000).toFixed(1)}K</p>
                      <p className="text-xs text-green-600 mt-1">↑ 15% {t('dashboard.vsLastMonth')}</p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <TrendingDown className="w-6 h-6 text-green-600 rotate-180" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">{t('pharmacy.totalExpenses')}</p>
                      <p className="text-2xl font-bold text-red-600">SAR {(totalExpenses / 1000).toFixed(1)}K</p>
                      <p className="text-xs text-red-600 mt-1">↑ 5% {t('dashboard.vsLastMonth')}</p>
                    </div>
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                      <TrendingDown className="w-6 h-6 text-red-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">{t('pharmacy.netProfit')}</p>
                      <p className="text-2xl font-bold text-blue-600">SAR {((totalRevenue - totalExpenses) / 1000).toFixed(1)}K</p>
                      <p className="text-xs text-blue-600 mt-1">{(((totalRevenue - totalExpenses) / totalRevenue) * 100).toFixed(1)}% {t('pharmacy.margin')}</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>{t('pharmacy.financialTransactions')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {financialTransactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                              transaction.type === "revenue"
                                ? "bg-green-100"
                                : "bg-red-100"
                            }`}
                          >
                            {transaction.type === "revenue" ? (
                              <TrendingDown className="w-5 h-5 text-green-600 rotate-180" />
                            ) : (
                              <TrendingDown className="w-5 h-5 text-red-600" />
                            )}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900">{transaction.description}</p>
                            <p className="text-xs text-slate-500">
                              {transaction.reference} • {transaction.paymentMethod}
                            </p>
                            {transaction.supplier && (
                              <p className="text-xs text-slate-500">Supplier: {transaction.supplier}</p>
                            )}
                            {transaction.insuranceCompany && (
                              <p className="text-xs text-slate-500">Insurance: {transaction.insuranceCompany}</p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p
                          className={`text-lg font-bold ${
                            transaction.type === "revenue"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {transaction.type === "revenue" ? "+" : "-"}SAR {transaction.amount.toLocaleString()}
                        </p>
                        <p className="text-xs text-slate-500">{transaction.date}</p>
                        <Badge variant="outline" className="mt-1">{transaction.category}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab - NEW */}
          <TabsContent value="analytics" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Sales Performance */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    {t('pharmacy.salesPerformance')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-slate-600">{t('pharmacy.monthlyRevenue')}</p>
                      <p className="text-4xl font-bold text-green-600">SAR 156K</p>
                      <div className="flex items-center gap-1 mt-1">
                        <ArrowUpRight className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-green-600">+18.5% {t('common.vsLastWeek')}</span>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-slate-200">
                      <p className="text-sm text-slate-600 mb-2">{t('pharmacy.dailyAverage')}</p>
                      <p className="text-2xl font-bold text-slate-900">SAR 5,187</p>
                    </div>
                    <div className="pt-4 border-t border-slate-200">
                      <p className="text-sm text-slate-600 mb-2">{t('pharmacy.transactionsToday')}</p>
                      <p className="text-2xl font-bold text-blue-600">147</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Inventory Turnover */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-blue-600" />
                    {t('pharmacy.inventoryMetrics')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-slate-600 mb-1">{t('pharmacy.turnoverRate')}</p>
                      <p className="text-3xl font-bold text-blue-600">4.2x</p>
                      <p className="text-xs text-slate-500 mt-1">{t('pharmacy.perYear')}</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="text-sm text-slate-600 mb-1">{t('pharmacy.stockAccuracy')}</p>
                      <p className="text-3xl font-bold text-green-600">98.5%</p>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <p className="text-sm text-slate-600 mb-1">{t('pharmacy.avgHoldingCost')}</p>
                      <p className="text-3xl font-bold text-purple-600">SAR 12K</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Top Performers */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Star className="w-5 h-5 text-purple-600" />
                    {t('pharmacy.topMedicines')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    {[
                      { name: 'Lisinopril', sales: 145, revenue: 1812 },
                      { name: 'Metformin', sales: 128, revenue: 1120 },
                      { name: 'Aspirin', sales: 210, revenue: 525 },
                      { name: 'Atorvastatin', sales: 98, revenue: 1470 },
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div>
                          <p className="font-semibold text-slate-900">{item.name}</p>
                          <p className="text-xs text-slate-600">{item.sales} {t('pharmacy.units')} {t('pharmacy.sold')}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-green-600">SAR {item.revenue}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Detailed Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Category Performance */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50">
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-amber-600" />
                    {t('pharmacy.categoryPerformance')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    {[
                      { category: 'Cardiovascular', sales: 287, revenue: 34560, growth: 12 },
                      { category: 'Antibiotics', sales: 245, revenue: 18750, growth: 8 },
                      { category: 'Analgesics', sales: 412, revenue: 10300, growth: -3 },
                      { category: 'Endocrine', sales: 189, revenue: 16520, growth: 15 },
                    ].map((item, idx) => (
                      <div key={idx} className="p-4 border border-slate-200 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-slate-900">{item.category}</h4>
                          <Badge variant={item.growth > 0 ? 'default' : 'destructive'}>
                            {item.growth > 0 ? '+' : ''}{item.growth}%
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-slate-600">{t('pharmacy.unitsSold')}</p>
                            <p className="font-bold text-slate-900">{item.sales}</p>
                          </div>
                          <div>
                            <p className="text-slate-600">{t('pharmacy.revenue')}</p>
                            <p className="font-bold text-green-600">SAR {item.revenue.toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Supplier Performance */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-cyan-50 to-blue-50">
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="w-5 h-5 text-cyan-600" />
                    {t('pharmacy.supplierPerformance')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    {suppliers.slice(0, 3).map((supplier) => (
                      <div key={supplier.id} className="p-4 border border-slate-200 rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-slate-900">{supplier.name}</h4>
                          <div className="flex items-center gap-1 text-yellow-500">
                            <Star className="w-4 h-4 fill-current" />
                            <span className="text-sm font-medium">{supplier.rating}</span>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-xs">
                          <div>
                            <p className="text-slate-600">{t('pharmacy.orders')}</p>
                            <p className="font-bold text-slate-900">{supplier.totalOrders}</p>
                          </div>
                          <div>
                            <p className="text-slate-600">{t('pharmacy.value')}</p>
                            <p className="font-bold text-green-600">SAR {(supplier.totalValue / 1000).toFixed(0)}K</p>
                          </div>
                          <div>
                            <p className="text-slate-600">{t('pharmacy.lastDelivery')}</p>
                            <p className="font-medium text-slate-900">{supplier.lastDelivery.slice(5)}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Expiry Management */}
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50">
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-red-600" />
                  {t('pharmacy.expiryManagement')}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <p className="text-sm text-slate-600 mb-2">{t('pharmacy.expiringSoon')}</p>
                    <p className="text-3xl font-bold text-red-600">12</p>
                    <p className="text-xs text-slate-500 mt-1">{t('pharmacy.within30Days')}</p>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <p className="text-sm text-slate-600 mb-2">{t('pharmacy.within60Days')}</p>
                    <p className="text-3xl font-bold text-orange-600">28</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-sm text-slate-600 mb-2">{t('pharmacy.longShelfLife')}</p>
                    <p className="text-3xl font-bold text-green-600">156</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {medicines.filter(m => m.expiryDate).slice(0, 3).map((medicine, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
                      <div>
                        <p className="font-semibold text-slate-900">{medicine.name}</p>
                        <p className="text-sm text-slate-600">{t('pharmacy.batch')}: {medicine.batchNumber}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-red-600">{medicine.expiryDate}</p>
                        <p className="text-xs text-slate-500">{medicine.stock} {t('pharmacy.units')}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Add Medicine Dialog */}
      <Dialog open={isAddMedicineDialogOpen} onOpenChange={setIsAddMedicineDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-purple-700 flex items-center gap-2">
              <Pill className="w-6 h-6" />
              {t('pharmacy.addMedicine')}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="medicine-name">{t('pharmacy.medicineName')}</Label>
                <Input 
                  id="medicine-name" 
                  placeholder={t('pharmacy.medicineName')}
                  value={medicineForm.name}
                  onChange={(e) => setMedicineForm({...medicineForm, name: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="dosage">{t('pharmacy.dosage')}</Label>
                <Input 
                  id="dosage" 
                  placeholder="500 mg"
                  value={medicineForm.dosage}
                  onChange={(e) => setMedicineForm({...medicineForm, dosage: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">{t('pharmacy.category')}</Label>
                <Select value={medicineForm.category} onValueChange={(value) => setMedicineForm({...medicineForm, category: value})}>
                  <SelectTrigger id="category">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cardiovascular">{t('pharmacy.cardiovascular')}</SelectItem>
                    <SelectItem value="antibiotic">{t('pharmacy.antibiotic')}</SelectItem>
                    <SelectItem value="endocrine">{t('pharmacy.endocrine')}</SelectItem>
                    <SelectItem value="analgesic">{t('pharmacy.analgesic')}</SelectItem>
                    <SelectItem value="respiratory">{t('pharmacy.respiratory')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="warehouse">{t('pharmacy.warehouse')}</Label>
                <Select value={medicineForm.warehouse} onValueChange={(value) => setMedicineForm({...medicineForm, warehouse: value})}>
                  <SelectTrigger id="warehouse">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="main">{t('pharmacy.mainWarehouse')}</SelectItem>
                    <SelectItem value="secondary">{t('pharmacy.secondaryWarehouse')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="stock">{t('pharmacy.currentStock')}</Label>
                <Input 
                  id="stock" 
                  type="number"
                  placeholder="100"
                  value={medicineForm.stock}
                  onChange={(e) => setMedicineForm({...medicineForm, stock: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="min-level">{t('pharmacy.minimumLevel')}</Label>
                <Input 
                  id="min-level" 
                  type="number"
                  placeholder="20"
                  value={medicineForm.minLevel}
                  onChange={(e) => setMedicineForm({...medicineForm, minLevel: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="price">{t('pharmacy.price')}</Label>
                <Input 
                  id="price" 
                  type="number"
                  step="0.01"
                  placeholder="15.50"
                  value={medicineForm.price}
                  onChange={(e) => setMedicineForm({...medicineForm, price: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="manufacturer">{t('pharmacy.manufacturer')}</Label>
                <Input 
                  id="manufacturer" 
                  placeholder={t('pharmacy.manufacturer')}
                  value={medicineForm.manufacturer}
                  onChange={(e) => setMedicineForm({...medicineForm, manufacturer: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="batch">{t('pharmacy.batchNumber')}</Label>
                <Input 
                  id="batch" 
                  placeholder="LC2024-001"
                  value={medicineForm.batchNumber}
                  onChange={(e) => setMedicineForm({...medicineForm, batchNumber: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="expiry">{t('pharmacy.expiryDate')}</Label>
              <Input 
                id="expiry" 
                type="date"
                value={medicineForm.expiryDate}
                onChange={(e) => setMedicineForm({...medicineForm, expiryDate: e.target.value})}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddMedicineDialogOpen(false)}>
              {t('common.cancel')}
            </Button>
            <Button className="bg-gradient-to-r from-purple-600 to-fuchsia-600" onClick={() => {
              console.log('New Medicine:', medicineForm);
              setIsAddMedicineDialogOpen(false);
              setMedicineForm({
                name: "",
                dosage: "",
                category: "cardiovascular",
                stock: "",
                minLevel: "",
                price: "",
                manufacturer: "",
                batchNumber: "",
                expiryDate: "",
                warehouse: "main"
              });
            }}>
              {t('common.save')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Supplier Dialog */}
      <Dialog open={isAddSupplierDialogOpen} onOpenChange={setIsAddSupplierDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-blue-700 flex items-center gap-2">
              <Truck className="w-6 h-6" />
              {t('pharmacy.addSupplier')}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="supplier-name">{t('pharmacy.supplierName')}</Label>
              <Input 
                id="supplier-name" 
                placeholder={t('pharmacy.supplierName')}
                value={supplierForm.name}
                onChange={(e) => setSupplierForm({...supplierForm, name: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contact">{t('pharmacy.contactPerson')}</Label>
                <Input 
                  id="contact" 
                  placeholder={t('pharmacy.contactPerson')}
                  value={supplierForm.contact}
                  onChange={(e) => setSupplierForm({...supplierForm, contact: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="rating">{t('pharmacy.rating')}</Label>
                <Select value={supplierForm.rating} onValueChange={(value) => setSupplierForm({...supplierForm, rating: value})}>
                  <SelectTrigger id="rating">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">⭐⭐⭐⭐⭐ (5)</SelectItem>
                    <SelectItem value="4">⭐⭐⭐⭐ (4)</SelectItem>
                    <SelectItem value="3">⭐⭐⭐ (3)</SelectItem>
                    <SelectItem value="2">⭐⭐ (2)</SelectItem>
                    <SelectItem value="1">⭐ (1)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">{t('pharmacy.email')}</Label>
                <Input 
                  id="email" 
                  type="email"
                  placeholder="supplier@example.com"
                  value={supplierForm.email}
                  onChange={(e) => setSupplierForm({...supplierForm, email: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">{t('pharmacy.phone')}</Label>
                <Input 
                  id="phone" 
                  type="tel"
                  placeholder="+966 XX XXX XXXX"
                  value={supplierForm.phone}
                  onChange={(e) => setSupplierForm({...supplierForm, phone: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">{t('pharmacy.address')}</Label>
              <Textarea 
                id="address" 
                rows={2}
                placeholder={t('pharmacy.address')}
                value={supplierForm.address}
                onChange={(e) => setSupplierForm({...supplierForm, address: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="products">{t('pharmacy.productsSupplied')}</Label>
              <Textarea 
                id="products" 
                rows={2}
                placeholder={t('pharmacy.productsSupplied')}
                value={supplierForm.productsSupplied}
                onChange={(e) => setSupplierForm({...supplierForm, productsSupplied: e.target.value})}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddSupplierDialogOpen(false)}>
              {t('common.cancel')}
            </Button>
            <Button className="bg-gradient-to-r from-blue-600 to-cyan-600" onClick={() => {
              console.log('New Supplier:', supplierForm);
              setIsAddSupplierDialogOpen(false);
              setSupplierForm({
                name: "",
                contact: "",
                email: "",
                phone: "",
                address: "",
                rating: "5",
                productsSupplied: ""
              });
            }}>
              {t('common.save')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dispense Medicine Dialog */}
      <Dialog open={isDispenseDialogOpen} onOpenChange={setIsDispenseDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl">
              <div className="rounded-full bg-gradient-to-br from-green-100 to-emerald-100 p-2">
                <ShoppingCart className="w-6 h-6 text-green-600" />
              </div>
              صرف دواء للمريض
            </DialogTitle>
            <p className="text-sm text-gray-500 mt-2">أدخل معلومات المريض والدواء المراد صرفه</p>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Patient Information Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
                <User className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-gray-900">معلومات المريض</h3>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dispensePatientId">
                    رقم ملف المريض <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="dispensePatientId"
                    placeholder="P-12345"
                    value={dispenseForm.patientId}
                    onChange={(e) => setDispenseForm({...dispenseForm, patientId: e.target.value})}
                    className="border-gray-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dispensePatientName">
                    اسم المريض <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="dispensePatientName"
                    placeholder="أحمد محمد"
                    value={dispenseForm.patientName}
                    onChange={(e) => setDispenseForm({...dispenseForm, patientName: e.target.value})}
                    className="border-gray-300"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dispenseType">نوع المريض</Label>
                <Select 
                  value={dispenseForm.type}
                  onValueChange={(value) => setDispenseForm({...dispenseForm, type: value})}
                >
                  <SelectTrigger className="border-gray-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="outpatient">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        مريض خارجي
                      </div>
                    </SelectItem>
                    <SelectItem value="inpatient">
                      <div className="flex items-center gap-2">
                        <Hospital className="w-4 h-4" />
                        مريض مُنوّم
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Medication Information Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
                <Pill className="w-5 h-5 text-green-600" />
                <h3 className="font-semibold text-gray-900">معلومات الدواء</h3>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dispenseMedication">
                    اسم الدواء <span className="text-red-500">*</span>
                  </Label>
                  <Select 
                    value={dispenseForm.medication}
                    onValueChange={(value) => {
                      const selectedMed = medicines.find(m => m.name === value);
                      setDispenseForm({
                        ...dispenseForm, 
                        medication: value,
                        dosage: selectedMed?.dosage || ""
                      });
                    }}
                  >
                    <SelectTrigger className="border-gray-300">
                      <SelectValue placeholder="اختر الدواء" />
                    </SelectTrigger>
                    <SelectContent>
                      {medicines.map((med) => (
                        <SelectItem key={med.name} value={med.name}>
                          <div className="flex items-center justify-between w-full gap-4">
                            <span>{med.name}</span>
                            <Badge variant="outline" className="text-xs">
                              متوفر: {med.stock}
                            </Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dispenseDosage">الجرعة</Label>
                  <Input
                    id="dispenseDosage"
                    placeholder="500 mg"
                    value={dispenseForm.dosage}
                    onChange={(e) => setDispenseForm({...dispenseForm, dosage: e.target.value})}
                    className="border-gray-300"
                    disabled={!dispenseForm.medication}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dispenseQuantity">
                    الكمية <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="dispenseQuantity"
                    type="number"
                    min="1"
                    placeholder="30"
                    value={dispenseForm.quantity}
                    onChange={(e) => setDispenseForm({...dispenseForm, quantity: e.target.value})}
                    className="border-gray-300"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dispensePrescriptionNumber">رقم الوصفة الطبية</Label>
                  <Input
                    id="dispensePrescriptionNumber"
                    placeholder="RX-2024-001"
                    value={dispenseForm.prescriptionNumber}
                    onChange={(e) => setDispenseForm({...dispenseForm, prescriptionNumber: e.target.value})}
                    className="border-gray-300"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dispensePrescribedBy">
                  الطبيب الواصف <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="dispensePrescribedBy"
                  placeholder="د. أحمد علي"
                  value={dispenseForm.prescribedBy}
                  onChange={(e) => setDispenseForm({...dispenseForm, prescribedBy: e.target.value})}
                  className="border-gray-300"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dispenseInstructions">تعليمات الاستخدام</Label>
                <Textarea
                  id="dispenseInstructions"
                  rows={3}
                  placeholder="قرص واحد ثلاث مرات يومياً بعد الأكل"
                  value={dispenseForm.instructions}
                  onChange={(e) => setDispenseForm({...dispenseForm, instructions: e.target.value})}
                  className="border-gray-300"
                />
              </div>
            </div>

            {/* Insurance Information Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
                <Shield className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-gray-900">معلومات التأمين</h3>
              </div>

              <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                <input
                  type="checkbox"
                  id="insuranceCovered"
                  checked={dispenseForm.insuranceCovered}
                  onChange={(e) => setDispenseForm({...dispenseForm, insuranceCovered: e.target.checked})}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <Label htmlFor="insuranceCovered" className="cursor-pointer">
                  الدواء مغطى بالتأمين
                </Label>
              </div>

              {dispenseForm.insuranceCovered && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dispenseInsuranceCompany">شركة التأمين</Label>
                    <Select 
                      value={dispenseForm.insuranceCompany}
                      onValueChange={(value) => setDispenseForm({...dispenseForm, insuranceCompany: value})}
                    >
                      <SelectTrigger className="border-gray-300">
                        <SelectValue placeholder="اختر شركة التأمين" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bupa">بوبا العربية</SelectItem>
                        <SelectItem value="tawuniya">التعاونية</SelectItem>
                        <SelectItem value="medgulf">ميدغلف</SelectItem>
                        <SelectItem value="alrajhi">الراجحي تكافل</SelectItem>
                        <SelectItem value="saico">سايكو</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dispenseCopay">مبلغ المشاركة (ريال)</Label>
                    <Input
                      id="dispenseCopay"
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="25.00"
                      value={dispenseForm.copayAmount}
                      onChange={(e) => setDispenseForm({...dispenseForm, copayAmount: e.target.value})}
                      className="border-gray-300"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Summary Section */}
            {dispenseForm.medication && dispenseForm.quantity && (
              <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-2 mb-3">
                  <Receipt className="w-5 h-5 text-green-600" />
                  <h3 className="font-semibold text-gray-900">ملخص الصرف</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">الدواء:</span>
                    <span className="font-semibold">{dispenseForm.medication} ({dispenseForm.dosage})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">الكمية:</span>
                    <span className="font-semibold">{dispenseForm.quantity} وحدة</span>
                  </div>
                  {medicines.find(m => m.name === dispenseForm.medication) && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-gray-600">سعر الوحدة:</span>
                        <span className="font-semibold">
                          {medicines.find(m => m.name === dispenseForm.medication)?.price} ريال
                        </span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-green-200">
                        <span className="text-gray-700 font-medium">المجموع:</span>
                        <span className="text-lg font-bold text-green-600">
                          {(medicines.find(m => m.name === dispenseForm.medication)?.price! * parseFloat(dispenseForm.quantity || "0")).toFixed(2)} ريال
                        </span>
                      </div>
                      {dispenseForm.insuranceCovered && dispenseForm.copayAmount && (
                        <div className="flex justify-between">
                          <span className="text-gray-700 font-medium">المبلغ المستحق:</span>
                          <span className="text-lg font-bold text-blue-600">
                            {parseFloat(dispenseForm.copayAmount).toFixed(2)} ريال
                          </span>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            )}
          </div>

          <DialogFooter className="gap-2">
            <Button 
              variant="outline" 
              onClick={() => {
                setIsDispenseDialogOpen(false);
                setDispenseForm({
                  patientId: "",
                  patientName: "",
                  medication: "",
                  dosage: "",
                  quantity: "",
                  prescriptionNumber: "",
                  prescribedBy: "",
                  insuranceCompany: "",
                  insuranceCovered: false,
                  copayAmount: "",
                  instructions: "",
                  type: "outpatient"
                });
              }}
            >
              إلغاء
            </Button>
            <Button 
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
              onClick={() => {
                // Validate required fields
                if (!dispenseForm.patientId || !dispenseForm.patientName || !dispenseForm.medication || !dispenseForm.quantity || !dispenseForm.prescribedBy) {
                  alert("الرجاء ملء جميع الحقول المطلوبة");
                  return;
                }

                // Check stock availability
                const selectedMed = medicines.find(m => m.name === dispenseForm.medication);
                if (selectedMed && parseFloat(dispenseForm.quantity) > selectedMed.stock) {
                  alert(`الكمية المتوفرة في المخزن: ${selectedMed.stock} فقط`);
                  return;
                }

                console.log('Dispensing Medicine:', dispenseForm);
                alert(`تم صرف ${dispenseForm.quantity} وحدة من ${dispenseForm.medication} للمريض ${dispenseForm.patientName} بنجاح!`);
                
                setIsDispenseDialogOpen(false);
                setDispenseForm({
                  patientId: "",
                  patientName: "",
                  medication: "",
                  dosage: "",
                  quantity: "",
                  prescriptionNumber: "",
                  prescribedBy: "",
                  insuranceCompany: "",
                  insuranceCovered: false,
                  copayAmount: "",
                  instructions: "",
                  type: "outpatient"
                });
              }}
              disabled={!dispenseForm.patientId || !dispenseForm.patientName || !dispenseForm.medication || !dispenseForm.quantity || !dispenseForm.prescribedBy}
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              تأكيد الصرف
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
