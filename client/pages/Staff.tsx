import Layout from "@/components/Layout";
import {
  Search,
  Users,
  Stethoscope,
  Heart,
  Brain,
  Plus,
  Filter,
  Calendar,
  AlertCircle,
  ArrowRight,
  Award,
  Clock,
  CheckCircle2,
  XCircle,
  TrendingUp,
  UserCheck,
  UserX,
  Mail,
  Phone,
  Download,
  Edit,
  Trash2,
  Eye,
  BarChart3,
  Activity,
  Star,
  FileText,
  ClipboardCheck,
  Timer,
  BriefcaseMedical,
  GraduationCap,
  Building2,
  MapPin,
  Settings,
  MoreVertical,
} from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

const StaffCard = ({
  id,
  name,
  role,
  specialty,
  department,
  experience,
  status,
  phone,
  email,
  qualifications,
}: {
  id: string;
  name: string;
  role: string;
  specialty: string;
  department: string;
  experience: number;
  status: "available" | "on-duty" | "on-leave";
  phone: string;
  email: string;
  qualifications: string[];
}) => {
  const { t } = useTranslation();
  const statusConfig = {
    available: { bg: "bg-green-50", badge: t('staff.available'), color: "text-green-700" },
    "on-duty": { bg: "bg-blue-50", badge: t('staff.onDuty'), color: "text-blue-700" },
    "on-leave": { bg: "bg-yellow-50", badge: t('staff.onLeave'), color: "text-yellow-700" },
  };

  const config = statusConfig[status];
  const roleIcon = role.includes("Doctor") || role.includes("Physician") ? 
    <Stethoscope className="w-5 h-5 text-blue-600" /> : 
    <Heart className="w-5 h-5 text-red-600" />;

  return (
    <div className={`${config.bg} rounded-lg border border-slate-200 p-6 hover:shadow-md transition-shadow`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
            {roleIcon}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900">{name}</h3>
            <p className="text-sm text-slate-500">ID: {id}</p>
          </div>
        </div>
        <span className={`text-xs font-semibold px-3 py-1 rounded-full bg-white border ${config.color} border-current`}>
          {config.badge}
        </span>
      </div>

      <div className="space-y-2 text-sm text-slate-600 mb-4">
        <div className="flex items-center justify-between">
          <span>{t('staff.role')}:</span>
          <span className="font-medium text-slate-900">{role}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>{t('rooms.department')}:</span>
          <span className="font-medium text-slate-900">{department}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>{t('staff.specialty')}:</span>
          <span className="font-medium text-slate-900">{specialty}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>{t('staff.experience')}:</span>
          <span className="font-medium text-slate-900">{experience} {t('staff.years')}</span>
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-slate-300">
          <span>{t('crm.email')}:</span>
          <span className="font-medium text-slate-900 text-xs">{email}</span>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-xs text-slate-600 uppercase tracking-wide mb-2">{t('staff.qualifications')}</p>
        <div className="flex flex-wrap gap-1">
          {qualifications.map((qual, i) => (
            <span key={i} className="text-xs bg-white px-2 py-1 rounded border border-slate-200">
              {qual}
            </span>
          ))}
        </div>
      </div>

      <button className="w-full bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-2">
        {t('staff.viewProfile')} <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};

const ShiftSchedule = ({
  staffMember,
  date,
  shiftType,
  startTime,
  endTime,
  department,
  status,
}: {
  staffMember: string;
  date: string;
  shiftType: string;
  startTime: string;
  endTime: string;
  department: string;
  status: "confirmed" | "pending" | "swapped";
}) => {
  const { t } = useTranslation();
  const statusConfig = {
    confirmed: { color: "text-green-700", bg: "bg-green-50" },
    pending: { color: "text-yellow-700", bg: "bg-yellow-50" },
    swapped: { color: "text-blue-700", bg: "bg-blue-50" },
  };

  const config = statusConfig[status];

  return (
    <div className="border-b border-slate-200 py-4 last:border-b-0">
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="font-semibold text-slate-900">{staffMember}</p>
          <p className="text-xs text-slate-500">{department}</p>
        </div>
        <span className={`text-xs font-semibold px-2 py-1 rounded ${config.bg} ${config.color}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>
      <div className="grid grid-cols-4 gap-4 text-sm">
        <div>
          <p className="text-slate-600">{t('common.date')}</p>
          <p className="font-medium text-slate-900">{date}</p>
        </div>
        <div>
          <p className="text-slate-600">{t('staff.shift')}</p>
          <p className="font-medium text-slate-900">{shiftType}</p>
        </div>
        <div>
          <p className="text-slate-600">{t('staff.from')}</p>
          <p className="font-medium text-slate-900">{startTime}</p>
        </div>
        <div>
          <p className="text-slate-600">{t('staff.to')}</p>
          <p className="font-medium text-slate-900">{endTime}</p>
        </div>
      </div>
    </div>
  );
};

export default function Staff() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const [roleFilter, setRoleFilter] = useState("all");
  const [isAddStaffDialogOpen, setIsAddStaffDialogOpen] = useState(false);
  const [isScheduleShiftDialogOpen, setIsScheduleShiftDialogOpen] = useState(false);
  const [isLeaveRequestDialogOpen, setIsLeaveRequestDialogOpen] = useState(false);
  const [isAttendanceDialogOpen, setIsAttendanceDialogOpen] = useState(false);
  const [isPerformanceDialogOpen, setIsPerformanceDialogOpen] = useState(false);
  
  const [staffForm, setStaffForm] = useState({
    name: "",
    role: "",
    specialty: "",
    department: "",
    experience: "",
    phone: "",
    email: "",
    qualifications: "",
    salary: "",
    employmentType: "full-time",
    startDate: "",
  });

  const [shiftForm, setShiftForm] = useState({
    staffId: "",
    staffName: "",
    date: "",
    shiftType: "morning",
    startTime: "",
    endTime: "",
    department: "",
  });

  const [leaveForm, setLeaveForm] = useState({
    staffId: "",
    staffName: "",
    leaveType: "annual",
    startDate: "",
    endDate: "",
    reason: "",
    emergencyContact: "",
  });

  const [attendanceForm, setAttendanceForm] = useState({
    staffId: "",
    staffName: "",
    date: "",
    checkIn: "",
    checkOut: "",
    status: "present",
    notes: "",
  });

  const [performanceForm, setPerformanceForm] = useState({
    staffId: "",
    staffName: "",
    evaluationDate: "",
    rating: "5",
    punctuality: "5",
    teamwork: "5",
    clinicalSkills: "5",
    communication: "5",
    comments: "",
  });

  const doctors = [
    {
      id: "DOC001",
      name: "Dr. Hassan Al-Rashid",
      role: "Physician - Cardiologist",
      specialty: "Cardiology",
      department: "Cardiology",
      experience: 15,
      status: "available" as const,
      phone: "+966 50 123 4567",
      email: "hassan.rashid@hospital.com",
      qualifications: ["MD", "Board Certified", "Fellowship - Cardiology"],
    },
    {
      id: "DOC002",
      name: "Dr. Fatima Al-Dosari",
      role: "Physician - Neurologist",
      specialty: "Neurology",
      department: "Neurology",
      experience: 12,
      status: "on-duty" as const,
      phone: "+966 55 234 5678",
      email: "fatima.dosari@hospital.com",
      qualifications: ["MD", "Board Certified", "Fellowship - Neurology"],
    },
    {
      id: "DOC003",
      name: "Dr. Mohammed Al-Harbi",
      role: "Physician - Surgeon",
      specialty: "Orthopedic Surgery",
      department: "Orthopedics",
      experience: 18,
      status: "on-duty" as const,
      phone: "+966 50 345 6789",
      email: "mohammed.harbi@hospital.com",
      qualifications: ["MD", "Board Certified", "Fellowship - Orthopedics"],
    },
  ];

  const nurses = [
    {
      id: "NUR001",
      name: "Noor Al-Otaibi",
      role: "Head Nurse",
      specialty: "Critical Care",
      department: "ICU",
      experience: 10,
      status: "on-leave" as const,
      phone: "+966 56 456 7890",
      email: "noor.otaibi@hospital.com",
      qualifications: ["RN", "MSN", "CCRN"],
    },
    {
      id: "NUR002",
      name: "Sarah Al-Shehri",
      role: "Nurse",
      specialty: "General Nursing",
      department: "General Ward",
      experience: 6,
      status: "available" as const,
      phone: "+966 54 567 8901",
      email: "sarah.shehri@hospital.com",
      qualifications: ["RN", "BSN"],
    },
    {
      id: "NUR003",
      name: "Khalid Al-Mutairi",
      role: "Nurse",
      specialty: "Emergency Care",
      department: "Emergency Room",
      experience: 8,
      status: "on-duty" as const,
      phone: "+966 55 678 9012",
      email: "khalid.mutairi@hospital.com",
      qualifications: ["RN", "CEN", "ACLS"],
    },
  ];

  const shifts = [
    {
      staffMember: "Dr. Hassan Al-Rashid",
      date: "Jan 20, 2024",
      shiftType: "Morning",
      startTime: "8:00 AM",
      endTime: "4:00 PM",
      department: "Cardiology",
      status: "confirmed" as const,
    },
    {
      staffMember: "Noor Al-Otaibi",
      date: "Jan 20, 2024",
      shiftType: "Evening",
      startTime: "4:00 PM",
      endTime: "12:00 AM",
      department: "ICU",
      status: "pending" as const,
    },
    {
      staffMember: "Sarah Al-Shehri",
      date: "Jan 21, 2024",
      shiftType: "Night",
      startTime: "12:00 AM",
      endTime: "8:00 AM",
      department: "General Ward",
      status: "confirmed" as const,
    },
    {
      staffMember: "Dr. Mohammed Al-Harbi",
      date: "Jan 21, 2024",
      shiftType: "Morning",
      startTime: "8:00 AM",
      endTime: "4:00 PM",
      department: "Orthopedics",
      status: "swapped" as const,
    },
  ];

  const filteredStaff =
    activeTab === "doctors"
      ? doctors.filter((doc) => {
          const matchSearch =
            doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doc.id.toLowerCase().includes(searchTerm.toLowerCase());
          const matchRole =
            roleFilter === "all" || doc.specialty.toLowerCase() === roleFilter.toLowerCase();
          return matchSearch && matchRole;
        })
      : nurses.filter((nurse) => {
          const matchSearch =
            nurse.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            nurse.id.toLowerCase().includes(searchTerm.toLowerCase());
          return matchSearch;
        });

  const availableStaff = [...doctors, ...nurses].filter((s) => s.status === "available").length;
  const onDutyStaff = [...doctors, ...nurses].filter((s) => s.status === "on-duty").length;

  // Mock data for leave requests
  const leaveRequests = [
    { id: "LR001", staffName: "Dr. Hassan Al-Rashid", type: "Annual Leave", startDate: "Jan 25, 2024", endDate: "Jan 30, 2024", days: 5, status: "pending", reason: "Family vacation" },
    { id: "LR002", staffName: "Noor Al-Otaibi", type: "Sick Leave", startDate: "Jan 22, 2024", endDate: "Jan 23, 2024", days: 2, status: "approved", reason: "Medical appointment" },
    { id: "LR003", staffName: "Sarah Al-Shehri", type: "Emergency Leave", startDate: "Jan 20, 2024", endDate: "Jan 20, 2024", days: 1, status: "rejected", reason: "Personal emergency" },
  ];

  // Mock data for attendance
  const attendanceRecords = [
    { id: "ATT001", staffName: "Dr. Hassan Al-Rashid", date: "Jan 20, 2024", checkIn: "7:55 AM", checkOut: "4:10 PM", hours: "8.25", status: "present" },
    { id: "ATT002", staffName: "Khalid Al-Mutairi", date: "Jan 20, 2024", checkIn: "8:05 AM", checkOut: "4:00 PM", hours: "7.92", status: "late" },
    { id: "ATT003", staffName: "Sarah Al-Shehri", date: "Jan 20, 2024", checkIn: "-", checkOut: "-", hours: "0", status: "absent" },
  ];

  // Mock data for performance evaluations
  const performanceData = [
    { id: "PF001", staffName: "Dr. Hassan Al-Rashid", department: "Cardiology", overallRating: 4.8, punctuality: 5, teamwork: 5, clinicalSkills: 4.5, communication: 5, lastEvaluation: "Jan 15, 2024" },
    { id: "PF002", staffName: "Noor Al-Otaibi", department: "ICU", overallRating: 4.6, punctuality: 4.5, teamwork: 5, clinicalSkills: 4.5, communication: 4.5, lastEvaluation: "Jan 10, 2024" },
    { id: "PF003", staffName: "Dr. Mohammed Al-Harbi", department: "Orthopedics", overallRating: 4.9, punctuality: 5, teamwork: 4.8, clinicalSkills: 5, communication: 4.8, lastEvaluation: "Jan 12, 2024" },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        {/* Enhanced Gradient Header */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 p-8 shadow-2xl">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold text-white mb-1">
                      {t('navigation.staff')}
                    </h1>
                    <p className="text-blue-100 text-lg">
                      نظام إدارة الموظفين المتكامل
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="secondary" className="gap-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/30">
                  <Download className="w-4 h-4" />
                  {t('common.export')}
                </Button>
                <Button className="gap-2 bg-white text-blue-600 hover:bg-blue-50" onClick={() => setIsAddStaffDialogOpen(true)}>
                  <Plus className="w-4 h-4" />
                  إضافة موظف
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <Card className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-blue-50 to-indigo-50">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full -mr-16 -mt-16"></div>
            <CardContent className="pt-6 relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">{t('staff.totalStaff')}</p>
                  <p className="text-4xl font-bold text-slate-900 mb-2">{doctors.length + nurses.length}</p>
                  <div className="flex items-center gap-1 text-xs">
                    <TrendingUp className="w-3 h-3 text-green-600" />
                    <span className="text-green-600 font-medium">+12 {t('common.thisMonth')}</span>
                  </div>
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Users className="w-8 h-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-green-50 to-emerald-50">
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full -mr-16 -mt-16"></div>
            <CardContent className="pt-6 relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">{t('staff.onDuty')}</p>
                  <p className="text-4xl font-bold text-slate-900 mb-2">{onDutyStaff}</p>
                  <p className="text-xs text-slate-600">في العمل الآن</p>
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <UserCheck className="w-8 h-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-purple-50 to-pink-50">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full -mr-16 -mt-16"></div>
            <CardContent className="pt-6 relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">{t('departments.doctors')}</p>
                  <p className="text-4xl font-bold text-slate-900 mb-2">{doctors.length}</p>
                  <p className="text-xs text-slate-600">أطباء مؤهلون</p>
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Stethoscope className="w-8 h-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-orange-50 to-amber-50">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full -mr-16 -mt-16"></div>
            <CardContent className="pt-6 relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">{t('departments.nurses')}</p>
                  <p className="text-4xl font-bold text-slate-900 mb-2">{nurses.length}</p>
                  <p className="text-xs text-slate-600">طاقم تمريض</p>
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Heart className="w-8 h-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-red-50 to-rose-50">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full -mr-16 -mt-16"></div>
            <CardContent className="pt-6 relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">طلبات الإجازة</p>
                  <p className="text-4xl font-bold text-slate-900 mb-2">{leaveRequests.filter(r => r.status === "pending").length}</p>
                  <p className="text-xs text-slate-600">قيد المراجعة</p>
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-rose-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-7 lg:w-auto lg:inline-flex bg-white p-2 rounded-xl shadow-lg border border-slate-200">
            <TabsTrigger value="overview" className="gap-2">
              <BarChart3 className="w-4 h-4" />
              نظرة عامة
            </TabsTrigger>
            <TabsTrigger value="doctors" className="gap-2">
              <Stethoscope className="w-4 h-4" />
              {t('departments.doctors')}
            </TabsTrigger>
            <TabsTrigger value="nurses" className="gap-2">
              <Heart className="w-4 h-4" />
              {t('departments.nurses')}
            </TabsTrigger>
            <TabsTrigger value="schedule" className="gap-2">
              <Calendar className="w-4 h-4" />
              الجداول
            </TabsTrigger>
            <TabsTrigger value="attendance" className="gap-2">
              <ClipboardCheck className="w-4 h-4" />
              الحضور
            </TabsTrigger>
            <TabsTrigger value="leave" className="gap-2">
              <FileText className="w-4 h-4" />
              الإجازات
            </TabsTrigger>
            <TabsTrigger value="performance" className="gap-2">
              <Award className="w-4 h-4" />
              الأداء
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Department Distribution */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-blue-600" />
                    توزيع الموظفين حسب القسم
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {[
                      { department: "Cardiology", count: 12, color: "bg-blue-500" },
                      { department: "Neurology", count: 8, color: "bg-purple-500" },
                      { department: "Orthopedics", count: 10, color: "bg-green-500" },
                      { department: "ICU", count: 15, color: "bg-red-500" },
                      { department: "Emergency", count: 18, color: "bg-orange-500" },
                    ].map((dept, idx) => (
                      <div key={idx}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-slate-700">{dept.department}</span>
                          <span className="text-sm font-bold text-slate-900">{dept.count} موظف</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2.5">
                          <div className={`${dept.color} h-2.5 rounded-full`} style={{ width: `${(dept.count / 63) * 100}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Hires */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                  <CardTitle className="flex items-center gap-2">
                    <UserCheck className="w-5 h-5 text-green-600" />
                    الموظفون الجدد
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {[
                      { name: "Dr. Ahmed Al-Maliki", role: "Cardiologist", date: "Jan 15, 2024", status: "training" },
                      { name: "Layla Al-Qahtani", role: "Senior Nurse", date: "Jan 10, 2024", status: "active" },
                      { name: "Dr. Sara Al-Ghamdi", role: "Neurologist", date: "Jan 5, 2024", status: "active" },
                    ].map((hire, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                            {hire.name.split(' ')[1][0]}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900">{hire.name}</p>
                            <p className="text-xs text-slate-600">{hire.role}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant={hire.status === "training" ? "secondary" : "default"}>
                            {hire.status === "training" ? "تحت التدريب" : "نشط"}
                          </Badge>
                          <p className="text-xs text-slate-500 mt-1">{hire.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Top Performers */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-amber-50 to-yellow-50">
                  <CardTitle className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-amber-600" />
                    أفضل أداء
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {performanceData.sort((a, b) => b.overallRating - a.overallRating).slice(0, 3).map((staff, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="text-2xl font-bold text-amber-600">#{idx + 1}</div>
                          <div>
                            <p className="font-semibold text-slate-900">{staff.staffName}</p>
                            <p className="text-xs text-slate-600">{staff.department}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                            <span className="text-lg font-bold text-slate-900">{staff.overallRating}</span>
                          </div>
                          <p className="text-xs text-slate-500">من 5.0</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Upcoming Leaves */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-purple-600" />
                    الإجازات القادمة
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    {leaveRequests.filter(r => r.status === "approved").map((leave, idx) => (
                      <div key={idx} className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-semibold text-slate-900">{leave.staffName}</p>
                          <Badge className="bg-green-500">{leave.days} أيام</Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <p className="text-slate-600">من: {leave.startDate}</p>
                          </div>
                          <div>
                            <p className="text-slate-600">إلى: {leave.endDate}</p>
                          </div>
                        </div>
                        <p className="text-xs text-slate-500 mt-2">{leave.type}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Doctors Tab */}
          <TabsContent value="doctors" className="space-y-6">
            {/* Search and Filter */}
            <Card className="shadow-lg">
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                    <Input
                      type="text"
                      placeholder="ابحث عن طبيب..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={roleFilter} onValueChange={setRoleFilter}>
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t('staff.allSpecialties')}</SelectItem>
                      <SelectItem value="Cardiology">{t('departments.cardiology')}</SelectItem>
                      <SelectItem value="Neurology">{t('departments.neurology')}</SelectItem>
                      <SelectItem value="Orthopedic Surgery">{t('departments.orthopedics')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Staff Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {doctors.filter((doc) => {
                const matchSearch =
                  doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  doc.id.toLowerCase().includes(searchTerm.toLowerCase());
                const matchRole =
                  roleFilter === "all" || doc.specialty.toLowerCase() === roleFilter.toLowerCase();
                return matchSearch && matchRole;
              }).map((staff, index) => (
                <StaffCard key={index} {...staff} />
              ))}
            </div>
          </TabsContent>

          {/* Nurses Tab */}
          <TabsContent value="nurses" className="space-y-6">
            {/* Search */}
            <Card className="shadow-lg">
              <CardContent className="pt-6">
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                  <Input
                    type="text"
                    placeholder="ابحث عن ممرض/ممرضة..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Staff Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {nurses.filter((nurse) =>
                nurse.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                nurse.id.toLowerCase().includes(searchTerm.toLowerCase())
              ).map((staff, index) => (
                <StaffCard key={index} {...staff} />
              ))}
            </div>
          </TabsContent>

          {/* Schedule Tab */}
          <TabsContent value="schedule" className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    {t('staff.upcomingShifts')}
                  </CardTitle>
                  <Button onClick={() => setIsScheduleShiftDialogOpen(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    إضافة وردية
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                {shifts.map((shift, index) => (
                  <ShiftSchedule key={index} {...shift} />
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Attendance Tab */}
          <TabsContent value="attendance" className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <ClipboardCheck className="w-5 h-5 text-green-600" />
                    سجل الحضور والانصراف
                  </CardTitle>
                  <Button onClick={() => setIsAttendanceDialogOpen(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    تسجيل حضور
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-right py-3 px-4 text-sm font-semibold text-slate-700">الموظف</th>
                        <th className="text-right py-3 px-4 text-sm font-semibold text-slate-700">التاريخ</th>
                        <th className="text-right py-3 px-4 text-sm font-semibold text-slate-700">الحضور</th>
                        <th className="text-right py-3 px-4 text-sm font-semibold text-slate-700">الانصراف</th>
                        <th className="text-right py-3 px-4 text-sm font-semibold text-slate-700">الساعات</th>
                        <th className="text-right py-3 px-4 text-sm font-semibold text-slate-700">الحالة</th>
                      </tr>
                    </thead>
                    <tbody>
                      {attendanceRecords.map((record, idx) => (
                        <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50">
                          <td className="py-3 px-4">
                            <p className="font-medium text-slate-900">{record.staffName}</p>
                          </td>
                          <td className="py-3 px-4 text-sm text-slate-600">{record.date}</td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-green-600" />
                              <span className="text-sm font-medium text-slate-900">{record.checkIn}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-red-600" />
                              <span className="text-sm font-medium text-slate-900">{record.checkOut}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-sm font-bold text-blue-600">{record.hours}h</td>
                          <td className="py-3 px-4">
                            <Badge variant={
                              record.status === "present" ? "default" : 
                              record.status === "late" ? "secondary" : "destructive"
                            }>
                              {record.status === "present" ? "حاضر" : 
                               record.status === "late" ? "متأخر" : "غائب"}
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

          {/* Leave Requests Tab */}
          <TabsContent value="leave" className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-purple-600" />
                    طلبات الإجازات
                  </CardTitle>
                  <Button onClick={() => setIsLeaveRequestDialogOpen(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    طلب إجازة
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {leaveRequests.map((leave, idx) => (
                    <div key={idx} className="p-6 border border-slate-200 rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <p className="font-bold text-slate-900 text-lg">{leave.staffName}</p>
                          <p className="text-sm text-slate-600">ID: {leave.id}</p>
                        </div>
                        <Badge variant={
                          leave.status === "approved" ? "default" : 
                          leave.status === "pending" ? "secondary" : "destructive"
                        }>
                          {leave.status === "approved" ? "معتمد" : 
                           leave.status === "pending" ? "قيد المراجعة" : "مرفوض"}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-slate-600 mb-1">نوع الإجازة</p>
                          <p className="font-medium text-slate-900">{leave.type}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-600 mb-1">من</p>
                          <p className="font-medium text-slate-900">{leave.startDate}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-600 mb-1">إلى</p>
                          <p className="font-medium text-slate-900">{leave.endDate}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-600 mb-1">المدة</p>
                          <p className="font-bold text-blue-600">{leave.days} أيام</p>
                        </div>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-lg">
                        <p className="text-xs text-slate-600 mb-1">السبب</p>
                        <p className="text-sm text-slate-900">{leave.reason}</p>
                      </div>
                      {leave.status === "pending" && (
                        <div className="flex gap-2 mt-4">
                          <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700">
                            <CheckCircle2 className="w-4 h-4 mr-2" />
                            اعتماد
                          </Button>
                          <Button size="sm" variant="destructive" className="flex-1">
                            <XCircle className="w-4 h-4 mr-2" />
                            رفض
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-amber-50 to-yellow-50">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-amber-600" />
                    تقييمات الأداء
                  </CardTitle>
                  <Button onClick={() => setIsPerformanceDialogOpen(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    إضافة تقييم
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  {performanceData.map((perf, idx) => (
                    <div key={idx} className="p-6 border border-slate-200 rounded-xl hover:shadow-lg transition-shadow bg-gradient-to-br from-white to-slate-50">
                      <div className="flex items-start justify-between mb-6">
                        <div>
                          <p className="font-bold text-slate-900 text-xl">{perf.staffName}</p>
                          <p className="text-sm text-slate-600">{perf.department}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-2 mb-1">
                            <Star className="w-6 h-6 text-amber-500 fill-amber-500" />
                            <span className="text-3xl font-bold text-slate-900">{perf.overallRating}</span>
                          </div>
                          <p className="text-xs text-slate-500">التقييم الإجمالي</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                          <p className="text-xs text-slate-600 mb-2">الالتزام بالمواعيد</p>
                          <p className="text-2xl font-bold text-blue-600">{perf.punctuality}</p>
                          <div className="flex justify-center mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`w-3 h-3 ${i < perf.punctuality ? 'text-blue-500 fill-blue-500' : 'text-slate-300'}`} />
                            ))}
                          </div>
                        </div>
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                          <p className="text-xs text-slate-600 mb-2">العمل الجماعي</p>
                          <p className="text-2xl font-bold text-green-600">{perf.teamwork}</p>
                          <div className="flex justify-center mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`w-3 h-3 ${i < perf.teamwork ? 'text-green-500 fill-green-500' : 'text-slate-300'}`} />
                            ))}
                          </div>
                        </div>
                        <div className="text-center p-4 bg-purple-50 rounded-lg">
                          <p className="text-xs text-slate-600 mb-2">المهارات السريرية</p>
                          <p className="text-2xl font-bold text-purple-600">{perf.clinicalSkills}</p>
                          <div className="flex justify-center mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`w-3 h-3 ${i < perf.clinicalSkills ? 'text-purple-500 fill-purple-500' : 'text-slate-300'}`} />
                            ))}
                          </div>
                        </div>
                        <div className="text-center p-4 bg-orange-50 rounded-lg">
                          <p className="text-xs text-slate-600 mb-2">التواصل</p>
                          <p className="text-2xl font-bold text-orange-600">{perf.communication}</p>
                          <div className="flex justify-center mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`w-3 h-3 ${i < perf.communication ? 'text-orange-500 fill-orange-500' : 'text-slate-300'}`} />
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 p-3 bg-white border border-slate-200 rounded-lg">
                        <p className="text-xs text-slate-600 mb-1">آخر تقييم</p>
                        <p className="text-sm font-medium text-slate-900">{perf.lastEvaluation}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Add Staff Member Dialog */}
        <Dialog open={isAddStaffDialogOpen} onOpenChange={setIsAddStaffDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-blue-700 flex items-center gap-2">
                <Users className="w-6 h-6" />
                إضافة موظف جديد
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="staffName">الاسم الكامل</Label>
                  <Input
                    id="staffName"
                    value={staffForm.name}
                    onChange={(e) => setStaffForm({ ...staffForm, name: e.target.value })}
                    placeholder="أدخل الاسم الكامل"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">المسمى الوظيفي</Label>
                  <Select
                    value={staffForm.role}
                    onValueChange={(value) => setStaffForm({ ...staffForm, role: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر المسمى" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Physician - Cardiologist">طبيب قلب</SelectItem>
                      <SelectItem value="Physician - Neurologist">طبيب أعصاب</SelectItem>
                      <SelectItem value="Physician - Surgeon">جراح</SelectItem>
                      <SelectItem value="Physician - Pediatrician">طبيب أطفال</SelectItem>
                      <SelectItem value="Head Nurse">رئيس تمريض</SelectItem>
                      <SelectItem value="Nurse">ممرض/ممرضة</SelectItem>
                      <SelectItem value="Senior Nurse">ممرض أول</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="specialty">{t('staff.specialty')}</Label>
                  <Input
                    id="specialty"
                    value={staffForm.specialty}
                    onChange={(e) => setStaffForm({ ...staffForm, specialty: e.target.value })}
                    placeholder="مثال: القلب"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">{t('rooms.department')}</Label>
                  <Select
                    value={staffForm.department}
                    onValueChange={(value) => setStaffForm({ ...staffForm, department: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر القسم" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Cardiology">القلب</SelectItem>
                      <SelectItem value="Neurology">الأعصاب</SelectItem>
                      <SelectItem value="Orthopedics">العظام</SelectItem>
                      <SelectItem value="ICU">العناية المركزة</SelectItem>
                      <SelectItem value="Emergency Room">الطوارئ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experience">سنوات الخبرة</Label>
                  <Input
                    id="experience"
                    type="number"
                    value={staffForm.experience}
                    onChange={(e) => setStaffForm({ ...staffForm, experience: e.target.value })}
                    placeholder="15"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="salary">الراتب (SAR)</Label>
                  <Input
                    id="salary"
                    type="number"
                    value={staffForm.salary}
                    onChange={(e) => setStaffForm({ ...staffForm, salary: e.target.value })}
                    placeholder="20000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="employmentType">نوع التوظيف</Label>
                  <Select
                    value={staffForm.employmentType}
                    onValueChange={(value) => setStaffForm({ ...staffForm, employmentType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">دوام كامل</SelectItem>
                      <SelectItem value="part-time">دوام جزئي</SelectItem>
                      <SelectItem value="contract">عقد</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="startDate">تاريخ البدء</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={staffForm.startDate}
                    onChange={(e) => setStaffForm({ ...staffForm, startDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="staffPhone">رقم الجوال</Label>
                  <Input
                    id="staffPhone"
                    type="tel"
                    value={staffForm.phone}
                    onChange={(e) => setStaffForm({ ...staffForm, phone: e.target.value })}
                    placeholder="+966 50 XXX XXXX"
                  />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="staffEmail">البريد الإلكتروني</Label>
                  <Input
                    id="staffEmail"
                    type="email"
                    value={staffForm.email}
                    onChange={(e) => setStaffForm({ ...staffForm, email: e.target.value })}
                    placeholder="staff@hospital.com"
                  />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="qualifications">المؤهلات (مفصولة بفواصل)</Label>
                  <Textarea
                    id="qualifications"
                    value={staffForm.qualifications}
                    onChange={(e) => setStaffForm({ ...staffForm, qualifications: e.target.value })}
                    placeholder="MD, Board Certified, Fellowship - Cardiology"
                    rows={2}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddStaffDialogOpen(false)}>
                {t('common.cancel')}
              </Button>
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600"
                onClick={() => {
                  console.log('New Staff Member:', staffForm);
                  setStaffForm({
                    name: "",
                    role: "",
                    specialty: "",
                    department: "",
                    experience: "",
                    phone: "",
                    email: "",
                    qualifications: "",
                    salary: "",
                    employmentType: "full-time",
                    startDate: "",
                  });
                  setIsAddStaffDialogOpen(false);
                }}
              >
                {t('common.save')}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Schedule Shift Dialog */}
        <Dialog open={isScheduleShiftDialogOpen} onOpenChange={setIsScheduleShiftDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-blue-700 flex items-center gap-2">
                <Calendar className="w-6 h-6" />
                جدولة وردية
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="shift-staff-id">رقم الموظف</Label>
                  <Input
                    id="shift-staff-id"
                    value={shiftForm.staffId}
                    onChange={(e) => setShiftForm({ ...shiftForm, staffId: e.target.value })}
                    placeholder="DOC001"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="shift-staff-name">اسم الموظف</Label>
                  <Input
                    id="shift-staff-name"
                    value={shiftForm.staffName}
                    onChange={(e) => setShiftForm({ ...shiftForm, staffName: e.target.value })}
                    placeholder="اسم الموظف"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="shift-date">التاريخ</Label>
                  <Input
                    id="shift-date"
                    type="date"
                    value={shiftForm.date}
                    onChange={(e) => setShiftForm({ ...shiftForm, date: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="shift-type">نوع الوردية</Label>
                  <Select
                    value={shiftForm.shiftType}
                    onValueChange={(value) => setShiftForm({ ...shiftForm, shiftType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="morning">صباحي</SelectItem>
                      <SelectItem value="evening">مسائي</SelectItem>
                      <SelectItem value="night">ليلي</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="shift-start">وقت البدء</Label>
                  <Input
                    id="shift-start"
                    type="time"
                    value={shiftForm.startTime}
                    onChange={(e) => setShiftForm({ ...shiftForm, startTime: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="shift-end">وقت الانتهاء</Label>
                  <Input
                    id="shift-end"
                    type="time"
                    value={shiftForm.endTime}
                    onChange={(e) => setShiftForm({ ...shiftForm, endTime: e.target.value })}
                  />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="shift-dept">القسم</Label>
                  <Select
                    value={shiftForm.department}
                    onValueChange={(value) => setShiftForm({ ...shiftForm, department: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر القسم" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Cardiology">القلب</SelectItem>
                      <SelectItem value="ICU">العناية المركزة</SelectItem>
                      <SelectItem value="Emergency">الطوارئ</SelectItem>
                      <SelectItem value="Surgery">الجراحة</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsScheduleShiftDialogOpen(false)}>
                {t('common.cancel')}
              </Button>
              <Button className="bg-gradient-to-r from-blue-600 to-cyan-600"
                onClick={() => {
                  console.log('Schedule Shift:', shiftForm);
                  setShiftForm({
                    staffId: "",
                    staffName: "",
                    date: "",
                    shiftType: "morning",
                    startTime: "",
                    endTime: "",
                    department: "",
                  });
                  setIsScheduleShiftDialogOpen(false);
                }}
              >
                {t('common.schedule')}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Leave Request Dialog */}
        <Dialog open={isLeaveRequestDialogOpen} onOpenChange={setIsLeaveRequestDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-purple-700 flex items-center gap-2">
                <FileText className="w-6 h-6" />
                طلب إجازة
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="leave-staff-id">رقم الموظف</Label>
                  <Input
                    id="leave-staff-id"
                    value={leaveForm.staffId}
                    onChange={(e) => setLeaveForm({ ...leaveForm, staffId: e.target.value })}
                    placeholder="DOC001"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="leave-staff-name">اسم الموظف</Label>
                  <Input
                    id="leave-staff-name"
                    value={leaveForm.staffName}
                    onChange={(e) => setLeaveForm({ ...leaveForm, staffName: e.target.value })}
                    placeholder="اسم الموظف"
                  />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="leave-type">نوع الإجازة</Label>
                  <Select
                    value={leaveForm.leaveType}
                    onValueChange={(value) => setLeaveForm({ ...leaveForm, leaveType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="annual">إجازة سنوية</SelectItem>
                      <SelectItem value="sick">إجازة مرضية</SelectItem>
                      <SelectItem value="emergency">إجازة طارئة</SelectItem>
                      <SelectItem value="unpaid">إجازة بدون راتب</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="leave-start">من تاريخ</Label>
                  <Input
                    id="leave-start"
                    type="date"
                    value={leaveForm.startDate}
                    onChange={(e) => setLeaveForm({ ...leaveForm, startDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="leave-end">إلى تاريخ</Label>
                  <Input
                    id="leave-end"
                    type="date"
                    value={leaveForm.endDate}
                    onChange={(e) => setLeaveForm({ ...leaveForm, endDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="leave-reason">السبب</Label>
                  <Textarea
                    id="leave-reason"
                    value={leaveForm.reason}
                    onChange={(e) => setLeaveForm({ ...leaveForm, reason: e.target.value })}
                    placeholder="أدخل سبب الإجازة"
                    rows={3}
                  />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="leave-emergency">جهة اتصال طوارئ</Label>
                  <Input
                    id="leave-emergency"
                    value={leaveForm.emergencyContact}
                    onChange={(e) => setLeaveForm({ ...leaveForm, emergencyContact: e.target.value })}
                    placeholder="+966 5X XXX XXXX"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsLeaveRequestDialogOpen(false)}>
                {t('common.cancel')}
              </Button>
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600"
                onClick={() => {
                  console.log('Leave Request:', leaveForm);
                  setLeaveForm({
                    staffId: "",
                    staffName: "",
                    leaveType: "annual",
                    startDate: "",
                    endDate: "",
                    reason: "",
                    emergencyContact: "",
                  });
                  setIsLeaveRequestDialogOpen(false);
                }}
              >
                {t('common.save')}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Attendance Dialog */}
        <Dialog open={isAttendanceDialogOpen} onOpenChange={setIsAttendanceDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-green-700 flex items-center gap-2">
                <ClipboardCheck className="w-6 h-6" />
                تسجيل حضور
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="att-staff-id">رقم الموظف</Label>
                  <Input
                    id="att-staff-id"
                    value={attendanceForm.staffId}
                    onChange={(e) => setAttendanceForm({ ...attendanceForm, staffId: e.target.value })}
                    placeholder="DOC001"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="att-staff-name">اسم الموظف</Label>
                  <Input
                    id="att-staff-name"
                    value={attendanceForm.staffName}
                    onChange={(e) => setAttendanceForm({ ...attendanceForm, staffName: e.target.value })}
                    placeholder="اسم الموظف"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="att-date">التاريخ</Label>
                  <Input
                    id="att-date"
                    type="date"
                    value={attendanceForm.date}
                    onChange={(e) => setAttendanceForm({ ...attendanceForm, date: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="att-status">الحالة</Label>
                  <Select
                    value={attendanceForm.status}
                    onValueChange={(value) => setAttendanceForm({ ...attendanceForm, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="present">حاضر</SelectItem>
                      <SelectItem value="late">متأخر</SelectItem>
                      <SelectItem value="absent">غائب</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="att-checkin">وقت الحضور</Label>
                  <Input
                    id="att-checkin"
                    type="time"
                    value={attendanceForm.checkIn}
                    onChange={(e) => setAttendanceForm({ ...attendanceForm, checkIn: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="att-checkout">وقت الانصراف</Label>
                  <Input
                    id="att-checkout"
                    type="time"
                    value={attendanceForm.checkOut}
                    onChange={(e) => setAttendanceForm({ ...attendanceForm, checkOut: e.target.value })}
                  />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="att-notes">ملاحظات</Label>
                  <Textarea
                    id="att-notes"
                    value={attendanceForm.notes}
                    onChange={(e) => setAttendanceForm({ ...attendanceForm, notes: e.target.value })}
                    placeholder="أي ملاحظات إضافية"
                    rows={2}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAttendanceDialogOpen(false)}>
                {t('common.cancel')}
              </Button>
              <Button className="bg-gradient-to-r from-green-600 to-emerald-600"
                onClick={() => {
                  console.log('Attendance Record:', attendanceForm);
                  setAttendanceForm({
                    staffId: "",
                    staffName: "",
                    date: "",
                    checkIn: "",
                    checkOut: "",
                    status: "present",
                    notes: "",
                  });
                  setIsAttendanceDialogOpen(false);
                }}
              >
                {t('common.save')}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Performance Evaluation Dialog */}
        <Dialog open={isPerformanceDialogOpen} onOpenChange={setIsPerformanceDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-amber-700 flex items-center gap-2">
                <Award className="w-6 h-6" />
                تقييم الأداء
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="perf-staff-id">رقم الموظف</Label>
                  <Input
                    id="perf-staff-id"
                    value={performanceForm.staffId}
                    onChange={(e) => setPerformanceForm({ ...performanceForm, staffId: e.target.value })}
                    placeholder="DOC001"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="perf-staff-name">اسم الموظف</Label>
                  <Input
                    id="perf-staff-name"
                    value={performanceForm.staffName}
                    onChange={(e) => setPerformanceForm({ ...performanceForm, staffName: e.target.value })}
                    placeholder="اسم الموظف"
                  />
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="perf-date">تاريخ التقييم</Label>
                  <Input
                    id="perf-date"
                    type="date"
                    value={performanceForm.evaluationDate}
                    onChange={(e) => setPerformanceForm({ ...performanceForm, evaluationDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="perf-rating">التقييم الإجمالي (من 5)</Label>
                  <Select
                    value={performanceForm.rating}
                    onValueChange={(value) => setPerformanceForm({ ...performanceForm, rating: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">⭐⭐⭐⭐⭐ ممتاز (5)</SelectItem>
                      <SelectItem value="4">⭐⭐⭐⭐ جيد جداً (4)</SelectItem>
                      <SelectItem value="3">⭐⭐⭐ جيد (3)</SelectItem>
                      <SelectItem value="2">⭐⭐ مقبول (2)</SelectItem>
                      <SelectItem value="1">⭐ ضعيف (1)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="perf-punctuality">الالتزام بالمواعيد (من 5)</Label>
                  <Select
                    value={performanceForm.punctuality}
                    onValueChange={(value) => setPerformanceForm({ ...performanceForm, punctuality: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 - ممتاز</SelectItem>
                      <SelectItem value="4">4 - جيد جداً</SelectItem>
                      <SelectItem value="3">3 - جيد</SelectItem>
                      <SelectItem value="2">2 - مقبول</SelectItem>
                      <SelectItem value="1">1 - ضعيف</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="perf-teamwork">العمل الجماعي (من 5)</Label>
                  <Select
                    value={performanceForm.teamwork}
                    onValueChange={(value) => setPerformanceForm({ ...performanceForm, teamwork: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 - ممتاز</SelectItem>
                      <SelectItem value="4">4 - جيد جداً</SelectItem>
                      <SelectItem value="3">3 - جيد</SelectItem>
                      <SelectItem value="2">2 - مقبول</SelectItem>
                      <SelectItem value="1">1 - ضعيف</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="perf-clinical">المهارات السريرية (من 5)</Label>
                  <Select
                    value={performanceForm.clinicalSkills}
                    onValueChange={(value) => setPerformanceForm({ ...performanceForm, clinicalSkills: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 - ممتاز</SelectItem>
                      <SelectItem value="4">4 - جيد جداً</SelectItem>
                      <SelectItem value="3">3 - جيد</SelectItem>
                      <SelectItem value="2">2 - مقبول</SelectItem>
                      <SelectItem value="1">1 - ضعيف</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="perf-communication">التواصل (من 5)</Label>
                  <Select
                    value={performanceForm.communication}
                    onValueChange={(value) => setPerformanceForm({ ...performanceForm, communication: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 - ممتاز</SelectItem>
                      <SelectItem value="4">4 - جيد جداً</SelectItem>
                      <SelectItem value="3">3 - جيد</SelectItem>
                      <SelectItem value="2">2 - مقبول</SelectItem>
                      <SelectItem value="1">1 - ضعيف</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="perf-comments">التعليقات والملاحظات</Label>
                  <Textarea
                    id="perf-comments"
                    value={performanceForm.comments}
                    onChange={(e) => setPerformanceForm({ ...performanceForm, comments: e.target.value })}
                    placeholder="أدخل تعليقاتك حول أداء الموظف"
                    rows={4}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsPerformanceDialogOpen(false)}>
                {t('common.cancel')}
              </Button>
              <Button className="bg-gradient-to-r from-amber-600 to-yellow-600"
                onClick={() => {
                  console.log('Performance Evaluation:', performanceForm);
                  setPerformanceForm({
                    staffId: "",
                    staffName: "",
                    evaluationDate: "",
                    rating: "5",
                    punctuality: "5",
                    teamwork: "5",
                    clinicalSkills: "5",
                    communication: "5",
                    comments: "",
                  });
                  setIsPerformanceDialogOpen(false);
                }}
              >
                {t('common.save')}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
}
