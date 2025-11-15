import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  Users,
  Stethoscope,
  Calendar,
  FileText,
  Pill,
  DollarSign,
  ShieldCheck,
  UtensilsCrossed,
  Wrench,
  Package,
  Activity,
  ArrowRight,
  CheckCircle2,
  Clock,
  TrendingUp,
  TrendingDown,
  BedDouble,
  UserCheck,
  AlertCircle,
  Scissors,
  BarChart3,
  UserCircle,
  DoorOpen,
} from "lucide-react";

const QuickStatCard = ({
  label,
  value,
  change,
  trend,
  icon: Icon,
  color,
  vsLastMonth,
}: {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: any;
  color: string;
  vsLastMonth: string;
}) => (
  <Card>
    <CardContent className="p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-slate-600 mb-1">{label}</p>
          <p className="text-3xl font-bold text-slate-900 mb-2">{value}</p>
          <div className="flex items-center gap-1">
            {trend === "up" ? (
              <TrendingUp className="w-4 h-4 text-green-600" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-600" />
            )}
            <span
              className={`text-sm font-medium ${trend === "up" ? "text-green-600" : "text-red-600"}`}
            >
              {change}
            </span>
            <span className="text-sm text-slate-500">{vsLastMonth}</span>
          </div>
        </div>
        <div className={`w-14 h-14 ${color} rounded-xl flex items-center justify-center`}>
          <Icon className="w-7 h-7 text-white" />
        </div>
      </div>
    </CardContent>
  </Card>
);

const QuickAccessCard = ({
  icon: Icon,
  title,
  count,
  path,
  color,
}: {
  icon: any;
  title: string;
  count: string;
  path: string;
  color: string;
}) => (
  <Link to={path}>
    <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-slate-900 mb-1">{title}</h3>
            <p className="text-2xl font-bold text-slate-900">{count}</p>
          </div>
          <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
        </div>
      </CardContent>
    </Card>
  </Link>
);

