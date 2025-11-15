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
} from "lucide-react";
import { useState } from "react";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("invoices");
  const [statusFilter, setStatusFilter] = useState("all");

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

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Finance & Billing</h1>
          <p className="text-lg text-slate-600">
            Invoices, payments, expenses, and financial reports
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Total Income</p>
                <p className="text-3xl font-bold text-green-600">
                  SAR {(totalIncome / 1000).toFixed(1)}K
                </p>
              </div>
              <ArrowUpRight className="w-6 h-6 text-green-600 flex-shrink-0" />
            </div>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Total Expenses</p>
                <p className="text-3xl font-bold text-red-600">
                  SAR {(totalExpenses / 1000).toFixed(1)}K
                </p>
              </div>
              <ArrowDownRight className="w-6 h-6 text-red-600 flex-shrink-0" />
            </div>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <p className="text-sm text-slate-600 mb-1">Pending Payments</p>
            <p className="text-3xl font-bold text-blue-600">SAR {(pendingPayments / 1000).toFixed(1)}K</p>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <p className="text-sm text-slate-600 mb-1">Overdue</p>
            <p className="text-3xl font-bold text-red-600">SAR {(overdueAmount / 1000).toFixed(1)}K</p>
          </div>
        </div>

        {/* Overdue Alert */}
        {overdueAmount > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-red-900 mb-2">Overdue Invoices</h3>
                <p className="text-sm text-red-800">
                  SAR {overdueAmount.toLocaleString()} is overdue. Please contact patients for payment.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-slate-200 overflow-x-auto">
          {[
            { id: "invoices", label: "Invoices" },
            { id: "payments", label: "Payments" },
            { id: "expenses", label: "Expenses" },
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
          {activeTab === "invoices" && (
            <>
              {/* Search and Filter */}
              <div className="bg-white rounded-lg border border-slate-200 p-6 mb-8">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search invoices..."
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
                  <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                    <Plus className="w-5 h-5" />
                    Create Invoice
                  </button>
                </div>
              </div>

              {/* Invoices Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredInvoices.map((invoice, index) => (
                  <InvoiceCard key={index} {...invoice} />
                ))}
              </div>

              {filteredInvoices.length === 0 && (
                <div className="text-center py-12 bg-slate-50 rounded-lg border border-slate-200">
                  <p className="text-slate-600">No invoices found matching your search.</p>
                </div>
              )}
            </>
          )}

          {activeTab === "payments" && (
            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-6">Recent Payments</h3>
              {payments.map((payment, index) => (
                <PaymentRecord key={index} {...payment} />
              ))}
            </div>
          )}

          {activeTab === "expenses" && (
            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-slate-900">Expenses</h3>
                <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                  <Plus className="w-4 h-4" />
                  Add Expense
                </button>
              </div>
              {expenses.map((expense, index) => (
                <ExpenseItem key={index} {...expense} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
