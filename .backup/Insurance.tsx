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
} from "lucide-react";
import { useState } from "react";

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
  const statusConfig = {
    active: { bg: "bg-green-50", badge: "Active", color: "text-green-700" },
    expired: { bg: "bg-slate-50", badge: "Expired", color: "text-slate-700" },
    suspended: { bg: "bg-red-50", badge: "Suspended", color: "text-red-700" },
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
          <span>Insurance Company:</span>
          <span className="font-medium text-slate-900">{company}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Coverage Type:</span>
          <span className="font-medium text-slate-900">{coverage}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Deductible:</span>
          <span className="font-medium text-slate-900">SAR {deductible}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Max Benefit:</span>
          <span className="font-medium text-slate-900">SAR {maxBenefit.toLocaleString()}</span>
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-slate-300">
          <span>Valid Period:</span>
          <span className="font-medium text-slate-900 text-xs">
            {startDate} to {endDate}
          </span>
        </div>
      </div>

      <button className="w-full bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-2">
        View Policy <ArrowRight className="w-4 h-4" />
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
  const statusConfig = {
    pending: { bg: "bg-yellow-50", badge: "Pending", color: "text-yellow-700", icon: <Clock className="w-5 h-5" /> },
    approved: { bg: "bg-blue-50", badge: "Approved", color: "text-blue-700", icon: <FileCheck className="w-5 h-5" /> },
    rejected: { bg: "bg-red-50", badge: "Rejected", color: "text-red-700", icon: <AlertCircle className="w-5 h-5" /> },
    paid: { bg: "bg-green-50", badge: "Paid", color: "text-green-700", icon: <CheckCircle2 className="w-5 h-5" /> },
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
            <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Claimed</p>
            <p className="font-bold text-slate-900">SAR {claimAmount.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Approved</p>
            <p className="font-bold text-slate-900">
              SAR {approvedAmount.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="bg-white bg-opacity-50 rounded p-2">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium">Approval Rate</span>
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
            <p className="text-xs text-slate-500">Service Date</p>
            <p className="font-medium text-slate-900">{serviceDate}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500">Submitted</p>
            <p className="font-medium text-slate-900">{submittedDate}</p>
          </div>
        </div>
      </div>

      <button className="w-full bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-2">
        View Claim <ArrowRight className="w-4 h-4" />
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
}) => (
  <div className="bg-white rounded-lg border border-slate-200 p-6">
    <h3 className="text-lg font-semibold text-slate-900 mb-4">{name}</h3>

    <div className="space-y-3 text-sm text-slate-600 mb-4">
      <div className="flex items-center justify-between">
        <span>Active Policies:</span>
        <span className="font-bold text-slate-900">{activePolices}</span>
      </div>
      <div className="flex items-center justify-between">
        <span>Total Claims:</span>
        <span className="font-bold text-slate-900">{totalClaims}</span>
      </div>
      <div className="flex items-center justify-between">
        <span>Approval Rate:</span>
        <span className="font-bold text-green-600">{claimsApprovalRate}%</span>
      </div>
      <div className="pt-2 border-t border-slate-200">
        <p className="text-xs text-slate-500 mb-1">Contact</p>
        <p className="font-medium text-slate-900">{contact}</p>
      </div>
    </div>
  </div>
);

export default function Insurance() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("policies");

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

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Insurance Management</h1>
          <p className="text-lg text-slate-600">
            Insurance policies, claims, and approvals
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <p className="text-sm text-slate-600 mb-1">Active Policies</p>
            <p className="text-3xl font-bold text-blue-600">{activePolicies}</p>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <p className="text-sm text-slate-600 mb-1">Claims Submitted</p>
            <p className="text-3xl font-bold text-slate-900">SAR {(totalClaimsAmount / 1000).toFixed(1)}K</p>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <p className="text-sm text-slate-600 mb-1">Claims Approved</p>
            <p className="text-3xl font-bold text-green-600">SAR {(approvedClaimsAmount / 1000).toFixed(1)}K</p>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <p className="text-sm text-slate-600 mb-1">Pending Review</p>
            <p className="text-3xl font-bold text-yellow-600">{pendingClaims}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-slate-200">
          {[
            { id: "policies", label: "Insurance Policies" },
            { id: "claims", label: "Claims" },
            { id: "companies", label: "Insurance Companies" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-4 font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-slate-600 hover:text-slate-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === "policies" && (
            <>
              {/* Search and Filter */}
              <div className="bg-white rounded-lg border border-slate-200 p-6 mb-8">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search by patient name, company, or policy number..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                    <Plus className="w-5 h-5" />
                    Add Policy
                  </button>
                </div>
              </div>

              {/* Policies Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredPolicies.map((policy, index) => (
                  <PolicyCard key={index} {...policy} />
                ))}
              </div>

              {filteredPolicies.length === 0 && (
                <div className="text-center py-12 bg-slate-50 rounded-lg border border-slate-200">
                  <p className="text-slate-600">No policies found matching your search.</p>
                </div>
              )}
            </>
          )}

          {activeTab === "claims" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {claims.map((claim, index) => (
                <ClaimCard key={index} {...claim} />
              ))}
            </div>
          )}

          {activeTab === "companies" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {companies.map((company, index) => (
                <InsuranceCompanyCard key={index} {...company} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
