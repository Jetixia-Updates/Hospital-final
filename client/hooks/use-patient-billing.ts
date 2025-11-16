import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";
import { addPatientService, PatientService } from "@/components/PatientServiceTracker";

export interface ServiceInput {
  patientId: string;
  patientName: string;
  type: PatientService["type"];
  name: string;
  department: string;
  provider?: string;
  quantity?: number;
  unitPrice: number;
  notes?: string;
}

export function usePatientBilling() {
  const { toast } = useToast();
  const { t } = useTranslation();

  /**
   * Add a service to patient's billing automatically
   * This can be called from any module (Pharmacy, Lab, Surgery, etc.)
   */
  const addServiceToBilling = (input: ServiceInput) => {
    const service = addPatientService({
      patientId: input.patientId,
      patientName: input.patientName,
      type: input.type,
      name: input.name,
      date: new Date().toISOString().split('T')[0],
      department: input.department,
      provider: input.provider || input.department,
      quantity: input.quantity || 1,
      unitPrice: input.unitPrice,
      amount: (input.quantity || 1) * input.unitPrice,
      status: "pending",
      notes: input.notes,
    });

    toast({
      title: t("billing.servicesAdded"),
      description: `${input.name} - ${((input.quantity || 1) * input.unitPrice).toLocaleString()} ${t("common.currency", "ج.م")}`,
    });

    return service;
  };

  /**
   * Quick helpers for common service types
   */
  const addConsultation = (patientId: string, patientName: string, doctorName: string, department: string, price: number) => {
    return addServiceToBilling({
      patientId,
      patientName,
      type: "consultation",
      name: `استشارة طبية - ${doctorName}`,
      department,
      provider: doctorName,
      unitPrice: price,
    });
  };

  const addLabTest = (patientId: string, patientName: string, testName: string, price: number) => {
    return addServiceToBilling({
      patientId,
      patientName,
      type: "laboratory",
      name: testName,
      department: "المختبر",
      provider: "قسم المختبر",
      unitPrice: price,
    });
  };

  const addRadiology = (patientId: string, patientName: string, scanName: string, price: number) => {
    return addServiceToBilling({
      patientId,
      patientName,
      type: "radiology",
      name: scanName,
      department: "الأشعة",
      provider: "قسم الأشعة",
      unitPrice: price,
    });
  };

  const addMedication = (patientId: string, patientName: string, medicationName: string, quantity: number, unitPrice: number) => {
    return addServiceToBilling({
      patientId,
      patientName,
      type: "medication",
      name: medicationName,
      department: "الصيدلية",
      provider: "الصيدلية الرئيسية",
      quantity,
      unitPrice,
    });
  };

  const addSurgery = (patientId: string, patientName: string, surgeryName: string, surgeonName: string, price: number) => {
    return addServiceToBilling({
      patientId,
      patientName,
      type: "surgery",
      name: surgeryName,
      department: "العمليات الجراحية",
      provider: surgeonName,
      unitPrice: price,
    });
  };

  const addAccommodation = (patientId: string, patientName: string, roomType: string, days: number, pricePerDay: number) => {
    return addServiceToBilling({
      patientId,
      patientName,
      type: "accommodation",
      name: `إقامة - ${roomType}`,
      department: "الغرف",
      provider: "قسم الإقامة",
      quantity: days,
      unitPrice: pricePerDay,
      notes: `${days} يوم/أيام`,
    });
  };

  const addEmergency = (patientId: string, patientName: string, serviceName: string, price: number) => {
    return addServiceToBilling({
      patientId,
      patientName,
      type: "emergency",
      name: serviceName,
      department: "الطوارئ",
      provider: "قسم الطوارئ",
      unitPrice: price,
    });
  };

  const addTherapy = (patientId: string, patientName: string, therapyName: string, sessions: number, pricePerSession: number) => {
    return addServiceToBilling({
      patientId,
      patientName,
      type: "therapy",
      name: therapyName,
      department: "العلاج الطبيعي",
      provider: "قسم العلاج الطبيعي",
      quantity: sessions,
      unitPrice: pricePerSession,
      notes: `${sessions} جلسة/جلسات`,
    });
  };

  return {
    addServiceToBilling,
    addConsultation,
    addLabTest,
    addRadiology,
    addMedication,
    addSurgery,
    addAccommodation,
    addEmergency,
    addTherapy,
  };
}
