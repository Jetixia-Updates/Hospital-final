import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Package, AlertTriangle, TrendingUp, FileText, Users, ArrowRightLeft, Plus, Search, Filter, Download } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useWarehouse, initializeWarehouseData } from "@/hooks/use-warehouse";
import { InventoryItem, StockRequest, ItemCategory } from "@shared/warehouse";
import { InventoryItemDialog } from "@/components/InventoryItemDialog";
import { StockAdjustmentDialog } from "@/components/StockAdjustmentDialog";
import { TransferItemsDialog } from "@/components/TransferItemsDialog";
import Layout from "@/components/Layout";
import { useToast } from "@/hooks/use-toast";
import { RequestSupplies } from "@/components/RequestSupplies";
import { DispenseSupplies } from "@/components/DispenseSupplies";
import { AddSupplierDialog } from "@/components/AddSupplierDialog";

export default function Warehouse() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const {
    getInventoryItems,
    getStockRequests,
    getDispensingRecords,
  } = useWarehouse();

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [suppliers, setSuppliers] = useState<any[]>([]);

  // Initialize with mock data
  useEffect(() => {
    initializeMockData();
  }, []);

  const handleExportData = () => {
    toast({
      title: t("common.success"),
      description: "جاري تصدير البيانات...",
    });
  };

  const handleViewItem = (item: InventoryItem) => {
    toast({
      title: item.name,
      description: `المخزون: ${item.currentStock} ${t(`warehouse.${item.unit}`)} - الموقع: ${item.location}`,
    });
  };

  const inventory = getInventoryItems({
    category: categoryFilter !== "all" ? (categoryFilter as ItemCategory) : undefined,
    status: statusFilter !== "all" ? statusFilter : undefined,
    searchTerm,
  });

  const requests = getStockRequests();
  const dispensingRecords = getDispensingRecords();

  // Calculate statistics
  const totalItems = inventory.length;
  const totalValue = inventory.reduce((sum, item) => sum + item.totalValue, 0);
  const lowStockItems = inventory.filter((item) => item.status === "lowStock").length;
  const outOfStockItems = inventory.filter((item) => item.status === "outOfStock").length;
  const pendingRequests = requests.filter((r) => r.status === "pending").length;
  const todayRequests = requests.filter(
    (r) =>
      new Date(r.requestDate).toDateString() === new Date().toDateString()
  ).length;

  return (
    <Layout>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Package className="h-8 w-8 text-primary" />
            {t("warehouse.title")}
          </h1>
          <p className="text-muted-foreground mt-1">{t("warehouse.subtitle")}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            {t("warehouse.exportData")}
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t("warehouse.totalItems")}
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalItems}</div>
            <p className="text-xs text-muted-foreground">
              {t("warehouse.totalValue")}: {totalValue.toLocaleString()} {t("common.currency")}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t("warehouse.lowStockItems")}
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {lowStockItems + outOfStockItems}
            </div>
            <p className="text-xs text-muted-foreground">
              {outOfStockItems} {t("warehouse.outOfStock")}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t("warehouse.pendingRequests")}
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingRequests}</div>
            <p className="text-xs text-muted-foreground">
              {todayRequests} {t("warehouse.requestsToday")}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t("warehouse.monthlyConsumption")}
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(totalValue * 0.15).toLocaleString()}
            </div>
            <p className="text-xs text-green-600">
              +12% {t("common.vsLastMonth")}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="inventory" className="space-y-4">
        <TabsList>
          <TabsTrigger value="inventory">
            <Package className="mr-2 h-4 w-4" />
            {t("warehouse.inventory")}
          </TabsTrigger>
          <TabsTrigger value="requests">
            <FileText className="mr-2 h-4 w-4" />
            {t("warehouse.requests")}
            {pendingRequests > 0 && (
              <Badge variant="destructive" className="mr-2 h-5 w-5 rounded-full p-0 text-xs">
                {pendingRequests}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="transfers">
            <ArrowRightLeft className="mr-2 h-4 w-4" />
            {t("warehouse.transfers")}
          </TabsTrigger>
          <TabsTrigger value="suppliers">
            <Users className="mr-2 h-4 w-4" />
            {t("warehouse.suppliers")}
          </TabsTrigger>
        </TabsList>

        {/* Inventory Tab */}
        <TabsContent value="inventory" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{t("warehouse.inventoryManagement")}</CardTitle>
                  <CardDescription>
                    {t("warehouse.searchItems")}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <InventoryItemDialog onItemAdded={() => {
                    toast({
                      title: t("common.success"),
                      description: "تم إضافة الصنف بنجاح",
                    });
                  }} />
                  <Button variant="outline" onClick={handleExportData}>
                    <Download className="mr-2 h-4 w-4" />
                    {t("common.export")}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4 md:flex-row md:items-center">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder={t("warehouse.searchItems")}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pr-10"
                    />
                  </div>
                </div>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder={t("warehouse.filterByCategory")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t("warehouse.allCategories")}</SelectItem>
                    <SelectItem value="medical_equipment">
                      {t("warehouse.categories.medical_equipment")}
                    </SelectItem>
                    <SelectItem value="surgical_instruments">
                      {t("warehouse.categories.surgical_instruments")}
                    </SelectItem>
                    <SelectItem value="medications">
                      {t("warehouse.categories.medications")}
                    </SelectItem>
                    <SelectItem value="consumables">
                      {t("warehouse.categories.consumables")}
                    </SelectItem>
                    <SelectItem value="laboratory">
                      {t("warehouse.categories.laboratory")}
                    </SelectItem>
                    <SelectItem value="radiology">
                      {t("warehouse.categories.radiology")}
                    </SelectItem>
                    <SelectItem value="ppe">
                      {t("warehouse.categories.ppe")}
                    </SelectItem>
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder={t("warehouse.filterByStatus")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t("warehouse.allStatuses")}</SelectItem>
                    <SelectItem value="inStock">{t("warehouse.inStock")}</SelectItem>
                    <SelectItem value="lowStock">{t("warehouse.lowStock")}</SelectItem>
                    <SelectItem value="outOfStock">{t("warehouse.outOfStock")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Inventory Table */}
          <Card>
            <CardHeader>
              <CardTitle>
                {t("warehouse.inventory")} ({inventory.length} {t("warehouse.items")})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("warehouse.itemName")}</TableHead>
                    <TableHead>{t("warehouse.category")}</TableHead>
                    <TableHead>{t("warehouse.currentStock")}</TableHead>
                    <TableHead>{t("warehouse.minimumStock")}</TableHead>
                    <TableHead>{t("warehouse.unitPrice")}</TableHead>
                    <TableHead>{t("warehouse.totalValue")}</TableHead>
                    <TableHead>{t("warehouse.location")}</TableHead>
                    <TableHead>{t("warehouse.status")}</TableHead>
                    <TableHead>{t("common.actions")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inventory.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={9} className="text-center">
                        {t("common.noData")}
                      </TableCell>
                    </TableRow>
                  ) : (
                    inventory.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell>
                          {t(`warehouse.categories.${item.category}`)}
                        </TableCell>
                        <TableCell>
                          {item.currentStock} {t(`warehouse.${item.unit}`)}
                        </TableCell>
                        <TableCell>
                          {item.minimumStock} {t(`warehouse.${item.unit}`)}
                        </TableCell>
                        <TableCell>
                          {item.unitPrice.toLocaleString()} {t("common.currency")}
                        </TableCell>
                        <TableCell>
                          {item.totalValue.toLocaleString()} {t("common.currency")}
                        </TableCell>
                        <TableCell>{item.location}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              item.status === "inStock"
                                ? "default"
                                : item.status === "lowStock"
                                ? "secondary"
                                : "destructive"
                            }
                          >
                            {t(`warehouse.${item.status}`)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <StockAdjustmentDialog 
                              item={item} 
                              onAdjustment={(adj) => {
                                toast({
                                  title: t("common.success"),
                                  description: `تم ${adj.adjustmentType === 'increase' ? 'زيادة' : 'تعديل'} المخزون`,
                                });
                              }}
                            />
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleViewItem(item)}
                            >
                              {t("common.view")}
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Requests Tab */}
        <TabsContent value="requests" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{t("warehouse.requestManagement")}</CardTitle>
                  <CardDescription>
                    {requests.length} {t("warehouse.requests")}
                  </CardDescription>
                </div>
                <RequestSupplies
                  department="warehouse"
                  departmentName="المخزن المركزي"
                  requestedBy="current-user"
                  requestedByName="مدير المخزن"
                  onRequestCreated={() => {
                    toast({
                      title: t("common.success"),
                      description: "تم إنشاء الطلب بنجاح",
                    });
                  }}
                />
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("warehouse.requestId")}</TableHead>
                    <TableHead>{t("warehouse.requestDate")}</TableHead>
                    <TableHead>{t("warehouse.department")}</TableHead>
                    <TableHead>{t("warehouse.requestedBy")}</TableHead>
                    <TableHead>{t("warehouse.items")}</TableHead>
                    <TableHead>{t("warehouse.urgency")}</TableHead>
                    <TableHead>{t("warehouse.status")}</TableHead>
                    <TableHead>{t("common.actions")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {requests.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center">
                        {t("common.noData")}
                      </TableCell>
                    </TableRow>
                  ) : (
                    requests.slice(0, 10).map((request) => (
                      <TableRow key={request.id}>
                        <TableCell className="font-mono text-sm">
                          {request.requestNumber}
                        </TableCell>
                        <TableCell>
                          {new Date(request.requestDate).toLocaleDateString("ar-EG")}
                        </TableCell>
                        <TableCell>{request.departmentName}</TableCell>
                        <TableCell>{request.requestedByName}</TableCell>
                        <TableCell>{request.totalItems}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              request.urgency === "emergency"
                                ? "destructive"
                                : request.urgency === "urgent"
                                ? "secondary"
                                : "outline"
                            }
                          >
                            {t(`warehouse.${request.urgency}`)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              request.status === "fulfilled"
                                ? "default"
                                : request.status === "approved"
                                ? "secondary"
                                : request.status === "pending"
                                ? "outline"
                                : "destructive"
                            }
                          >
                            {t(`warehouse.${request.status}`)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            {request.status === 'approved' && (
                              <DispenseSupplies
                                request={request}
                                dispensedBy="current-user"
                                dispensedByName="مسؤول المخزن"
                                onDispensed={() => {
                                  toast({
                                    title: t("common.success"),
                                    description: "تم صرف الأصناف بنجاح",
                                  });
                                }}
                              />
                            )}
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => {
                                toast({
                                  title: request.requestNumber,
                                  description: `القسم: ${request.departmentName} - ${request.totalItems} صنف`,
                                });
                              }}
                            >
                              {t("warehouse.viewRequest")}
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Transfers Tab */}
        <TabsContent value="transfers" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{t("warehouse.transferManagement")}</CardTitle>
                  <CardDescription>
                    {t("warehouse.activeTransfers")}: 0
                  </CardDescription>
                </div>
                <TransferItemsDialog 
                  onTransfer={(transfer) => {
                    toast({
                      title: t("common.success"),
                      description: `تم إنشاء تحويل من ${t(`warehouse.${transfer.fromWarehouse}`)} إلى ${t(`warehouse.${transfer.toWarehouse}`)}`,
                    });
                  }}
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                {t("common.noData")}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Suppliers Tab */}
        <TabsContent value="suppliers" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{t("warehouse.supplierManagement")}</CardTitle>
                  <CardDescription>
                    {t("warehouse.suppliers")}: {suppliers.length}
                  </CardDescription>
                </div>
                <AddSupplierDialog
                  onSupplierAdded={(supplier) => {
                    setSuppliers([...suppliers, supplier]);
                    toast({
                      title: t("common.success"),
                      description: `تم إضافة المورد ${supplier.nameAr} بنجاح`,
                    });
                  }}
                />
              </div>
            </CardHeader>
            <CardContent>
              {suppliers.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  {t("common.noData")}
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>اسم المورد</TableHead>
                      <TableHead>الشخص المسؤول</TableHead>
                      <TableHead>رقم الموبايل</TableHead>
                      <TableHead>البريد الإلكتروني</TableHead>
                      <TableHead>النوع</TableHead>
                      <TableHead>شروط الدفع</TableHead>
                      <TableHead>مدة التوصيل</TableHead>
                      <TableHead>التقييم</TableHead>
                      <TableHead>الحالة</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {suppliers.map((supplier) => (
                      <TableRow key={supplier.id}>
                        <TableCell className="font-medium">
                          {supplier.nameAr}
                        </TableCell>
                        <TableCell>{supplier.contactPerson}</TableCell>
                        <TableCell>{supplier.mobile}</TableCell>
                        <TableCell>{supplier.email}</TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {supplier.supplierType === "medical" && "مستلزمات طبية"}
                            {supplier.supplierType === "pharmaceutical" && "أدوية"}
                            {supplier.supplierType === "equipment" && "معدات"}
                            {supplier.supplierType === "consumables" && "مستهلكات"}
                            {supplier.supplierType === "food" && "مواد غذائية"}
                            {supplier.supplierType === "cleaning" && "مواد تنظيف"}
                            {supplier.supplierType === "other" && "أخرى"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {supplier.paymentTerms === "immediate" && "دفع فوري"}
                          {supplier.paymentTerms === "net15" && "15 يوم"}
                          {supplier.paymentTerms === "net30" && "30 يوم"}
                          {supplier.paymentTerms === "net60" && "60 يوم"}
                          {supplier.paymentTerms === "net90" && "90 يوم"}
                        </TableCell>
                        <TableCell>{supplier.deliveryTime} يوم</TableCell>
                        <TableCell>
                          {"⭐".repeat(supplier.rating)}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={supplier.status === "active" ? "default" : "secondary"}
                          >
                            {supplier.status === "active" ? "نشط" : "غير نشط"}
                          </Badge>
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
    </Layout>
  );
}

// Mock data initialization
function initializeMockData() {
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
    {
      id: "item_3",
      name: "شاش طبي معقم",
      nameAr: "شاش طبي معقم",
      nameEn: "Sterile Medical Gauze",
      category: "consumables",
      barcode: "GAU100P",
      currentStock: 0,
      minimumStock: 50,
      maximumStock: 200,
      reorderLevel: 60,
      reorderQuantity: 150,
      unit: "pack",
      unitPrice: 15,
      totalValue: 0,
      location: "A2-08",
      warehouse: "mainWarehouse",
      status: "outOfStock",
      manufacturer: "SterMed",
      storageConditions: "roomTemperature",
      leadTime: 5,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "item_4",
      name: "مقص جراحي - مستقيم",
      nameAr: "مقص جراحي - مستقيم",
      nameEn: "Surgical Scissors - Straight",
      category: "surgical_instruments",
      serialNumber: "SS-STR-2024-001",
      currentStock: 25,
      minimumStock: 10,
      maximumStock: 50,
      reorderLevel: 15,
      reorderQuantity: 25,
      unit: "piece",
      unitPrice: 350,
      totalValue: 8750,
      location: "C1-05",
      warehouse: "surgeryWarehouse",
      status: "inStock",
      manufacturer: "SurgiTools Pro",
      storageConditions: "controlled",
      leadTime: 14,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "item_5",
      name: "أنابيب اختبار دم",
      nameAr: "أنابيب اختبار دم",
      nameEn: "Blood Test Tubes",
      category: "laboratory",
      barcode: "BTT100P",
      currentStock: 300,
      minimumStock: 150,
      maximumStock: 500,
      reorderLevel: 180,
      reorderQuantity: 300,
      unit: "pack",
      unitPrice: 80,
      totalValue: 24000,
      location: "D1-12",
      warehouse: "labWarehouse",
      status: "inStock",
      manufacturer: "LabTech Solutions",
      batchNumber: "LAB-2024-128",
      expiryDate: "2026-06-30",
      storageConditions: "roomTemperature",
      leadTime: 10,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  const mockRequests: StockRequest[] = [
    {
      id: "req_1",
      requestNumber: "REQ-2024-001",
      requestDate: new Date().toISOString(),
      requestedBy: "USR001",
      requestedByName: "د. أحمد محمد",
      department: "emergency",
      departmentName: "قسم الطوارئ",
      items: [
        {
          itemId: "item_1",
          itemName: "قفازات طبية - حجم M",
          requestedQuantity: 10,
          availableQuantity: 500,
          dispensedQuantity: 0,
          unitPrice: 45,
          unit: "box",
        },
      ],
      totalItems: 1,
      urgency: "urgent",
      status: "pending",
      patientId: "P001",
      patientName: "محمد علي أحمد",
      notes: "للاستخدام الفوري في الطوارئ",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  initializeWarehouseData({
    inventory: mockInventory,
    requests: mockRequests,
  });
}
