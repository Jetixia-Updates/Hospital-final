import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
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
} from "lucide-react";

const ModuleCard = ({
  icon: Icon,
  title,
  description,
  status,
  itemCount,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  status: "completed" | "in_progress" | "planned";
  itemCount: number;
}) => {
  const statusConfig = {
    completed: {
      bg: "bg-green-50",
      badge: "✅ Ready",
      color: "text-green-700",
    },
    in_progress: {
      bg: "bg-blue-50",
      badge: "⏳ In Progress",
      color: "text-blue-700",
    },
    planned: {
      bg: "bg-amber-50",
      badge: "📋 Planned",
      color: "text-amber-700",
    },
  };

  const config = statusConfig[status];

  return (
    <div
      className={`${config.bg} border border-slate-200 rounded-xl p-6 hover:shadow-md transition-all duration-300 group cursor-default`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
          {Icon}
        </div>
        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full bg-white border ${config.color} border-current`}
        >
          {config.badge}
        </span>
      </div>
      <h3 className="text-lg font-semibold text-slate-900 mb-2">{title}</h3>
      <p className="text-sm text-slate-600 mb-4">{description}</p>
      <div className="flex items-center justify-between text-xs">
        <span className="text-slate-500">{itemCount} models</span>
      </div>
    </div>
  );
};

const StatCard = ({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) => (
  <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-slate-600 mb-1">{label}</p>
        <p className="text-2xl font-bold text-slate-900">{value}</p>
      </div>
      <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
        {Icon}
      </div>
    </div>
  </div>
);

export default function Index() {
  const modules = [
    {
      icon: <Building2 className="w-6 h-6 text-blue-600" />,
      title: "Organization Structure",
      description:
        "Hospital settings, buildings, floors, departments, and clinics",
      status: "in_progress" as const,
      itemCount: 15,
    },
    {
      icon: <Activity className="w-6 h-6 text-emerald-600" />,
      title: "Rooms & Beds",
      description:
        "Room management, amenities, services, and cleaning schedules",
      status: "in_progress" as const,
      itemCount: 6,
    },
    {
      icon: <Stethoscope className="w-6 h-6 text-red-600" />,
      title: "Medical Staff",
      description: "Doctor and nurse profiles, schedules, and qualifications",
      status: "in_progress" as const,
      itemCount: 10,
    },
    {
      icon: <Users className="w-6 h-6 text-purple-600" />,
      title: "Patients & Appointments",
      description: "Patient records, appointments, and waiting lists",
      status: "completed" as const,
      itemCount: 5,
    },
    {
      icon: <FileText className="w-6 h-6 text-indigo-600" />,
      title: "Medical Records",
      description:
        "Prescriptions, lab tests, imaging, vital signs, and allergies",
      status: "in_progress" as const,
      itemCount: 15,
    },
    {
      icon: <Activity className="w-6 h-6 text-orange-600" />,
      title: "Surgery Management",
      description:
        "Operating rooms, surgery teams, anesthesia, and post-op care",
      status: "in_progress" as const,
      itemCount: 8,
    },
    {
      icon: <Pill className="w-6 h-6 text-pink-600" />,
      title: "Pharmacy",
      description: "Medicine inventory, transactions, and drug interactions",
      status: "in_progress" as const,
      itemCount: 10,
    },
    {
      icon: <DollarSign className="w-6 h-6 text-green-600" />,
      title: "Finance",
      description: "Invoices, payments, budgets, and tax compliance",
      status: "in_progress" as const,
      itemCount: 15,
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-cyan-600" />,
      title: "Insurance",
      description: "Insurance companies, policies, claims, and approvals",
      status: "in_progress" as const,
      itemCount: 8,
    },
    {
      icon: <Users className="w-6 h-6 text-slate-600" />,
      title: "HR Management",
      description: "Employees, contracts, attendance, payroll, and training",
      status: "in_progress" as const,
      itemCount: 20,
    },
    {
      icon: <UtensilsCrossed className="w-6 h-6 text-amber-600" />,
      title: "Kitchen & Nutrition",
      description: "Menus, meals, diet plans, and food supply management",
      status: "in_progress" as const,
      itemCount: 10,
    },
    {
      icon: <Wrench className="w-6 h-6 text-red-700" />,
      title: "Maintenance",
      description: "Equipment maintenance, work orders, and service contracts",
      status: "in_progress" as const,
      itemCount: 8,
    },
    {
      icon: <Package className="w-6 h-6 text-blue-700" />,
      title: "Supply Chain",
      description: "Suppliers, purchase orders, inventory, and warehousing",
      status: "in_progress" as const,
      itemCount: 10,
    },
  ];

  const completedCount = modules.filter((m) => m.status === "completed").length;
  const inProgressCount = modules.filter(
    (m) => m.status === "in_progress",
  ).length;
  const totalModels = modules.reduce((sum, m) => sum + m.itemCount, 0);

  return (
    <Layout>
      <div className="w-full max-w-7xl mx-auto">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white rounded-2xl p-8 md:p-12 mb-8">
          <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Modern Hospital Management System
              </h1>
              <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed">
                HealthHub is a comprehensive, production-ready platform designed
                to streamline all aspects of hospital operations. From patient
                management to financial operations, everything you need to run a
                modern healthcare facility.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/patients"
                  className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                >
                  Get Started <ArrowRight className="w-4 h-4" />
                </Link>
                <button className="inline-flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                  Learn More
                </button>
              </div>
            </div>
        </section>

        {/* Stats Section */}
        <section className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
              label="Active Modules"
              value={`${modules.length}`}
              icon={<Building2 className="w-6 h-6" />}
            />
            <StatCard
              label="Completed"
              value={`${completedCount}`}
              icon={<CheckCircle2 className="w-6 h-6" />}
            />
            <StatCard
              label="Data Models"
              value={`${totalModels}+`}
              icon={<Package className="w-6 h-6" />}
            />
          </div>
        </section>

        {/* Modules Grid */}
        <section className="mb-12">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              All Modules
            </h2>
            <p className="text-lg text-slate-600">
              Comprehensive suite of integrated modules covering every aspect of
              hospital operations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module, index) => (
              <ModuleCard
                key={index}
                icon={module.icon}
                title={module.title}
                description={module.description}
                status={module.status}
                itemCount={module.itemCount}
              />
            ))}
          </div>
        </section>

        {/* Key Features Section */}
        <section className="bg-slate-900 text-white rounded-2xl p-8 md:p-12 mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              Why Choose HealthHub?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "Integrated Platform",
                  description:
                    "All modules work seamlessly together for unified operations",
                },
                {
                  title: "Real-time Updates",
                  description:
                    "Live data synchronization across all departments",
                },
                {
                  title: "Secure & Compliant",
                  description: "HIPAA-ready with encryption and audit trails",
                },
                {
                  title: "Scalable",
                  description:
                    "Grows with your hospital from small clinics to large networks",
                },
                {
                  title: "Easy Integration",
                  description:
                    "Connect with existing systems and third-party tools",
                },
                {
                  title: "Comprehensive Reporting",
                  description: "Advanced analytics and customizable reports",
                },
                {
                  title: "Mobile Ready",
                  description: "Access from any device, anywhere, anytime",
                },
                {
                  title: "Expert Support",
                  description: "Dedicated support team available 24/7",
                },
              ].map((feature, index) => (
                <div key={index} className="flex flex-col">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-blue-400" />
                    {feature.title}
                  </h3>
                  <p className="text-slate-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Progress Overview Section */}
        <section className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12">
            Development Progress
          </h2>

          <div className="bg-white rounded-xl border border-slate-200 p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div>
                <p className="text-sm text-slate-600 mb-2">Completed</p>
                <div className="flex items-end gap-3">
                  <p className="text-3xl font-bold text-green-600">
                    {completedCount}
                  </p>
                  <p className="text-sm text-slate-500 mb-1">
                    out of {modules.length}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-sm text-slate-600 mb-2">In Progress</p>
                <div className="flex items-end gap-3">
                  <p className="text-3xl font-bold text-blue-600">
                    {inProgressCount}
                  </p>
                  <p className="text-sm text-slate-500 mb-1">modules</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-slate-600 mb-2">Total Data Models</p>
                <div className="flex items-end gap-3">
                  <p className="text-3xl font-bold text-indigo-600">
                    {totalModels}
                  </p>
                  <p className="text-sm text-slate-500 mb-1">entities</p>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-2">
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-medium text-slate-900">
                  Overall Progress
                </p>
                <p className="text-sm font-semibold text-slate-600">
                  {Math.round((completedCount / modules.length) * 100)}%
                </p>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-green-500 to-emerald-600 h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${(completedCount / modules.length) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>

          {/* Module Details */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h4 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                Completed Modules
              </h4>
              <ul className="space-y-2 text-sm text-green-800">
                {modules
                  .filter((m) => m.status === "completed")
                  .map((m, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-green-600 rounded-full"></span>
                      {m.title}
                    </li>
                  ))}
              </ul>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                In Progress
              </h4>
              <p className="text-sm text-blue-800 mb-4">
                {inProgressCount} modules currently being developed with full
                feature sets and testing.
              </p>
              <div className="text-xs text-blue-700 space-y-1">
                <p>• Enhanced with real-time data sync</p>
                <p>• Complete with audit trails</p>
                <p>• Full API integration</p>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
              <h4 className="font-semibold text-amber-900 mb-3 flex items-center gap-2">
                <Package className="w-5 h-5" />
                Coming Soon
              </h4>
              <p className="text-sm text-amber-800">
                Additional modules and advanced features planned for upcoming
                releases to further enhance capabilities.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-blue-50 border border-slate-200 rounded-2xl p-8 md:p-12 text-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Ready to Transform Your Hospital?
            </h2>
            <p className="text-lg text-slate-600 mb-8">
              Join leading healthcare facilities using HealthHub to optimize
              their operations.
            </p>
            <Link
              to="/patients"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Explore Modules <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
}
