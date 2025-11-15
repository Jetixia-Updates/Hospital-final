import Layout from "@/components/Layout";
import {
  Users,
  UserPlus,
  Phone,
  Mail,
  Calendar,
  TrendingUp,
  Star,
  MessageSquare,
  CheckCircle2,
  Clock,
  AlertCircle,
  Activity,
  DollarSign,
  Gift,
  Target,
  BarChart3,
  Filter,
  Download,
  Search,
  Plus,
} from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CRM() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("contacts");
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddContactDialogOpen, setIsAddContactDialogOpen] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    type: "",
    email: "",
    phone: "",
    insuranceProvider: "",
    preferredDoctor: "",
    communicationPreference: "",
    notes: "",
  });

  const contactsData = [
    {
      id: "C001",
      name: "Ahmed Mohammed Al-Rashid",
      type: "VIP Patient",
      email: "ahmed.rashid@email.com",
      phone: "+966 50 123 4567",
      lastVisit: "2024-11-10",
      nextAppointment: "2024-11-20",
      totalVisits: 24,
      lifetimeValue: 185000,
      satisfaction: 5,
      status: "Active",
      preferredDoctor: "Dr. Hassan Al-Rashid",
      insuranceProvider: "Tawuniya Gold",
      communicationPreference: "WhatsApp",
      notes: "Prefers morning appointments, VIP treatment required",
    },
    {
      id: "C002",
      name: "Fatima Al-Dosari",
      type: "Regular Patient",
      email: "fatima.dosari@email.com",
      phone: "+966 55 234 5678",
      lastVisit: "2024-11-12",
      nextAppointment: "2024-11-18",
      totalVisits: 12,
      lifetimeValue: 45000,
      satisfaction: 4,
      status: "Active",
      preferredDoctor: "Dr. Layla Mahmoud",
      insuranceProvider: "Bupa Arabia",
      communicationPreference: "Email",
      notes: "Family plan subscriber, 3 dependents",
    },
    {
      id: "C003",
      name: "Dr. Khalid Omar (Corporate)",
      type: "Corporate Client",
      email: "k.omar@saudicorp.sa",
      phone: "+966 50 345 6789",
      lastVisit: "2024-11-08",
      nextAppointment: null,
      totalVisits: 45,
      lifetimeValue: 520000,
      satisfaction: 5,
      status: "Active",
      preferredDoctor: "Multiple",
      insuranceProvider: "Corporate Package",
      communicationPreference: "Phone",
      notes: "Company health plan - 150 employees",
    },
    {
      id: "C004",
      name: "Noor Abdullah",
      type: "New Lead",
      email: "noor.abdullah@email.com",
      phone: "+966 56 456 7890",
      lastVisit: null,
      nextAppointment: "2024-11-16",
      totalVisits: 0,
      lifetimeValue: 0,
      satisfaction: 0,
      status: "Prospect",
      preferredDoctor: "Not Assigned",
      insuranceProvider: "AXA",
      communicationPreference: "WhatsApp",
      notes: "Referred by Dr. Mariam - Maternity case",
    },
  ];

  const leadsData = [
    {
      id: "L001",
      name: "Sarah Al-Harbi",
      source: "Website Inquiry",
      interest: "Cardiology Checkup",
      phone: "+966 54 567 8901",
      email: "sarah.harbi@email.com",
      status: "Hot Lead",
      assignedTo: "Marketing Team",
      createdDate: "2024-11-13",
      lastContact: "2024-11-14",
      probability: 85,
      estimatedValue: 8500,
    },
    {
      id: "L002",
      name: "Mohammed Al-Otaibi",
      source: "Social Media",
      interest: "Orthopedic Consultation",
      phone: "+966 55 678 9012",
      email: "m.otaibi@email.com",
      status: "Warm Lead",
      assignedTo: "Sales Rep 1",
      createdDate: "2024-11-11",
      lastContact: "2024-11-13",
      probability: 60,
      estimatedValue: 5000,
    },
    {
      id: "L003",
      name: "Royal Group Medical",
      source: "Corporate Referral",
      interest: "Employee Health Package",
      phone: "+966 11 234 5678",
      email: "hr@royalgroup.sa",
      status: "Hot Lead",
      assignedTo: "Corporate Sales Manager",
      createdDate: "2024-11-10",
      lastContact: "2024-11-14",
      probability: 90,
      estimatedValue: 450000,
    },
  ];

  const campaignsData = [
    {
      id: "CAMP001",
      name: "Annual Health Checkup Promotion",
      type: "Email Campaign",
      startDate: "2024-11-01",
      endDate: "2024-11-30",
      targetAudience: 2500,
      reached: 2280,
      converted: 342,
      conversionRate: 15,
      revenue: 1710000,
      status: "Active",
      budget: 25000,
      spent: 18500,
    },
    {
      id: "CAMP002",
      name: "Women's Health Month",
      type: "Social Media",
      startDate: "2024-11-05",
      endDate: "2024-11-25",
      targetAudience: 1800,
      reached: 1950,
      converted: 234,
      conversionRate: 12,
      revenue: 585000,
      status: "Active",
      budget: 15000,
      spent: 12000,
    },
    {
      id: "CAMP003",
      name: "Corporate Wellness Package",
      type: "Direct Marketing",
      startDate: "2024-10-15",
      endDate: "2024-12-31",
      targetAudience: 150,
      reached: 142,
      converted: 28,
      conversionRate: 19,
      revenue: 2800000,
      status: "Active",
      budget: 50000,
      spent: 35000,
    },
  ];

  const interactionsData = [
    {
      id: "INT001",
      contactName: "Ahmed Mohammed",
      type: "Phone Call",
      date: "2024-11-14 10:30",
      duration: "15 mins",
      subject: "Follow-up on treatment plan",
      outcome: "Scheduled next appointment",
      assignedTo: "Reception Staff",
      priority: "High",
    },
    {
      id: "INT002",
      contactName: "Fatima Al-Dosari",
      type: "Email",
      date: "2024-11-14 09:15",
      duration: "N/A",
      subject: "Lab results inquiry",
      outcome: "Results sent, satisfied",
      assignedTo: "Lab Department",
      priority: "Medium",
    },
    {
      id: "INT003",
      contactName: "Royal Group Medical",
      type: "Meeting",
      date: "2024-11-13 14:00",
      duration: "90 mins",
      subject: "Corporate package negotiation",
      outcome: "Proposal sent, awaiting decision",
      assignedTo: "Sales Manager",
      priority: "Critical",
    },
  ];

  const satisfactionMetrics = [
    { category: "Overall Experience", score: 4.6, responses: 1250, trend: "+0.3" },
    { category: "Doctor Quality", score: 4.8, responses: 1180, trend: "+0.2" },
    { category: "Waiting Time", score: 3.9, responses: 1220, trend: "-0.1" },
    { category: "Facility Cleanliness", score: 4.7, responses: 1200, trend: "+0.4" },
    { category: "Staff Friendliness", score: 4.5, responses: 1190, trend: "+0.2" },
    { category: "Value for Money", score: 4.2, responses: 1100, trend: "0.0" },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              {t('navigation.crm')}
            </h1>
            <p className="text-slate-600 mt-1">
              {t('crm.subtitle')}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" />
              {t('common.filter')}
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              {t('common.export')}
            </Button>
            <Button onClick={() => setIsAddContactDialogOpen(true)} className="gap-2">
              <Plus className="w-4 h-4" />
              {t('crm.addContact')}
            </Button>
          </div>
        </div>

        {/* CRM KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">{t('crm.totalContacts')}</p>
                  <p className="text-2xl font-bold text-slate-900">
                    {contactsData.length.toLocaleString()}K
                  </p>
                  <p className="text-xs text-green-600 mt-1">↑ 12% {t('dashboard.fromLastMonth')}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">{t('crm.activeLeads')}</p>
                  <p className="text-2xl font-bold text-slate-900">{leadsData.length * 50}</p>
                  <p className="text-xs text-orange-600 mt-1">45 {t('crm.hotLead').toLowerCase()}s</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">{t('crm.avgSatisfaction')}</p>
                  <p className="text-2xl font-bold text-slate-900">4.6/5.0</p>
                  <p className="text-xs text-green-600 mt-1">↑ 0.3 {t('dashboard.increase')}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Star className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">{t('crm.totalLTV')}</p>
                  <p className="text-2xl font-bold text-slate-900">SAR 45.2M</p>
                  <p className="text-xs text-green-600 mt-1">↑ SAR 3.8M {t('dashboard.today').toLowerCase()}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="contacts">{t('crm.contacts')}</TabsTrigger>
            <TabsTrigger value="leads">{t('crm.leads')}</TabsTrigger>
            <TabsTrigger value="campaigns">{t('crm.campaigns')}</TabsTrigger>
            <TabsTrigger value="interactions">{t('crm.interactions')}</TabsTrigger>
            <TabsTrigger value="satisfaction">{t('crm.satisfaction')}</TabsTrigger>
          </TabsList>

          {/* Contacts Tab */}
          <TabsContent value="contacts" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{t('crm.contactManagement')}</CardTitle>
                  <div className="relative">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder={t('crm.searchContacts')}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {contactsData.map((contact) => (
                    <div
                      key={contact.id}
                      className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-start gap-3">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <Users className="w-6 h-6 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-slate-900">{contact.name}</h3>
                            <Badge variant="outline">{contact.type}</Badge>
                            <div className="flex items-center gap-1 mt-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-3 h-3 ${
                                    i < contact.satisfaction
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "text-slate-300"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        <Badge variant={contact.status === "Active" ? "default" : "secondary"}>
                          {contact.status}
                        </Badge>
                      </div>

                                              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm mb-3">
                        <div>
                          <p className="text-slate-500 flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            {t('crm.phone')}
                          </p>
                          <p className="font-medium">{contact.phone}</p>
                        </div>
                        <div>
                          <p className="text-slate-500 flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {t('crm.email')}
                          </p>
                          <p className="font-medium text-xs">{contact.email}</p>
                        </div>
                        <div>
                          <p className="text-slate-500">{t('crm.totalVisits')}</p>
                          <p className="font-medium">{contact.totalVisits}</p>
                        </div>
                        <div>
                          <p className="text-slate-500">{t('crm.lifetimeValue')}</p>
                          <p className="font-medium text-green-600">
                            SAR {contact.lifetimeValue.toLocaleString()}
                          </p>
                        </div>
                      </div>

                      <div className="bg-slate-50 rounded p-2 text-xs">
                        <p className="text-slate-700">
                          <strong>{t('crm.preferredDoctor')}:</strong> {contact.preferredDoctor}
                        </p>
                        <p className="text-slate-700">
                          <strong>{t('patients.insurance')}:</strong> {contact.insuranceProvider}
                        </p>
                        {contact.notes && (
                          <p className="text-slate-600 mt-1">
                            <strong>{t('crm.notes')}:</strong> {contact.notes}
                          </p>
                        )}
                      </div>

                      {contact.nextAppointment && (
                        <div className="mt-3 flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-blue-600" />
                          <span className="text-slate-700">
                            {t('crm.nextAppointment')}: {contact.nextAppointment}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Leads Tab */}
          <TabsContent value="leads" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{t('crm.leadPipeline')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {leadsData.map((lead) => (
                    <div key={lead.id} className="border border-slate-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-slate-900">{lead.name}</h3>
                          <p className="text-sm text-slate-600">{lead.interest}</p>
                        </div>
                        <Badge
                          variant={
                            lead.status === "Hot Lead"
                              ? "destructive"
                              : lead.status === "Warm Lead"
                              ? "secondary"
                              : "outline"
                          }
                        >
                          {lead.status}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm mb-3">
                        <div>
                          <p className="text-slate-500">{t('crm.source')}</p>
                          <p className="font-medium">{lead.source}</p>
                        </div>
                        <div>
                          <p className="text-slate-500">{t('crm.assignedTo')}</p>
                          <p className="font-medium">{lead.assignedTo}</p>
                        </div>
                        <div>
                          <p className="text-slate-500">{t('crm.probability')}</p>
                          <div className="flex items-center gap-2">
                            <div className="w-full bg-slate-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${
                                  lead.probability > 80
                                    ? "bg-green-600"
                                    : lead.probability > 60
                                    ? "bg-orange-600"
                                    : "bg-slate-400"
                                }`}
                                style={{ width: `${lead.probability}%` }}
                              />
                            </div>
                            <span className="font-medium">{lead.probability}%</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-slate-500">{t('crm.estimatedValue')}</p>
                          <p className="font-medium text-green-600">
                            SAR {lead.estimatedValue.toLocaleString()}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs text-slate-600">
                        <span>{t('crm.created')}: {lead.createdDate}</span>
                        <span>{t('crm.lastContact')}: {lead.lastContact}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Campaigns Tab */}
          <TabsContent value="campaigns" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{t('crm.marketingCampaigns')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {campaignsData.map((campaign) => {
                    const reachRate = Math.round((campaign.reached / campaign.targetAudience) * 100);
                    const budgetUsed = Math.round((campaign.spent / campaign.budget) * 100);

                    return (
                      <div key={campaign.id} className="border border-slate-200 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-slate-900">{campaign.name}</h3>
                            <p className="text-sm text-slate-600">{campaign.type}</p>
                          </div>
                          <Badge variant="default">{campaign.status}</Badge>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                          <div className="bg-blue-50 rounded p-2">
                            <p className="text-xs text-slate-600">{t('crm.targetAudience')}</p>
                            <p className="font-bold text-blue-700">
                              {campaign.targetAudience.toLocaleString()}
                            </p>
                          </div>
                          <div className="bg-green-50 rounded p-2">
                            <p className="text-xs text-slate-600">{t('crm.reached')}</p>
                            <p className="font-bold text-green-700">
                              {campaign.reached.toLocaleString()} ({reachRate}%)
                            </p>
                          </div>
                          <div className="bg-purple-50 rounded p-2">
                            <p className="text-xs text-slate-600">{t('crm.converted')}</p>
                            <p className="font-bold text-purple-700">
                              {campaign.converted} ({campaign.conversionRate}%)
                            </p>
                          </div>
                          <div className="bg-orange-50 rounded p-2">
                            <p className="text-xs text-slate-600">{t('dashboard.totalRevenue')}</p>
                            <p className="font-bold text-orange-700">
                              SAR {(campaign.revenue / 1000000).toFixed(1)}M
                            </p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-slate-600">{t('crm.budgetUtilization')}</span>
                              <span className="font-medium">
                                SAR {campaign.spent.toLocaleString()} / SAR{" "}
                                {campaign.budget.toLocaleString()} ({budgetUsed}%)
                              </span>
                            </div>
                            <div className="w-full bg-slate-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${
                                  budgetUsed > 90 ? "bg-red-600" : "bg-green-600"
                                }`}
                                style={{ width: `${budgetUsed}%` }}
                              />
                            </div>
                          </div>
                          <p className="text-xs text-slate-600">
                            {t('crm.duration')}: {campaign.startDate} to {campaign.endDate}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Interactions Tab */}
          <TabsContent value="interactions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{t('crm.recentInteractions')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {interactionsData.map((interaction) => (
                    <div
                      key={interaction.id}
                      className="flex items-center justify-between p-3 border border-slate-200 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <MessageSquare className="w-5 h-5 text-slate-400" />
                        <div>
                          <p className="font-medium text-slate-900">{interaction.contactName}</p>
                          <p className="text-sm text-slate-600">{interaction.subject}</p>
                          <p className="text-xs text-slate-500">
                            {interaction.type} • {interaction.date} • {interaction.duration}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge
                          variant={
                            interaction.priority === "Critical"
                              ? "destructive"
                              : interaction.priority === "High"
                              ? "secondary"
                              : "outline"
                          }
                        >
                          {interaction.priority}
                        </Badge>
                        <p className="text-xs text-slate-600 mt-1">{interaction.outcome}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Satisfaction Tab */}
          <TabsContent value="satisfaction" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{t('crm.patientSatisfactionMetrics')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {satisfactionMetrics.map((metric) => (
                    <div key={metric.category} className="border border-slate-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-slate-900">{metric.category}</h4>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.round(metric.score)
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-slate-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="font-bold text-slate-900">{metric.score}/5.0</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600">{metric.responses} {t('crm.responses')}</span>
                        <span
                          className={`font-medium ${
                            metric.trend.startsWith("+")
                              ? "text-green-600"
                              : metric.trend.startsWith("-")
                              ? "text-red-600"
                              : "text-slate-600"
                          }`}
                        >
                          {metric.trend} {t('crm.trend')}
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
                        <div
                          className="bg-yellow-500 h-2 rounded-full"
                          style={{ width: `${(metric.score / 5) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Add Contact Dialog */}
        <Dialog open={isAddContactDialogOpen} onOpenChange={setIsAddContactDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-blue-600" />
                Add New Contact
              </DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2 col-span-2">
                <Label htmlFor="contactName">Full Name</Label>
                <Input
                  id="contactName"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  placeholder="Ahmed Mohammed Al-Rashid"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactType">Contact Type</Label>
                <Select
                  value={contactForm.type}
                  onValueChange={(value) => setContactForm({ ...contactForm, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="VIP Patient">VIP Patient</SelectItem>
                    <SelectItem value="Regular Patient">Regular Patient</SelectItem>
                    <SelectItem value="Corporate Client">Corporate Client</SelectItem>
                    <SelectItem value="Insurance Partner">Insurance Partner</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={contactForm.phone}
                  onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                  placeholder="+966 50 123 4567"
                />
              </div>
              <div className="space-y-2 col-span-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  placeholder="contact@email.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="insuranceProvider">Insurance Provider</Label>
                <Select
                  value={contactForm.insuranceProvider}
                  onValueChange={(value) => setContactForm({ ...contactForm, insuranceProvider: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select insurance" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Tawuniya Gold">Tawuniya Gold</SelectItem>
                    <SelectItem value="Bupa Arabia">Bupa Arabia</SelectItem>
                    <SelectItem value="Medgulf">Medgulf</SelectItem>
                    <SelectItem value="Self-Pay">Self-Pay</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="preferredDoctor">Preferred Doctor</Label>
                <Input
                  id="preferredDoctor"
                  value={contactForm.preferredDoctor}
                  onChange={(e) => setContactForm({ ...contactForm, preferredDoctor: e.target.value })}
                  placeholder="Dr. Hassan Al-Rashid"
                />
              </div>
              <div className="space-y-2 col-span-2">
                <Label htmlFor="communicationPreference">Communication Preference</Label>
                <Select
                  value={contactForm.communicationPreference}
                  onValueChange={(value) => setContactForm({ ...contactForm, communicationPreference: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select preference" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                    <SelectItem value="Email">Email</SelectItem>
                    <SelectItem value="Phone">Phone</SelectItem>
                    <SelectItem value="SMS">SMS</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 col-span-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={contactForm.notes}
                  onChange={(e) => setContactForm({ ...contactForm, notes: e.target.value })}
                  placeholder="Additional information about the contact..."
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddContactDialogOpen(false)}>
                {t('common.cancel')}
              </Button>
              <Button
                onClick={() => {
                  console.log('New Contact:', contactForm);
                  setContactForm({
                    name: "",
                    type: "",
                    email: "",
                    phone: "",
                    insuranceProvider: "",
                    preferredDoctor: "",
                    communicationPreference: "",
                    notes: "",
                  });
                  setIsAddContactDialogOpen(false);
                }}
              >
                Add Contact
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
}
