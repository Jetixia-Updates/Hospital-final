import Layout from "@/components/Layout";
import {
  Search,
  Users,
  DollarSign,
  Calendar,
  Award,
  TrendingUp,
  Plus,
  Filter,
  Clock,
  AlertCircle,
  ArrowRight,
  Briefcase,
} from "lucide-react";
import { useState } from "react";

const EmployeeCard = ({
  id,
  name,
  position,
  department,
  hireDate,
  salary,
  status,
  phone,
}: {
  id: string;
  name: string;
  position: string;
  department: string;
  hireDate: string;
  salary: number;
  status: "active" | "on-leave" | "inactive";
  phone: string;
}) => {
  const statusConfig = {
    active: { bg: "bg-green-50", badge: "Active", color: "text-green-700" },
    "on-leave": { bg: "bg-yellow-50", badge: "On Leave", color: "text-yellow-700" },
    inactive: { bg: "bg-slate-50", badge: "Inactive", color: "text-slate-700" },
  };

  const config = statusConfig[status];

  return (
    <div className={`${config.bg} rounded-lg border border-slate-200 p-6 hover:shadow-md transition-shadow`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{name}</h3>
          <p className="text-sm text-slate-500">ID: {id}</p>
        </div>
        <span className={`text-xs font-semibold px-3 py-1 rounded-full bg-white border ${config.color} border-current`}>
          {config.badge}
        </span>
      </div>

      <div className="space-y-2 text-sm text-slate-600 mb-4">
        <div className="flex items-center justify-between">
          <span>Position:</span>
          <span className="font-medium text-slate-900">{position}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Department:</span>
          <span className="font-medium text-slate-900">{department}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Hired:</span>
          <span className="font-medium text-slate-900">{hireDate}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Salary:</span>
          <span className="font-medium text-slate-900">SAR {salary.toLocaleString()}</span>
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-slate-300">
          <span>Phone:</span>
          <span className="font-medium text-slate-900">{phone}</span>
        </div>
      </div>

      <button className="w-full bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-2">
        View Profile <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};

const PayrollItem = ({
  employeeName,
  baseSalary,
  allowances,
  deductions,
  netSalary,
  status,
  month,
}: {
  employeeName: string;
  baseSalary: number;
  allowances: number;
  deductions: number;
  netSalary: number;
  status: "paid" | "pending" | "processed";
  month: string;
}) => {
  const statusConfig = {
    paid: { color: "text-green-700", bg: "bg-green-50" },
    pending: { color: "text-yellow-700", bg: "bg-yellow-50" },
    processed: { color: "text-blue-700", bg: "bg-blue-50" },
  };

  const config = statusConfig[status];

  return (
    <div className="border-b border-slate-200 py-4 last:border-b-0">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="font-semibold text-slate-900">{employeeName}</h4>
          <p className="text-xs text-slate-500">{month}</p>
        </div>
        <span className={`text-xs font-semibold px-2 py-1 rounded ${config.bg} ${config.color}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>
      <div className="grid grid-cols-4 gap-4 text-sm">
        <div>
          <p className="text-slate-600">Base</p>
          <p className="font-bold text-slate-900">SAR {baseSalary.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-slate-600">Allowances</p>
          <p className="font-bold text-green-600">+SAR {allowances.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-slate-600">Deductions</p>
          <p className="font-bold text-red-600">-SAR {deductions.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-slate-600">Net</p>
          <p className="font-bold text-blue-600">SAR {netSalary.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

const AttendanceRecord = ({
  employeeName,
  date,
  checkIn,
  checkOut,
  status,
  hoursWorked,
}: {
  employeeName: string;
  date: string;
  checkIn: string;
  checkOut: string;
  status: "present" | "absent" | "late" | "early-leave";
  hoursWorked: number;
}) => {
  const statusConfig = {
    present: { color: "text-green-700", icon: "✓" },
    absent: { color: "text-red-700", icon: "✗" },
    late: { color: "text-yellow-700", icon: "⚠" },
    "early-leave": { color: "text-orange-700", icon: "↗" },
  };

  const config = statusConfig[status];

  return (
    <div className="flex items-center justify-between py-3 border-b border-slate-200 last:border-b-0">
      <div className="flex-1">
        <p className="font-semibold text-slate-900">{employeeName}</p>
        <p className="text-xs text-slate-500">{date}</p>
      </div>
      <div className="flex items-center gap-6 text-sm">
        <div className="text-center">
          <p className="text-slate-600">In</p>
          <p className="font-medium text-slate-900">{checkIn}</p>
        </div>
        <div className="text-center">
          <p className="text-slate-600">Out</p>
          <p className="font-medium text-slate-900">{checkOut}</p>
        </div>
        <div className="text-center">
          <p className="text-slate-600">Hours</p>
          <p className="font-bold text-slate-900">{hoursWorked}h</p>
        </div>
        <span className={`text-lg font-bold ${config.color}`}>{config.icon}</span>
      </div>
    </div>
  );
};

export default function HR() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("employees");

  const employees = [
    {
      id: "EMP001",
      name: "Hassan Al-Rashid",
      position: "Cardiologist",
      department: "Cardiology",
      hireDate: "Jan 2020",
      salary: 18000,
      status: "active" as const,
      phone: "+966 50 123 4567",
    },
    {
      id: "EMP002",
      name: "Fatima Al-Dosari",
      position: "Neurologist",
      department: "Neurology",
      hireDate: "Jun 2021",
      salary: 16500,
      status: "active" as const,
      phone: "+966 55 234 5678",
    },
    {
      id: "EMP003",
      name: "Mohammed Al-Harbi",
      position: "Orthopedic Surgeon",
      department: "Orthopedics",
      hireDate: "Mar 2019",
      salary: 19500,
      status: "active" as const,
      phone: "+966 50 345 6789",
    },
    {
      id: "EMP004",
      name: "Noor Al-Otaibi",
      position: "Head Nurse",
      department: "Cardiology",
      hireDate: "Aug 2020",
      salary: 8500,
      status: "on-leave" as const,
      phone: "+966 56 456 7890",
    },
    {
      id: "EMP005",
      name: "Sarah Al-Shehri",
      position: "General Practitioner",
      department: "Internal Medicine",
      hireDate: "Feb 2022",
      salary: 12000,
      status: "active" as const,
      phone: "+966 54 567 8901",
    },
    {
      id: "EMP006",
      name: "Khalid Al-Mutairi",
      position: "Ophthalmologist",
      department: "Ophthalmology",
      hireDate: "Sep 2018",
      salary: 17500,
      status: "active" as const,
      phone: "+966 55 678 9012",
    },
  ];

  const payroll = [
    {
      employeeName: "Hassan Al-Rashid",
      baseSalary: 18000,
      allowances: 3000,
      deductions: 2700,
      netSalary: 18300,
      status: "paid" as const,
      month: "January 2024",
    },
    {
      employeeName: "Fatima Al-Dosari",
      baseSalary: 16500,
      allowances: 2500,
      deductions: 2475,
      netSalary: 16525,
      status: "paid" as const,
      month: "January 2024",
    },
    {
      employeeName: "Mohammed Al-Harbi",
      baseSalary: 19500,
      allowances: 3500,
      deductions: 2925,
      netSalary: 20075,
      status: "pending" as const,
      month: "January 2024",
    },
  ];

  const attendance = [
    {
      employeeName: "Hassan Al-Rashid",
      date: "Jan 18, 2024",
      checkIn: "8:00 AM",
      checkOut: "5:30 PM",
      status: "present" as const,
      hoursWorked: 9.5,
    },
    {
      employeeName: "Fatima Al-Dosari",
      date: "Jan 18, 2024",
      checkIn: "8:15 AM",
      checkOut: "5:45 PM",
      status: "late" as const,
      hoursWorked: 9.5,
    },
    {
      employeeName: "Mohammed Al-Harbi",
      date: "Jan 18, 2024",
      checkIn: "7:45 AM",
      checkOut: "3:30 PM",
      status: "early-leave" as const,
      hoursWorked: 7.75,
    },
    {
      employeeName: "Noor Al-Otaibi",
      date: "Jan 18, 2024",
      checkIn: "-",
      checkOut: "-",
      status: "absent" as const,
      hoursWorked: 0,
    },
  ];

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeEmployees = employees.filter((e) => e.status === "active").length;
  const totalPayroll = payroll.reduce((sum, p) => sum + p.netSalary, 0);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">HR Management</h1>
          <p className="text-lg text-slate-600">
            Employee profiles, payroll, attendance, and performance management
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <p className="text-sm text-slate-600 mb-1">Total Employees</p>
            <p className="text-3xl font-bold text-slate-900">{employees.length}</p>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <p className="text-sm text-slate-600 mb-1">Active</p>
            <p className="text-3xl font-bold text-green-600">{activeEmployees}</p>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <p className="text-sm text-slate-600 mb-1">Monthly Payroll</p>
            <p className="text-3xl font-bold text-blue-600">SAR {(totalPayroll / 1000).toFixed(0)}K</p>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <p className="text-sm text-slate-600 mb-1">On Leave</p>
            <p className="text-3xl font-bold text-yellow-600">
              {employees.filter((e) => e.status === "on-leave").length}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-slate-200 overflow-x-auto">
          {[
            { id: "employees", label: "Employees" },
            { id: "payroll", label: "Payroll" },
            { id: "attendance", label: "Attendance" },
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
          {activeTab === "employees" && (
            <>
              {/* Search and Filter */}
              <div className="bg-white rounded-lg border border-slate-200 p-6 mb-8">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search employees by name, ID, or position..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                    <Plus className="w-5 h-5" />
                    Add Employee
                  </button>
                </div>
              </div>

              {/* Employees Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEmployees.map((employee, index) => (
                  <EmployeeCard key={index} {...employee} />
                ))}
              </div>

              {filteredEmployees.length === 0 && (
                <div className="text-center py-12 bg-slate-50 rounded-lg border border-slate-200">
                  <p className="text-slate-600">No employees found matching your search.</p>
                </div>
              )}
            </>
          )}

          {activeTab === "payroll" && (
            <div>
              <div className="bg-white rounded-lg border border-slate-200 p-6 mb-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">Payroll Summary</h3>
                    <p className="text-slate-600">January 2024</p>
                  </div>
                  <button className="mt-4 md:mt-0 flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                    <DollarSign className="w-5 h-5" />
                    Process Payroll
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-slate-200 p-6">
                {payroll.map((item, index) => (
                  <PayrollItem key={index} {...item} />
                ))}
              </div>
            </div>
          )}

          {activeTab === "attendance" && (
            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-6">
                Attendance - January 18, 2024
              </h3>
              {attendance.map((record, index) => (
                <AttendanceRecord key={index} {...record} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
