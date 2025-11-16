import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FlaskConical, Activity, Clock, AlertCircle, TrendingUp, Calendar, Users, Plus, Search, Filter, Download, FileText } from "lucide-react";
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
import Layout from "@/components/Layout";
import { useLaboratory, initializeLaboratoryData } from "@/hooks/use-laboratory";
import { TestCategory, TestStatus } from "@shared/laboratory";
import { useToast } from "@/hooks/use-toast";

export default function Laboratory() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const {
    getTestRequests,
    getLabStatistics,
  } = useLaboratory();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  useEffect(() => {
    initializeLaboratoryData();
  }, []);

  const requests = getTestRequests({
    status: statusFilter !== "all" ? (statusFilter as TestStatus) : undefined,
    category: categoryFilter !== "all" ? (categoryFilter as TestCategory) : undefined,
  });

  const filteredRequests = requests.filter((request) =>
    searchTerm === "" ||
    request.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.requestNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.doctorName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = getLabStatistics();

  const getStatusColor = (status: TestStatus) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
      in_progress: "bg-blue-100 text-blue-800 border-blue-300",
      completed: "bg-green-100 text-green-800 border-green-300",
      reviewed: "bg-purple-100 text-purple-800 border-purple-300",
      delivered: "bg-gray-100 text-gray-800 border-gray-300",
      cancelled: "bg-red-100 text-red-800 border-red-300",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const getStatusText = (status: TestStatus) => {
    return t(`laboratory.${status}`, { defaultValue: status });
  };

  const getCategoryText = (category: string) => {
    return t(`laboratory.${category}`, { defaultValue: category });
  };

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-premium">
                <FlaskConical className="h-6 w-6 text-white" strokeWidth={2.5} />
              </div>
              {t('laboratory.title')}
            </h1>
            <p className="text-muted-foreground mt-2">{t('laboratory.subtitle')}</p>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => toast({ title: t('laboratory.export'), description: t('common.loading') })}
              variant="outline"
              className="gap-2"
            >
              <Download className="h-4 w-4" />
              {t('laboratory.export')}
            </Button>
            <Button className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
              <Plus className="h-4 w-4" />
              {t('laboratory.newRequest')}
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="premium-card border-t-4 border-t-blue-500">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">{t('laboratory.totalRequests')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold gradient-text">{stats.totalRequests}</div>
                <Activity className="h-8 w-8 text-blue-500 opacity-50" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">{t('laboratory.requests')}</p>
            </CardContent>
          </Card>

          <Card className="premium-card border-t-4 border-t-yellow-500">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">{t('laboratory.pending')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold text-yellow-600">{stats.pendingRequests}</div>
                <Clock className="h-8 w-8 text-yellow-500 opacity-50" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">{t('common.status')}</p>
            </CardContent>
          </Card>

          <Card className="premium-card border-t-4 border-t-green-500">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">{t('laboratory.completedToday')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold text-green-600">{stats.completedToday}</div>
                <TrendingUp className="h-8 w-8 text-green-500 opacity-50" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">{t('common.today')}</p>
            </CardContent>
          </Card>

          <Card className="premium-card border-t-4 border-t-red-500">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">{t('laboratory.criticalResults')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold text-red-600">{stats.criticalResults}</div>
                <AlertCircle className="h-8 w-8 text-red-500 opacity-50" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">{t('common.status')}</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="requests" className="space-y-4">
          <TabsList className="bg-white border shadow-sm">
            <TabsTrigger value="requests" className="gap-2">
              <FileText className="h-4 w-4" />
              {t('laboratory.requests')}
            </TabsTrigger>
            <TabsTrigger value="tests" className="gap-2">
              <FlaskConical className="h-4 w-4" />
              {t('laboratory.tests')}
            </TabsTrigger>
            <TabsTrigger value="results" className="gap-2">
              <FileText className="h-4 w-4" />
              {t('laboratory.results')}
            </TabsTrigger>
            <TabsTrigger value="statistics" className="gap-2">
              <TrendingUp className="h-4 w-4" />
              {t('laboratory.statistics')}
            </TabsTrigger>
          </TabsList>

          {/* Requests Tab */}
          <TabsContent value="requests" className="space-y-4">
            <Card className="premium-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{t('laboratory.labRequests')}</CardTitle>
                    <CardDescription>{t('laboratory.manageTracking')}</CardDescription>
                  </div>
                </div>

                {/* Filters */}
                <div className="flex gap-3 mt-4">
                  <div className="flex-1 relative">
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder={t('laboratory.searchRequests')}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pr-10"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder={t('common.status')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t('laboratory.allStatuses')}</SelectItem>
                      <SelectItem value="pending">{t('laboratory.pending')}</SelectItem>
                      <SelectItem value="in_progress">{t('laboratory.inProgress')}</SelectItem>
                      <SelectItem value="completed">{t('laboratory.completed')}</SelectItem>
                      <SelectItem value="reviewed">{t('laboratory.reviewed')}</SelectItem>
                      <SelectItem value="delivered">{t('laboratory.delivered')}</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder={t('laboratory.category')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t('laboratory.allCategories')}</SelectItem>
                      <SelectItem value="hematology">{t('laboratory.hematology')}</SelectItem>
                      <SelectItem value="biochemistry">{t('laboratory.biochemistry')}</SelectItem>
                      <SelectItem value="hormones">{t('laboratory.hormones')}</SelectItem>
                      <SelectItem value="tumor_markers">{t('laboratory.tumorMarkers')}</SelectItem>
                      <SelectItem value="microbiology">{t('laboratory.microbiology')}</SelectItem>
                      <SelectItem value="serology">{t('laboratory.serology')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                {filteredRequests.length === 0 ? (
                  <div className="text-center py-12">
                    <FlaskConical className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                    <p className="text-muted-foreground">{t('laboratory.noRequests')}</p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>{t('laboratory.requestNumber')}</TableHead>
                        <TableHead>{t('laboratory.patient')}</TableHead>
                        <TableHead>{t('laboratory.age')}</TableHead>
                        <TableHead>{t('laboratory.doctor')}</TableHead>
                        <TableHead>{t('laboratory.testTypes')}</TableHead>
                        <TableHead>{t('laboratory.priority')}</TableHead>
                        <TableHead>{t('common.status')}</TableHead>
                        <TableHead>{t('common.date')}</TableHead>
                        <TableHead>{t('laboratory.amount')}</TableHead>
                        <TableHead>{t('common.actions')}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredRequests.map((request) => (
                        <TableRow key={request.id} className="hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50">
                          <TableCell className="font-medium">{request.requestNumber}</TableCell>
                          <TableCell>
                            <div>
                              <div className="font-semibold">{request.patientName}</div>
                              <div className="text-xs text-muted-foreground">{request.patientGender === "male" ? t('laboratory.male') : t('laboratory.female')}</div>
                            </div>
                          </TableCell>
                          <TableCell>{request.patientAge} {t('laboratory.years')}</TableCell>
                          <TableCell>{request.doctorName}</TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {request.tests.slice(0, 2).map((test, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  {test.testCode}
                                </Badge>
                              ))}
                              {request.tests.length > 2 && (
                                <Badge variant="secondary" className="text-xs">
                                  +{request.tests.length - 2}
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            {request.priority === "urgent" && <Badge variant="destructive">{t('laboratory.urgent')}</Badge>}
                            {request.priority === "stat" && <Badge className="bg-red-600">{t('laboratory.stat')}</Badge>}
                            {request.priority === "routine" && <Badge variant="secondary">{t('laboratory.routine')}</Badge>}
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(request.status)} variant="outline">
                              {getStatusText(request.status)}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm">
                            {new Date(request.requestDate).toLocaleDateString("ar-EG")}
                          </TableCell>
                          <TableCell className="font-semibold">{request.totalAmount} {t('common.currency')}</TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                <FileText className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tests Tab */}
          <TabsContent value="tests">
            <Card className="premium-card">
              <CardHeader>
                <CardTitle>{t('laboratory.availableTests')}</CardTitle>
                <CardDescription>{t('laboratory.allTestsDescription')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {["hematology", "biochemistry", "hormones", "tumor_markers", "microbiology", "serology"].map((category) => (
                    <Card key={category} className="premium-card hover:shadow-8k transition-all duration-500">
                      <CardHeader>
                        <CardTitle className="text-lg">{getCategoryText(category as TestCategory)}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Button variant="outline" className="w-full">
                          {t('laboratory.viewTests')}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Results Tab */}
          <TabsContent value="results">
            <Card className="premium-card">
              <CardHeader>
                <CardTitle>{t('laboratory.testResults')}</CardTitle>
                <CardDescription>{t('laboratory.testResults')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <p className="text-muted-foreground">{t('laboratory.noRequests')}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Statistics Tab */}
          <TabsContent value="statistics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="premium-card">
                <CardHeader>
                  <CardTitle>{t('laboratory.testsByCategory')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {stats.testsByCategory.map((item) => (
                      <div key={item.category} className="flex items-center justify-between">
                        <span className="font-medium">{getCategoryText(item.category)}</span>
                        <Badge variant="secondary">{item.count}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="premium-card">
                <CardHeader>
                  <CardTitle>{t('laboratory.performance')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl">
                    <span className="font-medium">{t('laboratory.avgCompletionTime')}</span>
                    <span className="text-2xl font-bold text-blue-600">{stats.averageCompletionTime.toFixed(1)} {t('laboratory.hours')}</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl">
                    <span className="font-medium">{t('laboratory.revenue')}</span>
                    <span className="text-2xl font-bold text-green-600">{stats.revenue.toLocaleString()} {t('common.currency')}</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl">
                    <span className="font-medium">{t('laboratory.abnormalResults')}</span>
                    <span className="text-2xl font-bold text-orange-600">{stats.abnormalResults}</span>
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
