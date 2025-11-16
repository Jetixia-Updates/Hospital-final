import { useState } from "react";
import { useTranslation } from "react-i18next";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  DollarSign,
  FileText,
  CreditCard,
  TrendingUp,
  Search,
  Plus,
  Eye,
  Printer,
  Download,
  Calendar,
  Filter,
  BarChart3,
  Users,
  Activity,
  Clock,
  CheckCircle2,
  AlertCircle,
  XCircle,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data for demonstration
const mockPatients = [
  {
    id: "P001",
    name: "أحمد محمد علي",
    totalServices: 8,
    totalAmount: 15000,
    paidAmount: 10000,
    remainingAmount: 5000,
    status: "partial",
  },
  {
    id: "P002",
    name: "فاطمة حسن",
    totalServices: 5,
    totalAmount: 8500,
    paidAmount: 8500,
    remainingAmount: 0,
    status: "paid",
  },
  {
    id: "P003",
    name: "محمد عبدالله",
    totalServices: 12,
    totalAmount: 25000,
    paidAmount: 0,
    remainingAmount: 25000,
    status: "unpaid",
  },
  {
    id: "P004",
    name: "سارة إبراهيم",
    totalServices: 6,
    totalAmount: 12000,
    paidAmount: 5000,
    remainingAmount: 7000,
    status: "partial",
  },
];

const mockServices = [
  {
    id: "S001",
    patientId: "P001",
    type: "consultation",
    name: "استشارة طبية",
    date: "2024-01-15",
    department: "الطوارئ",
    provider: "د. أحمد علي",
    quantity: 1,
    unitPrice: 500,
    amount: 500,
    status: "billed",
  },
  {
    id: "S002",
    patientId: "P001",
    type: "laboratory",
    name: "تحليل دم شامل",
    date: "2024-01-15",
    department: "المختبر",
    provider: "مختبر التحاليل",
    quantity: 1,
    unitPrice: 800,
    amount: 800,
    status: "billed",
  },
  {
    id: "S003",
    patientId: "P001",
    type: "radiology",
    name: "أشعة سينية - صدر",
    date: "2024-01-16",
    department: "الأشعة",
    provider: "قسم الأشعة",
    quantity: 1,
    unitPrice: 1200,
    amount: 1200,
    status: "billed",
  },
  {
    id: "S004",
    patientId: "P001",
    type: "medication",
    name: "أدوية",
    date: "2024-01-16",
    department: "الصيدلية",
    provider: "الصيدلية الرئيسية",
    quantity: 5,
    unitPrice: 150,
    amount: 750,
    status: "paid",
  },
];

const mockInvoices = [
  {
    id: "INV-001",
    patientId: "P001",
    patientName: "أحمد محمد علي",
    date: "2024-01-20",
    dueDate: "2024-02-20",
    amount: 15000,
    paid: 10000,
    status: "partial",
    services: 8,
  },
  {
    id: "INV-002",
    patientId: "P002",
    patientName: "فاطمة حسن",
    date: "2024-01-18",
    dueDate: "2024-02-18",
    amount: 8500,
    paid: 8500,
    status: "paid",
    services: 5,
  },
  {
    id: "INV-003",
    patientId: "P003",
    patientName: "محمد عبدالله",
    date: "2024-01-22",
    dueDate: "2024-02-22",
    amount: 25000,
    paid: 0,
    status: "overdue",
    services: 12,
  },
];

const mockPayments = [
  {
    id: "PAY-001",
    invoiceId: "INV-001",
    patientName: "أحمد محمد علي",
    amount: 10000,
    date: "2024-01-25",
    method: "creditCard",
    reference: "REF-12345",
  },
  {
    id: "PAY-002",
    invoiceId: "INV-002",
    patientName: "فاطمة حسن",
    amount: 8500,
    date: "2024-01-20",
    method: "cash",
    reference: "REF-12346",
  },
];

