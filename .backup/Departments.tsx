import Layout from "@/components/Layout";
import {
  Stethoscope,
  Heart,
  Brain,
  Bone,
  Eye,
  Ear,
  Users,
  MapPin,
  PhoneOff,
  ArrowRight,
  Plus,
  Search,
} from "lucide-react";
import { useState } from "react";

const DepartmentCard = ({
  name,
  head,
  beds,
  staff,
  phone,
  location,
  icon: Icon,
}: {
  name: string;
  head: string;
  beds: number;
  staff: number;
  phone: string;
  location: string;
  icon: React.ReactNode;
}) => (
  <div className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition-shadow">
    <div className="flex items-start justify-between mb-4">
      <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
        {Icon}
      </div>
      <span className="text-xs font-semibold text-green-700 bg-green-50 px-3 py-1 rounded-full">
        Active
      </span>
    </div>

    <h3 className="text-lg font-semibold text-slate-900 mb-4">{name}</h3>

    <div className="space-y-3 text-sm text-slate-600 mb-6">
      <div className="flex items-center justify-between">
        <span>Department Head:</span>
        <span className="font-medium text-slate-900">{head}</span>
      </div>
      <div className="flex items-center justify-between">
        <span>Available Beds:</span>
        <span className="font-medium text-slate-900">{beds}</span>
      </div>
      <div className="flex items-center justify-between">
        <span>Staff Members:</span>
        <span className="font-medium text-slate-900">{staff}</span>
      </div>
      <div className="flex items-center gap-2 pt-2 border-t border-slate-200">
        <MapPin className="w-4 h-4" />
        {location}
      </div>
      <div className="flex items-center gap-2">
        <PhoneOff className="w-4 h-4" />
        {phone}
      </div>
    </div>

    <button className="w-full bg-blue-50 hover:bg-blue-100 text-blue-600 font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-2">
      View Department <ArrowRight className="w-4 h-4" />
    </button>
  </div>
);

export default function Departments() {
  const [searchTerm, setSearchTerm] = useState("");

  const departments = [
    {
      name: "Cardiology",
      head: "Dr. Hassan Al-Rashid",
      beds: 24,
      staff: 12,
      phone: "+966 11 234 5678",
      location: "Building A, Floor 3",
      icon: <Heart className="w-6 h-6 text-red-600" />,
    },
    {
      name: "Neurology",
      head: "Dr. Fatima Al-Dosari",
      beds: 18,
      staff: 8,
      phone: "+966 11 234 5679",
      location: "Building B, Floor 2",
      icon: <Brain className="w-6 h-6 text-purple-600" />,
    },
    {
      name: "Orthopedics",
      head: "Dr. Mohammed Al-Harbi",
      beds: 22,
      staff: 10,
      phone: "+966 11 234 5680",
      location: "Building A, Floor 4",
      icon: <Bone className="w-6 h-6 text-orange-600" />,
    },
    {
      name: "Ophthalmology",
      head: "Dr. Noor Al-Otaibi",
      beds: 12,
      staff: 6,
      phone: "+966 11 234 5681",
      location: "Building C, Floor 1",
      icon: <Eye className="w-6 h-6 text-cyan-600" />,
    },
    {
      name: "ENT",
      head: "Dr. Khalid Al-Mutairi",
      beds: 10,
      staff: 5,
      phone: "+966 11 234 5682",
      location: "Building C, Floor 1",
      icon: <Ear className="w-6 h-6 text-yellow-600" />,
    },
    {
      name: "Internal Medicine",
      head: "Dr. Sarah Al-Shehri",
      beds: 30,
      staff: 15,
      phone: "+966 11 234 5683",
      location: "Building A, Floor 2",
      icon: <Stethoscope className="w-6 h-6 text-emerald-600" />,
    },
  ];

  const filteredDepartments = departments.filter(
    (dept) =>
      dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.head.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalBeds = departments.reduce((sum, d) => sum + d.beds, 0);
  const totalStaff = departments.reduce((sum, d) => sum + d.staff, 0);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Departments
          </h1>
          <p className="text-lg text-slate-600">
            Manage hospital departments, staff, and resources
          </p>
        </div>

        {/* Actions Bar */}
        <div className="bg-white rounded-lg border border-slate-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search departments by name or head..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              <Plus className="w-5 h-5" />
              Add Department
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <p className="text-sm text-slate-600 mb-1">Total Departments</p>
            <p className="text-3xl font-bold text-slate-900">
              {departments.length}
            </p>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <p className="text-sm text-slate-600 mb-1">Total Beds</p>
            <p className="text-3xl font-bold text-blue-600">{totalBeds}</p>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <p className="text-sm text-slate-600 mb-1">Total Staff</p>
            <p className="text-3xl font-bold text-emerald-600">{totalStaff}</p>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <p className="text-sm text-slate-600 mb-1">Occupancy Rate</p>
            <p className="text-3xl font-bold text-orange-600">78%</p>
          </div>
        </div>

        {/* Departments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDepartments.map((dept, index) => (
            <DepartmentCard key={index} {...dept} />
          ))}
        </div>

        {filteredDepartments.length === 0 && (
          <div className="text-center py-12 bg-slate-50 rounded-lg border border-slate-200">
            <p className="text-slate-600">
              No departments found matching your search.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}
