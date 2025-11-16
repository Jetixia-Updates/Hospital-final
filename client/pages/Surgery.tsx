import Layout from "@/components/Layout";
import OperatingRoomManagement from "@/components/OperatingRoomManagement";
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
  Settings,
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
import { toast } from "@/hooks/use-toast";

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
    scheduled: { bg: "bg-blue-50", badge: t('surgery.scheduled'), color: "text-blue-700", borderColor: "border-blue-200" },
    "in-progress": {
      bg: "bg-green-50",
      badge: t('surgery.inProgress'),
      color: "text-green-700",
      borderColor: "border-green-200"
    },
    completed: { bg: "bg-slate-50", badge: t('surgery.completed'), color: "text-slate-700", borderColor: "border-slate-200" },
    cancelled: { bg: "bg-red-50", badge: t('surgery.cancelled'), color: "text-red-700", borderColor: "border-red-200" },
  };

  const config = statusConfig[status];

  return (
    <div className={`${config.bg} rounded-lg border ${config.borderColor} p-5 hover:shadow-lg transition-all`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-bold text-slate-900 truncate">{patientName}</h3>
          <p className="text-xs text-slate-500 mt-0.5">#{id}</p>
        </div>
        <Badge className={`${config.bg} ${config.color} border-0 text-xs whitespace-nowrap mr-2`}>
          {config.badge}
        </Badge>
      </div>

      <h4 className="text-sm font-semibold text-slate-800 mb-4 line-clamp-2 min-h-[2.5rem]">{procedure}</h4>

      <div className="space-y-2.5 text-sm text-slate-600 mb-4">
        <div className="flex items-center justify-between gap-2">
          <span className="flex items-center gap-2 text-xs">
            <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
            <span>{date}</span>
          </span>
          <span className="font-semibold text-slate-900 text-xs">{time}</span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="flex items-center gap-2 text-xs">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
            <span>{t('surgery.operatingRoom')}</span>
          </span>
          <span className="font-semibold text-slate-900 text-xs">{operatingRoom}</span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="flex items-center gap-2 text-xs">
            <Stethoscope className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate">{surgeon}</span>
          </span>
        </div>
        <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-200">
          <span className="text-xs">{t('surgery.anesthesia')}</span>
          <span className="font-semibold text-slate-900 text-xs">{anesthesia}</span>
        </div>
      </div>

      <button className="w-full bg-white hover:bg-blue-50 text-blue-700 border border-blue-200 font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm">
        <span>{t('common.viewDetails')}</span>
        <ArrowRight className="w-4 h-4" />
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
      bg: "bg-green-100",
      badge: t('surgery.available'),
      borderColor: "border-green-200"
    },
    "in-use": { 
      color: "text-blue-700", 
      bg: "bg-blue-100", 
      badge: t('surgery.inUse'),
      borderColor: "border-blue-200"
    },
    maintenance: {
      color: "text-orange-700",
      bg: "bg-orange-100",
      badge: t('rooms.maintenance'),
      borderColor: "border-orange-200"
    },
  };

  const config = statusConfig[status];

  return (
    <div className={`bg-white rounded-lg border ${config.borderColor} p-4 hover:shadow-md transition-shadow`}>
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-base font-bold text-slate-900">{room}</h3>
        <Badge className={`${config.bg} ${config.color} border-0 text-xs whitespace-nowrap`}>
          {config.badge}
        </Badge>
      </div>

      {currentSurgery && (
        <div className="mb-3 pb-3 border-b border-slate-200">
          <p className="text-[10px] text-slate-500 uppercase tracking-wide mb-1 font-semibold">
            {t('surgery.currentlyInUse')}
          </p>
          <p className="text-sm font-medium text-slate-900 line-clamp-2">{currentSurgery}</p>
        </div>
      )}

      {nextSurgery && (
        <div>
          <p className="text-[10px] text-slate-500 uppercase tracking-wide mb-1 font-semibold">
            {t('surgery.nextSurgery')}
          </p>
          <p className="text-sm font-medium text-slate-900 line-clamp-2">{nextSurgery}</p>
        </div>
      )}

      {status === "available" && !currentSurgery && !nextSurgery && (
        <p className="text-slate-500 text-sm text-center py-2">{t('surgery.noSurgeriesScheduled')}</p>
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
  const [showORManagement, setShowORManagement] = useState(false);
  const [isAddRoomDialogOpen, setIsAddRoomDialogOpen] = useState(false);
  const [isAddTeamMemberDialogOpen, setIsAddTeamMemberDialogOpen] = useState(false);
  const [isAddCareStaffDialogOpen, setIsAddCareStaffDialogOpen] = useState(false);
  const [isAddEquipmentDialogOpen, setIsAddEquipmentDialogOpen] = useState(false);
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

  const handleORManagementComplete = (data: any) => {
    console.log("Operating Room Setup:", data);
    toast({
      title: t('common.success'),
      description: t('surgery.or.confirmSetup'),
    });
    setShowORManagement(false);
  };

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
      {showORManagement && (
        <OperatingRoomManagement
          onClose={() => setShowORManagement(false)}
          onComplete={handleORManagementComplete}
        />
      )}
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-2">
                  {t('navigation.surgery')}
                </h1>
                <p className="text-base lg:text-lg text-slate-600">
                  {t('surgery.managementSystem')}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-5 py-2.5 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300" 
                  onClick={() => setShowORManagement(true)}
                >
                  <Settings className="w-5 h-5" />
                  <span>{t('surgery.or.management')}</span>
                </Button>
                <Button 
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-5 py-2.5 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300" 
                  onClick={() => setIsScheduleSurgeryDialogOpen(true)}
                >
                  <Plus className="w-5 h-5" />
                  <span>{t('surgery.scheduleSurgery')}</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Main Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
            <Card className="bg-gradient-to-br from-blue-500 to-cyan-600 border-0 shadow-lg hover:shadow-xl transition-shadow">
              <div className="p-5 text-white">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-11 h-11 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <Badge className="bg-white/20 text-white border-0 text-xs">{t('surgery.today')}</Badge>
                </div>
                <p className="text-xl font-bold mb-1">{stats.scheduled}</p>
                <p className="text-sm text-blue-100">{t('surgery.scheduledSurgeries')}</p>
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-green-500 to-emerald-600 border-0 shadow-lg hover:shadow-xl transition-shadow">
              <div className="p-5 text-white">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-11 h-11 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                    <Activity className="w-5 h-5 animate-pulse" />
                  </div>
                  <Badge className="bg-white/20 text-white border-0 text-xs animate-pulse">{t('surgery.live')}</Badge>
                </div>
                <p className="text-xl font-bold mb-1">{stats.inProgress}</p>
                <p className="text-sm text-green-100">{t('surgery.inProgress')}</p>
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-purple-500 to-pink-600 border-0 shadow-lg hover:shadow-xl transition-shadow">
              <div className="p-5 text-white">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-11 h-11 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <Badge className="bg-white/20 text-white border-0 text-xs">✓</Badge>
                </div>
                <p className="text-xl font-bold mb-1">{stats.completed}</p>
                <p className="text-sm text-purple-100">{t('surgery.completedToday')}</p>
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-orange-500 to-red-600 border-0 shadow-lg hover:shadow-xl transition-shadow">
              <div className="p-5 text-white">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-11 h-11 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <Badge className="bg-white/20 text-white border-0 text-xs">
                    {operatingRooms.filter(r => r.status === "in-use").length} {t('surgery.active')}
                  </Badge>
                </div>
                <p className="text-xl font-bold mb-1">{operatingRooms.length}</p>
                <p className="text-sm text-orange-100">{t('surgery.operatingRooms')}</p>
              </div>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="bg-white border border-slate-200 p-1 rounded-lg shadow-sm w-full flex-wrap h-auto gap-1">
              <TabsTrigger value="overview" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-md px-4 py-2 text-sm flex-1 min-w-[140px]">
                <BarChart3 className="w-4 h-4 ml-2" />
                <span>{t('surgery.overview')}</span>
              </TabsTrigger>
              <TabsTrigger value="surgeries" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-md px-4 py-2 text-sm flex-1 min-w-[140px]">
                <Scissors className="w-4 h-4 ml-2" />
                <span>{t('surgery.surgeries')}</span>
              </TabsTrigger>
              <TabsTrigger value="rooms" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-md px-4 py-2 text-sm flex-1 min-w-[140px]">
                <Building2 className="w-4 h-4 ml-2" />
                <span>{t('surgery.rooms')}</span>
              </TabsTrigger>
              <TabsTrigger value="team" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-md px-4 py-2 text-sm flex-1 min-w-[140px]">
                <Users className="w-4 h-4 ml-2" />
                <span>{t('surgery.teamTab')}</span>
              </TabsTrigger>
              <TabsTrigger value="care" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-md px-4 py-2 text-sm flex-1 min-w-[140px]">
                <Heart className="w-4 h-4 ml-2" />
                <span>{t('surgery.careTab')}</span>
              </TabsTrigger>
              <TabsTrigger value="equipment" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-md px-4 py-2 text-sm flex-1 min-w-[140px]">
                <Package className="w-4 h-4 ml-2" />
                <span>{t('surgery.equipmentTab')}</span>
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {/* Surgery Statistics */}
              <Card className="bg-white border-slate-200 shadow-lg">
                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-5 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                    <span>{t('surgery.surgeryStatistics')}</span>
                  </h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {surgeryStats.map((stat, index) => (
                      <div key={index} className="bg-slate-50 rounded-lg p-4 border border-slate-200 hover:border-blue-300 transition-colors">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <p className="font-bold text-slate-900 text-base">{stat.type}</p>
                            <p className="text-xs text-slate-500 mt-0.5">{stat.typeEn}</p>
                          </div>
                          <Badge className="bg-green-100 text-green-700 border-0 text-xs whitespace-nowrap">
                            {stat.successRate}% {t('surgery.successRate')}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-3 text-sm">
                          <div className="text-center">
                            <p className="text-slate-600 mb-1 text-xs">{t('surgery.operationsCount')}</p>
                            <p className="text-xl font-bold text-blue-600">{stat.count}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-slate-600 mb-1 text-xs">{t('surgery.avgDuration')}</p>
                            <p className="text-xl font-bold text-purple-600">{stat.avgDuration} {t('surgery.hours')}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-slate-600 mb-1 text-xs">{t('surgery.revenue')}</p>
                            <p className="text-lg font-bold text-green-600">{(stat.revenue / 1000000).toFixed(1)}M</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Operating Rooms Status */}
              <Card className="bg-white border-slate-200 shadow-lg">
                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-5 flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-blue-600" />
                    <span>{t('surgery.operatingRoomsStatus')}</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
              <Card className="bg-white border-slate-200 shadow-sm">
                <div className="p-4">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1 relative">
                      <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        placeholder={t('common.search')}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pr-10 pl-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      />
                    </div>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm min-w-[180px]"
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
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {filteredSurgeries.map((surgery, index) => (
                  <SurgeryCard key={index} {...surgery} />
                ))}
              </div>

              {filteredSurgeries.length === 0 && (
                <Card className="bg-slate-50 border-slate-200">
                  <div className="p-12 text-center">
                    <Scissors className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                    <p className="text-slate-600 font-medium">{t('surgery.noSurgeriesFound')}</p>
                  </div>
                </Card>
              )}
            </TabsContent>

            {/* Rooms Tab */}
            <TabsContent value="rooms" className="space-y-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-900">{t('surgery.operatingRooms')}</h3>
                <Button
                  onClick={() => setIsAddRoomDialogOpen(true)}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                >
                  <Plus className="w-4 h-4" />
                  {t('common.add')}
                </Button>
              </div>
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
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-900">{t('surgery.teamTab')}</h3>
                <Button
                  onClick={() => setIsAddTeamMemberDialogOpen(true)}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                >
                  <Plus className="w-4 h-4" />
                  {t('common.add')}
                </Button>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {surgicalTeam.map((member) => (
                  <Card key={member.id} className="bg-white border-slate-200 shadow-lg hover:shadow-xl transition-shadow">
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-md flex-shrink-0">
                            {member.name.split(' ')[1].charAt(0)}
                          </div>
                          <div className="min-w-0">
                            <h3 className="font-bold text-slate-900 text-base truncate">{member.name}</h3>
                            <p className="text-xs text-slate-600 mt-0.5">{member.role}</p>
                          </div>
                        </div>
                        <Badge className={
                          member.availability === "متاح" 
                            ? "bg-green-100 text-green-700 border-0 text-xs whitespace-nowrap" 
                            : "bg-orange-100 text-orange-700 border-0 text-xs whitespace-nowrap"
                        }>
                          {member.availability}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-3 gap-3 mb-4">
                        <div className="text-center p-2.5 bg-blue-50 rounded-lg border border-blue-100">
                          <p className="text-[10px] text-blue-600 mb-1 font-semibold">{t('surgery.experience')}</p>
                          <p className="text-xl font-bold text-blue-700">{member.experience}</p>
                          <p className="text-[10px] text-blue-600">{t('surgery.year')}</p>
                        </div>
                        <div className="text-center p-2.5 bg-green-50 rounded-lg border border-green-100">
                          <p className="text-[10px] text-green-600 mb-1 font-semibold">{t('surgery.todayOperations')}</p>
                          <p className="text-xl font-bold text-green-700">{member.surgeriesToday}</p>
                          <p className="text-[10px] text-green-600">{t('surgery.operation')}</p>
                        </div>
                        <div className="text-center p-2.5 bg-purple-50 rounded-lg border border-purple-100">
                          <p className="text-[10px] text-purple-600 mb-1 font-semibold">{t('surgery.total')}</p>
                          <p className="text-xl font-bold text-purple-700">{member.totalSurgeries}</p>
                          <p className="text-[10px] text-purple-600">{t('surgery.operation')}</p>
                        </div>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-between py-2 border-t border-slate-200">
                          <span className="text-slate-600 text-xs">{t('surgery.specialization')}</span>
                          <span className="font-semibold text-slate-900 text-xs">{member.specialization}</span>
                        </div>
                        <div className="flex items-center justify-between py-2 border-t border-slate-200">
                          <span className="text-slate-600 text-xs">{t('surgery.nextOperation')}</span>
                          <span className="font-semibold text-slate-900 text-xs">{member.nextSurgery}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Care Tab */}
            <TabsContent value="care" className="space-y-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-900">{t('surgery.careTab')}</h3>
                <Button
                  onClick={() => setIsAddCareStaffDialogOpen(true)}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                >
                  <Plus className="w-4 h-4" />
                  {t('common.add')}
                </Button>
              </div>
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
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-900">{t('surgery.equipmentTab')}</h3>
                <Button
                  onClick={() => setIsAddEquipmentDialogOpen(true)}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                >
                  <Plus className="w-4 h-4" />
                  {t('common.add')}
                </Button>
              </div>
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

      {/* Add Operating Room Dialog */}
      <Dialog open={isAddRoomDialogOpen} onOpenChange={setIsAddRoomDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-blue-700 flex items-center gap-2">
              <Building2 className="w-6 h-6" />
              إضافة غرفة عمليات جديدة
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="room-name">اسم الغرفة</Label>
                <Input id="room-name" placeholder="غرفة العمليات 5" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="room-number">رقم الغرفة</Label>
                <Input id="room-number" placeholder="OR-5" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="building">المبنى</Label>
                <Select>
                  <SelectTrigger id="building">
                    <SelectValue placeholder="اختر المبنى" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="main">المبنى الرئيسي</SelectItem>
                    <SelectItem value="north">المبنى الشمالي</SelectItem>
                    <SelectItem value="south">المبنى الجنوبي</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="floor">الطابق</Label>
                <Input id="floor" type="number" placeholder="3" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="capacity">السعة</Label>
              <Input id="capacity" type="number" placeholder="10" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="room-notes">ملاحظات</Label>
              <Textarea id="room-notes" rows={3} placeholder="معلومات إضافية عن الغرفة..." />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddRoomDialogOpen(false)}>
              {t('common.cancel')}
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => {
              toast({
                title: "تم الإضافة بنجاح",
                description: "تم إضافة غرفة العمليات الجديدة",
              });
              setIsAddRoomDialogOpen(false);
            }}>
              {t('common.add')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Team Member Dialog */}
      <Dialog open={isAddTeamMemberDialogOpen} onOpenChange={setIsAddTeamMemberDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-blue-700 flex items-center gap-2">
              <Users className="w-6 h-6" />
              إضافة عضو للفريق الجراحي
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="member-name">الاسم الكامل</Label>
                <Input id="member-name" placeholder="د. أحمد محمد" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="member-role">الدور</Label>
                <Select>
                  <SelectTrigger id="member-role">
                    <SelectValue placeholder="اختر الدور" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="surgeon">جراح رئيسي</SelectItem>
                    <SelectItem value="assistant">جراح مساعد</SelectItem>
                    <SelectItem value="anesthesiologist">طبيب تخدير</SelectItem>
                    <SelectItem value="nurse">ممرض جراحة</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="specialization">التخصص</Label>
                <Input id="specialization" placeholder="جراحة القلب" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="experience">سنوات الخبرة</Label>
                <Input id="experience" type="number" placeholder="10" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="license">رقم الرخصة</Label>
                <Input id="license" placeholder="MED-12345" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">رقم الهاتف</Label>
                <Input id="phone" placeholder="+966 50 123 4567" />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddTeamMemberDialogOpen(false)}>
              {t('common.cancel')}
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => {
              toast({
                title: "تم الإضافة بنجاح",
                description: "تم إضافة عضو جديد للفريق الجراحي",
              });
              setIsAddTeamMemberDialogOpen(false);
            }}>
              {t('common.add')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Care Staff Dialog */}
      <Dialog open={isAddCareStaffDialogOpen} onOpenChange={setIsAddCareStaffDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-blue-700 flex items-center gap-2">
              <Heart className="w-6 h-6" />
              إضافة طاقم رعاية طبية
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="care-name">الاسم الكامل</Label>
                <Input id="care-name" placeholder="ممرض/ة فاطمة أحمد" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="care-role">الدور</Label>
                <Select>
                  <SelectTrigger id="care-role">
                    <SelectValue placeholder="اختر الدور" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="icu">ممرض عناية مركزة</SelectItem>
                    <SelectItem value="recovery">ممرض إفاقة</SelectItem>
                    <SelectItem value="assistant">مساعد رعاية</SelectItem>
                    <SelectItem value="physio">أخصائي علاج طبيعي</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="shift">الدوام</Label>
                <Select>
                  <SelectTrigger id="shift">
                    <SelectValue placeholder="اختر الدوام" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="morning">صباحي (7 ص - 3 م)</SelectItem>
                    <SelectItem value="evening">مسائي (3 م - 11 م)</SelectItem>
                    <SelectItem value="night">ليلي (11 م - 7 ص)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="care-experience">سنوات الخبرة</Label>
                <Input id="care-experience" type="number" placeholder="5" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="care-phone">رقم الهاتف</Label>
              <Input id="care-phone" placeholder="+966 50 123 4567" />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddCareStaffDialogOpen(false)}>
              {t('common.cancel')}
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => {
              toast({
                title: "تم الإضافة بنجاح",
                description: "تم إضافة طاقم الرعاية الطبية",
              });
              setIsAddCareStaffDialogOpen(false);
            }}>
              {t('common.add')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Equipment Dialog */}
      <Dialog open={isAddEquipmentDialogOpen} onOpenChange={setIsAddEquipmentDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-blue-700 flex items-center gap-2">
              <Package className="w-6 h-6" />
              إضافة معدات طبية
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="equipment-name">اسم المعدة</Label>
                <Input id="equipment-name" placeholder="جهاز التخدير" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="equipment-name-en">الاسم بالإنجليزية</Label>
                <Input id="equipment-name-en" placeholder="Anesthesia Machine" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="equipment-category">الفئة</Label>
                <Select>
                  <SelectTrigger id="equipment-category">
                    <SelectValue placeholder="اختر الفئة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="anesthesia">أجهزة تخدير</SelectItem>
                    <SelectItem value="monitoring">أجهزة مراقبة</SelectItem>
                    <SelectItem value="surgical">أدوات جراحية</SelectItem>
                    <SelectItem value="imaging">أجهزة تصوير</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="equipment-room">الغرفة</Label>
                <Select>
                  <SelectTrigger id="equipment-room">
                    <SelectValue placeholder="اختر الغرفة" />
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
                <Label htmlFor="serial-number">الرقم التسلسلي</Label>
                <Input id="serial-number" placeholder="SN-2024-001" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="purchase-date">تاريخ الشراء</Label>
                <Input id="purchase-date" type="date" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="last-maintenance">آخر صيانة</Label>
                <Input id="last-maintenance" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="next-maintenance">الصيانة القادمة</Label>
                <Input id="next-maintenance" type="date" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="equipment-notes">ملاحظات</Label>
              <Textarea id="equipment-notes" rows={3} placeholder="معلومات إضافية..." />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddEquipmentDialogOpen(false)}>
              {t('common.cancel')}
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => {
              toast({
                title: "تم الإضافة بنجاح",
                description: "تم إضافة المعدات الطبية الجديدة",
              });
              setIsAddEquipmentDialogOpen(false);
            }}>
              {t('common.add')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
