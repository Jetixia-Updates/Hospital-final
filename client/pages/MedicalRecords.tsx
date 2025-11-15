import Layout from "@/components/Layout";
import {
  Search,
  Plus,
  Filter,
  Download,
  FileText,
  Pill,
  Beaker,
  Heart,
  Activity,
  AlertCircle,
  Eye,
  Edit,
  MoreVertical,
  TrendingUp,
  ArrowUpRight,
  Shield,
  Clock,
  FileCheck,
  Users,
  BarChart3,
  Stethoscope,
  Microscope,
  Syringe,
  Brain,
  Share2,
  Lock,
  UserCheck,
  Calendar,
  ClipboardList,
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

export default function MedicalRecords() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const [typeFilter, setTypeFilter] = useState("all");
  const [isNewRecordDialogOpen, setIsNewRecordDialogOpen] = useState(false);
  const [isScheduleImagingDialogOpen, setIsScheduleImagingDialogOpen] = useState(false);
  const [newRecordForm, setNewRecordForm] = useState({
    patientId: "",
    patientName: "",
    recordType: "consultation",
    doctorName: "",
    department: "",
    diagnosis: "",
    prescription: "",
    notes: ""
  });
  const [imagingForm, setImagingForm] = useState({
    patientId: "",
    patientName: "",
    imagingType: "xray",
    bodyPart: "",
    date: "",
    time: "",
    location: "",
    notes: ""
  });

  const records = [
    {
      id: "MR001",
      patientId: "P001",
      patientName: "Ahmed Mohammed",
      type: "Consultation",
      title: "Cardiac Evaluation",
      date: "2024-01-15",
      doctor: "Dr. Hassan Al-Rashid",
      department: "Cardiology",
      diagnosis: "Hypertension",
      status: "completed",
      attachments: 3,
      vitals: { bp: "130/85", hr: "72", temp: "36.8" },
    },
    {
      id: "MR002",
      patientId: "P002",
      patientName: "Fatima Al-Rashid",
      type: "Lab Results",
      title: "Complete Blood Count",
      date: "2024-01-12",
      doctor: "Dr. Layla Mahmoud",
      department: "Laboratory",
      diagnosis: "Normal Range",
      status: "completed",
      attachments: 2,
      vitals: null,
    },
    {
      id: "MR003",
      patientId: "P001",
      patientName: "Ahmed Mohammed",
      type: "Prescription",
      title: "Cardiac Medication Plan",
      date: "2024-01-15",
      doctor: "Dr. Hassan Al-Rashid",
      department: "Cardiology",
      diagnosis: "HTN Management",
      status: "active",
      attachments: 1,
      vitals: null,
    },
    {
      id: "MR004",
      patientId: "P003",
      patientName: "Muhammad Hassan",
      type: "Imaging",
      title: "Knee X-Ray",
      date: "2024-01-10",
      doctor: "Dr. Mohammed Al-Harbi",
      department: "Radiology",
      diagnosis: "Osteoarthritis",
      status: "completed",
      attachments: 5,
      vitals: null,
    },
    {
      id: "MR005",
      patientId: "P004",
      patientName: "Noor Abdullah",
      type: "Consultation",
      title: "Emergency Admission",
      date: "2024-01-18",
      doctor: "Dr. Mariam Saleh",
      department: "Emergency",
      diagnosis: "Acute Appendicitis",
      status: "in-progress",
      attachments: 2,
      vitals: { bp: "125/80", hr: "88", temp: "37.8" },
    },
  ];

  const vitals = [
    {
      id: "V001",
      patientName: "Ahmed Mohammed",
      date: "2024-01-15",
      time: "09:30 AM",
      bloodPressure: "130/85",
      heartRate: 72,
      temperature: 36.8,
      oxygen: 98,
      respiration: 16,
      weight: 82,
      height: 175,
      bmi: 26.8,
    },
    {
      id: "V002",
      patientName: "Fatima Al-Rashid",
      date: "2024-01-12",
      time: "11:00 AM",
      bloodPressure: "118/75",
      heartRate: 68,
      temperature: 36.6,
      oxygen: 99,
      respiration: 14,
      weight: 65,
      height: 162,
      bmi: 24.8,
    },
    {
      id: "V003",
      patientName: "Noor Abdullah",
      date: "2024-01-18",
      time: "02:15 PM",
      bloodPressure: "125/80",
      heartRate: 88,
      temperature: 37.8,
      oxygen: 96,
      respiration: 18,
      weight: 58,
      height: 160,
      bmi: 22.7,
    },
  ];

  const labResults = [
    {
      id: "LAB001",
      patientName: "Ahmed Mohammed",
      testType: "Lipid Panel",
      orderedDate: "2024-01-10",
      resultDate: "2024-01-12",
      status: "completed",
      results: [
        { test: "Total Cholesterol", value: "185 mg/dL", range: "<200", status: "normal" },
        { test: "LDL Cholesterol", value: "115 mg/dL", range: "<100", status: "high" },
        { test: "HDL Cholesterol", value: "52 mg/dL", range: ">40", status: "normal" },
        { test: "Triglycerides", value: "145 mg/dL", range: "<150", status: "normal" },
      ],
    },
    {
      id: "LAB002",
      patientName: "Fatima Al-Rashid",
      testType: "Complete Blood Count",
      orderedDate: "2024-01-11",
      resultDate: "2024-01-12",
      status: "completed",
      results: [
        { test: "WBC", value: "7.2 K/uL", range: "4.5-11.0", status: "normal" },
        { test: "RBC", value: "4.8 M/uL", range: "4.5-5.5", status: "normal" },
        { test: "Hemoglobin", value: "13.5 g/dL", range: "12.0-16.0", status: "normal" },
        { test: "Platelets", value: "250 K/uL", range: "150-400", status: "normal" },
      ],
    },
  ];

  const prescriptions = [
    {
      id: "RX001",
      patientName: "Ahmed Mohammed",
      medication: "Lisinopril",
      dosage: "10 mg",
      frequency: "Once daily",
      duration: "30 days",
      startDate: "2024-01-15",
      prescribedBy: "Dr. Hassan Al-Rashid",
      status: "active",
      refillsRemaining: 2,
      instructions: "Take in the morning with food",
    },
    {
      id: "RX002",
      patientName: "Ahmed Mohammed",
      medication: "Metformin",
      dosage: "500 mg",
      frequency: "Twice daily",
      duration: "90 days",
      startDate: "2024-01-15",
      prescribedBy: "Dr. Hassan Al-Rashid",
      status: "active",
      refillsRemaining: 3,
      instructions: "Take with meals",
    },
    {
      id: "RX003",
      patientName: "Fatima Al-Rashid",
      medication: "Prenatal Vitamins",
      dosage: "1 tablet",
      frequency: "Once daily",
      duration: "90 days",
      startDate: "2024-01-10",
      prescribedBy: "Dr. Layla Mahmoud",
      status: "active",
      refillsRemaining: 1,
      instructions: "Take with food",
    },
  ];

  const filteredRecords = records.filter((record) => {
    const matchesSearch =
      record.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = typeFilter === "all" || record.type === typeFilter;
    
    return matchesSearch && matchesType;
  });

  return (
    <Layout>
      <div className="space-y-6">
        {/* Enhanced Gradient Header */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 p-8 shadow-2xl">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                    <FileText className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold text-white mb-1">
                      {t('medicalRecords.comprehensiveManagement')}
                    </h1>
                    <p className="text-emerald-100 text-lg">
                      {t('medicalRecords.subtitle')}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="secondary" className="gap-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/30">
                  <Download className="w-4 h-4" />
                  {t('common.export')}
                </Button>
                <Button className="gap-2 bg-white text-teal-600 hover:bg-emerald-50" onClick={() => setIsNewRecordDialogOpen(true)}>
                  <Plus className="w-4 h-4" />
                  {t('medicalRecords.newRecord')}
                </Button>
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24"></div>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-blue-50 to-indigo-50">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full -mr-16 -mt-16"></div>
            <CardContent className="pt-6 relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">{t('medicalRecords.totalRecords')}</p>
                  <p className="text-4xl font-bold text-slate-900 mb-2">2,847</p>
                  <div className="flex items-center gap-1 text-xs">
                    <TrendingUp className="w-3 h-3 text-green-600" />
                    <span className="text-green-600 font-medium">+8% {t('common.thisMonth')}</span>
                  </div>
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <FileText className="w-8 h-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-green-50 to-emerald-50">
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full -mr-16 -mt-16"></div>
            <CardContent className="pt-6 relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">{t('medicalRecords.activePrescriptions')}</p>
                  <p className="text-4xl font-bold text-slate-900 mb-2">437</p>
                  <div className="flex items-center gap-1 text-xs">
                    <span className="text-orange-600 font-medium">128 {t('medicalRecords.expiringSoon')}</span>
                  </div>
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Pill className="w-8 h-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-purple-50 to-pink-50">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full -mr-16 -mt-16"></div>
            <CardContent className="pt-6 relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">{t('medicalRecords.labTestsToday')}</p>
                  <p className="text-4xl font-bold text-slate-900 mb-2">89</p>
                  <div className="flex items-center gap-1 text-xs">
                    <Clock className="w-3 h-3 text-orange-600" />
                    <span className="text-orange-600 font-medium">23 {t('medicalRecords.pendingResults')}</span>
                  </div>
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Beaker className="w-8 h-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-red-50 to-orange-50">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full -mr-16 -mt-16"></div>
            <CardContent className="pt-6 relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">{t('medicalRecords.criticalAlerts')}</p>
                  <p className="text-4xl font-bold text-slate-900 mb-2">4</p>
                  <div className="flex items-center gap-1 text-xs">
                    <AlertCircle className="w-3 h-3 text-red-600" />
                    <span className="text-red-600 font-medium">{t('medicalRecords.requiresAttention')}</span>
                  </div>
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <AlertCircle className="w-8 h-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-8 lg:w-auto">
            <TabsTrigger value="overview">{t('rooms.overview')}</TabsTrigger>
            <TabsTrigger value="all">{t('medicalRecords.allRecords')}</TabsTrigger>
            <TabsTrigger value="vitals">{t('medicalRecords.vitalSigns')}</TabsTrigger>
            <TabsTrigger value="labs">{t('medicalRecords.labResults')}</TabsTrigger>
            <TabsTrigger value="prescriptions">{t('medicalRecords.prescriptions')}</TabsTrigger>
            <TabsTrigger value="imaging">{t('medicalRecords.imaging')}</TabsTrigger>
            <TabsTrigger value="diagnoses">{t('medicalRecords.diagnoses')}</TabsTrigger>
            <TabsTrigger value="analytics">{t('rooms.analytics')}</TabsTrigger>
          </TabsList>

          {/* Overview Tab - NEW */}
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-blue-600" />
                    {t('medicalRecords.recentActivity')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {[
                      { type: 'Lab Result', patient: 'Ahmed Mohammed', time: '10 mins ago', status: 'completed', color: 'purple' },
                      { type: 'Prescription', patient: 'Fatima Al-Rashid', time: '25 mins ago', status: 'active', color: 'green' },
                      { type: 'Vital Signs', patient: 'Noor Abdullah', time: '1 hour ago', status: 'recorded', color: 'blue' },
                      { type: 'Imaging', patient: 'Muhammad Hassan', time: '2 hours ago', status: 'pending', color: 'orange' },
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                        <div className={`w-10 h-10 bg-${item.color}-100 rounded-full flex items-center justify-center`}>
                          <FileCheck className={`w-5 h-5 text-${item.color}-600`} />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-slate-900 text-sm">{item.type}</p>
                          <p className="text-xs text-slate-600">{item.patient}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant="outline" className="text-xs">{item.status}</Badge>
                          <p className="text-xs text-slate-500 mt-1">{item.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Record Types Distribution */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-purple-600" />
                    {t('medicalRecords.recordTypeDistribution')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    {[
                      { type: 'Consultations', count: 842, percentage: 30, color: 'blue' },
                      { type: 'Lab Results', count: 675, percentage: 24, color: 'purple' },
                      { type: 'Prescriptions', count: 589, percentage: 21, color: 'green' },
                      { type: 'Vital Signs', count: 456, percentage: 16, color: 'red' },
                      { type: 'Imaging', count: 285, percentage: 10, color: 'orange' },
                    ].map((item, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium text-slate-700">{item.type}</span>
                          <span className="font-bold text-slate-900">{item.count}</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full bg-${item.color}-500`}
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
                      <Stethoscope className="w-8 h-8 text-white" />
                    </div>
                    <p className="font-semibold text-slate-900">{t('medicalRecords.newConsultation')}</p>
                    <p className="text-xs text-slate-600 mt-1">{t('medicalRecords.startNewRecord')}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
                      <Microscope className="w-8 h-8 text-white" />
                    </div>
                    <p className="font-semibold text-slate-900">{t('medicalRecords.orderLabTest')}</p>
                    <p className="text-xs text-slate-600 mt-1">{t('medicalRecords.requestLaboratory')}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
                      <Syringe className="w-8 h-8 text-white" />
                    </div>
                    <p className="font-semibold text-slate-900">{t('medicalRecords.prescribeMedication')}</p>
                    <p className="text-xs text-slate-600 mt-1">{t('medicalRecords.createPrescription')}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
                      <Heart className="w-8 h-8 text-white" />
                    </div>
                    <p className="font-semibold text-slate-900">{t('medicalRecords.recordVitals')}</p>
                    <p className="text-xs text-slate-600 mt-1">{t('medicalRecords.captureVitalSigns')}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

        {/* All Records Tab */}
        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{t('navigation.medicalRecords')}</CardTitle>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder={t('medicalRecords.searchRecords')}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">{t('common.all')} {t('rooms.type')}</option>
                    <option value="Consultation">{t('medicalRecords.consultation')}</option>
                    <option value="Lab Results">{t('medicalRecords.labResults')}</option>
                    <option value="Prescription">{t('medicalRecords.prescription')}</option>
                    <option value="Imaging">{t('medicalRecords.imaging')}</option>
                  </select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">{t('medicalRecords.recordId')}</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">{t('common.name')}</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">{t('rooms.type')}</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">{t('medicalRecords.title')}</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">{t('patients.doctor')}</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">{t('common.date')}</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">{t('common.status')}</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">{t('common.actions')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredRecords.map((record) => (
                      <tr key={record.id} className="hover:bg-slate-50">
                        <td className="py-3 px-4">
                          <span className="text-sm font-medium text-slate-900">{record.id}</span>
                        </td>
                        <td className="py-3 px-4">
                          <div>
                            <p className="text-sm font-medium text-slate-900">{record.patientName}</p>
                            <p className="text-xs text-slate-500">{record.patientId}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant="outline">{record.type}</Badge>
                        </td>
                        <td className="py-3 px-4">
                          <div>
                            <p className="text-sm font-medium text-slate-900">{record.title}</p>
                            <p className="text-xs text-slate-500">{record.diagnosis}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="text-xs">
                            <p className="font-medium text-slate-700">{record.doctor}</p>
                            <p className="text-slate-500">{record.department}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-sm text-slate-700">{record.date}</span>
                        </td>
                        <td className="py-3 px-4">
                          <Badge 
                            variant={record.status === "active" ? "default" : record.status === "in-progress" ? "secondary" : "outline"}
                          >
                            {record.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Vital Signs Tab */}
        <TabsContent value="vitals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('medicalRecords.vitalSignsRecords')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {vitals.map((vital) => (
                  <div key={vital.id} className="border border-slate-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="font-semibold text-slate-900">{vital.patientName}</p>
                        <p className="text-sm text-slate-600">{vital.date} at {vital.time}</p>
                      </div>
                      <Button variant="outline" size="sm">{t('medicalRecords.viewChart')}</Button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-blue-50 rounded-lg p-3">
                        <p className="text-xs text-slate-600 mb-1">{t('medicalRecords.bloodPressure')}</p>
                        <p className="text-lg font-bold text-blue-600">{vital.bloodPressure}</p>
                        <p className="text-xs text-slate-500">mmHg</p>
                      </div>
                      <div className="bg-red-50 rounded-lg p-3">
                        <p className="text-xs text-slate-600 mb-1">{t('medicalRecords.heartRate')}</p>
                        <p className="text-lg font-bold text-red-600">{vital.heartRate}</p>
                        <p className="text-xs text-slate-500">bpm</p>
                      </div>
                      <div className="bg-orange-50 rounded-lg p-3">
                        <p className="text-xs text-slate-600 mb-1">{t('medicalRecords.temperature')}</p>
                        <p className="text-lg font-bold text-orange-600">{vital.temperature}</p>
                        <p className="text-xs text-slate-500">°C</p>
                      </div>
                      <div className="bg-green-50 rounded-lg p-3">
                        <p className="text-xs text-slate-600 mb-1">{t('medicalRecords.oxygen')}</p>
                        <p className="text-lg font-bold text-green-600">{vital.oxygen}%</p>
                        <p className="text-xs text-slate-500">SpO2</p>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-3">
                        <p className="text-xs text-slate-600 mb-1">{t('medicalRecords.respiration')}</p>
                        <p className="text-lg font-bold text-purple-600">{vital.respiration}</p>
                        <p className="text-xs text-slate-500">breaths/min</p>
                      </div>
                      <div className="bg-indigo-50 rounded-lg p-3">
                        <p className="text-xs text-slate-600 mb-1">{t('medicalRecords.weight')}</p>
                        <p className="text-lg font-bold text-indigo-600">{vital.weight}</p>
                        <p className="text-xs text-slate-500">kg</p>
                      </div>
                      <div className="bg-teal-50 rounded-lg p-3">
                        <p className="text-xs text-slate-600 mb-1">{t('medicalRecords.height')}</p>
                        <p className="text-lg font-bold text-teal-600">{vital.height}</p>
                        <p className="text-xs text-slate-500">cm</p>
                      </div>
                      <div className="bg-pink-50 rounded-lg p-3">
                        <p className="text-xs text-slate-600 mb-1">{t('medicalRecords.bmi')}</p>
                        <p className="text-lg font-bold text-pink-600">{vital.bmi}</p>
                        <p className="text-xs text-slate-500">kg/m²</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Lab Results Tab */}
        <TabsContent value="labs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('medicalRecords.laboratoryTestResults')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {labResults.map((lab) => (
                  <div key={lab.id} className="border border-slate-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-semibold text-slate-900">{lab.testType}</h4>
                        <p className="text-sm text-slate-600">{lab.patientName}</p>
                        <p className="text-xs text-slate-500">
                          {t('medicalRecords.ordered')}: {lab.orderedDate} | {t('medicalRecords.results')}: {lab.resultDate}
                        </p>
                      </div>
                      <Badge variant="default">{lab.status}</Badge>
                    </div>
                    <div className="grid gap-3">
                      {lab.results.map((result, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-slate-900">{result.test}</p>
                            <p className="text-xs text-slate-500">{t('medicalRecords.reference')}: {result.range}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-bold text-slate-900">{result.value}</p>
                            <Badge 
                              variant={result.status === "normal" ? "outline" : "destructive"}
                              className="mt-1"
                            >
                              {result.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Prescriptions Tab */}
        <TabsContent value="prescriptions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{t('medicalRecords.activePrescriptions')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {prescriptions.map((rx) => (
                  <div key={rx.id} className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-slate-900">{rx.medication}</h4>
                        <p className="text-sm text-slate-600">{rx.patientName}</p>
                      </div>
                      <Badge variant={rx.status === "active" ? "default" : "secondary"}>
                        {rx.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                      <div>
                        <p className="text-slate-500">{t('medicalRecords.dosage')}</p>
                        <p className="font-medium text-slate-900">{rx.dosage}</p>
                      </div>
                      <div>
                        <p className="text-slate-500">{t('medicalRecords.frequency')}</p>
                        <p className="font-medium text-slate-900">{rx.frequency}</p>
                      </div>
                      <div>
                        <p className="text-slate-500">{t('medicalRecords.duration')}</p>
                        <p className="font-medium text-slate-900">{rx.duration}</p>
                      </div>
                      <div>
                        <p className="text-slate-500">{t('medicalRecords.refills')}</p>
                        <p className="font-medium text-slate-900">{rx.refillsRemaining} {t('medicalRecords.remaining')}</p>
                      </div>
                    </div>
                    <div className="pt-3 border-t border-slate-200">
                      <p className="text-xs text-slate-500 mb-1">{t('medicalRecords.instructions')}</p>
                      <p className="text-sm text-slate-700">{rx.instructions}</p>
                      <p className="text-xs text-slate-500 mt-2">
                        {t('medicalRecords.prescribedBy')} {rx.prescribedBy} {t('medicalRecords.on')} {rx.startDate}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Enhanced Imaging Tab */}
        <TabsContent value="imaging" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50">
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-indigo-600" />
                  {t('medicalRecords.recentImaging')}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  {[
                    { type: 'X-Ray', body: 'Chest', date: '2024-01-18', status: 'completed', findings: 'Normal' },
                    { type: 'CT Scan', body: 'Head', date: '2024-01-15', status: 'completed', findings: 'No abnormalities' },
                    { type: 'MRI', body: 'Knee', date: '2024-01-12', status: 'pending', findings: 'Awaiting review' },
                    { type: 'Ultrasound', body: 'Abdomen', date: '2024-01-10', status: 'completed', findings: 'Normal findings' },
                  ].map((item, idx) => (
                    <div key={idx} className="p-4 border border-slate-200 rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="font-semibold text-slate-900">{item.type} - {item.body}</p>
                          <p className="text-sm text-slate-600">{item.date}</p>
                        </div>
                        <Badge variant={item.status === 'completed' ? 'default' : 'secondary'}>
                          {item.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-700">{t('medicalRecords.findings')}: {item.findings}</p>
                      <Button size="sm" variant="outline" className="w-full mt-3">
                        <Eye className="w-4 h-4 mr-2" />
                        {t('medicalRecords.viewImages')}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  {t('medicalRecords.scheduledImaging')}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  {[
                    { type: 'MRI', body: 'Spine', date: '2024-01-20', time: '10:00 AM', location: 'Radiology - Room 3' },
                    { type: 'CT Scan', body: 'Chest', date: '2024-01-22', time: '02:30 PM', location: 'Radiology - Room 1' },
                  ].map((item, idx) => (
                    <div key={idx} className="p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-semibold text-slate-900">{item.type} - {item.body}</p>
                        <Badge variant="outline">{t('rooms.scheduled')}</Badge>
                      </div>
                      <div className="space-y-1 text-sm text-slate-600">
                        <p>📅 {item.date} at {item.time}</p>
                        <p>📍 {item.location}</p>
                      </div>
                    </div>
                  ))}
                  <Button className="w-full gap-2 mt-4" onClick={() => setIsScheduleImagingDialogOpen(true)}>
                    <Plus className="w-4 h-4" />
                    {t('medicalRecords.scheduleImaging')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Diagnoses Tab - NEW */}
        <TabsContent value="diagnoses" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Active Diagnoses */}
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-red-50 to-pink-50">
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-red-600" />
                  {t('medicalRecords.activeDiagnoses')}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  {[
                    { 
                      icd: 'I10', 
                      name: 'Essential Hypertension', 
                      severity: 'Moderate', 
                      onset: '2023-06-15',
                      status: 'active',
                      treatment: 'Medication + Lifestyle'
                    },
                    { 
                      icd: 'E11', 
                      name: 'Type 2 Diabetes Mellitus', 
                      severity: 'Mild', 
                      onset: '2023-08-22',
                      status: 'controlled',
                      treatment: 'Medication + Diet'
                    },
                    { 
                      icd: 'M25.5', 
                      name: 'Joint Pain', 
                      severity: 'Mild', 
                      onset: '2024-01-05',
                      status: 'active',
                      treatment: 'Physical Therapy'
                    },
                  ].map((item, idx) => (
                    <div key={idx} className="p-4 border-2 border-red-200 rounded-lg bg-red-50/50">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="font-bold text-slate-900">{item.name}</p>
                          <p className="text-sm text-slate-600">ICD-10: {item.icd}</p>
                        </div>
                        <Badge 
                          variant={item.severity === 'Severe' ? 'destructive' : item.severity === 'Moderate' ? 'secondary' : 'outline'}
                        >
                          {item.severity}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-slate-600">{t('medicalRecords.onset')}</p>
                          <p className="font-medium text-slate-900">{item.onset}</p>
                        </div>
                        <div>
                          <p className="text-slate-600">{t('common.status')}</p>
                          <p className="font-medium text-slate-900">{item.status}</p>
                        </div>
                      </div>
                      <div className="mt-2 pt-2 border-t border-red-200">
                        <p className="text-xs text-slate-600">{t('medicalRecords.treatment')}</p>
                        <p className="text-sm font-medium text-slate-900">{item.treatment}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Diagnosis History */}
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                <CardTitle className="flex items-center gap-2">
                  <ClipboardList className="w-5 h-5 text-green-600" />
                  {t('medicalRecords.diagnosisHistory')}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  {[
                    { condition: 'Acute Bronchitis', resolved: '2023-12-15', duration: '2 weeks' },
                    { condition: 'Seasonal Allergies', resolved: '2023-10-20', duration: '1 month' },
                    { condition: 'Minor Laceration', resolved: '2023-09-05', duration: '3 days' },
                    { condition: 'Viral Gastroenteritis', resolved: '2023-07-12', duration: '5 days' },
                  ].map((item, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-semibold text-slate-900">{item.condition}</p>
                        <Badge variant="outline">
                          <FileCheck className="w-3 h-3 mr-1" />
                          {t('medicalRecords.resolved')}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-slate-600">
                        <span>{t('medicalRecords.resolved')}: {item.resolved}</span>
                        <span>{t('medicalRecords.duration')}: {item.duration}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Common Diagnoses Statistics */}
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50">
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-purple-600" />
                {t('medicalRecords.commonDiagnoses')}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { condition: 'Hypertension', count: 287, trend: '+12%' },
                  { condition: 'Diabetes Mellitus', count: 245, trend: '+8%' },
                  { condition: 'Respiratory Infections', count: 198, trend: '-5%' },
                  { condition: 'Arthritis', count: 156, trend: '+3%' },
                  { condition: 'Anxiety Disorders', count: 142, trend: '+15%' },
                  { condition: 'Cardiovascular Disease', count: 128, trend: '+7%' },
                ].map((item, idx) => (
                  <div key={idx} className="p-4 border border-slate-200 rounded-lg">
                    <p className="font-semibold text-slate-900 mb-2">{item.condition}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-2xl font-bold text-purple-600">{item.count}</p>
                      <Badge variant={item.trend.includes('+') ? 'destructive' : 'default'}>
                        {item.trend}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab - NEW */}
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Record Volume Trends */}
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  {t('medicalRecords.recordVolume')}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-slate-600">{t('medicalRecords.recordsThisMonth')}</p>
                    <p className="text-4xl font-bold text-blue-600">2,847</p>
                    <div className="flex items-center gap-1 mt-1">
                      <ArrowUpRight className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-green-600">+12.5% {t('common.vsLastWeek')}</span>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-slate-200">
                    <p className="text-sm text-slate-600 mb-2">{t('medicalRecords.avgDailyRecords')}</p>
                    <p className="text-2xl font-bold text-slate-900">92</p>
                  </div>
                  <div className="pt-4 border-t border-slate-200">
                    <p className="text-sm text-slate-600 mb-2">{t('medicalRecords.completionRate')}</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-slate-200 rounded-full h-2">
                        <div className="h-2 rounded-full bg-green-500" style={{ width: '94%' }} />
                      </div>
                      <span className="text-lg font-bold text-green-600">94%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Access & Security */}
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Shield className="w-5 h-5 text-purple-600" />
                  {t('medicalRecords.accessSecurity')}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <p className="text-sm text-slate-600 mb-1">{t('medicalRecords.authorizedUsers')}</p>
                    <p className="text-3xl font-bold text-purple-600">45</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-sm text-slate-600 mb-1">{t('medicalRecords.encryptedRecords')}</p>
                    <div className="flex items-center gap-2">
                      <Lock className="w-5 h-5 text-green-600" />
                      <p className="text-2xl font-bold text-green-600">100%</p>
                    </div>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-slate-600 mb-1">{t('medicalRecords.accessLogsToday')}</p>
                    <p className="text-2xl font-bold text-blue-600">1,245</p>
                  </div>
                  <div className="pt-3 border-t border-slate-200">
                    <p className="text-xs text-slate-500">{t('medicalRecords.lastSecurityAudit')}</p>
                    <p className="text-sm font-medium text-slate-900">2024-01-10</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Response Times */}
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Clock className="w-5 h-5 text-green-600" />
                  {t('medicalRecords.responseTimes')}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <p className="text-sm text-slate-600 mb-1">{t('medicalRecords.avgLabTurnaround')}</p>
                    <p className="text-3xl font-bold text-green-600">4.2h</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <p className="text-sm text-slate-600 mb-1">{t('medicalRecords.avgImagingReport')}</p>
                    <p className="text-3xl font-bold text-blue-600">6.5h</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <p className="text-sm text-slate-600 mb-1">{t('medicalRecords.avgPrescriptionTime')}</p>
                    <p className="text-3xl font-bold text-purple-600">15min</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Department Performance */}
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50">
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-amber-600" />
                {t('medicalRecords.departmentPerformance')}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-3">
                {[
                  { dept: 'Cardiology', records: 487, completion: 96, avgTime: '3.2 days' },
                  { dept: 'Laboratory', records: 842, completion: 98, avgTime: '4.5 hours' },
                  { dept: 'Radiology', records: 356, completion: 92, avgTime: '6.8 hours' },
                  { dept: 'Emergency', records: 624, completion: 89, avgTime: '2.1 hours' },
                  { dept: 'Pharmacy', records: 589, completion: 99, avgTime: '18 mins' },
                ].map((item, idx) => (
                  <div key={idx} className="p-4 border border-slate-200 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-bold text-slate-900">{item.dept}</h4>
                      <Badge variant={item.completion > 95 ? 'default' : 'secondary'}>
                        {item.completion}% {t('medicalRecords.complete')}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-center text-sm">
                      <div>
                        <p className="text-slate-600 mb-1">{t('medicalRecords.totalRecords')}</p>
                        <p className="text-xl font-bold text-slate-900">{item.records}</p>
                      </div>
                      <div>
                        <p className="text-slate-600 mb-1">{t('medicalRecords.completionRate')}</p>
                        <p className="text-xl font-bold text-green-600">{item.completion}%</p>
                      </div>
                      <div>
                        <p className="text-slate-600 mb-1">{t('medicalRecords.avgTime')}</p>
                        <p className="text-xl font-bold text-blue-600">{item.avgTime}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      </div>

      {/* New Medical Record Dialog */}
      <Dialog open={isNewRecordDialogOpen} onOpenChange={setIsNewRecordDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-teal-700 flex items-center gap-2">
              <FileText className="w-6 h-6" />
              {t('medicalRecords.newRecord')}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="patient-id">{t('medicalRecords.patientId')}</Label>
                <Input 
                  id="patient-id" 
                  placeholder="P001"
                  value={newRecordForm.patientId}
                  onChange={(e) => setNewRecordForm({...newRecordForm, patientId: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="patient-name">{t('medicalRecords.patientName')}</Label>
                <Input 
                  id="patient-name" 
                  placeholder={t('medicalRecords.patientName')}
                  value={newRecordForm.patientName}
                  onChange={(e) => setNewRecordForm({...newRecordForm, patientName: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="record-type">{t('medicalRecords.recordType')}</Label>
                <Select value={newRecordForm.recordType} onValueChange={(value) => setNewRecordForm({...newRecordForm, recordType: value})}>
                  <SelectTrigger id="record-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="consultation">{t('medicalRecords.consultation')}</SelectItem>
                    <SelectItem value="labResults">{t('medicalRecords.labResults')}</SelectItem>
                    <SelectItem value="imaging">{t('medicalRecords.imaging')}</SelectItem>
                    <SelectItem value="prescription">{t('medicalRecords.prescription')}</SelectItem>
                    <SelectItem value="surgery">{t('medicalRecords.surgery')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="doctor">{t('medicalRecords.doctorName')}</Label>
                <Input 
                  id="doctor" 
                  placeholder={t('medicalRecords.doctorName')}
                  value={newRecordForm.doctorName}
                  onChange={(e) => setNewRecordForm({...newRecordForm, doctorName: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="department">{t('medicalRecords.department')}</Label>
              <Select value={newRecordForm.department} onValueChange={(value) => setNewRecordForm({...newRecordForm, department: value})}>
                <SelectTrigger id="department">
                  <SelectValue placeholder={t('medicalRecords.selectDepartment')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cardiology">{t('medicalRecords.cardiology')}</SelectItem>
                  <SelectItem value="laboratory">{t('medicalRecords.laboratory')}</SelectItem>
                  <SelectItem value="radiology">{t('medicalRecords.radiology')}</SelectItem>
                  <SelectItem value="emergency">{t('medicalRecords.emergency')}</SelectItem>
                  <SelectItem value="pharmacy">{t('medicalRecords.pharmacy')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="diagnosis">{t('medicalRecords.diagnosis')}</Label>
              <Textarea 
                id="diagnosis" 
                rows={2}
                placeholder={t('medicalRecords.diagnosis')}
                value={newRecordForm.diagnosis}
                onChange={(e) => setNewRecordForm({...newRecordForm, diagnosis: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="prescription">{t('medicalRecords.prescription')}</Label>
              <Textarea 
                id="prescription" 
                rows={2}
                placeholder={t('medicalRecords.prescription')}
                value={newRecordForm.prescription}
                onChange={(e) => setNewRecordForm({...newRecordForm, prescription: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">{t('medicalRecords.notes')}</Label>
              <Textarea 
                id="notes" 
                rows={3}
                placeholder={t('medicalRecords.notes')}
                value={newRecordForm.notes}
                onChange={(e) => setNewRecordForm({...newRecordForm, notes: e.target.value})}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewRecordDialogOpen(false)}>
              {t('common.cancel')}
            </Button>
            <Button className="bg-gradient-to-r from-teal-600 to-emerald-600" onClick={() => {
              console.log('New Medical Record:', newRecordForm);
              setIsNewRecordDialogOpen(false);
              setNewRecordForm({
                patientId: "",
                patientName: "",
                recordType: "consultation",
                doctorName: "",
                department: "",
                diagnosis: "",
                prescription: "",
                notes: ""
              });
            }}>
              {t('common.save')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Schedule Imaging Dialog */}
      <Dialog open={isScheduleImagingDialogOpen} onOpenChange={setIsScheduleImagingDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-purple-700 flex items-center gap-2">
              <Microscope className="w-6 h-6" />
              {t('medicalRecords.scheduleImaging')}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="img-patient-id">{t('medicalRecords.patientId')}</Label>
                <Input 
                  id="img-patient-id" 
                  placeholder="P001"
                  value={imagingForm.patientId}
                  onChange={(e) => setImagingForm({...imagingForm, patientId: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="img-patient-name">{t('medicalRecords.patientName')}</Label>
                <Input 
                  id="img-patient-name" 
                  placeholder={t('medicalRecords.patientName')}
                  value={imagingForm.patientName}
                  onChange={(e) => setImagingForm({...imagingForm, patientName: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="imaging-type">{t('medicalRecords.imagingType')}</Label>
                <Select value={imagingForm.imagingType} onValueChange={(value) => setImagingForm({...imagingForm, imagingType: value})}>
                  <SelectTrigger id="imaging-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="xray">{t('medicalRecords.xray')}</SelectItem>
                    <SelectItem value="ct">{t('medicalRecords.ct')}</SelectItem>
                    <SelectItem value="mri">{t('medicalRecords.mri')}</SelectItem>
                    <SelectItem value="ultrasound">{t('medicalRecords.ultrasound')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="body-part">{t('medicalRecords.bodyPart')}</Label>
                <Input 
                  id="body-part" 
                  placeholder={t('medicalRecords.bodyPart')}
                  value={imagingForm.bodyPart}
                  onChange={(e) => setImagingForm({...imagingForm, bodyPart: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="img-date">{t('medicalRecords.date')}</Label>
                <Input 
                  id="img-date" 
                  type="date"
                  value={imagingForm.date}
                  onChange={(e) => setImagingForm({...imagingForm, date: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="img-time">{t('medicalRecords.time')}</Label>
                <Input 
                  id="img-time" 
                  type="time"
                  value={imagingForm.time}
                  onChange={(e) => setImagingForm({...imagingForm, time: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">{t('medicalRecords.location')}</Label>
              <Input 
                id="location" 
                placeholder={t('medicalRecords.location')}
                value={imagingForm.location}
                onChange={(e) => setImagingForm({...imagingForm, location: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="img-notes">{t('medicalRecords.notes')}</Label>
              <Textarea 
                id="img-notes" 
                rows={3}
                placeholder={t('medicalRecords.notes')}
                value={imagingForm.notes}
                onChange={(e) => setImagingForm({...imagingForm, notes: e.target.value})}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsScheduleImagingDialogOpen(false)}>
              {t('common.cancel')}
            </Button>
            <Button className="bg-gradient-to-r from-purple-600 to-indigo-600" onClick={() => {
              console.log('Schedule Imaging:', imagingForm);
              setIsScheduleImagingDialogOpen(false);
              setImagingForm({
                patientId: "",
                patientName: "",
                imagingType: "xray",
                bodyPart: "",
                date: "",
                time: "",
                location: "",
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
