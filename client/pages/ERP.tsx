import { useTranslation } from "react-i18next";
import Layout from "@/components/Layout";
import {
  BarChart3,
  DollarSign,
  TrendingUp,
  Package,
  Users,
  ShoppingCart,
  FileText,
  PieChart,
  Activity,
  Calendar,
  Building2,
  Briefcase,
  Clock,
  AlertCircle,
  CheckCircle2,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  Download,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Settings,
  RefreshCw,
  TrendingDown,
  Target,
  Percent,
  CreditCard,
  Wallet,
  Receipt,
  Calculator,
} from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ERP() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [isAddPayableDialogOpen, setIsAddPayableDialogOpen] = useState(false);
  const [isAddReceivableDialogOpen, setIsAddReceivableDialogOpen] = useState(false);
  const [isAddAssetDialogOpen, setIsAddAssetDialogOpen] = useState(false);
  const [payableForm, setPayableForm] = useState({
    vendor: "",
    invoiceNo: "",
    amount: "",
    dueDate: "",
    description: "",
  });
  const [receivableForm, setReceivableForm] = useState({
    patient: "",
    invoiceNo: "",
    insurance: "",
    amount: "",
    dueDate: "",
    serviceDate: "",
  });
  const [assetForm, setAssetForm] = useState({
    name: "",
    category: "",
    purchaseValue: "",
    purchaseDate: "",
    warrantyExpiry: "",
    location: "",
    serialNumber: "",
  });

  const financialMetrics = {
    revenue: {
      current: 8450000,
      previous: 7850000,
      change: 7.6,
    },
    expenses: {
      current: 5280000,
      previous: 5450000,
      change: -3.1,
    },
    profit: {
      current: 3170000,
      previous: 2400000,
      change: 32.1,
    },
    cashFlow: {
      current: 2850000,
      previous: 2650000,
      change: 7.5,
    },
  };

  const inventoryData = [
    {
      id: "INV001",
      category: "Medical Supplies",
      itemCount: 1250,
      value: 450000,
      lowStock: 45,
      criticalStock: 12,
      lastUpdated: "2024-11-14 10:30",
    },
    {
      id: "INV002",
      category: "Pharmaceuticals",
      itemCount: 850,
      value: 1250000,
      lowStock: 28,
      criticalStock: 8,
      lastUpdated: "2024-11-14 09:15",
    },
    {
      id: "INV003",
      category: "Equipment",
      itemCount: 320,
      value: 2800000,
      lowStock: 15,
      criticalStock: 3,
      lastUpdated: "2024-11-14 08:00",
    },
    {
      id: "INV004",
      category: "Consumables",
      itemCount: 2100,
      value: 180000,
      lowStock: 85,
      criticalStock: 22,
      lastUpdated: "2024-11-14 11:00",
    },
  ];

  const purchaseOrders = [
    {
      id: "PO-2024-001",
      supplier: "MedEquip Saudi",
      items: "Surgical Instruments Set",
      amount: 125000,
      status: "Pending Approval",
      requestedBy: "Dr. Hassan Al-Rashid",
      date: "2024-11-12",
      expectedDelivery: "2024-11-20",
    },
    {
      id: "PO-2024-002",
      supplier: "PharmaCare Arabia",
      items: "Emergency Medications Bundle",
      amount: 89000,
      status: "Approved",
      requestedBy: "Pharmacy Manager",
      date: "2024-11-13",
      expectedDelivery: "2024-11-16",
    },
    {
      id: "PO-2024-003",
      supplier: "Hospital Supplies Co.",
      items: "PPE & Safety Equipment",
      amount: 45000,
      status: "In Transit",
      requestedBy: "Safety Officer",
      date: "2024-11-10",
      expectedDelivery: "2024-11-15",
    },
    {
      id: "PO-2024-004",
      supplier: "TechMed Solutions",
      items: "Patient Monitoring Systems",
      amount: 580000,
      status: "Delivered",
      requestedBy: "IT Department",
      date: "2024-11-01",
      expectedDelivery: "2024-11-12",
    },
  ];

  const hrMetrics = [
    {
      department: "Medical Staff",
      totalEmployees: 245,
      present: 232,
      absent: 8,
      onLeave: 5,
      overtime: 18,
      avgSalary: 18500,
    },
    {
      department: "Nursing",
      totalEmployees: 420,
      present: 398,
      absent: 12,
      onLeave: 10,
      overtime: 45,
      avgSalary: 9500,
    },
    {
      department: "Administration",
      totalEmployees: 85,
      present: 82,
      absent: 2,
      onLeave: 1,
      overtime: 5,
      avgSalary: 12000,
    },
    {
      department: "Support Services",
      totalEmployees: 150,
      present: 142,
      absent: 5,
      onLeave: 3,
      overtime: 12,
      avgSalary: 5500,
    },
  ];

  const revenueByDepartment = [
    { department: "Cardiology", revenue: 1850000, patients: 450, avgRevenue: 4111 },
    { department: "Orthopedics", revenue: 1620000, patients: 580, avgRevenue: 2793 },
    { department: "Pediatrics", revenue: 980000, patients: 890, avgRevenue: 1101 },
    { department: "ICU", revenue: 2100000, patients: 68, avgRevenue: 30882 },
    { department: "Surgery", revenue: 1900000, patients: 245, avgRevenue: 7755 },
  ];

  const budgetAllocation = [
    {
      category: "Salaries & Benefits",
      allocated: 4200000,
      spent: 3850000,
      remaining: 350000,
      percentage: 92,
    },
    {
      category: "Medical Supplies",
      allocated: 1500000,
      spent: 1280000,
      remaining: 220000,
      percentage: 85,
    },
    {
      category: "Equipment",
      allocated: 2000000,
      spent: 1650000,
      remaining: 350000,
      percentage: 83,
    },
    {
      category: "Facilities & Maintenance",
      allocated: 800000,
      spent: 620000,
      remaining: 180000,
      percentage: 78,
    },
    {
      category: "Technology & IT",
      allocated: 600000,
      spent: 480000,
      remaining: 120000,
      percentage: 80,
    },
  ];

  const accountsPayable = [
    {
      id: "AP-001",
      vendor: "MedEquip Saudi",
      invoiceNo: "INV-2024-1245",
      amount: 125000,
      dueDate: "2024-11-20",
      status: "Pending",
      days: 6,
    },
    {
      id: "AP-002",
      vendor: "PharmaCare Arabia",
      invoiceNo: "INV-2024-1246",
      amount: 89000,
      dueDate: "2024-11-18",
      status: "Approved",
      days: 4,
    },
    {
      id: "AP-003",
      vendor: "Hospital Supplies Co.",
      invoiceNo: "INV-2024-1247",
      amount: 45000,
      dueDate: "2024-11-15",
      status: "Overdue",
      days: -1,
    },
    {
      id: "AP-004",
      vendor: "TechMed Solutions",
      invoiceNo: "INV-2024-1248",
      amount: 580000,
      dueDate: "2024-11-25",
      status: "Scheduled",
      days: 11,
    },
  ];

  const accountsReceivable = [
    {
      id: "AR-001",
      patient: "Ahmed Al-Mansouri",
      invoiceNo: "PAT-2024-5678",
      amount: 15000,
      dueDate: "2024-11-16",
      status: "Pending",
      days: 2,
      insurance: "Bupa Arabia",
    },
    {
      id: "AR-002",
      patient: "Fatima Hassan",
      invoiceNo: "PAT-2024-5679",
      amount: 8500,
      dueDate: "2024-11-14",
      status: "Overdue",
      days: 0,
      insurance: "Tawuniya",
    },
    {
      id: "AR-003",
      patient: "Mohammed Ali",
      invoiceNo: "PAT-2024-5680",
      amount: 12000,
      dueDate: "2024-11-22",
      status: "Paid",
      days: 8,
      insurance: "Medgulf",
    },
    {
      id: "AR-004",
      patient: "Sarah Abdullah",
      invoiceNo: "PAT-2024-5681",
      amount: 25000,
      dueDate: "2024-11-28",
      status: "Pending",
      days: 14,
      insurance: "Tawuniya",
    },
  ];

  const assetManagement = [
    {
      id: "AST-001",
      name: "MRI Machine - Siemens",
      category: "Medical Equipment",
      value: 2500000,
      purchaseDate: "2022-03-15",
      warranty: "2025-03-15",
      status: "Operational",
      depreciation: 625000,
      currentValue: 1875000,
    },
    {
      id: "AST-002",
      name: "Patient Monitoring Systems",
      category: "Medical Equipment",
      value: 850000,
      purchaseDate: "2023-06-20",
      warranty: "2026-06-20",
      status: "Operational",
      depreciation: 170000,
      currentValue: 680000,
    },
    {
      id: "AST-003",
      name: "Hospital Beds (50 units)",
      category: "Furniture",
      value: 500000,
      purchaseDate: "2021-09-10",
      warranty: "2024-09-10",
      status: "Under Maintenance",
      depreciation: 250000,
      currentValue: 250000,
    },
    {
      id: "AST-004",
      name: "Surgical Instruments Set",
      category: "Medical Equipment",
      value: 320000,
      purchaseDate: "2023-11-01",
      warranty: "2028-11-01",
      status: "Operational",
      depreciation: 32000,
      currentValue: 288000,
    },
  ];

  const cashFlowData = [
    {
      month: "June",
      inflow: 7200000,
      outflow: 5100000,
      net: 2100000,
    },
    {
      month: "July",
      inflow: 7850000,
      outflow: 5300000,
      net: 2550000,
    },
    {
      month: "August",
      inflow: 7650000,
      outflow: 5450000,
      net: 2200000,
    },
    {
      month: "September",
      inflow: 8100000,
      outflow: 5200000,
      net: 2900000,
    },
    {
      month: "October",
      inflow: 7850000,
      outflow: 5450000,
      net: 2400000,
    },
    {
      month: "November",
      inflow: 8450000,
      outflow: 5280000,
      net: 3170000,
    },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              {t('erp.title')}
            </h1>
            <p className="text-slate-600 mt-1">
              {t('erp.subtitle')}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" />
              {t('common.filter')}
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              {t('common.export')} Report
            </Button>
          </div>
        </div>

        {/* Financial KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">{t('erp.totalRevenue')}</p>
                  <p className="text-2xl font-bold text-slate-900">
                    SAR {(financialMetrics.revenue.current / 1000000).toFixed(2)}M
                  </p>
                  <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                    <ArrowUpRight className="w-3 h-3" />
                    {financialMetrics.revenue.change}% {t('erp.fromLastMonth')}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">{t('erp.totalExpenses')}</p>
                  <p className="text-2xl font-bold text-slate-900">
                    SAR {(financialMetrics.expenses.current / 1000000).toFixed(2)}M
                  </p>
                  <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                    <ArrowDownRight className="w-3 h-3" />
                    {Math.abs(financialMetrics.expenses.change)}% {t('erp.reduction')}
                  </p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">{t('erp.netProfit')}</p>
                  <p className="text-2xl font-bold text-slate-900">
                    SAR {(financialMetrics.profit.current / 1000000).toFixed(2)}M
                  </p>
                  <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                    <ArrowUpRight className="w-3 h-3" />
                    {financialMetrics.profit.change}% {t('erp.increase')}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <PieChart className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">{t('erp.cashFlow')}</p>
                  <p className="text-2xl font-bold text-slate-900">
                    SAR {(financialMetrics.cashFlow.current / 1000000).toFixed(2)}M
                  </p>
                  <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                    <ArrowUpRight className="w-3 h-3" />
                    {financialMetrics.cashFlow.change}% increase
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Activity className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-9">
            <TabsTrigger value="dashboard">{t('erp.dashboard')}</TabsTrigger>
            <TabsTrigger value="inventory">{t('erp.inventory')}</TabsTrigger>
            <TabsTrigger value="procurement">{t('erp.procurement')}</TabsTrigger>
            <TabsTrigger value="hr">{t('erp.hr')}</TabsTrigger>
            <TabsTrigger value="budget">{t('erp.budget')}</TabsTrigger>
            <TabsTrigger value="revenue">{t('erp.revenue')}</TabsTrigger>
            <TabsTrigger value="accounting">{t('erp.accounting')}</TabsTrigger>
            <TabsTrigger value="assets">{t('erp.assets')}</TabsTrigger>
            <TabsTrigger value="cashflow">{t('erp.cashflow')}</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>{t('erp.revenueByDepartment')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {revenueByDepartment.map((dept) => (
                      <div key={dept.department} className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium">{dept.department}</span>
                            <span className="text-sm font-bold text-green-600">
                              SAR {(dept.revenue / 1000).toFixed(0)}K
                            </span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{
                                width: `${(dept.revenue / 2100000) * 100}%`,
                              }}
                            />
                          </div>
                          <p className="text-xs text-slate-500 mt-1">
                            {dept.patients} {t('erp.patients')} • Avg: SAR {dept.avgRevenue}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t('erp.inventoryOverview')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {inventoryData.map((inv) => (
                      <div key={inv.id} className="border border-slate-200 rounded-lg p-3">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-slate-900">{inv.category}</h4>
                            <p className="text-sm text-slate-600">{inv.itemCount} {t('erp.items')}</p>
                          </div>
                          <Badge
                            variant={inv.criticalStock > 0 ? "destructive" : "outline"}
                          >
                            {inv.criticalStock > 0
                              ? `${inv.criticalStock} ${t('erp.critical')}`
                              : t('erp.stockOk')}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-600">{t('erp.value')}:</span>
                          <span className="font-medium">
                            SAR {(inv.value / 1000).toFixed(0)}K
                          </span>
                        </div>
                        {inv.lowStock > 0 && (
                          <p className="text-xs text-orange-600 mt-1">
                            <AlertCircle className="w-3 h-3 inline mr-1" />
                            {inv.lowStock} {t('erp.items')} {t('erp.lowStock')}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="inventory" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{t('erp.inventory')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-3 px-4 text-sm font-semibold">{t('erp.category')}</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold">{t('erp.items')}</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold">{t('erp.value')}</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold">{t('erp.lowStock')}</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold">{t('erp.critical')}</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold">
                          Last Updated
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {inventoryData.map((inv) => (
                        <tr key={inv.id} className="hover:bg-slate-50">
                          <td className="py-3 px-4 font-medium">{inv.category}</td>
                          <td className="py-3 px-4">{inv.itemCount}</td>
                          <td className="py-3 px-4">SAR {inv.value.toLocaleString()}</td>
                          <td className="py-3 px-4">
                            <Badge variant={inv.lowStock > 30 ? "destructive" : "secondary"}>
                              {inv.lowStock}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <Badge variant={inv.criticalStock > 0 ? "destructive" : "default"}>
                              {inv.criticalStock}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-sm text-slate-600">
                            {inv.lastUpdated}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="procurement" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{t('erp.purchaseOrders')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {purchaseOrders.map((po) => (
                    <div key={po.id} className="border border-slate-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-slate-900">{po.id}</h4>
                          <p className="text-sm text-slate-600">{po.supplier}</p>
                        </div>
                        <Badge
                          variant={
                            po.status === "Delivered"
                              ? "default"
                              : po.status === "In Transit"
                              ? "secondary"
                              : "outline"
                          }
                        >
                          {po.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-700 mb-2">{po.items}</p>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <p className="text-slate-500">{t('erp.amount')}</p>
                          <p className="font-semibold text-green-600">
                            SAR {po.amount.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-slate-500">{t('erp.expectedDelivery')}</p>
                          <p className="font-medium">{po.expectedDelivery}</p>
                        </div>
                        <div>
                          <p className="text-slate-500">{t('erp.requestedBy')}</p>
                          <p className="font-medium">{po.requestedBy}</p>
                        </div>
                        <div>
                          <p className="text-slate-500">{t('erp.orderDate')}</p>
                          <p className="font-medium">{po.date}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="hr" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{t('erp.hrOverview')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {hrMetrics.map((dept) => {
                    const attendanceRate = Math.round((dept.present / dept.totalEmployees) * 100);

                    return (
                      <div key={dept.department} className="border border-slate-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-slate-900">{dept.department}</h4>
                          <Badge>{dept.totalEmployees} {t('erp.employees')}</Badge>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 text-sm">
                          <div className="bg-green-50 rounded p-2">
                            <p className="text-slate-600">{t('erp.present')}</p>
                            <p className="font-bold text-green-700">{dept.present}</p>
                          </div>
                          <div className="bg-red-50 rounded p-2">
                            <p className="text-slate-600">{t('erp.absent')}</p>
                            <p className="font-bold text-red-700">{dept.absent}</p>
                          </div>
                          <div className="bg-blue-50 rounded p-2">
                            <p className="text-slate-600">{t('erp.onLeave')}</p>
                            <p className="font-bold text-blue-700">{dept.onLeave}</p>
                          </div>
                          <div className="bg-orange-50 rounded p-2">
                            <p className="text-slate-600">{t('erp.overtime')}</p>
                            <p className="font-bold text-orange-700">{dept.overtime}</p>
                          </div>
                          <div className="bg-purple-50 rounded p-2">
                            <p className="text-slate-600">{t('erp.attendance')}</p>
                            <p className="font-bold text-purple-700">{attendanceRate}%</p>
                          </div>
                          <div className="bg-slate-100 rounded p-2">
                            <p className="text-slate-600">{t('erp.avgSalary')}</p>
                            <p className="font-bold text-slate-700">
                              SAR {dept.avgSalary.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="budget" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{t('erp.budgetAllocation')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {budgetAllocation.map((budget) => (
                    <div key={budget.category} className="border border-slate-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-slate-900">{budget.category}</h4>
                        <Badge
                          variant={
                            budget.percentage > 90
                              ? "destructive"
                              : budget.percentage > 80
                              ? "secondary"
                              : "default"
                          }
                        >
                          {budget.percentage}% {t('erp.used')}
                        </Badge>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-3 mb-2">
                        <div
                          className={`h-3 rounded-full ${
                            budget.percentage > 90
                              ? "bg-red-600"
                              : budget.percentage > 80
                              ? "bg-orange-600"
                              : "bg-green-600"
                          }`}
                          style={{ width: `${budget.percentage}%` }}
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-slate-600">{t('erp.allocated')}</p>
                          <p className="font-bold text-slate-900">
                            SAR {(budget.allocated / 1000000).toFixed(2)}M
                          </p>
                        </div>
                        <div>
                          <p className="text-slate-600">{t('erp.spent')}</p>
                          <p className="font-bold text-red-600">
                            SAR {(budget.spent / 1000000).toFixed(2)}M
                          </p>
                        </div>
                        <div>
                          <p className="text-slate-600">{t('erp.remaining')}</p>
                          <p className="font-bold text-green-600">
                            SAR {(budget.remaining / 1000000).toFixed(2)}M
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="revenue" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{t('erp.revenueAnalysis')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {revenueByDepartment.map((dept) => {
                    const revenuePercentage = Math.round((dept.revenue / 8450000) * 100);

                    return (
                      <div key={dept.department} className="border border-slate-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-slate-900">{dept.department}</h4>
                          <div className="text-right">
                            <p className="font-bold text-green-600">
                              SAR {(dept.revenue / 1000000).toFixed(2)}M
                            </p>
                            <p className="text-xs text-slate-500">{revenuePercentage}% {t('erp.ofTotal')}</p>
                          </div>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2 mb-2">
                          <div
                            className="bg-green-600 h-2 rounded-full"
                            style={{ width: `${revenuePercentage}%` }}
                          />
                        </div>
                        <div className="flex items-center justify-between text-sm text-slate-600">
                          <span>{dept.patients} {t('erp.patients')} served</span>
                          <span>{t('erp.avgRevenue')}: SAR {dept.avgRevenue.toLocaleString()}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Accounting Tab */}
          <TabsContent value="accounting" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Accounts Payable */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-red-600" />
                    {t('erp.accountsPayable')}
                  </CardTitle>
                  <Button onClick={() => setIsAddPayableDialogOpen(true)} size="sm" variant="outline">
                    <Plus className="w-4 h-4 mr-1" />
                    {t('common.add')}
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {accountsPayable.map((ap) => (
                      <div key={ap.id} className="border border-slate-200 rounded-lg p-3">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-sm">{ap.vendor}</h4>
                            <p className="text-xs text-slate-600">{ap.invoiceNo}</p>
                          </div>
                          <Badge
                            variant={
                              ap.status === "Overdue"
                                ? "destructive"
                                : ap.status === "Approved"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {ap.status}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-bold text-red-600">
                            SAR {ap.amount.toLocaleString()}
                          </span>
                          <span className="text-slate-600">
                            {t('erp.dueDate')}: {ap.dueDate}
                            {ap.days < 0 && (
                              <span className="text-red-600 ml-1">
                                ({Math.abs(ap.days)} {t('erp.daysOverdue')})
                              </span>
                            )}
                            {ap.days > 0 && (
                              <span className="text-slate-500 ml-1">
                                ({ap.days} {t('erp.days')})
                              </span>
                            )}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-200">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">{t('erp.totalPayable')}:</span>
                      <span className="font-bold text-lg text-red-600">
                        SAR {accountsPayable.reduce((sum, ap) => sum + ap.amount, 0).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Accounts Receivable */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Wallet className="w-5 h-5 text-green-600" />
                    {t('erp.accountsReceivable')}
                  </CardTitle>
                  <Button onClick={() => setIsAddReceivableDialogOpen(true)} size="sm" variant="outline">
                    <Plus className="w-4 h-4 mr-1" />
                    {t('common.add')}
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {accountsReceivable.map((ar) => (
                      <div key={ar.id} className="border border-slate-200 rounded-lg p-3">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-sm">{ar.patient}</h4>
                            <p className="text-xs text-slate-600">{ar.invoiceNo}</p>
                            <p className="text-xs text-blue-600">{ar.insurance}</p>
                          </div>
                          <Badge
                            variant={
                              ar.status === "Paid"
                                ? "default"
                                : ar.status === "Overdue"
                                ? "destructive"
                                : "secondary"
                            }
                          >
                            {ar.status}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-bold text-green-600">
                            SAR {ar.amount.toLocaleString()}
                          </span>
                          <span className="text-slate-600">
                            {t('erp.dueDate')}: {ar.dueDate}
                            {ar.days === 0 && ar.status === "Overdue" && (
                              <span className="text-red-600 ml-1">(Today)</span>
                            )}
                            {ar.days > 0 && (
                              <span className="text-slate-500 ml-1">({ar.days} {t('erp.days')})</span>
                            )}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-200">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">{t('erp.totalReceivable')}:</span>
                      <span className="font-bold text-lg text-green-600">
                        SAR {accountsReceivable.reduce((sum, ar) => sum + ar.amount, 0).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Assets Tab */}
          <TabsContent value="assets" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-blue-600" />
                  {t('erp.assetManagement')}
                </CardTitle>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Filter className="w-4 h-4 mr-1" />
                    {t('common.filter')}
                  </Button>
                  <Button onClick={() => setIsAddAssetDialogOpen(true)} size="sm">
                    <Plus className="w-4 h-4 mr-1" />
                    {t('common.add')} Asset
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-3 px-4 text-sm font-semibold">{t('erp.assetName')}</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold">{t('erp.category')}</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold">{t('erp.purchaseValue')}</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold">{t('erp.currentValue')}</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold">{t('erp.depreciation')}</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold">{t('erp.warranty')}</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold">{t('common.status')}</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold">{t('common.actions')}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {assetManagement.map((asset) => (
                        <tr key={asset.id} className="hover:bg-slate-50">
                          <td className="py-3 px-4">
                            <div>
                              <p className="font-medium text-sm">{asset.name}</p>
                              <p className="text-xs text-slate-600">{asset.id}</p>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-sm">{asset.category}</td>
                          <td className="py-3 px-4 text-sm font-medium">
                            SAR {asset.value.toLocaleString()}
                          </td>
                          <td className="py-3 px-4 text-sm font-medium text-green-600">
                            SAR {asset.currentValue.toLocaleString()}
                          </td>
                          <td className="py-3 px-4 text-sm text-red-600">
                            -SAR {asset.depreciation.toLocaleString()}
                          </td>
                          <td className="py-3 px-4 text-xs text-slate-600">{asset.warranty}</td>
                          <td className="py-3 px-4">
                            <Badge
                              variant={
                                asset.status === "Operational" ? "default" : "secondary"
                              }
                            >
                              {asset.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex gap-2">
                              <Button size="sm" variant="ghost">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="ghost">
                                <Edit className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="text-sm text-blue-700 font-medium">{t('erp.totalAssetValue')}</p>
                    <p className="text-2xl font-bold text-blue-900">
                      SAR {(assetManagement.reduce((sum, a) => sum + a.value, 0) / 1000000).toFixed(2)}M
                    </p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <p className="text-sm text-green-700 font-medium">{t('erp.currentValue')}</p>
                    <p className="text-2xl font-bold text-green-900">
                      SAR {(assetManagement.reduce((sum, a) => sum + a.currentValue, 0) / 1000000).toFixed(2)}M
                    </p>
                  </div>
                  <div className="bg-red-50 rounded-lg p-4">
                    <p className="text-sm text-red-700 font-medium">{t('erp.totalDepreciation')}</p>
                    <p className="text-2xl font-bold text-red-900">
                      SAR {(assetManagement.reduce((sum, a) => sum + a.depreciation, 0) / 1000000).toFixed(2)}M
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Cash Flow Tab */}
          <TabsContent value="cashflow" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-purple-600" />
                  {t('erp.cashFlowAnalysis')} ({t('erp.lastMonths')})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cashFlowData.map((month) => (
                    <div key={month.month} className="border border-slate-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-slate-900">{month.month} 2024</h4>
                        <Badge variant={month.net > 2500000 ? "default" : "secondary"}>
                          {t('erp.netCashFlow')}: SAR {(month.net / 1000000).toFixed(2)}M
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="bg-green-50 rounded-lg p-3">
                          <p className="text-xs text-green-700 font-medium mb-1">{t('erp.cashInflow')}</p>
                          <p className="text-lg font-bold text-green-900">
                            SAR {(month.inflow / 1000000).toFixed(2)}M
                          </p>
                          <TrendingUp className="w-4 h-4 text-green-600 mt-1" />
                        </div>
                        <div className="bg-red-50 rounded-lg p-3">
                          <p className="text-xs text-red-700 font-medium mb-1">{t('erp.cashOutflow')}</p>
                          <p className="text-lg font-bold text-red-900">
                            SAR {(month.outflow / 1000000).toFixed(2)}M
                          </p>
                          <TrendingDown className="w-4 h-4 text-red-600 mt-1" />
                        </div>
                        <div className="bg-blue-50 rounded-lg p-3">
                          <p className="text-xs text-blue-700 font-medium mb-1">{t('erp.netCashFlow')}</p>
                          <p className="text-lg font-bold text-blue-900">
                            SAR {(month.net / 1000000).toFixed(2)}M
                          </p>
                          <Calculator className="w-4 h-4 text-blue-600 mt-1" />
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
                          <span>{t('erp.operatingMargin')}</span>
                          <span className="font-semibold">
                            {Math.round((month.net / month.inflow) * 100)}%
                          </span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-green-600 to-blue-600 h-2 rounded-full"
                            style={{ width: `${(month.net / month.inflow) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
                    <Receipt className="w-8 h-8 text-blue-600 mb-2" />
                    <p className="text-sm text-blue-700 font-medium">{t('erp.avgMonthlyInflow')}</p>
                    <p className="text-2xl font-bold text-blue-900">
                      SAR {(cashFlowData.reduce((sum, m) => sum + m.inflow, 0) / cashFlowData.length / 1000000).toFixed(2)}M
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-4">
                    <CreditCard className="w-8 h-8 text-red-600 mb-2" />
                    <p className="text-sm text-red-700 font-medium">{t('erp.avgMonthlyOutflow')}</p>
                    <p className="text-2xl font-bold text-red-900">
                      SAR {(cashFlowData.reduce((sum, m) => sum + m.outflow, 0) / cashFlowData.length / 1000000).toFixed(2)}M
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4">
                    <Target className="w-8 h-8 text-green-600 mb-2" />
                    <p className="text-sm text-green-700 font-medium">{t('erp.avgNetCashFlow')}</p>
                    <p className="text-2xl font-bold text-green-900">
                      SAR {(cashFlowData.reduce((sum, m) => sum + m.net, 0) / cashFlowData.length / 1000000).toFixed(2)}M
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4">
                    <Percent className="w-8 h-8 text-purple-600 mb-2" />
                    <p className="text-sm text-purple-700 font-medium">{t('erp.avgOperatingMargin')}</p>
                    <p className="text-2xl font-bold text-purple-900">
                      {Math.round((cashFlowData.reduce((sum, m) => sum + m.net, 0) / cashFlowData.reduce((sum, m) => sum + m.inflow, 0)) * 100)}%
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Add Accounts Payable Dialog */}
        <Dialog open={isAddPayableDialogOpen} onOpenChange={setIsAddPayableDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-red-600" />
                Add Accounts Payable
              </DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2 col-span-2">
                <Label htmlFor="vendor">Vendor Name</Label>
                <Input
                  id="vendor"
                  value={payableForm.vendor}
                  onChange={(e) => setPayableForm({ ...payableForm, vendor: e.target.value })}
                  placeholder="e.g., MedSupply Global"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="payableInvoiceNo">Invoice Number</Label>
                <Input
                  id="payableInvoiceNo"
                  value={payableForm.invoiceNo}
                  onChange={(e) => setPayableForm({ ...payableForm, invoiceNo: e.target.value })}
                  placeholder="INV-2024-XXX"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="payableAmount">Amount (SAR)</Label>
                <Input
                  id="payableAmount"
                  type="number"
                  value={payableForm.amount}
                  onChange={(e) => setPayableForm({ ...payableForm, amount: e.target.value })}
                  placeholder="25000"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="payableDueDate">Due Date</Label>
                <Input
                  id="payableDueDate"
                  type="date"
                  value={payableForm.dueDate}
                  onChange={(e) => setPayableForm({ ...payableForm, dueDate: e.target.value })}
                />
              </div>
              <div className="space-y-2 col-span-2">
                <Label htmlFor="payableDescription">Description</Label>
                <Textarea
                  id="payableDescription"
                  value={payableForm.description}
                  onChange={(e) => setPayableForm({ ...payableForm, description: e.target.value })}
                  placeholder="Medical equipment order"
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddPayableDialogOpen(false)}>
                {t('common.cancel')}
              </Button>
              <Button
                onClick={() => {
                  console.log('New Payable:', payableForm);
                  setPayableForm({
                    vendor: "",
                    invoiceNo: "",
                    amount: "",
                    dueDate: "",
                    description: "",
                  });
                  setIsAddPayableDialogOpen(false);
                }}
              >
                Add Payable
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Add Accounts Receivable Dialog */}
        <Dialog open={isAddReceivableDialogOpen} onOpenChange={setIsAddReceivableDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Wallet className="w-5 h-5 text-green-600" />
                Add Accounts Receivable
              </DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="patient">Patient Name</Label>
                <Input
                  id="patient"
                  value={receivableForm.patient}
                  onChange={(e) => setReceivableForm({ ...receivableForm, patient: e.target.value })}
                  placeholder="Enter patient name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="receivableInvoiceNo">Invoice Number</Label>
                <Input
                  id="receivableInvoiceNo"
                  value={receivableForm.invoiceNo}
                  onChange={(e) => setReceivableForm({ ...receivableForm, invoiceNo: e.target.value })}
                  placeholder="INV-2024-XXX"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="insurance">Insurance Provider</Label>
                <Select
                  value={receivableForm.insurance}
                  onValueChange={(value) => setReceivableForm({ ...receivableForm, insurance: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select insurance" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Bupa Arabia">Bupa Arabia</SelectItem>
                    <SelectItem value="Tawuniya">Tawuniya</SelectItem>
                    <SelectItem value="Medgulf">Medgulf</SelectItem>
                    <SelectItem value="Self-Pay">Self-Pay</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="receivableAmount">Amount (SAR)</Label>
                <Input
                  id="receivableAmount"
                  type="number"
                  value={receivableForm.amount}
                  onChange={(e) => setReceivableForm({ ...receivableForm, amount: e.target.value })}
                  placeholder="5500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="serviceDate">Service Date</Label>
                <Input
                  id="serviceDate"
                  type="date"
                  value={receivableForm.serviceDate}
                  onChange={(e) => setReceivableForm({ ...receivableForm, serviceDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="receivableDueDate">Payment Due Date</Label>
                <Input
                  id="receivableDueDate"
                  type="date"
                  value={receivableForm.dueDate}
                  onChange={(e) => setReceivableForm({ ...receivableForm, dueDate: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddReceivableDialogOpen(false)}>
                {t('common.cancel')}
              </Button>
              <Button
                onClick={() => {
                  console.log('New Receivable:', receivableForm);
                  setReceivableForm({
                    patient: "",
                    invoiceNo: "",
                    insurance: "",
                    amount: "",
                    dueDate: "",
                    serviceDate: "",
                  });
                  setIsAddReceivableDialogOpen(false);
                }}
              >
                Add Receivable
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Add Asset Dialog */}
        <Dialog open={isAddAssetDialogOpen} onOpenChange={setIsAddAssetDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Package className="w-5 h-5 text-blue-600" />
                Add New Asset
              </DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2 col-span-2">
                <Label htmlFor="assetName">Asset Name</Label>
                <Input
                  id="assetName"
                  value={assetForm.name}
                  onChange={(e) => setAssetForm({ ...assetForm, name: e.target.value })}
                  placeholder="e.g., MRI Machine"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="assetCategory">Category</Label>
                <Select
                  value={assetForm.category}
                  onValueChange={(value) => setAssetForm({ ...assetForm, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Medical Equipment">Medical Equipment</SelectItem>
                    <SelectItem value="IT Equipment">IT Equipment</SelectItem>
                    <SelectItem value="Furniture">Furniture</SelectItem>
                    <SelectItem value="Vehicles">Vehicles</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="serialNumber">Serial Number</Label>
                <Input
                  id="serialNumber"
                  value={assetForm.serialNumber}
                  onChange={(e) => setAssetForm({ ...assetForm, serialNumber: e.target.value })}
                  placeholder="SN-2024-XXX"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="purchaseValue">Purchase Value (SAR)</Label>
                <Input
                  id="purchaseValue"
                  type="number"
                  value={assetForm.purchaseValue}
                  onChange={(e) => setAssetForm({ ...assetForm, purchaseValue: e.target.value })}
                  placeholder="450000"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="purchaseDate">Purchase Date</Label>
                <Input
                  id="purchaseDate"
                  type="date"
                  value={assetForm.purchaseDate}
                  onChange={(e) => setAssetForm({ ...assetForm, purchaseDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="warrantyExpiry">Warranty Expiry</Label>
                <Input
                  id="warrantyExpiry"
                  type="date"
                  value={assetForm.warrantyExpiry}
                  onChange={(e) => setAssetForm({ ...assetForm, warrantyExpiry: e.target.value })}
                />
              </div>
              <div className="space-y-2 col-span-2">
                <Label htmlFor="assetLocation">Location</Label>
                <Input
                  id="assetLocation"
                  value={assetForm.location}
                  onChange={(e) => setAssetForm({ ...assetForm, location: e.target.value })}
                  placeholder="Building A, Floor 2, Radiology"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddAssetDialogOpen(false)}>
                {t('common.cancel')}
              </Button>
              <Button
                onClick={() => {
                  console.log('New Asset:', assetForm);
                  setAssetForm({
                    name: "",
                    category: "",
                    purchaseValue: "",
                    purchaseDate: "",
                    warrantyExpiry: "",
                    location: "",
                    serialNumber: "",
                  });
                  setIsAddAssetDialogOpen(false);
                }}
              >
                Add Asset
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
}