export default function Billing() {
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const isRTL = i18n.language === "ar";

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);
  const [isAddServiceDialogOpen, setIsAddServiceDialogOpen] = useState(false);

  // Statistics
  const totalRevenue = mockInvoices.reduce((sum, inv) => sum + inv.paid, 0);
  const pendingAmount = mockInvoices.reduce(
    (sum, inv) => sum + (inv.amount - inv.paid),
    0
  );
  const todayRevenue = 18500; // Mock data
  const invoiceCount = mockInvoices.length;

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      paid: { color: "bg-green-100 text-green-700", label: t("billing.fullyPaid") },
      partial: { color: "bg-yellow-100 text-yellow-700", label: t("billing.partiallyPaid") },
      unpaid: { color: "bg-red-100 text-red-700", label: t("billing.unpaid") },
      overdue: { color: "bg-red-100 text-red-700", label: t("billing.overdue") },
      pending: { color: "bg-blue-100 text-blue-700", label: t("billing.pending") },
      billed: { color: "bg-purple-100 text-purple-700", label: t("billing.billed") },
      cancelled: { color: "bg-gray-100 text-gray-700", label: t("billing.cancelled") },
    };
    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <Badge className={config.color}>
        {config.label}
      </Badge>
    );
  };

  const handleAddService = () => {
    toast({
      title: t("billing.servicesAdded"),
      description: "تم إضافة الخدمة بنجاح",
    });
    setIsAddServiceDialogOpen(false);
  };

  return (
    <Layout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            {t("billing.title")}
          </h1>
          <p className="text-slate-600">{t("billing.subtitle")}</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">
                    {t("billing.totalRevenue")}
                  </p>
                  <p className="text-3xl font-bold text-slate-900">
                    {totalRevenue.toLocaleString()} {t("common.currency", "ج.م")}
                  </p>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-green-600">+12.5%</span>
                  </div>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-7 h-7 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">
                    {t("billing.todayRevenue")}
                  </p>
                  <p className="text-3xl font-bold text-slate-900">
                    {todayRevenue.toLocaleString()} {t("common.currency", "ج.م")}
                  </p>
                  <div className="flex items-center gap-1 mt-2">
                    <Activity className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-slate-500">{t("common.today")}</span>
                  </div>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <CreditCard className="w-7 h-7 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">
                    {t("billing.pendingInvoices")}
                  </p>
                  <p className="text-3xl font-bold text-slate-900">
                    {pendingAmount.toLocaleString()} {t("common.currency", "ج.م")}
                  </p>
                  <div className="flex items-center gap-1 mt-2">
                    <Clock className="w-4 h-4 text-yellow-600" />
                    <span className="text-sm text-slate-500">{invoiceCount} {t("billing.invoices")}</span>
                  </div>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center">
                  <FileText className="w-7 h-7 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">
                    {t("billing.collectionRate")}
                  </p>
                  <p className="text-3xl font-bold text-slate-900">87%</p>
                  <div className="flex items-center gap-1 mt-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-slate-500">{t("common.thisMonth")}</span>
                  </div>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <BarChart3 className="w-7 h-7 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="patients" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="patients">
              <Users className={cn("w-4 h-4", isRTL ? "ml-2" : "mr-2")} />
              {t("billing.patientBilling")}
            </TabsTrigger>
            <TabsTrigger value="services">
              <Activity className={cn("w-4 h-4", isRTL ? "ml-2" : "mr-2")} />
              {t("billing.services")}
            </TabsTrigger>
            <TabsTrigger value="invoices">
              <FileText className={cn("w-4 h-4", isRTL ? "ml-2" : "mr-2")} />
              {t("billing.invoices")}
            </TabsTrigger>
            <TabsTrigger value="payments">
              <CreditCard className={cn("w-4 h-4", isRTL ? "ml-2" : "mr-2")} />
              {t("billing.payments")}
            </TabsTrigger>
          </TabsList>

          {/* Patient Billing Tab */}
          <TabsContent value="patients">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{t("billing.patientBilling")}</CardTitle>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search
                        className={cn(
                          "absolute top-3 w-4 h-4 text-slate-400",
                          isRTL ? "right-3" : "left-3"
                        )}
                      />
                      <Input
                        placeholder={t("billing.searchPatient")}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={cn("w-64", isRTL ? "pr-10" : "pl-10")}
                      />
                    </div>
                    <Button variant="outline">
                      <Filter className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className={cn("py-3 px-4 text-sm font-semibold text-slate-700", isRTL ? "text-right" : "text-left")}>
                          {t("billing.patientId")}
                        </th>
                        <th className={cn("py-3 px-4 text-sm font-semibold text-slate-700", isRTL ? "text-right" : "text-left")}>
                          {t("billing.patientName")}
                        </th>
                        <th className={cn("py-3 px-4 text-sm font-semibold text-slate-700", isRTL ? "text-right" : "text-left")}>
                          {t("billing.totalServices")}
                        </th>
                        <th className={cn("py-3 px-4 text-sm font-semibold text-slate-700", isRTL ? "text-right" : "text-left")}>
                          {t("billing.totalAmount")}
                        </th>
                        <th className={cn("py-3 px-4 text-sm font-semibold text-slate-700", isRTL ? "text-right" : "text-left")}>
                          {t("billing.paidAmount")}
                        </th>
                        <th className={cn("py-3 px-4 text-sm font-semibold text-slate-700", isRTL ? "text-right" : "text-left")}>
                          {t("billing.remainingAmount")}
                        </th>
                        <th className={cn("py-3 px-4 text-sm font-semibold text-slate-700", isRTL ? "text-right" : "text-left")}>
                          {t("billing.status")}
                        </th>
                        <th className={cn("py-3 px-4 text-sm font-semibold text-slate-700", isRTL ? "text-right" : "text-left")}>
                          {t("common.actions")}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockPatients.map((patient) => (
                        <tr key={patient.id} className="border-b border-slate-100 hover:bg-slate-50">
                          <td className="py-4 px-4">
                            <span className="font-medium text-slate-900">{patient.id}</span>
                          </td>
                          <td className="py-4 px-4">
                            <span className="text-slate-900">{patient.name}</span>
                          </td>
                          <td className="py-4 px-4">
                            <span className="text-slate-700">{patient.totalServices}</span>
                          </td>
                          <td className="py-4 px-4">
                            <span className="font-medium text-slate-900">
                              {patient.totalAmount.toLocaleString()} {t("common.currency", "ج.م")}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <span className="text-green-600 font-medium">
                              {patient.paidAmount.toLocaleString()} {t("common.currency", "ج.م")}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <span className={cn(
                              "font-medium",
                              patient.remainingAmount > 0 ? "text-red-600" : "text-green-600"
                            )}>
                              {patient.remainingAmount.toLocaleString()} {t("common.currency", "ج.م")}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            {getStatusBadge(patient.status)}
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="default">
                                <FileText className={cn("w-4 h-4", isRTL ? "ml-1" : "mr-1")} />
                                {t("billing.createInvoice")}
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

          {/* Services Tab */}
          <TabsContent value="services">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{t("billing.serviceTracking")}</CardTitle>
                  <Dialog open={isAddServiceDialogOpen} onOpenChange={setIsAddServiceDialogOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className={cn("w-4 h-4", isRTL ? "ml-2" : "mr-2")} />
                        {t("billing.addService")}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>{t("billing.addService")}</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>{t("billing.patientId")}</Label>
                            <Input placeholder="P001" />
                          </div>
                          <div className="space-y-2">
                            <Label>{t("billing.serviceType")}</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder={t("billing.selectServiceType")} />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="consultation">{t("billing.consultation")}</SelectItem>
                                <SelectItem value="laboratory">{t("billing.laboratory")}</SelectItem>
                                <SelectItem value="radiology">{t("billing.radiology")}</SelectItem>
                                <SelectItem value="surgery">{t("billing.surgery")}</SelectItem>
                                <SelectItem value="medication">{t("billing.medication")}</SelectItem>
                                <SelectItem value="accommodation">{t("billing.accommodation")}</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>{t("billing.serviceName")}</Label>
                          <Input placeholder={t("billing.serviceName")} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>{t("billing.department")}</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder={t("billing.selectDepartment")} />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="emergency">الطوارئ</SelectItem>
                                <SelectItem value="lab">المختبر</SelectItem>
                                <SelectItem value="radiology">الأشعة</SelectItem>
                                <SelectItem value="pharmacy">الصيدلية</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label>{t("billing.serviceDate")}</Label>
                            <Input type="date" />
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label>{t("billing.quantity")}</Label>
                            <Input type="number" placeholder="1" defaultValue="1" />
                          </div>
                          <div className="space-y-2">
                            <Label>{t("billing.unitPrice")}</Label>
                            <Input type="number" placeholder="0.00" />
                          </div>
                          <div className="space-y-2">
                            <Label>{t("billing.amount")}</Label>
                            <Input type="number" placeholder="0.00" disabled />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>{t("billing.notes")}</Label>
                          <Textarea placeholder={t("billing.notes")} rows={3} />
                        </div>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setIsAddServiceDialogOpen(false)}>
                          {t("common.cancel")}
                        </Button>
                        <Button onClick={handleAddService}>
                          {t("common.save")}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className={cn("py-3 px-4 text-sm font-semibold text-slate-700", isRTL ? "text-right" : "text-left")}>
                          {t("billing.patientId")}
                        </th>
                        <th className={cn("py-3 px-4 text-sm font-semibold text-slate-700", isRTL ? "text-right" : "text-left")}>
                          {t("billing.serviceType")}
                        </th>
                        <th className={cn("py-3 px-4 text-sm font-semibold text-slate-700", isRTL ? "text-right" : "text-left")}>
                          {t("billing.serviceName")}
                        </th>
                        <th className={cn("py-3 px-4 text-sm font-semibold text-slate-700", isRTL ? "text-right" : "text-left")}>
                          {t("billing.serviceDate")}
                        </th>
                        <th className={cn("py-3 px-4 text-sm font-semibold text-slate-700", isRTL ? "text-right" : "text-left")}>
                          {t("billing.department")}
                        </th>
                        <th className={cn("py-3 px-4 text-sm font-semibold text-slate-700", isRTL ? "text-right" : "text-left")}>
                          {t("billing.quantity")}
                        </th>
                        <th className={cn("py-3 px-4 text-sm font-semibold text-slate-700", isRTL ? "text-right" : "text-left")}>
                          {t("billing.amount")}
                        </th>
                        <th className={cn("py-3 px-4 text-sm font-semibold text-slate-700", isRTL ? "text-right" : "text-left")}>
                          {t("billing.status")}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockServices.map((service) => (
                        <tr key={service.id} className="border-b border-slate-100 hover:bg-slate-50">
                          <td className="py-4 px-4">
                            <span className="font-medium text-blue-600">{service.patientId}</span>
                          </td>
                          <td className="py-4 px-4">
                            <Badge variant="outline">{t(`billing.${service.type}`)}</Badge>
                          </td>
                          <td className="py-4 px-4">
                            <span className="text-slate-900">{service.name}</span>
                          </td>
                          <td className="py-4 px-4">
                            <span className="text-slate-700">{service.date}</span>
                          </td>
                          <td className="py-4 px-4">
                            <span className="text-slate-700">{service.department}</span>
                          </td>
                          <td className="py-4 px-4">
                            <span className="text-slate-700">{service.quantity}</span>
                          </td>
                          <td className="py-4 px-4">
                            <span className="font-medium text-slate-900">
                              {service.amount.toLocaleString()} {t("common.currency", "ج.م")}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            {getStatusBadge(service.status)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Invoices Tab */}
          <TabsContent value="invoices">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{t("billing.invoices")}</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline">
                      <Download className={cn("w-4 h-4", isRTL ? "ml-2" : "mr-2")} />
                      {t("billing.exportReport")}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className={cn("py-3 px-4 text-sm font-semibold text-slate-700", isRTL ? "text-right" : "text-left")}>
                          {t("billing.invoiceNumber")}
                        </th>
                        <th className={cn("py-3 px-4 text-sm font-semibold text-slate-700", isRTL ? "text-right" : "text-left")}>
                          {t("billing.patientName")}
                        </th>
                        <th className={cn("py-3 px-4 text-sm font-semibold text-slate-700", isRTL ? "text-right" : "text-left")}>
                          {t("billing.invoiceDate")}
                        </th>
                        <th className={cn("py-3 px-4 text-sm font-semibold text-slate-700", isRTL ? "text-right" : "text-left")}>
                          {t("billing.dueDate")}
                        </th>
                        <th className={cn("py-3 px-4 text-sm font-semibold text-slate-700", isRTL ? "text-right" : "text-left")}>
                          {t("billing.amount")}
                        </th>
                        <th className={cn("py-3 px-4 text-sm font-semibold text-slate-700", isRTL ? "text-right" : "text-left")}>
                          {t("billing.status")}
                        </th>
                        <th className={cn("py-3 px-4 text-sm font-semibold text-slate-700", isRTL ? "text-right" : "text-left")}>
                          {t("common.actions")}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockInvoices.map((invoice) => (
                        <tr key={invoice.id} className="border-b border-slate-100 hover:bg-slate-50">
                          <td className="py-4 px-4">
                            <span className="font-medium text-blue-600">{invoice.id}</span>
                          </td>
                          <td className="py-4 px-4">
                            <span className="text-slate-900">{invoice.patientName}</span>
                          </td>
                          <td className="py-4 px-4">
                            <span className="text-slate-700">{invoice.date}</span>
                          </td>
                          <td className="py-4 px-4">
                            <span className="text-slate-700">{invoice.dueDate}</span>
                          </td>
                          <td className="py-4 px-4">
                            <div>
                              <div className="font-medium text-slate-900">
                                {invoice.amount.toLocaleString()} {t("common.currency", "ج.م")}
                              </div>
                              <div className="text-sm text-green-600">
                                {t("billing.paid")}: {invoice.paid.toLocaleString()} {t("common.currency", "ج.م")}
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            {getStatusBadge(invoice.status)}
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Printer className="w-4 h-4" />
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

          {/* Payments Tab */}
          <TabsContent value="payments">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{t("billing.paymentHistory")}</CardTitle>
                  <Button>
                    <Plus className={cn("w-4 h-4", isRTL ? "ml-2" : "mr-2")} />
                    {t("billing.recordPayment")}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className={cn("py-3 px-4 text-sm font-semibold text-slate-700", isRTL ? "text-right" : "text-left")}>
                          {t("billing.receiptNumber")}
                        </th>
                        <th className={cn("py-3 px-4 text-sm font-semibold text-slate-700", isRTL ? "text-right" : "text-left")}>
                          {t("billing.invoiceNumber")}
                        </th>
                        <th className={cn("py-3 px-4 text-sm font-semibold text-slate-700", isRTL ? "text-right" : "text-left")}>
                          {t("billing.patientName")}
                        </th>
                        <th className={cn("py-3 px-4 text-sm font-semibold text-slate-700", isRTL ? "text-right" : "text-left")}>
                          {t("billing.amount")}
                        </th>
                        <th className={cn("py-3 px-4 text-sm font-semibold text-slate-700", isRTL ? "text-right" : "text-left")}>
                          {t("billing.paymentDate")}
                        </th>
                        <th className={cn("py-3 px-4 text-sm font-semibold text-slate-700", isRTL ? "text-right" : "text-left")}>
                          {t("billing.paymentMethod")}
                        </th>
                        <th className={cn("py-3 px-4 text-sm font-semibold text-slate-700", isRTL ? "text-right" : "text-left")}>
                          {t("common.actions")}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockPayments.map((payment) => (
                        <tr key={payment.id} className="border-b border-slate-100 hover:bg-slate-50">
                          <td className="py-4 px-4">
                            <span className="font-medium text-blue-600">{payment.id}</span>
                          </td>
                          <td className="py-4 px-4">
                            <span className="text-slate-700">{payment.invoiceId}</span>
                          </td>
                          <td className="py-4 px-4">
                            <span className="text-slate-900">{payment.patientName}</span>
                          </td>
                          <td className="py-4 px-4">
                            <span className="font-medium text-green-600">
                              {payment.amount.toLocaleString()} {t("common.currency", "ج.م")}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <span className="text-slate-700">{payment.date}</span>
                          </td>
                          <td className="py-4 px-4">
                            <Badge variant="outline">{t(`billing.${payment.method}`)}</Badge>
                          </td>
                          <td className="py-4 px-4">
                            <Button size="sm" variant="outline">
                              <Printer className={cn("w-4 h-4", isRTL ? "ml-1" : "mr-1")} />
                              {t("billing.printReceipt")}
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
