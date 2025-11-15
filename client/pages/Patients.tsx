import Layout from "@/components/Layout";
import AddPatientForm from "@/components/AddPatientForm";
import {
  Search,
  Plus,
  Filter,
  Calendar,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Users,
  UserPlus,
  ClipboardList,
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle,
  Activity,
  FileText,
  Download,
  Upload,
  Edit,
  Trash2,
  Eye,
  MoreVertical,
} from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const PatientCard = ({
  id,
  name,
  age,
  status,
  phone,
  email,
  lastVisit,
}: {
  id: string;
  name: string;
  age: number;
  status: "active" | "inactive" | "pending";
  phone: string;
  email: string;
  lastVisit: string;
}) => {
  const { t } = useTranslation();
  const statusConfig = {
    active: { bg: "bg-green-100", text: "text-green-800", badge: t('patients.active') },
    inactive: { bg: "bg-slate-100", text: "text-slate-800", badge: t('patients.inactive') },
    pending: { bg: "bg-yellow-100", text: "text-yellow-800", badge: t('patients.pending') },
  };

  const config = statusConfig[status];

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{name}</h3>
          <p className="text-sm text-slate-500">{t('patients.patientId')}: {id}</p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}
        >
          {config.badge}
        </span>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-3 text-sm text-slate-600">
          <span className="font-medium text-slate-900">{age}</span>
          <span>{t('patients.yearsOld')}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Phone className="w-4 h-4" />
          {phone}
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Mail className="w-4 h-4" />
          {email}
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Calendar className="w-4 h-4" />
          {t('patients.lastVisit')}: {lastVisit}
        </div>
      </div>

      <button className="w-full bg-blue-50 hover:bg-blue-100 text-blue-600 font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-2">
        {t('common.viewDetails')} <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default function Patients() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [showAddPatientForm, setShowAddPatientForm] = useState(false);

  const handleAddPatient = (patientData: any) => {
    console.log("New patient data:", patientData);
    // Here you would typically send the data to your backend API
    // For now, we'll just close the form and show a success message
    setShowAddPatientForm(false);
    alert(t('addPatient.title') + " - " + patientData.firstName + " " + patientData.lastName);
  };

  const patients = [
    {
      id: "P001",
      mrn: "MRN-2024-001",
      name: "Ahmed Mohammed",
      age: 45,
      gender: "Male",
      bloodType: "O+",
      status: "active" as const,
      admissionStatus: "Outpatient",
      phone: "+966 50 123 4567",
      email: "ahmed.m@email.com",
      address: "Riyadh, Saudi Arabia",
      emergencyContact: "Sara Ahmed - +966 50 111 2222",
      insurance: "Tawuniya",
      insuranceNumber: "INS-001-2024",
      lastVisit: "2024-11-12",
      nextAppointment: "2024-11-20",
      assignedDoctor: "Dr. Abdullah Hassan",
      department: "Cardiology",
      chronicConditions: ["Hypertension", "Diabetes Type 2"],
      allergies: ["Penicillin"],
      currentMedications: ["Metformin 500mg", "Lisinopril 10mg"],
    },
    {
      id: "P002",
      mrn: "MRN-2024-002",
      name: "Fatima Al-Rashid",
      age: 38,
      gender: "Female",
      bloodType: "A+",
      status: "active" as const,
      admissionStatus: "Inpatient",
      phone: "+966 55 234 5678",
      email: "fatima.r@email.com",
      address: "Jeddah, Saudi Arabia",
      emergencyContact: "Omar Al-Rashid - +966 55 222 3333",
      insurance: "Bupa Arabia",
      insuranceNumber: "INS-002-2024",
      lastVisit: "2024-11-07",
      nextAppointment: "2024-11-15",
      assignedDoctor: "Dr. Layla Mahmoud",
      department: "Obstetrics & Gynecology",
      chronicConditions: [],
      allergies: ["Sulfa drugs"],
      currentMedications: ["Prenatal vitamins"],
    },
    {
      id: "P003",
      mrn: "MRN-2024-003",
      name: "Muhammad Hassan",
      age: 62,
      gender: "Male",
      bloodType: "B-",
      status: "inactive" as const,
      admissionStatus: "Discharged",
      phone: "+966 50 345 6789",
      email: "mhassan@email.com",
      address: "Dammam, Saudi Arabia",
      emergencyContact: "Noor Hassan - +966 50 333 4444",
      insurance: "Medgulf",
      insuranceNumber: "INS-003-2024",
      lastVisit: "2024-09-15",
      nextAppointment: null,
      assignedDoctor: "Dr. Khalid Yousef",
      department: "Orthopedics",
      chronicConditions: ["Arthritis", "Osteoporosis"],
      allergies: [],
      currentMedications: [],
    },
    {
      id: "P004",
      mrn: "MRN-2024-004",
      name: "Noor Abdullah",
      age: 29,
      gender: "Female",
      bloodType: "AB+",
      status: "active" as const,
      admissionStatus: "Emergency",
      phone: "+966 56 456 7890",
      email: "noor.a@email.com",
      address: "Mecca, Saudi Arabia",
      emergencyContact: "Abdullah Noor - +966 56 444 5555",
      insurance: "AXA",
      insuranceNumber: "INS-004-2024",
      lastVisit: "2024-11-11",
      nextAppointment: "2024-11-14",
      assignedDoctor: "Dr. Mariam Saleh",
      department: "Emergency",
      chronicConditions: [],
      allergies: ["Latex"],
      currentMedications: [],
    },
    {
      id: "P005",
      mrn: "MRN-2024-005",
      name: "Sarah Ali",
      age: 35,
      gender: "Female",
      bloodType: "O-",
      status: "pending" as const,
      admissionStatus: "Scheduled",
      phone: "+966 54 567 8901",
      email: "sarah.a@email.com",
      address: "Medina, Saudi Arabia",
      emergencyContact: "Ali Mansour - +966 54 555 6666",
      insurance: "Saudi Enaya",
      insuranceNumber: "INS-005-2024",
      lastVisit: "2024-11-14",
      nextAppointment: "2024-11-18",
      assignedDoctor: "Dr. Sami Ibrahim",
      department: "Internal Medicine",
      chronicConditions: ["Asthma"],
      allergies: ["Aspirin"],
      currentMedications: ["Albuterol inhaler"],
    },
  ];

  const appointments = [
    {
      id: "APT001",
      patientId: "P001",
      patientName: "Ahmed Mohammed",
      date: "2024-11-20",
      time: "09:00 AM",
      department: "Cardiology",
      doctor: "Dr. Abdullah Hassan",
      type: "Follow-up",
      status: "Scheduled",
    },
    {
      id: "APT002",
      patientId: "P002",
      patientName: "Fatima Al-Rashid",
      date: "2024-11-15",
      time: "10:30 AM",
      department: "Obstetrics",
      doctor: "Dr. Layla Mahmoud",
      type: "Checkup",
      status: "Confirmed",
    },
    {
      id: "APT003",
      patientId: "P004",
      patientName: "Noor Abdullah",
      date: "2024-11-14",
      time: "02:00 PM",
      department: "Emergency",
      doctor: "Dr. Mariam Saleh",
      type: "Emergency",
      status: "In Progress",
    },
  ];

  const admissions = [
    {
      id: "ADM001",
      patientId: "P002",
      patientName: "Fatima Al-Rashid",
      admissionDate: "2024-11-10",
      ward: "Maternity Ward",
      room: "204-B",
      bed: "2",
      admittingDoctor: "Dr. Layla Mahmoud",
      diagnosis: "Pregnancy monitoring - Week 38",
      status: "Admitted",
    },
    {
      id: "ADM002",
      patientId: "P004",
      patientName: "Noor Abdullah",
      admissionDate: "2024-11-11",
      ward: "Emergency",
      room: "ER-3",
      bed: "1",
      admittingDoctor: "Dr. Mariam Saleh",
      diagnosis: "Acute appendicitis",
      status: "Under Observation",
    },
  ];

  const waitingList = [
    {
      id: "WL001",
      patientName: "Khalid Omar",
      department: "Orthopedics",
      priority: "High",
      waitingSince: "08:30 AM",
      estimatedWait: "15 mins",
    },
    {
      id: "WL002",
      patientName: "Maryam Saleh",
      department: "Pediatrics",
      priority: "Medium",
      waitingSince: "09:00 AM",
      estimatedWait: "30 mins",
    },
    {
      id: "WL003",
      patientName: "Hassan Yousef",
      department: "General Medicine",
      priority: "Low",
      waitingSince: "09:15 AM",
      estimatedWait: "45 mins",
    },
  ];

  // Medical History & Records
  const medicalHistory = [
    {
      patientId: "P001",
      patientName: "Ahmed Mohammed",
      records: [
        {
          date: "2024-11-12",
          type: "Lab Test",
          description: "Complete Blood Count",
          result: "Normal",
          doctor: "Dr. Abdullah Hassan",
        },
        {
          date: "2024-11-10",
          type: "Prescription",
          description: "Metformin 500mg x2 daily",
          result: "Active",
          doctor: "Dr. Abdullah Hassan",
        },
      ],
    },
  ];

  // Vital Signs Monitoring
  const vitalSigns = [
    {
      patientId: "P002",
      patientName: "Fatima Al-Rashid",
      timestamp: "2024-11-14 09:00",
      bloodPressure: "120/80",
      heartRate: 76,
      temperature: 36.8,
      oxygenLevel: 98,
      respiratoryRate: 16,
      status: "Normal",
    },
    {
      patientId: "P004",
      patientName: "Noor Abdullah",
      timestamp: "2024-11-14 08:30",
      bloodPressure: "140/90",
      heartRate: 92,
      temperature: 37.2,
      oxygenLevel: 95,
      respiratoryRate: 20,
      status: "Monitoring",
    },
  ];

  // Billing & Financial Records
  const billing = [
    {
      id: "INV-2024-001",
      patientId: "P001",
      patientName: "Ahmed Mohammed",
      date: "2024-11-12",
      services: ["Consultation", "Lab Tests", "Medication"],
      totalAmount: 1250,
      insuranceCoverage: 1000,
      patientDue: 250,
      status: "Pending",
    },
    {
      id: "INV-2024-002",
      patientId: "P002",
      patientName: "Fatima Al-Rashid",
      date: "2024-11-10",
      services: ["Room Charges", "Nursing Care", "Meals"],
      totalAmount: 3500,
      insuranceCoverage: 3200,
      patientDue: 300,
      status: "Paid",
    },
  ];

  // Discharge Planning
  const dischargePlanning = [
    {
      patientId: "P003",
      patientName: "Muhammad Hassan",
      expectedDischarge: "2024-11-16",
      dischargingDoctor: "Dr. Khalid Yousef",
      followUpRequired: true,
      followUpDate: "2024-11-23",
      medications: ["Calcium supplements", "Pain relievers"],
      instructions: "Rest for 2 weeks, avoid heavy lifting",
      status: "Planned",
    },
  ];

  // Patient Demographics Analytics
  const demographics = {
    ageGroups: [
      { range: "0-18", count: 2340, percentage: 18 },
      { range: "19-35", count: 3850, percentage: 30 },
      { range: "36-50", count: 3200, percentage: 25 },
      { range: "51-65", count: 2140, percentage: 17 },
      { range: "65+", count: 1317, percentage: 10 },
    ],
    genderDistribution: [
      { gender: "Male", count: 6420, percentage: 50 },
      { gender: "Female", count: 6427, percentage: 50 },
    ],
    insuranceProviders: [
      { provider: "Tawuniya", patients: 3850, percentage: 30 },
      { provider: "Bupa Arabia", patients: 3200, percentage: 25 },
      { provider: "Medgulf", patients: 2570, percentage: 20 },
      { provider: "AXA", patients: 1930, percentage: 15 },
      { provider: "Others", patients: 1297, percentage: 10 },
    ],
  };

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.mrn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === "all" || patient.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  {t('navigation.patients')}
                </h1>
                <p className="text-lg text-slate-600">
                  {t('patients.comprehensiveManagement')}
                </p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="gap-2 bg-white shadow-md hover:shadow-lg">
                  <Download className="w-4 h-4" />
                  {t('common.export')}
                </Button>
                <Button 
                  onClick={() => setShowAddPatientForm(true)}
                  className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl"
                >
                  <Plus className="w-4 h-4" />
                  {t('common.add')} {t('navigation.patients')}
                </Button>
              </div>
            </div>
          </div>

          {/* Main Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-blue-500 to-cyan-600 border-0 shadow-xl">
              <CardContent className="p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6" />
                  </div>
                  <Badge className="bg-white/20 text-white border-0">+12%</Badge>
                </div>
                <p className="text-sm text-blue-100 mb-1">{t('patients.totalPatients')}</p>
                <p className="text-3xl font-bold">12,847</p>
                <p className="text-xs text-blue-100 mt-2">{t('patients.active')}: 9,234</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-500 to-emerald-600 border-0 shadow-xl">
              <CardContent className="p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <Badge className="bg-white/20 text-white border-0">{t('patients.today')}</Badge>
                </div>
                <p className="text-sm text-green-100 mb-1">{t('patients.appointmentsToday')}</p>
                <p className="text-3xl font-bold">143</p>
                <p className="text-xs text-green-100 mt-2">37 {t('patients.pending')}</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-500 to-red-600 border-0 shadow-xl">
              <CardContent className="p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <Activity className="w-6 h-6" />
                  </div>
                  <Badge className="bg-white/20 text-white border-0">{t('patients.activeStatus')}</Badge>
                </div>
                <p className="text-sm text-orange-100 mb-1">{t('patients.currentAdmissions')}</p>
                <p className="text-3xl font-bold">68</p>
                <p className="text-xs text-orange-100 mt-2">12 {t('dashboard.icu')}</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-500 to-pink-600 border-0 shadow-xl">
              <CardContent className="p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6" />
                  </div>
                  <Badge className="bg-white/20 text-white border-0 animate-pulse">3 {t('patients.urgent')}</Badge>
                </div>
                <p className="text-sm text-purple-100 mb-1">{t('patients.waitingList')}</p>
                <p className="text-3xl font-bold">24</p>
                <p className="text-xs text-purple-100 mt-2">{t('patients.avgWaitTime')}: 25 {t('patients.minutes')}</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="bg-white/80 backdrop-blur-md border border-slate-200 p-1 rounded-xl shadow-lg">
              <TabsTrigger value="overview" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg px-6">
                <Users className="w-4 h-4 ml-2" />
                {t('patients.overview')}
              </TabsTrigger>
              <TabsTrigger value="all" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg px-6">
                <ClipboardList className="w-4 h-4 ml-2" />
                {t('patients.allPatients')}
              </TabsTrigger>
              <TabsTrigger value="appointments" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg px-6">
                <Calendar className="w-4 h-4 ml-2" />
                {t('patients.appointments')}
              </TabsTrigger>
              <TabsTrigger value="admissions" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg px-6">
                <Activity className="w-4 h-4 ml-2" />
                {t('patients.admissions')}
              </TabsTrigger>
              <TabsTrigger value="waiting" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg px-6">
                <Clock className="w-4 h-4 ml-2" />
                {t('patients.waitingList')}
              </TabsTrigger>
              <TabsTrigger value="vitals" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg px-6">
                <Activity className="w-4 h-4 ml-2" />
                {t('patients.vitalSigns')}
              </TabsTrigger>
              <TabsTrigger value="billing" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg px-6">
                <FileText className="w-4 h-4 ml-2" />
                {t('patients.billing')}
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {/* Demographics */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-white/80 backdrop-blur-md border-slate-200 shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-blue-600" />
                      {t('patients.ageDistribution')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {demographics.ageGroups.map((group, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-medium text-slate-700">{group.range} {t('patients.years')}</span>
                            <span className="text-slate-600">{group.count.toLocaleString()} ({group.percentage}%)</span>
                          </div>
                          <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-500"
                              style={{ width: `${group.percentage * 5}%` }}
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
                      <FileText className="w-5 h-5 text-blue-600" />
                      {t('patients.insuranceProviders')}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {demographics.insuranceProviders.map((provider, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gradient-to-r from-slate-50 to-slate-100 rounded-lg border border-slate-200">
                          <div>
                            <p className="font-semibold text-slate-900">{provider.provider}</p>
                            <p className="text-xs text-slate-600">{provider.patients.toLocaleString()} {t('patients.patient')}</p>
                          </div>
                          <Badge variant="outline">{provider.percentage}%</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <Card className="bg-white/80 backdrop-blur-md border-slate-200 shadow-xl">
                <CardHeader>
                  <CardTitle>{t('patients.quickActions')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button className="h-20 bg-gradient-to-r from-blue-600 to-cyan-600 hover:shadow-lg transition-all">
                      <div className="flex flex-col items-center gap-2">
                        <UserPlus className="w-6 h-6" />
                        <span>{t('patients.registerNewPatient')}</span>
                      </div>
                    </Button>
                    <Button className="h-20 bg-gradient-to-r from-green-600 to-emerald-600 hover:shadow-lg transition-all">
                      <div className="flex flex-col items-center gap-2">
                        <Calendar className="w-6 h-6" />
                        <span>{t('patients.bookAppointment')}</span>
                      </div>
                    </Button>
                    <Button className="h-20 bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-lg transition-all">
                      <div className="flex flex-col items-center gap-2">
                        <Activity className="w-6 h-6" />
                        <span>{t('patients.quickEmergency')}</span>
                      </div>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

          {/* All Patients Tab */}
          <TabsContent value="all" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{t('patients.patientRegistry')}</CardTitle>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                      <input
                        type="text"
                        placeholder={t('common.search')}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">{t('common.all')} {t('common.status')}</option>
                      <option value="active">{t('patients.active')}</option>
                      <option value="inactive">{t('patients.inactive')}</option>
                      <option value="pending">{t('patients.pending')}</option>
                    </select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">{t('patients.mrn')}</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">{t('common.name')}</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">{t('patients.age')}/{t('patients.gender')}</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">{t('patients.bloodType')}</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">{t('patients.contact')}</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">{t('patients.insurance')}</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">{t('common.status')}</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">{t('common.actions')}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredPatients.map((patient) => (
                        <tr key={patient.id} className="hover:bg-slate-50">
                          <td className="py-3 px-4">
                            <span className="text-sm font-medium text-slate-900">{patient.mrn}</span>
                          </td>
                          <td className="py-3 px-4">
                            <div>
                              <p className="text-sm font-medium text-slate-900">{patient.name}</p>
                              <p className="text-xs text-slate-500">{patient.department}</p>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-sm text-slate-700">{patient.age}Y / {patient.gender}</span>
                          </td>
                          <td className="py-3 px-4">
                            <Badge variant="outline">{patient.bloodType}</Badge>
                          </td>
                          <td className="py-3 px-4">
                            <div className="text-xs text-slate-600">
                              <p>{patient.phone}</p>
                              <p className="text-slate-500">{patient.email}</p>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="text-xs">
                              <p className="font-medium text-slate-700">{patient.insurance}</p>
                              <p className="text-slate-500">{patient.insuranceNumber}</p>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <Badge 
                              variant={patient.status === "active" ? "default" : patient.status === "pending" ? "secondary" : "outline"}
                            >
                              {patient.status}
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

          {/* Appointments Tab */}
          <TabsContent value="appointments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{t('patients.appointmentsToday')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {appointments.map((apt) => (
                    <div key={apt.id} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Calendar className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">{apt.patientName}</p>
                          <p className="text-sm text-slate-600">{apt.department} - {apt.doctor}</p>
                          <p className="text-xs text-slate-500">{apt.date} at {apt.time}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge>{apt.type}</Badge>
                        <Badge variant={apt.status === "Scheduled" ? "secondary" : "default"}>
                          {apt.status}
                        </Badge>
                        <Button variant="outline" size="sm">View</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Admissions Tab */}
          <TabsContent value="admissions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{t('patients.currentAdmissions')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {admissions.map((adm) => (
                    <div key={adm.id} className="p-4 border border-slate-200 rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="font-semibold text-slate-900">{adm.patientName}</p>
                          <p className="text-sm text-slate-600">{adm.diagnosis}</p>
                        </div>
                        <Badge variant="default">{adm.status}</Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-slate-500">{t('patients.ward')}</p>
                          <p className="font-medium">{adm.ward}</p>
                        </div>
                        <div>
                          <p className="text-slate-500">{t('patients.roomNumber')}/{t('dashboard.beds')}</p>
                          <p className="font-medium">{adm.room} - {t('dashboard.beds')} {adm.bed}</p>
                        </div>
                        <div>
                          <p className="text-slate-500">{t('patients.admissionDate')}</p>
                          <p className="font-medium">{adm.admissionDate}</p>
                        </div>
                        <div>
                          <p className="text-slate-500">{t('patients.doctor')}</p>
                          <p className="font-medium">{adm.admittingDoctor}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Waiting List Tab */}
          <TabsContent value="waiting" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{t('patients.waitingList')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {waitingList.map((wait) => (
                    <div key={wait.id} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-slate-400" />
                        <div>
                          <p className="font-medium text-slate-900">{wait.patientName}</p>
                          <p className="text-sm text-slate-600">{wait.department}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant={wait.priority === "High" ? "destructive" : wait.priority === "Medium" ? "secondary" : "outline"}>
                          {wait.priority}
                        </Badge>
                        <div className="text-right text-sm">
                          <p className="text-slate-600">{t('patients.since')} {wait.waitingSince}</p>
                          <p className="text-slate-500">~{wait.estimatedWait}</p>
                        </div>
                        <Button size="sm">{t('patients.call')}</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Vital Signs Tab */}
          <TabsContent value="vitals" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-md border-slate-200 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-blue-600" />
                  {t('patients.vitalSignsMonitoring')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {vitalSigns.map((vital, index) => (
                    <div key={index} className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl p-6 border border-slate-200">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-bold text-slate-900 text-lg">{vital.patientName}</h3>
                          <p className="text-sm text-slate-600">{vital.timestamp}</p>
                        </div>
                        <Badge className={vital.status === "Normal" ? "bg-green-100 text-green-700 border-0" : "bg-orange-100 text-orange-700 border-0"}>
                          {vital.status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        <div className="bg-gradient-to-br from-red-50 to-pink-50 p-4 rounded-lg border border-red-200">
                          <p className="text-xs text-red-600 mb-1">{t('patients.bloodPressure')}</p>
                          <p className="text-2xl font-bold text-red-700">{vital.bloodPressure}</p>
                          <p className="text-xs text-red-600 mt-1">mmHg</p>
                        </div>
                        <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-4 rounded-lg border border-orange-200">
                          <p className="text-xs text-orange-600 mb-1">{t('patients.heartRate')}</p>
                          <p className="text-2xl font-bold text-orange-700">{vital.heartRate}</p>
                          <p className="text-xs text-orange-600 mt-1">BPM</p>
                        </div>
                        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-4 rounded-lg border border-yellow-200">
                          <p className="text-xs text-yellow-700 mb-1">{t('patients.temperature')}</p>
                          <p className="text-2xl font-bold text-yellow-800">{vital.temperature}</p>
                          <p className="text-xs text-yellow-700 mt-1">°C</p>
                        </div>
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
                          <p className="text-xs text-green-600 mb-1">{t('patients.oxygen')}</p>
                          <p className="text-2xl font-bold text-green-700">{vital.oxygenLevel}</p>
                          <p className="text-xs text-green-600 mt-1">%</p>
                        </div>
                        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-lg border border-blue-200">
                          <p className="text-xs text-blue-600 mb-1">{t('patients.respiration')}</p>
                          <p className="text-2xl font-bold text-blue-700">{vital.respiratoryRate}</p>
                          <p className="text-xs text-blue-600 mt-1">/min</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Billing Tab */}
          <TabsContent value="billing" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-md border-slate-200 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  {t('patients.billingFinancialRecords')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {billing.map((bill) => (
                    <div key={bill.id} className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl p-6 border border-slate-200">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-bold text-slate-900">{bill.patientName}</h3>
                          <p className="text-sm text-slate-600">{bill.id} - {bill.date}</p>
                        </div>
                        <Badge className={bill.status === "Paid" ? "bg-green-100 text-green-700 border-0" : "bg-yellow-100 text-yellow-700 border-0"}>
                          {bill.status}
                        </Badge>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm text-slate-600 mb-2">{t('patients.services')}:</p>
                        <div className="flex flex-wrap gap-2">
                          {bill.services.map((service, idx) => (
                            <Badge key={idx} variant="outline">{service}</Badge>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-300">
                        <div>
                          <p className="text-xs text-slate-600 mb-1">{t('patients.totalAmount')}</p>
                          <p className="text-lg font-bold text-slate-900">{bill.totalAmount.toLocaleString()} {t('patients.sar')}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-600 mb-1">{t('patients.insuranceCoverage')}</p>
                          <p className="text-lg font-bold text-green-600">{bill.insuranceCoverage.toLocaleString()} {t('patients.sar')}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-600 mb-1">{t('patients.patientDue')}</p>
                          <p className="text-lg font-bold text-blue-600">{bill.patientDue.toLocaleString()} {t('patients.sar')}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Financial Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <p className="text-sm text-green-700 mb-1">{t('patients.totalPayments')}</p>
                  <p className="text-3xl font-bold text-green-700">4,750 {t('patients.sar')}</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Clock className="w-6 h-6 text-yellow-600" />
                  </div>
                  <p className="text-sm text-yellow-700 mb-1">{t('patients.pendingPayments')}</p>
                  <p className="text-3xl font-bold text-yellow-700">1,250 {t('patients.sar')}</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Activity className="w-6 h-6 text-blue-600" />
                  </div>
                  <p className="text-sm text-blue-700 mb-1">{t('patients.insuranceCoverage')}</p>
                  <p className="text-3xl font-bold text-blue-700">4,200 {t('patients.sar')}</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
        </div>
      </div>

      {/* Add Patient Form Modal */}
      {showAddPatientForm && (
        <AddPatientForm
          onClose={() => setShowAddPatientForm(false)}
          onSubmit={handleAddPatient}
        />
      )}
    </Layout>
  );
}
