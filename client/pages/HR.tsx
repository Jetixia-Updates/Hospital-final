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
  UserCheck,
  FileText,
  GraduationCap,
  Heart,
  Zap,
  Target,
  TrendingDown,
  Phone,
  Mail,
  MapPin,
  Building2,
  Download,
  Upload,
  Edit,
  Eye,
  CheckCircle,
  XCircle,
  ClipboardList,
  Banknote,
  BarChart3,
  UserPlus,
  UserMinus,
  Activity,
  Shield,
  Stethoscope,
  Building,
  ClipboardCheck,
  LogOut,
  X,
  Save,
  MoreVertical,
  CalendarCheck,
  CalendarX,
  Wallet,
  TrendingUpIcon,
  PieChart,
  LayoutGrid,
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
import { useHR } from "@/hooks/use-hr";
import { Employee, EmployeeType, ContractType, EmployeeStatus } from "@shared/hr";

export default function HR() {
  const { t } = useTranslation();
  const {
    employees,
    getEmployees,
    getStatistics,
    getDepartments,
    HOSPITAL_DEPARTMENTS,
    MEDICAL_SPECIALIZATIONS,
    JOB_POSITIONS,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    leaveRequests,
    getLeaveRequests,
    requestLeave,
    approveLeave,
    rejectLeave,
    attendanceRecords,
    getAttendance,
    payrollRecords,
    getPayrollRecords,
    generatePayroll,
    processPayroll,
    payPayroll,
  } = useHR();

  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [employeeTypeFilter, setEmployeeTypeFilter] = useState<EmployeeType | "all">("all");
  const [statusFilter, setStatusFilter] = useState<EmployeeStatus | "all">("all");
  const [isAddEmployeeDialogOpen, setIsAddEmployeeDialogOpen] = useState(false);
  const [isEmployeeDetailsOpen, setIsEmployeeDetailsOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isLeaveRequestOpen, setIsLeaveRequestOpen] = useState(false);
  const [employeeForm, setEmployeeForm] = useState({
    firstName: "",
    lastName: "",
    fullNameAr: "",
    dateOfBirth: "",
    gender: "male" as "male" | "female",
    nationality: "Saudi",
    nationalId: "",
    maritalStatus: "single" as "single" | "married" | "divorced" | "widowed",
    phone: "",
    email: "",
    employeeType: "doctor" as EmployeeType,
    position: "",
    department: "",
    specialization: "",
    contractType: "permanent" as ContractType,
    hireDate: "",
    baseSalary: "",
    housingAllowance: "",
    transportAllowance: "",
  });

  const stats = getStatistics();
  
  const filteredEmployees = getEmployees({
    search: searchTerm,
    department: departmentFilter !== "all" ? departmentFilter : undefined,
    employeeType: employeeTypeFilter !== "all" ? employeeTypeFilter : undefined,
    status: statusFilter !== "all" ? statusFilter : undefined,
  });

  const pendingLeaves = getLeaveRequests({ status: 'pending' });
  const todayAttendance = getAttendance({
    dateRange: {
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date().toISOString().split('T')[0],
    },
  });

  const handleAddEmployee = () => {
    const now = new Date();
    const age = Math.floor((now.getTime() - new Date(employeeForm.dateOfBirth).getTime()) / (365.25 * 24 * 60 * 60 * 1000));
    
    const baseSalaryNum = parseFloat(employeeForm.baseSalary) || 0;
    const housingNum = parseFloat(employeeForm.housingAllowance) || 0;
    const transportNum = parseFloat(employeeForm.transportAllowance) || 0;
    const totalAllowances = housingNum + transportNum;
    const socialInsurance = baseSalaryNum * 0.08;
    const pension = baseSalaryNum * 0.10;
    
    addEmployee({
      personalInfo: {
        firstName: employeeForm.firstName,
        lastName: employeeForm.lastName,
        fullNameAr: employeeForm.fullNameAr,
        fullNameEn: `${employeeForm.firstName} ${employeeForm.lastName}`,
        dateOfBirth: employeeForm.dateOfBirth,
        age,
        gender: employeeForm.gender,
        nationality: employeeForm.nationality,
        nationalId: employeeForm.nationalId,
        maritalStatus: employeeForm.maritalStatus,
        numberOfDependents: 0,
      },
      contactInfo: {
        phone: employeeForm.phone,
        mobilePhone: employeeForm.phone,
        email: employeeForm.email,
        emergencyContact: {
          name: '',
          relationship: '',
          phone: '',
        },
        address: {
          street: '',
          city: 'Riyadh',
          region: 'Riyadh',
          country: 'Saudi Arabia',
        },
      },
      employmentInfo: {
        employeeType: employeeForm.employeeType,
        position: employeeForm.position,
        positionId: employeeForm.position.toLowerCase().replace(/\s+/g, '-'),
        department: HOSPITAL_DEPARTMENTS.find(d => d.id === employeeForm.department)?.nameEn || '',
        departmentId: employeeForm.department,
        specialization: MEDICAL_SPECIALIZATIONS.find(s => s.id === employeeForm.specialization)?.nameEn,
        specializationId: employeeForm.specialization,
        contractType: employeeForm.contractType,
        employmentStatus: 'active',
        hireDate: employeeForm.hireDate,
        workLocation: 'Main Building',
        shiftType: 'morning',
      },
      compensation: {
        baseSalary: baseSalaryNum,
        currency: 'SAR',
        allowances: {
          housing: housingNum,
          transportation: transportNum,
        },
        deductions: {
          socialInsurance,
          pension,
        },
        totalMonthlyCompensation: baseSalaryNum + totalAllowances - socialInsurance - pension,
      },
      qualifications: {
        education: [],
        certifications: [],
        licenses: [],
        languages: [],
      },
      experience: {
        yearsOfExperience: 0,
      },
      performance: {
        reviews: [],
      },
      leaveBalance: {
        annualLeave: { total: 30, used: 0, remaining: 30 },
        sickLeave: { total: 15, used: 0, remaining: 15 },
        emergencyLeave: { total: 5, used: 0, remaining: 5 },
      },
      documents: [],
      status: 'active',
      isActive: true,
    });

    setEmployeeForm({
      firstName: "",
      lastName: "",
      fullNameAr: "",
      dateOfBirth: "",
      gender: "male",
      nationality: "Saudi",
      nationalId: "",
      maritalStatus: "single",
      phone: "",
      email: "",
      employeeType: "doctor",
      position: "",
      department: "",
      specialization: "",
      contractType: "permanent",
      hireDate: "",
      baseSalary: "",
      housingAllowance: "",
      transportAllowance: "",
    });
    setIsAddEmployeeDialogOpen(false);
  };

  const getStatusColor = (status: EmployeeStatus) => {
    const colors = {
      active: 'bg-green-100 text-green-800',
      'on-leave': 'bg-yellow-100 text-yellow-800',
      suspended: 'bg-orange-100 text-orange-800',
      resigned: 'bg-gray-100 text-gray-800',
      terminated: 'bg-red-100 text-red-800',
      retired: 'bg-blue-100 text-blue-800',
    };
    return colors[status] || colors.active;
  };

  const getEmployeeTypeIcon = (type: EmployeeType) => {
    const icons = {
      doctor: Stethoscope,
      nurse: Heart,
      admin: Briefcase,
      technician: Activity,
      support: Users,
      management: Shield,
    };
    return icons[type] || Users;
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">{t('navigation.hr')}</h1>
            <p className="text-lg text-slate-600">
              نظام إدارة الموارد البشرية المتكامل
            </p>
          </div>
          <Button onClick={() => setIsAddEmployeeDialogOpen(true)} className="bg-blue-600 hover:bg-blue-700">
            <UserPlus className="w-5 h-5 mr-2" />
            إضافة موظف
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Users className="w-8 h-8 opacity-80" />
                <TrendingUp className="w-5 h-5 opacity-60" />
              </div>
              <p className="text-sm opacity-90 mb-1">إجمالي الموظفين</p>
              <p className="text-3xl font-bold">{stats.totalEmployees}</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <UserCheck className="w-8 h-8 opacity-80" />
                <CheckCircle className="w-5 h-5 opacity-60" />
              </div>
              <p className="text-sm opacity-90 mb-1">الموظفون النشطون</p>
              <p className="text-3xl font-bold">{stats.activeEmployees}</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <DollarSign className="w-8 h-8 opacity-80" />
                <Wallet className="w-5 h-5 opacity-60" />
              </div>
              <p className="text-sm opacity-90 mb-1">الرواتب الشهرية</p>
              <p className="text-3xl font-bold">{(stats.monthlyPayroll / 1000).toFixed(0)}K</p>
              <p className="text-xs opacity-75">ريال سعودي</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Calendar className="w-8 h-8 opacity-80" />
                <AlertCircle className="w-5 h-5 opacity-60" />
              </div>
              <p className="text-sm opacity-90 mb-1">في إجازة</p>
              <p className="text-3xl font-bold">{stats.onLeaveEmployees}</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-white hover:shadow-lg transition-shadow cursor-pointer border-2 border-blue-100">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <CalendarCheck className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">طلبات الإجازة المعلقة</p>
                  <p className="text-2xl font-bold text-slate-900">{pendingLeaves.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white hover:shadow-lg transition-shadow cursor-pointer border-2 border-green-100">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">الحضور اليوم</p>
                  <p className="text-2xl font-bold text-slate-900">{todayAttendance.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white hover:shadow-lg transition-shadow cursor-pointer border-2 border-purple-100">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                  <Building className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">الأقسام</p>
                  <p className="text-2xl font-bold text-slate-900">{HOSPITAL_DEPARTMENTS.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-slate-100 p-1 rounded-lg">
            <TabsTrigger value="overview" className="data-[state=active]:bg-white">
              <LayoutGrid className="w-4 h-4 mr-2" />
              نظرة عامة
            </TabsTrigger>
            <TabsTrigger value="employees" className="data-[state=active]:bg-white">
              <Users className="w-4 h-4 mr-2" />
              الموظفون
            </TabsTrigger>
            <TabsTrigger value="departments" className="data-[state=active]:bg-white">
              <Building className="w-4 h-4 mr-2" />
              الأقسام
            </TabsTrigger>
            <TabsTrigger value="leave" className="data-[state=active]:bg-white">
              <Calendar className="w-4 h-4 mr-2" />
              الإجازات
            </TabsTrigger>
            <TabsTrigger value="attendance" className="data-[state=active]:bg-white">
              <ClipboardCheck className="w-4 h-4 mr-2" />
              الحضور
            </TabsTrigger>
            <TabsTrigger value="payroll" className="data-[state=active]:bg-white">
              <DollarSign className="w-4 h-4 mr-2" />
              الرواتب
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* By Department */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="w-5 h-5 text-blue-600" />
                    توزيع الموظفين حسب القسم
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {stats.byDepartment.slice(0, 8).map((dept, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">{dept.department}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-blue-600 rounded-full"
                              style={{ width: `${(dept.count / stats.totalEmployees) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm font-semibold text-slate-900 w-8 text-right">{dept.count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* By Employee Type */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-green-600" />
                    توزيع الموظفين حسب النوع
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {stats.byEmployeeType.map((type, index) => {
                      const Icon = getEmployeeTypeIcon(type.type);
                      const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-orange-500', 'bg-pink-500'];
                      return (
                        <div key={index} className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-lg ${colors[index % colors.length]} flex items-center justify-center`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-slate-900 capitalize">{type.type}</p>
                            <p className="text-xs text-slate-500">{type.count} موظف</p>
                          </div>
                          <span className="text-2xl font-bold text-slate-900">{type.count}</span>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Gender Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>التوزيع حسب الجنس</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 rounded-lg p-4 text-center">
                      <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <p className="text-sm text-slate-600 mb-1">ذكور</p>
                      <p className="text-3xl font-bold text-blue-600">{stats.genderDistribution.male}</p>
                      <p className="text-xs text-slate-500 mt-1">
                        {((stats.genderDistribution.male / stats.totalEmployees) * 100).toFixed(1)}%
                      </p>
                    </div>
                    <div className="bg-pink-50 rounded-lg p-4 text-center">
                      <Users className="w-8 h-8 text-pink-600 mx-auto mb-2" />
                      <p className="text-sm text-slate-600 mb-1">إناث</p>
                      <p className="text-3xl font-bold text-pink-600">{stats.genderDistribution.female}</p>
                      <p className="text-xs text-slate-500 mt-1">
                        {((stats.genderDistribution.female / stats.totalEmployees) * 100).toFixed(1)}%
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Additional Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>إحصائيات إضافية</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b border-slate-200">
                      <span className="text-sm text-slate-600">متوسط العمر</span>
                      <span className="text-lg font-bold text-slate-900">{stats.averageAge.toFixed(1)} سنة</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-slate-200">
                      <span className="text-sm text-slate-600">متوسط سنوات الخبرة</span>
                      <span className="text-lg font-bold text-slate-900">{stats.averageTenure.toFixed(1)} سنة</span>
                    </div>
                    <div className="flex items-center justify-between py-3">
                      <span className="text-sm text-slate-600">إجمالي الرواتب الشهرية</span>
                      <span className="text-lg font-bold text-green-600">{stats.monthlyPayroll.toLocaleString()} ر.س</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Employees Tab */}
          <TabsContent value="employees" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                    <Input
                      type="text"
                      placeholder="بحث بالاسم، الرقم، البريد..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="جميع الأقسام" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">جميع الأقسام</SelectItem>
                      {HOSPITAL_DEPARTMENTS.map(dept => (
                        <SelectItem key={dept.id} value={dept.id}>{dept.nameAr}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={employeeTypeFilter} onValueChange={(v) => setEmployeeTypeFilter(v as any)}>
                    <SelectTrigger>
                      <SelectValue placeholder="جميع الأنواع" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">جميع الأنواع</SelectItem>
                      <SelectItem value="doctor">أطباء</SelectItem>
                      <SelectItem value="nurse">ممرضين</SelectItem>
                      <SelectItem value="technician">فنيين</SelectItem>
                      <SelectItem value="admin">إداريين</SelectItem>
                      <SelectItem value="support">دعم</SelectItem>
                      <SelectItem value="management">إدارة</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as any)}>
                    <SelectTrigger>
                      <SelectValue placeholder="جميع الحالات" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">جميع الحالات</SelectItem>
                      <SelectItem value="active">نشط</SelectItem>
                      <SelectItem value="on-leave">في إجازة</SelectItem>
                      <SelectItem value="suspended">موقوف</SelectItem>
                      <SelectItem value="resigned">مستقيل</SelectItem>
                      <SelectItem value="terminated">منتهي الخدمة</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Employees Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEmployees.map((employee) => {
                const Icon = getEmployeeTypeIcon(employee.employmentInfo.employeeType);
                return (
                  <Card key={employee.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => {
                    setSelectedEmployee(employee);
                    setIsEmployeeDetailsOpen(true);
                  }}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                            <Icon className="w-6 h-6 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-slate-900">{employee.personalInfo.fullNameEn}</h3>
                            <p className="text-xs text-slate-500">{employee.employeeNumber}</p>
                          </div>
                        </div>
                        <Badge className={getStatusColor(employee.status)}>
                          {employee.status}
                        </Badge>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-600">المنصب:</span>
                          <span className="font-medium text-slate-900">{employee.employmentInfo.position}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-600">القسم:</span>
                          <span className="font-medium text-slate-900">{employee.employmentInfo.department}</span>
                        </div>
                        {employee.employmentInfo.specialization && (
                          <div className="flex items-center justify-between">
                            <span className="text-slate-600">التخصص:</span>
                            <span className="font-medium text-slate-900">{employee.employmentInfo.specialization}</span>
                          </div>
                        )}
                        <div className="flex items-center justify-between pt-2 border-t">
                          <span className="text-slate-600">الراتب:</span>
                          <span className="font-bold text-green-600">{employee.compensation.baseSalary.toLocaleString()} ر.س</span>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Eye className="w-4 h-4 mr-1" />
                          عرض
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          <Edit className="w-4 h-4 mr-1" />
                          تعديل
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {filteredEmployees.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <Users className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-600">لا توجد نتائج</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Departments Tab */}
          <TabsContent value="departments" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {HOSPITAL_DEPARTMENTS.map((dept) => {
                const deptEmployees = employees.filter(e => e.employmentInfo.departmentId === dept.id);
                const typeColors = {
                  clinical: 'bg-blue-100 text-blue-800',
                  diagnostic: 'bg-purple-100 text-purple-800',
                  support: 'bg-green-100 text-green-800',
                  administrative: 'bg-orange-100 text-orange-800',
                  facilities: 'bg-gray-100 text-gray-800',
                  logistics: 'bg-pink-100 text-pink-800',
                };
                return (
                  <Card key={dept.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-slate-900 mb-1">{dept.nameAr}</h3>
                          <p className="text-xs text-slate-500">{dept.nameEn}</p>
                        </div>
                        <Badge className={typeColors[dept.type]}>
                          {dept.type}
                        </Badge>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-600">عدد الموظفين:</span>
                          <span className="text-lg font-bold text-slate-900">{deptEmployees.length}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-600">أطباء:</span>
                          <span className="font-medium text-slate-900">
                            {deptEmployees.filter(e => e.employmentInfo.employeeType === 'doctor').length}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-600">ممرضين:</span>
                          <span className="font-medium text-slate-900">
                            {deptEmployees.filter(e => e.employmentInfo.employeeType === 'nurse').length}
                          </span>
                        </div>
                      </div>

                      <Button className="w-full mt-4" variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        عرض التفاصيل
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Leave Tab */}
          <TabsContent value="leave" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>طلبات الإجازة</CardTitle>
              </CardHeader>
              <CardContent>
                {pendingLeaves.length > 0 ? (
                  <div className="space-y-4">
                    {pendingLeaves.map((leave) => (
                      <div key={leave.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-900">{leave.employeeName}</h4>
                          <p className="text-sm text-slate-600">{leave.department}</p>
                          <p className="text-xs text-slate-500 mt-1">
                            {leave.startDate} - {leave.endDate} ({leave.totalDays} أيام)
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="text-green-600">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            موافقة
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-600">
                            <XCircle className="w-4 h-4 mr-1" />
                            رفض
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-2" />
                    <p className="text-slate-600">لا توجد طلبات إجازة معلقة</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Attendance Tab */}
          <TabsContent value="attendance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>سجل الحضور - اليوم</CardTitle>
              </CardHeader>
              <CardContent>
                {todayAttendance.length > 0 ? (
                  <div className="space-y-2">
                    {todayAttendance.map((record) => (
                      <div key={record.id} className="flex items-center justify-between p-3 border-b last:border-0">
                        <div>
                          <p className="font-semibold text-slate-900">{record.employeeName}</p>
                          <p className="text-xs text-slate-500">{record.department}</p>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="text-center">
                            <p className="text-slate-600">دخول</p>
                            <p className="font-medium">{record.checkIn || '-'}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-slate-600">خروج</p>
                            <p className="font-medium">{record.checkOut || '-'}</p>
                          </div>
                          <Badge className={
                            record.status === 'present' ? 'bg-green-100 text-green-800' :
                            record.status === 'late' ? 'bg-yellow-100 text-yellow-800' :
                            record.status === 'absent' ? 'bg-red-100 text-red-800' : ''
                          }>
                            {record.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Clock className="w-12 h-12 text-slate-300 mx-auto mb-2" />
                    <p className="text-slate-600">لا توجد سجلات حضور اليوم</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payroll Tab */}
          <TabsContent value="payroll" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>سجل الرواتب</CardTitle>
                <Button onClick={() => generatePayroll(new Date().toISOString().slice(0, 7))} className="bg-green-600 hover:bg-green-700">
                  <DollarSign className="w-4 h-4 mr-2" />
                  إنشاء رواتب الشهر
                </Button>
              </CardHeader>
              <CardContent>
                {payrollRecords.length > 0 ? (
                  <div className="space-y-4">
                    {payrollRecords.slice(0, 10).map((record) => (
                      <div key={record.id} className="p-4 bg-slate-50 rounded-lg">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-semibold text-slate-900">{record.employeeName}</h4>
                            <p className="text-sm text-slate-600">{record.department} - {record.position}</p>
                          </div>
                          <Badge className={
                            record.status === 'paid' ? 'bg-green-100 text-green-800' :
                            record.status === 'processed' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }>
                            {record.status}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-slate-600">الراتب الأساسي</p>
                            <p className="font-bold text-slate-900">{record.baseSalary.toLocaleString()} ر.س</p>
                          </div>
                          <div>
                            <p className="text-slate-600">البدلات</p>
                            <p className="font-bold text-green-600">
                              +{record.allowances.reduce((sum, a) => sum + a.amount, 0).toLocaleString()} ر.س
                            </p>
                          </div>
                          <div>
                            <p className="text-slate-600">الاستقطاعات</p>
                            <p className="font-bold text-red-600">
                              -{record.totalDeductions.toLocaleString()} ر.س
                            </p>
                          </div>
                          <div>
                            <p className="text-slate-600">الصافي</p>
                            <p className="font-bold text-blue-600">{record.netSalary.toLocaleString()} ر.س</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Wallet className="w-12 h-12 text-slate-300 mx-auto mb-2" />
                    <p className="text-slate-600">لم يتم إنشاء رواتب بعد</p>
                    <Button onClick={() => generatePayroll(new Date().toISOString().slice(0, 7))} className="mt-4">
                      إنشاء رواتب الشهر الحالي
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Add Employee Dialog */}
        <Dialog open={isAddEmployeeDialogOpen} onOpenChange={setIsAddEmployeeDialogOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-blue-600" />
                إضافة موظف جديد
              </DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">الاسم الأول</Label>
                <Input
                  id="firstName"
                  value={employeeForm.firstName}
                  onChange={(e) => setEmployeeForm({ ...employeeForm, firstName: e.target.value })}
                  placeholder="أدخل الاسم الأول"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">اسم العائلة</Label>
                <Input
                  id="lastName"
                  value={employeeForm.lastName}
                  onChange={(e) => setEmployeeForm({ ...employeeForm, lastName: e.target.value })}
                  placeholder="أدخل اسم العائلة"
                />
              </div>
              <div className="space-y-2 col-span-2">
                <Label htmlFor="fullNameAr">الاسم الكامل بالعربي</Label>
                <Input
                  id="fullNameAr"
                  value={employeeForm.fullNameAr}
                  onChange={(e) => setEmployeeForm({ ...employeeForm, fullNameAr: e.target.value })}
                  placeholder="أدخل الاسم الكامل بالعربي"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">تاريخ الميلاد</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={employeeForm.dateOfBirth}
                  onChange={(e) => setEmployeeForm({ ...employeeForm, dateOfBirth: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">الجنس</Label>
                <Select value={employeeForm.gender} onValueChange={(v: any) => setEmployeeForm({ ...employeeForm, gender: v })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">ذكر</SelectItem>
                    <SelectItem value="female">أنثى</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="nationalId">رقم الهوية</Label>
                <Input
                  id="nationalId"
                  value={employeeForm.nationalId}
                  onChange={(e) => setEmployeeForm({ ...employeeForm, nationalId: e.target.value })}
                  placeholder="1234567890"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">رقم الجوال</Label>
                <Input
                  id="phone"
                  value={employeeForm.phone}
                  onChange={(e) => setEmployeeForm({ ...employeeForm, phone: e.target.value })}
                  placeholder="+966 50 XXX XXXX"
                />
              </div>
              <div className="space-y-2 col-span-2">
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <Input
                  id="email"
                  type="email"
                  value={employeeForm.email}
                  onChange={(e) => setEmployeeForm({ ...employeeForm, email: e.target.value })}
                  placeholder="employee@hospital.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="employeeType">نوع الموظف</Label>
                <Select value={employeeForm.employeeType} onValueChange={(v: any) => setEmployeeForm({ ...employeeForm, employeeType: v })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="doctor">طبيب</SelectItem>
                    <SelectItem value="nurse">ممرض/ممرضة</SelectItem>
                    <SelectItem value="technician">فني</SelectItem>
                    <SelectItem value="admin">إداري</SelectItem>
                    <SelectItem value="support">دعم</SelectItem>
                    <SelectItem value="management">إدارة</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="position">المنصب</Label>
                <Select value={employeeForm.position} onValueChange={(v) => setEmployeeForm({ ...employeeForm, position: v })}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر المنصب" />
                  </SelectTrigger>
                  <SelectContent>
                    {JOB_POSITIONS.map(pos => (
                      <SelectItem key={pos.id} value={pos.id}>{pos.nameAr}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">القسم</Label>
                <Select value={employeeForm.department} onValueChange={(v) => setEmployeeForm({ ...employeeForm, department: v })}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر القسم" />
                  </SelectTrigger>
                  <SelectContent>
                    {HOSPITAL_DEPARTMENTS.map(dept => (
                      <SelectItem key={dept.id} value={dept.id}>{dept.nameAr}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="specialization">التخصص (اختياري)</Label>
                <Select value={employeeForm.specialization} onValueChange={(v) => setEmployeeForm({ ...employeeForm, specialization: v })}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر التخصص" />
                  </SelectTrigger>
                  <SelectContent>
                    {MEDICAL_SPECIALIZATIONS.map(spec => (
                      <SelectItem key={spec.id} value={spec.id}>{spec.nameAr}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="contractType">نوع العقد</Label>
                <Select value={employeeForm.contractType} onValueChange={(v: any) => setEmployeeForm({ ...employeeForm, contractType: v })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="permanent">دائم</SelectItem>
                    <SelectItem value="temporary">مؤقت</SelectItem>
                    <SelectItem value="contract">عقد</SelectItem>
                    <SelectItem value="part-time">دوام جزئي</SelectItem>
                    <SelectItem value="consultant">استشاري</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="hireDate">تاريخ التعيين</Label>
                <Input
                  id="hireDate"
                  type="date"
                  value={employeeForm.hireDate}
                  onChange={(e) => setEmployeeForm({ ...employeeForm, hireDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="baseSalary">الراتب الأساسي (ر.س)</Label>
                <Input
                  id="baseSalary"
                  type="number"
                  value={employeeForm.baseSalary}
                  onChange={(e) => setEmployeeForm({ ...employeeForm, baseSalary: e.target.value })}
                  placeholder="18000"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="housingAllowance">بدل السكن (ر.س)</Label>
                <Input
                  id="housingAllowance"
                  type="number"
                  value={employeeForm.housingAllowance}
                  onChange={(e) => setEmployeeForm({ ...employeeForm, housingAllowance: e.target.value })}
                  placeholder="3000"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="transportAllowance">بدل المواصلات (ر.س)</Label>
                <Input
                  id="transportAllowance"
                  type="number"
                  value={employeeForm.transportAllowance}
                  onChange={(e) => setEmployeeForm({ ...employeeForm, transportAllowance: e.target.value })}
                  placeholder="1000"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddEmployeeDialogOpen(false)}>
                {t('common.cancel')}
              </Button>
              <Button onClick={handleAddEmployee}>
                <Save className="w-4 h-4 mr-2" />
                {t('common.save')}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        </div>
      </Layout>
  );
}
