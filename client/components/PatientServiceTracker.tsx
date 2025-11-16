import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus, Eye, FileText, DollarSign, Clock, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PatientService {
  id: string;
  patientId: string;
  patientName: string;
  type: "consultation" | "laboratory" | "radiology" | "surgery" | "medication" | "accommodation" | "emergency" | "therapy";
  name: string;
  date: string;
  department: string;
  provider: string;
  quantity: number;
  unitPrice: number;
  amount: number;
  status: "pending" | "billed" | "paid" | "cancelled";
  notes?: string;
}

interface PatientServiceTrackerProps {
  patientId?: string;
  patientName?: string;
  departmentName: string;
  onServiceAdded?: (service: PatientService) => void;
  className?: string;
}

// In-memory service storage (in production, this would be in a database/API)
let serviceStorage: PatientService[] = [];

export const addPatientService = (service: Omit<PatientService, "id">) => {
  const newService: PatientService = {
    ...service,
    id: `SVC-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
  };
  serviceStorage.push(newService);
  return newService;
};

export const getPatientServices = (patientId?: string) => {
  if (patientId) {
    return serviceStorage.filter(s => s.patientId === patientId);
  }
  return serviceStorage;
};

export const updateServiceStatus = (serviceId: string, status: PatientService["status"]) => {
  const service = serviceStorage.find(s => s.id === serviceId);
  if (service) {
    service.status = status;
  }
};

export const getPatientBillingSummary = (patientId: string) => {
  const services = getPatientServices(patientId);
  const totalAmount = services.reduce((sum, s) => sum + s.amount, 0);
  const paidAmount = services.filter(s => s.status === "paid").reduce((sum, s) => sum + s.amount, 0);
  const billedAmount = services.filter(s => s.status === "billed").reduce((sum, s) => sum + s.amount, 0);
  const pendingAmount = services.filter(s => s.status === "pending").reduce((sum, s) => sum + s.amount, 0);
  
  return {
    totalServices: services.length,
    totalAmount,
    paidAmount,
    billedAmount,
    pendingAmount,
    remainingAmount: totalAmount - paidAmount,
    services,
  };
};

export default function PatientServiceTracker({
  patientId,
  patientName,
  departmentName,
  onServiceAdded,
  className,
}: PatientServiceTrackerProps) {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const [isOpen, setIsOpen] = useState(false);
  const [services, setServices] = useState<PatientService[]>([]);

  useEffect(() => {
    if (patientId) {
      setServices(getPatientServices(patientId));
    }
  }, [patientId, isOpen]);

  const recentServices = services.slice(-5).reverse();
  const summary = patientId ? getPatientBillingSummary(patientId) : null;

  const getServiceTypeColor = (type: string) => {
    const colors = {
      consultation: "bg-blue-100 text-blue-700",
      laboratory: "bg-purple-100 text-purple-700",
      radiology: "bg-cyan-100 text-cyan-700",
      surgery: "bg-red-100 text-red-700",
      medication: "bg-green-100 text-green-700",
      accommodation: "bg-yellow-100 text-yellow-700",
      emergency: "bg-orange-100 text-orange-700",
      therapy: "bg-pink-100 text-pink-700",
    };
    return colors[type as keyof typeof colors] || "bg-gray-100 text-gray-700";
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { color: "bg-yellow-100 text-yellow-700", icon: Clock },
      billed: { color: "bg-blue-100 text-blue-700", icon: FileText },
      paid: { color: "bg-green-100 text-green-700", icon: CheckCircle2 },
      cancelled: { color: "bg-gray-100 text-gray-700", icon: Clock },
    };
    const config = statusConfig[status as keyof typeof statusConfig];
    const Icon = config.icon;
    return (
      <Badge className={cn("gap-1", config.color)}>
        <Icon className="w-3 h-3" />
        {t(`billing.${status}`)}
      </Badge>
    );
  };

  if (!patientId || !patientName) {
    return (
      <Card className={className}>
        <CardContent className="p-6">
          <div className="text-center text-slate-500">
            <FileText className="w-12 h-12 mx-auto mb-2 text-slate-300" />
            <p>{t("billing.noServicesFound")}</p>
            <p className="text-sm mt-1">يرجى تحديد مريض لتتبع خدماته</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className={className}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">{t("billing.patientServices")}</CardTitle>
              <p className="text-sm text-slate-600 mt-1">
                {patientName} - {patientId}
              </p>
            </div>
            <Button size="sm" onClick={() => setIsOpen(true)}>
              <Eye className={cn("w-4 h-4", isRTL ? "ml-2" : "mr-2")} />
              {t("billing.viewServices")}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {summary && (
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-blue-50 rounded-lg p-3">
                <p className="text-xs text-blue-600 mb-1">{t("billing.totalServices")}</p>
                <p className="text-2xl font-bold text-blue-900">{summary.totalServices}</p>
              </div>
              <div className="bg-green-50 rounded-lg p-3">
                <p className="text-xs text-green-600 mb-1">{t("billing.totalAmount")}</p>
                <p className="text-2xl font-bold text-green-900">
                  {summary.totalAmount.toLocaleString()} {t("common.currency", "ج.م")}
                </p>
              </div>
              <div className="bg-purple-50 rounded-lg p-3">
                <p className="text-xs text-purple-600 mb-1">{t("billing.paidAmount")}</p>
                <p className="text-2xl font-bold text-purple-900">
                  {summary.paidAmount.toLocaleString()} {t("common.currency", "ج.م")}
                </p>
              </div>
              <div className="bg-orange-50 rounded-lg p-3">
                <p className="text-xs text-orange-600 mb-1">{t("billing.remainingAmount")}</p>
                <p className="text-2xl font-bold text-orange-900">
                  {summary.remainingAmount.toLocaleString()} {t("common.currency", "ج.م")}
                </p>
              </div>
            </div>
          )}

          {recentServices.length > 0 ? (
            <div className="space-y-2">
              <p className="text-sm font-semibold text-slate-700 mb-2">
                {t("common.recent")} {t("billing.services")}
              </p>
              {recentServices.map((service) => (
                <div
                  key={service.id}
                  className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className={getServiceTypeColor(service.type)}>
                        {t(`billing.${service.type}`)}
                      </Badge>
                      {getStatusBadge(service.status)}
                    </div>
                    <p className="text-sm font-medium text-slate-900">{service.name}</p>
                    <p className="text-xs text-slate-500">
                      {service.date} • {service.department}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-slate-900">
                      {service.amount.toLocaleString()} {t("common.currency", "ج.م")}
                    </p>
                    <p className="text-xs text-slate-500">
                      {service.quantity} × {service.unitPrice.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-slate-500">
              <FileText className="w-12 h-12 mx-auto mb-2 text-slate-300" />
              <p>{t("billing.noServicesFound")}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Services Detail Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {t("billing.patientServices")} - {patientName}
            </DialogTitle>
          </DialogHeader>

          {summary && (
            <div className="grid grid-cols-4 gap-4 mb-6">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <p className="text-xs text-slate-600">{t("billing.totalServices")}</p>
                  </div>
                  <p className="text-2xl font-bold text-slate-900">{summary.totalServices}</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="w-5 h-5 text-green-600" />
                    <p className="text-xs text-slate-600">{t("billing.totalAmount")}</p>
                  </div>
                  <p className="text-2xl font-bold text-slate-900">
                    {summary.totalAmount.toLocaleString()}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-purple-600" />
                    <p className="text-xs text-slate-600">{t("billing.paidAmount")}</p>
                  </div>
                  <p className="text-2xl font-bold text-purple-900">
                    {summary.paidAmount.toLocaleString()}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-5 h-5 text-orange-600" />
                    <p className="text-xs text-slate-600">{t("billing.remainingAmount")}</p>
                  </div>
                  <p className="text-2xl font-bold text-orange-900">
                    {summary.remainingAmount.toLocaleString()}
                  </p>
                </CardContent>
              </Card>
            </div>
          )}

          <div className="space-y-3">
            {services.length > 0 ? (
              services.reverse().map((service) => (
                <Card key={service.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={getServiceTypeColor(service.type)}>
                            {t(`billing.${service.type}`)}
                          </Badge>
                          {getStatusBadge(service.status)}
                          <span className="text-xs text-slate-500">{service.id}</span>
                        </div>
                        <h4 className="font-semibold text-slate-900 mb-1">{service.name}</h4>
                        <div className="grid grid-cols-2 gap-2 text-sm text-slate-600">
                          <div>
                            <span className="font-medium">{t("billing.department")}:</span> {service.department}
                          </div>
                          <div>
                            <span className="font-medium">{t("billing.provider")}:</span> {service.provider}
                          </div>
                          <div>
                            <span className="font-medium">{t("billing.serviceDate")}:</span> {service.date}
                          </div>
                          <div>
                            <span className="font-medium">{t("billing.quantity")}:</span> {service.quantity}
                          </div>
                        </div>
                        {service.notes && (
                          <p className="text-sm text-slate-500 mt-2">
                            <span className="font-medium">{t("billing.notes")}:</span> {service.notes}
                          </p>
                        )}
                      </div>
                      <div className="text-right ml-4">
                        <p className="text-2xl font-bold text-slate-900 mb-1">
                          {service.amount.toLocaleString()} {t("common.currency", "ج.م")}
                        </p>
                        <p className="text-sm text-slate-500">
                          {service.quantity} × {service.unitPrice.toLocaleString()} {t("common.currency", "ج.م")}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-12 text-slate-500">
                <FileText className="w-16 h-16 mx-auto mb-3 text-slate-300" />
                <p className="text-lg font-medium">{t("billing.noServicesFound")}</p>
              </div>
            )}
          </div>

          {services.length > 0 && (
            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                {t("common.close")}
              </Button>
              <Button>
                <FileText className={cn("w-4 h-4", isRTL ? "ml-2" : "mr-2")} />
                {t("billing.generateInvoice")}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
