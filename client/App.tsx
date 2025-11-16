import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import Index from "./pages/Index";
import Patients from "./pages/Patients";
import Departments from "./pages/Departments";
import MedicalRecords from "./pages/MedicalRecords";
import Surgery from "./pages/Surgery";
import Pharmacy from "./pages/Pharmacy";
import Insurance from "./pages/Insurance";
import Billing from "./pages/Billing";
import BillingDemo from "./pages/BillingDemo";
import Warehouse from "./pages/Warehouse";
import WarehouseIntegrationDemo from "./pages/WarehouseIntegrationDemo";
import PharmacyWarehouse from "./pages/PharmacyWarehouse";
import SurgeryWarehouse from "./pages/SurgeryWarehouse";
import HR from "./pages/HR";
import Maintenance from "./pages/Maintenance";
import SupplyChain from "./pages/SupplyChain";
import Kitchen from "./pages/Kitchen";
import Staff from "./pages/Staff";
import Finance from "./pages/Finance";
import Rooms from "./pages/Rooms";
import ERP from "./pages/ERP";
import CRM from "./pages/CRM";
import Clinics from "./pages/Clinics";
import Emergency from "./pages/Emergency";
import Laboratory from "./pages/Laboratory";
import Radiology from "./pages/Radiology";
import Reception from "./pages/Reception";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AppContent() {
  const { i18n } = useTranslation();
  
  useEffect(() => {
    // Set document direction based on language
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/patients" element={<Patients />} />
      <Route path="/departments" element={<Departments />} />
      <Route path="/medical-records" element={<MedicalRecords />} />
      <Route path="/rooms" element={<Rooms />} />
      <Route path="/surgery" element={<Surgery />} />
      <Route path="/pharmacy" element={<Pharmacy />} />
      <Route path="/insurance" element={<Insurance />} />
      <Route path="/billing" element={<Billing />} />
      <Route path="/billing-demo" element={<BillingDemo />} />
      <Route path="/warehouse" element={<Warehouse />} />
      <Route path="/warehouse-demo" element={<WarehouseIntegrationDemo />} />
      <Route path="/warehouse/pharmacy" element={<PharmacyWarehouse />} />
      <Route path="/warehouse/surgery" element={<SurgeryWarehouse />} />
      <Route path="/clinics" element={<Clinics />} />
      <Route path="/emergency" element={<Emergency />} />
      <Route path="/laboratory" element={<Laboratory />} />
      <Route path="/radiology" element={<Radiology />} />
      <Route path="/reception" element={<Reception />} />
      <Route path="/hr" element={<HR />} />
      <Route path="/maintenance" element={<Maintenance />} />
      <Route path="/supply-chain" element={<SupplyChain />} />
      <Route path="/kitchen" element={<Kitchen />} />
      <Route path="/staff" element={<Staff />} />
      <Route path="/finance" element={<Finance />} />
      <Route path="/erp" element={<ERP />} />
      <Route path="/crm" element={<CRM />} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
