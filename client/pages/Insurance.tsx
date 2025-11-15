import Layout from "@/components/Layout";
import {
  Search,
  Shield,
  FileCheck,
  AlertCircle,
  CheckCircle2,
  Clock,
  Plus,
  Filter,
  DollarSign,
  ArrowRight,
  TrendingUp,
  Users,
  FileText,
  Building2,
  BarChart3,
  Calendar,
  Activity,
  Star,
  Zap,
  Target,
} from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const PolicyCard = ({
  policyNumber,
  patientName,
  company,
  coverage,
  startDate,
  endDate,
  status,
  deductible,
  maxBenefit,
}: {
  policyNumber: string;
  patientName: string;
  company: string;
  coverage: string;
  startDate: string;
  endDate: string;
  status: "active" | "expired" | "suspended";
  deductible: number;
  maxBenefit: number;
}) => {
  const { t } = useTranslation();
  const statusConfig = {
    active: { bg: "bg-green-50", badge: t('insurance.active'), color: "text-green-700" },
    expired: { bg: "bg-slate-50", badge: t('insurance.expired'), color: "text-slate-700" },
    suspended: { bg: "bg-red-50", badge: t('insurance.suspended'), color: "text-red-700" },
  };

  const config = statusConfig[status];

  return (
    <div className={`${config.bg} rounded-lg border border-slate-200 p-6 hover:shadow-md transition-shadow`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{patientName}</h3>
          <p className="text-sm text-slate-500">Policy #{policyNumber}</p>
        </div>
        <span className={`text-xs font-semibold px-3 py-1 rounded-full bg-white border ${config.color} border-current`}>
          {config.badge}
        </span>
      </div>

      <div className="space-y-2 text-sm text-slate-600 mb-4">
        <div className="flex items-center justify-between">
          <span>{t('insurance.insuranceCompany')}:</span>
          <span className="font-medium text-slate-900">{company}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>{t('insurance.coverageType')}:</span>
          <span className="font-medium text-slate-900">{coverage}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>{t('insurance.deductible')}:</span>
          <span className="font-medium text-slate-900">SAR {deductible}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>{t('insurance.maxBenefit')}:</span>
          <span className="font-medium text-slate-900">SAR {maxBenefit.toLocaleString()}</span>
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-slate-300">
          <span>{t('insurance.validPeriod')}:</span>
          <span className="font-medium text-slate-900 text-xs">
            {startDate} to {endDate}
          </span>
        </div>
      </div>

      <button className="w-full bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-2">
        {t('insurance.viewPolicy')} <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};

const ClaimCard = ({
  claimNumber,
  patientName,
  serviceDate,
  claimAmount,
  approvedAmount,
  status,
  submittedDate,
  description,
}: {
  claimNumber: string;
  patientName: string;
  serviceDate: string;
  claimAmount: number;
  approvedAmount: number;
  status: "pending" | "approved" | "rejected" | "paid";
  submittedDate: string;
  description: string;
}) => {
  const { t } = useTranslation();
  const statusConfig = {
    pending: { bg: "bg-yellow-50", badge: t('insurance.pending'), color: "text-yellow-700", icon: <Clock className="w-5 h-5" /> },
    approved: { bg: "bg-blue-50", badge: t('insurance.approved'), color: "text-blue-700", icon: <FileCheck className="w-5 h-5" /> },
    rejected: { bg: "bg-red-50", badge: t('insurance.rejected'), color: "text-red-700", icon: <AlertCircle className="w-5 h-5" /> },
    paid: { bg: "bg-green-50", badge: t('insurance.paid'), color: "text-green-700", icon: <CheckCircle2 className="w-5 h-5" /> },
  };

  const config = statusConfig[status];
  const approvalPercentage =
    claimAmount > 0 ? Math.round((approvedAmount / claimAmount) * 100) : 0;

  return (
    <div className={`${config.bg} rounded-lg border border-slate-200 p-6 hover:shadow-md transition-shadow`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-slate-900">{patientName}</h3>
          <p className="text-sm text-slate-500">Claim #{claimNumber}</p>
        </div>
        <span className={`flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full bg-white border ${config.color} border-current`}>
          {config.icon}
          {config.badge}
        </span>
      </div>

      <div className="space-y-3 text-sm text-slate-600 mb-4">
        <p className="text-slate-900 font-medium">{description}</p>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">{t('insurance.claimed')}</p>
            <p className="font-bold text-slate-900">SAR {claimAmount.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">{t('insurance.approved')}</p>
            <p className="font-bold text-slate-900">
              SAR {approvedAmount.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="bg-white bg-opacity-50 rounded p-2">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium">{t('insurance.approvalRate')}</span>
            <span className="text-xs font-bold">{approvalPercentage}%</span>
          </div>
          <div className="w-full bg-slate-300 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${approvalPercentage}%` }}
            ></div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-300">
          <div>
            <p className="text-xs text-slate-500">{t('insurance.serviceDate')}</p>
            <p className="font-medium text-slate-900">{serviceDate}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500">{t('insurance.submitted')}</p>
            <p className="font-medium text-slate-900">{submittedDate}</p>
          </div>
        </div>
      </div>

      <button className="w-full bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-2">
        {t('insurance.viewClaim')} <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};

const InsuranceCompanyCard = ({
  name,
  activePolices,
  totalClaims,
  claimsApprovalRate,
  contact,
}: {
  name: string;
  activePolices: number;
  totalClaims: number;
  claimsApprovalRate: number;
  contact: string;
}) => {
  const { t } = useTranslation();
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">{name}</h3>

      <div className="space-y-3 text-sm text-slate-600 mb-4">
        <div className="flex items-center justify-between">
          <span>{t('insurance.activePolicies')}:</span>
          <span className="font-bold text-slate-900">{activePolices}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>{t('insurance.totalClaims')}:</span>
          <span className="font-bold text-slate-900">{totalClaims}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>{t('insurance.approvalRate')}:</span>
          <span className="font-bold text-green-600">{claimsApprovalRate}%</span>
        </div>
        <div className="pt-2 border-t border-slate-200">
          <p className="text-xs text-slate-500 mb-1">{t('patients.contact')}</p>
          <p className="font-medium text-slate-900">{contact}</p>
        </div>
      </div>
    </div>
  );
};

export default function Insurance() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const [isAddPolicyDialogOpen, setIsAddPolicyDialogOpen] = useState(false);
  const [policyForm, setPolicyForm] = useState({
    patientName: "",
    policyNumber: "",
    company: "",
    coverage: "",
    startDate: "",
    endDate: "",
    deductible: "",
    maxBenefit: "",
    contactNumber: "",
    email: "",
  });

  const policies = [
    {
      policyNumber: "POL-2024-001",
      patientName: "Ahmed Mohammed",
      company: "Unified Insurance",
      coverage: "Comprehensive",
      startDate: "Jan 2024",
      endDate: "Dec 2024",
      status: "active" as const,
      deductible: 500,
      maxBenefit: 100000,
    },
    {
      policyNumber: "POL-2024-002",
      patientName: "Fatima Al-Rashid",
      company: "National Insurance",
      coverage: "Standard",
      startDate: "Jan 2024",
      endDate: "Dec 2024",
      status: "active" as const,
      deductible: 1000,
      maxBenefit: 75000,
    },
    {
      policyNumber: "POL-2024-003",
      patientName: "Muhammad Hassan",
      company: "Unified Insurance",
      coverage: "Basic",
      startDate: "Jan 2023",
      endDate: "Dec 2023",
      status: "expired" as const,
      deductible: 2000,
      maxBenefit: 50000,
    },
    {
      policyNumber: "POL-2024-004",
      patientName: "Noor Abdullah",
      company: "Gulf Insurance",
      coverage: "Premium",
      startDate: "Feb 2024",
      endDate: "Jan 2025",
      status: "active" as const,
      deductible: 250,
      maxBenefit: 150000,
    },
  ];

  const claims = [
    {
      claimNumber: "CLM-2024-001",
      patientName: "Ahmed Mohammed",
      serviceDate: "Jan 15, 2024",
      claimAmount: 5000,
      approvedAmount: 4500,
      status: "paid" as const,
      submittedDate: "Jan 16, 2024",
      description: "Cardiac Checkup and Tests",
    },
    {
      claimNumber: "CLM-2024-002",
      patientName: "Fatima Al-Rashid",
      serviceDate: "Jan 10, 2024",
      claimAmount: 3500,
      approvedAmount: 3500,
      status: "approved" as const,
      submittedDate: "Jan 11, 2024",
      description: "Surgical Procedure",
    },
    {
      claimNumber: "CLM-2024-003",
      patientName: "Muhammad Hassan",
      serviceDate: "Jan 18, 2024",
      claimAmount: 2000,
      approvedAmount: 1500,
      status: "pending" as const,
      submittedDate: "Jan 19, 2024",
      description: "Orthopedic Consultation",
    },
    {
      claimNumber: "CLM-2024-004",
      patientName: "Noor Abdullah",
      serviceDate: "Jan 12, 2024",
      claimAmount: 4200,
      approvedAmount: 0,
      status: "rejected" as const,
      submittedDate: "Jan 13, 2024",
      description: "Cosmetic Procedure (Not Covered)",
    },
  ];

  const companies = [
    {
      name: "Unified Insurance",
      activePolices: 12,
      totalClaims: 45,
      claimsApprovalRate: 92,
      contact: "+966 11 123 4567",
    },
    {
      name: "National Insurance",
      activePolices: 8,
      totalClaims: 28,
      claimsApprovalRate: 88,
      contact: "+966 11 234 5678",
    },
    {
      name: "Gulf Insurance",
      activePolices: 5,
      totalClaims: 18,
      claimsApprovalRate: 95,
      contact: "+966 11 345 6789",
    },
  ];

  const filteredPolicies = policies.filter(
    (policy) =>
      policy.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      policy.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      policy.policyNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activePolicies = policies.filter((p) => p.status === "active").length;
  const totalClaimsAmount = claims.reduce((sum, c) => sum + c.claimAmount, 0);
  const approvedClaimsAmount = claims.reduce((sum, c) => sum + c.approvedAmount, 0);
  const pendingClaims = claims.filter((c) => c.status === "pending").length;
  const approvalRate = totalClaimsAmount > 0 ? Math.round((approvedClaimsAmount / totalClaimsAmount) * 100) : 0;

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-2xl p-8 border border-slate-200 shadow-xl backdrop-blur-md">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 bg-clip-text text-transparent mb-2">
                {t('insurance.comprehensiveManagement')}
              </h1>
              <p className="text-slate-600 text-lg">{t('insurance.insuranceDescription')}</p>
            </div>
            <div className="flex gap-3">
              <Button onClick={() => setIsAddPolicyDialogOpen(true)} className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg">
                <Plus className="w-4 h-4" />
                {t('insurance.newPolicy')}
              </Button>
              <Button variant="outline" className="gap-2 border-2 shadow-md">
                <FileText className="w-4 h-4" />
                {t('insurance.generateReport')}
              </Button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-700 mb-1">{t('insurance.activePolicies')}</p>
                  <p className="text-3xl font-bold text-blue-900">{activePolicies}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-green-600 font-medium">+12%</span>
                  </div>
                </div>
                <div className="w-14 h-14 bg-white/50 rounded-xl flex items-center justify-center">
                  <Shield className="w-8 h-8 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-700 mb-1">{t('insurance.claimsApproved')}</p>
                  <p className="text-3xl font-bold text-green-900">SAR {(approvedClaimsAmount / 1000).toFixed(1)}K</p>
                  <p className="text-sm text-green-600 mt-2">{approvalRate}% {t('insurance.approvalRate')}</p>
                </div>
                <div className="w-14 h-14 bg-white/50 rounded-xl flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-yellow-700 mb-1">{t('insurance.pendingReview')}</p>
                  <p className="text-3xl font-bold text-yellow-900">{pendingClaims}</p>
                  <p className="text-sm text-yellow-600 mt-2">{t('insurance.requiresAction')}</p>
                </div>
                <div className="w-14 h-14 bg-white/50 rounded-xl flex items-center justify-center">
                  <Clock className="w-8 h-8 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-700 mb-1">{t('insurance.totalClaimsValue')}</p>
                  <p className="text-3xl font-bold text-purple-900">SAR {(totalClaimsAmount / 1000).toFixed(1)}K</p>
                  <div className="flex items-center gap-1 mt-2">
                    <ArrowRight className="w-4 h-4 text-purple-600" />
                    <span className="text-sm text-purple-600 font-medium">{t('common.thisMonth')}</span>
                  </div>
                </div>
                <div className="w-14 h-14 bg-white/50 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-8 h-8 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white/80 backdrop-blur-md border border-slate-200 shadow-lg p-1 grid grid-cols-4 lg:grid-cols-8">
            <TabsTrigger value="overview" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white">
              <Activity className="w-4 h-4 mr-2" />
              {t('insurance.overview')}
            </TabsTrigger>
            <TabsTrigger value="policies" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-emerald-600 data-[state=active]:text-white">
              <Shield className="w-4 h-4 mr-2" />
              {t('insurance.policies')}
            </TabsTrigger>
            <TabsTrigger value="claims" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-600 data-[state=active]:to-orange-600 data-[state=active]:text-white">
              <FileCheck className="w-4 h-4 mr-2" />
              {t('insurance.claims')}
            </TabsTrigger>
            <TabsTrigger value="companies" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white">
              <Building2 className="w-4 h-4 mr-2" />
              {t('insurance.companies')}
            </TabsTrigger>
            <TabsTrigger value="preAuth" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-600 data-[state=active]:to-blue-600 data-[state=active]:text-white">
              <FileText className="w-4 h-4 mr-2" />
              {t('insurance.preAuthorization')}
            </TabsTrigger>
            <TabsTrigger value="eligibility" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-600 data-[state=active]:to-green-600 data-[state=active]:text-white">
              <CheckCircle2 className="w-4 h-4 mr-2" />
              {t('insurance.eligibility')}
            </TabsTrigger>
            <TabsTrigger value="financial" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-600 data-[state=active]:to-teal-600 data-[state=active]:text-white">
              <DollarSign className="w-4 h-4 mr-2" />
              {t('insurance.financial')}
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-rose-600 data-[state=active]:to-pink-600 data-[state=active]:text-white">
              <BarChart3 className="w-4 h-4 mr-2" />
              {t('insurance.analytics')}
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Activity */}
              <Card className="lg:col-span-2 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-blue-600" />
                    {t('insurance.recentActivity')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {[
                      { action: t('insurance.newClaimSubmitted'), patient: 'Ahmed Mohammed', time: '5 min ago', status: 'pending' },
                      { action: t('insurance.claimApproved'), patient: 'Fatima Al-Rashid', time: '1 hour ago', status: 'approved' },
                      { action: t('insurance.policyRenewed'), patient: 'Muhammad Hassan', time: '2 hours ago', status: 'active' },
                      { action: t('insurance.preAuthRequested'), patient: 'Noor Abdullah', time: '3 hours ago', status: 'pending' },
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className={`w-3 h-3 rounded-full ${item.status === 'approved' ? 'bg-green-500' : item.status === 'pending' ? 'bg-yellow-500' : 'bg-blue-500'}`} />
                          <div>
                            <p className="font-semibold text-slate-900">{item.action}</p>
                            <p className="text-sm text-slate-600">{item.patient}</p>
                          </div>
                        </div>
                        <span className="text-xs text-slate-500">{item.time}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
                  <CardTitle className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-purple-600" />
                    {t('insurance.quickStats')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-600 mb-1">{t('insurance.avgProcessingTime')}</p>
                      <p className="text-2xl font-bold text-blue-700">2.5 {t('common.days')}</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="text-sm text-green-600 mb-1">{t('insurance.successRate')}</p>
                      <p className="text-2xl font-bold text-green-700">{approvalRate}%</p>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <p className="text-sm text-purple-600 mb-1">{t('insurance.activeCompanies')}</p>
                      <p className="text-2xl font-bold text-purple-700">{companies.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Performance Metrics */}
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50">
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-emerald-600" />
                  {t('insurance.performanceMetrics')}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {[
                    { label: t('insurance.claimsProcessed'), value: '124', change: '+8%', color: 'blue' },
                    { label: t('insurance.avgClaimValue'), value: 'SAR 3.6K', change: '+5%', color: 'green' },
                    { label: t('insurance.denialRate'), value: '8%', change: '-2%', color: 'red' },
                    { label: t('insurance.reimbursementSpeed'), value: '3.2 days', change: '-0.5', color: 'purple' },
                  ].map((metric, idx) => (
                    <div key={idx} className={`p-4 bg-${metric.color}-50 rounded-lg border border-${metric.color}-200`}>
                      <p className="text-xs text-slate-600 mb-1">{metric.label}</p>
                      <p className={`text-2xl font-bold text-${metric.color}-700`}>{metric.value}</p>
                      <p className="text-xs text-green-600 font-medium mt-1">{metric.change}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Policies Tab */}
          <TabsContent value="policies" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{t('insurance.allPolicies')}</CardTitle>
                  <div className="relative">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder={t('common.search')}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredPolicies.map((policy, index) => (
                    <PolicyCard key={index} {...policy} />
                  ))}
                </div>
                {filteredPolicies.length === 0 && (
                  <div className="text-center py-12 bg-slate-50 rounded-lg border border-slate-200">
                    <p className="text-slate-600">{t('insurance.noPoliciesFound')}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Claims Tab */}
          <TabsContent value="claims" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{t('insurance.allClaims')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {claims.map((claim, index) => (
                    <ClaimCard key={index} {...claim} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Companies Tab - Keeping existing */}
          <TabsContent value="companies" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{t('insurance.partnerCompanies')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {companies.map((company, index) => (
                    <InsuranceCompanyCard key={index} {...company} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pre-Authorization Tab - NEW */}
          <TabsContent value="preAuth" className="space-y-4">
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-cyan-50 to-blue-50">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-cyan-600" />
                  {t('insurance.preAuthorizationRequests')}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {[
                    { id: 'PA-001', patient: 'Ahmed Mohammed', procedure: 'Cardiac Surgery', requestDate: '2024-01-15', status: 'approved', urgency: 'urgent' },
                    { id: 'PA-002', patient: 'Fatima Al-Rashid', procedure: 'MRI Scan', requestDate: '2024-01-16', status: 'pending', urgency: 'normal' },
                    { id: 'PA-003', patient: 'Muhammad Hassan', procedure: 'Orthopedic Surgery', requestDate: '2024-01-17', status: 'approved', urgency: 'urgent' },
                  ].map((req, idx) => (
                    <div key={idx} className="p-4 border border-slate-200 rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-slate-900">{req.patient}</h4>
                          <p className="text-sm text-slate-600">Request #{req.id}</p>
                        </div>
                        <div className="flex gap-2">
                          <Badge className={req.urgency === 'urgent' ? 'bg-red-100 text-red-700 border-0' : 'bg-blue-100 text-blue-700 border-0'}>
                            {req.urgency === 'urgent' ? t('insurance.urgent') : t('insurance.normal')}
                          </Badge>
                          <Badge className={req.status === 'approved' ? 'bg-green-100 text-green-700 border-0' : 'bg-yellow-100 text-yellow-700 border-0'}>
                            {req.status === 'approved' ? t('insurance.approved') : t('insurance.pending')}
                          </Badge>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-slate-600">{t('insurance.procedure')}</p>
                          <p className="font-medium text-slate-900">{req.procedure}</p>
                        </div>
                        <div>
                          <p className="text-slate-600">{t('insurance.requestDate')}</p>
                          <p className="font-medium text-slate-900">{req.requestDate}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Eligibility Tab - NEW */}
          <TabsContent value="eligibility" className="space-y-4">
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-teal-50 to-green-50">
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-teal-600" />
                  {t('insurance.eligibilityVerification')}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {policies.map((policy, idx) => (
                    <div key={idx} className="p-4 bg-gradient-to-r from-slate-50 to-slate-100 rounded-lg border border-slate-200">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-slate-900">{policy.patientName}</h4>
                          <p className="text-sm text-slate-600">{policy.company}</p>
                        </div>
                        <Badge className="bg-green-100 text-green-700 border-0">
                          {t('insurance.verified')}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-slate-600">{t('insurance.coverageLimit')}</p>
                          <p className="font-bold text-green-600">SAR {policy.maxBenefit.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-slate-600">{t('insurance.remaining')}</p>
                          <p className="font-bold text-blue-600">SAR {(policy.maxBenefit * 0.75).toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-slate-600">{t('insurance.utilized')}</p>
                          <p className="font-bold text-purple-600">25%</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Financial Tab - NEW */}
          <TabsContent value="financial" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                  <p className="text-sm text-green-700 mb-1">{t('insurance.totalRevenue')}</p>
                  <p className="text-3xl font-bold text-green-700">SAR 456K</p>
                  <p className="text-xs text-green-600 mt-1">+15% {t('common.vsLastWeek')}</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <DollarSign className="w-6 h-6 text-blue-600" />
                  </div>
                  <p className="text-sm text-blue-700 mb-1">{t('insurance.outstandingClaims')}</p>
                  <p className="text-3xl font-bold text-blue-700">SAR 45K</p>
                  <p className="text-xs text-blue-600 mt-1">12 {t('insurance.pendingClaims')}</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Target className="w-6 h-6 text-purple-600" />
                  </div>
                  <p className="text-sm text-purple-700 mb-1">{t('insurance.avgReimbursement')}</p>
                  <p className="text-3xl font-bold text-purple-700">SAR 3.8K</p>
                  <p className="text-xs text-purple-600 mt-1">{t('insurance.perClaim')}</p>
                </CardContent>
              </Card>
            </div>

            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50">
                <CardTitle>{t('insurance.monthlyRevenue')}</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  {companies.map((company, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-semibold text-slate-900">{company.name}</h4>
                        <p className="text-sm text-slate-600">{company.totalClaims} {t('insurance.claims')}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-green-600">SAR {(company.totalClaims * 3200).toLocaleString()}</p>
                        <p className="text-xs text-slate-600">{company.claimsApprovalRate}% {t('insurance.approved')}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab - NEW */}
          <TabsContent value="analytics" className="space-y-4">
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-rose-50 to-pink-50">
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-rose-600" />
                  {t('insurance.performanceAnalytics')}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Claims by Status */}
                  <div className="p-6 bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl border border-slate-200">
                    <h4 className="font-bold text-slate-900 mb-4">{t('insurance.claimsByStatus')}</h4>
                    <div className="space-y-3">
                      {[
                        { status: t('insurance.approved'), count: 85, percentage: 68, color: 'green' },
                        { status: t('insurance.pending'), count: 25, percentage: 20, color: 'yellow' },
                        { status: t('insurance.rejected'), count: 10, percentage: 8, color: 'red' },
                        { status: t('insurance.paid'), count: 5, percentage: 4, color: 'blue' },
                      ].map((item, idx) => (
                        <div key={idx}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-slate-700">{item.status}</span>
                            <span className="text-sm font-bold text-slate-900">{item.count} ({item.percentage}%)</span>
                          </div>
                          <div className="w-full bg-slate-300 rounded-full h-2">
                            <div className={`bg-${item.color}-600 h-2 rounded-full`} style={{ width: `${item.percentage}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Top Procedures */}
                  <div className="p-6 bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl border border-slate-200">
                    <h4 className="font-bold text-slate-900 mb-4">{t('insurance.topProcedures')}</h4>
                    <div className="space-y-3">
                      {[
                        { name: 'Cardiac Surgery', claims: 45, avgCost: 'SAR 12K' },
                        { name: 'Orthopedic', claims: 38, avgCost: 'SAR 8K' },
                        { name: 'MRI/CT Scans', claims: 62, avgCost: 'SAR 2.5K' },
                        { name: 'Lab Tests', claims: 124, avgCost: 'SAR 500' },
                      ].map((proc, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-white rounded-lg">
                          <div>
                            <p className="font-semibold text-slate-900">{proc.name}</p>
                            <p className="text-xs text-slate-600">{proc.claims} {t('insurance.claims')}</p>
                          </div>
                          <p className="font-bold text-blue-600">{proc.avgCost}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Company Performance Comparison */}
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50">
                <CardTitle>{t('insurance.companyPerformance')}</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {companies.map((company, idx) => (
                    <div key={idx} className="p-4 bg-gradient-to-r from-slate-50 to-slate-100 rounded-lg border border-slate-200">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-bold text-slate-900">{company.name}</h4>
                        <div className="flex items-center gap-1 text-yellow-500">
                          <Star className="w-4 h-4 fill-current" />
                          <span className="text-sm font-bold">{(company.claimsApprovalRate / 20).toFixed(1)}</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-slate-600">{t('insurance.approvalRate')}</p>
                          <p className="text-xl font-bold text-green-600">{company.claimsApprovalRate}%</p>
                        </div>
                        <div>
                          <p className="text-slate-600">{t('insurance.avgProcessTime')}</p>
                          <p className="text-xl font-bold text-blue-600">{(2 + Math.random()).toFixed(1)} days</p>
                        </div>
                        <div>
                          <p className="text-slate-600">{t('insurance.totalClaims')}</p>
                          <p className="text-xl font-bold text-purple-600">{company.totalClaims}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Add Policy Dialog */}
      <Dialog open={isAddPolicyDialogOpen} onOpenChange={setIsAddPolicyDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-600" />
              {t('insurance.newPolicy')}
            </DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="patientName">{t('patients.patientName')}</Label>
              <Input
                id="patientName"
                value={policyForm.patientName}
                onChange={(e) => setPolicyForm({ ...policyForm, patientName: e.target.value })}
                placeholder="Enter patient name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="policyNumber">{t('insurance.policyNumber')}</Label>
              <Input
                id="policyNumber"
                value={policyForm.policyNumber}
                onChange={(e) => setPolicyForm({ ...policyForm, policyNumber: e.target.value })}
                placeholder="POL-2024-XXX"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">{t('insurance.insuranceCompany')}</Label>
              <Select
                value={policyForm.company}
                onValueChange={(value) => setPolicyForm({ ...policyForm, company: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Unified Insurance">Unified Insurance</SelectItem>
                  <SelectItem value="National Insurance">National Insurance</SelectItem>
                  <SelectItem value="Gulf Insurance">Gulf Insurance</SelectItem>
                  <SelectItem value="Tawuniya">Tawuniya</SelectItem>
                  <SelectItem value="Bupa Arabia">Bupa Arabia</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="coverage">{t('insurance.coverageType')}</Label>
              <Select
                value={policyForm.coverage}
                onValueChange={(value) => setPolicyForm({ ...policyForm, coverage: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select coverage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Comprehensive">Comprehensive</SelectItem>
                  <SelectItem value="Standard">Standard</SelectItem>
                  <SelectItem value="Basic">Basic</SelectItem>
                  <SelectItem value="Premium">Premium</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="startDate">{t('insurance.startDate')}</Label>
              <Input
                id="startDate"
                type="date"
                value={policyForm.startDate}
                onChange={(e) => setPolicyForm({ ...policyForm, startDate: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">{t('insurance.endDate')}</Label>
              <Input
                id="endDate"
                type="date"
                value={policyForm.endDate}
                onChange={(e) => setPolicyForm({ ...policyForm, endDate: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="deductible">{t('insurance.deductible')} (SAR)</Label>
              <Input
                id="deductible"
                type="number"
                value={policyForm.deductible}
                onChange={(e) => setPolicyForm({ ...policyForm, deductible: e.target.value })}
                placeholder="500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxBenefit">{t('insurance.maxBenefit')} (SAR)</Label>
              <Input
                id="maxBenefit"
                type="number"
                value={policyForm.maxBenefit}
                onChange={(e) => setPolicyForm({ ...policyForm, maxBenefit: e.target.value })}
                placeholder="100000"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactNumber">{t('patients.contact')}</Label>
              <Input
                id="contactNumber"
                type="tel"
                value={policyForm.contactNumber}
                onChange={(e) => setPolicyForm({ ...policyForm, contactNumber: e.target.value })}
                placeholder="+966 50 XXX XXXX"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">{t('crm.email')}</Label>
              <Input
                id="email"
                type="email"
                value={policyForm.email}
                onChange={(e) => setPolicyForm({ ...policyForm, email: e.target.value })}
                placeholder="patient@email.com"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddPolicyDialogOpen(false)}>
              {t('common.cancel')}
            </Button>
            <Button
              onClick={() => {
                console.log('New Policy:', policyForm);
                setPolicyForm({
                  patientName: "",
                  policyNumber: "",
                  company: "",
                  coverage: "",
                  startDate: "",
                  endDate: "",
                  deductible: "",
                  maxBenefit: "",
                  contactNumber: "",
                  email: "",
                });
                setIsAddPolicyDialogOpen(false);
              }}
            >
              {t('common.save')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}