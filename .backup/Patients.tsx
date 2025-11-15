import Layout from "@/components/Layout";
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
  const statusConfig = {
    active: { bg: "bg-green-100", text: "text-green-800", badge: "Active" },
    inactive: { bg: "bg-slate-100", text: "text-slate-800", badge: "Inactive" },
    pending: { bg: "bg-yellow-100", text: "text-yellow-800", badge: "Pending" },
  };

  const config = statusConfig[status];

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{name}</h3>
          <p className="text-sm text-slate-500">Patient ID: {id}</p>
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
          <span>years old</span>
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
          Last visit: {lastVisit}
        </div>
      </div>

      <button className="w-full bg-blue-50 hover:bg-blue-100 text-blue-600 font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-2">
        View Details <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default function Patients() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

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
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Patient Management</h1>
            <p className="text-slate-600 mt-1">
              Comprehensive patient records, appointments, and admissions
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Export
            </Button>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Register Patient
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Patients</p>
                  <p className="text-2xl font-bold text-slate-900">12,847</p>
                  <p className="text-xs text-green-600 mt-1">↑ 12% from last month</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Today's Appointments</p>
                  <p className="text-2xl font-bold text-slate-900">143</p>
                  <p className="text-xs text-slate-500 mt-1">37 pending</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Current Admissions</p>
                  <p className="text-2xl font-bold text-slate-900">68</p>
                  <p className="text-xs text-orange-600 mt-1">12 in ICU</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Activity className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Waiting List</p>
                  <p className="text-2xl font-bold text-slate-900">24</p>
                  <p className="text-xs text-red-600 mt-1">3 high priority</p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Patients</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="admissions">Admissions</TabsTrigger>
            <TabsTrigger value="waiting">Waiting List</TabsTrigger>
            <TabsTrigger value="emergency">Emergency</TabsTrigger>
          </TabsList>

          {/* All Patients Tab */}
          <TabsContent value="all" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Patient Registry</CardTitle>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Search patients..."
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
                      <option value="all">All Status</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="pending">Pending</option>
                    </select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">MRN</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Patient Name</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Age/Gender</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Blood Type</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Contact</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Insurance</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Status</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Actions</th>
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
                <CardTitle>Today's Appointments</CardTitle>
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
                <CardTitle>Current Admissions</CardTitle>
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
                          <p className="text-slate-500">Ward</p>
                          <p className="font-medium">{adm.ward}</p>
                        </div>
                        <div>
                          <p className="text-slate-500">Room/Bed</p>
                          <p className="font-medium">{adm.room} - Bed {adm.bed}</p>
                        </div>
                        <div>
                          <p className="text-slate-500">Admitted</p>
                          <p className="font-medium">{adm.admissionDate}</p>
                        </div>
                        <div>
                          <p className="text-slate-500">Doctor</p>
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
                <CardTitle>Current Waiting List</CardTitle>
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
                          <p className="text-slate-600">Since {wait.waitingSince}</p>
                          <p className="text-slate-500">~{wait.estimatedWait}</p>
                        </div>
                        <Button size="sm">Call</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Emergency Tab */}
          <TabsContent value="emergency" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Emergency Cases</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-slate-500">
                  <AlertCircle className="w-12 h-12 mx-auto mb-3 text-slate-400" />
                  <p>No active emergency cases at the moment</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
