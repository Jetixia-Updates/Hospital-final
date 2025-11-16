import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Printer, 
  Download, 
  Mail, 
  Building2,
  Calendar,
  User,
  FileText,
  CheckCircle2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PatientService } from "./PatientServiceTracker";

interface InvoiceProps {
  invoiceNumber: string;
  patientId: string;
  patientName: string;
  patientPhone?: string;
  patientAddress?: string;
  services: PatientService[];
  invoiceDate: string;
  dueDate?: string;
  discount?: number;
  tax?: number;
  notes?: string;
  className?: string;
}

export default function Invoice({
  invoiceNumber,
  patientId,
  patientName,
  patientPhone,
  patientAddress,
  services,
  invoiceDate,
  dueDate,
  discount = 0,
  tax = 0,
  notes,
  className,
}: InvoiceProps) {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const subtotal = services.reduce((sum, service) => sum + service.amount, 0);
  const discountAmount = (subtotal * discount) / 100;
  const taxAmount = ((subtotal - discountAmount) * tax) / 100;
  const total = subtotal - discountAmount + taxAmount;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // In production, this would generate a PDF
    alert("تحميل الفاتورة كـ PDF");
  };

  const handleSendEmail = () => {
    // In production, this would send email
    alert("إرسال الفاتورة بالبريد الإلكتروني");
  };

  return (
    <Card className={cn("print:shadow-none", className)}>
      <CardContent className="p-8">
        {/* Header - Hide action buttons when printing */}
        <div className="flex items-center justify-between mb-8 print:hidden">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">{t("billing.invoice")}</h2>
            <p className="text-slate-600 mt-1">{invoiceNumber}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handlePrint}>
              <Printer className={cn("w-4 h-4", isRTL ? "ml-2" : "mr-2")} />
              {t("billing.printInvoice")}
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownload}>
              <Download className={cn("w-4 h-4", isRTL ? "ml-2" : "mr-2")} />
              {t("common.download")}
            </Button>
            <Button variant="outline" size="sm" onClick={handleSendEmail}>
              <Mail className={cn("w-4 h-4", isRTL ? "ml-2" : "mr-2")} />
              {t("billing.sendInvoice")}
            </Button>
          </div>
        </div>

        {/* Hospital Info & Patient Info */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          {/* Hospital Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">HealthHub</h3>
                <p className="text-sm text-slate-600">{t("common.hospital")}</p>
              </div>
            </div>
            <div className="text-sm text-slate-600 space-y-1">
              <p>123 شارع الطب، القاهرة</p>
              <p>هاتف: +20 123 456 7890</p>
              <p>البريد الإلكتروني: info@healthhub.com</p>
              <p>الموقع الإلكتروني: www.healthhub.com</p>
            </div>
          </div>

          {/* Patient Info */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <User className="w-5 h-5 text-blue-600" />
              <h4 className="text-lg font-semibold text-slate-900">{t("common.patientInfo")}</h4>
            </div>
            <div className="text-sm space-y-1">
              <p className="font-medium text-slate-900">{patientName}</p>
              <p className="text-slate-600">
                <span className="font-medium">{t("billing.patientId")}:</span> {patientId}
              </p>
              {patientPhone && (
                <p className="text-slate-600">
                  <span className="font-medium">{t("common.phone")}:</span> {patientPhone}
                </p>
              )}
              {patientAddress && (
                <p className="text-slate-600">
                  <span className="font-medium">{t("common.address")}:</span> {patientAddress}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Invoice Details */}
        <div className="grid grid-cols-3 gap-4 mb-8 p-4 bg-slate-50 rounded-lg">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="w-4 h-4 text-blue-600" />
              <p className="text-xs font-medium text-slate-600">{t("billing.invoiceDate")}</p>
            </div>
            <p className="font-semibold text-slate-900">{invoiceDate}</p>
          </div>
          {dueDate && (
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Calendar className="w-4 h-4 text-orange-600" />
                <p className="text-xs font-medium text-slate-600">{t("billing.dueDate")}</p>
              </div>
              <p className="font-semibold text-slate-900">{dueDate}</p>
            </div>
          )}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <FileText className="w-4 h-4 text-purple-600" />
              <p className="text-xs font-medium text-slate-600">{t("billing.invoiceNumber")}</p>
            </div>
            <p className="font-semibold text-slate-900">{invoiceNumber}</p>
          </div>
        </div>

        {/* Services Table */}
        <div className="mb-8">
          <h4 className="text-lg font-semibold text-slate-900 mb-4">
            {t("billing.serviceSummary")}
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-slate-200">
                  <th className={cn("py-3 px-4 text-xs font-semibold text-slate-700 uppercase", isRTL ? "text-right" : "text-left")}>
                    #
                  </th>
                  <th className={cn("py-3 px-4 text-xs font-semibold text-slate-700 uppercase", isRTL ? "text-right" : "text-left")}>
                    {t("billing.description")}
                  </th>
                  <th className={cn("py-3 px-4 text-xs font-semibold text-slate-700 uppercase", isRTL ? "text-right" : "text-left")}>
                    {t("billing.serviceType")}
                  </th>
                  <th className={cn("py-3 px-4 text-xs font-semibold text-slate-700 uppercase", isRTL ? "text-right" : "text-left")}>
                    {t("billing.serviceDate")}
                  </th>
                  <th className={cn("py-3 px-4 text-xs font-semibold text-slate-700 uppercase text-center")}>
                    {t("billing.quantity")}
                  </th>
                  <th className={cn("py-3 px-4 text-xs font-semibold text-slate-700 uppercase text-right")}>
                    {t("billing.unitPrice")}
                  </th>
                  <th className={cn("py-3 px-4 text-xs font-semibold text-slate-700 uppercase text-right")}>
                    {t("billing.amount")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {services.map((service, index) => (
                  <tr key={service.id} className="border-b border-slate-100">
                    <td className="py-4 px-4 text-slate-600">{index + 1}</td>
                    <td className="py-4 px-4">
                      <p className="font-medium text-slate-900">{service.name}</p>
                      <p className="text-xs text-slate-500">{service.department}</p>
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant="outline" className="text-xs">
                        {t(`billing.${service.type}`)}
                      </Badge>
                    </td>
                    <td className="py-4 px-4 text-sm text-slate-600">{service.date}</td>
                    <td className="py-4 px-4 text-center text-slate-900">{service.quantity}</td>
                    <td className="py-4 px-4 text-right text-slate-900">
                      {service.unitPrice.toLocaleString()} {t("common.currency", "ج.م")}
                    </td>
                    <td className="py-4 px-4 text-right font-medium text-slate-900">
                      {service.amount.toLocaleString()} {t("common.currency", "ج.م")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Totals */}
        <div className="flex justify-end">
          <div className="w-96">
            <div className="space-y-3">
              <div className="flex justify-between py-2">
                <span className="text-slate-600">{t("billing.subtotal")}:</span>
                <span className="font-medium text-slate-900">
                  {subtotal.toLocaleString()} {t("common.currency", "ج.م")}
                </span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between py-2">
                  <span className="text-slate-600">
                    {t("billing.discount")} ({discount}%):
                  </span>
                  <span className="font-medium text-green-600">
                    -{discountAmount.toLocaleString()} {t("common.currency", "ج.م")}
                  </span>
                </div>
              )}

              {tax > 0 && (
                <div className="flex justify-between py-2">
                  <span className="text-slate-600">
                    {t("billing.tax")} ({tax}%):
                  </span>
                  <span className="font-medium text-slate-900">
                    +{taxAmount.toLocaleString()} {t("common.currency", "ج.م")}
                  </span>
                </div>
              )}

              <Separator />

              <div className="flex justify-between py-3 bg-blue-50 px-4 rounded-lg">
                <span className="text-lg font-bold text-slate-900">{t("billing.total")}:</span>
                <span className="text-2xl font-bold text-blue-600">
                  {total.toLocaleString()} {t("common.currency", "ج.م")}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Notes */}
        {notes && (
          <div className="mt-8 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <p className="text-sm font-medium text-yellow-900 mb-1">{t("billing.notes")}:</p>
            <p className="text-sm text-yellow-800">{notes}</p>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-slate-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-600">
              <p className="font-medium mb-1">{t("common.paymentMethods")}:</p>
              <p>نقداً، بطاقة ائتمان، تحويل بنكي، تأمين</p>
            </div>
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle2 className="w-5 h-5" />
              <span className="font-medium">{t("common.verifiedInvoice")}</span>
            </div>
          </div>
        </div>

        {/* Print-only footer */}
        <div className="hidden print:block mt-8 pt-6 border-t border-slate-200 text-center text-sm text-slate-600">
          <p>هذه فاتورة إلكترونية ولا تحتاج إلى ختم أو توقيع</p>
          <p className="mt-1">شكراً لاختياركم HealthHub - نتمنى لكم دوام الصحة والعافية</p>
        </div>
      </CardContent>
    </Card>
  );
}
