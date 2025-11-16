import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Pill, AlertTriangle, Search, Filter, Package, TrendingDown, Clock } from "lucide-react";
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
import Layout from "@/components/Layout";
import { useToast } from "@/hooks/use-toast";

export default function PharmacyWarehouse() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data
  const [inventory] = useState([
    {
      id: "1",
      name: "أنسولين (Insulin)",
      category: "medications" as const,
      currentStock: 45,
      minimumStock: 20,
      unit: "bottle" as const,
      expiryDate: "2024-12-31",
      batchNumber: "BATCH-001",
      manufacturer: "Novo Nordisk",
      unitPrice: 250,
      location: "A1-05-Refrigerated",
      storageConditions: "refrigerated" as const,
    },
    {
      id: "2",
      name: "باراسيتامول 500mg",
      category: "medications" as const,
      currentStock: 500,
      minimumStock: 200,
      unit: "box" as const,
      expiryDate: "2025-06-30",
      batchNumber: "BATCH-002",
      manufacturer: "Pfizer",
      unitPrice: 15,
      location: "B2-10",
      storageConditions: "roomTemperature" as const,
    },
    {
      id: "3",
      name: "أمبيسيلين (Ampicillin)",
      category: "medications" as const,
      currentStock: 15,
      minimumStock: 30,
      unit: "box" as const,
      expiryDate: "2024-09-15",
      batchNumber: "BATCH-003",
      manufacturer: "GSK",
      unitPrice: 80,
      location: "C1-03",
      storageConditions: "roomTemperature" as const,
    },
  ]);

  const [expiringItems] = useState([
    {
      id: "3",
      name: "أمبيسيلين (Ampicillin)",
      expiryDate: "2024-09-15",
      currentStock: 15,
      daysUntilExpiry: 45,
    },
    {
      id: "1",
      name: "أنسولين (Insulin)",
      expiryDate: "2024-12-31",
      currentStock: 45,
      daysUntilExpiry: 152,
    },
  ]);

  const filteredInventory = inventory.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const lowStockItems = inventory.filter((item) => item.currentStock <= item.minimumStock);
  const totalValue = inventory.reduce((sum, item) => sum + item.currentStock * item.unitPrice, 0);

  return (
    <Layout>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Pill className="h-8 w-8 text-primary" />
            {t("warehouse.pharmacyWarehouse")}
          </h1>
          <p className="text-muted-foreground mt-1">
            إدارة مخزون الأدوية والمستلزمات الطبية
          </p>
        </div>
        <div className="flex gap-2">
          <RequestSupplies
            department="pharmacy"
            departmentName="الصيدلية"
            requestedBy="current-user"
            requestedByName="صيدلي"
            onRequestCreated={() => {
              toast({
                title: t("common.success"),
                description: "تم إنشاء طلب الأدوية بنجاح",
              });
            }}
          />
          <InventoryItemDialog onItemAdded={() => {
            toast({
              title: t("common.success"),
              description: "تم إضافة دواء جديد",
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
            <p className="text-xs text-muted-foreground">صنف دوائي</p>
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
            <CardTitle className="text-sm font-medium">قريبة الصلاحية</CardTitle>
            <Clock className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{expiringItems.length}</div>
            <p className="text-xs text-muted-foreground">خلال 6 أشهر</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">إجمالي القيمة</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
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
          <TabsTrigger value="inventory">المخزون الحالي</TabsTrigger>
          <TabsTrigger value="expiring">قريبة الصلاحية</TabsTrigger>
          <TabsTrigger value="lowstock">مخزون منخفض</TabsTrigger>
        </TabsList>

        {/* Inventory Tab */}
        <TabsContent value="inventory" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>مخزون الأدوية</CardTitle>
                  <CardDescription>جميع الأدوية والمستلزمات المتوفرة</CardDescription>
                </div>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="بحث في الأدوية..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8 w-[300px]"
                    />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>الصنف</TableHead>
                    <TableHead>الكمية المتاحة</TableHead>
                    <TableHead>الوحدة</TableHead>
                    <TableHead>تاريخ الصلاحية</TableHead>
                    <TableHead>الموقع</TableHead>
                    <TableHead>الحالة</TableHead>
                    <TableHead>الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInventory.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <div className="text-sm text-muted-foreground">{item.batchNumber}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={item.currentStock <= item.minimumStock ? "text-orange-600 font-bold" : ""}>
                          {item.currentStock}
                        </span>
                      </TableCell>
                      <TableCell>{t(`warehouse.${item.unit}`)}</TableCell>
                      <TableCell>{item.expiryDate}</TableCell>
                      <TableCell>{item.location}</TableCell>
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

        {/* Expiring Tab */}
        <TabsContent value="expiring" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>أدوية قريبة الصلاحية</CardTitle>
              <CardDescription>الأدوية التي ستنتهي صلاحيتها خلال 6 أشهر</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>الصنف</TableHead>
                    <TableHead>تاريخ الصلاحية</TableHead>
                    <TableHead>الأيام المتبقية</TableHead>
                    <TableHead>الكمية المتاحة</TableHead>
                    <TableHead>الحالة</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {expiringItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.expiryDate}</TableCell>
                      <TableCell>
                        <span className={item.daysUntilExpiry < 60 ? "text-red-600 font-bold" : "text-orange-600"}>
                          {item.daysUntilExpiry} يوم
                        </span>
                      </TableCell>
                      <TableCell>{item.currentStock}</TableCell>
                      <TableCell>
                        {item.daysUntilExpiry < 60 ? (
                          <Badge variant="destructive">عاجل</Badge>
                        ) : (
                          <Badge variant="outline" className="border-orange-600 text-orange-600">
                            تحذير
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Low Stock Tab */}
        <TabsContent value="lowstock" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>مخزون منخفض</CardTitle>
              <CardDescription>الأدوية التي وصلت لحد الطلب</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>الصنف</TableHead>
                    <TableHead>الكمية المتاحة</TableHead>
                    <TableHead>الحد الأدنى</TableHead>
                    <TableHead>كمية إعادة الطلب</TableHead>
                    <TableHead>الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {lowStockItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>
                        <span className="text-orange-600 font-bold">{item.currentStock}</span>
                      </TableCell>
                      <TableCell>{item.minimumStock}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">100 {t(`warehouse.${item.unit}`)}</Badge>
                      </TableCell>
                      <TableCell>
                        <Button size="sm">طلب الآن</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
}
