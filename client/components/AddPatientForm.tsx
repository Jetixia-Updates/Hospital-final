import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  X,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Droplet,
  Heart,
  Shield,
  FileText,
  Upload,
  AlertCircle,
  CheckCircle2,
  Users,
  Home,
  Briefcase,
  Activity,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface AddPatientFormProps {
  onClose: () => void;
  onSubmit: (patientData: any) => void;
}

export default function AddPatientForm({ onClose, onSubmit }: AddPatientFormProps) {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: "",
    middleName: "",
    lastName: "",
    arabicName: "",
    dateOfBirth: "",
    gender: "",
    nationality: "",
    nationalId: "",
    passportNumber: "",
    maritalStatus: "",
    
    // Contact Information
    phone: "",
    mobile: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    
    // Emergency Contact
    emergencyContactName: "",
    emergencyContactRelation: "",
    emergencyContactPhone: "",
    emergencyContactAddress: "",
    
    // Medical Information
    bloodType: "",
    height: "",
    weight: "",
    allergies: "",
    chronicDiseases: "",
    currentMedications: "",
    previousSurgeries: "",
    familyHistory: "",
    
    // Insurance Information
    hasInsurance: false,
    insuranceCompany: "",
    insurancePolicyNumber: "",
    insuranceGroupNumber: "",
    insuranceStartDate: "",
    insuranceEndDate: "",
    insuranceCoverage: "",
    
    // Employment Information
    occupation: "",
    employer: "",
    employerPhone: "",
    employerAddress: "",
    
    // Additional Information
    referredBy: "",
    primaryDoctor: "",
    preferredLanguage: "ar",
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
      case "firstName":
      case "lastName":
        if (!value || value.trim() === "") {
          error = t('addPatient.fieldRequired');
        }
        break;
      case "nationalId":
        if (!value || value.trim() === "") {
          error = t('addPatient.fieldRequired');
        } else if (!/^\d{10}$/.test(value)) {
          error = t('addPatient.invalidNationalId');
        }
        break;
      case "phone":
      case "mobile":
        if (!value || value.trim() === "") {
          error = t('addPatient.fieldRequired');
        } else if (!/^[+]?[\d\s-]{10,}$/.test(value)) {
          error = t('addPatient.invalidPhone');
        }
        break;
      case "email":
        if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = t('addPatient.invalidEmail');
        }
        break;
      case "dateOfBirth":
        if (!value || value.trim() === "") {
          error = t('addPatient.fieldRequired');
        }
        break;
    }
    
    setErrors((prev: any) => ({ ...prev, [field]: error }));
    return error === "";
  };

  const validateStep = (step: number): boolean => {
    const fieldsToValidate: { [key: number]: string[] } = {
      1: ["firstName", "lastName", "dateOfBirth", "gender", "nationalId", "nationality"],
      2: ["phone", "mobile", "address", "city", "country"],
      3: ["emergencyContactName", "emergencyContactPhone"],
      4: ["bloodType"],
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
      setCurrentStep(prev => Math.min(prev + 1, 6));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all required fields
    let allValid = true;
    for (let step = 1; step <= 4; step++) {
      if (!validateStep(step)) {
        allValid = false;
      }
    }

    if (allValid) {
      onSubmit(formData);
    } else {
      // Show error message or navigate to first step with errors
      const firstErrorStep = [1, 2, 3, 4].find(step => !validateStep(step));
      if (firstErrorStep) {
        setCurrentStep(firstErrorStep);
      }
    }
  };

  const steps = [
    { number: 1, title: t('addPatient.personalInfo'), icon: User },
    { number: 2, title: t('addPatient.contactInfo'), icon: Phone },
    { number: 3, title: t('addPatient.emergencyContact'), icon: AlertCircle },
    { number: 4, title: t('addPatient.medicalInfo'), icon: Activity },
    { number: 5, title: t('addPatient.insuranceInfo'), icon: Shield },
    { number: 6, title: t('addPatient.additionalInfo'), icon: FileText },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">{t('addPatient.title')}</h2>
              <p className="text-blue-100">{t('addPatient.subtitle')}</p>
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
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <Card className="border-blue-200 shadow-md">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <CardTitle className="flex items-center gap-2 text-blue-900">
                    <User className="w-5 h-5" />
                    {t('addPatient.personalInfo')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* First Name */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        {t('addPatient.firstName')} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        onBlur={() => handleBlur("firstName")}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                          errors.firstName && touched.firstName
                            ? "border-red-500 focus:ring-red-500"
                            : "border-slate-300 focus:ring-blue-500"
                        }`}
                        placeholder={t('addPatient.enterFirstName')}
                      />
                      {errors.firstName && touched.firstName && (
                        <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                      )}
                    </div>

                    {/* Middle Name */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        {t('addPatient.middleName')}
                      </label>
                      <input
                        type="text"
                        value={formData.middleName}
                        onChange={(e) => handleInputChange("middleName", e.target.value)}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder={t('addPatient.enterMiddleName')}
                      />
                    </div>

                    {/* Last Name */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        {t('addPatient.lastName')} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        onBlur={() => handleBlur("lastName")}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                          errors.lastName && touched.lastName
                            ? "border-red-500 focus:ring-red-500"
                            : "border-slate-300 focus:ring-blue-500"
                        }`}
                        placeholder={t('addPatient.enterLastName')}
                      />
                      {errors.lastName && touched.lastName && (
                        <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                      )}
                    </div>

                    {/* Arabic Name */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        {t('addPatient.arabicName')}
                      </label>
                      <input
                        type="text"
                        value={formData.arabicName}
                        onChange={(e) => handleInputChange("arabicName", e.target.value)}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder={t('addPatient.enterArabicName')}
                        dir="rtl"
                      />
                    </div>

                    {/* Date of Birth */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        {t('addPatient.dateOfBirth')} <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                        <input
                          type="date"
                          value={formData.dateOfBirth}
                          onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                          onBlur={() => handleBlur("dateOfBirth")}
                          className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                            errors.dateOfBirth && touched.dateOfBirth
                              ? "border-red-500 focus:ring-red-500"
                              : "border-slate-300 focus:ring-blue-500"
                          }`}
                        />
                      </div>
                      {errors.dateOfBirth && touched.dateOfBirth && (
                        <p className="text-red-500 text-xs mt-1">{errors.dateOfBirth}</p>
                      )}
                    </div>

                    {/* Gender */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        {t('addPatient.gender')} <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.gender}
                        onChange={(e) => handleInputChange("gender", e.target.value)}
                        onBlur={() => handleBlur("gender")}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                          errors.gender && touched.gender
                            ? "border-red-500 focus:ring-red-500"
                            : "border-slate-300 focus:ring-blue-500"
                        }`}
                      >
                        <option value="">{t('addPatient.selectGender')}</option>
                        <option value="male">{t('patients.male')}</option>
                        <option value="female">{t('patients.female')}</option>
                      </select>
                      {errors.gender && touched.gender && (
                        <p className="text-red-500 text-xs mt-1">{errors.gender}</p>
                      )}
                    </div>

                    {/* Marital Status */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        {t('addPatient.maritalStatus')}
                      </label>
                      <select
                        value={formData.maritalStatus}
                        onChange={(e) => handleInputChange("maritalStatus", e.target.value)}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">{t('addPatient.selectMaritalStatus')}</option>
                        <option value="single">{t('addPatient.single')}</option>
                        <option value="married">{t('addPatient.married')}</option>
                        <option value="divorced">{t('addPatient.divorced')}</option>
                        <option value="widowed">{t('addPatient.widowed')}</option>
                      </select>
                    </div>

                    {/* National ID */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        {t('addPatient.nationalId')} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.nationalId}
                        onChange={(e) => handleInputChange("nationalId", e.target.value)}
                        onBlur={() => handleBlur("nationalId")}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                          errors.nationalId && touched.nationalId
                            ? "border-red-500 focus:ring-red-500"
                            : "border-slate-300 focus:ring-blue-500"
                        }`}
                        placeholder="1234567890"
                        maxLength={10}
                      />
                      {errors.nationalId && touched.nationalId && (
                        <p className="text-red-500 text-xs mt-1">{errors.nationalId}</p>
                      )}
                    </div>

                    {/* Passport Number */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        {t('addPatient.passportNumber')}
                      </label>
                      <input
                        type="text"
                        value={formData.passportNumber}
                        onChange={(e) => handleInputChange("passportNumber", e.target.value)}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="A12345678"
                      />
                    </div>

                    {/* Nationality */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        {t('addPatient.nationality')} <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.nationality}
                        onChange={(e) => handleInputChange("nationality", e.target.value)}
                        onBlur={() => handleBlur("nationality")}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                          errors.nationality && touched.nationality
                            ? "border-red-500 focus:ring-red-500"
                            : "border-slate-300 focus:ring-blue-500"
                        }`}
                      >
                        <option value="">{t('addPatient.selectNationality')}</option>
                        <option value="saudi">{t('addPatient.saudi')}</option>
                        <option value="other">{t('addPatient.other')}</option>
                      </select>
                      {errors.nationality && touched.nationality && (
                        <p className="text-red-500 text-xs mt-1">{errors.nationality}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Step 2: Contact Information */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <Card className="border-green-200 shadow-md">
                <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                  <CardTitle className="flex items-center gap-2 text-green-900">
                    <Phone className="w-5 h-5" />
                    {t('addPatient.contactInfo')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        {t('addPatient.phone')} <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          onBlur={() => handleBlur("phone")}
                          className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                            errors.phone && touched.phone
                              ? "border-red-500 focus:ring-red-500"
                              : "border-slate-300 focus:ring-blue-500"
                          }`}
                          placeholder="+966 11 234 5678"
                        />
                      </div>
                      {errors.phone && touched.phone && (
                        <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                      )}
                    </div>

                    {/* Mobile */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        {t('addPatient.mobile')} <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                        <input
                          type="tel"
                          value={formData.mobile}
                          onChange={(e) => handleInputChange("mobile", e.target.value)}
                          onBlur={() => handleBlur("mobile")}
                          className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                            errors.mobile && touched.mobile
                              ? "border-red-500 focus:ring-red-500"
                              : "border-slate-300 focus:ring-blue-500"
                          }`}
                          placeholder="+966 50 123 4567"
                        />
                      </div>
                      {errors.mobile && touched.mobile && (
                        <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        {t('addPatient.email')}
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          onBlur={() => handleBlur("email")}
                          className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                            errors.email && touched.email
                              ? "border-red-500 focus:ring-red-500"
                              : "border-slate-300 focus:ring-blue-500"
                          }`}
                          placeholder="patient@example.com"
                        />
                      </div>
                      {errors.email && touched.email && (
                        <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                      )}
                    </div>

                    {/* Address */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        {t('addPatient.address')} <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                        <input
                          type="text"
                          value={formData.address}
                          onChange={(e) => handleInputChange("address", e.target.value)}
                          onBlur={() => handleBlur("address")}
                          className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                            errors.address && touched.address
                              ? "border-red-500 focus:ring-red-500"
                              : "border-slate-300 focus:ring-blue-500"
                          }`}
                          placeholder={t('addPatient.enterAddress')}
                        />
                      </div>
                      {errors.address && touched.address && (
                        <p className="text-red-500 text-xs mt-1">{errors.address}</p>
                      )}
                    </div>

                    {/* City */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        {t('addPatient.city')} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        onBlur={() => handleBlur("city")}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                          errors.city && touched.city
                            ? "border-red-500 focus:ring-red-500"
                            : "border-slate-300 focus:ring-blue-500"
                        }`}
                        placeholder={t('addPatient.enterCity')}
                      />
                      {errors.city && touched.city && (
                        <p className="text-red-500 text-xs mt-1">{errors.city}</p>
                      )}
                    </div>

                    {/* State/Province */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        {t('addPatient.state')}
                      </label>
                      <input
                        type="text"
                        value={formData.state}
                        onChange={(e) => handleInputChange("state", e.target.value)}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder={t('addPatient.enterState')}
                      />
                    </div>

                    {/* ZIP Code */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        {t('addPatient.zipCode')}
                      </label>
                      <input
                        type="text"
                        value={formData.zipCode}
                        onChange={(e) => handleInputChange("zipCode", e.target.value)}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="12345"
                      />
                    </div>

                    {/* Country */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        {t('addPatient.country')} <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.country}
                        onChange={(e) => handleInputChange("country", e.target.value)}
                        onBlur={() => handleBlur("country")}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                          errors.country && touched.country
                            ? "border-red-500 focus:ring-red-500"
                            : "border-slate-300 focus:ring-blue-500"
                        }`}
                      >
                        <option value="">{t('addPatient.selectCountry')}</option>
                        <option value="saudi">{t('addPatient.saudiArabia')}</option>
                        <option value="uae">{t('addPatient.uae')}</option>
                        <option value="kuwait">{t('addPatient.kuwait')}</option>
                        <option value="other">{t('addPatient.other')}</option>
                      </select>
                      {errors.country && touched.country && (
                        <p className="text-red-500 text-xs mt-1">{errors.country}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Step 3: Emergency Contact */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <Card className="border-red-200 shadow-md">
                <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50">
                  <CardTitle className="flex items-center gap-2 text-red-900">
                    <AlertCircle className="w-5 h-5" />
                    {t('addPatient.emergencyContact')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Emergency Contact Name */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        {t('addPatient.emergencyContactName')} <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Users className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                        <input
                          type="text"
                          value={formData.emergencyContactName}
                          onChange={(e) => handleInputChange("emergencyContactName", e.target.value)}
                          onBlur={() => handleBlur("emergencyContactName")}
                          className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                            errors.emergencyContactName && touched.emergencyContactName
                              ? "border-red-500 focus:ring-red-500"
                              : "border-slate-300 focus:ring-blue-500"
                          }`}
                          placeholder={t('addPatient.enterContactName')}
                        />
                      </div>
                      {errors.emergencyContactName && touched.emergencyContactName && (
                        <p className="text-red-500 text-xs mt-1">{errors.emergencyContactName}</p>
                      )}
                    </div>

                    {/* Relation */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        {t('addPatient.relation')}
                      </label>
                      <select
                        value={formData.emergencyContactRelation}
                        onChange={(e) => handleInputChange("emergencyContactRelation", e.target.value)}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">{t('addPatient.selectRelation')}</option>
                        <option value="spouse">{t('addPatient.spouse')}</option>
                        <option value="parent">{t('addPatient.parent')}</option>
                        <option value="child">{t('addPatient.child')}</option>
                        <option value="sibling">{t('addPatient.sibling')}</option>
                        <option value="friend">{t('addPatient.friend')}</option>
                        <option value="other">{t('addPatient.other')}</option>
                      </select>
                    </div>

                    {/* Emergency Phone */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        {t('addPatient.emergencyPhone')} <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                        <input
                          type="tel"
                          value={formData.emergencyContactPhone}
                          onChange={(e) => handleInputChange("emergencyContactPhone", e.target.value)}
                          onBlur={() => handleBlur("emergencyContactPhone")}
                          className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                            errors.emergencyContactPhone && touched.emergencyContactPhone
                              ? "border-red-500 focus:ring-red-500"
                              : "border-slate-300 focus:ring-blue-500"
                          }`}
                          placeholder="+966 50 123 4567"
                        />
                      </div>
                      {errors.emergencyContactPhone && touched.emergencyContactPhone && (
                        <p className="text-red-500 text-xs mt-1">{errors.emergencyContactPhone}</p>
                      )}
                    </div>

                    {/* Emergency Address */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        {t('addPatient.emergencyAddress')}
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                        <input
                          type="text"
                          value={formData.emergencyContactAddress}
                          onChange={(e) => handleInputChange("emergencyContactAddress", e.target.value)}
                          className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder={t('addPatient.enterAddress')}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Step 4: Medical Information */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <Card className="border-purple-200 shadow-md">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
                  <CardTitle className="flex items-center gap-2 text-purple-900">
                    <Activity className="w-5 h-5" />
                    {t('addPatient.medicalInfo')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Blood Type */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        {t('addPatient.bloodType')} <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Droplet className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                        <select
                          value={formData.bloodType}
                          onChange={(e) => handleInputChange("bloodType", e.target.value)}
                          onBlur={() => handleBlur("bloodType")}
                          className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                            errors.bloodType && touched.bloodType
                              ? "border-red-500 focus:ring-red-500"
                              : "border-slate-300 focus:ring-blue-500"
                          }`}
                        >
                          <option value="">{t('addPatient.selectBloodType')}</option>
                          <option value="A+">A+</option>
                          <option value="A-">A-</option>
                          <option value="B+">B+</option>
                          <option value="B-">B-</option>
                          <option value="AB+">AB+</option>
                          <option value="AB-">AB-</option>
                          <option value="O+">O+</option>
                          <option value="O-">O-</option>
                        </select>
                      </div>
                      {errors.bloodType && touched.bloodType && (
                        <p className="text-red-500 text-xs mt-1">{errors.bloodType}</p>
                      )}
                    </div>

                    {/* Height */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        {t('addPatient.height')} (cm)
                      </label>
                      <input
                        type="number"
                        value={formData.height}
                        onChange={(e) => handleInputChange("height", e.target.value)}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="170"
                        min="0"
                        max="300"
                      />
                    </div>

                    {/* Weight */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        {t('addPatient.weight')} (kg)
                      </label>
                      <input
                        type="number"
                        value={formData.weight}
                        onChange={(e) => handleInputChange("weight", e.target.value)}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="70"
                        min="0"
                        max="500"
                      />
                    </div>

                    {/* Allergies */}
                    <div className="md:col-span-2 lg:col-span-3">
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        {t('addPatient.allergies')}
                      </label>
                      <textarea
                        value={formData.allergies}
                        onChange={(e) => handleInputChange("allergies", e.target.value)}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={2}
                        placeholder={t('addPatient.enterAllergies')}
                      />
                    </div>

                    {/* Chronic Diseases */}
                    <div className="md:col-span-2 lg:col-span-3">
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        {t('addPatient.chronicDiseases')}
                      </label>
                      <textarea
                        value={formData.chronicDiseases}
                        onChange={(e) => handleInputChange("chronicDiseases", e.target.value)}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={2}
                        placeholder={t('addPatient.enterChronicDiseases')}
                      />
                    </div>

                    {/* Current Medications */}
                    <div className="md:col-span-2 lg:col-span-3">
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        {t('addPatient.currentMedications')}
                      </label>
                      <textarea
                        value={formData.currentMedications}
                        onChange={(e) => handleInputChange("currentMedications", e.target.value)}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={2}
                        placeholder={t('addPatient.enterCurrentMedications')}
                      />
                    </div>

                    {/* Previous Surgeries */}
                    <div className="md:col-span-2 lg:col-span-3">
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        {t('addPatient.previousSurgeries')}
                      </label>
                      <textarea
                        value={formData.previousSurgeries}
                        onChange={(e) => handleInputChange("previousSurgeries", e.target.value)}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={2}
                        placeholder={t('addPatient.enterPreviousSurgeries')}
                      />
                    </div>

                    {/* Family History */}
                    <div className="md:col-span-2 lg:col-span-3">
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        {t('addPatient.familyHistory')}
                      </label>
                      <textarea
                        value={formData.familyHistory}
                        onChange={(e) => handleInputChange("familyHistory", e.target.value)}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={2}
                        placeholder={t('addPatient.enterFamilyHistory')}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Step 5: Insurance Information */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <Card className="border-indigo-200 shadow-md">
                <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50">
                  <CardTitle className="flex items-center gap-2 text-indigo-900">
                    <Shield className="w-5 h-5" />
                    {t('addPatient.insuranceInfo')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {/* Has Insurance Checkbox */}
                    <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                      <input
                        type="checkbox"
                        id="hasInsurance"
                        checked={formData.hasInsurance}
                        onChange={(e) => handleInputChange("hasInsurance", e.target.checked)}
                        className="w-5 h-5 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="hasInsurance" className="text-sm font-medium text-slate-700 cursor-pointer">
                        {t('addPatient.patientHasInsurance')}
                      </label>
                    </div>

                    {formData.hasInsurance && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                        {/* Insurance Company */}
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            {t('addPatient.insuranceCompany')}
                          </label>
                          <select
                            value={formData.insuranceCompany}
                            onChange={(e) => handleInputChange("insuranceCompany", e.target.value)}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="">{t('addPatient.selectInsuranceCompany')}</option>
                            <option value="bupa">Bupa</option>
                            <option value="tawuniya">Tawuniya</option>
                            <option value="medgulf">MedGulf</option>
                            <option value="axa">AXA</option>
                            <option value="alrajhi">Al Rajhi Takaful</option>
                            <option value="other">{t('addPatient.other')}</option>
                          </select>
                        </div>

                        {/* Policy Number */}
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            {t('addPatient.policyNumber')}
                          </label>
                          <input
                            type="text"
                            value={formData.insurancePolicyNumber}
                            onChange={(e) => handleInputChange("insurancePolicyNumber", e.target.value)}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="POL-123456"
                          />
                        </div>

                        {/* Group Number */}
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            {t('addPatient.groupNumber')}
                          </label>
                          <input
                            type="text"
                            value={formData.insuranceGroupNumber}
                            onChange={(e) => handleInputChange("insuranceGroupNumber", e.target.value)}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="GRP-789"
                          />
                        </div>

                        {/* Coverage Type */}
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            {t('addPatient.coverageType')}
                          </label>
                          <select
                            value={formData.insuranceCoverage}
                            onChange={(e) => handleInputChange("insuranceCoverage", e.target.value)}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="">{t('addPatient.selectCoverage')}</option>
                            <option value="basic">{t('addPatient.basic')}</option>
                            <option value="standard">{t('addPatient.standard')}</option>
                            <option value="premium">{t('addPatient.premium')}</option>
                            <option value="comprehensive">{t('addPatient.comprehensive')}</option>
                          </select>
                        </div>

                        {/* Start Date */}
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            {t('addPatient.insuranceStartDate')}
                          </label>
                          <input
                            type="date"
                            value={formData.insuranceStartDate}
                            onChange={(e) => handleInputChange("insuranceStartDate", e.target.value)}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        {/* End Date */}
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            {t('addPatient.insuranceEndDate')}
                          </label>
                          <input
                            type="date"
                            value={formData.insuranceEndDate}
                            onChange={(e) => handleInputChange("insuranceEndDate", e.target.value)}
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Step 6: Additional Information */}
          {currentStep === 6 && (
            <div className="space-y-6">
              <Card className="border-teal-200 shadow-md">
                <CardHeader className="bg-gradient-to-r from-teal-50 to-cyan-50">
                  <CardTitle className="flex items-center gap-2 text-teal-900">
                    <FileText className="w-5 h-5" />
                    {t('addPatient.additionalInfo')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Occupation */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        {t('addPatient.occupation')}
                      </label>
                      <div className="relative">
                        <Briefcase className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                        <input
                          type="text"
                          value={formData.occupation}
                          onChange={(e) => handleInputChange("occupation", e.target.value)}
                          className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder={t('addPatient.enterOccupation')}
                        />
                      </div>
                    </div>

                    {/* Employer */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        {t('addPatient.employer')}
                      </label>
                      <input
                        type="text"
                        value={formData.employer}
                        onChange={(e) => handleInputChange("employer", e.target.value)}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder={t('addPatient.enterEmployer')}
                      />
                    </div>

                    {/* Referred By */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        {t('addPatient.referredBy')}
                      </label>
                      <input
                        type="text"
                        value={formData.referredBy}
                        onChange={(e) => handleInputChange("referredBy", e.target.value)}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder={t('addPatient.enterReferredBy')}
                      />
                    </div>

                    {/* Primary Doctor */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        {t('addPatient.primaryDoctor')}
                      </label>
                      <select
                        value={formData.primaryDoctor}
                        onChange={(e) => handleInputChange("primaryDoctor", e.target.value)}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">{t('addPatient.selectDoctor')}</option>
                        <option value="dr-ahmed">Dr. Ahmed Mohammed</option>
                        <option value="dr-fatima">Dr. Fatima Al-Rashid</option>
                        <option value="dr-hassan">Dr. Hassan Al-Harbi</option>
                        <option value="dr-layla">Dr. Layla Mahmoud</option>
                      </select>
                    </div>

                    {/* Preferred Language */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        {t('addPatient.preferredLanguage')}
                      </label>
                      <select
                        value={formData.preferredLanguage}
                        onChange={(e) => handleInputChange("preferredLanguage", e.target.value)}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="ar">{t('addPatient.arabic')}</option>
                        <option value="en">{t('addPatient.english')}</option>
                        <option value="both">{t('addPatient.both')}</option>
                      </select>
                    </div>

                    {/* Notes */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        {t('addPatient.notes')}
                      </label>
                      <textarea
                        value={formData.notes}
                        onChange={(e) => handleInputChange("notes", e.target.value)}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={4}
                        placeholder={t('addPatient.enterNotes')}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Summary Card */}
              <Card className="border-green-200 shadow-md">
                <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                  <CardTitle className="flex items-center gap-2 text-green-900">
                    <CheckCircle2 className="w-5 h-5" />
                    {t('addPatient.reviewSummary')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-slate-600 mb-1">{t('addPatient.patientName')}</p>
                      <p className="font-semibold text-slate-900">
                        {formData.firstName} {formData.middleName} {formData.lastName}
                      </p>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <p className="text-slate-600 mb-1">{t('addPatient.nationalId')}</p>
                      <p className="font-semibold text-slate-900">{formData.nationalId || "-"}</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="text-slate-600 mb-1">{t('addPatient.mobile')}</p>
                      <p className="font-semibold text-slate-900">{formData.mobile || "-"}</p>
                    </div>
                    <div className="p-3 bg-red-50 rounded-lg">
                      <p className="text-slate-600 mb-1">{t('addPatient.bloodType')}</p>
                      <p className="font-semibold text-slate-900">{formData.bloodType || "-"}</p>
                    </div>
                    <div className="p-3 bg-indigo-50 rounded-lg">
                      <p className="text-slate-600 mb-1">{t('addPatient.insurance')}</p>
                      <p className="font-semibold text-slate-900">
                        {formData.hasInsurance ? formData.insuranceCompany || t('addPatient.yes') : t('addPatient.no')}
                      </p>
                    </div>
                    <div className="p-3 bg-yellow-50 rounded-lg">
                      <p className="text-slate-600 mb-1">{t('addPatient.emergencyContact')}</p>
                      <p className="font-semibold text-slate-900">
                        {formData.emergencyContactName || "-"}
                      </p>
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
            {t('addPatient.step')} {currentStep} {t('addPatient.of')} 6
          </div>
          <div className="flex gap-3">
            {currentStep > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={handlePrevious}
                className="px-6"
              >
                {t('addPatient.previous')}
              </Button>
            )}
            {currentStep < 6 ? (
              <Button
                type="button"
                onClick={handleNext}
                className="px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                {t('addPatient.next')}
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleSubmit}
                className="px-8 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
              >
                <CheckCircle2 className="w-5 h-5 mr-2" />
                {t('addPatient.submit')}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
