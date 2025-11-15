import Layout from "@/components/Layout";
import {
  Search,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Plus,
  Filter,
  Calendar,
  AlertCircle,
  ArrowRight,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  Building2,
  Users,
  Pill,
  Scissors,
  Wrench,
  UtensilsCrossed,
  FileText,
  BarChart3,
  Download,
  Receipt,
  CreditCard,
  Wallet,
  Package,
} from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const InvoiceCard = ({
  invoiceNumber,
  patientName,
  date,
  amount,
  status,
  dueDate,
  description,
}: {
  invoiceNumber: string;
  patientName: string;
  date: string;
  amount: number;
  status: "paid" | "pending" | "overdue" | "cancelled";
  dueDate: string;
  description: string;
}) => {
  const statusConfig = {
    paid: { bg: "bg-green-50", badge: "Paid", color: "text-green-700" },
    pending: { bg: "bg-yellow-50", badge: "Pending", color: "text-yellow-700" },
    overdue: { bg: "bg-red-50", badge: "Overdue", color: "text-red-700" },
    cancelled: { bg: "bg-slate-50", badge: "Cancelled", color: "text-slate-700" },
  };

  const config = statusConfig[status];

  return (
    <div className={`${config.bg} rounded-lg border border-slate-200 p-6 hover:shadow-md transition-shadow`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{patientName}</h3>
          <p className="text-sm text-slate-500">Invoice #{invoiceNumber}</p>
        </div>
        <span className={`text-xs font-semibold px-3 py-1 rounded-full bg-white border ${config.color} border-current`}>
          {config.badge}
        </span>
      </div>

      <div className="space-y-2 text-sm text-slate-600 mb-4">
        <p className="font-medium text-slate-900">{description}</p>
        <div className="flex items-center justify-between">
          <span>Amount:</span>
          <span className="font-bold text-slate-900">SAR {amount.toLocaleString()}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Invoice Date:</span>
          <span className="font-medium text-slate-900">{date}</span>
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-slate-300">
          <span>Due Date:</span>
          <span className="font-medium text-slate-900">{dueDate}</span>
        </div>
      </div>

      <button className="w-full bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-2">
        View Invoice <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};

const PaymentRecord = ({
  paymentId,
  patientName,
  amount,
  date,
  method,
  invoiceNumber,
  reference,
}: {
  paymentId: string;
  patientName: string;
  amount: number;
  date: string;
  method: string;
  invoiceNumber: string;
  reference: string;
}) => (
  <div className="flex items-center justify-between py-4 border-b border-slate-200 last:border-b-0">
    <div className="flex-1">
      <p className="font-semibold text-slate-900">{patientName}</p>
      <p className="text-xs text-slate-500">
        {method} • Invoice #{invoiceNumber}
      </p>
    </div>
    <div className="flex items-center gap-6">
      <div className="text-right">
        <p className="font-bold text-green-600">+SAR {amount.toLocaleString()}</p>
        <p className="text-xs text-slate-500">{date}</p>
      </div>
      <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
        {reference}
      </span>
    </div>
  </div>
);

const ExpenseItem = ({
  category,
  amount,
  date,
  vendor,
  description,
  status,
}: {
  category: string;
  amount: number;
  date: string;
  vendor: string;
  description: string;
  status: "approved" | "pending" | "rejected";
}) => {
  const statusConfig = {
    approved: { color: "text-green-700", bg: "bg-green-50" },
    pending: { color: "text-yellow-700", bg: "bg-yellow-50" },
    rejected: { color: "text-red-700", bg: "bg-red-50" },
  };

  const config = statusConfig[status];

  return (
    <div className="border-b border-slate-200 py-4 last:border-b-0">
      <div className="flex items-start justify-between mb-2">
        <div>
          <p className="font-semibold text-slate-900">{description}</p>
          <p className="text-xs text-slate-500">{category} • {vendor}</p>
        </div>
        <div className="text-right">
          <p className="font-bold text-red-600">-SAR {amount.toLocaleString()}</p>
          <p className="text-xs text-slate-500">{date}</p>
        </div>
      </div>
      <div className="flex justify-end">
        <span className={`text-xs font-semibold px-2 py-1 rounded ${config.bg} ${config.color}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>
    </div>
  );
};

export default function Finance() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [isAddTransactionDialogOpen, setIsAddTransactionDialogOpen] = useState(false);
  const [isAddExpenseDialogOpen, setIsAddExpenseDialogOpen] = useState(false);
  const [transactionForm, setTransactionForm] = useState({
    patientName: "",
    amount: "",
    description: "",
    paymentMethod: "",
    date: "",
    invoiceNumber: "",
  });
  const [expenseForm, setExpenseForm] = useState({
    category: "",
    amount: "",
    vendor: "",
    description: "",
    date: "",
    notes: "",
  });

  const invoices = [
    {
      invoiceNumber: "INV-2024-001",
      patientName: "Ahmed Mohammed",
      date: "Jan 15, 2024",
      amount: 5500,
      status: "paid" as const,
      dueDate: "Jan 25, 2024",
      description: "Cardiac Checkup & Lab Tests",
    },
    {
      invoiceNumber: "INV-2024-002",
      patientName: "Fatima Al-Rashid",
      date: "Jan 18, 2024",
      amount: 8750,
      status: "pending" as const,
      dueDate: "Feb 01, 2024",
      description: "Surgical Procedure",
    },
    {
      invoiceNumber: "INV-2024-003",
      patientName: "Muhammad Hassan",
      date: "Jan 10, 2024",
      amount: 3200,
      status: "overdue" as const,
      dueDate: "Jan 20, 2024",
      description: "Orthopedic Consultation & X-rays",
    },
    {
      invoiceNumber: "INV-2024-004",
      patientName: "Noor Abdullah",
      date: "Jan 20, 2024",
      amount: 2100,
      status: "pending" as const,
      dueDate: "Feb 05, 2024",
      description: "General Checkup & Vaccinations",
    },
  ];

  const payments = [
    {
      paymentId: "PAY-2024-001",
      patientName: "Ahmed Mohammed",
      amount: 5500,
      date: "Jan 20, 2024",
      method: "Credit Card",
      invoiceNumber: "INV-2024-001",
      reference: "TXN-8942756",
    },
    {
      paymentId: "PAY-2024-002",
      patientName: "Khalid Omar",
      amount: 4200,
      date: "Jan 19, 2024",
      method: "Bank Transfer",
      invoiceNumber: "INV-2024-005",
      reference: "TRF-5431298",
    },
    {
      paymentId: "PAY-2024-003",
      patientName: "Sarah Al-Shehri",
      amount: 1500,
      date: "Jan 18, 2024",
      method: "Insurance",
      invoiceNumber: "INV-2024-006",
      reference: "INS-7654321",
    },
  ];

  const expenses = [
    {
      category: "Medical Supplies",
      amount: 45000,
      date: "Jan 18, 2024",
      vendor: "MedSupply Global",
      description: "Surgical Equipment Order",
      status: "approved" as const,
    },
    {
      category: "Utilities",
      amount: 28500,
      date: "Jan 15, 2024",
      vendor: "National Power",
      description: "Monthly Electricity Bill",
      status: "approved" as const,
    },
    {
      category: "Maintenance",
      amount: 15000,
      date: "Jan 19, 2024",
      vendor: "Maintenance Co",
      description: "HVAC System Maintenance",
      status: "pending" as const,
    },
    {
      category: "Pharmaceuticals",
      amount: 67500,
      date: "Jan 17, 2024",
      vendor: "Pharma Distributors",
      description: "Monthly Pharmacy Inventory",
      status: "approved" as const,
    },
  ];
  // Department Financial Data
  const departmentFinances = [
    {
      id: 1,
      name: "قسم الطوارئ",
      nameEn: "Emergency Department",
      icon: <AlertCircle className="w-6 h-6" />,
      revenue: 450000,
      expenses: 280000,
      profit: 170000,
      patients: 1250,
      transactions: 1450,
      color: "from-red-500 to-orange-500",
      growth: 12.5,
    },
    {
      id: 2,
      name: "العمليات الجراحية",
      nameEn: "Surgery Department",
      icon: <Scissors className="w-6 h-6" />,
      revenue: 850000,
      expenses: 520000,
      profit: 330000,
      patients: 320,
      transactions: 420,
      color: "from-blue-500 to-cyan-500",
      growth: 18.2,
    },
    {
      id: 3,
      name: "الصيدلية",
      nameEn: "Pharmacy",
      icon: <Pill className="w-6 h-6" />,
      revenue: 380000,
      expenses: 220000,
      profit: 160000,
      patients: 3200,
      transactions: 4500,
      color: "from-green-500 to-emerald-500",
      growth: 8.7,
    },
    {
      id: 4,
      name: "العيادات الخارجية",
      nameEn: "Outpatient Clinics",
      icon: <Users className="w-6 h-6" />,
      revenue: 520000,
      expenses: 310000,
      profit: 210000,
      patients: 2100,
      transactions: 2300,
      color: "from-purple-500 to-pink-500",
      growth: 15.3,
    },
    {
      id: 5,
      name: "المختبرات",
      nameEn: "Laboratory",
      icon: <FileText className="w-6 h-6" />,
      revenue: 290000,
      expenses: 180000,
      profit: 110000,
      patients: 1800,
      transactions: 2200,
      color: "from-yellow-500 to-orange-500",
      growth: 6.8,
    },
    {
      id: 6,
      name: "الأشعة",
      nameEn: "Radiology",
      icon: <Building2 className="w-6 h-6" />,
      revenue: 410000,
      expenses: 250000,
      profit: 160000,
      patients: 950,
      transactions: 1100,
      color: "from-indigo-500 to-purple-500",
      growth: 10.4,
    },
    {
      id: 7,
      name: "المطبخ",
      nameEn: "Kitchen",
      icon: <UtensilsCrossed className="w-6 h-6" />,
      revenue: 95000,
      expenses: 78000,
      profit: 17000,
      patients: 0,
      transactions: 850,
      color: "from-orange-500 to-red-500",
      growth: 4.2,
    },
    {
      id: 8,
      name: "الصيانة",
      nameEn: "Maintenance",
      icon: <Wrench className="w-6 h-6" />,
      revenue: 0,
      expenses: 145000,
      profit: -145000,
      patients: 0,
      transactions: 320,
      color: "from-slate-500 to-gray-500",
      growth: -5.3,
    },
  ];

  // Payment Methods Statistics
  const paymentMethods = [
    { method: "نقدي", methodEn: "Cash", amount: 680000, percentage: 28, transactions: 2340, icon: <Wallet className="w-5 h-5" /> },
    { method: "بطاقة ائتمان", methodEn: "Credit Card", amount: 950000, percentage: 39, transactions: 1890, icon: <CreditCard className="w-5 h-5" /> },
    { method: "تأمين", methodEn: "Insurance", amount: 580000, percentage: 24, transactions: 1120, icon: <FileText className="w-5 h-5" /> },
    { method: "تحويل بنكي", methodEn: "Bank Transfer", amount: 220000, percentage: 9, transactions: 450, icon: <Building2 className="w-5 h-5" /> },
  ];

  // Monthly Revenue Breakdown
  const monthlyData = [
    { month: "يناير", revenue: 2850000, expenses: 1980000, profit: 870000 },
    { month: "فبراير", revenue: 2920000, expenses: 2010000, profit: 910000 },
    { month: "مارس", revenue: 3100000, expenses: 2150000, profit: 950000 },
    { month: "أبريل", revenue: 2980000, expenses: 2080000, profit: 900000 },
    { month: "مايو", revenue: 3250000, expenses: 2240000, profit: 1010000 },
    { month: "يونيو", revenue: 3180000, expenses: 2190000, profit: 990000 },
  ];

  // Budget Allocations
  const budgetAllocations = [
    { category: "رواتب الموظفين", categoryEn: "Staff Salaries", allocated: 1200000, spent: 1180000, percentage: 98 },
    { category: "مستلزمات طبية", categoryEn: "Medical Supplies", allocated: 800000, spent: 720000, percentage: 90 },
    { category: "أدوية", categoryEn: "Pharmaceuticals", allocated: 650000, spent: 640000, percentage: 98 },
    { category: "معدات", categoryEn: "Equipment", allocated: 450000, spent: 380000, percentage: 84 },
    { category: "مرافق", categoryEn: "Utilities", allocated: 280000, spent: 265000, percentage: 95 },
    { category: "صيانة", categoryEn: "Maintenance", allocated: 220000, spent: 145000, percentage: 66 },
    { category: "تدريب", categoryEn: "Training", allocated: 150000, spent: 98000, percentage: 65 },
  ];

  const filteredInvoices = invoices.filter(
    (invoice) =>
      (invoice.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (statusFilter === "all" || invoice.status === statusFilter)
  );

  const totalIncome = invoices
    .filter((inv) => inv.status === "paid")
    .reduce((sum, inv) => sum + inv.amount, 0);
  const totalExpenses = expenses
    .filter((exp) => exp.status === "approved")
    .reduce((sum, exp) => sum + exp.amount, 0);
  const pendingPayments = invoices
    .filter((inv) => inv.status === "pending")
    .reduce((sum, inv) => sum + inv.amount, 0);
  const overdueAmount = invoices
    .filter((inv) => inv.status === "overdue")
    .reduce((sum, inv) => sum + inv.amount, 0);

  // Calculate totals from departments
  const totalDepartmentRevenue = departmentFinances.reduce((sum, dept) => sum + dept.revenue, 0);
  const totalDepartmentExpenses = departmentFinances.reduce((sum, dept) => sum + dept.expenses, 0);
  const totalDepartmentProfit = totalDepartmentRevenue - totalDepartmentExpenses;
  const totalPatients = departmentFinances.reduce((sum, dept) => sum + dept.patients, 0);
  const totalTransactions = departmentFinances.reduce((sum, dept) => sum + dept.transactions, 0);

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  {t('navigation.finance')}
                </h1>
                <p className="text-lg text-slate-600">
                  نظام مالي متكامل لجميع الأقسام
                </p>
              </div>
              <div className="flex gap-3">
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="px-4 py-2 border border-slate-300 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="today">اليوم</option>
                  <option value="week">هذا الأسبوع</option>
                  <option value="month">هذا الشهر</option>
                  <option value="quarter">هذا الربع</option>
                  <option value="year">هذا العام</option>
                </select>
                <button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                  <Download className="w-5 h-5" />
                  تصدير التقرير
                </button>
              </div>
            </div>
          </div>

          {/* Main Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-green-500 to-emerald-600 border-0 shadow-xl">
              <div className="p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <Badge className="bg-white/20 text-white border-0">+12.5%</Badge>
                </div>
                <p className="text-sm text-green-100 mb-1">إجمالي الإيرادات</p>
                <p className="text-3xl font-bold">
                  {(totalDepartmentRevenue / 1000000).toFixed(2)}M ر.س
                </p>
                <p className="text-xs text-green-100 mt-2">{totalTransactions.toLocaleString()} معاملة</p>
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-red-500 to-rose-600 border-0 shadow-xl">
              <div className="p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <TrendingDown className="w-6 h-6" />
                  </div>
                  <Badge className="bg-white/20 text-white border-0">+8.3%</Badge>
                </div>
                <p className="text-sm text-red-100 mb-1">إجمالي المصروفات</p>
                <p className="text-3xl font-bold">
                  {(totalDepartmentExpenses / 1000000).toFixed(2)}M ر.س
                </p>
                <p className="text-xs text-red-100 mt-2">8 أقسام نشطة</p>
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-blue-500 to-cyan-600 border-0 shadow-xl">
              <div className="p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <DollarSign className="w-6 h-6" />
                  </div>
                  <Badge className="bg-white/20 text-white border-0">ممتاز</Badge>
                </div>
                <p className="text-sm text-blue-100 mb-1">صافي الربح</p>
                <p className="text-3xl font-bold">
                  {(totalDepartmentProfit / 1000000).toFixed(2)}M ر.س
                </p>
                <p className="text-xs text-blue-100 mt-2">هامش ربح {((totalDepartmentProfit / totalDepartmentRevenue) * 100).toFixed(1)}%</p>
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-purple-500 to-pink-600 border-0 shadow-xl">
              <div className="p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6" />
                  </div>
                  <Badge className="bg-white/20 text-white border-0">نشط</Badge>
                </div>
                <p className="text-sm text-purple-100 mb-1">إجمالي المرضى</p>
                <p className="text-3xl font-bold">
                  {totalPatients.toLocaleString()}
                </p>
                <p className="text-xs text-purple-100 mt-2">متوسط {(totalDepartmentRevenue / totalPatients).toFixed(0)} ر.س/مريض</p>
              </div>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="bg-white/80 backdrop-blur-md border border-slate-200 p-1 rounded-xl shadow-lg">
              <TabsTrigger value="overview" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg px-6">
                <BarChart3 className="w-4 h-4 ml-2" />
                نظرة عامة
              </TabsTrigger>
              <TabsTrigger value="departments" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg px-6">
                <Building2 className="w-4 h-4 ml-2" />
                الأقسام
              </TabsTrigger>
              <TabsTrigger value="invoices" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg px-6">
                <Receipt className="w-4 h-4 ml-2" />
                الفواتير
              </TabsTrigger>
              <TabsTrigger value="payments" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg px-6">
                <CreditCard className="w-4 h-4 ml-2" />
                المدفوعات
              </TabsTrigger>
              <TabsTrigger value="expenses" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg px-6">
                <ArrowDownRight className="w-4 h-4 ml-2" />
                المصروفات
              </TabsTrigger>
              <TabsTrigger value="budget" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg px-6">
                <Wallet className="w-4 h-4 ml-2" />
                الميزانية
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {/* Payment Methods */}
              <Card className="bg-white/80 backdrop-blur-md border-slate-200 shadow-xl">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <PieChart className="w-6 h-6 text-blue-600" />
                    طرق الدفع
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {paymentMethods.map((method, index) => (
                      <div key={index} className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-4 border border-slate-200">
                        <div className="flex items-center justify-between mb-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                            {method.icon}
                          </div>
                          <Badge variant="outline" className="text-xs">{method.percentage}%</Badge>
                        </div>
                        <p className="text-sm text-slate-600 mb-1">{method.method}</p>
                        <p className="text-2xl font-bold text-slate-900 mb-1">
                          {(method.amount / 1000).toFixed(0)}K ر.س
                        </p>
                        <p className="text-xs text-slate-500">{method.transactions.toLocaleString()} معاملة</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Monthly Trend */}
              <Card className="bg-white/80 backdrop-blur-md border-slate-200 shadow-xl">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <TrendingUp className="w-6 h-6 text-blue-600" />
                    الاتجاه الشهري
                  </h3>
                  <div className="space-y-4">
                    {monthlyData.map((month, index) => (
                      <div key={index} className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl p-4 border border-slate-200">
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-semibold text-slate-900">{month.month}</p>
                          <Badge className="bg-green-100 text-green-700 border-0">
                            +{((month.profit / month.revenue) * 100).toFixed(1)}%
                          </Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-slate-600 mb-1">إيرادات</p>
                            <p className="font-bold text-green-600">{(month.revenue / 1000).toFixed(0)}K</p>
                          </div>
                          <div>
                            <p className="text-slate-600 mb-1">مصروفات</p>
                            <p className="font-bold text-red-600">{(month.expenses / 1000).toFixed(0)}K</p>
                          </div>
                          <div>
                            <p className="text-slate-600 mb-1">ربح صافي</p>
                            <p className="font-bold text-blue-600">{(month.profit / 1000).toFixed(0)}K</p>
                          </div>
                        </div>
                        {/* Progress Bar */}
                        <div className="mt-3 h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full transition-all duration-500"
                            style={{ width: `${(month.profit / month.revenue) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Departments Tab */}
            <TabsContent value="departments" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {departmentFinances.map((dept) => (
                  <Card key={dept.id} className="bg-white/80 backdrop-blur-md border-slate-200 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group">
                    <div className={`h-2 bg-gradient-to-r ${dept.color}`} />
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-12 h-12 bg-gradient-to-br ${dept.color} rounded-xl flex items-center justify-center text-white shadow-lg`}>
                          {dept.icon}
                        </div>
                        <Badge className={dept.growth >= 0 ? "bg-green-100 text-green-700 border-0" : "bg-red-100 text-red-700 border-0"}>
                          {dept.growth >= 0 ? "+" : ""}{dept.growth}%
                        </Badge>
                      </div>
                      
                      <h3 className="font-bold text-slate-900 mb-1">{dept.name}</h3>
                      <p className="text-xs text-slate-500 mb-4">{dept.nameEn}</p>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-600">إيرادات</span>
                          <span className="font-bold text-green-600">{(dept.revenue / 1000).toFixed(0)}K ر.س</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-600">مصروفات</span>
                          <span className="font-bold text-red-600">{(dept.expenses / 1000).toFixed(0)}K ر.س</span>
                        </div>
                        <div className="flex items-center justify-between text-sm pt-2 border-t border-slate-200">
                          <span className="text-slate-600">صافي</span>
                          <span className={`font-bold ${dept.profit >= 0 ? "text-blue-600" : "text-red-600"}`}>
                            {dept.profit >= 0 ? "+" : ""}{(dept.profit / 1000).toFixed(0)}K ر.س
                          </span>
                        </div>
                      </div>

                      {dept.patients > 0 && (
                        <div className="mt-4 pt-4 border-t border-slate-200">
                          <div className="flex items-center justify-between text-xs text-slate-600">
                            <span>{dept.patients.toLocaleString()} مريض</span>
                            <span>{dept.transactions.toLocaleString()} معاملة</span>
                          </div>
                        </div>
                      )}

                      <button className="w-full mt-4 bg-gradient-to-r from-slate-100 to-slate-200 hover:from-blue-600 hover:to-purple-600 hover:text-white text-slate-700 font-semibold py-2 rounded-lg transition-all duration-300 group-hover:shadow-lg">
                        عرض التفاصيل
                      </button>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Department Summary */}
              <Card className="bg-white/80 backdrop-blur-md border-slate-200 shadow-xl">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-6">ملخص الأقسام</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
                      <p className="text-sm text-green-700 mb-2">أعلى إيرادات</p>
                      <p className="text-2xl font-bold text-green-600 mb-1">
                        {departmentFinances.sort((a, b) => b.revenue - a.revenue)[0].name}
                      </p>
                      <p className="text-lg font-semibold text-green-700">
                        {(departmentFinances.sort((a, b) => b.revenue - a.revenue)[0].revenue / 1000).toFixed(0)}K ر.س
                      </p>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-200">
                      <p className="text-sm text-blue-700 mb-2">أعلى ربحية</p>
                      <p className="text-2xl font-bold text-blue-600 mb-1">
                        {departmentFinances.sort((a, b) => b.profit - a.profit)[0].name}
                      </p>
                      <p className="text-lg font-semibold text-blue-700">
                        {(departmentFinances.sort((a, b) => b.profit - a.profit)[0].profit / 1000).toFixed(0)}K ر.س
                      </p>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                      <p className="text-sm text-purple-700 mb-2">أكثر نشاطًا</p>
                      <p className="text-2xl font-bold text-purple-600 mb-1">
                        {departmentFinances.sort((a, b) => b.transactions - a.transactions)[0].name}
                      </p>
                      <p className="text-lg font-semibold text-purple-700">
                        {departmentFinances.sort((a, b) => b.transactions - a.transactions)[0].transactions.toLocaleString()} معاملة
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Invoices Tab */}
            <TabsContent value="invoices" className="space-y-6">(
              {/* Overdue Alert */}
              {overdueAmount > 0 && (
                <Card className="bg-gradient-to-r from-red-50 to-orange-50 border-red-200 shadow-lg">
                  <div className="p-6">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-bold text-red-900 mb-2">فواتير متأخرة</h3>
                        <p className="text-sm text-red-800">
                          {overdueAmount.toLocaleString()} ر.س متأخرة. يرجى التواصل مع المرضى للدفع.
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              )}

              {/* Search and Filter */}
              <Card className="bg-white/80 backdrop-blur-md border-slate-200 shadow-xl">
                <div className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      placeholder={t('common.search')}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Status</option>
                    <option value="paid">Paid</option>
                    <option value="pending">Pending</option>
                    <option value="overdue">Overdue</option>
                  </select>
                  <button onClick={() => setIsAddTransactionDialogOpen(true)} className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                    <Plus className="w-5 h-5" />
                    Create Invoice
                  </button>
                </div>
                </div>
              </Card>

              {/* Invoices Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredInvoices.map((invoice, index) => (
                  <InvoiceCard key={index} {...invoice} />
                ))}
              </div>

              {filteredInvoices.length === 0 && (
                <Card className="bg-slate-50 border-slate-200">
                  <div className="p-12 text-center">
                    <Receipt className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-600">لا توجد فواتير مطابقة للبحث</p>
                  </div>
                </Card>
              )}
            </TabsContent>

            {/* Payments Tab */}
            <TabsContent value="payments" className="space-y-6">
              <Card className="bg-white/80 backdrop-blur-md border-slate-200 shadow-xl">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                      <CreditCard className="w-6 h-6 text-blue-600" />
                      المدفوعات الأخيرة
                    </h3>
                    <button onClick={() => setIsAddTransactionDialogOpen(true)} className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all">
                      <Plus className="w-4 h-4" />
                      تسجيل دفعة
                    </button>
                  </div>
                  {payments.map((payment, index) => (
                    <PaymentRecord key={index} {...payment} />
                  ))}
                </div>
              </Card>

              {/* Payment Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 shadow-lg">
                  <div className="p-6 text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <ArrowUpRight className="w-6 h-6 text-green-600" />
                    </div>
                    <p className="text-sm text-green-700 mb-1">إجمالي المدفوعات</p>
                    <p className="text-3xl font-bold text-green-600">
                      {payments.reduce((sum, p) => sum + p.amount, 0).toLocaleString()} ر.س
                    </p>
                  </div>
                </Card>
                <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200 shadow-lg">
                  <div className="p-6 text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <FileText className="w-6 h-6 text-blue-600" />
                    </div>
                    <p className="text-sm text-blue-700 mb-1">عدد المدفوعات</p>
                    <p className="text-3xl font-bold text-blue-600">{payments.length}</p>
                  </div>
                </Card>
                <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 shadow-lg">
                  <div className="p-6 text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <TrendingUp className="w-6 h-6 text-purple-600" />
                    </div>
                    <p className="text-sm text-purple-700 mb-1">متوسط الدفعة</p>
                    <p className="text-3xl font-bold text-purple-600">
                      {(payments.reduce((sum, p) => sum + p.amount, 0) / payments.length).toFixed(0)} ر.س
                    </p>
                  </div>
                </Card>
              </div>
            </TabsContent>

            {/* Expenses Tab */}
            <TabsContent value="expenses" className="space-y-6">
              <Card className="bg-white/80 backdrop-blur-md border-slate-200 shadow-xl">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                      <ArrowDownRight className="w-6 h-6 text-red-600" />
                      المصروفات
                    </h3>
                    <button onClick={() => setIsAddExpenseDialogOpen(true)} className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-orange-600 text-white px-4 py-2 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all">
                      <Plus className="w-4 h-4" />
                      إضافة مصروف
                    </button>
                  </div>
                  {expenses.map((expense, index) => (
                    <ExpenseItem key={index} {...expense} />
                  ))}
                </div>
              </Card>

              {/* Expense Categories */}
              <Card className="bg-white/80 backdrop-blur-md border-slate-200 shadow-xl">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-6">التصنيفات</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(
                      expenses.reduce((acc, exp) => {
                        acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
                        return acc;
                      }, {} as Record<string, number>)
                    ).map(([category, amount], index) => (
                      <div key={index} className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl p-4 border border-slate-200">
                        <div className="flex items-center justify-between">
                          <p className="font-semibold text-slate-900">{category}</p>
                          <p className="text-lg font-bold text-red-600">{(amount / 1000).toFixed(0)}K ر.س</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Budget Tab */}
            <TabsContent value="budget" className="space-y-6">
              <Card className="bg-white/80 backdrop-blur-md border-slate-200 shadow-xl">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <Wallet className="w-6 h-6 text-blue-600" />
                    تخصيصات الميزانية
                  </h3>
                  <div className="space-y-4">
                    {budgetAllocations.map((budget, index) => (
                      <div key={index} className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl p-5 border border-slate-200">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <p className="font-bold text-slate-900">{budget.category}</p>
                            <p className="text-xs text-slate-500">{budget.categoryEn}</p>
                          </div>
                          <Badge className={
                            budget.percentage >= 90 
                              ? "bg-red-100 text-red-700 border-0" 
                              : budget.percentage >= 70 
                              ? "bg-yellow-100 text-yellow-700 border-0"
                              : "bg-green-100 text-green-700 border-0"
                          }>
                            {budget.percentage}%
                          </Badge>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className="text-slate-600">
                            {budget.spent.toLocaleString()} من {budget.allocated.toLocaleString()} ر.س
                          </span>
                          <span className="font-semibold text-slate-900">
                            متبقي {(budget.allocated - budget.spent).toLocaleString()} ر.س
                          </span>
                        </div>
                        
                        {/* Progress Bar */}
                        <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full transition-all duration-500 rounded-full ${
                              budget.percentage >= 90
                                ? "bg-gradient-to-r from-red-500 to-orange-500"
                                : budget.percentage >= 70
                                ? "bg-gradient-to-r from-yellow-500 to-orange-500"
                                : "bg-gradient-to-r from-green-500 to-emerald-500"
                            }`}
                            style={{ width: `${budget.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Budget Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-gradient-to-br from-blue-500 to-cyan-600 border-0 shadow-xl text-white">
                  <div className="p-6 text-center">
                    <p className="text-sm text-blue-100 mb-2">إجمالي الميزانية</p>
                    <p className="text-3xl font-bold">
                      {(budgetAllocations.reduce((sum, b) => sum + b.allocated, 0) / 1000000).toFixed(2)}M ر.س
                    </p>
                  </div>
                </Card>
                <Card className="bg-gradient-to-br from-green-500 to-emerald-600 border-0 shadow-xl text-white">
                  <div className="p-6 text-center">
                    <p className="text-sm text-green-100 mb-2">المصروف</p>
                    <p className="text-3xl font-bold">
                      {(budgetAllocations.reduce((sum, b) => sum + b.spent, 0) / 1000000).toFixed(2)}M ر.س
                    </p>
                  </div>
                </Card>
                <Card className="bg-gradient-to-br from-purple-500 to-pink-600 border-0 shadow-xl text-white">
                  <div className="p-6 text-center">
                    <p className="text-sm text-purple-100 mb-2">المتبقي</p>
                    <p className="text-3xl font-bold">
                      {((budgetAllocations.reduce((sum, b) => sum + b.allocated, 0) - budgetAllocations.reduce((sum, b) => sum + b.spent, 0)) / 1000000).toFixed(2)}M ر.س
                    </p>
                  </div>
                </Card>
              </div>
            </TabsContent>
        </Tabs>

        {/* Add Transaction/Invoice Dialog */}
        <Dialog open={isAddTransactionDialogOpen} onOpenChange={setIsAddTransactionDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Receipt className="w-5 h-5 text-blue-600" />
                Create New Invoice
              </DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="patientName">Patient Name</Label>
                <Input
                  id="patientName"
                  value={transactionForm.patientName}
                  onChange={(e) => setTransactionForm({ ...transactionForm, patientName: e.target.value })}
                  placeholder="Enter patient name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="invoiceNumber">Invoice Number</Label>
                <Input
                  id="invoiceNumber"
                  value={transactionForm.invoiceNumber}
                  onChange={(e) => setTransactionForm({ ...transactionForm, invoiceNumber: e.target.value })}
                  placeholder="INV-2024-XXX"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Amount (SAR)</Label>
                <Input
                  id="amount"
                  type="number"
                  value={transactionForm.amount}
                  onChange={(e) => setTransactionForm({ ...transactionForm, amount: e.target.value })}
                  placeholder="5500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="paymentMethod">Payment Method</Label>
                <Select
                  value={transactionForm.paymentMethod}
                  onValueChange={(value) => setTransactionForm({ ...transactionForm, paymentMethod: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Cash">Cash</SelectItem>
                    <SelectItem value="Credit Card">Credit Card</SelectItem>
                    <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                    <SelectItem value="Insurance">Insurance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="transactionDate">Date</Label>
                <Input
                  id="transactionDate"
                  type="date"
                  value={transactionForm.date}
                  onChange={(e) => setTransactionForm({ ...transactionForm, date: e.target.value })}
                />
              </div>
              <div className="space-y-2 col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={transactionForm.description}
                  onChange={(e) => setTransactionForm({ ...transactionForm, description: e.target.value })}
                  placeholder="Cardiac Checkup & Lab Tests"
                  rows={2}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddTransactionDialogOpen(false)}>
                {t('common.cancel')}
              </Button>
              <Button
                onClick={() => {
                  console.log('New Transaction:', transactionForm);
                  setTransactionForm({
                    patientName: "",
                    amount: "",
                    description: "",
                    paymentMethod: "",
                    date: "",
                    invoiceNumber: "",
                  });
                  setIsAddTransactionDialogOpen(false);
                }}
              >
                Create Invoice
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Add Expense Dialog */}
        <Dialog open={isAddExpenseDialogOpen} onOpenChange={setIsAddExpenseDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <ArrowDownRight className="w-5 h-5 text-red-600" />
                Add New Expense
              </DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="expenseCategory">Category</Label>
                <Select
                  value={expenseForm.category}
                  onValueChange={(value) => setExpenseForm({ ...expenseForm, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Medical Supplies">Medical Supplies</SelectItem>
                    <SelectItem value="Pharmaceuticals">Pharmaceuticals</SelectItem>
                    <SelectItem value="Utilities">Utilities</SelectItem>
                    <SelectItem value="Maintenance">Maintenance</SelectItem>
                    <SelectItem value="Equipment">Equipment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="expenseAmount">Amount (SAR)</Label>
                <Input
                  id="expenseAmount"
                  type="number"
                  value={expenseForm.amount}
                  onChange={(e) => setExpenseForm({ ...expenseForm, amount: e.target.value })}
                  placeholder="45000"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vendor">Vendor</Label>
                <Input
                  id="vendor"
                  value={expenseForm.vendor}
                  onChange={(e) => setExpenseForm({ ...expenseForm, vendor: e.target.value })}
                  placeholder="e.g., MedSupply Global"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expenseDate">Date</Label>
                <Input
                  id="expenseDate"
                  type="date"
                  value={expenseForm.date}
                  onChange={(e) => setExpenseForm({ ...expenseForm, date: e.target.value })}
                />
              </div>
              <div className="space-y-2 col-span-2">
                <Label htmlFor="expenseDescription">Description</Label>
                <Textarea
                  id="expenseDescription"
                  value={expenseForm.description}
                  onChange={(e) => setExpenseForm({ ...expenseForm, description: e.target.value })}
                  placeholder="Surgical Equipment Order"
                  rows={2}
                />
              </div>
              <div className="space-y-2 col-span-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  value={expenseForm.notes}
                  onChange={(e) => setExpenseForm({ ...expenseForm, notes: e.target.value })}
                  placeholder="Optional notes..."
                  rows={2}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddExpenseDialogOpen(false)}>
                {t('common.cancel')}
              </Button>
              <Button
                onClick={() => {
                  console.log('New Expense:', expenseForm);
                  setExpenseForm({
                    category: "",
                    amount: "",
                    vendor: "",
                    description: "",
                    date: "",
                    notes: "",
                  });
                  setIsAddExpenseDialogOpen(false);
                }}
              >
                Add Expense
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
    </Layout>
  );
}