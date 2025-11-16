import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ScanLine, Activity, Clock, AlertCircle, TrendingUp, Calendar, Plus, Search, Download, FileText, Zap } from "lucide-react";
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
import { useRadiology, initializeRadiologyData } from "@/hooks/use-radiology";
import { RadiologyModality, RadiologyStatus } from "@shared/radiology";
import { useToast } from "@/hooks/use-toast";

export default function Radiology() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const {
    getRadiologyRequests,
    getRadiologyStatistics,
  } = useRadiology();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [modalityFilter, setModalityFilter] = useState<string>("all");

  useEffect(() => {
    initializeRadiologyData();
  }, []);

  const requests = getRadiologyRequests({
    status: statusFilter !== "all" ? (statusFilter as RadiologyStatus) : undefined,
    modality: modalityFilter !== "all" ? (modalityFilter as RadiologyModality) : undefined,
  });

  const filteredRequests = requests.filter((request) =>
    searchTerm === "" ||
    request.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.requestNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.doctorName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = getRadiologyStatistics();

  const getStatusColor = (status: RadiologyStatus) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
      scheduled: "bg-blue-100 text-blue-800 border-blue-300",
      in_progress: "bg-indigo-100 text-indigo-800 border-indigo-300",
      completed: "bg-green-100 text-green-800 border-green-300",
      reported: "bg-purple-100 text-purple-800 border-purple-300",
      reviewed: "bg-teal-100 text-teal-800 border-teal-300",
      delivered: "bg-gray-100 text-gray-800 border-gray-300",
      cancelled: "bg-red-100 text-red-800 border-red-300",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const getStatusText = (status: RadiologyStatus) => {
    return t(`radiology.${status}`, { defaultValue: status });
  };

  const getModalityText = (modality: RadiologyModality) => {
    return t(`radiology.${modality}`, { defaultValue: modality });
  };

  const getModalityIcon = (modality: RadiologyModality) => {
    return <ScanLine className="h-4 w-4" />;
  };

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 via-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-premium">
                <ScanLine className="h-6 w-6 text-white" strokeWidth={2.5} />
              </div>
              {t('radiology.title')}
            </h1>
            <p className="text-muted-foreground mt-2">{t('radiology.subtitle')}</p>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => toast({ title: t('radiology.export'), description: t('common.loading') })}
              variant="outline"
              className="gap-2"
            >
              <Download className="h-4 w-4" />
              {t('radiology.export')}
            </Button>
            <Button className="gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
              <Plus className="h-4 w-4" />
              {t('radiology.newRequest')}
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="premium-card border-t-4 border-t-purple-500">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">{t('radiology.totalRequests')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold gradient-text">{stats.totalRequests}</div>
                <Activity className="h-8 w-8 text-purple-500 opacity-50" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">{t('radiology.requests')}</p>
            </CardContent>
          </Card>

          <Card className="premium-card border-t-4 border-t-blue-500">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">{t('radiology.scheduledToday')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold text-blue-600">{stats.scheduledToday}</div>
                <Calendar className="h-8 w-8 text-blue-500 opacity-50" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">{t('common.today')}</p>
            </CardContent>
          </Card>

          <Card className="premium-card border-t-4 border-t-green-500">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">{t('radiology.completedToday')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold text-green-600">{stats.completedToday}</div>
                <TrendingUp className="h-8 w-8 text-green-500 opacity-50" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">{t('common.today')}</p>
            </CardContent>
          </Card>

          <Card className="premium-card border-t-4 border-t-orange-500">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">{t('radiology.urgentCases')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold text-orange-600">{stats.urgentRequests}</div>
                <Zap className="h-8 w-8 text-orange-500 opacity-50" />
              </div>
              <p className="text-xs text-muted-foreground mt-2">{t('radiology.priority')}</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="requests" className="space-y-4">
          <TabsList className="bg-white border shadow-sm">
            <TabsTrigger value="requests" className="gap-2">
              <FileText className="h-4 w-4" />
              {t('radiology.requests')}
            </TabsTrigger>
            <TabsTrigger value="schedule" className="gap-2">
              <Calendar className="h-4 w-4" />
              {t('radiology.schedule')}
            </TabsTrigger>
            <TabsTrigger value="exams" className="gap-2">
              <ScanLine className="h-4 w-4" />
              {t('radiology.exams')}
            </TabsTrigger>
            <TabsTrigger value="reports" className="gap-2">
              <FileText className="h-4 w-4" />
              {t('radiology.reports')}
            </TabsTrigger>
            <TabsTrigger value="statistics" className="gap-2">
              <TrendingUp className="h-4 w-4" />
              {t('radiology.statistics')}
            </TabsTrigger>
          </TabsList>

          {/* Requests Tab */}
          <TabsContent value="requests" className="space-y-4">
            <Card className="premium-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{t('radiology.radiologyRequests')}</CardTitle>
                    <CardDescription>{t('radiology.manageTracking')}</CardDescription>
                  </div>
                </div>

                {/* Filters */}
                <div className="flex gap-3 mt-4">
                  <div className="flex-1 relative">
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder={t('radiology.searchRequests')}
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
                      <SelectItem value="all">{t('radiology.allStatuses')}</SelectItem>
                      <SelectItem value="pending">{t('radiology.pending')}</SelectItem>
                      <SelectItem value="scheduled">{t('radiology.scheduled')}</SelectItem>
                      <SelectItem value="in_progress">{t('radiology.inProgress')}</SelectItem>
                      <SelectItem value="completed">{t('radiology.completed')}</SelectItem>
                      <SelectItem value="reported">{t('radiology.reported')}</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={modalityFilter} onValueChange={setModalityFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder={t('radiology.examType')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t('radiology.allModalities')}</SelectItem>
                      <SelectItem value="xray">{t('radiology.xray')}</SelectItem>
                      <SelectItem value="ct">{t('radiology.ct')}</SelectItem>
                      <SelectItem value="mri">{t('radiology.mri')}</SelectItem>
                      <SelectItem value="ultrasound">{t('radiology.ultrasound')}</SelectItem>
                      <SelectItem value="doppler">{t('radiology.doppler')}</SelectItem>
                      <SelectItem value="mammography">{t('radiology.mammography')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                {filteredRequests.length === 0 ? (
                  <div className="text-center py-12">
                    <ScanLine className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                    <p className="text-muted-foreground">{t('radiology.noRequests')}</p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>{t('radiology.requestNumber')}</TableHead>
                        <TableHead>{t('common.patient')}</TableHead>
                        <TableHead>{t('common.age')}</TableHead>
                        <TableHead>{t('common.doctor')}</TableHead>
                        <TableHead>{t('radiology.examType')}</TableHead>
                        <TableHead>{t('radiology.appointment')}</TableHead>
                        <TableHead>{t('radiology.priority')}</TableHead>
                        <TableHead>{t('common.status')}</TableHead>
                        <TableHead>{t('radiology.amount')}</TableHead>
                        <TableHead>{t('common.actions')}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredRequests.map((request) => (
                        <TableRow key={request.id} className="hover:bg-gradient-to-r hover:from-purple-50/50 hover:to-indigo-50/50">
                          <TableCell className="font-medium">{request.requestNumber}</TableCell>
                          <TableCell>
                          <div>
                            <div className="font-medium">{request.patientName}</div>
                            <div className="text-sm text-muted-foreground">
                              {request.patientGender === "male" ? t('radiology.male') : t('radiology.female')}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">{request.patientAge} {t('common.years')}</div>
                        </TableCell>
                          <TableCell>{request.doctorName}</TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {request.exams.slice(0, 2).map((exam, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs gap-1">
                                  {getModalityIcon(exam.modality)}
                                  {getModalityText(exam.modality)}
                                </Badge>
                              ))}
                              {request.exams.length > 2 && (
                                <Badge variant="secondary" className="text-xs">
                                  +{request.exams.length - 2}
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            {request.scheduledDate ? (
                              <div className="text-sm">
                                <div>{new Date(request.scheduledDate).toLocaleDateString("ar-EG")}</div>
                                <div className="text-xs text-muted-foreground">{request.scheduledTime}</div>
                              </div>
                            ) : (
                              <span className="text-xs text-muted-foreground">{t('radiology.notScheduled')}</span>
                            )}
                          </TableCell>
                          <TableCell>
                            {request.priority === "urgent" && <Badge variant="destructive">{t('radiology.urgent')}</Badge>}
                            {request.priority === "stat" && <Badge className="bg-red-600">{t('radiology.stat')}</Badge>}
                            {request.priority === "routine" && <Badge variant="secondary">{t('radiology.routine')}</Badge>}
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(request.status)} variant="outline">
                              {getStatusText(request.status)}
                            </Badge>
                          </TableCell>
                          <TableCell className="font-semibold">{request.totalAmount} ج.م</TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                <FileText className="h-4 w-4" />
                              </Button>
                              {request.status === "pending" && (
                                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                  <Calendar className="h-4 w-4" />
                                </Button>
                              )}
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

          {/* Schedule Tab */}
          <TabsContent value="schedule">
            <Card className="premium-card">
              <CardHeader>
                <CardTitle>{t('radiology.scheduleAppointments')}</CardTitle>
                <CardDescription>{t('radiology.manageAppointments')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <p className="text-muted-foreground">{t('radiology.viewCalendar')}</p>
                  <Button className="mt-4">{t('radiology.viewCalendar')}</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Exams Tab */}
          <TabsContent value="exams">
            <Card className="premium-card">
              <CardHeader>
                <CardTitle>{t('radiology.availableExams')}</CardTitle>
                <CardDescription>{t('radiology.allExamsDescription')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { modality: "xray", count: 7, color: "from-blue-500 to-blue-600" },
                    { modality: "ct", count: 5, color: "from-purple-500 to-purple-600" },
                    { modality: "mri", count: 5, color: "from-indigo-500 to-indigo-600" },
                    { modality: "ultrasound", count: 5, color: "from-green-500 to-green-600" },
                    { modality: "doppler", count: 2, color: "from-teal-500 to-teal-600" },
                    { modality: "mammography", count: 1, color: "from-pink-500 to-pink-600" },
                    { modality: "ecg", count: 1, color: "from-red-500 to-red-600" },
                    { modality: "echo", count: 1, color: "from-orange-500 to-orange-600" },
                    { modality: "dexa", count: 1, color: "from-yellow-500 to-yellow-600" },
                  ].map((item) => (
                    <Card key={item.modality} className="premium-card hover:shadow-8k transition-all duration-500">
                      <CardHeader>
                        <div className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center shadow-premium mb-3`}>
                          <ScanLine className="h-6 w-6 text-white" strokeWidth={2.5} />
                        </div>
                        <CardTitle className="text-lg">{getModalityText(item.modality as RadiologyModality)}</CardTitle>
                        <CardDescription>{item.count} {t('radiology.examsAvailable')}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button variant="outline" className="w-full">
                          {t('radiology.viewExams')}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports">
            <Card className="premium-card">
              <CardHeader>
                <CardTitle>{t('radiology.radiologyReports')}</CardTitle>
                <CardDescription>{t('radiology.viewReports')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <p className="text-muted-foreground">{t('radiology.noReports')}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Statistics Tab */}
          <TabsContent value="statistics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="premium-card">
                <CardHeader>
                  <CardTitle>{t('radiology.examsByType')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {stats.examsByModality.map((item) => (
                      <div key={item.modality} className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl">
                        <span className="font-medium flex items-center gap-2">
                          {getModalityIcon(item.modality)}
                          {getModalityText(item.modality)}
                        </span>
                        <Badge variant="secondary">{item.count}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="premium-card">
                <CardHeader>
                  <CardTitle>{t('radiology.performance')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl">
                    <span className="font-medium">{t('radiology.avgCompletionTime')}</span>
                    <span className="text-2xl font-bold text-blue-600">{stats.averageCompletionTime.toFixed(0)} {t('radiology.minutes')}</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl">
                    <span className="font-medium">{t('radiology.revenue')}</span>
                    <span className="text-2xl font-bold text-green-600">{stats.revenue.toLocaleString()} {t('common.currency')}</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-red-50 to-red-100 rounded-xl">
                    <span className="font-medium">{t('radiology.criticalCases')}</span>
                    <span className="text-2xl font-bold text-red-600">{stats.criticalFindings}</span>
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
