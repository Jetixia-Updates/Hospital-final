import { useState } from "react";
import { useTranslation } from "react-i18next";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PatientServiceTracker, {
  getPatientServices,
  getPatientBillingSummary,
} from "@/components/PatientServiceTracker";
import Invoice from "@/components/Invoice";
import { usePatientBilling } from "@/hooks/use-patient-billing";
import { Plus, FileText, Receipt, User, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

export default function BillingDemo() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  // Patient billing hook
  const {
    addConsultation,
    addLabTest,
    addRadiology,
    addMedication,
    addSurgery,
    addAccommodation,
    addEmergency,
    addTherapy,
  } = usePatientBilling();

  // Demo patients
  const demoPatients = [
    { id: "P001", name: "أحمد محمد علي", phone: "01012345678", address: "القاهرة، مصر" },
    { id: "P002", name: "فاطمة حسن", phone: "01098765432", address: "الجيزة، مصر" },
    { id: "P003", name: "محمد عبدالله", phone: "01123456789", address: "الإسكندرية، مصر" },
  ];

  const [selectedPatient, setSelectedPatient] = useState(demoPatients[0]);
  const [showInvoice, setShowInvoice] = useState(false);
  const [isAddServiceDialogOpen, setIsAddServiceDialogOpen] = useState(false);
  const [serviceType, setServiceType] = useState<string>("consultation");
  const [serviceName, setServiceName] = useState("");
  const [servicePrice, setServicePrice] = useState("");
  const [serviceQuantity, setServiceQuantity] = useState("1");

  // Add quick demo services
  const addQuickDemoServices = () => {
    // Consultation
    addConsultation(
      selectedPatient.id,
      selectedPatient.name,
      "د. أحمد محمود",
      "الطوارئ",
      500
    );

    // Lab Tests
    addLabTest(selectedPatient.id, selectedPatient.name, "تحليل دم شامل", 800);
    addLabTest(selectedPatient.id, selectedPatient.name, "تحليل بول", 200);

    // Radiology
    addRadiology(selectedPatient.id, selectedPatient.name, "أشعة على الصدر", 600);

    // Medications
    addMedication(selectedPatient.id, selectedPatient.name, "باراسيتامول 500mg", 2, 50);
    addMedication(selectedPatient.id, selectedPatient.name, "أموكسيسيلين 500mg", 1, 120);

    // Accommodation
    addAccommodation(selectedPatient.id, selectedPatient.name, "غرفة عادية", 2, 500);
  };

  // Add custom service
  const handleAddCustomService = () => {
    if (!serviceName || !servicePrice) return;

    const price = parseFloat(servicePrice);
    const quantity = parseInt(serviceQuantity);

    switch (serviceType) {
      case "consultation":
        addConsultation(selectedPatient.id, selectedPatient.name, serviceName, "عام", price);
        break;
      case "laboratory":
        addLabTest(selectedPatient.id, selectedPatient.name, serviceName, price);
        break;
      case "radiology":
        addRadiology(selectedPatient.id, selectedPatient.name, serviceName, price);
        break;
      case "medication":
        addMedication(selectedPatient.id, selectedPatient.name, serviceName, quantity, price);
        break;
      case "surgery":
        addSurgery(selectedPatient.id, selectedPatient.name, serviceName, "د. جراح", price);
        break;
      case "accommodation":
        addAccommodation(selectedPatient.id, selectedPatient.name, serviceName, quantity, price);
        break;
      case "emergency":
        addEmergency(selectedPatient.id, selectedPatient.name, serviceName, price);
        break;
      case "therapy":
        addTherapy(selectedPatient.id, selectedPatient.name, serviceName, quantity, price);
        break;
    }

    setIsAddServiceDialogOpen(false);
    setServiceName("");
    setServicePrice("");
    setServiceQuantity("1");
  };

  // Generate invoice
  const handleGenerateInvoice = () => {
    const services = getPatientServices(selectedPatient.id);
    if (services.length === 0) {
      alert("لا توجد خدمات لإنشاء فاتورة");
      return;
    }
    setShowInvoice(true);
  };

  const patientServices = getPatientServices(selectedPatient.id);

  return (
    <Layout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            🧪 {t("billing.title")} - صفحة تجريبية
          </h1>
          <p className="text-slate-600">
            عرض توضيحي لنظام تتبع خدمات المريض وإنشاء الفواتير
          </p>
        </div>

        {/* Patient Selection */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              {t("common.patientInfo")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {demoPatients.map((patient) => (
                <Button
                  key={patient.id}
                  variant={selectedPatient.id === patient.id ? "default" : "outline"}
                  className="h-auto py-4 justify-start"
                  onClick={() => setSelectedPatient(patient)}
                >
                  <div className="text-right w-full">
                    <div className="font-bold">{patient.name}</div>
                    <div className="text-xs opacity-80">{patient.id}</div>
                    <div className="text-xs opacity-60">{patient.phone}</div>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              إجراءات سريعة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button onClick={addQuickDemoServices} className="gap-2">
                <Plus className="w-4 h-4" />
                إضافة خدمات تجريبية
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsAddServiceDialogOpen(true)}
                className="gap-2"
              >
                <Plus className="w-4 h-4" />
                إضافة خدمة مخصصة
              </Button>
              <Button
                variant="outline"
                onClick={handleGenerateInvoice}
                disabled={patientServices.length === 0}
                className="gap-2"
              >
                <FileText className="w-4 h-4" />
                إنشاء فاتورة
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Tabs defaultValue="tracker" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="tracker">
              <Receipt className={cn("w-4 h-4", isRTL ? "ml-2" : "mr-2")} />
              تتبع الخدمات
            </TabsTrigger>
            <TabsTrigger value="invoice" disabled={patientServices.length === 0}>
              <FileText className={cn("w-4 h-4", isRTL ? "ml-2" : "mr-2")} />
              الفاتورة
            </TabsTrigger>
          </TabsList>

          {/* Service Tracker Tab */}
          <TabsContent value="tracker">
            <PatientServiceTracker
              patientId={selectedPatient.id}
              patientName={selectedPatient.name}
              departmentName="عرض توضيحي"
            />
          </TabsContent>

          {/* Invoice Tab */}
          <TabsContent value="invoice">
            {patientServices.length > 0 ? (
              <Invoice
                invoiceNumber={`INV-${Date.now()}`}
                patientId={selectedPatient.id}
                patientName={selectedPatient.name}
                patientPhone={selectedPatient.phone}
                patientAddress={selectedPatient.address}
                services={patientServices}
                invoiceDate={new Date().toISOString().split("T")[0]}
                dueDate={
                  new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
                    .toISOString()
                    .split("T")[0]
                }
                discount={5}
                tax={14}
                notes="شكراً لاختياركم HealthHub - نتمنى لكم دوام الصحة والعافية"
              />
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <FileText className="w-16 h-16 mx-auto mb-4 text-slate-300" />
                  <p className="text-slate-600 mb-4">لا توجد خدمات لإنشاء فاتورة</p>
                  <Button onClick={addQuickDemoServices}>
                    إضافة خدمات تجريبية
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* Add Custom Service Dialog */}
        <Dialog open={isAddServiceDialogOpen} onOpenChange={setIsAddServiceDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>إضافة خدمة مخصصة</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>نوع الخدمة</Label>
                <Select value={serviceType} onValueChange={setServiceType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="consultation">{t("billing.consultation")}</SelectItem>
                    <SelectItem value="laboratory">{t("billing.laboratory")}</SelectItem>
                    <SelectItem value="radiology">{t("billing.radiology")}</SelectItem>
                    <SelectItem value="medication">{t("billing.medication")}</SelectItem>
                    <SelectItem value="surgery">{t("billing.surgery")}</SelectItem>
                    <SelectItem value="accommodation">{t("billing.accommodation")}</SelectItem>
                    <SelectItem value="emergency">{t("billing.emergency")}</SelectItem>
                    <SelectItem value="therapy">{t("billing.therapy")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>اسم الخدمة</Label>
                <Input
                  value={serviceName}
                  onChange={(e) => setServiceName(e.target.value)}
                  placeholder="مثال: استشارة طبية"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>السعر (جنيه)</Label>
                  <Input
                    type="number"
                    value={servicePrice}
                    onChange={(e) => setServicePrice(e.target.value)}
                    placeholder="500"
                  />
                </div>

                <div className="space-y-2">
                  <Label>الكمية</Label>
                  <Input
                    type="number"
                    value={serviceQuantity}
                    onChange={(e) => setServiceQuantity(e.target.value)}
                    placeholder="1"
                    min="1"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsAddServiceDialogOpen(false)}
              >
                {t("common.cancel")}
              </Button>
              <Button onClick={handleAddCustomService}>
                {t("common.add")}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Invoice Dialog */}
        <Dialog open={showInvoice} onOpenChange={setShowInvoice}>
          <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>فاتورة تفصيلية - {selectedPatient.name}</DialogTitle>
            </DialogHeader>
            {patientServices.length > 0 && (
              <Invoice
                invoiceNumber={`INV-${Date.now()}`}
                patientId={selectedPatient.id}
                patientName={selectedPatient.name}
                patientPhone={selectedPatient.phone}
                patientAddress={selectedPatient.address}
                services={patientServices}
                invoiceDate={new Date().toISOString().split("T")[0]}
                dueDate={
                  new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
                    .toISOString()
                    .split("T")[0]
                }
                discount={5}
                tax={14}
                notes="شكراً لاختياركم HealthHub - نتمنى لكم دوام الصحة والعافية"
              />
            )}
          </DialogContent>
        </Dialog>

        {/* Instructions */}
        <Card className="mt-6 border-blue-200 bg-blue-50">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold text-blue-900 mb-3">
              📝 تعليمات الاستخدام
            </h3>
            <ol className="space-y-2 text-sm text-blue-800" dir="rtl">
              <li>1️⃣ اختر مريض من القائمة أعلاه</li>
              <li>2️⃣ اضغط "إضافة خدمات تجريبية" لإضافة خدمات سريعة</li>
              <li>3️⃣ أو اضغط "إضافة خدمة مخصصة" لإضافة خدمة محددة</li>
              <li>4️⃣ شاهد تتبع الخدمات في التبويب الأول</li>
              <li>5️⃣ انتقل لتبويب "الفاتورة" لمشاهدة الفاتورة التفصيلية</li>
              <li>6️⃣ يمكنك طباعة الفاتورة أو تحميلها كـ PDF</li>
            </ol>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
