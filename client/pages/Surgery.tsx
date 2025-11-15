import Layout from "@/components/Layout";
import {
  Search,
  Clock,
  Users,
  AlertCircle,
  CheckCircle2,
  Plus,
  Filter,
  Calendar,
  MapPin,
  Stethoscope,
  ArrowRight,
  Activity,
  UserCheck,
  ClipboardList,
  Heart,
  Syringe,
  Building2,
  TrendingUp,
  FileText,
  Scissors,
  Timer,
  Package,
  DollarSign,
  BarChart3,
} from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const SurgeryCard = ({
  id,
  patientName,
  procedure,
  date,
  time,
  surgeon,
  operatingRoom,
  status,
  anesthesia,
}: {
  id: string;
  patientName: string;
  procedure: string;
  date: string;
  time: string;
  surgeon: string;
  operatingRoom: string;
  status: "scheduled" | "in-progress" | "completed" | "cancelled";
  anesthesia: string;
}) => {
  const { t } = useTranslation();
  const statusConfig = {
    scheduled: { bg: "bg-blue-50", badge: t('surgery.scheduled'), color: "text-blue-700" },
    "in-progress": {
      bg: "bg-green-50",
      badge: t('surgery.inProgress'),
      color: "text-green-700",
    },
    completed: { bg: "bg-emerald-50", badge: t('surgery.completed'), color: "text-emerald-700" },
    cancelled: { bg: "bg-red-50", badge: t('surgery.cancelled'), color: "text-red-700" },
  };

  const config = statusConfig[status];

  return (
    <div className={`${config.bg} rounded-lg border border-slate-200 p-6 hover:shadow-md transition-shadow`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{patientName}</h3>
          <p className="text-sm text-slate-500">Case #{id}</p>
        </div>
        <span className={`text-xs font-semibold px-3 py-1 rounded-full bg-white border ${config.color} border-current`}>
          {config.badge}
        </span>
      </div>

      <h4 className="text-sm font-medium text-slate-900 mb-4">{procedure}</h4>

      <div className="space-y-2 text-sm text-slate-600 mb-4">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {date}
          </span>
          <span className="font-medium text-slate-900">{time}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            {t('surgery.operatingRoom')}
          </span>
          <span className="font-medium text-slate-900">{operatingRoom}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Stethoscope className="w-4 h-4" />
            {t('surgery.surgeon')}
          </span>
          <span className="font-medium text-slate-900">{surgeon}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>{t('surgery.anesthesia')}</span>
          <span className="font-medium text-slate-900">{anesthesia}</span>
        </div>
      </div>

      <button className="w-full bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-2">
        {t('common.viewDetails')} <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};

const OperatingRoomStatus = ({
  room,
  status,
  currentSurgery,
  nextSurgery,
}: {
  room: string;
  status: "available" | "in-use" | "maintenance";
  currentSurgery?: string;
  nextSurgery?: string;
}) => {
  const { t } = useTranslation();
  const statusConfig = {
    available: {
      color: "text-green-700",
      bg: "bg-green-50",
      badge: t('surgery.available'),
    },
    "in-use": { color: "text-blue-700", bg: "bg-blue-50", badge: t('surgery.inUse') },
    maintenance: {
      color: "text-yellow-700",
      bg: "bg-yellow-50",
      badge: t('rooms.maintenance'),
    },
  };

  const config = statusConfig[status];

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-900">{room}</h3>
        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${config.bg} ${config.color}`}>
          {config.badge}
        </span>
      </div>

      {currentSurgery && (
        <div className="mb-4 pb-4 border-b border-slate-200">
          <p className="text-xs text-slate-600 uppercase tracking-wide mb-1">
            {t('surgery.currentlyInUse')}
          </p>
          <p className="font-medium text-slate-900">{currentSurgery}</p>
        </div>
      )}

      {nextSurgery && (
        <div>
          <p className="text-xs text-slate-600 uppercase tracking-wide mb-1">
            {t('surgery.nextSurgery')}
          </p>
          <p className="font-medium text-slate-900">{nextSurgery}</p>
        </div>
      )}

      {status === "available" && !currentSurgery && !nextSurgery && (
        <p className="text-slate-600 text-sm">{t('surgery.noSurgeriesScheduled')}</p>
      )}
    </div>
  );
};

export default function Surgery() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("overview");
  const [isScheduleSurgeryDialogOpen, setIsScheduleSurgeryDialogOpen] = useState(false);
  const [surgeryForm, setSurgeryForm] = useState({
    patientId: "",
    patientName: "",
    procedure: "",
    date: "",
    time: "",
    surgeon: "",
    operatingRoom: "",
    anesthesiaType: "general",
    duration: "",
    notes: ""
  });

  const surgeries = [
    {
      id: "S001",
      patientName: "Ahmed Mohammed",
      procedure: "Coronary Artery Bypass Graft (CABG)",
      date: "2024-01-20",
      time: "08:00 AM",
      surgeon: "Dr. Hassan Al-Rashid",
      operatingRoom: "OR-1",
      status: "scheduled" as const,
      anesthesia: "General",
    },
    {
      id: "S002",
      patientName: "Fatima Al-Rashid",
      procedure: "Appendectomy",
      date: "2024-01-19",
      time: "10:30 AM",
      surgeon: "Dr. Mohammed Al-Harbi",
      operatingRoom: "OR-2",
      status: "in-progress" as const,
      anesthesia: "General",
    },
    {
      id: "S003",
      patientName: "Muhammad Hassan",
      procedure: "Knee Replacement Surgery",
      date: "2024-01-18",
      time: "02:00 PM",
      surgeon: "Dr. Noor Al-Otaibi",
      operatingRoom: "OR-3",
      status: "completed" as const,
      anesthesia: "Spinal",
    },
    {
      id: "S004",
      patientName: "Noor Abdullah",
      procedure: "Gallbladder Removal",
      date: "2024-01-17",
      time: "09:00 AM",
      surgeon: "Dr. Sarah Al-Shehri",
      operatingRoom: "OR-1",
      status: "completed" as const,
      anesthesia: "General",
    },
    {
      id: "S005",
      patientName: "Khalid Omar",
      procedure: "Cataract Surgery",
      date: "2024-01-22",
      time: "11:00 AM",
      surgeon: "Dr. Khalid Al-Mutairi",
      operatingRoom: "OR-4",
      status: "scheduled" as const,
      anesthesia: "Local",
    },
  ];

  const operatingRooms = [
    {
      room: "Operating Room 1",
      status: "in-use" as const,
      currentSurgery: "Coronary Artery Bypass (Ahmed Mohammed)",
      nextSurgery: "Knee Replacement - 2:00 PM",
    },
    {
      room: "Operating Room 2",
      status: "in-use" as const,
      currentSurgery: "Appendectomy (Fatima Al-Rashid)",
      nextSurgery: "Hernia Repair - 1:30 PM",
    },
    {
      room: "Operating Room 3",
      status: "available" as const,
      nextSurgery: "Cataract Surgery - 11:00 AM",
    },
    {
      room: "Operating Room 4",
      status: "maintenance" as const,
    },
  ];

  // Surgical Team Data
  const surgicalTeam = [
    {
      id: 1,
      name: "د. حسن الراشد",
      nameEn: "Dr. Hassan Al-Rashid",
      role: "جراح القلب",
      roleEn: "Cardiac Surgeon",
      experience: 15,
      surgeriesToday: 3,
      totalSurgeries: 1240,
      specialization: "جراحة القلب والصدر",
      availability: "متاح",
      nextSurgery: "08:00 AM",
    },
    {
      id: 2,
      name: "د. محمد الحربي",
      nameEn: "Dr. Mohammed Al-Harbi",
      role: "جراح عام",
      roleEn: "General Surgeon",
      experience: 12,
      surgeriesToday: 2,
      totalSurgeries: 890,
      specialization: "الجراحة العامة",
      availability: "في عملية",
      nextSurgery: "Current",
    },
    {
      id: 3,
      name: "د. نور العتيبي",
      nameEn: "Dr. Noor Al-Otaibi",
      role: "جراح عظام",
      roleEn: "Orthopedic Surgeon",
      experience: 10,
      surgeriesToday: 1,
      totalSurgeries: 650,
      specialization: "جراحة العظام والمفاصل",
      availability: "متاح",
      nextSurgery: "02:00 PM",
    },
    {
      id: 4,
      name: "د. سارة الشهري",
      nameEn: "Dr. Sarah Al-Shehri",
      role: "جراح منظار",
      roleEn: "Laparoscopic Surgeon",
      experience: 8,
      surgeriesToday: 2,
      totalSurgeries: 520,
      specialization: "الجراحة بالمنظار",
      availability: "متاح",
      nextSurgery: "11:30 AM",
    },
  ];

  // Equipment and Supplies
  const equipment = [
    {
      name: "جهاز التخدير الرئيسي",
      nameEn: "Main Anesthesia Machine",
      status: "operational",
      room: "OR-1",
      lastMaintenance: "2024-01-10",
      nextMaintenance: "2024-02-10",
    },
    {
      name: "منظار جراحي HD",
      nameEn: "HD Surgical Endoscope",
      status: "operational",
      room: "OR-2",
      lastMaintenance: "2024-01-15",
      nextMaintenance: "2024-02-15",
    },
    {
      name: "جهاز المراقبة الحيوية",
      nameEn: "Vital Signs Monitor",
      status: "maintenance",
      room: "OR-4",
      lastMaintenance: "2023-12-20",
      nextMaintenance: "2024-01-20",
    },
    {
      name: "طاولة العمليات الكهربائية",
      nameEn: "Electric Operating Table",
      status: "operational",
      room: "OR-3",
      lastMaintenance: "2024-01-12",
      nextMaintenance: "2024-02-12",
    },
  ];

  // Pre and Post-Op Care
  const prePostOpCare = [
    {
      patientName: "أحمد محمد",
      patientId: "P001",
      phase: "pre-op",
      procedure: "جراحة القلب المفتوح",
      checklist: {
        bloodTests: true,
        ecg: true,
        xray: true,
        consent: true,
        fasting: true,
        anesthesia: false,
      },
      assignedNurse: "ممرضة فاطمة",
      scheduledTime: "08:00 AM",
    },
    {
      patientName: "فاطمة الراشد",
      patientId: "P002",
      phase: "post-op",
      procedure: "استئصال الزائدة",
      recoveryStatus: "stable",
      vitalSigns: {
        heartRate: 78,
        bloodPressure: "120/80",
        temperature: 37.2,
        oxygenLevel: 98,
      },
      assignedNurse: "ممرضة نور",
      dischargeTime: "Expected: 6:00 PM",
    },
    {
      patientName: "محمد حسن",
      patientId: "P003",
      phase: "post-op",
      procedure: "استبدال مفصل الركبة",
      recoveryStatus: "monitoring",
      vitalSigns: {
        heartRate: 85,
        bloodPressure: "130/85",
        temperature: 37.5,
        oxygenLevel: 96,
      },
      assignedNurse: "ممرضة سارة",
      dischargeTime: "Expected: Tomorrow",
    },
  ];

  // Surgery Statistics
  const surgeryStats = [
    {
      type: "جراحة القلب",
      typeEn: "Cardiac Surgery",
      count: 45,
      successRate: 96,
      avgDuration: 4.5,
      revenue: 2250000,
    },
    {
      type: "جراحة عامة",
      typeEn: "General Surgery",
      count: 120,
      successRate: 98,
      avgDuration: 2.0,
      revenue: 1800000,
    },
    {
      type: "جراحة عظام",
      typeEn: "Orthopedic Surgery",
      count: 85,
      successRate: 97,
      avgDuration: 3.0,
      revenue: 1650000,
    },
    {
      type: "جراحة منظار",
      typeEn: "Laparoscopic Surgery",
      count: 95,
      successRate: 99,
      avgDuration: 1.5,
      revenue: 1420000,
    },
  ];

  // Supplies Inventory
  const supplies = [
    { name: "قفازات جراحية", quantity: 5000, minStock: 1000, unit: "زوج", status: "sufficient" },
    { name: "كمامات N95", quantity: 800, minStock: 500, unit: "قطعة", status: "low" },
    { name: "خيوط جراحية", quantity: 350, minStock: 200, unit: "علبة", status: "sufficient" },
    { name: "شاش طبي", quantity: 2500, minStock: 1000, unit: "حزمة", status: "sufficient" },
    { name: "معقمات", quantity: 150, minStock: 300, unit: "زجاجة", status: "critical" },
  ];

  const filteredSurgeries = surgeries.filter((surgery) => {
    const matchesSearch =
      surgery.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      surgery.procedure.toLowerCase().includes(searchTerm.toLowerCase()) ||
      surgery.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      statusFilter === "all" || surgery.status === statusFilter;

    return matchesSearch && matchesFilter;
  });

  const stats = {
    scheduled: surgeries.filter((s) => s.status === "scheduled").length,
    inProgress: surgeries.filter((s) => s.status === "in-progress").length,
    completed: surgeries.filter((s) => s.status === "completed").length,
    today: surgeries.filter((s) => s.date === "2024-01-19").length,
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  {t('navigation.surgery')}
                </h1>
                <p className="text-lg text-slate-600">
                  {t('surgery.managementSystem')}
                </p>
              </div>
              <Button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300" onClick={() => setIsScheduleSurgeryDialogOpen(true)}>
                <Plus className="w-5 h-5" />
                {t('surgery.scheduleSurgery')}
              </Button>
            </div>
          </div>

          {/* Main Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-blue-500 to-cyan-600 border-0 shadow-xl">
              <div className="p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <Badge className="bg-white/20 text-white border-0">اليوم</Badge>
                </div>
                <p className="text-sm text-blue-100 mb-1">{t('surgery.scheduledSurgeries')}</p>
                <p className="text-3xl font-bold">{stats.scheduled}</p>
                <p className="text-xs text-blue-100 mt-2">{t('surgery.operationScheduled')}</p>
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-green-500 to-emerald-600 border-0 shadow-xl">
              <div className="p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <Activity className="w-6 h-6" />
                  </div>
                  <Badge className="bg-white/20 text-white border-0 animate-pulse">{t('surgery.live')}</Badge>
                </div>
                <p className="text-sm text-green-100 mb-1">{t('surgery.inProgress')}</p>
                <p className="text-3xl font-bold">{stats.inProgress}</p>
                <p className="text-xs text-green-100 mt-2">{t('surgery.operationOngoing')}</p>
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-purple-500 to-pink-600 border-0 shadow-xl">
              <div className="p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <Badge className="bg-white/20 text-white border-0">✓</Badge>
                </div>
                <p className="text-sm text-purple-100 mb-1">{t('surgery.completedToday')}</p>
                <p className="text-3xl font-bold">{stats.completed}</p>
                <p className="text-xs text-purple-100 mt-2">{t('surgery.operationCompleted')}</p>
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-orange-500 to-red-600 border-0 shadow-xl">
              <div className="p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <Badge className="bg-white/20 text-white border-0">
                    {operatingRooms.filter(r => r.status === "in-use").length} {t('surgery.active')}
                  </Badge>
                </div>
                <p className="text-sm text-orange-100 mb-1">{t('surgery.operatingRooms')}</p>
                <p className="text-3xl font-bold">{operatingRooms.length}</p>
                <p className="text-xs text-orange-100 mt-2">{t('surgery.operatingRoomsCount')}</p>
              </div>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="bg-white/80 backdrop-blur-md border border-slate-200 p-1 rounded-xl shadow-lg">
              <TabsTrigger value="overview" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg px-6">
                <BarChart3 className="w-4 h-4 ml-2" />
                {t('surgery.overview')}
              </TabsTrigger>
              <TabsTrigger value="surgeries" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg px-6">
                <Scissors className="w-4 h-4 ml-2" />
                {t('surgery.surgeries')}
              </TabsTrigger>
              <TabsTrigger value="rooms" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg px-6">
                <Building2 className="w-4 h-4 ml-2" />
                {t('surgery.rooms')}
              </TabsTrigger>
              <TabsTrigger value="team" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg px-6">
                <Users className="w-4 h-4 ml-2" />
                {t('surgery.team')}
              </TabsTrigger>
              <TabsTrigger value="care" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg px-6">
                <Heart className="w-4 h-4 ml-2" />
                {t('surgery.care')}
              </TabsTrigger>
              <TabsTrigger value="equipment" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg px-6">
                <Package className="w-4 h-4 ml-2" />
                {t('surgery.equipment')}
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {/* Surgery Statistics */}
              <Card className="bg-white/80 backdrop-blur-md border-slate-200 shadow-xl">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <TrendingUp className="w-6 h-6 text-blue-600" />
                    {t('surgery.surgeryStatistics')}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {surgeryStats.map((stat, index) => (
                      <div key={index} className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl p-5 border border-slate-200">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <p className="font-bold text-slate-900">{stat.type}</p>
                            <p className="text-xs text-slate-500">{stat.typeEn}</p>
                          </div>
                          <Badge className="bg-green-100 text-green-700 border-0">
                            {stat.successRate}% {t('surgery.successRate')}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-3 text-sm">
                          <div>
                            <p className="text-slate-600 mb-1">{t('surgery.operationsCount')}</p>
                            <p className="text-2xl font-bold text-blue-600">{stat.count}</p>
                          </div>
                          <div>
                            <p className="text-slate-600 mb-1">{t('surgery.avgDuration')}</p>
                            <p className="text-2xl font-bold text-purple-600">{stat.avgDuration}{t('surgery.hours')}</p>
                          </div>
                          <div>
                            <p className="text-slate-600 mb-1">{t('surgery.revenue')}</p>
                            <p className="text-lg font-bold text-green-600">{(stat.revenue / 1000000).toFixed(1)}M</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Operating Rooms Status */}
              <Card className="bg-white/80 backdrop-blur-md border-slate-200 shadow-xl">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <Building2 className="w-6 h-6 text-blue-600" />
                    {t('surgery.operatingRoomsStatus')}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {operatingRooms.map((room, index) => (
                      <OperatingRoomStatus key={index} {...room} />
                    ))}
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Surgeries Tab */}
            <TabsContent value="surgeries" className="space-y-6">
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
                      <option value="all">{t('common.all')} {t('common.status')}</option>
                      <option value="scheduled">{t('surgery.scheduled')}</option>
                      <option value="in-progress">{t('surgery.inProgress')}</option>
                      <option value="completed">{t('surgery.completed')}</option>
                    </select>
                  </div>
                </div>
              </Card>

              {/* Surgeries Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSurgeries.map((surgery, index) => (
                  <SurgeryCard key={index} {...surgery} />
                ))}
              </div>

              {filteredSurgeries.length === 0 && (
                <Card className="bg-slate-50 border-slate-200">
                  <div className="p-12 text-center">
                    <Scissors className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                    <p className="text-slate-600">{t('surgery.noSurgeriesFound')}</p>
                  </div>
                </Card>
              )}
            </TabsContent>

            {/* Rooms Tab */}
            <TabsContent value="rooms" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {operatingRooms.map((room, index) => (
                  <Card key={index} className="bg-white/80 backdrop-blur-md border-slate-200 shadow-xl overflow-hidden">
                    <div className={`h-2 ${
                      room.status === "in-use" ? "bg-green-500" :
                      room.status === "available" ? "bg-blue-500" :
                      "bg-yellow-500"
                    }`} />
                    <div className="p-6">
                      <OperatingRoomStatus {...room} />
                      <button className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition-all">
                        {t('surgery.viewDetailsButton')}
                      </button>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Team Tab */}
            <TabsContent value="team" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {surgicalTeam.map((member) => (
                  <Card key={member.id} className="bg-white/80 backdrop-blur-md border-slate-200 shadow-xl">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                            {member.name.split(' ')[1].charAt(0)}
                          </div>
                          <div>
                            <h3 className="font-bold text-slate-900 text-lg">{member.name}</h3>
                            <p className="text-sm text-slate-600">{member.role}</p>
                          </div>
                        </div>
                        <Badge className={
                          member.availability === "متاح" 
                            ? "bg-green-100 text-green-700 border-0" 
                            : "bg-orange-100 text-orange-700 border-0"
                        }>
                          {member.availability}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="text-center p-3 bg-blue-50 rounded-lg">
                          <p className="text-xs text-blue-600 mb-1">{t('surgery.experience')}</p>
                          <p className="text-2xl font-bold text-blue-700">{member.experience}</p>
                          <p className="text-xs text-blue-600">{t('surgery.year')}</p>
                        </div>
                        <div className="text-center p-3 bg-green-50 rounded-lg">
                          <p className="text-xs text-green-600 mb-1">{t('surgery.todayOperations')}</p>
                          <p className="text-2xl font-bold text-green-700">{member.surgeriesToday}</p>
                          <p className="text-xs text-green-600">{t('surgery.operation')}</p>
                        </div>
                        <div className="text-center p-3 bg-purple-50 rounded-lg">
                          <p className="text-xs text-purple-600 mb-1">{t('surgery.total')}</p>
                          <p className="text-2xl font-bold text-purple-700">{member.totalSurgeries}</p>
                          <p className="text-xs text-purple-600">{t('surgery.operation')}</p>
                        </div>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-between py-2 border-t border-slate-200">
                          <span className="text-slate-600">{t('surgery.specialization')}</span>
                          <span className="font-semibold text-slate-900">{member.specialization}</span>
                        </div>
                        <div className="flex items-center justify-between py-2 border-t border-slate-200">
                          <span className="text-slate-600">{t('surgery.nextOperation')}</span>
                          <span className="font-semibold text-slate-900">{member.nextSurgery}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Care Tab */}
            <TabsContent value="care" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {prePostOpCare.map((patient, index) => (
                  <Card key={index} className="bg-white/80 backdrop-blur-md border-slate-200 shadow-xl">
                    <div className={`h-2 ${patient.phase === "pre-op" ? "bg-blue-500" : "bg-green-500"}`} />
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-bold text-slate-900 text-lg">{patient.patientName}</h3>
                          <p className="text-sm text-slate-600">{patient.patientId}</p>
                        </div>
                          <Badge className={patient.phase === "pre-op" ? "bg-blue-100 text-blue-700 border-0" : "bg-green-100 text-green-700 border-0"}>
                          {patient.phase === "pre-op" ? t('surgery.preOp') : t('surgery.postOp')}
                        </Badge>
                      </div>

                      <p className="font-semibold text-slate-900 mb-4">{patient.procedure}</p>

                      {patient.phase === "pre-op" && patient.checklist && (
                        <div className="space-y-2 mb-4">
                          <p className="text-sm font-semibold text-slate-700 mb-2">{t('surgery.checklistTitle')}</p>
                          {Object.entries(patient.checklist).map(([key, value]) => (
                            <div key={key} className="flex items-center justify-between text-sm">
                              <span className="text-slate-600 capitalize">{key}</span>
                              {value ? (
                                <CheckCircle2 className="w-5 h-5 text-green-600" />
                              ) : (
                                <AlertCircle className="w-5 h-5 text-orange-600" />
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {patient.phase === "post-op" && patient.vitalSigns && (
                        <div className="grid grid-cols-2 gap-3 mb-4">
                          <div className="bg-gradient-to-r from-red-50 to-pink-50 p-3 rounded-lg">
                            <p className="text-xs text-red-600 mb-1">{t('surgery.heartRate')}</p>
                            <p className="text-xl font-bold text-red-700">{patient.vitalSigns.heartRate}</p>
                          </div>
                          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-3 rounded-lg">
                            <p className="text-xs text-blue-600 mb-1">{t('surgery.bloodPressure')}</p>
                            <p className="text-xl font-bold text-blue-700">{patient.vitalSigns.bloodPressure}</p>
                          </div>
                          <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-3 rounded-lg">
                            <p className="text-xs text-orange-600 mb-1">{t('surgery.temperature')}</p>
                            <p className="text-xl font-bold text-orange-700">{patient.vitalSigns.temperature}°C</p>
                          </div>
                          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-3 rounded-lg">
                            <p className="text-xs text-green-600 mb-1">{t('surgery.oxygen')}</p>
                            <p className="text-xl font-bold text-green-700">{patient.vitalSigns.oxygenLevel}%</p>
                          </div>
                        </div>
                      )}

                      <div className="space-y-2 text-sm border-t border-slate-200 pt-4">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-600">{t('surgery.assignedNurse')}</span>
                          <span className="font-semibold text-slate-900">{patient.assignedNurse}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-600">
                            {patient.phase === "pre-op" ? t('surgery.operationTime') : t('surgery.dischargeTime')}
                          </span>
                          <span className="font-semibold text-slate-900">
                            {patient.phase === "pre-op" ? patient.scheduledTime : patient.dischargeTime}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Equipment Tab */}
            <TabsContent value="equipment" className="space-y-6">
              {/* Equipment List */}
              <Card className="bg-white/80 backdrop-blur-md border-slate-200 shadow-xl">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <Package className="w-6 h-6 text-blue-600" />
                    {t('surgery.medicalEquipment')}
                  </h3>
                  <div className="space-y-4">
                    {equipment.map((item, index) => (
                      <div key={index} className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl p-5 border border-slate-200">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <p className="font-bold text-slate-900">{item.name}</p>
                            <p className="text-xs text-slate-500">{item.nameEn}</p>
                          </div>
                          <Badge className={
                            item.status === "operational" 
                              ? "bg-green-100 text-green-700 border-0" 
                              : "bg-orange-100 text-orange-700 border-0"
                          }>
                            {item.status === "operational" ? t('surgery.operational') : t('surgery.maintenance')}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-slate-600 mb-1">{t('surgery.location')}</p>
                            <p className="font-semibold text-slate-900">{item.room}</p>
                          </div>
                          <div>
                            <p className="text-slate-600 mb-1">{t('surgery.lastMaintenance')}</p>
                            <p className="font-semibold text-slate-900">{item.lastMaintenance}</p>
                          </div>
                          <div>
                            <p className="text-slate-600 mb-1">{t('surgery.nextMaintenance')}</p>
                            <p className="font-semibold text-slate-900">{item.nextMaintenance}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Supplies Inventory */}
              <Card className="bg-white/80 backdrop-blur-md border-slate-200 shadow-xl">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <ClipboardList className="w-6 h-6 text-blue-600" />
                    {t('surgery.suppliesInventory')}
                  </h3>
                  <div className="space-y-4">
                    {supplies.map((item, index) => (
                      <div key={index} className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl p-5 border border-slate-200">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <p className="font-bold text-slate-900">{item.name}</p>
                            <p className="text-sm text-slate-600">{item.quantity} {item.unit}</p>
                          </div>
                          <Badge className={
                            item.status === "sufficient" 
                              ? "bg-green-100 text-green-700 border-0" 
                              : item.status === "low"
                              ? "bg-yellow-100 text-yellow-700 border-0"
                              : "bg-red-100 text-red-700 border-0"
                          }>
                            {item.status === "sufficient" ? t('surgery.sufficient') : item.status === "low" ? t('surgery.low') : t('surgery.critical')}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-600">{t('surgery.minStock')}: {item.minStock} {item.unit}</span>
                          <div className="h-2 w-32 bg-slate-200 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${
                                item.status === "sufficient" 
                                  ? "bg-green-500" 
                                  : item.status === "low"
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                              }`}
                              style={{ width: `${(item.quantity / (item.minStock * 2)) * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Schedule Surgery Dialog */}
      <Dialog open={isScheduleSurgeryDialogOpen} onOpenChange={setIsScheduleSurgeryDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-blue-700 flex items-center gap-2">
              <Scissors className="w-6 h-6" />
              {t('surgery.scheduleSurgery')}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="patient-id">{t('surgery.patientId')}</Label>
                <Input 
                  id="patient-id" 
                  placeholder="P001"
                  value={surgeryForm.patientId}
                  onChange={(e) => setSurgeryForm({...surgeryForm, patientId: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="patient-name">{t('surgery.patientName')}</Label>
                <Input 
                  id="patient-name" 
                  placeholder={t('surgery.patientName')}
                  value={surgeryForm.patientName}
                  onChange={(e) => setSurgeryForm({...surgeryForm, patientName: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="procedure">{t('surgery.procedure')}</Label>
              <Input 
                id="procedure" 
                placeholder={t('surgery.procedure')}
                value={surgeryForm.procedure}
                onChange={(e) => setSurgeryForm({...surgeryForm, procedure: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">{t('surgery.date')}</Label>
                <Input 
                  id="date" 
                  type="date"
                  value={surgeryForm.date}
                  onChange={(e) => setSurgeryForm({...surgeryForm, date: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="time">{t('surgery.time')}</Label>
                <Input 
                  id="time" 
                  type="time"
                  value={surgeryForm.time}
                  onChange={(e) => setSurgeryForm({...surgeryForm, time: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="surgeon">{t('surgery.surgeon')}</Label>
                <Input 
                  id="surgeon" 
                  placeholder={t('surgery.surgeon')}
                  value={surgeryForm.surgeon}
                  onChange={(e) => setSurgeryForm({...surgeryForm, surgeon: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="operating-room">{t('surgery.operatingRoom')}</Label>
                <Select value={surgeryForm.operatingRoom} onValueChange={(value) => setSurgeryForm({...surgeryForm, operatingRoom: value})}>
                  <SelectTrigger id="operating-room">
                    <SelectValue placeholder={t('surgery.selectRoom')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="OR-1">OR-1</SelectItem>
                    <SelectItem value="OR-2">OR-2</SelectItem>
                    <SelectItem value="OR-3">OR-3</SelectItem>
                    <SelectItem value="OR-4">OR-4</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="anesthesia">{t('surgery.anesthesiaType')}</Label>
                <Select value={surgeryForm.anesthesiaType} onValueChange={(value) => setSurgeryForm({...surgeryForm, anesthesiaType: value})}>
                  <SelectTrigger id="anesthesia">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">{t('surgery.general')}</SelectItem>
                    <SelectItem value="local">{t('surgery.local')}</SelectItem>
                    <SelectItem value="spinal">{t('surgery.spinal')}</SelectItem>
                    <SelectItem value="epidural">{t('surgery.epidural')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="duration">{t('surgery.duration')}</Label>
                <Input 
                  id="duration" 
                  placeholder="2h 30m"
                  value={surgeryForm.duration}
                  onChange={(e) => setSurgeryForm({...surgeryForm, duration: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">{t('surgery.notes')}</Label>
              <Textarea 
                id="notes" 
                rows={3}
                placeholder={t('surgery.notes')}
                value={surgeryForm.notes}
                onChange={(e) => setSurgeryForm({...surgeryForm, notes: e.target.value})}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsScheduleSurgeryDialogOpen(false)}>
              {t('common.cancel')}
            </Button>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600" onClick={() => {
              console.log('Schedule Surgery:', surgeryForm);
              setIsScheduleSurgeryDialogOpen(false);
              setSurgeryForm({
                patientId: "",
                patientName: "",
                procedure: "",
                date: "",
                time: "",
                surgeon: "",
                operatingRoom: "",
                anesthesiaType: "general",
                duration: "",
                notes: ""
              });
            }}>
              {t('common.schedule')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
