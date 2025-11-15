import Layout from "@/components/Layout";
import {
  Bed,
  Building2,
  Users,
  Activity,
  Plus,
  Search,
  Filter,
  DoorOpen,
  CheckCircle2,
  XCircle,
  Clock,
  Thermometer,
  Droplets,
  Wind,
  AlertCircle,
  Trash2,
  Edit,
  Eye,
  BedDouble,
  Zap,
  Wifi,
  Tv,
  Phone,
  MapPin,
  BarChart3,
  TrendingUp,
  Calendar,
  ClipboardList,
  Wrench,
  Package,
  UserCheck,
  ArrowUpRight,
  ArrowDownRight,
  Shield,
  Sparkles,
  Bed as BedIcon,
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
import { Switch } from "@/components/ui/switch";

export default function Rooms() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [isAddRoomDialogOpen, setIsAddRoomDialogOpen] = useState(false);
  const [newRoomForm, setNewRoomForm] = useState({
    roomNumber: "",
    type: "single",
    floor: "",
    department: "",
    hasOxygen: false,
    hasMonitor: false,
    hasWifi: false,
    hasTv: false,
    hasPhone: false,
    pricePerNight: ""
  });
  const [selectedType, setSelectedType] = useState("all");

  const rooms = [
    {
      id: "R001",
      roomNumber: "101",
      building: "Building A",
      floor: "1st Floor",
      wing: "North Wing",
      type: "Private",
      department: "Cardiology",
      status: "Occupied",
      bedCount: 1,
      occupiedBeds: 1,
      currentPatient: "Ahmed Mohammed (P001)",
      admissionDate: "2024-11-10",
      assignedNurse: "Nurse Fatima",
      assignedDoctor: "Dr. Hassan Al-Rashid",
      dailyRate: 800,
      amenities: ["AC", "TV", "WiFi", "Private Bathroom", "Phone"],
      roomCondition: "Excellent",
      lastCleaned: "2024-11-14 08:00",
      nextCleaning: "2024-11-14 16:00",
      environmentalControls: {
        temperature: 22,
        humidity: 45,
        oxygenLevel: 98,
      },
      specialEquipment: ["Cardiac Monitor", "IV Stand", "Patient Call System"],
      features: {
        ac: true,
        tv: true,
        wifi: true,
        phone: true,
        bathroom: true,
        window: true,
      },
    },
    {
      id: "R002",
      roomNumber: "102",
      building: "Building A",
      floor: "1st Floor",
      wing: "North Wing",
      type: "Semi-Private",
      department: "Internal Medicine",
      status: "Occupied",
      bedCount: 2,
      occupiedBeds: 2,
      currentPatient: "Multiple Patients",
      admissionDate: "2024-11-12",
      assignedNurse: "Nurse Layla",
      assignedDoctor: "Dr. Khalid Omar",
      dailyRate: 500,
      amenities: ["AC", "TV", "WiFi", "Shared Bathroom"],
      roomCondition: "Good",
      lastCleaned: "2024-11-14 06:00",
      nextCleaning: "2024-11-14 14:00",
      environmentalControls: {
        temperature: 23,
        humidity: 50,
        oxygenLevel: 97,
      },
      specialEquipment: ["IV Stands (2)", "Patient Call Systems (2)"],
      features: {
        ac: true,
        tv: true,
        wifi: true,
        phone: false,
        bathroom: true,
        window: true,
      },
    },
    {
      id: "R003",
      roomNumber: "103",
      building: "Building A",
      floor: "1st Floor",
      wing: "North Wing",
      type: "Private",
      department: "Neurology",
      status: "Available",
      bedCount: 1,
      occupiedBeds: 0,
      currentPatient: null,
      admissionDate: null,
      assignedNurse: null,
      assignedDoctor: null,
      dailyRate: 850,
      amenities: ["AC", "TV", "WiFi", "Private Bathroom", "Phone", "Refrigerator"],
      roomCondition: "Excellent",
      lastCleaned: "2024-11-14 10:00",
      nextCleaning: "2024-11-15 10:00",
      environmentalControls: {
        temperature: 22,
        humidity: 45,
        oxygenLevel: 98,
      },
      specialEquipment: ["Neurological Monitoring System", "IV Stand", "Adjustable Bed"],
      features: {
        ac: true,
        tv: true,
        wifi: true,
        phone: true,
        bathroom: true,
        window: true,
      },
    },
    {
      id: "R004",
      roomNumber: "201",
      building: "Building B",
      floor: "2nd Floor",
      wing: "South Wing",
      type: "ICU",
      department: "Intensive Care",
      status: "Occupied",
      bedCount: 1,
      occupiedBeds: 1,
      currentPatient: "Critical Patient (P045)",
      admissionDate: "2024-11-13",
      assignedNurse: "ICU Nurse Team",
      assignedDoctor: "Dr. Mariam Saleh",
      dailyRate: 2500,
      amenities: ["Advanced Life Support", "24/7 Monitoring", "Ventilator Access"],
      roomCondition: "Sterile",
      lastCleaned: "2024-11-14 04:00",
      nextCleaning: "2024-11-14 12:00",
      environmentalControls: {
        temperature: 21,
        humidity: 40,
        oxygenLevel: 100,
      },
      specialEquipment: [
        "Ventilator",
        "Cardiac Monitor",
        "Defibrillator",
        "IV Pumps (4)",
        "Central Line Access",
      ],
      features: {
        ac: true,
        tv: false,
        wifi: false,
        phone: true,
        bathroom: false,
        window: false,
      },
    },
    {
      id: "R005",
      roomNumber: "202",
      building: "Building B",
      floor: "2nd Floor",
      wing: "South Wing",
      type: "Ward",
      department: "General Surgery",
      status: "Occupied",
      bedCount: 4,
      occupiedBeds: 3,
      currentPatient: "Multiple Patients",
      admissionDate: "2024-11-11",
      assignedNurse: "Ward Nurses Team",
      assignedDoctor: "Dr. Mohammed Al-Harbi",
      dailyRate: 300,
      amenities: ["AC", "Shared TV", "Shared Bathrooms"],
      roomCondition: "Good",
      lastCleaned: "2024-11-14 07:00",
      nextCleaning: "2024-11-14 15:00",
      environmentalControls: {
        temperature: 24,
        humidity: 55,
        oxygenLevel: 96,
      },
      specialEquipment: ["IV Stands (4)", "Patient Call Systems (4)", "Privacy Curtains"],
      features: {
        ac: true,
        tv: true,
        wifi: false,
        phone: false,
        bathroom: true,
        window: true,
      },
    },
    {
      id: "R006",
      roomNumber: "301",
      building: "Building C",
      floor: "3rd Floor",
      wing: "East Wing",
      type: "VIP Suite",
      department: "VIP Services",
      status: "Available",
      bedCount: 1,
      occupiedBeds: 0,
      currentPatient: null,
      admissionDate: null,
      assignedNurse: null,
      assignedDoctor: null,
      dailyRate: 3500,
      amenities: [
        "Premium AC",
        "Smart TV",
        "High-Speed WiFi",
        "Private Bathroom with Jacuzzi",
        "Phone",
        "Refrigerator",
        "Microwave",
        "Sofa Bed",
        "Safe",
      ],
      roomCondition: "Luxury",
      lastCleaned: "2024-11-14 09:00",
      nextCleaning: "2024-11-15 09:00",
      environmentalControls: {
        temperature: 22,
        humidity: 45,
        oxygenLevel: 98,
      },
      specialEquipment: [
        "Electric Adjustable Bed",
        "Advanced Monitoring System",
        "Entertainment System",
      ],
      features: {
        ac: true,
        tv: true,
        wifi: true,
        phone: true,
        bathroom: true,
        window: true,
      },
    },
    {
      id: "R007",
      roomNumber: "104",
      building: "Building A",
      floor: "1st Floor",
      wing: "North Wing",
      type: "Isolation",
      department: "Infectious Diseases",
      status: "Under Maintenance",
      bedCount: 1,
      occupiedBeds: 0,
      currentPatient: null,
      admissionDate: null,
      assignedNurse: null,
      assignedDoctor: null,
      dailyRate: 1200,
      amenities: ["HEPA Filtration", "Negative Pressure", "Airlock Entry", "Private Bathroom"],
      roomCondition: "Under Maintenance",
      lastCleaned: "2024-11-13 20:00",
      nextCleaning: "After Maintenance",
      environmentalControls: {
        temperature: 20,
        humidity: 40,
        oxygenLevel: 99,
      },
      specialEquipment: [
        "Isolation Equipment",
        "PPE Station",
        "Advanced Air Filtration",
        "Contamination Control",
      ],
      features: {
        ac: true,
        tv: false,
        wifi: false,
        phone: true,
        bathroom: true,
        window: false,
      },
    },
    {
      id: "R008",
      roomNumber: "401",
      building: "Building D",
      floor: "4th Floor",
      wing: "West Wing",
      type: "Maternity",
      department: "Obstetrics",
      status: "Occupied",
      bedCount: 1,
      occupiedBeds: 1,
      currentPatient: "Fatima Al-Rashid (P002)",
      admissionDate: "2024-11-10",
      assignedNurse: "Maternity Nurse Sara",
      assignedDoctor: "Dr. Layla Mahmoud",
      dailyRate: 900,
      amenities: [
        "AC",
        "TV",
        "WiFi",
        "Private Bathroom",
        "Baby Crib",
        "Rocking Chair",
        "Phone",
      ],
      roomCondition: "Excellent",
      lastCleaned: "2024-11-14 06:30",
      nextCleaning: "2024-11-14 14:30",
      environmentalControls: {
        temperature: 23,
        humidity: 50,
        oxygenLevel: 98,
      },
      specialEquipment: [
        "Fetal Monitor",
        "Baby Warmer",
        "Infant Resuscitation Equipment",
        "Mother Monitoring System",
      ],
      features: {
        ac: true,
        tv: true,
        wifi: true,
        phone: true,
        bathroom: true,
        window: true,
      },
    },
  ];

  const buildings = [
    {
      id: "B001",
      name: "Building A",
      floors: 5,
      totalRooms: 60,
      occupiedRooms: 45,
      departments: ["Cardiology", "Neurology", "Internal Medicine"],
      facilities: ["Emergency Exit", "Elevator", "Stairs", "Nursing Station"],
    },
    {
      id: "B002",
      name: "Building B",
      floors: 4,
      totalRooms: 48,
      occupiedRooms: 38,
      departments: ["ICU", "General Surgery", "Orthopedics"],
      facilities: ["Emergency Exit", "Elevator", "Stairs", "Nursing Station", "OR Access"],
    },
    {
      id: "B003",
      name: "Building C",
      floors: 6,
      totalRooms: 40,
      occupiedRooms: 25,
      departments: ["VIP Services", "Ophthalmology", "Pediatrics"],
      facilities: [
        "Emergency Exit",
        "Elevator",
        "Stairs",
        "Private Lounge",
        "Concierge Service",
      ],
    },
    {
      id: "B004",
      name: "Building D",
      floors: 5,
      totalRooms: 50,
      occupiedRooms: 42,
      departments: ["Maternity", "Neonatal", "Gynecology"],
      facilities: ["Emergency Exit", "Elevator", "Stairs", "Labor Rooms", "NICU Access"],
    },
  ];

  const cleaningSchedule = [
    {
      id: "CS001",
      roomNumber: "101",
      building: "Building A",
      scheduledTime: "2024-11-14 16:00",
      assignedStaff: "Cleaning Team A",
      status: "Scheduled",
      estimatedDuration: "30 mins",
    },
    {
      id: "CS002",
      roomNumber: "102",
      building: "Building A",
      scheduledTime: "2024-11-14 14:00",
      assignedStaff: "Cleaning Team B",
      status: "In Progress",
      estimatedDuration: "45 mins",
    },
    {
      id: "CS003",
      roomNumber: "201",
      building: "Building B",
      scheduledTime: "2024-11-14 12:00",
      assignedStaff: "ICU Cleaning Team",
      status: "Scheduled",
      estimatedDuration: "60 mins",
    },
  ];

  const filteredRooms = rooms.filter((room) => {
    const matchesSearch =
      room.roomNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.building.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.department.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = selectedStatus === "all" || room.status === selectedStatus;
    const matchesType = selectedType === "all" || room.type === selectedType;

    return matchesSearch && matchesStatus && matchesType;
  });

  const totalRooms = rooms.length;
  const occupiedRooms = rooms.filter((r) => r.status === "Occupied").length;
  const availableRooms = rooms.filter((r) => r.status === "Available").length;
  const maintenanceRooms = rooms.filter((r) => r.status === "Under Maintenance").length;

  const totalBeds = rooms.reduce((sum, r) => sum + r.bedCount, 0);
  const occupiedBeds = rooms.reduce((sum, r) => sum + r.occupiedBeds, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Occupied":
        return "destructive";
      case "Available":
        return "default";
      case "Under Maintenance":
        return "secondary";
      default:
        return "outline";
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Enhanced Gradient Header */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 p-8 shadow-2xl">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                    <DoorOpen className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold text-white mb-1">
                      {t('rooms.comprehensiveManagement')}
                    </h1>
                    <p className="text-blue-100 text-lg">
                      {t('rooms.subtitle')}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="secondary" className="gap-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/30">
                  <Filter className="w-4 h-4" />
                  {t('common.filter')}
                </Button>
                <Button className="gap-2 bg-white text-indigo-600 hover:bg-blue-50" onClick={() => setIsAddRoomDialogOpen(true)}>
                  <Plus className="w-4 h-4" />
                  {t('rooms.addRoom')}
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
                  <p className="text-sm font-medium text-slate-600 mb-1">{t('rooms.totalRooms')}</p>
                  <p className="text-4xl font-bold text-slate-900 mb-2">{totalRooms}</p>
                  <div className="flex items-center gap-1 text-xs">
                    <TrendingUp className="w-3 h-3 text-green-600" />
                    <span className="text-green-600 font-medium">+4 {t('common.thisMonth')}</span>
                  </div>
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <DoorOpen className="w-8 h-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-red-50 to-pink-50">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full -mr-16 -mt-16"></div>
            <CardContent className="pt-6 relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">{t('rooms.occupancy')}</p>
                  <p className="text-4xl font-bold text-slate-900 mb-2">
                    {Math.round((occupiedRooms / totalRooms) * 100)}%
                  </p>
                  <div className="flex items-center gap-1 text-xs">
                    <span className="text-slate-600">{occupiedRooms}/{totalRooms} {t('rooms.occupied')}</span>
                  </div>
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Bed className="w-8 h-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-green-50 to-emerald-50">
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full -mr-16 -mt-16"></div>
            <CardContent className="pt-6 relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">{t('rooms.availableBeds')}</p>
                  <p className="text-4xl font-bold text-slate-900 mb-2">{totalBeds - occupiedBeds}</p>
                  <div className="flex items-center gap-1 text-xs">
                    <span className="text-green-600 font-medium">{t('rooms.readyForAdmission')}</span>
                  </div>
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <BedDouble className="w-8 h-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-0 shadow-xl bg-gradient-to-br from-orange-50 to-amber-50">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full -mr-16 -mt-16"></div>
            <CardContent className="pt-6 relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 mb-1">{t('rooms.avgStayDuration')}</p>
                  <p className="text-4xl font-bold text-slate-900 mb-2">4.2</p>
                  <div className="flex items-center gap-1 text-xs">
                    <ArrowDownRight className="w-3 h-3 text-orange-600" />
                    <span className="text-orange-600 font-medium">-0.5 {t('common.days')}</span>
                  </div>
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-8 lg:w-auto">
            <TabsTrigger value="overview">{t('rooms.overview')}</TabsTrigger>
            <TabsTrigger value="all">{t('rooms.allRooms')}</TabsTrigger>
            <TabsTrigger value="beds">{t('rooms.bedManagement')}</TabsTrigger>
            <TabsTrigger value="occupancy">{t('rooms.occupancyTracking')}</TabsTrigger>
            <TabsTrigger value="buildings">{t('rooms.buildings')}</TabsTrigger>
            <TabsTrigger value="cleaning">{t('rooms.cleaning')}</TabsTrigger>
            <TabsTrigger value="maintenance">{t('rooms.maintenance')}</TabsTrigger>
            <TabsTrigger value="analytics">{t('rooms.analytics')}</TabsTrigger>
          </TabsList>

          {/* Overview Tab - NEW */}
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Real-time Occupancy Status */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-blue-600" />
                    {t('rooms.realtimeStatus')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                          <CheckCircle2 className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">{t('rooms.available')}</p>
                          <p className="text-sm text-slate-600">{t('rooms.readyForPatients')}</p>
                        </div>
                      </div>
                      <p className="text-3xl font-bold text-green-600">{availableRooms}</p>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                          <Bed className="w-6 h-6 text-red-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">{t('rooms.occupied')}</p>
                          <p className="text-sm text-slate-600">{t('rooms.currentlyInUse')}</p>
                        </div>
                      </div>
                      <p className="text-3xl font-bold text-red-600">{occupiedRooms}</p>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                          <Wrench className="w-6 h-6 text-orange-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">{t('rooms.underMaintenance')}</p>
                          <p className="text-sm text-slate-600">{t('rooms.beingServiced')}</p>
                        </div>
                      </div>
                      <p className="text-3xl font-bold text-orange-600">{maintenanceRooms}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Room Types Distribution */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-purple-600" />
                    {t('rooms.typeDistribution')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    {[
                      { type: 'Private', count: rooms.filter(r => r.type === 'Private').length, color: 'blue' },
                      { type: 'Semi-Private', count: rooms.filter(r => r.type === 'Semi-Private').length, color: 'green' },
                      { type: 'Ward', count: rooms.filter(r => r.type === 'Ward').length, color: 'purple' },
                      { type: 'ICU', count: rooms.filter(r => r.type === 'ICU').length, color: 'red' },
                      { type: 'VIP Suite', count: rooms.filter(r => r.type === 'VIP Suite').length, color: 'amber' },
                      { type: 'Isolation', count: rooms.filter(r => r.type === 'Isolation').length, color: 'orange' },
                      { type: 'Maternity', count: rooms.filter(r => r.type === 'Maternity').length, color: 'pink' },
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-slate-700">{item.type}</span>
                            <span className="text-sm font-bold text-slate-900">{item.count}</span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full bg-${item.color}-500`}
                              style={{ width: `${(item.count / totalRooms) * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions & Alerts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
                  <CardTitle className="text-lg">{t('rooms.quickAssign')}</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <Button className="w-full gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                    <UserCheck className="w-4 h-4" />
                    {t('rooms.assignPatient')}
                  </Button>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                  <CardTitle className="text-lg">{t('rooms.scheduleClean')}</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <Button className="w-full gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                    <Sparkles className="w-4 h-4" />
                    {t('rooms.scheduleCleaning')}
                  </Button>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50">
                  <CardTitle className="text-lg">{t('rooms.reportIssue')}</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <Button className="w-full gap-2 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700">
                    <AlertCircle className="w-4 h-4" />
                    {t('rooms.reportMaintenance')}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Bed Management Tab - NEW */}
          <TabsContent value="beds" className="space-y-4">
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50">
                <CardTitle className="flex items-center gap-2">
                  <BedIcon className="w-5 h-5 text-indigo-600" />
                  {t('rooms.individualBedTracking')}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {rooms.flatMap((room) => 
                    Array.from({ length: room.bedCount }, (_, bedIndex) => ({
                      roomId: room.id,
                      roomNumber: room.roomNumber,
                      building: room.building,
                      bedNumber: bedIndex + 1,
                      isOccupied: bedIndex < room.occupiedBeds,
                      patient: bedIndex === 0 && room.currentPatient ? room.currentPatient : null,
                      status: bedIndex < room.occupiedBeds ? 'Occupied' : 'Available',
                      type: room.type,
                    }))
                  ).map((bed, idx) => (
                    <div
                      key={idx}
                      className={`border-2 rounded-lg p-4 transition-all ${
                        bed.isOccupied
                          ? 'border-red-300 bg-red-50 hover:shadow-md'
                          : 'border-green-300 bg-green-50 hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-bold text-slate-900">
                            {t('rooms.bed')} {bed.bedNumber}
                          </h4>
                          <p className="text-sm text-slate-600">
                            {t('rooms.room')} {bed.roomNumber} - {bed.building}
                          </p>
                        </div>
                        <Badge variant={bed.isOccupied ? 'destructive' : 'default'}>
                          {bed.status}
                        </Badge>
                      </div>
                      
                      {bed.patient && (
                        <div className="bg-white/80 rounded p-2 mb-2 text-xs">
                          <p className="font-medium text-slate-900">{bed.patient}</p>
                        </div>
                      )}
                      
                      <div className="flex gap-1 mt-3">
                        <Button size="sm" variant="outline" className="flex-1 text-xs">
                          {bed.isOccupied ? t('rooms.transfer') : t('rooms.assign')}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Occupancy Tracking Tab - NEW */}
          <TabsContent value="occupancy" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Hourly Occupancy Trend */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-purple-600" />
                    {t('rooms.occupancyTrends')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    {[
                      { time: '00:00-06:00', occupancy: 92, available: 16 },
                      { time: '06:00-12:00', occupancy: 88, available: 24 },
                      { time: '12:00-18:00', occupancy: 85, available: 30 },
                      { time: '18:00-00:00', occupancy: 90, available: 20 },
                    ].map((slot, idx) => (
                      <div key={idx} className="p-3 bg-slate-50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-slate-700">{slot.time}</span>
                          <span className="text-lg font-bold text-slate-900">{slot.occupancy}%</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div
                            className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                            style={{ width: `${slot.occupancy}%` }}
                          />
                        </div>
                        <p className="text-xs text-slate-600 mt-1">
                          {slot.available} {t('rooms.bedsAvailable')}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Department Occupancy */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-blue-600" />
                    {t('rooms.departmentOccupancy')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    {[
                      { dept: 'Cardiology', total: 45, occupied: 38, rate: 84 },
                      { dept: 'ICU', total: 20, occupied: 19, rate: 95 },
                      { dept: 'Maternity', total: 30, occupied: 22, rate: 73 },
                      { dept: 'General Surgery', total: 50, occupied: 42, rate: 84 },
                      { dept: 'Pediatrics', total: 35, occupied: 28, rate: 80 },
                    ].map((dept, idx) => (
                      <div key={idx} className="p-3 border border-slate-200 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-semibold text-slate-900">{dept.dept}</span>
                          <Badge variant={dept.rate > 90 ? 'destructive' : dept.rate > 80 ? 'secondary' : 'default'}>
                            {dept.rate}%
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between text-xs text-slate-600">
                          <span>{dept.occupied}/{dept.total} {t('rooms.occupied')}</span>
                          <span>{dept.total - dept.occupied} {t('rooms.available')}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Capacity Forecast */}
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-green-600" />
                  {t('rooms.capacityForecast')}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-7 gap-2">
                  {[
                    { day: t('common.mon'), forecast: 85, trend: 'up' },
                    { day: t('common.tue'), forecast: 88, trend: 'up' },
                    { day: t('common.wed'), forecast: 82, trend: 'down' },
                    { day: t('common.thu'), forecast: 87, trend: 'up' },
                    { day: t('common.fri'), forecast: 79, trend: 'down' },
                    { day: t('common.sat'), forecast: 75, trend: 'down' },
                    { day: t('common.sun'), forecast: 80, trend: 'up' },
                  ].map((day, idx) => (
                    <div key={idx} className="text-center p-3 bg-slate-50 rounded-lg">
                      <p className="text-xs font-medium text-slate-600 mb-2">{day.day}</p>
                      <p className="text-2xl font-bold text-slate-900 mb-1">{day.forecast}%</p>
                      <div className="flex items-center justify-center">
                        {day.trend === 'up' ? (
                          <ArrowUpRight className="w-4 h-4 text-red-600" />
                        ) : (
                          <ArrowDownRight className="w-4 h-4 text-green-600" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* All Rooms Tab */}
          <TabsContent value="all" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{t('rooms.roomInventory')}</CardTitle>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                      <input
                        type="text"
                        placeholder={t('rooms.searchRooms')}
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
                      <option value="all">{t('rooms.allStatus')}</option>
                      <option value="Occupied">{t('rooms.occupied')}</option>
                      <option value="Available">{t('rooms.available')}</option>
                      <option value="Under Maintenance">{t('rooms.underMaintenance')}</option>
                    </select>
                    <select
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value)}
                      className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">{t('rooms.allTypes')}</option>
                      <option value="Private">{t('rooms.private')}</option>
                      <option value="Semi-Private">{t('rooms.semiPrivate')}</option>
                      <option value="Ward">{t('rooms.ward')}</option>
                      <option value="ICU">{t('rooms.icu')}</option>
                      <option value="VIP Suite">{t('rooms.vipSuite')}</option>
                      <option value="Isolation">{t('rooms.isolation')}</option>
                      <option value="Maternity">{t('rooms.maternity')}</option>
                    </select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredRooms.map((room) => (
                    <div
                      key={room.id}
                      className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-bold text-lg text-slate-900">
                            Room {room.roomNumber}
                          </h3>
                          <p className="text-sm text-slate-600">{room.building}</p>
                          <p className="text-xs text-slate-500">
                            {room.floor} - {room.wing}
                          </p>
                        </div>
                        <Badge variant={getStatusColor(room.status)}>{room.status}</Badge>
                      </div>

                      <div className="space-y-2 mb-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-600">{t('rooms.type')}</span>
                          <Badge variant="outline">{room.type}</Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-600">{t('rooms.department')}</span>
                          <span className="font-medium">{room.department}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-600">{t('dashboard.beds')}</span>
                          <span className="font-medium">
                            {room.occupiedBeds}/{room.bedCount}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-600">{t('rooms.dailyRate')}</span>
                          <span className="font-medium text-green-600">
                            SAR {room.dailyRate}
                          </span>
                        </div>
                      </div>

                      {room.currentPatient && (
                        <div className="bg-blue-50 rounded p-2 mb-3 text-xs">
                          <p className="font-medium text-blue-900">
                            {t('rooms.current')}: {room.currentPatient}
                          </p>
                          <p className="text-blue-700">{t('rooms.since')}: {room.admissionDate}</p>
                        </div>
                      )}

                      <div className="flex items-center gap-1 mb-3 flex-wrap">
                        {room.features.ac && (
                          <div className="w-6 h-6 bg-slate-100 rounded flex items-center justify-center">
                            <Wind className="w-3 h-3 text-slate-600" />
                          </div>
                        )}
                        {room.features.tv && (
                          <div className="w-6 h-6 bg-slate-100 rounded flex items-center justify-center">
                            <Tv className="w-3 h-3 text-slate-600" />
                          </div>
                        )}
                        {room.features.wifi && (
                          <div className="w-6 h-6 bg-slate-100 rounded flex items-center justify-center">
                            <Wifi className="w-3 h-3 text-slate-600" />
                          </div>
                        )}
                        {room.features.phone && (
                          <div className="w-6 h-6 bg-slate-100 rounded flex items-center justify-center">
                            <Phone className="w-3 h-3 text-slate-600" />
                          </div>
                        )}
                      </div>

                      <div className="flex gap-1">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="w-3 h-3 mr-1" />
                          {t('rooms.view')}
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Edit className="w-3 h-3 mr-1" />
                          {t('rooms.edit')}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Buildings Tab */}
          <TabsContent value="buildings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{t('rooms.hospitalBuildingsOverview')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {buildings.map((building) => {
                    const occupancyRate = Math.round(
                      (building.occupiedRooms / building.totalRooms) * 100
                    );

                    return (
                      <div key={building.id} className="border border-slate-200 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="font-bold text-lg">{building.name}</h3>
                            <p className="text-sm text-slate-600">
                              {building.floors} {t('rooms.floors')} - {building.totalRooms} {t('rooms.allRooms')}
                            </p>
                          </div>
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Building2 className="w-6 h-6 text-blue-600" />
                          </div>
                        </div>

                        <div className="space-y-3 mb-4">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-slate-600">{t('rooms.roomOccupancy')}</span>
                              <span className="font-medium">
                                {building.occupiedRooms}/{building.totalRooms} ({occupancyRate}%)
                              </span>
                            </div>
                            <div className="w-full bg-slate-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${
                                  occupancyRate > 85
                                    ? "bg-red-600"
                                    : occupancyRate > 70
                                    ? "bg-orange-600"
                                    : "bg-green-600"
                                }`}
                                style={{ width: `${occupancyRate}%` }}
                              />
                            </div>
                          </div>

                          <div>
                            <p className="text-sm font-semibold text-slate-900 mb-2">
                              {t('rooms.departments')}
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {building.departments.map((dept, idx) => (
                                <Badge key={idx} variant="outline">
                                  {dept}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div>
                            <p className="text-sm font-semibold text-slate-900 mb-2">
                              {t('rooms.facilities')}
                            </p>
                            <ul className="space-y-1">
                              {building.facilities.map((facility, idx) => (
                                <li key={idx} className="text-xs text-slate-600 flex gap-2">
                                  <CheckCircle2 className="w-3 h-3 text-green-600 flex-shrink-0 mt-0.5" />
                                  {facility}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Cleaning Schedule Tab */}
          <TabsContent value="cleaning" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{t('rooms.roomCleaning')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {cleaningSchedule.map((schedule) => (
                    <div
                      key={schedule.id}
                      className="flex items-center justify-between p-3 border border-slate-200 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-slate-400" />
                        <div>
                          <p className="font-medium text-slate-900">
                            Room {schedule.roomNumber} - {schedule.building}
                          </p>
                          <p className="text-sm text-slate-600">{schedule.assignedStaff}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right text-sm">
                          <p className="text-slate-600">{schedule.scheduledTime}</p>
                          <p className="text-slate-500">{schedule.estimatedDuration}</p>
                        </div>
                        <Badge
                          variant={
                            schedule.status === "In Progress" ? "default" : "secondary"
                          }
                        >
                          {schedule.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Amenities Tab */}
          <TabsContent value="amenities" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{t('rooms.roomAmenitiesComparison')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="text-left py-3 px-4 text-sm font-semibold">{t('common.name')}</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold">{t('rooms.type')}</th>
                        <th className="text-center py-3 px-4 text-sm font-semibold">AC</th>
                        <th className="text-center py-3 px-4 text-sm font-semibold">TV</th>
                        <th className="text-center py-3 px-4 text-sm font-semibold">WiFi</th>
                        <th className="text-center py-3 px-4 text-sm font-semibold">{t('common.name')}</th>
                        <th className="text-center py-3 px-4 text-sm font-semibold">
                          {t('rooms.bathroom')}
                        </th>
                        <th className="text-center py-3 px-4 text-sm font-semibold">{t('rooms.window')}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {rooms.map((room) => (
                        <tr key={room.id} className="hover:bg-slate-50">
                          <td className="py-3 px-4 text-sm font-medium">{room.roomNumber}</td>
                          <td className="py-3 px-4 text-sm">{room.type}</td>
                          <td className="py-3 px-4 text-center">
                            {room.features.ac ? (
                              <CheckCircle2 className="w-4 h-4 text-green-600 mx-auto" />
                            ) : (
                              <XCircle className="w-4 h-4 text-red-600 mx-auto" />
                            )}
                          </td>
                          <td className="py-3 px-4 text-center">
                            {room.features.tv ? (
                              <CheckCircle2 className="w-4 h-4 text-green-600 mx-auto" />
                            ) : (
                              <XCircle className="w-4 h-4 text-red-600 mx-auto" />
                            )}
                          </td>
                          <td className="py-3 px-4 text-center">
                            {room.features.wifi ? (
                              <CheckCircle2 className="w-4 h-4 text-green-600 mx-auto" />
                            ) : (
                              <XCircle className="w-4 h-4 text-red-600 mx-auto" />
                            )}
                          </td>
                          <td className="py-3 px-4 text-center">
                            {room.features.phone ? (
                              <CheckCircle2 className="w-4 h-4 text-green-600 mx-auto" />
                            ) : (
                              <XCircle className="w-4 h-4 text-red-600 mx-auto" />
                            )}
                          </td>
                          <td className="py-3 px-4 text-center">
                            {room.features.bathroom ? (
                              <CheckCircle2 className="w-4 h-4 text-green-600 mx-auto" />
                            ) : (
                              <XCircle className="w-4 h-4 text-red-600 mx-auto" />
                            )}
                          </td>
                          <td className="py-3 px-4 text-center">
                            {room.features.window ? (
                              <CheckCircle2 className="w-4 h-4 text-green-600 mx-auto" />
                            ) : (
                              <XCircle className="w-4 h-4 text-red-600 mx-auto" />
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Enhanced Maintenance Tab */}
          <TabsContent value="maintenance" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Active Maintenance */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50">
                  <CardTitle className="flex items-center gap-2">
                    <Wrench className="w-5 h-5 text-orange-600" />
                    {t('rooms.activeMaintenance')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  {maintenanceRooms === 0 ? (
                    <div className="text-center py-8 text-slate-500">
                      <CheckCircle2 className="w-12 h-12 mx-auto mb-3 text-green-400" />
                      <p>{t('rooms.allRoomsOperational')}</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {rooms
                        .filter((r) => r.status === "Under Maintenance")
                        .map((room) => (
                          <div
                            key={room.id}
                            className="border-2 border-orange-300 bg-orange-50 rounded-lg p-4"
                          >
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h4 className="font-bold text-slate-900">
                                  {t('rooms.room')} {room.roomNumber}
                                </h4>
                                <p className="text-sm text-slate-600">{room.building}</p>
                              </div>
                              <Badge variant="secondary">{t('rooms.underMaintenance')}</Badge>
                            </div>
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center gap-2 text-slate-700">
                                <Clock className="w-4 h-4" />
                                <span>{t('rooms.lastCleaned')}: {room.lastCleaned}</span>
                              </div>
                              <div className="flex items-center gap-2 text-slate-700">
                                <Calendar className="w-4 h-4" />
                                <span>{t('rooms.expectedCompletion')}: 2024-11-16</span>
                              </div>
                            </div>
                            <Button size="sm" variant="outline" className="w-full mt-3">
                              {t('rooms.viewDetails')}
                            </Button>
                          </div>
                        ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Scheduled Maintenance */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
                  <CardTitle className="flex items-center gap-2">
                    <ClipboardList className="w-5 h-5 text-blue-600" />
                    {t('rooms.scheduledMaintenance')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    {[
                      { room: '203', building: 'Building B', date: '2024-11-20', type: 'AC Service', priority: 'Medium' },
                      { room: '305', building: 'Building C', date: '2024-11-22', type: 'Plumbing', priority: 'High' },
                      { room: '107', building: 'Building A', date: '2024-11-25', type: 'Electrical', priority: 'Low' },
                      { room: '402', building: 'Building D', date: '2024-11-28', type: 'Painting', priority: 'Low' },
                    ].map((item, idx) => (
                      <div key={idx} className="p-3 border border-slate-200 rounded-lg hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <p className="font-semibold text-slate-900">
                              {t('rooms.room')} {item.room} - {item.building}
                            </p>
                            <p className="text-sm text-slate-600">{item.type}</p>
                          </div>
                          <Badge variant={item.priority === 'High' ? 'destructive' : item.priority === 'Medium' ? 'secondary' : 'outline'}>
                            {item.priority}
                          </Badge>
                        </div>
                        <p className="text-xs text-slate-500">{t('rooms.scheduled')}: {item.date}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Maintenance History */}
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-green-600" />
                  {t('rooms.maintenanceHistory')}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  {[
                    { room: '101', building: 'Building A', date: '2024-11-10', type: 'AC Repair', status: 'Completed', cost: 450 },
                    { room: '205', building: 'Building B', date: '2024-11-08', type: 'Bed Replacement', status: 'Completed', cost: 1200 },
                    { room: '310', building: 'Building C', date: '2024-11-05', type: 'TV Installation', status: 'Completed', cost: 800 },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-slate-900">
                          {t('rooms.room')} {item.room} - {item.type}
                        </p>
                        <p className="text-sm text-slate-600">{item.date}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="default" className="mb-1">{item.status}</Badge>
                        <p className="text-sm font-semibold text-green-600">SAR {item.cost}</p>
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
              {/* Revenue Analytics */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-green-600" />
                    {t('rooms.revenueAnalytics')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-slate-600">{t('rooms.dailyRevenue')}</p>
                      <p className="text-3xl font-bold text-green-600">SAR 28,450</p>
                      <div className="flex items-center gap-1 mt-1">
                        <TrendingUp className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-green-600">+12.5% {t('common.vsLastWeek')}</span>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-slate-200">
                      <p className="text-sm text-slate-600 mb-2">{t('rooms.monthlyRevenue')}</p>
                      <p className="text-2xl font-bold text-slate-900">SAR 856,200</p>
                    </div>
                    <div className="pt-4 border-t border-slate-200">
                      <p className="text-sm text-slate-600 mb-2">{t('rooms.avgRoomRate')}</p>
                      <p className="text-2xl font-bold text-slate-900">SAR 1,250</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Efficiency Metrics */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Activity className="w-5 h-5 text-blue-600" />
                    {t('rooms.efficiencyMetrics')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-slate-600 mb-1">{t('rooms.turnoverTime')}</p>
                      <p className="text-3xl font-bold text-blue-600">2.4h</p>
                      <p className="text-xs text-slate-500 mt-1">{t('rooms.avgCleaningTime')}</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="text-sm text-slate-600 mb-1">{t('rooms.utilizationRate')}</p>
                      <p className="text-3xl font-bold text-green-600">87%</p>
                      <p className="text-xs text-slate-500 mt-1">{t('rooms.lastMonth')}</p>
                    </div>
                    <div className="p-3 bg-orange-50 rounded-lg">
                      <p className="text-sm text-slate-600 mb-1">{t('rooms.avgStayDuration')}</p>
                      <p className="text-3xl font-bold text-orange-600">4.2 {t('common.days')}</p>
                      <p className="text-xs text-slate-500 mt-1">{t('rooms.perPatient')}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quality Indicators */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Shield className="w-5 h-5 text-purple-600" />
                    {t('rooms.qualityIndicators')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <span className="text-sm text-slate-700">{t('rooms.cleanlinessScore')}</span>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-purple-600">9.2/10</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <span className="text-sm text-slate-700">{t('rooms.patientSatisfaction')}</span>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-600">94%</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <span className="text-sm text-slate-700">{t('rooms.maintenanceResponse')}</span>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-blue-600">45min</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <span className="text-sm text-slate-700">{t('rooms.equipmentUptime')}</span>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-600">98.5%</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Performance Comparison */}
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50">
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-amber-600" />
                  {t('rooms.buildingPerformance')}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {buildings.map((building, idx) => {
                    const occupancyRate = Math.round((building.occupiedRooms / building.totalRooms) * 100);
                    const revenue = building.occupiedRooms * 1200 * 30;
                    
                    return (
                      <div key={idx} className="p-4 border border-slate-200 rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-bold text-slate-900">{building.name}</h4>
                          <Badge variant={occupancyRate > 85 ? 'destructive' : 'default'}>
                            {occupancyRate}% {t('rooms.occupancy')}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-4 gap-4 text-center">
                          <div>
                            <p className="text-xs text-slate-600 mb-1">{t('rooms.totalRooms')}</p>
                            <p className="text-lg font-bold text-slate-900">{building.totalRooms}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-600 mb-1">{t('rooms.occupied')}</p>
                            <p className="text-lg font-bold text-red-600">{building.occupiedRooms}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-600 mb-1">{t('rooms.available')}</p>
                            <p className="text-lg font-bold text-green-600">{building.totalRooms - building.occupiedRooms}</p>
                          </div>
                          <div>
                            <p className="text-xs text-slate-600 mb-1">{t('rooms.monthlyRevenue')}</p>
                            <p className="text-lg font-bold text-blue-600">
                              {(revenue / 1000).toFixed(0)}K
                            </p>
                          </div>
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

      {/* Add Room Dialog */}
      <Dialog open={isAddRoomDialogOpen} onOpenChange={setIsAddRoomDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-indigo-700 flex items-center gap-2">
              <DoorOpen className="w-6 h-6" />
              {t('rooms.addRoom')}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="room-number">{t('rooms.roomNumber')}</Label>
                <Input 
                  id="room-number" 
                  placeholder="101"
                  value={newRoomForm.roomNumber}
                  onChange={(e) => setNewRoomForm({...newRoomForm, roomNumber: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="room-type">{t('rooms.roomType')}</Label>
                <Select value={newRoomForm.type} onValueChange={(value) => setNewRoomForm({...newRoomForm, type: value})}>
                  <SelectTrigger id="room-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">{t('rooms.single')}</SelectItem>
                    <SelectItem value="double">{t('rooms.double')}</SelectItem>
                    <SelectItem value="suite">{t('rooms.suite')}</SelectItem>
                    <SelectItem value="icu">{t('rooms.icu')}</SelectItem>
                    <SelectItem value="emergency">{t('rooms.emergency')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="floor">{t('rooms.floor')}</Label>
                <Input 
                  id="floor" 
                  type="number"
                  placeholder="1"
                  value={newRoomForm.floor}
                  onChange={(e) => setNewRoomForm({...newRoomForm, floor: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="department">{t('rooms.department')}</Label>
                <Select value={newRoomForm.department} onValueChange={(value) => setNewRoomForm({...newRoomForm, department: value})}>
                  <SelectTrigger id="department">
                    <SelectValue placeholder={t('rooms.selectDepartment')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">{t('rooms.general')}</SelectItem>
                    <SelectItem value="surgery">{t('rooms.surgery')}</SelectItem>
                    <SelectItem value="pediatrics">{t('rooms.pediatrics')}</SelectItem>
                    <SelectItem value="maternity">{t('rooms.maternity')}</SelectItem>
                    <SelectItem value="cardiology">{t('rooms.cardiology')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">{t('rooms.pricePerNight')}</Label>
              <Input 
                id="price" 
                type="number"
                placeholder="500"
                value={newRoomForm.pricePerNight}
                onChange={(e) => setNewRoomForm({...newRoomForm, pricePerNight: e.target.value})}
              />
            </div>

            <div className="space-y-3 pt-2">
              <Label className="text-lg font-semibold">{t('rooms.amenities')}</Label>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-2">
                    <Wind className="w-4 h-4 text-slate-600" />
                    <Label htmlFor="oxygen" className="cursor-pointer">{t('rooms.oxygen')}</Label>
                  </div>
                  <Switch 
                    id="oxygen"
                    checked={newRoomForm.hasOxygen}
                    onCheckedChange={(checked) => setNewRoomForm({...newRoomForm, hasOxygen: checked})}
                  />
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-slate-600" />
                    <Label htmlFor="monitor" className="cursor-pointer">{t('rooms.monitor')}</Label>
                  </div>
                  <Switch 
                    id="monitor"
                    checked={newRoomForm.hasMonitor}
                    onCheckedChange={(checked) => setNewRoomForm({...newRoomForm, hasMonitor: checked})}
                  />
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-2">
                    <Wifi className="w-4 h-4 text-slate-600" />
                    <Label htmlFor="wifi" className="cursor-pointer">{t('rooms.wifi')}</Label>
                  </div>
                  <Switch 
                    id="wifi"
                    checked={newRoomForm.hasWifi}
                    onCheckedChange={(checked) => setNewRoomForm({...newRoomForm, hasWifi: checked})}
                  />
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-2">
                    <Tv className="w-4 h-4 text-slate-600" />
                    <Label htmlFor="tv" className="cursor-pointer">{t('rooms.tv')}</Label>
                  </div>
                  <Switch 
                    id="tv"
                    checked={newRoomForm.hasTv}
                    onCheckedChange={(checked) => setNewRoomForm({...newRoomForm, hasTv: checked})}
                  />
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg col-span-2">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-slate-600" />
                    <Label htmlFor="phone" className="cursor-pointer">{t('rooms.phone')}</Label>
                  </div>
                  <Switch 
                    id="phone"
                    checked={newRoomForm.hasPhone}
                    onCheckedChange={(checked) => setNewRoomForm({...newRoomForm, hasPhone: checked})}
                  />
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddRoomDialogOpen(false)}>
              {t('common.cancel')}
            </Button>
            <Button className="bg-gradient-to-r from-indigo-600 to-blue-600" onClick={() => {
              console.log('New Room:', newRoomForm);
              setIsAddRoomDialogOpen(false);
              setNewRoomForm({
                roomNumber: "",
                type: "single",
                floor: "",
                department: "",
                hasOxygen: false,
                hasMonitor: false,
                hasWifi: false,
                hasTv: false,
                hasPhone: false,
                pricePerNight: ""
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
