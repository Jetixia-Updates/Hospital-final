import Layout from "@/components/Layout";
import {
  Search,
  Wrench,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Plus,
  Filter,
  Zap,
  AlertCircle,
  ArrowRight,
  Calendar,
} from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const WorkOrderCard = ({
  id,
  title,
  equipment,
  location,
  requestedDate,
  priority,
  status,
  assignedTo,
  estimatedTime,
}: {
  id: string;
  title: string;
  equipment: string;
  location: string;
  requestedDate: string;
  priority: "low" | "medium" | "high" | "critical";
  status: "pending" | "in-progress" | "completed" | "on-hold";
  assignedTo: string;
  estimatedTime: string;
}) => {
  const priorityConfig = {
    low: { bg: "bg-blue-50", color: "text-blue-700", badge: "Low" },
    medium: { bg: "bg-yellow-50", color: "text-yellow-700", badge: "Medium" },
    high: { bg: "bg-orange-50", color: "text-orange-700", badge: "High" },
    critical: { bg: "bg-red-50", color: "text-red-700", badge: "Critical" },
  };

  const statusConfig = {
    pending: { icon: "⏳", color: "text-slate-600" },
    "in-progress": { icon: "🔧", color: "text-blue-600" },
    completed: { icon: "✓", color: "text-green-600" },
    "on-hold": { icon: "⏸", color: "text-yellow-600" },
  };

  const pConfig = priorityConfig[priority];
  const sConfig = statusConfig[status];

  return (
    <div className={`${pConfig.bg} rounded-lg border border-slate-200 p-6 hover:shadow-md transition-shadow`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
          <p className="text-sm text-slate-500">WO #{id}</p>
        </div>
        <span className={`text-xl ${sConfig.color}`}>{sConfig.icon}</span>
      </div>

      <div className="space-y-2 text-sm text-slate-600 mb-4">
        <div className="flex items-center justify-between">
          <span>Equipment:</span>
          <span className="font-medium text-slate-900">{equipment}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Location:</span>
          <span className="font-medium text-slate-900">{location}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Assigned To:</span>
          <span className="font-medium text-slate-900">{assignedTo}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Estimated Time:</span>
          <span className="font-medium text-slate-900">{estimatedTime}</span>
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-slate-300">
          <span>Requested:</span>
          <span className="font-medium text-slate-900">{requestedDate}</span>
        </div>
      </div>

      <div className="flex gap-2">
        <span className={`text-xs font-semibold px-3 py-1 rounded-full bg-white border ${pConfig.color} border-current flex-1 text-center`}>
          {pConfig.badge} Priority
        </span>
        <button className="flex-1 bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 font-medium py-2 rounded-lg transition-colors">
          Details
        </button>
      </div>
    </div>
  );
};

const EquipmentCard = ({
  name,
  model,
  location,
  lastMaintenance,
  nextMaintenance,
  status,
  serialNumber,
}: {
  name: string;
  model: string;
  location: string;
  lastMaintenance: string;
  nextMaintenance: string;
  status: "operational" | "maintenance-due" | "under-repair";
  serialNumber: string;
}) => {
  const statusConfig = {
    operational: { bg: "bg-green-50", badge: "Operational", color: "text-green-700" },
    "maintenance-due": { bg: "bg-yellow-50", badge: "Maintenance Due", color: "text-yellow-700" },
    "under-repair": { bg: "bg-red-50", badge: "Under Repair", color: "text-red-700" },
  };

  const config = statusConfig[status];

  return (
    <div className={`${config.bg} rounded-lg border border-slate-200 p-6 hover:shadow-md transition-shadow`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{name}</h3>
          <p className="text-sm text-slate-500">{model}</p>
        </div>
        <span className={`text-xs font-semibold px-3 py-1 rounded-full bg-white border ${config.color} border-current`}>
          {config.badge}
        </span>
      </div>

      <div className="space-y-2 text-sm text-slate-600 mb-4">
        <div className="flex items-center justify-between">
          <span>Serial Number:</span>
          <span className="font-medium text-slate-900">{serialNumber}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Location:</span>
          <span className="font-medium text-slate-900">{location}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Last Maintenance:</span>
          <span className="font-medium text-slate-900">{lastMaintenance}</span>
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-slate-300">
          <span>Next Due:</span>
          <span className="font-medium text-slate-900">{nextMaintenance}</span>
        </div>
      </div>

      <button className="w-full bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-2">
        View History <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};

const MaintenanceSchedule = ({
  date,
  equipment,
  type,
  technician,
  duration,
}: {
  date: string;
  equipment: string;
  type: string;
  technician: string;
  duration: string;
}) => (
  <div className="flex items-center justify-between py-4 border-b border-slate-200 last:border-b-0">
    <div>
      <div className="flex items-center gap-3">
        <Calendar className="w-4 h-4 text-slate-400" />
        <div>
          <p className="font-semibold text-slate-900">{equipment}</p>
          <p className="text-xs text-slate-500">{type}</p>
        </div>
      </div>
    </div>
    <div className="text-right">
      <p className="font-medium text-slate-900">{date}</p>
      <p className="text-xs text-slate-500">
        {technician} • {duration}
      </p>
    </div>
  </div>
);

export default function Maintenance() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("work-orders");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [isAddRequestDialogOpen, setIsAddRequestDialogOpen] = useState(false);
  const [requestForm, setRequestForm] = useState({
    title: "",
    equipment: "",
    location: "",
    priority: "",
    description: "",
    requestedBy: "",
    contactNumber: "",
  });

  const workOrders = [
    {
      id: "WO001",
      title: "Replace HVAC Filter",
      equipment: "HVAC System",
      location: "Building A, Floor 2",
      requestedDate: "Jan 17, 2024",
      priority: "medium" as const,
      status: "pending" as const,
      assignedTo: "Ahmed Hassan",
      estimatedTime: "2 hours",
    },
    {
      id: "WO002",
      title: "Emergency Generator Service",
      equipment: "Generator Unit",
      location: "Basement Level 1",
      requestedDate: "Jan 18, 2024",
      priority: "critical" as const,
      status: "in-progress" as const,
      assignedTo: "Mohammed Saleh",
      estimatedTime: "4 hours",
    },
    {
      id: "WO003",
      title: "Elevator Inspection",
      equipment: "Elevator A",
      location: "Building B",
      requestedDate: "Jan 16, 2024",
      priority: "high" as const,
      status: "completed" as const,
      assignedTo: "Khalid Omar",
      estimatedTime: "3 hours",
    },
    {
      id: "WO004",
      title: "Water Pump Maintenance",
      equipment: "Water Pump",
      location: "Roof Level",
      requestedDate: "Jan 20, 2024",
      priority: "low" as const,
      status: "pending" as const,
      assignedTo: "Pending Assignment",
      estimatedTime: "1.5 hours",
    },
  ];

  const equipment = [
    {
      name: "CT Scanner",
      model: "GE Revolution EVO",
      location: "Radiology Department",
      lastMaintenance: "Dec 15, 2023",
      nextMaintenance: "Mar 15, 2024",
      status: "operational" as const,
      serialNumber: "CT-2020-001",
    },
    {
      name: "MRI Machine",
      model: "Siemens Magnetom",
      location: "Radiology Department",
      lastMaintenance: "Jan 5, 2024",
      nextMaintenance: "Apr 5, 2024",
      status: "operational" as const,
      serialNumber: "MRI-2021-002",
    },
    {
      name: "Ventilator",
      model: "Hamilton-C3",
      location: "ICU",
      lastMaintenance: "Nov 20, 2023",
      nextMaintenance: "Jan 25, 2024",
      status: "maintenance-due" as const,
      serialNumber: "VENT-2019-045",
    },
    {
      name: "Ultrasound Machine",
      model: "GE Logiq E10",
      location: "OB/GYN Department",
      lastMaintenance: "Jan 10, 2024",
      nextMaintenance: "Apr 10, 2024",
      status: "operational" as const,
      serialNumber: "US-2021-003",
    },
  ];

  const schedule = [
    {
      date: "Jan 25, 2024",
      equipment: "HVAC System - Building A",
      type: "Quarterly Maintenance",
      technician: "Ahmed Hassan",
      duration: "2 hours",
    },
    {
      date: "Jan 28, 2024",
      equipment: "Fire Suppression System",
      type: "Annual Inspection",
      technician: "Mohammed Saleh",
      duration: "4 hours",
    },
    {
      date: "Feb 2, 2024",
      equipment: "Emergency Generator",
      type: "Load Testing",
      technician: "Khalid Omar",
      duration: "3 hours",
    },
    {
      date: "Feb 5, 2024",
      equipment: "Backup Power System",
      type: "Battery Replacement",
      technician: "Pending Assignment",
      duration: "6 hours",
    },
  ];

  const filteredWorkOrders = workOrders.filter((wo) => {
    const matchesSearch =
      wo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      wo.equipment.toLowerCase().includes(searchTerm.toLowerCase()) ||
      wo.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPriority =
      priorityFilter === "all" || wo.priority === priorityFilter;

    return matchesSearch && matchesPriority;
  });

  const stats = {
    pending: workOrders.filter((w) => w.status === "pending").length,
    inProgress: workOrders.filter((w) => w.status === "in-progress").length,
    completed: workOrders.filter((w) => w.status === "completed").length,
    equipmentDue: equipment.filter((e) => e.status === "maintenance-due").length,
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">{t('navigation.maintenance')}</h1>
          <p className="text-lg text-slate-600">
            Work orders, equipment maintenance, and service schedules
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <p className="text-sm text-slate-600 mb-1">Work Orders</p>
            <p className="text-3xl font-bold text-slate-900">{workOrders.length}</p>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <p className="text-sm text-slate-600 mb-1">In Progress</p>
            <p className="text-3xl font-bold text-blue-600">{stats.inProgress}</p>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <p className="text-sm text-slate-600 mb-1">Equipment</p>
            <p className="text-3xl font-bold text-slate-900">{equipment.length}</p>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <p className="text-sm text-slate-600 mb-1">Maintenance Due</p>
            <p className="text-3xl font-bold text-yellow-600">{stats.equipmentDue}</p>
          </div>
        </div>

        {/* Maintenance Due Alert */}
        {stats.equipmentDue > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-yellow-900 mb-2">Maintenance Alerts</h3>
                <p className="text-sm text-yellow-800">
                  {stats.equipmentDue} equipment item(s) require maintenance. Please schedule service to prevent downtime.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-slate-200 overflow-x-auto">
          {[
            { id: "work-orders", label: "Work Orders" },
            { id: "equipment", label: "Equipment" },
            { id: "schedule", label: "Maintenance Schedule" },
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
          {activeTab === "work-orders" && (
            <>
              {/* Search and Filter */}
              <div className="bg-white rounded-lg border border-slate-200 p-6 mb-8">
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
                    value={priorityFilter}
                    onChange={(e) => setPriorityFilter(e.target.value)}
                    className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Priorities</option>
                    <option value="critical">Critical</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                  <button onClick={() => setIsAddRequestDialogOpen(true)} className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                    <Plus className="w-5 h-5" />
                    New Work Order
                  </button>
                </div>
              </div>

              {/* Work Orders Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {filteredWorkOrders.map((wo, index) => (
                  <WorkOrderCard key={index} {...wo} />
                ))}
              </div>

              {filteredWorkOrders.length === 0 && (
                <div className="text-center py-12 bg-slate-50 rounded-lg border border-slate-200">
                  <p className="text-slate-600">No work orders found matching your search.</p>
                </div>
              )}
            </>
          )}

          {activeTab === "equipment" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {equipment.map((equip, index) => (
                <EquipmentCard key={index} {...equip} />
              ))}
            </div>
          )}

          {activeTab === "schedule" && (
            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-6">Upcoming Maintenance</h3>
              {schedule.map((item, index) => (
                <MaintenanceSchedule key={index} {...item} />
              ))}
            </div>
          )}
        </div>

        {/* Add Maintenance Request Dialog */}
        <Dialog open={isAddRequestDialogOpen} onOpenChange={setIsAddRequestDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Wrench className="w-5 h-5 text-blue-600" />
                New Maintenance Request
              </DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2 col-span-2">
                <Label htmlFor="title">Request Title</Label>
                <Input
                  id="title"
                  value={requestForm.title}
                  onChange={(e) => setRequestForm({ ...requestForm, title: e.target.value })}
                  placeholder="e.g., Replace HVAC Filter"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="equipment">Equipment/System</Label>
                <Input
                  id="equipment"
                  value={requestForm.equipment}
                  onChange={(e) => setRequestForm({ ...requestForm, equipment: e.target.value })}
                  placeholder="e.g., HVAC System"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={requestForm.location}
                  onChange={(e) => setRequestForm({ ...requestForm, location: e.target.value })}
                  placeholder="e.g., Building A, Floor 2"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="priority">Priority Level</Label>
                <Select
                  value={requestForm.priority}
                  onValueChange={(value) => setRequestForm({ ...requestForm, priority: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="requestedBy">Requested By</Label>
                <Input
                  id="requestedBy"
                  value={requestForm.requestedBy}
                  onChange={(e) => setRequestForm({ ...requestForm, requestedBy: e.target.value })}
                  placeholder="Your name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactNumber">Contact Number</Label>
                <Input
                  id="contactNumber"
                  type="tel"
                  value={requestForm.contactNumber}
                  onChange={(e) => setRequestForm({ ...requestForm, contactNumber: e.target.value })}
                  placeholder="+966 50 XXX XXXX"
                />
              </div>
              <div className="space-y-2 col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={requestForm.description}
                  onChange={(e) => setRequestForm({ ...requestForm, description: e.target.value })}
                  placeholder="Describe the maintenance issue in detail..."
                  rows={4}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddRequestDialogOpen(false)}>
                {t('common.cancel')}
              </Button>
              <Button
                onClick={() => {
                  console.log('New Maintenance Request:', requestForm);
                  setRequestForm({
                    title: "",
                    equipment: "",
                    location: "",
                    priority: "",
                    description: "",
                    requestedBy: "",
                    contactNumber: "",
                  });
                  setIsAddRequestDialogOpen(false);
                }}
              >
                Submit Request
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
}
