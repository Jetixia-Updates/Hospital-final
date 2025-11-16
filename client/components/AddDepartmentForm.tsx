import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  X,
  Building2,
  Users,
  Stethoscope,
  Phone,
  Mail,
  MapPin,
  Activity,
  Clock,
  DollarSign,
  Wrench,
  CheckCircle2,
  AlertCircle,
  Calendar,
  Hash,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AddDepartmentFormProps {
  onClose: () => void;
  onSubmit: (departmentData: any) => void;
}

export default function AddDepartmentForm({ onClose, onSubmit }: AddDepartmentFormProps) {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Basic Information
    nameAr: "",
    nameEn: "",
    code: "",
    type: "",
    category: "",
    description: "",
    
    // Location
    building: "",
    floor: "",
    wing: "",
    roomNumbers: "",
    area: "",
    
    // Contact Information
    phone: "",
    extension: "",
    emergencyPhone: "",
    email: "",
    fax: "",
    
    // Staff Information
    headOfDepartment: "",
    deputyHead: "",
    totalStaff: "",
    doctors: "",
    nurses: "",
    technicians: "",
    adminStaff: "",
    
    // Capacity & Resources
    totalBeds: "",
    icuBeds: "",
    operatingRooms: "",
    consultationRooms: "",
    waitingCapacity: "",
    
    // Operating Hours
    workingHours: "",
    startTime: "08:00",
    endTime: "17:00",
    workingDays: [] as string[],
    emergencyService: false,
    availability24x7: false,
    
    // Services & Specializations
    services: [] as string[],
    specializations: [] as string[],
    equipment: "",
    
    // Financial
    operatingBudget: "",
    monthlyRevenue: "",
    insuranceAccepted: true,
    
    // Status
    status: "active",
    openingDate: "",
    accreditation: "",
    certifications: "",
    notes: "",
  });

  const [errors, setErrors] = useState<any>({});
  const [touched, setTouched] = useState<any>({});

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (touched[field]) {
      validateField(field, value);
    }
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    validateField(field, formData[field as keyof typeof formData]);
  };

  const validateField = (field: string, value: any) => {
    let error = "";
    
    switch (field) {
      case "nameAr":
      case "nameEn":
        if (!value || value.trim() === "") {
          error = t('addDepartment.fieldRequired');
        }
        break;
      case "code":
        if (!value || value.trim() === "") {
          error = t('addDepartment.fieldRequired');
        } else if (!/^[A-Z0-9]{2,6}$/.test(value)) {
          error = t('addDepartment.invalidCode');
        }
        break;
      case "phone":
      case "emergencyPhone":
        if (value && !/^[+]?[\d\s-]{10,}$/.test(value)) {
          error = t('addDepartment.invalidPhone');
        }
        break;
      case "email":
        if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = t('addDepartment.invalidEmail');
        }
        break;
    }
    
    setErrors((prev: any) => ({ ...prev, [field]: error }));
    return error === "";
  };

  const validateStep = (step: number): boolean => {
    const fieldsToValidate: { [key: number]: string[] } = {
      1: ["nameAr", "nameEn", "code", "type"],
      2: ["building", "floor", "phone"],
      3: ["headOfDepartment", "totalStaff"],
    };

    const fields = fieldsToValidate[step] || [];
    let isValid = true;

    fields.forEach(field => {
      const valid = validateField(field, formData[field as keyof typeof formData]);
      if (!valid) isValid = false;
      setTouched((prev: any) => ({ ...prev, [field]: true }));
    });

    return isValid;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 5));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    let allValid = true;
    for (let step = 1; step <= 3; step++) {
      if (!validateStep(step)) {
        allValid = false;
      }
    }

    if (allValid) {
      onSubmit(formData);
    } else {
      const firstErrorStep = [1, 2, 3].find(step => !validateStep(step));
      if (firstErrorStep) {
        setCurrentStep(firstErrorStep);
      }
    }
  };

  const toggleWorkingDay = (day: string) => {
    setFormData(prev => ({
      ...prev,
      workingDays: prev.workingDays.includes(day)
        ? prev.workingDays.filter(d => d !== day)
        : [...prev.workingDays, day]
    }));
  };

  const toggleService = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const steps = [
    { number: 1, title: t('addDepartment.basicInfo'), icon: Building2 },
    { number: 2, title: t('addDepartment.locationContact'), icon: MapPin },
    { number: 3, title: t('addDepartment.staffResources'), icon: Users },
    { number: 4, title: t('addDepartment.servicesOperations'), icon: Activity },
    { number: 5, title: t('addDepartment.financialStatus'), icon: DollarSign },
  ];

  const departmentTypes = [
    { value: "clinical", label: t('addDepartment.types.clinical') },
    { value: "surgical", label: t('addDepartment.types.surgical') },
    { value: "diagnostic", label: t('addDepartment.types.diagnostic') },
    { value: "therapeutic", label: t('addDepartment.types.therapeutic') },
    { value: "administrative", label: t('addDepartment.types.administrative') },
    { value: "support", label: t('addDepartment.types.support') },
  ];

  const daysOfWeek = [
    { value: "sunday", label: t('common.sun') },
    { value: "monday", label: t('common.mon') },
    { value: "tuesday", label: t('common.tue') },
    { value: "wednesday", label: t('common.wed') },
    { value: "thursday", label: t('common.thu') },
    { value: "friday", label: t('common.fri') },
    { value: "saturday", label: t('common.sat') },
  ];

  const commonServices = [
    t('addDepartment.services.consultation'),
    t('addDepartment.services.emergency'),
    t('addDepartment.services.surgery'),
    t('addDepartment.services.diagnostics'),
    t('addDepartment.services.therapy'),
    t('addDepartment.services.rehabilitation'),
    t('addDepartment.services.preventive'),
    t('addDepartment.services.research'),
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">{t('addDepartment.title')}</h2>
              <p className="text-blue-100">{t('addDepartment.subtitle')}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.number;
              const isCompleted = currentStep > step.number;
              
              return (
                <div key={step.number} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all ${
                        isActive
                          ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg scale-110"
                          : isCompleted
                          ? "bg-green-500 text-white"
                          : "bg-slate-200 text-slate-500"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-6 h-6" />
                      ) : (
                        <Icon className="w-6 h-6" />
                      )}
                    </div>
                    <span
                      className={`text-xs font-medium text-center hidden md:block ${
                        isActive ? "text-blue-600" : "text-slate-600"
                      }`}
                    >
                      {step.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`h-1 flex-1 mx-2 transition-all ${
                        isCompleted ? "bg-green-500" : "bg-slate-200"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-280px)]">
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <Card className="border-blue-200 shadow-md">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <CardTitle className="flex items-center gap-2 text-blue-900">
                    <Building2 className="w-5 h-5" />
                    {t('addDepartment.basicInfo')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Arabic Name */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        {t('addDepartment.nameAr')} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.nameAr}
                        onChange={(e) => handleInputChange("nameAr", e.target.value)}
                        onBlur={() => handleBlur("nameAr")}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                          errors.nameAr && touched.nameAr
                            ? "border-red-500 focus:ring-red-500"
                            : "border-slate-300 focus:ring-blue-500"
                        }`}
                        placeholder={t('addDepartment.enterNameAr')}
                        dir="rtl"
                      />
                      {errors.nameAr && touched.nameAr && (
                        <p className="text-red-500 text-xs mt-1">{errors.nameAr}</p>
                      )}
                    </div>

                    {/* English Name */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        {t('addDepartment.nameEn')} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.nameEn}
                        onChange={(e) => handleInputChange("nameEn", e.target.value)}
                        onBlur={() => handleBlur("nameEn")}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                          errors.nameEn && touched.nameEn
                            ? "border-red-500 focus:ring-red-500"
                            : "border-slate-300 focus:ring-blue-500"
                        }`}
                        placeholder={t('addDepartment.enterNameEn')}
                      />
                      {errors.nameEn && touched.nameEn && (
                        <p className="text-red-500 text-xs mt-1">{errors.nameEn}</p>
                      )}
                    </div>

                    {/* Department Code */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        {t('addDepartment.code')} <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Hash className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                        <input
                          type="text"
                          value={formData.code}
                          onChange={(e) => handleInputChange("code", e.target.value.toUpperCase())}
                          onBlur={() => handleBlur("code")}
                          className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                            errors.code && touched.code
                              ? "border-red-500 focus:ring-red-500"
                              : "border-slate-300 focus:ring-blue-500"
                          }`}
                          placeholder="CARD01"
                          maxLength={6}
                        />
                      </div>
                      {errors.code && touched.code && (
                        <p className="text-red-500 text-xs mt-1">{errors.code}</p>
                      )}
                    </div>

                    {/* Department Type */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        {t('addDepartment.type')} <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.type}
                        onChange={(e) => handleInputChange("type", e.target.value)}
                        onBlur={() => handleBlur("type")}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                          errors.type && touched.type
                            ? "border-red-500 focus:ring-red-500"
                            : "border-slate-300 focus:ring-blue-500"
                        }`}
                      >
                        <option value="">{t('addDepartment.selectType')}</option>
                        {departmentTypes.map(type => (
                          <option key={type.value} value={type.value}>{type.label}</option>
                        ))}
                      </select>
                      {errors.type && touched.type && (
                        <p className="text-red-500 text-xs mt-1">{errors.type}</p>
                      )}
                    </div>

                    {/* Category */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        {t('addDepartment.category')}
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => handleInputChange("category", e.target.value)}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">{t('addDepartment.selectCategory')}</option>
                        <option value="inpatient">{t('addDepartment.categories.inpatient')}</option>
                        <option value="outpatient">{t('addDepartment.categories.outpatient')}</option>
                        <option value="emergency">{t('addDepartment.categories.emergency')}</option>
                        <option value="diagnostic">{t('addDepartment.categories.diagnostic')}</option>
                        <option value="therapeutic">{t('addDepartment.categories.therapeutic')}</option>
                      </select>
                    </div>

                    {/* Opening Date */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        {t('addDepartment.openingDate')}
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                        <input
                          type="date"
                          value={formData.openingDate}
                          onChange={(e) => handleInputChange("openingDate", e.target.value)}
                          className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    {/* Description */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        {t('addDepartment.description')}
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={3}
                        placeholder={t('addDepartment.enterDescription')}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Step 2: Location & Contact */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <Card className="border-green-200 shadow-md">
                <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                  <CardTitle className="flex items-center gap-2 text-green-900">
                    <MapPin className="w-5 h-5" />
                    {t('addDepartment.locationInfo')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        {t('addDepartment.building')} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.building}
                        onChange={(e) => handleInputChange("building", e.target.value)}
                        onBlur={() => handleBlur("building")}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder={t('addDepartment.enterBuilding')}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        {t('addDepartment.floor')} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.floor}
                        onChange={(e) => handleInputChange("floor", e.target.value)}
                        onBlur={() => handleBlur("floor")}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder={t('addDepartment.enterFloor')}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        {t('addDepartment.wing')}
                      </label>
                      <input
                        type="text"
                        value={formData.wing}
                        onChange={(e) => handleInputChange("wing", e.target.value)}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder={t('addDepartment.enterWing')}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        {t('addDepartment.roomNumbers')}
                      </label>
                      <input
                        type="text"
                        value={formData.roomNumbers}
                        onChange={(e) => handleInputChange("roomNumbers", e.target.value)}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="201-210"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        {t('addDepartment.area')}
                      </label>
                      <input
                        type="text"
                        value={formData.area}
                        onChange={(e) => handleInputChange("area", e.target.value)}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder={t('addDepartment.enterArea')}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-purple-200 shadow-md">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
                  <CardTitle className="flex items-center gap-2 text-purple-900">
                    <Phone className="w-5 h-5" />
                    {t('addDepartment.contactInfo')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        {t('addDepartment.phone')} <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          onBlur={() => handleBlur("phone")}
                          className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="+966 11 234 5678"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        {t('addDepartment.extension')}
                      </label>
                      <input
                        type="text"
                        value={formData.extension}
                        onChange={(e) => handleInputChange("extension", e.target.value)}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="1234"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        {t('addDepartment.emergencyPhone')}
                      </label>
                      <div className="relative">
                        <AlertCircle className="absolute left-3 top-3 w-5 h-5 text-red-400" />
                        <input
                          type="tel"
                          value={formData.emergencyPhone}
                          onChange={(e) => handleInputChange("emergencyPhone", e.target.value)}
                          className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="+966 50 123 4567"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        {t('addDepartment.email')}
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          onBlur={() => handleBlur("email")}
                          className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="department@hospital.com"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Step 3: Staff & Resources */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <Card className="border-indigo-200 shadow-md">
                <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50">
                  <CardTitle className="flex items-center gap-2 text-indigo-900">
                    <Users className="w-5 h-5" />
                    {t('addDepartment.staffInfo')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        {t('addDepartment.headOfDepartment')} <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Stethoscope className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                        <input
                          type="text"
                          value={formData.headOfDepartment}
                          onChange={(e) => handleInputChange("headOfDepartment", e.target.value)}
                          onBlur={() => handleBlur("headOfDepartment")}
                          className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder={t('addDepartment.enterHeadName')}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        {t('addDepartment.deputyHead')}
                      </label>
                      <input
                        type="text"
                        value={formData.deputyHead}
                        onChange={(e) => handleInputChange("deputyHead", e.target.value)}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder={t('addDepartment.enterDeputyName')}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        {t('addDepartment.totalStaff')} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        value={formData.totalStaff}
                        onChange={(e) => handleInputChange("totalStaff", e.target.value)}
                        onBlur={() => handleBlur("totalStaff")}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="50"
                        min="0"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        {t('addDepartment.doctors')}
                      </label>
                      <input
                        type="number"
                        value={formData.doctors}
                        onChange={(e) => handleInputChange("doctors", e.target.value)}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="15"
                        min="0"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        {t('addDepartment.nurses')}
                      </label>
                      <input
                        type="number"
                        value={formData.nurses}
                        onChange={(e) => handleInputChange("nurses", e.target.value)}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="25"
                        min="0"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        {t('addDepartment.technicians')}
                      </label>
                      <input
                        type="number"
                        value={formData.technicians}
                        onChange={(e) => handleInputChange("technicians", e.target.value)}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="8"
                        min="0"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-teal-200 shadow-md">
                <CardHeader className="bg-gradient-to-r from-teal-50 to-cyan-50">
                  <CardTitle className="flex items-center gap-2 text-teal-900">
                    <Activity className="w-5 h-5" />
                    {t('addDepartment.capacityResources')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        {t('addDepartment.totalBeds')}
                      </label>
                      <input
                        type="number"
                        value={formData.totalBeds}
                        onChange={(e) => handleInputChange("totalBeds", e.target.value)}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="30"
                        min="0"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        {t('addDepartment.icuBeds')}
                      </label>
                      <input
                        type="number"
                        value={formData.icuBeds}
                        onChange={(e) => handleInputChange("icuBeds", e.target.value)}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="5"
                        min="0"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        {t('addDepartment.operatingRooms')}
                      </label>
                      <input
                        type="number"
                        value={formData.operatingRooms}
                        onChange={(e) => handleInputChange("operatingRooms", e.target.value)}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="3"
                        min="0"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        {t('addDepartment.consultationRooms')}
                      </label>
                      <input
                        type="number"
                        value={formData.consultationRooms}
                        onChange={(e) => handleInputChange("consultationRooms", e.target.value)}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="10"
                        min="0"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        {t('addDepartment.equipment')}
                      </label>
                      <textarea
                        value={formData.equipment}
                        onChange={(e) => handleInputChange("equipment", e.target.value)}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={2}
                        placeholder={t('addDepartment.enterEquipment')}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Step 4: Services & Operations */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <Card className="border-orange-200 shadow-md">
                <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50">
                  <CardTitle className="flex items-center gap-2 text-orange-900">
                    <Activity className="w-5 h-5" />
                    {t('addDepartment.servicesOffered')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {commonServices.map(service => (
                      <label
                        key={service}
                        className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-blue-50 transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={formData.services.includes(service)}
                          onChange={() => toggleService(service)}
                          className="w-4 h-4 text-blue-600"
                        />
                        <span className="text-sm text-slate-700">{service}</span>
                      </label>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-blue-200 shadow-md">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <CardTitle className="flex items-center gap-2 text-blue-900">
                    <Clock className="w-5 h-5" />
                    {t('addDepartment.operatingHours')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          {t('addDepartment.startTime')}
                        </label>
                        <input
                          type="time"
                          value={formData.startTime}
                          onChange={(e) => handleInputChange("startTime", e.target.value)}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          {t('addDepartment.endTime')}
                        </label>
                        <input
                          type="time"
                          value={formData.endTime}
                          onChange={(e) => handleInputChange("endTime", e.target.value)}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-3">
                        {t('addDepartment.workingDays')}
                      </label>
                      <div className="grid grid-cols-4 md:grid-cols-7 gap-2">
                        {daysOfWeek.map(day => (
                          <button
                            key={day.value}
                            type="button"
                            onClick={() => toggleWorkingDay(day.value)}
                            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                              formData.workingDays.includes(day.value)
                                ? "bg-blue-600 text-white"
                                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                            }`}
                          >
                            {day.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 pt-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.emergencyService}
                          onChange={(e) => handleInputChange("emergencyService", e.target.checked)}
                          className="w-5 h-5 text-red-600"
                        />
                        <span className="text-sm font-medium text-slate-700">
                          {t('addDepartment.emergencyService')}
                        </span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.availability24x7}
                          onChange={(e) => handleInputChange("availability24x7", e.target.checked)}
                          className="w-5 h-5 text-blue-600"
                        />
                        <span className="text-sm font-medium text-slate-700">
                          {t('addDepartment.availability24x7')}
                        </span>
                      </label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Step 5: Financial & Status */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <Card className="border-green-200 shadow-md">
                <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                  <CardTitle className="flex items-center gap-2 text-green-900">
                    <DollarSign className="w-5 h-5" />
                    {t('addDepartment.financialInfo')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        {t('addDepartment.operatingBudget')}
                      </label>
                      <input
                        type="number"
                        value={formData.operatingBudget}
                        onChange={(e) => handleInputChange("operatingBudget", e.target.value)}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="1000000"
                        min="0"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        {t('addDepartment.monthlyRevenue')}
                      </label>
                      <input
                        type="number"
                        value={formData.monthlyRevenue}
                        onChange={(e) => handleInputChange("monthlyRevenue", e.target.value)}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="500000"
                        min="0"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.insuranceAccepted}
                          onChange={(e) => handleInputChange("insuranceAccepted", e.target.checked)}
                          className="w-5 h-5 text-blue-600"
                        />
                        <span className="text-sm font-medium text-slate-700">
                          {t('addDepartment.insuranceAccepted')}
                        </span>
                      </label>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-purple-200 shadow-md">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
                  <CardTitle className="flex items-center gap-2 text-purple-900">
                    <Wrench className="w-5 h-5" />
                    {t('addDepartment.statusAccreditation')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        {t('addDepartment.status')}
                      </label>
                      <select
                        value={formData.status}
                        onChange={(e) => handleInputChange("status", e.target.value)}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="active">{t('common.active')}</option>
                        <option value="inactive">{t('common.inactive')}</option>
                        <option value="under_renovation">{t('addDepartment.underRenovation')}</option>
                        <option value="planned">{t('addDepartment.planned')}</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        {t('addDepartment.accreditation')}
                      </label>
                      <input
                        type="text"
                        value={formData.accreditation}
                        onChange={(e) => handleInputChange("accreditation", e.target.value)}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder={t('addDepartment.enterAccreditation')}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        {t('addDepartment.certifications')}
                      </label>
                      <textarea
                        value={formData.certifications}
                        onChange={(e) => handleInputChange("certifications", e.target.value)}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={2}
                        placeholder={t('addDepartment.enterCertifications')}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        {t('addDepartment.notes')}
                      </label>
                      <textarea
                        value={formData.notes}
                        onChange={(e) => handleInputChange("notes", e.target.value)}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={3}
                        placeholder={t('addDepartment.enterNotes')}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Summary */}
              <Card className="border-blue-200 shadow-md">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <CardTitle className="flex items-center gap-2 text-blue-900">
                    <CheckCircle2 className="w-5 h-5" />
                    {t('addDepartment.reviewSummary')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-slate-600 mb-1">{t('addDepartment.departmentName')}</p>
                      <p className="font-semibold text-slate-900">{formData.nameAr || "-"}</p>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <p className="text-slate-600 mb-1">{t('addDepartment.code')}</p>
                      <p className="font-semibold text-slate-900">{formData.code || "-"}</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="text-slate-600 mb-1">{t('addDepartment.location')}</p>
                      <p className="font-semibold text-slate-900">
                        {formData.building} - {formData.floor || "-"}
                      </p>
                    </div>
                    <div className="p-3 bg-orange-50 rounded-lg">
                      <p className="text-slate-600 mb-1">{t('addDepartment.headOfDepartment')}</p>
                      <p className="font-semibold text-slate-900">{formData.headOfDepartment || "-"}</p>
                    </div>
                    <div className="p-3 bg-indigo-50 rounded-lg">
                      <p className="text-slate-600 mb-1">{t('addDepartment.totalStaff')}</p>
                      <p className="font-semibold text-slate-900">{formData.totalStaff || "0"}</p>
                    </div>
                    <div className="p-3 bg-teal-50 rounded-lg">
                      <p className="text-slate-600 mb-1">{t('addDepartment.totalBeds')}</p>
                      <p className="font-semibold text-slate-900">{formData.totalBeds || "0"}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </form>

        {/* Footer - Navigation Buttons */}
        <div className="bg-slate-50 p-6 border-t border-slate-200 flex items-center justify-between">
          <div className="text-sm text-slate-600">
            {t('addDepartment.step')} {currentStep} {t('addDepartment.of')} 5
          </div>
          <div className="flex gap-3">
            {currentStep > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={handlePrevious}
                className="px-6"
              >
                {t('addDepartment.previous')}
              </Button>
            )}
            {currentStep < 5 ? (
              <Button
                type="button"
                onClick={handleNext}
                className="px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                {t('addDepartment.next')}
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleSubmit}
                className="px-8 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
              >
                <CheckCircle2 className="w-5 h-5 mr-2" />
                {t('addDepartment.submit')}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
