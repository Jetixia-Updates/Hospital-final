import Layout from "@/components/Layout";
import {
  Calendar,
  Clock,
  Users,
  UserCheck,
  Activity,
  Stethoscope,
  ClipboardList,
  FileText,
  BarChart3,
  TrendingUp,
  UserPlus,
  Phone,
  MapPin,
  AlertCircle,
  CheckCircle,
  XCircle,
  ArrowRight,
  Search,
  Filter,
  Download,
  Upload,
  Edit,
  Trash2,
  Eye,
  Plus,
  Building2,
  Thermometer,
  Pill,
  Syringe,
  Heart,
  Brain,
  Bone,
  Eye as EyeIcon,
  Baby,
  Ear,
  Accessibility,
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
import { Switch } from "@/components/ui/switch";

export default function Clinics() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClinic, setSelectedClinic] = useState<string | null>(null);
  
  // Dialog states
  const [isAppointmentDialogOpen, setIsAppointmentDialogOpen] = useState(false);
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false);
  const [isServiceDialogOpen, setIsServiceDialogOpen] = useState(false);
  const [isDoctorDialogOpen, setIsDoctorDialogOpen] = useState(false);
  const [isClinicDialogOpen, setIsClinicDialogOpen] = useState(false);
  
  // Form states
  const [appointmentForm, setAppointmentForm] = useState({
    clinicId: "",
    patientId: "",
    date: "",
    time: "",
    type: "consultation",
    notes: "",
    status: "confirmed"
  });
  
  const [scheduleForm, setScheduleForm] = useState({
    clinicId: "",
    doctorId: "",
    dayOfWeek: "",
    startTime: "",
    endTime: "",
    maxPatients: "",
    roomNumber: ""
  });
  
  const [serviceForm, setServiceForm] = useState({
    clinicId: "",
    nameAr: "",
    nameEn: "",
    description: "",
    price: "",
    duration: "",
    isActive: true
  });
  
  const [doctorForm, setDoctorForm] = useState({
    fullName: "",
    specialization: "",
    clinicId: "",
    email: "",
    phone: "",
    licenseNumber: "",
    experience: "",
    isAvailable: true
  });
  
  const [clinicForm, setClinicForm] = useState({
    nameAr: "",
    nameEn: "",
    departmentAr: "",
    departmentEn: "",
    specialization: "",
    description: "",
    assignedDoctor: "",
    roomNumber: "",
    floor: "",
    building: "",
    maxPatientsPerDay: "",
    startTime: "",
    endTime: "",
    phone: "",
    extension: "",
    email: "",
    equipmentList: "",
    color: "from-blue-500 to-cyan-600",
    isActive: true,
    allowEmergency: false,
    requiresAppointment: true,
    notes: ""
  });

  // Clinics Data
  const clinics = [
    {
      id: "CL-001",
      nameKey: "cardiology",
      icon: Heart,
      color: "from-red-500 to-pink-600",
      patients: 45,
      appointments: 18,
      room: "101",
      waitTime: 25,
      status: "active" as const,
    },
    {
      id: "CL-002",
      nameKey: "pediatrics",
      icon: Baby,
      color: "from-blue-500 to-cyan-600",
      patients: 62,
      appointments: 24,
      room: "102",
      waitTime: 15,
      status: "active" as const,
    },
    {
      id: "CL-003",
      nameKey: "orthopedics",
      icon: Bone,
      color: "from-orange-500 to-red-600",
      patients: 38,
      appointments: 15,
      room: "103",
      waitTime: 45,
      status: "busy" as const,
    },
    {
      id: "CL-004",
      nameKey: "dermatology",
      icon: Activity,
      color: "from-purple-500 to-pink-600",
      patients: 29,
      appointments: 12,
      room: "104",
      waitTime: 20,
      status: "active" as const,
    },
    {
      id: "CL-005",
      nameKey: "internalMedicine",
      icon: Stethoscope,
      color: "from-green-500 to-emerald-600",
      patients: 51,
      appointments: 20,
      room: "105",
      waitTime: 30,
      status: "active" as const,
    },
    {
      id: "CL-006",
      nameKey: "gynecology",
      icon: Activity,
      color: "from-pink-500 to-rose-600",
      patients: 33,
      appointments: 14,
      room: "106",
      waitTime: 35,
      status: "active" as const,
    },
    {
      id: "CL-007",
      nameKey: "ophthalmology",
      icon: EyeIcon,
      color: "from-cyan-500 to-blue-600",
      patients: 27,
      appointments: 11,
      room: "107",
      waitTime: 0,
      status: "closed" as const,
    },
    {
      id: "CL-008",
      nameKey: "ent",
      icon: Ear,
      color: "from-indigo-500 to-purple-600",
      patients: 22,
      appointments: 9,
      room: "108",
      waitTime: 18,
      status: "active" as const,
    },
    {
      id: "CL-009",
      nameKey: "neurology",
      icon: Brain,
      color: "from-violet-500 to-purple-600",
      patients: 19,
      appointments: 8,
      room: "109",
      waitTime: 40,
      status: "active" as const,
    },
    {
      id: "CL-010",
      nameKey: "emergency",
      icon: AlertCircle,
      color: "from-red-600 to-orange-600",
      patients: 87,
      appointments: 0,
      room: "Ground Floor",
      waitTime: 10,
      status: "active" as const,
    },
  ];

  // Today's appointments
  const todayAppointments = [
    {
      id: "APT-001",
      patientNameKey: "ahmed",
      patientId: "P001",
      clinicKey: "cardiology",
      time: "9:00 ص",
      status: "confirmed",
      typeKey: "followUp",
      duration: 30,
    },
    {
      id: "APT-002",
      patientNameKey: "fatima",
      patientId: "P045",
      clinicKey: "pediatrics",
      time: "9:30 ص",
      status: "waiting",
      typeKey: "newExam",
      duration: 45,
    },
    {
      id: "APT-003",
      patientNameKey: "mohammed",
      patientId: "P062",
      clinicKey: "orthopedics",
      time: "10:00 ص",
      status: "in-progress",
      typeKey: "treatment",
      duration: 60,
    },
    {
      id: "APT-004",
      patientNameKey: "sara",
      patientId: "P028",
      clinicKey: "dermatology",
      time: "10:30 ص",
      status: "confirmed",
      typeKey: "consultation",
      duration: 30,
    },
  ];

  // Clinic statistics
  const statistics = {
    totalClinics: 10,
    activeClinics: 8,
    todayAppointments: 156,
    completedToday: 89,
    waitingPatients: 34,
    avgWaitTime: 25,
    totalDoctors: 10,
    totalServices: 42,
  };

  const statusConfig = {
    active: { bg: "bg-green-100", text: "text-green-800", label: t('clinics.available') },
    busy: { bg: "bg-yellow-100", text: "text-yellow-800", label: t('clinics.busy') },
    closed: { bg: "bg-slate-100", text: "text-slate-800", label: t('clinics.closed') },
  };

  const appointmentStatusConfig = {
    confirmed: { bg: "bg-blue-100", text: "text-blue-800", label: t('clinics.confirmed') },
    waiting: { bg: "bg-yellow-100", text: "text-yellow-800", label: t('clinics.waiting') },
    "in-progress": { bg: "bg-green-100", text: "text-green-800", label: t('clinics.inProgress') },
    completed: { bg: "bg-slate-100", text: "text-slate-800", label: t('clinics.completed') },
    cancelled: { bg: "bg-red-100", text: "text-red-800", label: t('clinics.cancelled') },
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-blue-50">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-700 bg-clip-text text-transparent mb-2">
                  {t('clinics.title')}
                </h1>
                <p className="text-lg text-slate-600">
                  {t('clinics.subtitle')}
                </p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="gap-2 bg-white shadow-md hover:shadow-lg">
                  <Download className="w-4 h-4" />
                  {t('common.export')}
                </Button>
                <Button 
                  className="gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg hover:shadow-xl"
                  onClick={() => setIsClinicDialogOpen(true)}
                >
                  <Plus className="w-4 h-4" />
                  {t('clinics.addClinic')}
                </Button>
              </div>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-cyan-500 to-blue-600 border-0 shadow-xl">
              <CardContent className="p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <Badge className="bg-white/20 text-white border-0">{statistics.activeClinics}/{statistics.totalClinics}</Badge>
                </div>
                <p className="text-sm text-cyan-100 mb-1">{t('clinics.totalClinics')}</p>
                <p className="text-3xl font-bold">{statistics.totalClinics}</p>
                <p className="text-xs text-cyan-100 mt-2">{statistics.activeClinics} {t('clinics.activeNow')}</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-500 to-indigo-600 border-0 shadow-xl">
              <CardContent className="p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <Badge className="bg-white/20 text-white border-0">{t('patients.today')}</Badge>
                </div>
                <p className="text-sm text-blue-100 mb-1">{t('clinics.appointmentsToday')}</p>
                <p className="text-3xl font-bold">{statistics.todayAppointments}</p>
                <p className="text-xs text-blue-100 mt-2">{statistics.completedToday} {t('clinics.completed')}</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-500 to-red-600 border-0 shadow-xl">
              <CardContent className="p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6" />
                  </div>
                  <Badge className="bg-white/20 text-white border-0 animate-pulse">{t('clinics.waiting')}</Badge>
                </div>
                <p className="text-sm text-orange-100 mb-1">{t('clinics.waitingPatients')}</p>
                <p className="text-3xl font-bold">{statistics.waitingPatients}</p>
                <p className="text-xs text-orange-100 mt-2">{t('patients.avgWaitTime')}: {statistics.avgWaitTime} {t('patients.minutes')}</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-500 to-pink-600 border-0 shadow-xl">
              <CardContent className="p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <UserCheck className="w-6 h-6" />
                  </div>
                  <Badge className="bg-white/20 text-white border-0">{t('clinics.activeNow')}</Badge>
                </div>
                <p className="text-sm text-purple-100 mb-1">{t('clinics.totalDoctors')}</p>
                <p className="text-3xl font-bold">{statistics.totalDoctors}</p>
                <p className="text-xs text-purple-100 mt-2">{statistics.totalServices} {t('clinics.services')}</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="bg-white/80 backdrop-blur-md border border-slate-200 p-1 rounded-xl shadow-lg">
              <TabsTrigger value="overview" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-600 data-[state=active]:to-blue-600 data-[state=active]:text-white rounded-lg px-6">
                <Building2 className="w-4 h-4 ml-2" />
                {t('patients.overview')}
              </TabsTrigger>
              <TabsTrigger value="clinics" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-600 data-[state=active]:to-blue-600 data-[state=active]:text-white rounded-lg px-6">
                <Stethoscope className="w-4 h-4 ml-2" />
                {t('clinics.allClinics')}
              </TabsTrigger>
              <TabsTrigger value="appointments" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-600 data-[state=active]:to-blue-600 data-[state=active]:text-white rounded-lg px-6">
                <Calendar className="w-4 h-4 ml-2" />
                {t('clinics.appointments')}
              </TabsTrigger>
              <TabsTrigger value="schedule" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-600 data-[state=active]:to-blue-600 data-[state=active]:text-white rounded-lg px-6">
                <Clock className="w-4 h-4 ml-2" />
                {t('clinics.schedule')}
              </TabsTrigger>
              <TabsTrigger value="services" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-600 data-[state=active]:to-blue-600 data-[state=active]:text-white rounded-lg px-6">
                <ClipboardList className="w-4 h-4 ml-2" />
                {t('clinics.services')}
              </TabsTrigger>
              <TabsTrigger value="doctors" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-600 data-[state=active]:to-blue-600 data-[state=active]:text-white rounded-lg px-6">
                <UserCheck className="w-4 h-4 ml-2" />
                {t('clinics.doctors')}
              </TabsTrigger>
              <TabsTrigger value="reports" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-600 data-[state=active]:to-blue-600 data-[state=active]:text-white rounded-lg px-6">
                <BarChart3 className="w-4 h-4 ml-2" />
                {t('clinics.reports')}
              </TabsTrigger>
              <TabsTrigger value="analytics" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-600 data-[state=active]:to-blue-600 data-[state=active]:text-white rounded-lg px-6">
                <TrendingUp className="w-4 h-4 ml-2" />
                {t('common.analytics')}
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Active Clinics Today */}
                <Card className="bg-white/80 backdrop-blur-md border-slate-200 shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-cyan-600" />
                      {t('clinics.activeClinicsToday')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {clinics.filter(c => c.status === 'active').slice(0, 5).map((clinic) => {
                        const Icon = clinic.icon;
                        return (
                          <div key={clinic.id} className="p-4 bg-gradient-to-r from-slate-50 to-cyan-50 rounded-xl border border-cyan-200 hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 bg-gradient-to-br ${clinic.color} rounded-lg flex items-center justify-center text-white`}>
                                  <Icon className="w-5 h-5" />
                                </div>
                                <div>
                                  <h3 className="font-semibold text-slate-900">{t(`clinics.${clinic.nameKey}.name`)}</h3>
                                  <p className="text-xs text-slate-600">{t(`clinics.${clinic.nameKey}.doctor`)}</p>
                                </div>
                              </div>
                              <Badge className={statusConfig[clinic.status].bg + " " + statusConfig[clinic.status].text + " border-0"}>
                                {statusConfig[clinic.status].label}
                              </Badge>
                            </div>
                            <div className="flex items-center justify-between text-sm text-slate-600 mt-3 pt-3 border-t border-slate-200">
                              <span className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                {clinic.patients} {t('patients.patient')}
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {clinic.appointments} {t('clinics.appointments')}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {clinic.waitTime} {t('patients.minutes')}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                {/* Today's Appointments */}
                <Card className="bg-white/80 backdrop-blur-md border-slate-200 shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-blue-600" />
                      {t('clinics.todayAppointments')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {todayAppointments.map((apt) => (
                        <div key={apt.id} className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 hover:shadow-md transition-shadow">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-semibold text-slate-900">{t(`clinics.patientNames.${apt.patientNameKey}`)}</h3>
                              <p className="text-xs text-slate-600">{apt.patientId} • {t(`clinics.${apt.clinicKey}.name`)}</p>
                            </div>
                            <Badge className={appointmentStatusConfig[apt.status as keyof typeof appointmentStatusConfig].bg + " " + appointmentStatusConfig[apt.status as keyof typeof appointmentStatusConfig].text + " border-0"}>
                              {appointmentStatusConfig[apt.status as keyof typeof appointmentStatusConfig].label}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between text-sm text-slate-600 mt-3 pt-3 border-t border-blue-200">
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {apt.time}
                            </span>
                            <span className="flex items-center gap-1">
                              <UserCheck className="w-4 h-4" />
                              {t(`clinics.${apt.clinicKey}.doctor`)}
                            </span>
                            <span className="text-xs px-2 py-1 bg-white rounded">
                              {apt.duration} {t('patients.minutes')}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                  <CardContent className="pt-6 text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <p className="text-sm text-green-700 mb-1">{t('clinics.completedToday')}</p>
                    <p className="text-3xl font-bold text-green-700">{statistics.completedToday}</p>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
                  <CardContent className="pt-6 text-center">
                    <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <Clock className="w-6 h-6 text-yellow-600" />
                    </div>
                    <p className="text-sm text-yellow-700 mb-1">{t('clinics.pendingAppointments')}</p>
                    <p className="text-3xl font-bold text-yellow-700">{statistics.todayAppointments - statistics.completedToday}</p>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
                  <CardContent className="pt-6 text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <Activity className="w-6 h-6 text-blue-600" />
                    </div>
                    <p className="text-sm text-blue-700 mb-1">{t('clinics.inProgress')}</p>
                    <p className="text-3xl font-bold text-blue-700">12</p>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-red-50 to-pink-50 border-red-200">
                  <CardContent className="pt-6 text-center">
                    <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <XCircle className="w-6 h-6 text-red-600" />
                    </div>
                    <p className="text-sm text-red-700 mb-1">{t('clinics.cancelled')}</p>
                    <p className="text-3xl font-bold text-red-700">5</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* All Clinics Tab */}
            <TabsContent value="clinics" className="space-y-6">
              {/* Search and Filter */}
              <Card className="bg-white/80 backdrop-blur-md border-slate-200 shadow-xl">
                <CardContent className="pt-6">
                  <div className="flex gap-3">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                      <input
                        type="text"
                        placeholder={t('clinics.searchClinics')}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      />
                    </div>
                    <Button variant="outline" className="gap-2">
                      <Filter className="w-4 h-4" />
                      {t('common.filter')}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Clinics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {clinics.map((clinic) => {
                  const Icon = clinic.icon;
                  const config = statusConfig[clinic.status];
                  
                  return (
                    <Card key={clinic.id} className="bg-white/80 backdrop-blur-md border-slate-200 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className={`w-14 h-14 bg-gradient-to-br ${clinic.color} rounded-xl flex items-center justify-center text-white shadow-lg`}>
                            <Icon className="w-7 h-7" />
                          </div>
                          <Badge className={config.bg + " " + config.text + " border-0"}>
                            {config.label}
                          </Badge>
                        </div>
                        
                        <h3 className="text-lg font-bold text-slate-900 mb-1">{t(`clinics.${clinic.nameKey}.name`)}</h3>
                        <p className="text-sm text-slate-600 mb-4">{t(`clinics.${clinic.nameKey}.nameEn`)}</p>
                        
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2 text-sm text-slate-700">
                            <UserCheck className="w-4 h-4 text-cyan-600" />
                            {t(`clinics.${clinic.nameKey}.doctor`)}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-slate-700">
                            <MapPin className="w-4 h-4 text-cyan-600" />
                            {t('clinics.room')} {clinic.room}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-slate-700">
                            <Clock className="w-4 h-4 text-cyan-600" />
                            {t(`clinics.${clinic.nameKey}.schedule`)}
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-3 mb-4 p-3 bg-slate-50 rounded-lg">
                          <div className="text-center">
                            <p className="text-xs text-slate-600 mb-1">{t('patients.patients')}</p>
                            <p className="text-lg font-bold text-slate-900">{clinic.patients}</p>
                          </div>
                          <div className="text-center border-x border-slate-200">
                            <p className="text-xs text-slate-600 mb-1">{t('clinics.appointments')}</p>
                            <p className="text-lg font-bold text-slate-900">{clinic.appointments}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-xs text-slate-600 mb-1">{t('clinics.waitTime')}</p>
                            <p className="text-lg font-bold text-slate-900">{clinic.waitTime}m</p>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700">
                            {t('common.viewDetails')}
                          </Button>
                          <Button variant="outline" className="px-3">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            {/* Appointments Tab */}
            <TabsContent value="appointments" className="space-y-6">
              <Card className="bg-white/80 backdrop-blur-md border-slate-200 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-blue-600" />
                      {t('clinics.allAppointments')}
                    </span>
                    <Button 
                      className="gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all"
                      onClick={() => setIsAppointmentDialogOpen(true)}
                    >
                      <Plus className="w-4 h-4" />
                      {t('clinics.addAppointment')}
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {todayAppointments.map((apt) => (
                      <div key={apt.id} className="p-5 bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl border border-slate-200 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                              {apt.time.split(':')[0]}
                            </div>
                            <div>
                              <h3 className="font-bold text-slate-900 text-lg">{t(`clinics.patientNames.${apt.patientNameKey}`)}</h3>
                              <p className="text-sm text-slate-600">{apt.patientId} • {t(`clinics.${apt.clinicKey}.name`)}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={appointmentStatusConfig[apt.status as keyof typeof appointmentStatusConfig].bg + " " + appointmentStatusConfig[apt.status as keyof typeof appointmentStatusConfig].text + " border-0"}>
                              {appointmentStatusConfig[apt.status as keyof typeof appointmentStatusConfig].label}
                            </Badge>
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-4 gap-4 pt-3 border-t border-slate-200">
                          <div>
                            <p className="text-xs text-slate-600 mb-1">{t('clinics.doctor')}</p>
                            <p className="text-sm font-medium text-slate-900">{t(`clinics.${apt.clinicKey}.doctor`)}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-600 mb-1">{t('clinics.appointmentType')}</p>
                            <p className="text-sm font-medium text-slate-900">{t(`clinics.appointmentTypes.${apt.typeKey}`)}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-600 mb-1">{t('clinics.duration')}</p>
                            <p className="text-sm font-medium text-slate-900">{apt.duration} {t('patients.minutes')}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-600 mb-1">{t('clinics.time')}</p>
                            <p className="text-sm font-medium text-slate-900">{apt.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Schedule Tab */}
            <TabsContent value="schedule" className="space-y-6">
              <Card className="bg-white/80 backdrop-blur-md border-slate-200 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-indigo-600" />
                      {t('clinics.clinicsSchedule')}
                    </span>
                    <Button 
                      className="gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all"
                      onClick={() => setIsScheduleDialogOpen(true)}
                    >
                      <Plus className="w-4 h-4" />
                      {t('clinics.addSchedule')}
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {clinics.map((clinic) => {
                      const Icon = clinic.icon;
                      return (
                        <div key={clinic.id} className="p-4 bg-gradient-to-r from-slate-50 to-indigo-50 rounded-xl border border-indigo-200">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 bg-gradient-to-br ${clinic.color} rounded-lg flex items-center justify-center text-white`}>
                                <Icon className="w-5 h-5" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-slate-900">{t(`clinics.${clinic.nameKey}.name`)}</h3>
                                <p className="text-sm text-slate-600">{t(`clinics.${clinic.nameKey}.doctor`)}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium text-slate-900">{t(`clinics.${clinic.nameKey}.schedule`)}</p>
                              <p className="text-xs text-slate-600">{t('clinics.room')} {clinic.room}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Services Tab */}
            <TabsContent value="services" className="space-y-6">
              <div className="flex justify-end mb-6">
                <Button 
                  className="gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl transition-all"
                  onClick={() => setIsServiceDialogOpen(true)}
                >
                  <Plus className="w-4 h-4" />
                  {t('clinics.addService')}
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {clinics.map((clinic) => {
                  const Icon = clinic.icon;
                  const services = t(`clinics.${clinic.nameKey}.services`, { returnObjects: true }) as string[];
                  return (
                    <Card key={clinic.id} className="bg-white/80 backdrop-blur-md border-slate-200 shadow-xl">
                      <CardHeader className={`bg-gradient-to-r ${clinic.color}`}>
                        <CardTitle className="flex items-center gap-2 text-white">
                          <Icon className="w-5 h-5" />
                          {t(`clinics.${clinic.nameKey}.name`)}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <h4 className="font-semibold text-slate-700 mb-3">{t('clinics.availableServices')}</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {services.map((service, idx) => (
                            <div key={idx} className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-sm text-slate-700">
                              <CheckCircle className="w-4 h-4 text-green-500 inline mr-2" />
                              {service}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            {/* Doctors Tab */}
            <TabsContent value="doctors" className="space-y-6">
              <div className="flex justify-end mb-6">
                <Button 
                  className="gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all"
                  onClick={() => setIsDoctorDialogOpen(true)}
                >
                  <Plus className="w-4 h-4" />
                  {t('clinics.addDoctor')}
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {clinics.map((clinic) => {
                  const Icon = clinic.icon;
                  const doctor = t(`clinics.${clinic.nameKey}.doctor`);
                  return (
                    <Card key={clinic.id} className="bg-white/80 backdrop-blur-md border-slate-200 shadow-xl">
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-4 mb-4">
                          <div className={`w-16 h-16 bg-gradient-to-br ${clinic.color} rounded-full flex items-center justify-center text-white text-xl font-bold`}>
                            {doctor.split(' ')[1]?.charAt(0) || 'د'}
                          </div>
                          <div>
                            <h3 className="font-bold text-slate-900">{doctor}</h3>
                            <p className="text-sm text-slate-600">{t(`clinics.${clinic.nameKey}.department`)}</p>
                          </div>
                        </div>
                        
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2 text-sm">
                            <Building2 className="w-4 h-4 text-cyan-600" />
                            <span className="text-slate-700">{t(`clinics.${clinic.nameKey}.name`)}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="w-4 h-4 text-cyan-600" />
                            <span className="text-slate-700">{t(`clinics.${clinic.nameKey}.schedule`)}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Users className="w-4 h-4 text-cyan-600" />
                            <span className="text-slate-700">{clinic.patients} {t('patients.patient')}</span>
                          </div>
                        </div>

                        <Button className="w-full bg-gradient-to-r from-cyan-600 to-blue-600">
                          {t('common.viewDetails')}
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            {/* Reports Tab */}
            <TabsContent value="reports" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-white/80 backdrop-blur-md border-slate-200 shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-blue-600" />
                      {t('clinics.dailyPerformance')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {clinics.slice(0, 5).map((clinic) => (
                        <div key={clinic.id} className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-medium text-slate-700">{t(`clinics.${clinic.nameKey}.name`)}</span>
                            <span className="text-slate-600">{clinic.patients} {t('patients.patient')}</span>
                          </div>
                          <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                            <div 
                              className={`h-full bg-gradient-to-r ${clinic.color} rounded-full transition-all duration-500`}
                              style={{ width: `${(clinic.patients / 100) * 100}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur-md border-slate-200 shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                      {t('clinics.appointmentStatistics')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                        <span className="text-sm font-medium text-green-900">{t('clinics.completedToday')}</span>
                        <span className="text-2xl font-bold text-green-700">{statistics.completedToday}</span>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                        <span className="text-sm font-medium text-yellow-900">{t('clinics.pendingAppointments')}</span>
                        <span className="text-2xl font-bold text-yellow-700">{statistics.todayAppointments - statistics.completedToday}</span>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                        <span className="text-sm font-medium text-blue-900">{t('clinics.totalToday')}</span>
                        <span className="text-2xl font-bold text-blue-700">{statistics.todayAppointments}</span>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                        <span className="text-sm font-medium text-red-900">{t('clinics.cancelled')}</span>
                        <span className="text-2xl font-bold text-red-700">5</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-blue-600" />
                      </div>
                      <Badge className="bg-blue-100 text-blue-700 border-0">+15%</Badge>
                    </div>
                    <p className="text-sm text-blue-700 mb-1">{t('clinics.avgPatientsPerDay')}</p>
                    <p className="text-3xl font-bold text-blue-700">127</p>
                    <p className="text-xs text-blue-600 mt-2">{t('clinics.lastMonth')}: 110</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      </div>
                      <Badge className="bg-green-100 text-green-700 border-0">+8%</Badge>
                    </div>
                    <p className="text-sm text-green-700 mb-1">{t('clinics.completionRate')}</p>
                    <p className="text-3xl font-bold text-green-700">94%</p>
                    <p className="text-xs text-green-600 mt-2">{t('clinics.lastMonth')}: 87%</p>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                        <Clock className="w-6 h-6 text-purple-600" />
                      </div>
                      <Badge className="bg-purple-100 text-purple-700 border-0">-3 min</Badge>
                    </div>
                    <p className="text-sm text-purple-700 mb-1">{t('patients.avgWaitTime')}</p>
                    <p className="text-3xl font-bold text-purple-700">25 {t('patients.minutes')}</p>
                    <p className="text-xs text-purple-600 mt-2">{t('clinics.lastMonth')}: 28 {t('patients.minutes')}</p>
                  </CardContent>
                </Card>
              </div>

              {/* Top Performing Clinics */}
              <Card className="bg-white/80 backdrop-blur-md border-slate-200 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    {t('clinics.topPerformingClinics')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {clinics.sort((a, b) => b.patients - a.patients).slice(0, 5).map((clinic, index) => {
                      const Icon = clinic.icon;
                      return (
                        <div key={clinic.id} className="flex items-center gap-4 p-4 bg-gradient-to-r from-slate-50 to-green-50 rounded-xl border border-green-200">
                          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                            {index + 1}
                          </div>
                          <div className={`w-12 h-12 bg-gradient-to-br ${clinic.color} rounded-lg flex items-center justify-center text-white`}>
                            <Icon className="w-6 h-6" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-slate-900">{t(`clinics.${clinic.nameKey}.name`)}</h3>
                            <p className="text-sm text-slate-600">{t(`clinics.${clinic.nameKey}.doctor`)}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-green-700">{clinic.patients}</p>
                            <p className="text-xs text-slate-600">{t('patients.patients')}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Appointment Dialog */}
      <Dialog open={isAppointmentDialogOpen} onOpenChange={setIsAppointmentDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-cyan-700 flex items-center gap-2">
              <Calendar className="w-6 h-6" />
              {t('clinics.appointmentForm.title')}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="appointment-clinic">{t('clinics.appointmentForm.selectClinic')}</Label>
                <Select value={appointmentForm.clinicId} onValueChange={(value) => setAppointmentForm({...appointmentForm, clinicId: value})}>
                  <SelectTrigger id="appointment-clinic">
                    <SelectValue placeholder={t('clinics.appointmentForm.selectClinic')} />
                  </SelectTrigger>
                  <SelectContent>
                    {clinics.map((clinic) => (
                      <SelectItem key={clinic.id} value={clinic.id}>
                        {t(`clinics.${clinic.nameKey}.name`)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="appointment-patient">{t('clinics.appointmentForm.selectPatient')}</Label>
                <Input 
                  id="appointment-patient" 
                  placeholder="P001, P002, ..." 
                  value={appointmentForm.patientId}
                  onChange={(e) => setAppointmentForm({...appointmentForm, patientId: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="appointment-date">{t('clinics.appointmentForm.appointmentDate')}</Label>
                <Input 
                  id="appointment-date" 
                  type="date" 
                  value={appointmentForm.date}
                  onChange={(e) => setAppointmentForm({...appointmentForm, date: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="appointment-time">{t('clinics.appointmentForm.appointmentTime')}</Label>
                <Input 
                  id="appointment-time" 
                  type="time" 
                  value={appointmentForm.time}
                  onChange={(e) => setAppointmentForm({...appointmentForm, time: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="appointment-type">{t('clinics.appointmentForm.appointmentType')}</Label>
                <Select value={appointmentForm.type} onValueChange={(value) => setAppointmentForm({...appointmentForm, type: value})}>
                  <SelectTrigger id="appointment-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="consultation">{t('clinics.appointmentForm.consultation')}</SelectItem>
                    <SelectItem value="followUp">{t('clinics.appointmentForm.followUp')}</SelectItem>
                    <SelectItem value="emergency">{t('clinics.appointmentForm.emergency')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="appointment-status">{t('clinics.appointmentForm.status')}</Label>
                <Select value={appointmentForm.status} onValueChange={(value) => setAppointmentForm({...appointmentForm, status: value})}>
                  <SelectTrigger id="appointment-status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="confirmed">{t('clinics.confirmed')}</SelectItem>
                    <SelectItem value="waiting">{t('clinics.waiting')}</SelectItem>
                    <SelectItem value="in-progress">{t('clinics.inProgress')}</SelectItem>
                    <SelectItem value="cancelled">{t('clinics.cancelled')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="appointment-notes">{t('clinics.appointmentForm.notes')}</Label>
              <Textarea 
                id="appointment-notes" 
                rows={3} 
                placeholder={t('clinics.appointmentForm.notes')}
                value={appointmentForm.notes}
                onChange={(e) => setAppointmentForm({...appointmentForm, notes: e.target.value})}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAppointmentDialogOpen(false)}>
              {t('common.cancel')}
            </Button>
            <Button className="bg-gradient-to-r from-cyan-600 to-blue-600" onClick={() => {
              console.log('Appointment Form:', appointmentForm);
              setIsAppointmentDialogOpen(false);
            }}>
              {t('common.save')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Schedule Dialog */}
      <Dialog open={isScheduleDialogOpen} onOpenChange={setIsScheduleDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-indigo-700 flex items-center gap-2">
              <Clock className="w-6 h-6" />
              {t('clinics.scheduleForm.title')}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="schedule-clinic">{t('clinics.scheduleForm.selectClinic')}</Label>
                <Select value={scheduleForm.clinicId} onValueChange={(value) => setScheduleForm({...scheduleForm, clinicId: value})}>
                  <SelectTrigger id="schedule-clinic">
                    <SelectValue placeholder={t('clinics.scheduleForm.selectClinic')} />
                  </SelectTrigger>
                  <SelectContent>
                    {clinics.map((clinic) => (
                      <SelectItem key={clinic.id} value={clinic.id}>
                        {t(`clinics.${clinic.nameKey}.name`)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="schedule-doctor">{t('clinics.scheduleForm.selectDoctor')}</Label>
                <Input 
                  id="schedule-doctor" 
                  placeholder={t('clinics.scheduleForm.selectDoctor')}
                  value={scheduleForm.doctorId}
                  onChange={(e) => setScheduleForm({...scheduleForm, doctorId: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="schedule-day">{t('clinics.scheduleForm.dayOfWeek')}</Label>
              <Select value={scheduleForm.dayOfWeek} onValueChange={(value) => setScheduleForm({...scheduleForm, dayOfWeek: value})}>
                <SelectTrigger id="schedule-day">
                  <SelectValue placeholder={t('clinics.scheduleForm.dayOfWeek')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sunday">{t('clinics.scheduleForm.sunday')}</SelectItem>
                  <SelectItem value="monday">{t('clinics.scheduleForm.monday')}</SelectItem>
                  <SelectItem value="tuesday">{t('clinics.scheduleForm.tuesday')}</SelectItem>
                  <SelectItem value="wednesday">{t('clinics.scheduleForm.wednesday')}</SelectItem>
                  <SelectItem value="thursday">{t('clinics.scheduleForm.thursday')}</SelectItem>
                  <SelectItem value="friday">{t('clinics.scheduleForm.friday')}</SelectItem>
                  <SelectItem value="saturday">{t('clinics.scheduleForm.saturday')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="schedule-start">{t('clinics.scheduleForm.startTime')}</Label>
                <Input 
                  id="schedule-start" 
                  type="time" 
                  value={scheduleForm.startTime}
                  onChange={(e) => setScheduleForm({...scheduleForm, startTime: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="schedule-end">{t('clinics.scheduleForm.endTime')}</Label>
                <Input 
                  id="schedule-end" 
                  type="time" 
                  value={scheduleForm.endTime}
                  onChange={(e) => setScheduleForm({...scheduleForm, endTime: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="schedule-max">{t('clinics.scheduleForm.maxPatients')}</Label>
                <Input 
                  id="schedule-max" 
                  type="number" 
                  placeholder="20"
                  value={scheduleForm.maxPatients}
                  onChange={(e) => setScheduleForm({...scheduleForm, maxPatients: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="schedule-room">{t('clinics.scheduleForm.roomNumber')}</Label>
                <Input 
                  id="schedule-room" 
                  placeholder="201"
                  value={scheduleForm.roomNumber}
                  onChange={(e) => setScheduleForm({...scheduleForm, roomNumber: e.target.value})}
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsScheduleDialogOpen(false)}>
              {t('common.cancel')}
            </Button>
            <Button className="bg-gradient-to-r from-indigo-600 to-purple-600" onClick={() => {
              console.log('Schedule Form:', scheduleForm);
              setIsScheduleDialogOpen(false);
            }}>
              {t('common.save')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Service Dialog */}
      <Dialog open={isServiceDialogOpen} onOpenChange={setIsServiceDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-green-700 flex items-center gap-2">
              <Stethoscope className="w-6 h-6" />
              {t('clinics.serviceForm.title')}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="service-clinic">{t('clinics.serviceForm.selectClinic')}</Label>
              <Select value={serviceForm.clinicId} onValueChange={(value) => setServiceForm({...serviceForm, clinicId: value})}>
                <SelectTrigger id="service-clinic">
                  <SelectValue placeholder={t('clinics.serviceForm.selectClinic')} />
                </SelectTrigger>
                <SelectContent>
                  {clinics.map((clinic) => (
                    <SelectItem key={clinic.id} value={clinic.id}>
                      {t(`clinics.${clinic.nameKey}.name`)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="service-name-ar">{t('clinics.serviceForm.serviceNameAr')}</Label>
                <Input 
                  id="service-name-ar" 
                  placeholder={t('clinics.serviceForm.serviceNameAr')}
                  value={serviceForm.nameAr}
                  onChange={(e) => setServiceForm({...serviceForm, nameAr: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="service-name-en">{t('clinics.serviceForm.serviceNameEn')}</Label>
                <Input 
                  id="service-name-en" 
                  placeholder={t('clinics.serviceForm.serviceNameEn')}
                  value={serviceForm.nameEn}
                  onChange={(e) => setServiceForm({...serviceForm, nameEn: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="service-description">{t('clinics.serviceForm.description')}</Label>
              <Textarea 
                id="service-description" 
                rows={3}
                placeholder={t('clinics.serviceForm.description')}
                value={serviceForm.description}
                onChange={(e) => setServiceForm({...serviceForm, description: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="service-price">{t('clinics.serviceForm.price')}</Label>
                <Input 
                  id="service-price" 
                  type="number" 
                  placeholder="500"
                  value={serviceForm.price}
                  onChange={(e) => setServiceForm({...serviceForm, price: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="service-duration">{t('clinics.serviceForm.duration')}</Label>
                <Input 
                  id="service-duration" 
                  type="number" 
                  placeholder="30"
                  value={serviceForm.duration}
                  onChange={(e) => setServiceForm({...serviceForm, duration: e.target.value})}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch 
                id="service-active" 
                checked={serviceForm.isActive}
                onCheckedChange={(checked) => setServiceForm({...serviceForm, isActive: checked})}
              />
              <Label htmlFor="service-active">{t('clinics.serviceForm.isActive')}</Label>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsServiceDialogOpen(false)}>
              {t('common.cancel')}
            </Button>
            <Button className="bg-gradient-to-r from-green-600 to-emerald-600" onClick={() => {
              console.log('Service Form:', serviceForm);
              setIsServiceDialogOpen(false);
            }}>
              {t('common.save')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Doctor Dialog */}
      <Dialog open={isDoctorDialogOpen} onOpenChange={setIsDoctorDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-purple-700 flex items-center gap-2">
              <UserCheck className="w-6 h-6" />
              {t('clinics.doctorForm.title')}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="doctor-name">{t('clinics.doctorForm.fullName')}</Label>
                <Input 
                  id="doctor-name" 
                  placeholder={t('clinics.doctorForm.fullName')}
                  value={doctorForm.fullName}
                  onChange={(e) => setDoctorForm({...doctorForm, fullName: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="doctor-specialization">{t('clinics.doctorForm.specialization')}</Label>
                <Input 
                  id="doctor-specialization" 
                  placeholder={t('clinics.doctorForm.specialization')}
                  value={doctorForm.specialization}
                  onChange={(e) => setDoctorForm({...doctorForm, specialization: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="doctor-clinic">{t('clinics.doctorForm.selectClinic')}</Label>
              <Select value={doctorForm.clinicId} onValueChange={(value) => setDoctorForm({...doctorForm, clinicId: value})}>
                <SelectTrigger id="doctor-clinic">
                  <SelectValue placeholder={t('clinics.doctorForm.selectClinic')} />
                </SelectTrigger>
                <SelectContent>
                  {clinics.map((clinic) => (
                    <SelectItem key={clinic.id} value={clinic.id}>
                      {t(`clinics.${clinic.nameKey}.name`)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="doctor-email">{t('clinics.doctorForm.email')}</Label>
                <Input 
                  id="doctor-email" 
                  type="email"
                  placeholder="doctor@hospital.com"
                  value={doctorForm.email}
                  onChange={(e) => setDoctorForm({...doctorForm, email: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="doctor-phone">{t('clinics.doctorForm.phone')}</Label>
                <Input 
                  id="doctor-phone" 
                  placeholder="+966 50 123 4567"
                  value={doctorForm.phone}
                  onChange={(e) => setDoctorForm({...doctorForm, phone: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="doctor-license">{t('clinics.doctorForm.licenseNumber')}</Label>
                <Input 
                  id="doctor-license" 
                  placeholder="LIC-12345"
                  value={doctorForm.licenseNumber}
                  onChange={(e) => setDoctorForm({...doctorForm, licenseNumber: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="doctor-experience">{t('clinics.doctorForm.experience')}</Label>
                <Input 
                  id="doctor-experience" 
                  type="number"
                  placeholder="10"
                  value={doctorForm.experience}
                  onChange={(e) => setDoctorForm({...doctorForm, experience: e.target.value})}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch 
                id="doctor-available" 
                checked={doctorForm.isAvailable}
                onCheckedChange={(checked) => setDoctorForm({...doctorForm, isAvailable: checked})}
              />
              <Label htmlFor="doctor-available">{t('clinics.doctorForm.isAvailable')}</Label>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDoctorDialogOpen(false)}>
              {t('common.cancel')}
            </Button>
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600" onClick={() => {
              console.log('Doctor Form:', doctorForm);
              setIsDoctorDialogOpen(false);
            }}>
              {t('common.save')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Clinic Dialog - Full Form */}
      <Dialog open={isClinicDialogOpen} onOpenChange={setIsClinicDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-cyan-700 flex items-center gap-2">
              <Building2 className="w-6 h-6" />
              {t('clinics.clinicForm.title')}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-900 border-b pb-2">{t('patients.basicInfo')}</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="clinic-name-ar">{t('clinics.clinicForm.clinicNameAr')}</Label>
                  <Input 
                    id="clinic-name-ar" 
                    placeholder="عيادة القلب"
                    value={clinicForm.nameAr}
                    onChange={(e) => setClinicForm({...clinicForm, nameAr: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="clinic-name-en">{t('clinics.clinicForm.clinicNameEn')}</Label>
                  <Input 
                    id="clinic-name-en" 
                    placeholder="Cardiology Clinic"
                    value={clinicForm.nameEn}
                    onChange={(e) => setClinicForm({...clinicForm, nameEn: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="clinic-dept-ar">{t('clinics.clinicForm.departmentAr')}</Label>
                  <Input 
                    id="clinic-dept-ar" 
                    placeholder="قسم القلب والأوعية الدموية"
                    value={clinicForm.departmentAr}
                    onChange={(e) => setClinicForm({...clinicForm, departmentAr: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="clinic-dept-en">{t('clinics.clinicForm.departmentEn')}</Label>
                  <Input 
                    id="clinic-dept-en" 
                    placeholder="Cardiovascular Department"
                    value={clinicForm.departmentEn}
                    onChange={(e) => setClinicForm({...clinicForm, departmentEn: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="clinic-specialization">{t('clinics.clinicForm.specialization')}</Label>
                  <Input 
                    id="clinic-specialization" 
                    placeholder={t('clinics.clinicForm.specialization')}
                    value={clinicForm.specialization}
                    onChange={(e) => setClinicForm({...clinicForm, specialization: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="clinic-doctor">{t('clinics.clinicForm.assignedDoctor')}</Label>
                  <Input 
                    id="clinic-doctor" 
                    placeholder={t('clinics.clinicForm.assignedDoctor')}
                    value={clinicForm.assignedDoctor}
                    onChange={(e) => setClinicForm({...clinicForm, assignedDoctor: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="clinic-description">{t('clinics.clinicForm.description')}</Label>
                <Textarea 
                  id="clinic-description" 
                  rows={3}
                  placeholder={t('clinics.clinicForm.description')}
                  value={clinicForm.description}
                  onChange={(e) => setClinicForm({...clinicForm, description: e.target.value})}
                />
              </div>
            </div>

            {/* Location Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-900 border-b pb-2">{t('patients.contactInfo')}</h3>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="clinic-room">{t('clinics.clinicForm.roomNumber')}</Label>
                  <Input 
                    id="clinic-room" 
                    placeholder="101"
                    value={clinicForm.roomNumber}
                    onChange={(e) => setClinicForm({...clinicForm, roomNumber: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="clinic-floor">{t('clinics.clinicForm.floor')}</Label>
                  <Input 
                    id="clinic-floor" 
                    placeholder="1"
                    value={clinicForm.floor}
                    onChange={(e) => setClinicForm({...clinicForm, floor: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="clinic-building">{t('clinics.clinicForm.building')}</Label>
                  <Input 
                    id="clinic-building" 
                    placeholder="A"
                    value={clinicForm.building}
                    onChange={(e) => setClinicForm({...clinicForm, building: e.target.value})}
                  />
                </div>
              </div>
            </div>

            {/* Capacity & Working Hours */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-900 border-b pb-2">{t('clinics.clinicForm.workingHours')}</h3>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="clinic-capacity">{t('clinics.clinicForm.maxPatientsPerDay')}</Label>
                  <Input 
                    id="clinic-capacity" 
                    type="number"
                    placeholder="50"
                    value={clinicForm.maxPatientsPerDay}
                    onChange={(e) => setClinicForm({...clinicForm, maxPatientsPerDay: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="clinic-start-time">{t('clinics.clinicForm.startTime')}</Label>
                  <Input 
                    id="clinic-start-time" 
                    type="time"
                    value={clinicForm.startTime}
                    onChange={(e) => setClinicForm({...clinicForm, startTime: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="clinic-end-time">{t('clinics.clinicForm.endTime')}</Label>
                  <Input 
                    id="clinic-end-time" 
                    type="time"
                    value={clinicForm.endTime}
                    onChange={(e) => setClinicForm({...clinicForm, endTime: e.target.value})}
                  />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-900 border-b pb-2">{t('clinics.clinicForm.contactInfo')}</h3>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="clinic-phone">{t('clinics.clinicForm.phone')}</Label>
                  <Input 
                    id="clinic-phone" 
                    placeholder="+966 11 234 5678"
                    value={clinicForm.phone}
                    onChange={(e) => setClinicForm({...clinicForm, phone: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="clinic-extension">{t('clinics.clinicForm.extension')}</Label>
                  <Input 
                    id="clinic-extension" 
                    placeholder="1234"
                    value={clinicForm.extension}
                    onChange={(e) => setClinicForm({...clinicForm, extension: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="clinic-email">{t('clinics.clinicForm.email')}</Label>
                  <Input 
                    id="clinic-email" 
                    type="email"
                    placeholder="clinic@hospital.com"
                    value={clinicForm.email}
                    onChange={(e) => setClinicForm({...clinicForm, email: e.target.value})}
                  />
                </div>
              </div>
            </div>

            {/* Equipment & Color */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-900 border-b pb-2">{t('clinics.clinicForm.equipment')}</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="clinic-equipment">{t('clinics.clinicForm.equipmentList')}</Label>
                  <Textarea 
                    id="clinic-equipment" 
                    rows={3}
                    placeholder="ECG, Ultrasound, X-Ray..."
                    value={clinicForm.equipmentList}
                    onChange={(e) => setClinicForm({...clinicForm, equipmentList: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="clinic-color">{t('clinics.clinicForm.color')}</Label>
                  <Select value={clinicForm.color} onValueChange={(value) => setClinicForm({...clinicForm, color: value})}>
                    <SelectTrigger id="clinic-color">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="from-red-500 to-pink-600">❤️ Red to Pink</SelectItem>
                      <SelectItem value="from-blue-500 to-cyan-600">💙 Blue to Cyan</SelectItem>
                      <SelectItem value="from-orange-500 to-red-600">🧡 Orange to Red</SelectItem>
                      <SelectItem value="from-purple-500 to-pink-600">💜 Purple to Pink</SelectItem>
                      <SelectItem value="from-green-500 to-emerald-600">💚 Green to Emerald</SelectItem>
                      <SelectItem value="from-indigo-500 to-purple-600">💙 Indigo to Purple</SelectItem>
                      <SelectItem value="from-cyan-500 to-blue-600">🩵 Cyan to Blue</SelectItem>
                      <SelectItem value="from-violet-500 to-purple-600">💜 Violet to Purple</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Settings & Status */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-900 border-b pb-2">{t('clinics.clinicForm.status')}</h3>
              
              <div className="grid grid-cols-3 gap-6">
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="clinic-active" 
                    checked={clinicForm.isActive}
                    onCheckedChange={(checked) => setClinicForm({...clinicForm, isActive: checked})}
                  />
                  <Label htmlFor="clinic-active">{t('clinics.clinicForm.isActive')}</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch 
                    id="clinic-emergency" 
                    checked={clinicForm.allowEmergency}
                    onCheckedChange={(checked) => setClinicForm({...clinicForm, allowEmergency: checked})}
                  />
                  <Label htmlFor="clinic-emergency">{t('clinics.clinicForm.allowEmergency')}</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch 
                    id="clinic-appointment" 
                    checked={clinicForm.requiresAppointment}
                    onCheckedChange={(checked) => setClinicForm({...clinicForm, requiresAppointment: checked})}
                  />
                  <Label htmlFor="clinic-appointment">{t('clinics.clinicForm.requiresAppointment')}</Label>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="clinic-notes">{t('clinics.clinicForm.notes')}</Label>
                <Textarea 
                  id="clinic-notes" 
                  rows={3}
                  placeholder={t('clinics.clinicForm.notes')}
                  value={clinicForm.notes}
                  onChange={(e) => setClinicForm({...clinicForm, notes: e.target.value})}
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsClinicDialogOpen(false)}>
              {t('common.cancel')}
            </Button>
            <Button className="bg-gradient-to-r from-cyan-600 to-blue-600" onClick={() => {
              console.log('Clinic Form:', clinicForm);
              setIsClinicDialogOpen(false);
            }}>
              {t('common.save')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
