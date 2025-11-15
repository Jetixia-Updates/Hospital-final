import Layout from "@/components/Layout";
import {
  AlertCircle,
  Activity,
  Users,
  Clock,
  Bed,
  Ambulance,
  UserCheck,
  TrendingUp,
  Eye,
  Edit,
  Plus,
  Phone,
  MapPin,
  Heart,
  Thermometer,
  Wind,
  Droplets,
  CheckCircle,
  XCircle,
  ArrowRight,
  FileText,
  BarChart3,
  Calendar,
  Search,
  Filter,
  Download,
  Bell,
  ShieldAlert,
  Siren,
  Stethoscope,
  Pill,
  Syringe,
  Radio
} from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function Emergency() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddCaseDialogOpen, setIsAddCaseDialogOpen] = useState(false);
  
  // Form state for new emergency case
  const [newCaseForm, setNewCaseForm] = useState({
    patientId: "",
    patientName: "",
    age: "",
    gender: "male",
    complaint: "",
    triageLevel: "yellow",
    vitalSigns: {
      bp: "",
      hr: "",
      temp: "",
      spo2: "",
      rr: ""
    },
    notes: ""
  });

  // Statistics
  const statistics = {
    activeCases: 23,
    waitingPatients: 8,
    criticalCases: 3,
    totalToday: 67,
    avgWaitTime: 18,
    bedOccupancy: 85,
    availableBeds: 6,
    totalBeds: 40
  };

  // Active Emergency Cases
  const activeCases = [
    {
      id: "EM-2024-001",
      patientId: "P001",
      patientName: "أحمد محمد",
      age: 45,
      gender: "male",
      complaint: "ألم في الصدر",
      arrivalTime: "14:30",
      triageLevel: "red",
      status: "treating",
      assignedTo: "د. خالد العمري",
      waitTime: 0,
      vitalSigns: {
        bp: "160/95",
        hr: 110,
        temp: 37.2,
        spo2: 92,
        rr: 22
      }
    },
    {
      id: "EM-2024-002",
      patientId: "P045",
      patientName: "فاطمة حسن",
      age: 32,
      gender: "female",
      complaint: "كسر في الذراع",
      arrivalTime: "14:45",
      triageLevel: "yellow",
      status: "triaged",
      assignedTo: "د. سارة الأحمد",
      waitTime: 15,
      vitalSigns: {
        bp: "120/80",
        hr: 88,
        temp: 36.8,
        spo2: 98,
        rr: 18
      }
    },
    {
      id: "EM-2024-003",
      patientId: "P089",
      patientName: "عمر السالم",
      age: 28,
      gender: "male",
      complaint: "حادث سير - إصابات متعددة",
      arrivalTime: "14:20",
      triageLevel: "red",
      status: "treating",
      assignedTo: "د. محمد الشهري",
      waitTime: 0,
      vitalSigns: {
        bp: "90/60",
        hr: 125,
        temp: 36.5,
        spo2: 89,
        rr: 26
      }
    },
    {
      id: "EM-2024-004",
      patientId: "P123",
      patientName: "ليلى يوسف",
      age: 55,
      gender: "female",
      complaint: "صداع حاد ودوار",
      arrivalTime: "15:00",
      triageLevel: "orange",
      status: "triaged",
      assignedTo: "د. نورة القحطاني",
      waitTime: 10,
      vitalSigns: {
        bp: "150/90",
        hr: 95,
        temp: 37.5,
        spo2: 96,
        rr: 20
      }
    },
    {
      id: "EM-2024-005",
      patientId: "P156",
      patientName: "سعد المطيري",
      age: 19,
      gender: "male",
      complaint: "التواء في الكاحل",
      arrivalTime: "15:10",
      triageLevel: "green",
      status: "arrived",
      assignedTo: "-",
      waitTime: 20,
      vitalSigns: {
        bp: "118/75",
        hr: 78,
        temp: 36.7,
        spo2: 99,
        rr: 16
      }
    }
  ];

  // Emergency Beds
  const emergencyBeds = [
    { id: "B01", type: "resuscitation", status: "occupied", patient: "EM-2024-001" },
    { id: "B02", type: "resuscitation", status: "occupied", patient: "EM-2024-003" },
    { id: "B03", type: "resuscitation", status: "available", patient: null },
    { id: "B04", type: "trauma", status: "occupied", patient: "EM-2024-002" },
    { id: "B05", type: "trauma", status: "available", patient: null },
    { id: "B06", type: "trauma", status: "available", patient: null },
    { id: "B07", type: "observation", status: "occupied", patient: "EM-2024-004" },
    { id: "B08", type: "observation", status: "available", patient: null },
    { id: "B09", type: "observation", status: "cleaning", patient: null },
    { id: "B10", type: "isolation", status: "available", patient: null }
  ];

  // Emergency Staff
  const emergencyStaff = [
    { id: "S001", name: "د. خالد العمري", role: "doctor", status: "onDuty", shift: "Morning" },
    { id: "S002", name: "د. سارة الأحمد", role: "doctor", status: "onDuty", shift: "Morning" },
    { id: "S003", name: "د. محمد الشهري", role: "doctor", status: "onDuty", shift: "Morning" },
    { id: "S004", name: "د. نورة القحطاني", role: "doctor", status: "break", shift: "Morning" },
    { id: "S005", name: "أحمد حسن", role: "nurse", status: "onDuty", shift: "Morning" },
    { id: "S006", name: "فاطمة السالم", role: "nurse", status: "onDuty", shift: "Morning" },
    { id: "S007", name: "عمر الدوسري", role: "paramedic", status: "onDuty", shift: "Morning" },
    { id: "S008", name: "ليلى المطيري", role: "nurse", status: "onDuty", shift: "Morning" }
  ];

  // Ambulance Fleet
  const ambulances = [
    { id: "AMB-01", status: "available", location: "القسم", crew: 3 },
    { id: "AMB-02", status: "dispatched", location: "طريق الملك فهد", crew: 2, eta: "5 دقائق" },
    { id: "AMB-03", status: "transporting", location: "في الطريق للمستشفى", crew: 2, eta: "8 دقائق" },
    { id: "AMB-04", status: "onScene", location: "حي النخيل", crew: 2 },
    { id: "AMB-05", status: "available", location: "القسم", crew: 3 },
    { id: "AMB-06", status: "atHospital", location: "المستشفى", crew: 2 }
  ];

  // Triage level configuration
  const triageLevelConfig = {
    red: { 
      bg: "bg-red-100", 
      text: "text-red-700", 
      border: "border-red-300",
      badge: "bg-red-600 text-white",
      label: t('emergency.triageColors.red')
    },
    orange: { 
      bg: "bg-orange-100", 
      text: "text-orange-700", 
      border: "border-orange-300",
      badge: "bg-orange-600 text-white",
      label: t('emergency.triageColors.orange')
    },
    yellow: { 
      bg: "bg-yellow-100", 
      text: "text-yellow-700", 
      border: "border-yellow-300",
      badge: "bg-yellow-600 text-white",
      label: t('emergency.triageColors.yellow')
    },
    green: { 
      bg: "bg-green-100", 
      text: "text-green-700", 
      border: "border-green-300",
      badge: "bg-green-600 text-white",
      label: t('emergency.triageColors.green')
    },
    blue: { 
      bg: "bg-blue-100", 
      text: "text-blue-700", 
      border: "border-blue-300",
      badge: "bg-blue-600 text-white",
      label: t('emergency.triageColors.blue')
    }
  };

  const caseStatusConfig = {
    arrived: { bg: "bg-slate-100", text: "text-slate-700", label: t('emergency.caseStatus.arrived') },
    triaged: { bg: "bg-blue-100", text: "text-blue-700", label: t('emergency.caseStatus.triaged') },
    treating: { bg: "bg-purple-100", text: "text-purple-700", label: t('emergency.caseStatus.treating') },
    observation: { bg: "bg-indigo-100", text: "text-indigo-700", label: t('emergency.caseStatus.observation') },
    admitted: { bg: "bg-green-100", text: "text-green-700", label: t('emergency.caseStatus.admitted') },
    discharged: { bg: "bg-emerald-100", text: "text-emerald-700", label: t('emergency.caseStatus.discharged') },
    transferred: { bg: "bg-cyan-100", text: "text-cyan-700", label: t('emergency.caseStatus.transferred') }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
        <div className="max-w-7xl mx-auto p-6 space-y-6">
          {/* Header */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-red-200 shadow-2xl p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-14 h-14 bg-gradient-to-br from-red-600 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <AlertCircle className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                      {t('emergency.title')}
                    </h1>
                    <p className="text-slate-600 text-lg">{t('emergency.subtitle')}</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="gap-2">
                  <Download className="w-4 h-4" />
                  {t('common.export')}
                </Button>
                <Button 
                  className="gap-2 bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-lg"
                  onClick={() => setIsAddCaseDialogOpen(true)}
                >
                  <Plus className="w-4 h-4" />
                  {t('emergency.addCase')}
                </Button>
              </div>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-gradient-to-br from-red-500 to-pink-600 border-0 shadow-xl">
              <CardContent className="p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <AlertCircle className="w-6 h-6" />
                  </div>
                  <Badge className="bg-white/20 text-white border-0">{t('emergency.now')}</Badge>
                </div>
                <p className="text-sm text-red-100 mb-1">{t('emergency.activeCases')}</p>
                <p className="text-3xl font-bold">{statistics.activeCases}</p>
                <p className="text-xs text-red-100 mt-2">{statistics.criticalCases} {t('emergency.criticalCases')}</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-500 to-amber-600 border-0 shadow-xl">
              <CardContent className="p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6" />
                  </div>
                  <Badge className="bg-white/20 text-white border-0">{t('emergency.today')}</Badge>
                </div>
                <p className="text-sm text-orange-100 mb-1">{t('emergency.waitingPatients')}</p>
                <p className="text-3xl font-bold">{statistics.waitingPatients}</p>
                <p className="text-xs text-orange-100 mt-2">{statistics.totalToday} {t('emergency.totalToday')}</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-yellow-500 to-amber-600 border-0 shadow-xl">
              <CardContent className="p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6" />
                  </div>
                  <Badge className="bg-white/20 text-white border-0">{t('emergency.avgWaitTime')}</Badge>
                </div>
                <p className="text-sm text-yellow-100 mb-1">{t('emergency.waitingTime')}</p>
                <p className="text-3xl font-bold">{statistics.avgWaitTime}</p>
                <p className="text-xs text-yellow-100 mt-2">{t('emergency.minutes')}</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-500 to-emerald-600 border-0 shadow-xl">
              <CardContent className="p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <Bed className="w-6 h-6" />
                  </div>
                  <Badge className="bg-white/20 text-white border-0">{statistics.bedOccupancy}%</Badge>
                </div>
                <p className="text-sm text-green-100 mb-1">{t('emergency.availableBeds')}</p>
                <p className="text-3xl font-bold">{statistics.availableBeds}/{statistics.totalBeds}</p>
                <p className="text-xs text-green-100 mt-2">{t('emergency.bedOccupancy')}</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="bg-white/80 backdrop-blur-md border border-slate-200 shadow-lg p-2">
              <TabsTrigger value="overview" className="gap-2">
                <Activity className="w-4 h-4" />
                {t('emergency.overview')}
              </TabsTrigger>
              <TabsTrigger value="triage" className="gap-2">
                <ShieldAlert className="w-4 h-4" />
                {t('emergency.triage')}
              </TabsTrigger>
              <TabsTrigger value="cases" className="gap-2">
                <FileText className="w-4 h-4" />
                {t('emergency.activeCasesTab')}
              </TabsTrigger>
              <TabsTrigger value="beds" className="gap-2">
                <Bed className="w-4 h-4" />
                {t('emergency.beds')}
              </TabsTrigger>
              <TabsTrigger value="staff" className="gap-2">
                <UserCheck className="w-4 h-4" />
                {t('emergency.staff')}
              </TabsTrigger>
              <TabsTrigger value="ambulance" className="gap-2">
                <Ambulance className="w-4 h-4" />
                {t('emergency.ambulance')}
              </TabsTrigger>
              <TabsTrigger value="analytics" className="gap-2">
                <BarChart3 className="w-4 h-4" />
                {t('emergency.analytics')}
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Critical Cases */}
                <Card className="bg-white/80 backdrop-blur-md border-red-200 shadow-xl">
                  <CardHeader className="bg-gradient-to-r from-red-500 to-pink-600">
                    <CardTitle className="flex items-center gap-2 text-white">
                      <AlertCircle className="w-5 h-5" />
                      {t('emergency.criticalCases')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-3">
                      {activeCases.filter(c => c.triageLevel === 'red').map((case_) => (
                        <div key={case_.id} className={`p-4 rounded-xl border-2 ${triageLevelConfig[case_.triageLevel].border} ${triageLevelConfig[case_.triageLevel].bg}`}>
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <h3 className="font-bold text-slate-900">{case_.patientName}</h3>
                              <p className="text-sm text-slate-600">{case_.id} • {case_.complaint}</p>
                            </div>
                            <Badge className={triageLevelConfig[case_.triageLevel].badge}>
                              {triageLevelConfig[case_.triageLevel].label}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-2 mt-3">
                            <div className="text-xs">
                              <span className="text-slate-600">{t('emergency.assignedTo')}:</span>
                              <p className="font-semibold">{case_.assignedTo}</p>
                            </div>
                            <div className="text-xs text-right">
                              <span className="text-slate-600">{t('emergency.arrivalTime')}:</span>
                              <p className="font-semibold">{case_.arrivalTime}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Active Ambulances */}
                <Card className="bg-white/80 backdrop-blur-md border-orange-200 shadow-xl">
                  <CardHeader className="bg-gradient-to-r from-orange-500 to-amber-600">
                    <CardTitle className="flex items-center gap-2 text-white">
                      <Ambulance className="w-5 h-5" />
                      {t('emergency.activeAmbulances')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-3">
                      {ambulances.filter(a => a.status !== 'available').map((amb) => (
                        <div key={amb.id} className="p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl border border-orange-200">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Siren className="w-5 h-5 text-orange-600" />
                              <h3 className="font-bold text-slate-900">{amb.id}</h3>
                            </div>
                            <Badge className="bg-orange-600 text-white border-0">
                              {t(`emergency.ambulanceStatus.${amb.status}`)}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-slate-600 mb-1">
                            <MapPin className="w-4 h-4" />
                            {amb.location}
                          </div>
                          {amb.eta && (
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                              <Clock className="w-4 h-4" />
                              {t('emergency.eta')}: {amb.eta}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Active Cases Tab */}
            <TabsContent value="cases" className="space-y-6">
              <Card className="bg-white/80 backdrop-blur-md border-slate-200 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-red-600" />
                      {t('emergency.activeCasesTab')}
                    </span>
                    <div className="flex gap-2">
                      <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                        <Input
                          placeholder={t('common.search')}
                          className="pl-9 w-64"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activeCases.map((case_) => (
                      <div key={case_.id} className={`p-5 rounded-xl border-2 ${triageLevelConfig[case_.triageLevel].border} ${triageLevelConfig[case_.triageLevel].bg}`}>
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-bold text-slate-900 text-lg">{case_.patientName}</h3>
                              <Badge className={triageLevelConfig[case_.triageLevel].badge}>
                                {triageLevelConfig[case_.triageLevel].label}
                              </Badge>
                              <Badge className={caseStatusConfig[case_.status as keyof typeof caseStatusConfig].bg + " " + caseStatusConfig[case_.status as keyof typeof caseStatusConfig].text}>
                                {caseStatusConfig[case_.status as keyof typeof caseStatusConfig].label}
                              </Badge>
                            </div>
                            <p className="text-sm text-slate-600 mb-1">{case_.id} • {case_.patientId}</p>
                            <p className="text-slate-700 font-medium">{case_.complaint}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="gap-1">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline" className="gap-1">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        <div className="grid grid-cols-5 gap-4 p-4 bg-white/60 rounded-lg">
                          <div>
                            <p className="text-xs text-slate-600 mb-1">{t('emergency.age')}</p>
                            <p className="font-semibold">{case_.age} {t('emergency.years')}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-600 mb-1">{t('emergency.gender')}</p>
                            <p className="font-semibold">{t(`emergency.${case_.gender}`)}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-600 mb-1">{t('emergency.arrivalTime')}</p>
                            <p className="font-semibold">{case_.arrivalTime}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-600 mb-1">{t('emergency.assignedTo')}</p>
                            <p className="font-semibold text-sm">{case_.assignedTo}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-600 mb-1">{t('emergency.waitingTime')}</p>
                            <p className="font-semibold">{case_.waitTime} {t('emergency.minutes')}</p>
                          </div>
                        </div>

                        <div className="mt-4 p-3 bg-white/60 rounded-lg">
                          <p className="text-xs text-slate-600 mb-2">{t('emergency.vitalSigns')}</p>
                          <div className="grid grid-cols-5 gap-3">
                            <div className="flex items-center gap-2">
                              <Heart className="w-4 h-4 text-red-600" />
                              <div className="text-xs">
                                <p className="font-semibold">{case_.vitalSigns.hr}</p>
                                <p className="text-slate-600">BPM</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Activity className="w-4 h-4 text-blue-600" />
                              <div className="text-xs">
                                <p className="font-semibold">{case_.vitalSigns.bp}</p>
                                <p className="text-slate-600">BP</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Thermometer className="w-4 h-4 text-orange-600" />
                              <div className="text-xs">
                                <p className="font-semibold">{case_.vitalSigns.temp}°C</p>
                                <p className="text-slate-600">Temp</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Droplets className="w-4 h-4 text-cyan-600" />
                              <div className="text-xs">
                                <p className="font-semibold">{case_.vitalSigns.spo2}%</p>
                                <p className="text-slate-600">SpO2</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Wind className="w-4 h-4 text-green-600" />
                              <div className="text-xs">
                                <p className="font-semibold">{case_.vitalSigns.rr}</p>
                                <p className="text-slate-600">RR</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Beds Tab */}
            <TabsContent value="beds" className="space-y-6">
              <Card className="bg-white/80 backdrop-blur-md border-slate-200 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bed className="w-5 h-5 text-green-600" />
                    {t('emergency.beds')} - {statistics.availableBeds} {t('emergency.availableBeds')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {emergencyBeds.map((bed) => (
                      <div
                        key={bed.id}
                        className={`p-4 rounded-xl border-2 ${
                          bed.status === 'occupied' ? 'bg-red-50 border-red-300' :
                          bed.status === 'cleaning' ? 'bg-yellow-50 border-yellow-300' :
                          bed.status === 'maintenance' ? 'bg-orange-50 border-orange-300' :
                          'bg-green-50 border-green-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-bold text-slate-900">{bed.id}</h3>
                          <Bed className={`w-5 h-5 ${
                            bed.status === 'occupied' ? 'text-red-600' :
                            bed.status === 'cleaning' ? 'text-yellow-600' :
                            bed.status === 'maintenance' ? 'text-orange-600' :
                            'text-green-600'
                          }`} />
                        </div>
                        <p className="text-xs text-slate-600 mb-1">{t(`emergency.bedTypes.${bed.type}`)}</p>
                        <Badge className={
                          bed.status === 'occupied' ? 'bg-red-600 text-white' :
                          bed.status === 'cleaning' ? 'bg-yellow-600 text-white' :
                          bed.status === 'maintenance' ? 'bg-orange-600 text-white' :
                          'bg-green-600 text-white'
                        }>
                          {t(`emergency.bedStatus.${bed.status}`)}
                        </Badge>
                        {bed.patient && (
                          <p className="text-xs text-slate-700 mt-2 font-medium">{bed.patient}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Staff Tab */}
            <TabsContent value="staff" className="space-y-6">
              <Card className="bg-white/80 backdrop-blur-md border-slate-200 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UserCheck className="w-5 h-5 text-purple-600" />
                    {t('emergency.staff')} - {emergencyStaff.filter(s => s.status === 'onDuty').length} {t('emergency.onDuty')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {emergencyStaff.map((staff) => (
                      <div key={staff.id} className="p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl border border-purple-200">
                        <div className="flex items-center gap-3 mb-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                            staff.role === 'doctor' ? 'bg-gradient-to-br from-purple-600 to-indigo-600' :
                            staff.role === 'nurse' ? 'bg-gradient-to-br from-blue-600 to-cyan-600' :
                            'bg-gradient-to-br from-green-600 to-emerald-600'
                          }`}>
                            {staff.name.charAt(3)}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-slate-900 text-sm">{staff.name}</h3>
                            <p className="text-xs text-slate-600">{t(`emergency.staffRoles.${staff.role}`)}</p>
                          </div>
                        </div>
                        <Badge className={
                          staff.status === 'onDuty' ? 'bg-green-600 text-white' :
                          staff.status === 'break' ? 'bg-yellow-600 text-white' :
                          'bg-slate-600 text-white'
                        }>
                          {t(`emergency.${staff.status}`)}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Ambulance Tab */}
            <TabsContent value="ambulance" className="space-y-6">
              <Card className="bg-white/80 backdrop-blur-md border-slate-200 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Ambulance className="w-5 h-5 text-orange-600" />
                      {t('emergency.ambulanceFleet')}
                    </span>
                    <Button className="gap-2 bg-gradient-to-r from-orange-600 to-amber-600">
                      <Plus className="w-4 h-4" />
                      {t('emergency.dispatchAmbulance')}
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {ambulances.map((amb) => (
                      <div key={amb.id} className="p-5 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl border-2 border-orange-200">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <Siren className="w-6 h-6 text-orange-600" />
                            <h3 className="font-bold text-slate-900 text-lg">{amb.id}</h3>
                          </div>
                          <Badge className={
                            amb.status === 'available' ? 'bg-green-600 text-white' :
                            amb.status === 'dispatched' || amb.status === 'transporting' ? 'bg-red-600 text-white' :
                            amb.status === 'onScene' ? 'bg-orange-600 text-white' :
                            'bg-blue-600 text-white'
                          }>
                            {t(`emergency.ambulanceStatus.${amb.status}`)}
                          </Badge>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <MapPin className="w-4 h-4" />
                            <span>{amb.location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <Users className="w-4 h-4" />
                            <span>{amb.crew} طاقم</span>
                          </div>
                          {amb.eta && (
                            <div className="flex items-center gap-2 text-sm font-semibold text-orange-700">
                              <Clock className="w-4 h-4" />
                              <span>{t('emergency.eta')}: {amb.eta}</span>
                            </div>
                          )}
                        </div>

                        {amb.status !== 'available' && (
                          <Button className="w-full mt-4 bg-orange-600 hover:bg-orange-700" size="sm">
                            <Phone className="w-4 h-4 mr-2" />
                            {t('patients.contact')}
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-white/80 backdrop-blur-md border-slate-200 shadow-xl">
                  <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600">
                    <CardTitle className="flex items-center gap-2 text-white">
                      <BarChart3 className="w-5 h-5" />
                      {t('emergency.dailyStatistics')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <span className="text-slate-700">{t('emergency.totalToday')}</span>
                        <span className="text-2xl font-bold text-blue-600">{statistics.totalToday}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <span className="text-slate-700">{t('emergency.avgWaitTime')}</span>
                        <span className="text-2xl font-bold text-orange-600">{statistics.avgWaitTime} {t('emergency.minutes')}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <span className="text-slate-700">{t('emergency.bedOccupancy')}</span>
                        <span className="text-2xl font-bold text-green-600">{statistics.bedOccupancy}%</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <span className="text-slate-700">{t('emergency.activeCases')}</span>
                        <span className="text-2xl font-bold text-red-600">{statistics.activeCases}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 backdrop-blur-md border-slate-200 shadow-xl">
                  <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-600">
                    <CardTitle className="flex items-center gap-2 text-white">
                      <TrendingUp className="w-5 h-5" />
                      {t('emergency.triageDistribution')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-full bg-slate-100 rounded-full h-8 flex items-center overflow-hidden">
                          <div className="bg-red-600 h-full flex items-center justify-center text-white text-xs font-bold px-2" style={{width: '15%'}}>
                            15%
                          </div>
                        </div>
                        <span className="text-sm text-slate-600 whitespace-nowrap">{t('emergency.triageColors.red')}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-full bg-slate-100 rounded-full h-8 flex items-center overflow-hidden">
                          <div className="bg-orange-600 h-full flex items-center justify-center text-white text-xs font-bold px-2" style={{width: '25%'}}>
                            25%
                          </div>
                        </div>
                        <span className="text-sm text-slate-600 whitespace-nowrap">{t('emergency.triageColors.orange')}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-full bg-slate-100 rounded-full h-8 flex items-center overflow-hidden">
                          <div className="bg-yellow-600 h-full flex items-center justify-center text-white text-xs font-bold px-2" style={{width: '35%'}}>
                            35%
                          </div>
                        </div>
                        <span className="text-sm text-slate-600 whitespace-nowrap">{t('emergency.triageColors.yellow')}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-full bg-slate-100 rounded-full h-8 flex items-center overflow-hidden">
                          <div className="bg-green-600 h-full flex items-center justify-center text-white text-xs font-bold px-2" style={{width: '20%'}}>
                            20%
                          </div>
                        </div>
                        <span className="text-sm text-slate-600 whitespace-nowrap">{t('emergency.triageColors.green')}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-full bg-slate-100 rounded-full h-8 flex items-center overflow-hidden">
                          <div className="bg-blue-600 h-full flex items-center justify-center text-white text-xs font-bold px-2" style={{width: '5%'}}>
                            5%
                          </div>
                        </div>
                        <span className="text-sm text-slate-600 whitespace-nowrap">{t('emergency.triageColors.blue')}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Add Emergency Case Dialog */}
      <Dialog open={isAddCaseDialogOpen} onOpenChange={setIsAddCaseDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-red-700 flex items-center gap-2">
              <AlertCircle className="w-6 h-6" />
              {t('emergency.newCase')}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            {/* Patient Information */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="patient-id">{t('emergency.patientName')}</Label>
                <Input 
                  id="patient-name" 
                  placeholder={t('emergency.patientName')}
                  value={newCaseForm.patientName}
                  onChange={(e) => setNewCaseForm({...newCaseForm, patientName: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="patient-id">Patient ID</Label>
                <Input 
                  id="patient-id" 
                  placeholder="P001"
                  value={newCaseForm.patientId}
                  onChange={(e) => setNewCaseForm({...newCaseForm, patientId: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age">{t('emergency.age')}</Label>
                <Input 
                  id="age" 
                  type="number"
                  placeholder="45"
                  value={newCaseForm.age}
                  onChange={(e) => setNewCaseForm({...newCaseForm, age: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="gender">{t('emergency.gender')}</Label>
                <Select value={newCaseForm.gender} onValueChange={(value) => setNewCaseForm({...newCaseForm, gender: value})}>
                  <SelectTrigger id="gender">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">{t('emergency.male')}</SelectItem>
                    <SelectItem value="female">{t('emergency.female')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Complaint */}
            <div className="space-y-2">
              <Label htmlFor="complaint">{t('emergency.complaint')}</Label>
              <Textarea 
                id="complaint" 
                rows={2}
                placeholder={t('emergency.complaint')}
                value={newCaseForm.complaint}
                onChange={(e) => setNewCaseForm({...newCaseForm, complaint: e.target.value})}
              />
            </div>

            {/* Triage Level */}
            <div className="space-y-2">
              <Label htmlFor="triage">{t('emergency.triageLevel')}</Label>
              <Select value={newCaseForm.triageLevel} onValueChange={(value) => setNewCaseForm({...newCaseForm, triageLevel: value})}>
                <SelectTrigger id="triage">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="red">{t('emergency.triageColors.red')}</SelectItem>
                  <SelectItem value="orange">{t('emergency.triageColors.orange')}</SelectItem>
                  <SelectItem value="yellow">{t('emergency.triageColors.yellow')}</SelectItem>
                  <SelectItem value="green">{t('emergency.triageColors.green')}</SelectItem>
                  <SelectItem value="blue">{t('emergency.triageColors.blue')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Vital Signs */}
            <div className="space-y-3">
              <Label className="text-lg font-semibold">{t('emergency.vitalSigns')}</Label>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bp" className="text-sm">{t('emergency.bloodPressure')}</Label>
                  <Input 
                    id="bp" 
                    placeholder="120/80"
                    value={newCaseForm.vitalSigns.bp}
                    onChange={(e) => setNewCaseForm({...newCaseForm, vitalSigns: {...newCaseForm.vitalSigns, bp: e.target.value}})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="hr" className="text-sm">{t('emergency.heartRate')}</Label>
                  <Input 
                    id="hr" 
                    type="number"
                    placeholder="80"
                    value={newCaseForm.vitalSigns.hr}
                    onChange={(e) => setNewCaseForm({...newCaseForm, vitalSigns: {...newCaseForm.vitalSigns, hr: e.target.value}})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="temp" className="text-sm">{t('emergency.temperature')}</Label>
                  <Input 
                    id="temp" 
                    type="number"
                    step="0.1"
                    placeholder="37.0"
                    value={newCaseForm.vitalSigns.temp}
                    onChange={(e) => setNewCaseForm({...newCaseForm, vitalSigns: {...newCaseForm.vitalSigns, temp: e.target.value}})}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="spo2" className="text-sm">{t('emergency.oxygenSaturation')}</Label>
                  <Input 
                    id="spo2" 
                    type="number"
                    placeholder="98"
                    value={newCaseForm.vitalSigns.spo2}
                    onChange={(e) => setNewCaseForm({...newCaseForm, vitalSigns: {...newCaseForm.vitalSigns, spo2: e.target.value}})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="rr" className="text-sm">{t('emergency.respiratoryRate')}</Label>
                  <Input 
                    id="rr" 
                    type="number"
                    placeholder="18"
                    value={newCaseForm.vitalSigns.rr}
                    onChange={(e) => setNewCaseForm({...newCaseForm, vitalSigns: {...newCaseForm.vitalSigns, rr: e.target.value}})}
                  />
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes">{t('emergency.notes')}</Label>
              <Textarea 
                id="notes" 
                rows={3}
                placeholder={t('emergency.notes')}
                value={newCaseForm.notes}
                onChange={(e) => setNewCaseForm({...newCaseForm, notes: e.target.value})}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddCaseDialogOpen(false)}>
              {t('common.cancel')}
            </Button>
            <Button className="bg-gradient-to-r from-red-600 to-orange-600" onClick={() => {
              console.log('New Emergency Case:', newCaseForm);
              setIsAddCaseDialogOpen(false);
              // Reset form
              setNewCaseForm({
                patientId: "",
                patientName: "",
                age: "",
                gender: "male",
                complaint: "",
                triageLevel: "yellow",
                vitalSigns: {
                  bp: "",
                  hr: "",
                  temp: "",
                  spo2: "",
                  rr: ""
                },
                notes: ""
              });
            }}>
              {t('common.save')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
