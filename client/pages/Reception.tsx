import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  UserPlus,
  Users,
  Clock,
  Activity,
  TrendingUp,
  ArrowRight,
  Search,
  Filter,
  Phone,
  Mail,
  IdCard,
  AlertCircle,
  CheckCircle2,
  Send,
  Eye,
  Edit2,
  Trash2,
  Plus,
  MoreHorizontal,
  Zap,
  FileText,
  Calendar,
  MapPin,
} from "lucide-react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useReception, initializeReceptionData } from "@/hooks/use-reception";
import { 
  PatientVisitType, 
  PatientPriority, 
  ReceptionStatus,
  VISIT_TYPES_DATA,
  PRIORITY_LEVELS,
} from "@shared/reception";
import { useToast } from "@/hooks/use-toast";

export default function Reception() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const {
    registerPatient,
    quickRegister,
    directPatient,
    updateReceptionStatus,
    getReceptions,
    getQueue,
    getStatistics,
    deleteReception,
  } = useReception();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [visitTypeFilter, setVisitTypeFilter] = useState<string>("all");
  const [showRegisterDialog, setShowRegisterDialog] = useState(false);
  const [showDirectDialog, setShowDirectDialog] = useState(false);
  const [selectedReception, setSelectedReception] = useState<string>("");

  // Registration form state
  const [formData, setFormData] = useState({
    patientName: "",
    age: "",
    gender: "male" as "male" | "female",
    nationality: "Saudi",
    nationalId: "",
    phone: "",
    email: "",
    visitType: "clinic" as PatientVisitType,
    visitReason: "",
    priority: "normal" as PatientPriority,
    hasInsurance: false,
    insuranceProvider: "",
    insurancePolicyNumber: "",
  });

  // Direction form state
  const [directionData, setDirectionData] = useState({
    module: "clinic" as PatientVisitType,
    department: "",
    doctor: "",
    room: "",
    appointmentTime: "",
    notes: "",
  });

  useEffect(() => {
    initializeReceptionData();
  }, []);

  const receptions = getReceptions({
    status: statusFilter !== "all" ? (statusFilter as ReceptionStatus) : undefined,
    visitType: visitTypeFilter !== "all" ? (visitTypeFilter as PatientVisitType) : undefined,
  });

  const filteredReceptions = receptions.filter((reception) =>
    searchTerm === "" ||
    reception.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reception.receptionNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reception.phone.includes(searchTerm) ||
    reception.nationalId.includes(searchTerm)
  );

  const queue = getQueue({ status: "waiting" });
  const stats = getStatistics();

  const handleRegister = () => {
    if (!formData.patientName || !formData.phone) {
      toast({
        title: i18n.language === 'en' ? "Missing Information" : "معلومات ناقصة",
        description: i18n.language === 'en' ? "Please fill required fields" : "الرجاء إدخال المعلومات المطلوبة",
        variant: "destructive",
      });
      return;
    }

    const newReception = registerPatient({
      ...formData,
      age: parseInt(formData.age) || 0,
    });

    toast({
      title: i18n.language === 'en' ? "Registered Successfully" : "تم التسجيل بنجاح",
      description: `${i18n.language === 'en' ? 'Reception Number' : 'رقم الاستقبال'}: ${newReception.receptionNumber}`,
    });

    setShowRegisterDialog(false);
    resetForm();
  };

  const handleQuickRegister = (visitType: PatientVisitType) => {
    const name = prompt(i18n.language === 'en' ? "Patient Name:" : "اسم المريض:");
    if (!name) return;

    const phone = prompt(i18n.language === 'en' ? "Phone Number:" : "رقم الهاتف:");
    if (!phone) return;

    const newReception = quickRegister({
      patientName: name,
      age: 30,
      gender: "male",
      phone,
      visitType,
      visitReason: VISIT_TYPES_DATA.find(v => v.type === visitType)?.[i18n.language === 'en' ? 'nameEn' : 'nameAr'] || "",
      priority: "normal",
    });

    toast({
      title: i18n.language === 'en' ? "Quick Registration Done" : "تم التسجيل السريع",
      description: `${newReception.receptionNumber}`,
    });
  };

  const handleDirect = () => {
    if (!selectedReception) return;

    const success = directPatient(selectedReception, directionData);
    
    if (success) {
      const reception = receptions.find(r => r.id === selectedReception);
      toast({
        title: i18n.language === 'en' ? "Patient Directed" : "تم توجيه المريض",
        description: `${reception?.patientName} → ${VISIT_TYPES_DATA.find(v => v.type === directionData.module)?.[i18n.language === 'en' ? 'nameEn' : 'nameAr']}`,
      });

      setShowDirectDialog(false);
      setSelectedReception("");
      resetDirectionForm();
    }
  };

  const handleNavigateToModule = (visitType: PatientVisitType, receptionId: string) => {
    const routes: Record<PatientVisitType, string> = {
      clinic: "/clinics",
      emergency: "/emergency",
      laboratory: "/laboratory",
      radiology: "/radiology",
      pharmacy: "/pharmacy",
      surgery: "/surgery",
      admission: "/patients",
      insurance: "/insurance",
      billing: "/billing",
    };

    navigate(routes[visitType]);
  };

  const resetForm = () => {
    setFormData({
      patientName: "",
      age: "",
      gender: "male",
      nationality: "Saudi",
      nationalId: "",
      phone: "",
      email: "",
      visitType: "clinic",
      visitReason: "",
      priority: "normal",
      hasInsurance: false,
      insuranceProvider: "",
      insurancePolicyNumber: "",
    });
  };

  const resetDirectionForm = () => {
    setDirectionData({
      module: "clinic",
      department: "",
      doctor: "",
      room: "",
      appointmentTime: "",
      notes: "",
    });
  };

  const getStatusBadge = (status: ReceptionStatus) => {
    const variants: Record<ReceptionStatus, any> = {
      waiting: "secondary",
      registered: "default",
      directed: "outline",
      in_service: "default",
      completed: "secondary",
      cancelled: "destructive",
    };

    const labels: Record<ReceptionStatus, { ar: string; en: string }> = {
      waiting: { ar: "انتظار", en: "Waiting" },
      registered: { ar: "مسجل", en: "Registered" },
      directed: { ar: "موجه", en: "Directed" },
      in_service: { ar: "قيد الخدمة", en: "In Service" },
      completed: { ar: "مكتمل", en: "Completed" },
      cancelled: { ar: "ملغي", en: "Cancelled" },
    };

    return (
      <Badge variant={variants[status]}>
        {i18n.language === 'en' ? labels[status].en : labels[status].ar}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: PatientPriority) => {
    const data = PRIORITY_LEVELS.find(p => p.value === priority);
    const colors: Record<string, string> = {
      gray: "bg-gray-100 text-gray-800",
      orange: "bg-orange-100 text-orange-800",
      red: "bg-red-100 text-red-800",
    };

    return (
      <Badge className={colors[data?.color || "gray"]}>
        {i18n.language === 'en' ? data?.labelEn : data?.labelAr}
      </Badge>
    );
  };

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 via-teal-600 to-cyan-600 rounded-2xl flex items-center justify-center shadow-premium">
                <Users className="h-6 w-6 text-white" strokeWidth={2.5} />
              </div>
              {i18n.language === 'en' ? 'Patient Reception' : 'استقبال المرضى'}
            </h1>
            <p className="text-muted-foreground mt-2">
              {i18n.language === 'en' 
                ? 'Register patients and direct them to appropriate services' 
                : 'تسجيل المرضى وتوجيههم إلى الخدمات المناسبة'}
            </p>
          </div>
          <div className="flex gap-2">
            <Dialog open={showRegisterDialog} onOpenChange={setShowRegisterDialog}>
              <DialogTrigger asChild>
                <Button className="gap-2 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700">
                  <UserPlus className="h-4 w-4" />
                  {i18n.language === 'en' ? 'Register Patient' : 'تسجيل مريض'}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{i18n.language === 'en' ? 'New Patient Registration' : 'تسجيل مريض جديد'}</DialogTitle>
                  <DialogDescription>
                    {i18n.language === 'en' 
                      ? 'Fill in patient information and visit details' 
                      : 'أدخل معلومات المريض وتفاصيل الزيارة'}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  {/* Patient Info */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <Label>{i18n.language === 'en' ? 'Full Name' : 'الاسم الكامل'} *</Label>
                      <Input
                        value={formData.patientName}
                        onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                        placeholder={i18n.language === 'en' ? 'Enter full name' : 'أدخل الاسم الكامل'}
                      />
                    </div>
                    <div>
                      <Label>{i18n.language === 'en' ? 'Age' : 'العمر'}</Label>
                      <Input
                        type="number"
                        value={formData.age}
                        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>{i18n.language === 'en' ? 'Gender' : 'الجنس'}</Label>
                      <Select value={formData.gender} onValueChange={(value: any) => setFormData({ ...formData, gender: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">{i18n.language === 'en' ? 'Male' : 'ذكر'}</SelectItem>
                          <SelectItem value="female">{i18n.language === 'en' ? 'Female' : 'أنثى'}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>{i18n.language === 'en' ? 'National ID' : 'رقم الهوية'}</Label>
                      <Input
                        value={formData.nationalId}
                        onChange={(e) => setFormData({ ...formData, nationalId: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>{i18n.language === 'en' ? 'Phone Number' : 'رقم الهاتف'} *</Label>
                      <Input
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+966..."
                      />
                    </div>
                  </div>

                  {/* Visit Details */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>{i18n.language === 'en' ? 'Visit Type' : 'نوع الزيارة'}</Label>
                      <Select value={formData.visitType} onValueChange={(value: any) => setFormData({ ...formData, visitType: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {VISIT_TYPES_DATA.map((type) => (
                            <SelectItem key={type.type} value={type.type}>
                              {type.icon} {i18n.language === 'en' ? type.nameEn : type.nameAr}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>{i18n.language === 'en' ? 'Priority' : 'الأولوية'}</Label>
                      <Select value={formData.priority} onValueChange={(value: any) => setFormData({ ...formData, priority: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {PRIORITY_LEVELS.map((level) => (
                            <SelectItem key={level.value} value={level.value}>
                              {i18n.language === 'en' ? level.labelEn : level.labelAr}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="col-span-2">
                      <Label>{i18n.language === 'en' ? 'Visit Reason' : 'سبب الزيارة'}</Label>
                      <Textarea
                        value={formData.visitReason}
                        onChange={(e) => setFormData({ ...formData, visitReason: e.target.value })}
                        placeholder={i18n.language === 'en' ? 'Describe the reason for visit' : 'اشرح سبب الزيارة'}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setShowRegisterDialog(false)}>
                    {i18n.language === 'en' ? 'Cancel' : 'إلغاء'}
                  </Button>
                  <Button onClick={handleRegister}>
                    {i18n.language === 'en' ? 'Register' : 'تسجيل'}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="premium-card border-t-4 border-t-teal-500">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {i18n.language === 'en' ? 'Today Total' : 'إجمالي اليوم'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold gradient-text">{stats.todayTotal}</div>
                <Users className="h-8 w-8 text-teal-500 opacity-50" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {i18n.language === 'en' ? 'Registered patients' : 'مريض مسجل'}
              </p>
            </CardContent>
          </Card>

          <Card className="premium-card border-t-4 border-t-blue-500">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {i18n.language === 'en' ? 'Waiting' : 'في الانتظار'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold text-blue-600">{stats.waiting}</div>
                <Clock className="h-8 w-8 text-blue-500 opacity-50" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {stats.averageWaitTime.toFixed(0)} {i18n.language === 'en' ? 'min avg wait' : 'دقيقة متوسط الانتظار'}
              </p>
            </CardContent>
          </Card>

          <Card className="premium-card border-t-4 border-t-purple-500">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {i18n.language === 'en' ? 'Directed' : 'تم التوجيه'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold text-purple-600">{stats.directed}</div>
                <Send className="h-8 w-8 text-purple-500 opacity-50" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {i18n.language === 'en' ? 'To services' : 'إلى الخدمات'}
              </p>
            </CardContent>
          </Card>

          <Card className="premium-card border-t-4 border-t-green-500">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {i18n.language === 'en' ? 'Completed' : 'مكتمل'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold text-green-600">{stats.completed}</div>
                <CheckCircle2 className="h-8 w-8 text-green-500 opacity-50" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {stats.averageProcessTime.toFixed(0)} {i18n.language === 'en' ? 'min avg' : 'دقيقة متوسط'}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Registration Buttons */}
        <Card className="premium-card">
          <CardHeader>
            <CardTitle>{i18n.language === 'en' ? 'Quick Registration' : 'تسجيل سريع'}</CardTitle>
            <CardDescription>
              {i18n.language === 'en' ? 'Fast registration for common visit types' : 'تسجيل سريع لأنواع الزيارات الشائعة'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-3">
              {VISIT_TYPES_DATA.map((visitType) => (
                <Button
                  key={visitType.type}
                  variant="outline"
                  className="flex flex-col h-20 gap-1"
                  onClick={() => handleQuickRegister(visitType.type)}
                >
                  <span className="text-2xl">{visitType.icon}</span>
                  <span className="text-xs">
                    {i18n.language === 'en' ? visitType.nameEn : visitType.nameAr}
                  </span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Tabs defaultValue="receptions" className="space-y-4">
          <TabsList className="bg-white border shadow-sm">
            <TabsTrigger value="receptions" className="gap-2">
              <FileText className="h-4 w-4" />
              {i18n.language === 'en' ? 'Receptions' : 'الاستقبال'}
            </TabsTrigger>
            <TabsTrigger value="queue" className="gap-2">
              <Clock className="h-4 w-4" />
              {i18n.language === 'en' ? 'Queue' : 'قائمة الانتظار'}
              {queue.length > 0 && (
                <Badge variant="destructive" className="ml-1">{queue.length}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="statistics" className="gap-2">
              <TrendingUp className="h-4 w-4" />
              {i18n.language === 'en' ? 'Statistics' : 'الإحصائيات'}
            </TabsTrigger>
          </TabsList>

          {/* Receptions Tab */}
          <TabsContent value="receptions" className="space-y-4">
            <Card className="premium-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{i18n.language === 'en' ? 'Patient Receptions' : 'استقبالات المرضى'}</CardTitle>
                    <CardDescription>
                      {i18n.language === 'en' ? 'Manage and track patient registrations' : 'إدارة ومتابعة تسجيلات المرضى'}
                    </CardDescription>
                  </div>
                </div>

                {/* Filters */}
                <div className="flex gap-3 mt-4">
                  <div className="flex-1 relative">
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder={i18n.language === 'en' ? 'Search by name, reception number, phone...' : 'بحث بالاسم، رقم الاستقبال، الهاتف...'}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pr-10"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder={i18n.language === 'en' ? 'Status' : 'الحالة'} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{i18n.language === 'en' ? 'All Status' : 'كل الحالات'}</SelectItem>
                      <SelectItem value="registered">{i18n.language === 'en' ? 'Registered' : 'مسجل'}</SelectItem>
                      <SelectItem value="directed">{i18n.language === 'en' ? 'Directed' : 'موجه'}</SelectItem>
                      <SelectItem value="completed">{i18n.language === 'en' ? 'Completed' : 'مكتمل'}</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={visitTypeFilter} onValueChange={setVisitTypeFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder={i18n.language === 'en' ? 'Visit Type' : 'نوع الزيارة'} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{i18n.language === 'en' ? 'All Types' : 'كل الأنواع'}</SelectItem>
                      {VISIT_TYPES_DATA.map((type) => (
                        <SelectItem key={type.type} value={type.type}>
                          {i18n.language === 'en' ? type.nameEn : type.nameAr}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                {filteredReceptions.length === 0 ? (
                  <div className="text-center py-12">
                    <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                    <p className="text-muted-foreground">
                      {i18n.language === 'en' ? 'No receptions found' : 'لا توجد استقبالات'}
                    </p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>{i18n.language === 'en' ? 'Reception #' : 'رقم الاستقبال'}</TableHead>
                        <TableHead>{i18n.language === 'en' ? 'Patient' : 'المريض'}</TableHead>
                        <TableHead>{i18n.language === 'en' ? 'Visit Type' : 'نوع الزيارة'}</TableHead>
                        <TableHead>{i18n.language === 'en' ? 'Priority' : 'الأولوية'}</TableHead>
                        <TableHead>{i18n.language === 'en' ? 'Status' : 'الحالة'}</TableHead>
                        <TableHead>{i18n.language === 'en' ? 'Time' : 'الوقت'}</TableHead>
                        <TableHead>{i18n.language === 'en' ? 'Directed To' : 'الموجه إلى'}</TableHead>
                        <TableHead>{i18n.language === 'en' ? 'Actions' : 'الإجراءات'}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredReceptions.map((reception) => {
                        const visitTypeData = VISIT_TYPES_DATA.find(v => v.type === reception.visitType);
                        return (
                          <TableRow key={reception.id}>
                            <TableCell className="font-medium">{reception.receptionNumber}</TableCell>
                            <TableCell>
                              <div>
                                <div className="font-semibold">{reception.patientName}</div>
                                <div className="text-xs text-muted-foreground flex items-center gap-2">
                                  <Phone className="h-3 w-3" />
                                  {reception.phone}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <span>{visitTypeData?.icon}</span>
                                <span>{i18n.language === 'en' ? visitTypeData?.nameEn : visitTypeData?.nameAr}</span>
                              </div>
                            </TableCell>
                            <TableCell>{getPriorityBadge(reception.priority)}</TableCell>
                            <TableCell>{getStatusBadge(reception.status)}</TableCell>
                            <TableCell>
                              <div className="text-sm">
                                <div>{reception.visitTime}</div>
                                <div className="text-xs text-muted-foreground">{reception.visitDate}</div>
                              </div>
                            </TableCell>
                            <TableCell>
                              {reception.directedTo ? (
                                <div className="text-sm">
                                  <div className="font-medium">{reception.directedTo.department || '-'}</div>
                                  <div className="text-xs text-muted-foreground">{reception.directedTo.doctor || '-'}</div>
                                </div>
                              ) : (
                                <span className="text-muted-foreground">-</span>
                              )}
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-1">
                                {reception.status === 'registered' && (
                                  <Dialog open={showDirectDialog && selectedReception === reception.id} onOpenChange={(open) => {
                                    setShowDirectDialog(open);
                                    if (open) setSelectedReception(reception.id);
                                    else setSelectedReception("");
                                  }}>
                                    <DialogTrigger asChild>
                                      <Button size="sm" variant="outline" className="gap-1">
                                        <Send className="h-3 w-3" />
                                        {i18n.language === 'en' ? 'Direct' : 'توجيه'}
                                      </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                      <DialogHeader>
                                        <DialogTitle>{i18n.language === 'en' ? 'Direct Patient' : 'توجيه المريض'}</DialogTitle>
                                        <DialogDescription>
                                          {reception.patientName} - {reception.receptionNumber}
                                        </DialogDescription>
                                      </DialogHeader>
                                      <div className="grid gap-4 py-4">
                                        <div>
                                          <Label>{i18n.language === 'en' ? 'Direct To Module' : 'التوجيه إلى مديول'}</Label>
                                          <Select value={directionData.module} onValueChange={(value: any) => setDirectionData({ ...directionData, module: value })}>
                                            <SelectTrigger>
                                              <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                              {VISIT_TYPES_DATA.map((type) => (
                                                <SelectItem key={type.type} value={type.type}>
                                                  {type.icon} {i18n.language === 'en' ? type.nameEn : type.nameAr}
                                                </SelectItem>
                                              ))}
                                            </SelectContent>
                                          </Select>
                                        </div>
                                        <div>
                                          <Label>{i18n.language === 'en' ? 'Department' : 'القسم'}</Label>
                                          <Input
                                            value={directionData.department}
                                            onChange={(e) => setDirectionData({ ...directionData, department: e.target.value })}
                                          />
                                        </div>
                                        <div>
                                          <Label>{i18n.language === 'en' ? 'Doctor' : 'الطبيب'}</Label>
                                          <Input
                                            value={directionData.doctor}
                                            onChange={(e) => setDirectionData({ ...directionData, doctor: e.target.value })}
                                          />
                                        </div>
                                        <div>
                                          <Label>{i18n.language === 'en' ? 'Room' : 'الغرفة'}</Label>
                                          <Input
                                            value={directionData.room}
                                            onChange={(e) => setDirectionData({ ...directionData, room: e.target.value })}
                                          />
                                        </div>
                                        <div>
                                          <Label>{i18n.language === 'en' ? 'Notes' : 'ملاحظات'}</Label>
                                          <Textarea
                                            value={directionData.notes}
                                            onChange={(e) => setDirectionData({ ...directionData, notes: e.target.value })}
                                          />
                                        </div>
                                      </div>
                                      <div className="flex justify-end gap-2">
                                        <Button variant="outline" onClick={() => setShowDirectDialog(false)}>
                                          {i18n.language === 'en' ? 'Cancel' : 'إلغاء'}
                                        </Button>
                                        <Button onClick={handleDirect} className="gap-2">
                                          <Send className="h-4 w-4" />
                                          {i18n.language === 'en' ? 'Direct' : 'توجيه'}
                                        </Button>
                                      </div>
                                    </DialogContent>
                                  </Dialog>
                                )}
                                {reception.directedTo && (
                                  <Button 
                                    size="sm" 
                                    variant="default"
                                    onClick={() => handleNavigateToModule(reception.directedTo!.module, reception.id)}
                                    className="gap-1"
                                  >
                                    <ArrowRight className="h-3 w-3" />
                                    {i18n.language === 'en' ? 'Go' : 'انتقال'}
                                  </Button>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Queue Tab */}
          <TabsContent value="queue">
            <Card className="premium-card">
              <CardHeader>
                <CardTitle>{i18n.language === 'en' ? 'Waiting Queue' : 'قائمة الانتظار'}</CardTitle>
                <CardDescription>
                  {i18n.language === 'en' ? 'Patients waiting for service' : 'المرضى في انتظار الخدمة'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {queue.length === 0 ? (
                  <div className="text-center py-12">
                    <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                    <p className="text-muted-foreground">
                      {i18n.language === 'en' ? 'No patients in queue' : 'لا يوجد مرضى في الانتظار'}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {queue.map((item) => {
                      const visitTypeData = VISIT_TYPES_DATA.find(v => v.type === item.visitType);
                      return (
                        <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg bg-gradient-to-r from-slate-50 to-white">
                          <div className="flex items-center gap-4">
                            <div className="text-4xl font-bold text-teal-600">
                              {item.queueNumber}
                            </div>
                            <div>
                              <div className="font-semibold">{item.patientName}</div>
                              <div className="text-sm text-muted-foreground flex items-center gap-2">
                                <span>{visitTypeData?.icon}</span>
                                <span>{i18n.language === 'en' ? visitTypeData?.nameEn : visitTypeData?.nameAr}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            {getPriorityBadge(item.priority)}
                            <div className="text-right">
                              <div className="text-sm text-muted-foreground">
                                {i18n.language === 'en' ? 'Wait Time' : 'وقت الانتظار'}
                              </div>
                              <div className="font-semibold">{item.waitTime} {i18n.language === 'en' ? 'min' : 'دقيقة'}</div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Statistics Tab */}
          <TabsContent value="statistics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="premium-card">
                <CardHeader>
                  <CardTitle>{i18n.language === 'en' ? 'By Visit Type' : 'حسب نوع الزيارة'}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {stats.byVisitType.map((item) => {
                      const visitTypeData = VISIT_TYPES_DATA.find(v => v.type === item.type);
                      return (
                        <div key={item.type} className="flex items-center justify-between p-3 bg-gradient-to-r from-slate-50 to-white rounded-xl">
                          <span className="font-medium flex items-center gap-2">
                            <span>{visitTypeData?.icon}</span>
                            {i18n.language === 'en' ? visitTypeData?.nameEn : visitTypeData?.nameAr}
                          </span>
                          <Badge variant="secondary" className="text-lg">{item.count}</Badge>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card className="premium-card">
                <CardHeader>
                  <CardTitle>{i18n.language === 'en' ? 'By Priority' : 'حسب الأولوية'}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {stats.byPriority.map((item) => {
                      const priorityData = PRIORITY_LEVELS.find(p => p.value === item.priority);
                      return (
                        <div key={item.priority} className="flex items-center justify-between p-3 bg-gradient-to-r from-slate-50 to-white rounded-xl">
                          <span className="font-medium">
                            {i18n.language === 'en' ? priorityData?.labelEn : priorityData?.labelAr}
                          </span>
                          <Badge variant="secondary" className="text-lg">{item.count}</Badge>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-6 pt-6 border-t space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">{i18n.language === 'en' ? 'New Patients' : 'مرضى جدد'}</span>
                      <span className="font-semibold">{stats.newPatients}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">{i18n.language === 'en' ? 'Returning Patients' : 'مرضى عائدين'}</span>
                      <span className="font-semibold">{stats.returningPatients}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
