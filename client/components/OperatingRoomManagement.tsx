import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Scissors,
  Users,
  Package,
  Heart,
  Clock,
  User,
  Plus,
  X,
  CheckCircle2,
  AlertCircle,
  Activity,
  Stethoscope,
  UserCog,
  Syringe,
  Thermometer,
  Wrench,
  Calendar,
  Timer,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface OperatingRoomManagementProps {
  surgeryId?: string;
  onClose: () => void;
  onComplete: (data: any) => void;
}

export default function OperatingRoomManagement({
  surgeryId,
  onClose,
  onComplete,
}: OperatingRoomManagementProps) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("room");

  // Room Selection State
  const [selectedRoom, setSelectedRoom] = useState<any>(null);
  const [roomStatus, setRoomStatus] = useState("preparing");

  // Medical Team State
  const [medicalTeam, setMedicalTeam] = useState<any[]>([]);
  const [showAddTeamMember, setShowAddTeamMember] = useState(false);
  const [newTeamMember, setNewTeamMember] = useState({
    name: "",
    role: "",
    specialization: "",
    licenseNumber: "",
    experience: "",
  });

  // Patient Care Team State
  const [careTeam, setCareTeam] = useState<any[]>([]);
  const [showAddCareTeam, setShowAddCareTeam] = useState(false);
  const [newCareTeamMember, setNewCareTeamMember] = useState({
    name: "",
    role: "",
    shift: "",
    specialization: "",
  });

  // Equipment State
  const [equipment, setEquipment] = useState<any[]>([]);
  const [showAddEquipment, setShowAddEquipment] = useState(false);
  const [newEquipment, setNewEquipment] = useState({
    name: "",
    category: "",
    serialNumber: "",
    status: "operational",
    lastMaintenance: "",
    quantity: 1,
  });

  // Available Operating Rooms
  const operatingRooms = [
    {
      id: "OR-001",
      name: t("surgery.or.room1"),
      floor: 3,
      building: "A",
      status: "available",
      capacity: "Major Surgery",
      equipment: ["Anesthesia Machine", "Surgical Lights", "Patient Monitor"],
      lastUsed: "2 hours ago",
    },
    {
      id: "OR-002",
      name: t("surgery.or.room2"),
      floor: 3,
      building: "A",
      status: "occupied",
      capacity: "Cardiac Surgery",
      equipment: ["Heart-Lung Machine", "Defibrillator", "C-Arm"],
      lastUsed: "In use",
    },
    {
      id: "OR-003",
      name: t("surgery.or.room3"),
      floor: 3,
      building: "A",
      status: "available",
      capacity: "Orthopedic Surgery",
      equipment: ["C-Arm", "Surgical Table", "Drill Set"],
      lastUsed: "30 minutes ago",
    },
    {
      id: "OR-004",
      name: t("surgery.or.room4"),
      floor: 4,
      building: "A",
      status: "maintenance",
      capacity: "Minor Surgery",
      equipment: ["Basic Surgical Set", "Patient Monitor"],
      lastUsed: "Yesterday",
    },
  ];

  // Medical Team Roles
  const medicalRoles = [
    { value: "lead_surgeon", label: t("surgery.team.leadSurgeon") },
    { value: "assistant_surgeon", label: t("surgery.team.assistantSurgeon") },
    { value: "anesthesiologist", label: t("surgery.team.anesthesiologist") },
    { value: "surgical_nurse", label: t("surgery.team.surgicalNurse") },
    { value: "scrub_nurse", label: t("surgery.team.scrubNurse") },
    { value: "circulating_nurse", label: t("surgery.team.circulatingNurse") },
    { value: "anesthesia_nurse", label: t("surgery.team.anesthesiaNurse") },
    { value: "perfusionist", label: t("surgery.team.perfusionist") },
    { value: "surgical_tech", label: t("surgery.team.surgicalTech") },
  ];

  // Care Team Roles
  const careRoles = [
    { value: "registered_nurse", label: t("surgery.care.registeredNurse") },
    { value: "icu_nurse", label: t("surgery.care.icuNurse") },
    { value: "recovery_nurse", label: t("surgery.care.recoveryNurse") },
    { value: "patient_care_assistant", label: t("surgery.care.patientCareAssistant") },
    { value: "physiotherapist", label: t("surgery.care.physiotherapist") },
    { value: "respiratory_therapist", label: t("surgery.care.respiratoryTherapist") },
  ];

  // Equipment Categories
  const equipmentCategories = [
    { value: "anesthesia", label: t("surgery.equipment.anesthesia") },
    { value: "monitoring", label: t("surgery.equipment.monitoring") },
    { value: "surgical_instruments", label: t("surgery.equipment.surgicalInstruments") },
    { value: "imaging", label: t("surgery.equipment.imaging") },
    { value: "life_support", label: t("surgery.equipment.lifeSupport") },
    { value: "electrosurgical", label: t("surgery.equipment.electrosurgical") },
    { value: "suction_irrigation", label: t("surgery.equipment.suctionIrrigation") },
    { value: "patient_positioning", label: t("surgery.equipment.patientPositioning") },
  ];

  const handleAddTeamMember = () => {
    if (newTeamMember.name && newTeamMember.role) {
      setMedicalTeam([...medicalTeam, { ...newTeamMember, id: Date.now() }]);
      setNewTeamMember({
        name: "",
        role: "",
        specialization: "",
        licenseNumber: "",
        experience: "",
      });
      setShowAddTeamMember(false);
    }
  };

  const handleRemoveTeamMember = (id: number) => {
    setMedicalTeam(medicalTeam.filter((member) => member.id !== id));
  };

  const handleAddCareTeamMember = () => {
    if (newCareTeamMember.name && newCareTeamMember.role) {
      setCareTeam([...careTeam, { ...newCareTeamMember, id: Date.now() }]);
      setNewCareTeamMember({
        name: "",
        role: "",
        shift: "",
        specialization: "",
      });
      setShowAddCareTeam(false);
    }
  };

  const handleRemoveCareTeamMember = (id: number) => {
    setCareTeam(careTeam.filter((member) => member.id !== id));
  };

  const handleAddEquipment = () => {
    if (newEquipment.name && newEquipment.category) {
      setEquipment([...equipment, { ...newEquipment, id: Date.now() }]);
      setNewEquipment({
        name: "",
        category: "",
        serialNumber: "",
        status: "operational",
        lastMaintenance: "",
        quantity: 1,
      });
      setShowAddEquipment(false);
    }
  };

  const handleRemoveEquipment = (id: number) => {
    setEquipment(equipment.filter((item) => item.id !== id));
  };

  const handleComplete = () => {
    const data = {
      room: selectedRoom,
      roomStatus,
      medicalTeam,
      careTeam,
      equipment,
      timestamp: new Date().toISOString(),
    };
    onComplete(data);
  };

  const getRoomStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800 border-green-300";
      case "occupied":
        return "bg-red-100 text-red-800 border-red-300";
      case "maintenance":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getRoleIcon = (role: string) => {
    if (role.includes("surgeon")) return Scissors;
    if (role.includes("anesthesia")) return Syringe;
    if (role.includes("nurse")) return Heart;
    if (role.includes("tech")) return Wrench;
    return User;
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-7xl max-h-[98vh] sm:max-h-[95vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-4 sm:p-6 text-white flex-shrink-0">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2 truncate">
                {t("surgery.or.management")}
              </h2>
              <p className="text-xs sm:text-sm text-blue-100 hidden sm:block">
                {t("surgery.or.subtitle")}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors flex-shrink-0"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full flex flex-col flex-1 min-h-0">
          <div className="bg-slate-50 border-b border-slate-200 flex-shrink-0 overflow-x-auto">
            <TabsList className="w-full justify-start p-1 sm:p-2 bg-transparent inline-flex min-w-max">
              <TabsTrigger
                value="room"
                className="data-[state=active]:bg-white data-[state=active]:shadow-md gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2"
              >
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">{t("surgery.or.roomSelection")}</span>
                <span className="sm:hidden">{t("surgery.or.rooms")}</span>
              </TabsTrigger>
              <TabsTrigger
                value="team"
                className="data-[state=active]:bg-white data-[state=active]:shadow-md gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2"
              >
                <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">{t("surgery.or.medicalTeam")}</span>
                <span className="sm:hidden">{t("surgery.team")}</span>
              </TabsTrigger>
              <TabsTrigger
                value="care"
                className="data-[state=active]:bg-white data-[state=active]:shadow-md gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2"
              >
                <Heart className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">{t("surgery.or.careTeam")}</span>
                <span className="sm:hidden">{t("surgery.care")}</span>
              </TabsTrigger>
              <TabsTrigger
                value="equipment"
                className="data-[state=active]:bg-white data-[state=active]:shadow-md gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2"
              >
                <Package className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">{t("surgery.or.equipment")}</span>
                <span className="sm:hidden">{t("surgery.equipment")}</span>
              </TabsTrigger>
              <TabsTrigger
                value="summary"
                className="data-[state=active]:bg-white data-[state=active]:shadow-md gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2"
              >
                <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">{t("surgery.or.summary")}</span>
                <span className="sm:hidden">{t("common.all")}</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="p-3 sm:p-4 lg:p-6 overflow-y-auto flex-1">
            {/* Room Selection Tab */}
            <TabsContent value="room" className="mt-0 space-y-3 sm:space-y-4">
              <Card>
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                    {t("surgery.or.selectRoom")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {operatingRooms.map((room) => (
                      <div
                        key={room.id}
                        onClick={() => room.status === "available" && setSelectedRoom(room)}
                        className={`p-3 sm:p-4 border-2 rounded-lg sm:rounded-xl cursor-pointer transition-all ${
                          selectedRoom?.id === room.id
                            ? "border-blue-500 bg-blue-50 shadow-lg"
                            : room.status === "available"
                            ? "border-slate-200 hover:border-blue-300 hover:shadow-md"
                            : "border-slate-200 opacity-50 cursor-not-allowed"
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row items-start justify-between gap-2 mb-3">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-base sm:text-lg truncate">{room.name}</h3>
                            <p className="text-xs sm:text-sm text-slate-600 truncate">
                              {t("surgery.or.building")} {room.building}, {t("surgery.or.floor")}{" "}
                              {room.floor}
                            </p>
                          </div>
                          <Badge className={`${getRoomStatusColor(room.status)} text-xs whitespace-nowrap`}>
                            {t(`surgery.or.status.${room.status}`)}
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-xs sm:text-sm">
                            <Activity className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 flex-shrink-0" />
                            <span className="font-medium truncate">{room.capacity}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600">
                            <Clock className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                            <span className="truncate">{t("surgery.or.lastUsed")}: {room.lastUsed}</span>
                          </div>
                          <div className="mt-2">
                            <p className="text-xs font-medium text-slate-700 mb-1">
                              {t("surgery.or.availableEquipment")}:
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {room.equipment.map((eq, idx) => (
                                <span
                                  key={idx}
                                  className="text-xs px-2 py-1 bg-slate-100 rounded-md truncate"
                                >
                                  {eq}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {selectedRoom && (
                    <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-green-50 border-2 border-green-200 rounded-lg sm:rounded-xl">
                      <div className="flex items-start sm:items-center gap-2 sm:gap-3">
                        <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 flex-shrink-0 mt-0.5 sm:mt-0" />
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-sm sm:text-base text-green-900 truncate">
                            {t("surgery.or.roomSelected")}: {selectedRoom.name}
                          </p>
                          <p className="text-xs sm:text-sm text-green-700 truncate">
                            {t("surgery.or.building")} {selectedRoom.building}, {t("surgery.or.floor")}{" "}
                            {selectedRoom.floor}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Medical Team Tab */}
            <TabsContent value="team" className="mt-0 space-y-3 sm:space-y-4">
              <Card>
                <CardHeader className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                      <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                      {t("surgery.or.medicalTeam")}
                    </CardTitle>
                    <Button
                      onClick={() => setShowAddTeamMember(true)}
                      className="gap-2 w-full sm:w-auto"
                      size="sm"
                    >
                      <Plus className="w-4 h-4" />
                      <span className="hidden sm:inline">{t("surgery.or.addMember")}</span>
                      <span className="sm:hidden">{t("common.add")}</span>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  {medicalTeam.length === 0 ? (
                    <div className="text-center py-8 sm:py-12 text-slate-500">
                      <Users className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 opacity-30" />
                      <p className="text-sm sm:text-base">{t("surgery.or.noTeamMembers")}</p>
                    </div>
                  ) : (
                    <div className="space-y-2 sm:space-y-3">
                      {medicalTeam.map((member) => {
                        const RoleIcon = getRoleIcon(member.role);
                        return (
                          <div
                            key={member.id}
                            className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 border border-slate-200 rounded-lg hover:shadow-md transition-shadow gap-3"
                          >
                            <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0 w-full sm:w-auto">
                              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                                <RoleIcon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-bold text-sm sm:text-base truncate">{member.name}</h4>
                                <p className="text-xs sm:text-sm text-slate-600 truncate">
                                  {medicalRoles.find((r) => r.value === member.role)?.label}
                                </p>
                                {member.specialization && (
                                  <p className="text-xs text-slate-500 truncate">{member.specialization}</p>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-2 flex-wrap w-full sm:w-auto">
                              {member.licenseNumber && (
                                <Badge variant="outline" className="text-xs">
                                  {t("surgery.or.license")}: {member.licenseNumber}
                                </Badge>
                              )}
                              {member.experience && (
                                <Badge variant="outline" className="text-xs bg-blue-50">
                                  {member.experience} {t("surgery.or.yearsExp")}
                                </Badge>
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRemoveTeamMember(member.id)}
                                className="text-red-600 hover:text-red-700 hover:bg-red-50 ml-auto"
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {showAddTeamMember && (
                    <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-slate-50 border-2 border-blue-200 rounded-lg sm:rounded-xl">
                      <h4 className="font-bold text-sm sm:text-base mb-3 sm:mb-4">{t("surgery.or.addTeamMember")}</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <div>
                          <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">
                            {t("surgery.or.memberName")} *
                          </label>
                          <input
                            type="text"
                            value={newTeamMember.name}
                            onChange={(e) =>
                              setNewTeamMember({ ...newTeamMember, name: e.target.value })
                            }
                            className="w-full px-3 py-2 text-sm border rounded-lg"
                            placeholder={t("surgery.or.enterName")}
                          />
                        </div>
                        <div>
                          <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">
                            {t("surgery.or.role")} *
                          </label>
                          <select
                            value={newTeamMember.role}
                            onChange={(e) =>
                              setNewTeamMember({ ...newTeamMember, role: e.target.value })
                            }
                            className="w-full px-3 py-2 text-sm border rounded-lg"
                          >
                            <option value="">{t("surgery.or.selectRole")}</option>
                            {medicalRoles.map((role) => (
                              <option key={role.value} value={role.value}>
                                {role.label}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">
                            {t("surgery.or.specialization")}
                          </label>
                          <input
                            type="text"
                            value={newTeamMember.specialization}
                            onChange={(e) =>
                              setNewTeamMember({
                                ...newTeamMember,
                                specialization: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 text-sm border rounded-lg"
                            placeholder={t("surgery.or.enterSpecialization")}
                          />
                        </div>
                        <div>
                          <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">
                            {t("surgery.or.licenseNumber")}
                          </label>
                          <input
                            type="text"
                            value={newTeamMember.licenseNumber}
                            onChange={(e) =>
                              setNewTeamMember({
                                ...newTeamMember,
                                licenseNumber: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 text-sm border rounded-lg"
                            placeholder={t("surgery.or.enterLicense")}
                          />
                        </div>
                        <div>
                          <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">
                            {t("surgery.or.experience")}
                          </label>
                          <input
                            type="number"
                            value={newTeamMember.experience}
                            onChange={(e) =>
                              setNewTeamMember({ ...newTeamMember, experience: e.target.value })
                            }
                            className="w-full px-3 py-2 text-sm border rounded-lg"
                            placeholder={t("surgery.or.yearsExp")}
                          />
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2 mt-3 sm:mt-4">
                        <Button onClick={handleAddTeamMember} className="gap-2 w-full sm:w-auto">
                          <CheckCircle2 className="w-4 h-4" />
                          {t("common.add")}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setShowAddTeamMember(false)}
                          className="w-full sm:w-auto"
                        >
                          {t("common.cancel")}
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Care Team Tab */}
            <TabsContent value="care" className="mt-0 space-y-3 sm:space-y-4">
              <Card>
                <CardHeader className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                      <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                      {t("surgery.or.patientCareTeam")}
                    </CardTitle>
                    <Button
                      onClick={() => setShowAddCareTeam(true)}
                      className="gap-2 w-full sm:w-auto"
                      size="sm"
                    >
                      <Plus className="w-4 h-4" />
                      <span className="hidden sm:inline">{t("surgery.or.addCareMember")}</span>
                      <span className="sm:hidden">{t("common.add")}</span>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  {careTeam.length === 0 ? (
                    <div className="text-center py-8 sm:py-12 text-slate-500">
                      <Heart className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 opacity-30" />
                      <p className="text-sm sm:text-base">{t("surgery.or.noCareMembers")}</p>
                    </div>
                  ) : (
                    <div className="space-y-2 sm:space-y-3">
                      {careTeam.map((member) => (
                        <div
                          key={member.id}
                          className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 border border-slate-200 rounded-lg hover:shadow-md transition-shadow gap-3"
                        >
                          <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0 w-full sm:w-auto">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-pink-100 to-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                              <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-pink-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-bold text-sm sm:text-base truncate">{member.name}</h4>
                              <p className="text-xs sm:text-sm text-slate-600 truncate">
                                {careRoles.find((r) => r.value === member.role)?.label}
                              </p>
                              {member.shift && (
                                <Badge variant="outline" className="mt-1 text-xs">
                                  {t("surgery.or.shift")}: {member.shift}
                                </Badge>
                              )}
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveCareTeamMember(member.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 ml-auto sm:ml-0"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}

                  {showAddCareTeam && (
                    <div className="mt-4 p-4 bg-slate-50 border-2 border-pink-200 rounded-xl">
                      <h4 className="font-bold mb-4">{t("surgery.or.addCareTeamMember")}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            {t("surgery.or.memberName")} *
                          </label>
                          <input
                            type="text"
                            value={newCareTeamMember.name}
                            onChange={(e) =>
                              setNewCareTeamMember({ ...newCareTeamMember, name: e.target.value })
                            }
                            className="w-full px-3 py-2 border rounded-lg"
                            placeholder={t("surgery.or.enterName")}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            {t("surgery.or.role")} *
                          </label>
                          <select
                            value={newCareTeamMember.role}
                            onChange={(e) =>
                              setNewCareTeamMember({ ...newCareTeamMember, role: e.target.value })
                            }
                            className="w-full px-3 py-2 border rounded-lg"
                          >
                            <option value="">{t("surgery.or.selectRole")}</option>
                            {careRoles.map((role) => (
                              <option key={role.value} value={role.value}>
                                {role.label}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            {t("surgery.or.shift")}
                          </label>
                          <select
                            value={newCareTeamMember.shift}
                            onChange={(e) =>
                              setNewCareTeamMember({ ...newCareTeamMember, shift: e.target.value })
                            }
                            className="w-full px-3 py-2 border rounded-lg"
                          >
                            <option value="">{t("surgery.or.selectShift")}</option>
                            <option value="morning">{t("surgery.or.morningShift")}</option>
                            <option value="evening">{t("surgery.or.eveningShift")}</option>
                            <option value="night">{t("surgery.or.nightShift")}</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            {t("surgery.or.specialization")}
                          </label>
                          <input
                            type="text"
                            value={newCareTeamMember.specialization}
                            onChange={(e) =>
                              setNewCareTeamMember({
                                ...newCareTeamMember,
                                specialization: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border rounded-lg"
                            placeholder={t("surgery.or.enterSpecialization")}
                          />
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button onClick={handleAddCareTeamMember} className="gap-2">
                          <CheckCircle2 className="w-4 h-4" />
                          {t("common.add")}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setShowAddCareTeam(false)}
                        >
                          {t("common.cancel")}
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Equipment Tab */}
            <TabsContent value="equipment" className="mt-0 space-y-3 sm:space-y-4">
              <Card>
                <CardHeader className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                      <Package className="w-4 h-4 sm:w-5 sm:h-5" />
                      {t("surgery.or.equipment")}
                    </CardTitle>
                    <Button
                      onClick={() => setShowAddEquipment(true)}
                      className="gap-2 w-full sm:w-auto"
                      size="sm"
                    >
                      <Plus className="w-4 h-4" />
                      <span className="hidden sm:inline">{t("surgery.or.addEquipment")}</span>
                      <span className="sm:hidden">{t("common.add")}</span>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  {equipment.length === 0 ? (
                    <div className="text-center py-8 sm:py-12 text-slate-500">
                      <Package className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 opacity-30" />
                      <p className="text-sm sm:text-base">{t("surgery.or.noEquipment")}</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                      {equipment.map((item) => (
                        <div
                          key={item.id}
                          className="p-3 sm:p-4 border border-slate-200 rounded-lg hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-start justify-between mb-2 gap-2">
                            <div className="flex-1 min-w-0">
                              <h4 className="font-bold text-sm sm:text-base truncate">{item.name}</h4>
                              <p className="text-xs sm:text-sm text-slate-600 truncate">
                                {equipmentCategories.find((c) => c.value === item.category)?.label}
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveEquipment(item.id)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50 flex-shrink-0"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                          <div className="space-y-1 text-xs sm:text-sm">
                            {item.serialNumber && (
                              <p className="text-slate-600 truncate">
                                {t("surgery.or.serialNumber")}: {item.serialNumber}
                              </p>
                            )}
                            <div className="flex items-center gap-2 flex-wrap">
                              <Badge
                                className={`text-xs ${
                                  item.status === "operational"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {t(`surgery.or.equipmentStatus.${item.status}`)}
                              </Badge>
                              <span className="text-slate-500 text-xs">
                                {t("surgery.or.quantity")}: {item.quantity}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {showAddEquipment && (
                    <div className="mt-4 p-4 bg-slate-50 border-2 border-purple-200 rounded-xl">
                      <h4 className="font-bold mb-4">{t("surgery.or.addNewEquipment")}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            {t("surgery.or.equipmentName")} *
                          </label>
                          <input
                            type="text"
                            value={newEquipment.name}
                            onChange={(e) =>
                              setNewEquipment({ ...newEquipment, name: e.target.value })
                            }
                            className="w-full px-3 py-2 border rounded-lg"
                            placeholder={t("surgery.or.enterEquipmentName")}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            {t("surgery.or.category")} *
                          </label>
                          <select
                            value={newEquipment.category}
                            onChange={(e) =>
                              setNewEquipment({ ...newEquipment, category: e.target.value })
                            }
                            className="w-full px-3 py-2 border rounded-lg"
                          >
                            <option value="">{t("surgery.or.selectCategory")}</option>
                            {equipmentCategories.map((cat) => (
                              <option key={cat.value} value={cat.value}>
                                {cat.label}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            {t("surgery.or.serialNumber")}
                          </label>
                          <input
                            type="text"
                            value={newEquipment.serialNumber}
                            onChange={(e) =>
                              setNewEquipment({ ...newEquipment, serialNumber: e.target.value })
                            }
                            className="w-full px-3 py-2 border rounded-lg"
                            placeholder={t("surgery.or.enterSerialNumber")}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            {t("surgery.or.quantity")}
                          </label>
                          <input
                            type="number"
                            value={newEquipment.quantity}
                            onChange={(e) =>
                              setNewEquipment({
                                ...newEquipment,
                                quantity: parseInt(e.target.value) || 1,
                              })
                            }
                            className="w-full px-3 py-2 border rounded-lg"
                            min="1"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            {t("surgery.or.equipmentStatus")}
                          </label>
                          <select
                            value={newEquipment.status}
                            onChange={(e) =>
                              setNewEquipment({ ...newEquipment, status: e.target.value })
                            }
                            className="w-full px-3 py-2 border rounded-lg"
                          >
                            <option value="operational">
                              {t("surgery.or.equipmentStatus.operational")}
                            </option>
                            <option value="maintenance">
                              {t("surgery.or.equipmentStatus.maintenance")}
                            </option>
                            <option value="damaged">
                              {t("surgery.or.equipmentStatus.damaged")}
                            </option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            {t("surgery.or.lastMaintenance")}
                          </label>
                          <input
                            type="date"
                            value={newEquipment.lastMaintenance}
                            onChange={(e) =>
                              setNewEquipment({
                                ...newEquipment,
                                lastMaintenance: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border rounded-lg"
                          />
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button onClick={handleAddEquipment} className="gap-2">
                          <CheckCircle2 className="w-4 h-4" />
                          {t("common.add")}
                        </Button>
                        <Button variant="outline" onClick={() => setShowAddEquipment(false)}>
                          {t("common.cancel")}
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Summary Tab */}
            <TabsContent value="summary" className="mt-0 space-y-3 sm:space-y-4">
              <Card>
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    {t("surgery.or.operationSummary")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                  {/* Room Summary */}
                  <div>
                    <h4 className="font-bold text-base sm:text-lg mb-2 sm:mb-3 flex items-center gap-2">
                      <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                      {t("surgery.or.selectedRoom")}
                    </h4>
                    {selectedRoom ? (
                      <div className="p-3 sm:p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="font-bold text-sm sm:text-base truncate">{selectedRoom.name}</p>
                        <p className="text-xs sm:text-sm text-slate-600 truncate">
                          {t("surgery.or.building")} {selectedRoom.building}, {t("surgery.or.floor")}{" "}
                          {selectedRoom.floor}
                        </p>
                      </div>
                    ) : (
                      <p className="text-slate-500 text-sm sm:text-base">{t("surgery.or.noRoomSelected")}</p>
                    )}
                  </div>

                  {/* Medical Team Summary */}
                  <div>
                    <h4 className="font-bold text-base sm:text-lg mb-2 sm:mb-3 flex items-center gap-2">
                      <Users className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                      {t("surgery.or.medicalTeam")} ({medicalTeam.length})
                    </h4>
                    {medicalTeam.length > 0 ? (
                      <div className="space-y-2">
                        {medicalTeam.map((member) => (
                          <div
                            key={member.id}
                            className="p-2 sm:p-3 bg-purple-50 border border-purple-200 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2"
                          >
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm sm:text-base truncate">{member.name}</p>
                              <p className="text-xs sm:text-sm text-slate-600 truncate">
                                {medicalRoles.find((r) => r.value === member.role)?.label}
                              </p>
                            </div>
                            {member.licenseNumber && (
                              <Badge variant="outline" className="text-xs">{member.licenseNumber}</Badge>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-slate-500 text-sm sm:text-base">{t("surgery.or.noTeamMembers")}</p>
                    )}
                  </div>

                  {/* Care Team Summary */}
                  <div>
                    <h4 className="font-bold text-base sm:text-lg mb-2 sm:mb-3 flex items-center gap-2">
                      <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-pink-600" />
                      {t("surgery.or.careTeam")} ({careTeam.length})
                    </h4>
                    {careTeam.length > 0 ? (
                      <div className="space-y-2">
                        {careTeam.map((member) => (
                          <div
                            key={member.id}
                            className="p-2 sm:p-3 bg-pink-50 border border-pink-200 rounded-lg"
                          >
                            <p className="font-medium text-sm sm:text-base truncate">{member.name}</p>
                            <p className="text-xs sm:text-sm text-slate-600 truncate">
                              {careRoles.find((r) => r.value === member.role)?.label}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-slate-500 text-sm sm:text-base">{t("surgery.or.noCareMembers")}</p>
                    )}
                  </div>

                  {/* Equipment Summary */}
                  <div>
                    <h4 className="font-bold text-base sm:text-lg mb-2 sm:mb-3 flex items-center gap-2">
                      <Package className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                      {t("surgery.or.equipment")} ({equipment.length})
                    </h4>
                    {equipment.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {equipment.map((item) => (
                          <div
                            key={item.id}
                            className="p-2 sm:p-3 bg-green-50 border border-green-200 rounded-lg"
                          >
                            <p className="font-medium text-sm sm:text-base truncate">{item.name}</p>
                            <p className="text-xs sm:text-sm text-slate-600">
                              {t("surgery.or.quantity")}: {item.quantity}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-slate-500 text-sm sm:text-base">{t("surgery.or.noEquipment")}</p>
                    )}
                  </div>

                  {/* Warnings */}
                  {(!selectedRoom || medicalTeam.length === 0) && (
                    <div className="p-3 sm:p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-2 sm:gap-3">
                      <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm sm:text-base text-yellow-900">
                          {t("surgery.or.incompleteSetup")}
                        </p>
                        <ul className="text-xs sm:text-sm text-yellow-800 mt-1 list-disc list-inside">
                          {!selectedRoom && <li>{t("surgery.or.selectRoomWarning")}</li>}
                          {medicalTeam.length === 0 && (
                            <li>{t("surgery.or.addTeamWarning")}</li>
                          )}
                        </ul>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>

        {/* Footer */}
        <div className="bg-slate-50 p-3 sm:p-4 lg:p-6 border-t border-slate-200 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-2 sm:gap-4 flex-shrink-0">
          <Button 
            variant="outline" 
            onClick={onClose}
            className="w-full sm:w-auto"
          >
            {t("common.cancel")}
          </Button>
          <Button
            onClick={handleComplete}
            disabled={!selectedRoom || medicalTeam.length === 0}
            className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 w-full sm:w-auto"
          >
            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="truncate">{t("surgery.or.confirmSetup")}</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