export default function Index() {
  const { t } = useTranslation();
  
  const todayStats = {
    appointments: 143,
    admissions: 68,
    surgeries: 12,
    emergencies: 24,
  };

  const recentActivity = [
    {
      type: "admission",
      patient: "Ahmed Al-Mansouri",
      department: t('dashboard.cardiology'),
      time: t('dashboard.minsAgo', { count: 15 }),
      status: "admitted",
    },
    {
      type: "surgery",
      patient: "Fatima Hassan",
      department: t('dashboard.surgery'),
      time: t('dashboard.minsAgo', { count: 32 }),
      status: "in-progress",
    },
    {
      type: "discharge",
      patient: "Mohammed Ali",
      department: t('dashboard.orthopedics'),
      time: t('dashboard.hourAgo', { count: 1 }),
      status: "completed",
    },
    {
      type: "emergency",
      patient: "Sarah Abdullah",
      department: t('dashboard.emergency'),
      time: t('dashboard.hourAgo', { count: 1 }),
      status: "critical",
    },
  ];

  const departmentOccupancy = [
    { name: t('dashboard.cardiology'), occupied: 18, total: 25, percentage: 72 },
    { name: t('dashboard.neurology'), occupied: 12, total: 15, percentage: 80 },
    { name: t('dashboard.orthopedics'), occupied: 22, total: 30, percentage: 73 },
    { name: t('dashboard.pediatrics'), occupied: 15, total: 20, percentage: 75 },
    { name: t('dashboard.icu'), occupied: 8, total: 10, percentage: 80 },
  ];

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">{t('dashboard.title')}</h1>
          <p className="text-lg text-slate-600">
            {t('dashboard.welcome')}
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <QuickStatCard
            label={t('dashboard.totalPatients')}
            value="12,847"
            change="+12.5%"
            trend="up"
            icon={Users}
            color="bg-blue-600"
            vsLastMonth={t('dashboard.vsLastMonth')}
          />
          <QuickStatCard
            label={t('dashboard.bedOccupancy')}
            value="68%"
            change="+5.2%"
            trend="up"
            icon={BedDouble}
            color="bg-purple-600"
            vsLastMonth={t('dashboard.vsLastMonth')}
          />
          <QuickStatCard
            label={t('dashboard.staffOnDuty')}
            value="284"
            change="-2.1%"
            trend="down"
            icon={UserCheck}
            color="bg-green-600"
            vsLastMonth={t('dashboard.vsLastMonth')}
          />
          <QuickStatCard
            label={t('dashboard.revenueToday')}
            value="SAR 285K"
            change="+8.3%"
            trend="up"
            icon={DollarSign}
            color="bg-emerald-600"
            vsLastMonth={t('dashboard.vsLastMonth')}
          />
        </div>

        {/* Today's Activity */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Calendar className="w-8 h-8 text-blue-600" />
                <Badge className="bg-blue-600">{t('dashboard.today')}</Badge>
              </div>
              <p className="text-sm text-blue-700 font-medium mb-1">{t('dashboard.appointments')}</p>
              <p className="text-3xl font-bold text-blue-900">{todayStats.appointments}</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <BedDouble className="w-8 h-8 text-purple-600" />
                <Badge className="bg-purple-600">{t('dashboard.active')}</Badge>
              </div>
              <p className="text-sm text-purple-700 font-medium mb-1">{t('dashboard.admissions')}</p>
              <p className="text-3xl font-bold text-purple-900">{todayStats.admissions}</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Scissors className="w-8 h-8 text-red-600" />
                <Badge className="bg-red-600">{t('dashboard.scheduled')}</Badge>
              </div>
              <p className="text-sm text-red-700 font-medium mb-1">{t('dashboard.surgeries')}</p>
              <p className="text-3xl font-bold text-red-900">{todayStats.surgeries}</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <AlertCircle className="w-8 h-8 text-orange-600" />
                <Badge className="bg-orange-600">{t('dashboard.urgent')}</Badge>
              </div>
              <p className="text-sm text-orange-700 font-medium mb-1">{t('dashboard.emergency')}</p>
              <p className="text-3xl font-bold text-orange-900">{todayStats.emergencies}</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Access & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Access */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">{t('dashboard.quickAccess')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <QuickAccessCard
                  icon={Users}
                  title={t('navigation.patients')}
                  count="12,847"
                  path="/patients"
                  color="bg-blue-600"
                />
                <QuickAccessCard
                  icon={Building2}
                  title={t('navigation.departments')}
                  count="6"
                  path="/departments"
                  color="bg-purple-600"
                />
                <QuickAccessCard
                  icon={DoorOpen}
                  title={t('navigation.rooms')}
                  count="134"
                  path="/rooms"
                  color="bg-green-600"
                />
                <QuickAccessCard
                  icon={Pill}
                  title={t('navigation.pharmacy')}
                  count="4,320"
                  path="/pharmacy"
                  color="bg-pink-600"
                />
                <QuickAccessCard
                  icon={BarChart3}
                  title={t('navigation.erp')}
                  count={t('dashboard.analytics')}
                  path="/erp"
                  color="bg-indigo-600"
                />
                <QuickAccessCard
                  icon={UserCircle}
                  title={t('navigation.crm')}
                  count={t('dashboard.contacts')}
                  path="/crm"
                  color="bg-cyan-600"
                />
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">{t('dashboard.recentActivity')}</h2>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3 pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        activity.status === "critical" ? "bg-red-100" :
                        activity.status === "in-progress" ? "bg-blue-100" :
                        activity.status === "completed" ? "bg-green-100" :
                        "bg-purple-100"
                      }`}>
                        {activity.type === "admission" && <BedDouble className="w-5 h-5 text-purple-600" />}
                        {activity.type === "surgery" && <Scissors className="w-5 h-5 text-blue-600" />}
                        {activity.type === "discharge" && <CheckCircle2 className="w-5 h-5 text-green-600" />}
                        {activity.type === "emergency" && <AlertCircle className="w-5 h-5 text-red-600" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-slate-900 truncate">{activity.patient}</p>
                        <p className="text-xs text-slate-600">{activity.department}</p>
                        <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
                      </div>
                      <Badge
                        variant={
                          activity.status === "critical" ? "destructive" :
                          activity.status === "in-progress" ? "default" :
                          "secondary"
                        }
                        className="text-xs"
                      >
                        {t(`dashboard.${activity.status.replace('-', '')}`)}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Department Occupancy */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">{t('dashboard.departmentOccupancy')}</h2>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                {departmentOccupancy.map((dept, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <Building2 className="w-5 h-5 text-slate-600" />
                        <span className="font-semibold text-slate-900">{dept.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-slate-600">
                          {dept.occupied}/{dept.total} {t('dashboard.beds')}
                        </span>
                        <Badge variant={dept.percentage >= 80 ? "destructive" : "secondary"}>
                          {dept.percentage}%
                        </Badge>
                      </div>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          dept.percentage >= 90 ? "bg-red-600" :
                          dept.percentage >= 80 ? "bg-orange-500" :
                          dept.percentage >= 70 ? "bg-yellow-500" :
                          "bg-green-500"
                        }`}
                        style={{ width: `${dept.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Financial Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-green-600" />
                {t('dashboard.financialOverview')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div>
                    <p className="text-sm text-green-700 font-medium">{t('dashboard.totalRevenueMonth')}</p>
                    <p className="text-2xl font-bold text-green-900">SAR 8.45M</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
                <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                  <div>
                    <p className="text-sm text-red-700 font-medium">{t('dashboard.totalExpenses')}</p>
                    <p className="text-2xl font-bold text-red-900">SAR 5.28M</p>
                  </div>
                  <TrendingDown className="w-8 h-8 text-red-600" />
                </div>
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <div>
                    <p className="text-sm text-blue-700 font-medium">{t('dashboard.netProfit')}</p>
                    <p className="text-2xl font-bold text-blue-900">SAR 3.17M</p>
                  </div>
                  <CheckCircle2 className="w-8 h-8 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* System Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-600" />
                {t('dashboard.systemStatus')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-blue-600" />
                    <span className="font-medium text-slate-900">{t('dashboard.activeUsers')}</span>
                  </div>
                  <Badge className="bg-green-600">284 {t('dashboard.online')}</Badge>
                </div>
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Package className="w-5 h-5 text-purple-600" />
                    <span className="font-medium text-slate-900">{t('dashboard.inventoryItems')}</span>
                  </div>
                  <Badge className="bg-purple-600">4,320 {t('dashboard.items')}</Badge>
                </div>
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-orange-600" />
                    <span className="font-medium text-slate-900">{t('dashboard.lowStockAlert')}</span>
                  </div>
                  <Badge variant="destructive">43 {t('dashboard.items')}</Badge>
                </div>
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Wrench className="w-5 h-5 text-red-600" />
                    <span className="font-medium text-slate-900">{t('dashboard.pendingMaintenance')}</span>
                  </div>
                  <Badge className="bg-red-600">12 {t('dashboard.tasks')}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* All Modules */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">{t('dashboard.allModules')}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {[
              { name: t('navigation.patients'), icon: Users, path: "/patients", color: "bg-blue-600" },
              { name: t('navigation.departments'), icon: Building2, path: "/departments", color: "bg-purple-600" },
              { name: t('navigation.rooms'), icon: DoorOpen, path: "/rooms", color: "bg-green-600" },
              { name: t('navigation.medicalRecords'), icon: FileText, path: "/medical-records", color: "bg-indigo-600" },
              { name: t('navigation.surgery'), icon: Scissors, path: "/surgery", color: "bg-red-600" },
              { name: t('navigation.pharmacy'), icon: Pill, path: "/pharmacy", color: "bg-pink-600" },
              { name: t('navigation.insurance'), icon: ShieldCheck, path: "/insurance", color: "bg-cyan-600" },
              { name: t('navigation.staff'), icon: UserCheck, path: "/staff", color: "bg-slate-600" },
              { name: t('navigation.hr'), icon: Users, path: "/hr", color: "bg-amber-600" },
              { name: t('navigation.maintenance'), icon: Wrench, path: "/maintenance", color: "bg-red-700" },
              { name: t('navigation.supplyChain'), icon: Package, path: "/supply-chain", color: "bg-blue-700" },
              { name: t('navigation.kitchen'), icon: UtensilsCrossed, path: "/kitchen", color: "bg-orange-600" },
              { name: t('navigation.finance'), icon: DollarSign, path: "/finance", color: "bg-green-700" },
              { name: t('navigation.erp'), icon: BarChart3, path: "/erp", color: "bg-indigo-700" },
              { name: t('navigation.crm'), icon: UserCircle, path: "/crm", color: "bg-cyan-700" },
            ].map((module, index) => (
              <Link key={index} to={module.path}>
                <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
                  <CardContent className="p-4 text-center">
                    <div className={`w-12 h-12 ${module.color} rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                      <module.icon className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-sm font-semibold text-slate-900">{module.name}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
