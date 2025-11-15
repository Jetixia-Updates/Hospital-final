import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Patients from "./pages/Patients";
import Departments from "./pages/Departments";
import MedicalRecords from "./pages/MedicalRecords";
import Surgery from "./pages/Surgery";
import Pharmacy from "./pages/Pharmacy";
import Insurance from "./pages/Insurance";
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
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/departments" element={<Departments />} />
        <Route path="/medical-records" element={<MedicalRecords />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/surgery" element={<Surgery />} />
          <Route path="/pharmacy" element={<Pharmacy />} />
          <Route path="/insurance" element={<Insurance />} />
          <Route path="/clinics" element={<Clinics />} />
          <Route path="/emergency" element={<Emergency />} />
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
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
