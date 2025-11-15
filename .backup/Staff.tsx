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
} from "lucide-react";
import { useState } from "react";

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
  const statusConfig = {
    available: { bg: "bg-green-50", badge: "Available", color: "text-green-700" },
    "on-duty": { bg: "bg-blue-50", badge: "On Duty", color: "text-blue-700" },
    "on-leave": { bg: "bg-yellow-50", badge: "On Leave", color: "text-yellow-700" },
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
          <span>Role:</span>
          <span className="font-medium text-slate-900">{role}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Department:</span>
          <span className="font-medium text-slate-900">{department}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Specialty:</span>
          <span className="font-medium text-slate-900">{specialty}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Experience:</span>
          <span className="font-medium text-slate-900">{experience} years</span>
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-slate-300">
          <span>Email:</span>
          <span className="font-medium text-slate-900 text-xs">{email}</span>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-xs text-slate-600 uppercase tracking-wide mb-2">Qualifications</p>
        <div className="flex flex-wrap gap-1">
          {qualifications.map((qual, i) => (
            <span key={i} className="text-xs bg-white px-2 py-1 rounded border border-slate-200">
              {qual}
            </span>
          ))}
        </div>
      </div>

      <button className="w-full bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-2">
        View Profile <ArrowRight className="w-4 h-4" />
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
          <p className="text-slate-600">Date</p>
          <p className="font-medium text-slate-900">{date}</p>
        </div>
        <div>
          <p className="text-slate-600">Shift</p>
          <p className="font-medium text-slate-900">{shiftType}</p>
        </div>
        <div>
          <p className="text-slate-600">From</p>
          <p className="font-medium text-slate-900">{startTime}</p>
        </div>
        <div>
          <p className="text-slate-600">To</p>
          <p className="font-medium text-slate-900">{endTime}</p>
        </div>
      </div>
    </div>
  );
};

export default function Staff() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("doctors");
  const [roleFilter, setRoleFilter] = useState("all");

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

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Medical Staff</h1>
          <p className="text-lg text-slate-600">
            Manage doctors, nurses, qualifications, and schedules
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <p className="text-sm text-slate-600 mb-1">Total Staff</p>
            <p className="text-3xl font-bold text-slate-900">{doctors.length + nurses.length}</p>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <p className="text-sm text-slate-600 mb-1">Doctors</p>
            <p className="text-3xl font-bold text-blue-600">{doctors.length}</p>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <p className="text-sm text-slate-600 mb-1">On Duty</p>
            <p className="text-3xl font-bold text-green-600">{onDutyStaff}</p>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <p className="text-sm text-slate-600 mb-1">Available</p>
            <p className="text-3xl font-bold text-emerald-600">{availableStaff}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-slate-200 overflow-x-auto">
          {[
            { id: "doctors", label: "Doctors" },
            { id: "nurses", label: "Nurses" },
            { id: "schedule", label: "Shift Schedule" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-4 font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-slate-600 hover:text-slate-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div>
          {(activeTab === "doctors" || activeTab === "nurses") && (
            <>
              {/* Search and Filter */}
              <div className="bg-white rounded-lg border border-slate-200 p-6 mb-8">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      placeholder={`Search ${activeTab}...`}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  {activeTab === "doctors" && (
                    <select
                      value={roleFilter}
                      onChange={(e) => setRoleFilter(e.target.value)}
                      className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">All Specialties</option>
                      <option value="Cardiology">Cardiology</option>
                      <option value="Neurology">Neurology</option>
                      <option value="Orthopedic Surgery">Orthopedic Surgery</option>
                    </select>
                  )}
                  <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                    <Plus className="w-5 h-5" />
                    Add {activeTab === "doctors" ? "Doctor" : "Nurse"}
                  </button>
                </div>
              </div>

              {/* Staff Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {filteredStaff.map((staff, index) => (
                  <StaffCard key={index} {...staff} />
                ))}
              </div>

              {filteredStaff.length === 0 && (
                <div className="text-center py-12 bg-slate-50 rounded-lg border border-slate-200">
                  <p className="text-slate-600">
                    No {activeTab} found matching your search.
                  </p>
                </div>
              )}
            </>
          )}

          {activeTab === "schedule" && (
            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-6">Upcoming Shifts</h3>
              {shifts.map((shift, index) => (
                <ShiftSchedule key={index} {...shift} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
