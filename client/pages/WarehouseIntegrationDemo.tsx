import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Package,
  AlertTriangle,
  CheckCircle,
  User,
  DollarSign,
  FileText,
  RefreshCw,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RequestSupplies } from "@/components/RequestSupplies";
import { DispenseSupplies } from "@/components/DispenseSupplies";
import PatientServiceTracker from "@/components/PatientServiceTracker";
import { useWarehouse, initializeWarehouseData } from "@/hooks/use-warehouse";
import { usePatientBilling } from "@/hooks/use-patient-billing";
import { InventoryItem } from "@shared/warehouse";

export default function WarehouseIntegrationDemo() {
  const { t } = useTranslation();
  const { getStockRequests, getDispensingRecords, quickDispense } = useWarehouse();
  const { addMedication } = usePatientBilling();
  const [refreshKey, setRefreshKey] = useState(0);

  // Demo patient
  const demoPatient = {
    id: "P-2024-001",
    name: "أحمد محمد علي",
  };

  // Demo user
  const demoUser = {
    id: "USR-001",
    name: "د. سارة أحمد",
  };

  useEffect(() => {
    initializeDemoData();
  }, []);

  const requests = getStockRequests();
  const dispensingRecords = getDispensingRecords({
    patientId: demoPatient.id,
  });

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const handleQuickDispenseDemo = () => {
    quickDispense({
      itemId: "item_2",
      quantity: 2,
      department: "pharmacy",
      departmentName: "الصيدلية",
      dispensedBy: demoUser.id,
      dispensedByName: demoUser.name,
      patientId: demoPatient.id,
      patientName: demoPatient.name,
      urgency: "normal",
    });
    handleRefresh();
  };

  const handleDirectBillingDemo = () => {
    addMedication(demoPatient.id, demoPatient.name, "دواء اختباري", 1, 150);
    handleRefresh();
  };

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            {t("warehouse.integrationDemo", "نموذج تكامل المخازن والمحاسبة")}
          </h2>
          <p className="text-muted-foreground">
            {t(
              "warehouse.integrationDemoSubtitle",
              "مثال عملي لربط نظام المخازن مع المحاسبة وتتبع خطوات المريض"
            )}
          </p>
        </div>
        <Button variant="outline" onClick={handleRefresh}>
          <RefreshCw className="mr-2 h-4 w-4" />
          {t("common.refresh", "تحديث")}
        </Button>
      </div>

      {/* Info Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="text-blue-900 dark:text-blue-100 flex items-center gap-2">
              <User className="h-5 w-5" />
              {t("common.demoPatient", "مريض تجريبي")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-medium">{demoPatient.name}</p>
            <p className="text-sm text-muted-foreground">{demoPatient.id}</p>
          </CardContent>
        </Card>

        <Card className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
          <CardHeader>
            <CardTitle className="text-green-900 dark:text-green-100 flex items-center gap-2">
              <Package className="h-5 w-5" />
              {t("warehouse.dispensingRecords")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{dispensingRecords.length}</p>
            <p className="text-sm text-muted-foreground">
              {t("warehouse.totalDispensed", "إجمالي الصرف")}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-800">
          <CardHeader>
            <CardTitle className="text-purple-900 dark:text-purple-100 flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              {t("warehouse.billingServices", "خدمات الفاتورة")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {dispensingRecords.filter((r) => r.addedToBilling).length}
            </p>
            <p className="text-sm text-muted-foreground">
              {t("warehouse.autoAddedToBilling", "تمت الإضافة تلقائياً")}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="workflow" className="space-y-4">
        <TabsList>
          <TabsTrigger value="workflow">
            <FileText className="mr-2 h-4 w-4" />
            {t("warehouse.workflowDemo", "سير العمل")}
          </TabsTrigger>
          <TabsTrigger value="requests">
            <Package className="mr-2 h-4 w-4" />
            {t("warehouse.requests")}
          </TabsTrigger>
          <TabsTrigger value="billing">
            <DollarSign className="mr-2 h-4 w-4" />
            {t("warehouse.billingTracking", "تتبع الفاتورة")}
          </TabsTrigger>
        </TabsList>

        {/* Workflow Tab */}
        <TabsContent value="workflow" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>
                {t("warehouse.integrationSteps", "خطوات التكامل")}
              </CardTitle>
              <CardDescription>
                {t(
                  "warehouse.integrationStepsDesc",
                  "شاهد كيف يتم ربط المخازن بالمحاسبة تلقائياً"
                )}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Step 1 */}
              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 font-bold">
                  1
                </div>
                <div className="flex-1 space-y-3">
                  <h3 className="font-semibold">
                    {t("warehouse.step1", "طلب المستلزمات من أي قسم")}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t(
                      "warehouse.step1Desc",
                      "يمكن لأي قسم (صيدلية، عمليات، طوارئ...) طلب المستلزمات باستخدام مكون RequestSupplies"
                    )}
                  </p>
                  <RequestSupplies
                    department="pharmacy"
                    departmentName="الصيدلية"
                    requestedBy={demoUser.id}
                    requestedByName={demoUser.name}
                    patientId={demoPatient.id}
                    patientName={demoPatient.name}
                    onRequestCreated={handleRefresh}
                    buttonVariant="outline"
                    buttonSize="sm"
                    buttonText={t("warehouse.tryRequestSupplies", "جرب طلب المستلزمات")}
                  />
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 font-bold">
                  2
                </div>
                <div className="flex-1 space-y-3">
                  <h3 className="font-semibold">
                    {t("warehouse.step2", "صرف المستلزمات من المخزن")}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t(
                      "warehouse.step2Desc",
                      "عند صرف المستلزمات باستخدام مكون DispenseSupplies، يتم تحديث المخزون تلقائياً"
                    )}
                  </p>
                  {requests.length > 0 && requests[0].status !== "fulfilled" && (
                    <DispenseSupplies
                      request={requests[0]}
                      dispensedBy={demoUser.id}
                      dispensedByName={demoUser.name}
                      onDispensed={handleRefresh}
                      buttonVariant="outline"
                      buttonSize="sm"
                    />
                  )}
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 font-bold">
                  3
                </div>
                <div className="flex-1 space-y-3">
                  <h3 className="font-semibold">
                    {t("warehouse.step3", "الإضافة التلقائية للفاتورة")}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t(
                      "warehouse.step3Desc",
                      "إذا كان الطلب مرتبط بمريض، يتم إضافة الخدمة تلقائياً لفاتورة المريض في نظام المحاسبة"
                    )}
                  </p>
                  <div className="flex items-center gap-2">
                    <Badge variant="default" className="bg-green-600">
                      <CheckCircle className="mr-1 h-3 w-3" />
                      {t("warehouse.autoIntegration", "تكامل تلقائي")}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {t("warehouse.noManualEntry", "لا حاجة لإدخال يدوي")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Demo Actions */}
              <div className="pt-4 border-t">
                <h4 className="font-medium mb-3">
                  {t("warehouse.quickActions", "إجراءات سريعة للتجربة")}
                </h4>
                <div className="flex flex-wrap gap-2">
                  <Button onClick={handleQuickDispenseDemo} variant="outline" size="sm">
                    <Package className="mr-2 h-4 w-4" />
                    {t("warehouse.quickDispense")}
                  </Button>
                  <Button onClick={handleDirectBillingDemo} variant="outline" size="sm">
                    <DollarSign className="mr-2 h-4 w-4" />
                    {t("warehouse.directBilling", "إضافة مباشرة للفاتورة")}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Code Example */}
          <Card>
            <CardHeader>
              <CardTitle>{t("warehouse.codeExample", "مثال الكود")}</CardTitle>
              <CardDescription>
                {t("warehouse.codeExampleDesc", "كيفية استخدام المكونات في أي قسم")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm" dir="ltr">
                <code>{`// في أي صفحة قسم (صيدلية، عمليات، طوارئ...)
import { RequestSupplies } from "@/components/RequestSupplies";

// استخدام المكون
<RequestSupplies
  department="pharmacy"
  departmentName="الصيدلية"
  requestedBy="USR-001"
  requestedByName="د. سارة أحمد"
  patientId="P-2024-001"  // اختياري
  patientName="أحمد محمد"  // اختياري
  onRequestCreated={(requestId) => {
    // سيتم الصرف من المخازن تلقائياً
    // وإضافة الخدمة للفاتورة إذا كان هناك patientId
  }}
/>`}</code>
              </pre>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Requests Tab */}
        <TabsContent value="requests" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>
                {t("warehouse.requestsLog", "سجل الطلبات")} ({requests.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {requests.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Package className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>{t("warehouse.noRequests", "لا توجد طلبات")}</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t("warehouse.requestNumber")}</TableHead>
                      <TableHead>{t("warehouse.department")}</TableHead>
                      <TableHead>{t("common.patientName")}</TableHead>
                      <TableHead>{t("warehouse.items")}</TableHead>
                      <TableHead>{t("warehouse.status")}</TableHead>
                      <TableHead>{t("common.actions")}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {requests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell className="font-mono text-sm">
                          {request.requestNumber}
                        </TableCell>
                        <TableCell>{request.departmentName}</TableCell>
                        <TableCell>
                          {request.patientName ? (
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-blue-600" />
                              <span>{request.patientName}</span>
                            </div>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </TableCell>
                        <TableCell>{request.totalItems}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              request.status === "fulfilled"
                                ? "default"
                                : request.status === "approved"
                                ? "secondary"
                                : "outline"
                            }
                          >
                            {t(`warehouse.${request.status}`)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {request.status !== "fulfilled" && (
                            <DispenseSupplies
                              request={request}
                              dispensedBy={demoUser.id}
                              dispensedByName={demoUser.name}
                              onDispensed={handleRefresh}
                              buttonVariant="outline"
                              buttonSize="sm"
                            />
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Billing Tracking Tab */}
        <TabsContent value="billing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>
                {t("warehouse.patientServicesTracking", "تتبع خدمات المريض")}
              </CardTitle>
              <CardDescription>
                {t(
                  "warehouse.patientServicesTrackingDesc",
                  "جميع المستلزمات المصروفة تظهر هنا تلقائياً"
                )}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PatientServiceTracker
                key={refreshKey}
                patientId={demoPatient.id}
                patientName={demoPatient.name}
                departmentName="الصيدلية"
              />
            </CardContent>
          </Card>

          {/* Dispensing Records */}
          <Card>
            <CardHeader>
              <CardTitle>
                {t("warehouse.dispensingHistory", "سجل الصرف")} ({dispensingRecords.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {dispensingRecords.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <AlertTriangle className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>{t("warehouse.noDispensing", "لا توجد عمليات صرف")}</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t("warehouse.itemName")}</TableHead>
                      <TableHead>{t("warehouse.quantity")}</TableHead>
                      <TableHead>{t("warehouse.totalAmount")}</TableHead>
                      <TableHead>{t("warehouse.dispensingDate")}</TableHead>
                      <TableHead>{t("warehouse.billingStatus", "حالة الفاتورة")}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dispensingRecords.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell className="font-medium">{record.itemName}</TableCell>
                        <TableCell>
                          {record.quantity} {t(`warehouse.${record.unit}`)}
                        </TableCell>
                        <TableCell>
                          {record.totalAmount.toLocaleString()} {t("common.currency")}
                        </TableCell>
                        <TableCell>
                          {new Date(record.dispensingDate).toLocaleDateString("ar-EG")}
                        </TableCell>
                        <TableCell>
                          {record.addedToBilling ? (
                            <Badge variant="default" className="bg-green-600">
                              <CheckCircle className="mr-1 h-3 w-3" />
                              {t("warehouse.addedToBilling")}
                            </Badge>
                          ) : (
                            <Badge variant="outline">
                              {t("warehouse.notBilled", "غير مفوتر")}
                            </Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Initialize demo data
function initializeDemoData() {
  const mockInventory: InventoryItem[] = [
    {
      id: "item_1",
      name: "قفازات طبية - حجم M",
      nameAr: "قفازات طبية - حجم M",
      nameEn: "Medical Gloves - Size M",
      category: "ppe",
      barcode: "GLV001M",
      currentStock: 500,
      minimumStock: 200,
      maximumStock: 1000,
      reorderLevel: 250,
      reorderQuantity: 500,
      unit: "box",
      unitPrice: 45,
      totalValue: 22500,
      location: "A1-01",
      warehouse: "mainWarehouse",
      status: "inStock",
      manufacturer: "Med Supply Co.",
      storageConditions: "roomTemperature",
      leadTime: 7,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "item_2",
      name: "أمبولات أنسولين",
      nameAr: "أمبولات أنسولين",
      nameEn: "Insulin Ampoules",
      category: "medications",
      barcode: "INS500ML",
      currentStock: 80,
      minimumStock: 100,
      maximumStock: 300,
      reorderLevel: 120,
      reorderQuantity: 200,
      unit: "box",
      unitPrice: 250,
      totalValue: 20000,
      location: "B2-15",
      warehouse: "pharmacyWarehouse",
      status: "lowStock",
      manufacturer: "Pharma Plus",
      batchNumber: "INS2024-045",
      expiryDate: "2025-12-31",
      storageConditions: "refrigerated",
      leadTime: 3,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  initializeWarehouseData({
    inventory: mockInventory,
  });
}
