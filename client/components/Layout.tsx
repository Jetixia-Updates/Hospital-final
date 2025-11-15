import { ReactNode, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { 
  Search, 
  Bell, 
  User, 
  Menu, 
  X,
  Clock,
  ArrowRight,
  LayoutDashboard,
  Users,
  Building2,
  FileText,
  Scissors,
  Pill,
  Shield,
  DoorOpen,
  UserCheck,
  Briefcase,
  Wrench,
  Package,
  UtensilsCrossed,
  DollarSign,
  ChevronRight,
  ChevronLeft,
  BarChart3,
  UserCircle,
  Settings,
  LogOut,
  HelpCircle,
  Activity,
  Stethoscope,
  AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import LanguageSwitcher from "./LanguageSwitcher";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notificationFilter, setNotificationFilter] = useState<"all" | "unread">("all");
  const location = useLocation();
  const { t } = useTranslation();

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "urgent",
      title: "عملية جراحية طارئة",
      titleEn: "Emergency Surgery",
      message: "مريض في غرفة الطوارئ يحتاج لعملية فورية",
      messageEn: "Patient in ER requires immediate surgery",
      time: "منذ 5 دقائق",
      timeEn: "5 minutes ago",
      icon: "🚨",
      read: false,
      category: "medical",
      priority: "high",
      link: "/surgery",
    },
    {
      id: 2,
      type: "warning",
      title: "نقص في مخزون الأدوية",
      titleEn: "Low Medicine Stock",
      message: "3 أدوية تحت الحد الأدنى المطلوب",
      messageEn: "3 medicines below minimum stock level",
      time: "منذ 15 دقيقة",
      timeEn: "15 minutes ago",
      icon: "⚠️",
      read: false,
      category: "pharmacy",
      priority: "medium",
      link: "/pharmacy",
    },
    {
      id: 3,
      type: "info",
      title: "موعد طبيب جديد",
      titleEn: "New Doctor Appointment",
      message: "د. أحمد محمد سيبدأ العمل غداً",
      messageEn: "Dr. Ahmed Mohammed starts tomorrow",
      time: "منذ ساعة",
      timeEn: "1 hour ago",
      icon: "👨‍⚕️",
      read: false,
      category: "hr",
      priority: "low",
      link: "/staff",
    },
    {
      id: 4,
      type: "success",
      title: "تم استلام شحنة الأدوية",
      titleEn: "Medicine Shipment Received",
      message: "وصلت شحنة من المورد بنجاح - 45 صنف",
      messageEn: "Shipment received successfully - 45 items",
      time: "منذ ساعتين",
      timeEn: "2 hours ago",
      icon: "✅",
      read: true,
      category: "pharmacy",
      priority: "low",
      link: "/pharmacy",
    },
    {
      id: 5,
      type: "warning",
      title: "صيانة غرفة عمليات",
      titleEn: "Operating Room Maintenance",
      message: "غرفة العمليات 2 تحتاج صيانة عاجلة",
      messageEn: "Operating Room 2 requires urgent maintenance",
      time: "منذ 3 ساعات",
      timeEn: "3 hours ago",
      icon: "🔧",
      read: true,
      category: "maintenance",
      priority: "high",
      link: "/maintenance",
    },
    {
      id: 6,
      type: "info",
      title: "تقرير مالي شهري",
      titleEn: "Monthly Financial Report",
      message: "تقرير شهر نوفمبر جاهز للمراجعة",
      messageEn: "November report ready for review",
      time: "منذ 4 ساعات",
      timeEn: "4 hours ago",
      icon: "📊",
      read: true,
      category: "finance",
      priority: "medium",
      link: "/finance",
    },
    {
      id: 7,
      type: "urgent",
      title: "مريض في حالة حرجة",
      titleEn: "Critical Patient",
      message: "مريض في العناية المركزة يحتاج متابعة فورية",
      messageEn: "ICU patient requires immediate attention",
      time: "منذ 10 دقائق",
      timeEn: "10 minutes ago",
      icon: "🏥",
      read: false,
      category: "medical",
      priority: "high",
      link: "/departments",
    },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;
  const filteredNotifications = notificationFilter === "unread" 
    ? notifications.filter(n => !n.read)
    : notifications;

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const navigationItems = [
    {
      category: t('categories.clinicalServices'),
      items: [
        { name: t('navigation.patients'), path: "/patients", icon: Users },
        { name: t('navigation.departments'), path: "/departments", icon: Building2 },
        { name: t('navigation.clinics'), path: "/clinics", icon: Stethoscope },
        { name: t('navigation.emergency'), path: "/emergency", icon: AlertCircle },
        { name: t('navigation.rooms'), path: "/rooms", icon: DoorOpen },
        { name: t('navigation.medicalRecords'), path: "/medical-records", icon: FileText },
        { name: t('navigation.surgery'), path: "/surgery", icon: Scissors },
        { name: t('navigation.pharmacy'), path: "/pharmacy", icon: Pill },
        { name: t('navigation.insurance'), path: "/insurance", icon: Shield },
      ],
    },
    {
      category: t('categories.organization'),
      items: [
        { name: t('navigation.staff'), path: "/staff", icon: UserCheck },
        { name: t('navigation.hr'), path: "/hr", icon: Briefcase },
      ],
    },
    {
      category: t('categories.operations'),
      items: [
        { name: t('navigation.maintenance'), path: "/maintenance", icon: Wrench },
        { name: t('navigation.supplyChain'), path: "/supply-chain", icon: Package },
        { name: t('navigation.kitchen'), path: "/kitchen", icon: UtensilsCrossed },
        { name: t('navigation.finance'), path: "/finance", icon: DollarSign },
      ],
    },
    {
      category: t('categories.managementSystems'),
      items: [
        { name: t('navigation.erp'), path: "/erp", icon: BarChart3 },
        { name: t('navigation.crm'), path: "/crm", icon: UserCircle },
      ],
    },
  ];

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 h-screen glass border-r border-white/20 shadow-premium-lg transition-all duration-500 z-40 flex flex-col backdrop-blur-2xl",
          isSidebarOpen ? "w-72" : "w-20"
        )}
      >
        {/* Logo & Toggle */}
        <div className="flex items-center justify-between p-5 border-b border-white/20 flex-shrink-0">
          {isSidebarOpen && (
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-11 h-11 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-premium group-hover:shadow-premium-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                <Activity className="w-6 h-6 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <span className="text-xl font-bold gradient-text tracking-tight">HealthHub</span>
                <p className="text-xs text-slate-600 font-medium">{t('footer.copyright')}</p>
              </div>
            </Link>
          )}
          {!isSidebarOpen && (
            <div className="w-11 h-11 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-premium mx-auto">
              <Activity className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
          )}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={cn(
              "p-2.5 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/50 hover:from-blue-100 hover:to-blue-200/50 text-blue-600 transition-all duration-500 border border-blue-200/50 shadow-sm hover:shadow-md",
              !isSidebarOpen && "hidden"
            )}
          >
            {isSidebarOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent hover:scrollbar-thumb-slate-400">
          {/* Dashboard Link */}
          <Link
            to="/"
            className={cn(
              "flex items-center gap-3 px-4 py-3.5 rounded-2xl mb-4 transition-all duration-500 group relative overflow-hidden",
              location.pathname === "/"
                ? "bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 text-white shadow-premium hover:shadow-premium-lg"
                : "text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100/50 hover:text-blue-700 hover:shadow-sm"
            )}
          >
            <LayoutDashboard size={20} className="relative z-10" strokeWidth={2.5} />
            {isSidebarOpen && <span className="font-bold relative z-10 tracking-tight">{t('navigation.dashboard')}</span>}
            {location.pathname === "/" && isSidebarOpen && (
              <div className="ml-auto">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse shadow-lg shadow-white/50"></div>
              </div>
            )}
          </Link>

          {/* Categories */}
          {navigationItems.map((category, idx) => (
            <div key={idx} className="mb-5">
              {isSidebarOpen && (
                <div className="flex items-center gap-2 mb-2 px-2">
                  <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    {category.category}
                  </h3>
                  <div className="h-px flex-1 bg-slate-200"></div>
                </div>
              )}
              {!isSidebarOpen && (
                <div className="h-px bg-slate-200 mb-2 mx-2"></div>
              )}
              <div className="space-y-0.5">
                {category.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={cn(
                        "flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-500 group relative overflow-hidden",
                        isActive
                          ? "bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 text-white shadow-premium"
                          : "text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100/50 hover:text-blue-700 hover:shadow-sm hover:translate-x-0.5"
                      )}
                      title={!isSidebarOpen ? item.name : undefined}
                    >
                      <Icon size={18} className="relative z-10 flex-shrink-0" strokeWidth={2.5} />
                      {isSidebarOpen && (
                        <span className="font-semibold relative z-10 text-sm tracking-tight">{item.name}</span>
                      )}
                      {isActive && isSidebarOpen && (
                        <ChevronRight size={16} className="ml-auto relative z-10 animate-pulse" strokeWidth={2.5} />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Sidebar Footer */}
        {isSidebarOpen && (
          <div className="border-t border-slate-200 p-3 space-y-1 flex-shrink-0">
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-blue-600 hover:bg-blue-50 hover:text-blue-700 transition-all duration-300 group">
              <Settings size={18} className="group-hover:rotate-90 transition-transform duration-300" />
              <span className="font-medium text-sm">{t('common.settings')}</span>
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-blue-600 hover:bg-blue-50 hover:text-blue-700 transition-all duration-300">
                            <HelpCircle size={18} strokeWidth={2.5} />
              <span className="font-medium text-sm">{t('common.help')}</span>
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-300">
                            <LogOut size={18} strokeWidth={2.5} />
              <span className="font-medium text-sm">{t('common.logout')}</span>
            </button>
          </div>
        )}
      </aside>

      {/* Main Content Area */}
      <div
        className={cn(
          "flex-1 flex flex-col transition-all duration-300",
          isSidebarOpen ? "ml-72" : "ml-20"
        )}
      >
        {/* Header */}
        <header className="glass border-b border-white/20 sticky top-0 z-30 shadow-premium">
          <div className="flex items-center justify-between px-8 py-5">
            {/* Search Bar */}
            <div className="flex-1 max-w-2xl">
              <div className="relative group">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-all duration-500 group-focus-within:scale-110" size={20} strokeWidth={2.5} />
                <input
                  type="text"
                  placeholder={t('header.searchPlaceholder')}
                  className="w-full pl-14 pr-6 py-3.5 bg-white/50 border border-slate-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white shadow-sm focus:shadow-premium transition-all duration-500 placeholder:text-slate-400 font-medium"
                />
              </div>
            </div>

            {/* Right Icons */}
            <div className="flex items-center space-x-4 ml-6">
              {/* Notifications */}
              <div className="relative">
                <button 
                  onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                  className="relative p-3.5 rounded-2xl hover:bg-gradient-to-br hover:from-blue-50 hover:to-blue-100/50 text-slate-600 hover:text-blue-700 transition-all duration-500 group shadow-sm hover:shadow-md"
                >
                  <Bell size={20} strokeWidth={2.5} className="group-hover:scale-110 transition-transform duration-500 group-hover:animate-wiggle" />
                  {unreadCount > 0 && (
                    <>
                      <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-gradient-to-br from-red-500 to-red-600 rounded-full animate-pulse shadow-lg shadow-red-500/50"></span>
                      <Badge className="absolute -top-1 -right-1 bg-gradient-to-br from-red-500 to-red-600 text-white text-xs px-2 py-0.5 min-w-[22px] h-5.5 shadow-premium font-bold">
                        {unreadCount}
                      </Badge>
                    </>
                  )}
                </button>

                {/* Notifications Dropdown */}
                {isNotificationOpen && (
                  <>
                    {/* Backdrop */}
                    <div 
                      className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
                      onClick={() => setIsNotificationOpen(false)}
                    />
                    
                    {/* Dropdown Panel */}
                    <div className="absolute left-0 mt-2 w-[420px] bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 overflow-hidden animate-in slide-in-from-top-2 duration-300">
                      {/* Header */}
                      <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 px-6 py-4">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h3 className="text-white font-bold text-lg flex items-center gap-2">
                              <Bell className="w-5 h-5" />
                              التنبيهات
                            </h3>
                            <p className="text-blue-100 text-sm">
                              {unreadCount > 0 ? `${unreadCount} تنبيه جديد` : "لا توجد تنبيهات جديدة"}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            {unreadCount > 0 && (
                              <button
                                onClick={markAllAsRead}
                                className="text-white hover:bg-white/20 px-3 py-1.5 rounded-lg transition-colors text-xs font-semibold"
                                title="تعليم الكل كمقروء"
                              >
                                ✓ الكل
                              </button>
                            )}
                            <button 
                              onClick={() => setIsNotificationOpen(false)}
                              className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
                            >
                              <X size={20} />
                            </button>
                          </div>
                        </div>

                        {/* Filter Tabs */}
                        <div className="flex gap-2">
                          <button
                            onClick={() => setNotificationFilter("all")}
                            className={cn(
                              "flex-1 py-2 px-4 rounded-lg text-sm font-semibold transition-all duration-300",
                              notificationFilter === "all"
                                ? "bg-white text-blue-600 shadow-md"
                                : "bg-white/20 text-white hover:bg-white/30"
                            )}
                          >
                            الكل ({notifications.length})
                          </button>
                          <button
                            onClick={() => setNotificationFilter("unread")}
                            className={cn(
                              "flex-1 py-2 px-4 rounded-lg text-sm font-semibold transition-all duration-300",
                              notificationFilter === "unread"
                                ? "bg-white text-blue-600 shadow-md"
                                : "bg-white/20 text-white hover:bg-white/30"
                            )}
                          >
                            غير المقروءة ({unreadCount})
                          </button>
                        </div>
                      </div>

                      {/* Notifications List */}
                      <div className="max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
                        {filteredNotifications.length === 0 ? (
                          <div className="px-6 py-12 text-center">
                            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                              <Bell className="w-8 h-8 text-slate-400" />
                            </div>
                            <p className="text-slate-600 font-medium">لا توجد تنبيهات</p>
                            <p className="text-slate-400 text-sm mt-1">سنعلمك عند وصول تنبيهات جديدة</p>
                          </div>
                        ) : (
                          filteredNotifications.map((notification) => (
                            <div
                              key={notification.id}
                              className={cn(
                                "group px-6 py-4 border-b border-slate-100 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50 transition-all duration-300 cursor-pointer relative",
                                !notification.read && "bg-blue-50/30 border-l-4 border-l-blue-500"
                              )}
                              onClick={() => markAsRead(notification.id)}
                            >
                              {/* Priority Indicator */}
                              {notification.priority === "high" && !notification.read && (
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-red-500 to-orange-500"></div>
                              )}
                              
                              <div className="flex gap-3">
                                {/* Icon */}
                                <div className={cn(
                                  "text-2xl flex-shrink-0 mt-1 w-10 h-10 rounded-lg flex items-center justify-center",
                                  notification.type === "urgent" && "bg-red-100",
                                  notification.type === "warning" && "bg-orange-100",
                                  notification.type === "info" && "bg-blue-100",
                                  notification.type === "success" && "bg-green-100"
                                )}>
                                  {notification.icon}
                                </div>
                                
                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-start justify-between gap-2 mb-1">
                                    <h4 className="font-bold text-slate-900 text-sm leading-tight">
                                      {notification.title}
                                    </h4>
                                    {!notification.read && (
                                      <span className="w-2.5 h-2.5 bg-blue-600 rounded-full flex-shrink-0 mt-1 animate-pulse shadow-lg shadow-blue-500/50"></span>
                                    )}
                                  </div>
                                  
                                  <p className="text-slate-600 text-sm mb-2 leading-relaxed">
                                    {notification.message}
                                  </p>
                                  
                                  <div className="flex items-center justify-between gap-2">
                                    <div className="flex items-center gap-2 flex-wrap">
                                      <span className="text-xs text-slate-500 flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        {notification.time}
                                      </span>
                                      
                                      {notification.type === "urgent" && (
                                        <Badge variant="destructive" className="text-xs px-2 py-0 h-5">
                                          عاجل
                                        </Badge>
                                      )}
                                      {notification.type === "warning" && (
                                        <Badge className="text-xs border-orange-500 text-orange-700 bg-orange-50 px-2 py-0 h-5">
                                          تحذير
                                        </Badge>
                                      )}
                                      {notification.type === "success" && (
                                        <Badge className="text-xs border-green-500 text-green-700 bg-green-50 px-2 py-0 h-5">
                                          نجح
                                        </Badge>
                                      )}
                                      
                                      <Badge variant="outline" className="text-xs px-2 py-0 h-5">
                                        {notification.category === "medical" && "طبي"}
                                        {notification.category === "pharmacy" && "صيدلية"}
                                        {notification.category === "hr" && "موارد بشرية"}
                                        {notification.category === "maintenance" && "صيانة"}
                                        {notification.category === "finance" && "مالية"}
                                      </Badge>
                                    </div>
                                    
                                    {/* Actions */}
                                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                      <Link
                                        to={notification.link}
                                        onClick={() => setIsNotificationOpen(false)}
                                        className="p-1.5 hover:bg-blue-100 rounded-lg transition-colors"
                                        title="فتح"
                                      >
                                        <ArrowRight className="w-4 h-4 text-blue-600" />
                                      </Link>
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          deleteNotification(notification.id);
                                        }}
                                        className="p-1.5 hover:bg-red-100 rounded-lg transition-colors"
                                        title="حذف"
                                      >
                                        <X className="w-4 h-4 text-red-600" />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))
                        )}
                      </div>

                      {/* Footer */}
                      {filteredNotifications.length > 0 && (
                        <div className="px-6 py-3 bg-gradient-to-r from-slate-50 to-slate-100 border-t border-slate-200">
                          <div className="flex gap-2">
                            <button className="flex-1 text-center text-blue-600 hover:text-blue-700 font-semibold text-sm py-2.5 hover:bg-white rounded-xl transition-all duration-300 border border-transparent hover:border-blue-200 hover:shadow-md">
                              عرض الكل
                            </button>
                            <button 
                              onClick={() => setNotifications([])}
                              className="text-center text-red-600 hover:text-red-700 font-semibold text-sm py-2.5 px-4 hover:bg-white rounded-xl transition-all duration-300 border border-transparent hover:border-red-200 hover:shadow-md"
                            >
                              مسح الكل
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
              
              <div className="h-10 w-px bg-gradient-to-b from-transparent via-slate-200 to-transparent"></div>
              
              <LanguageSwitcher />
              
              <div className="h-10 w-px bg-gradient-to-b from-transparent via-slate-200 to-transparent"></div>
              
              <button className="flex items-center gap-3 px-5 py-2.5 rounded-2xl hover:bg-gradient-to-br hover:from-blue-50 hover:to-blue-100/50 transition-all duration-500 group shadow-sm hover:shadow-premium">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold shadow-premium group-hover:shadow-premium-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                  AH
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-slate-900 tracking-tight">{t('header.adminUser')}</p>
                  <p className="text-xs text-slate-600 font-semibold">{t('header.administrator')}</p>
                </div>
                <ChevronRight size={16} strokeWidth={2.5} className="text-slate-400 group-hover:text-blue-600 transition-all duration-500 group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>

        {/* Footer */}
        <footer className="glass border-t border-white/20 py-5 px-8">
          <div className="flex items-center justify-between text-sm text-slate-600">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-premium">
                <Activity className="w-4 h-4 text-white" strokeWidth={2.5} />
              </div>
              <p className="font-bold gradient-text">{t('footer.copyright')}</p>
            </div>
            <div className="flex items-center gap-4 text-xs text-slate-600">
              <a href="#" className="hover:text-blue-600 transition-all duration-300 font-semibold hover:scale-105">{t('footer.privacy')}</a>
              <a href="#" className="hover:text-blue-600 transition-all duration-300 font-semibold hover:scale-105">{t('footer.terms')}</a>
              <a href="#" className="hover:text-blue-600 transition-all duration-300 font-semibold hover:scale-105">{t('footer.support')}</a>
              <Badge variant="secondary" className="ml-3 shadow-sm bg-gradient-to-r from-blue-50 to-blue-100 font-bold">{t('footer.version')}</Badge>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
