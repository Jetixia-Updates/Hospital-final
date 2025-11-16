import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Scissors, AlertTriangle, Search, Package, CheckCircle, XCircle } from "lucide-react";
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
import { RequestSupplies } from "@/components/RequestSupplies";
import { InventoryItemDialog } from "@/components/InventoryItemDialog";
import { StockAdjustmentDialog } from "@/components/StockAdjustmentDialog";
import Layout from "@/components/Layout";
import { useToast } from "@/hooks/use-toast";

export default function SurgeryWarehouse() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data - Simplified to not pass to StockAdjustmentDialog
  const [inventory] = useState([
    {
      id: "1",
      name: "مقص جراحي معقم (Surgical Scissors)",
      category: "surgical_instruments" as const,
      currentStock: 25,
      minimumStock: 15,
      unit: "piece" as const,
      location: "S1-A-02",
      sterilizationStatus: "sterile",
      lastSterilization: "2024-08-01",
      unitPrice: 150,
      storageConditions: "controlled" as const,
    },
    {
      id: "2",
      name: "قفازات جراحية معقمة Size 7.5",
      category: "ppe" as const,
      currentStock: 200,
      minimumStock: 100,
      unit: "pair" as const,
      location: "S1-B-05",
      sterilizationStatus: "sterile",
      lastSterilization: "2024-08-02",
      unitPrice: 5,
      storageConditions: "roomTemperature" as const,
    },
    {
      id: "3",
      name: "خيوط جراحية قابلة للامتصاص 3-0",
      category: "consumables" as const,
      currentStock: 80,
      minimumStock: 50,
      unit: "pack" as const,
      location: "S1-C-10",
      expiryDate: "2025-12-31",
      unitPrice: 45,
      storageConditions: "roomTemperature" as const,
    },
    {
      id: "4",
      name: "شاش معقم 10x10 سم",
      category: "consumables" as const,
      currentStock: 12,
      minimumStock: 30,
      unit: "box" as const,
      location: "S1-B-01",
      sterilizationStatus: "sterile",
      lastSterilization: "2024-07-30",
      unitPrice: 25,
      storageConditions: "roomTemperature" as const,
    },
  ]);

  const [surgeryKits] = useState([
    {
      id: "kit1",
      name: "طقم جراحة عامة",
      items: 15,
      status: "ready",
      lastChecked: "2024-08-01",
    },
    {
      id: "kit2",
      name: "طقم جراحة قلب",
      items: 22,
      status: "ready",
      lastChecked: "2024-08-02",
    },
    {
      id: "kit3",
      name: "طقم جراحة عظام",
      items: 18,
      status: "incomplete",
      lastChecked: "2024-07-30",
    },
  ]);

  const filteredInventory = inventory.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const lowStockItems = inventory.filter((item) => item.currentStock <= item.minimumStock);
  const sterileItems = inventory.filter((item) => item.sterilizationStatus === "sterile");
  const totalValue = inventory.reduce((sum, item) => sum + item.currentStock * item.unitPrice, 0);

  return (
    <Layout>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Scissors className="h-8 w-8 text-primary" />
            {t("warehouse.surgeryWarehouse")}
          </h1>
          <p className="text-muted-foreground mt-1">
            إدارة الأدوات والمستلزمات الجراحية
          </p>
        </div>
        <div className="flex gap-2">
          <RequestSupplies
            department="surgery"
            departmentName="غرف العمليات"
            requestedBy="current-user"
            requestedByName="ممرض العمليات"
            onRequestCreated={() => {
              toast({
                title: t("common.success"),
                description: "تم إنشاء طلب الأدوات الجراحية بنجاح",
              });
            }}
          />
          <InventoryItemDialog onItemAdded={() => {
            toast({
              title: t("common.success"),
              description: "تم إضافة أداة جراحية جديدة",
            });
          }} />
        </div>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي الأصناف</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inventory.length}</div>
            <p className="text-xs text-muted-foreground">صنف جراحي</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">معقم ومجهز</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{sterileItems.length}</div>
            <p className="text-xs text-muted-foreground">جاهز للاستخدام</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">مخزون منخفض</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{lowStockItems.length}</div>
            <p className="text-xs text-muted-foreground">يحتاج إعادة طلب</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي القيمة</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalValue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">ج.م</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="inventory" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="inventory">المخزون</TabsTrigger>
          <TabsTrigger value="kits">الأطقم الجراحية</TabsTrigger>
          <TabsTrigger value="sterilization">التعقيم</TabsTrigger>
        </TabsList>

        {/* Inventory Tab */}
        <TabsContent value="inventory" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>الأدوات والمستلزمات</CardTitle>
                  <CardDescription>جميع المعدات الجراحية المتوفرة</CardDescription>
                </div>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="بحث في المعدات..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 w-[300px]"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>الصنف</TableHead>
                    <TableHead>الكمية</TableHead>
                    <TableHead>الموقع</TableHead>
                    <TableHead>حالة التعقيم</TableHead>
                    <TableHead>آخر تعقيم</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead>الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInventory.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div className="font-medium">{item.name}</div>
                      </TableCell>
                      <TableCell>
                        <span className={item.currentStock <= item.minimumStock ? "text-orange-600 font-bold" : ""}>
                          {item.currentStock} {t(`warehouse.${item.unit}`)}
                        </span>
                      </TableCell>
                      <TableCell>{item.location}</TableCell>
                      <TableCell>
                        {item.sterilizationStatus === "sterile" ? (
                          <Badge variant="outline" className="border-green-600 text-green-600">
                            <CheckCircle className="mr-1 h-3 w-3" />
                            معقم
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="border-orange-600 text-orange-600">
                            يحتاج تعقيم
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>{item.lastSterilization || "-"}</TableCell>
                      <TableCell>
                        {item.currentStock === 0 ? (
                          <Badge variant="destructive">نفذ</Badge>
                        ) : item.currentStock <= item.minimumStock ? (
                          <Badge variant="outline" className="border-orange-600 text-orange-600">
                            منخفض
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="border-green-600 text-green-600">
                            متوفر
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          تفاصيل
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Surgery Kits Tab */}
        <TabsContent value="kits" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>الأطقم الجراحية</CardTitle>
              <CardDescription>أطقم الأدوات المجهزة للعمليات</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>اسم الطقم</TableHead>
                    <TableHead>عدد الأدوات</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead>آخر فحص</TableHead>
                    <TableHead>الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {surgeryKits.map((kit) => (
                    <TableRow key={kit.id}>
                      <TableCell className="font-medium">{kit.name}</TableCell>
                      <TableCell>{kit.items} أداة</TableCell>
                      <TableCell>
                        {kit.status === "ready" ? (
                          <Badge variant="outline" className="border-green-600 text-green-600">
                            <CheckCircle className="mr-1 h-3 w-3" />
                            جاهز
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="border-red-600 text-red-600">
                            <XCircle className="mr-1 h-3 w-3" />
                            غير مكتمل
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>{kit.lastChecked}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          تفاصيل
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sterilization Tab */}
        <TabsContent value="sterilization" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>حالة التعقيم</CardTitle>
              <CardDescription>الأدوات المعقمة والتي تحتاج تعقيم</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">أدوات معقمة وجاهزة</p>
                    <p className="text-sm text-muted-foreground">
                      {sterileItems.length} صنف جاهز للاستخدام
                    </p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">تحتاج إعادة تعقيم</p>
                    <p className="text-sm text-muted-foreground">
                      {inventory.length - sterileItems.length} صنف يحتاج معالجة
                    </p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
}
