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
} from "lucide-react";
import { useState } from "react";

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
  const statusConfig = {
    scheduled: { bg: "bg-blue-50", badge: "Scheduled", color: "text-blue-700" },
    "in-progress": {
      bg: "bg-green-50",
      badge: "In Progress",
      color: "text-green-700",
    },
    completed: { bg: "bg-emerald-50", badge: "Completed", color: "text-emerald-700" },
    cancelled: { bg: "bg-red-50", badge: "Cancelled", color: "text-red-700" },
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
            Operating Room
          </span>
          <span className="font-medium text-slate-900">{operatingRoom}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Stethoscope className="w-4 h-4" />
            Surgeon
          </span>
          <span className="font-medium text-slate-900">{surgeon}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Anesthesia</span>
          <span className="font-medium text-slate-900">{anesthesia}</span>
        </div>
      </div>

      <button className="w-full bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-2">
        View Details <ArrowRight className="w-4 h-4" />
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
  const statusConfig = {
    available: {
      color: "text-green-700",
      bg: "bg-green-50",
      badge: "Available",
    },
    "in-use": { color: "text-blue-700", bg: "bg-blue-50", badge: "In Use" },
    maintenance: {
      color: "text-yellow-700",
      bg: "bg-yellow-50",
      badge: "Maintenance",
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
            Currently In Use
          </p>
          <p className="font-medium text-slate-900">{currentSurgery}</p>
        </div>
      )}

      {nextSurgery && (
        <div>
          <p className="text-xs text-slate-600 uppercase tracking-wide mb-1">
            Next Surgery
          </p>
          <p className="font-medium text-slate-900">{nextSurgery}</p>
        </div>
      )}

      {status === "available" && !currentSurgery && !nextSurgery && (
        <p className="text-slate-600 text-sm">No surgeries scheduled</p>
      )}
    </div>
  );
};

export default function Surgery() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Surgery Management</h1>
          <p className="text-lg text-slate-600">
            Operating rooms, surgical schedules, and surgical teams
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <p className="text-sm text-slate-600 mb-1">Scheduled Surgeries</p>
            <p className="text-3xl font-bold text-blue-600">{stats.scheduled}</p>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <p className="text-sm text-slate-600 mb-1">In Progress</p>
            <p className="text-3xl font-bold text-green-600">{stats.inProgress}</p>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <p className="text-sm text-slate-600 mb-1">Completed Today</p>
            <p className="text-3xl font-bold text-emerald-600">{stats.completed}</p>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <p className="text-sm text-slate-600 mb-1">Operating Rooms</p>
            <p className="text-3xl font-bold text-slate-900">{operatingRooms.length}</p>
          </div>
        </div>

        {/* Operating Rooms */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Operating Rooms Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {operatingRooms.map((room, index) => (
              <OperatingRoomStatus key={index} {...room} />
            ))}
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg border border-slate-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search surgeries by patient, procedure, or ID..."
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
              <option value="all">All Status</option>
              <option value="scheduled">Scheduled</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              <Plus className="w-5 h-5" />
              Schedule Surgery
            </button>
          </div>
        </div>

        {/* Surgeries List */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Scheduled Surgeries</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSurgeries.map((surgery, index) => (
              <SurgeryCard key={index} {...surgery} />
            ))}
          </div>

          {filteredSurgeries.length === 0 && (
            <div className="text-center py-12 bg-slate-50 rounded-lg border border-slate-200">
              <p className="text-slate-600">No surgeries found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
