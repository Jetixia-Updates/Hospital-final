import Layout from "@/components/Layout";
import {
  Search,
  UtensilsCrossed,
  Apple,
  Plus,
  Filter,
  Clock,
  Users,
  AlertCircle,
  ArrowRight,
  Utensils,
  Leaf,
  ChefHat,
  Calendar,
  TrendingUp,
  Download,
  Edit,
  Trash2,
  Eye,
  ShoppingCart,
  Package,
  CheckCircle2,
  XCircle,
  BarChart3,
  Activity,
  Star,
  ThermometerSun,
  Scale,
  Heart,
  Zap,
  ClipboardList,
  FileText,
  Settings,
  Bell,
  AlertTriangle,
} from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

const MenuItemCard = ({
  name,
  category,
  calories,
  protein,
  ingredients,
  allergens,
  availability,
}: {
  name: string;
  category: string;
  calories: number;
  protein: string;
  ingredients: string[];
  allergens: string[];
  availability: "available" | "limited" | "unavailable";
}) => {
  const availConfig = {
    available: { bg: "bg-green-50", badge: "Available", color: "text-green-700" },
    limited: { bg: "bg-yellow-50", badge: "Limited", color: "text-yellow-700" },
    unavailable: {
      bg: "bg-red-50",
      badge: "Unavailable",
      color: "text-red-700",
    },
  };

  const config = availConfig[availability];

  return (
    <div className={`${config.bg} rounded-lg border border-slate-200 p-6 hover:shadow-md transition-shadow`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{name}</h3>
          <p className="text-sm text-slate-500">{category}</p>
        </div>
        <span className={`text-xs font-semibold px-3 py-1 rounded-full bg-white border ${config.color} border-current`}>
          {config.badge}
        </span>
      </div>

      <div className="space-y-2 text-sm text-slate-600 mb-4">
        <div className="flex items-center justify-between">
          <span>Calories:</span>
          <span className="font-medium text-slate-900">{calories} kcal</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Protein:</span>
          <span className="font-medium text-slate-900">{protein}</span>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-xs text-slate-600 uppercase tracking-wide mb-2">Main Ingredients</p>
        <div className="flex flex-wrap gap-1">
          {ingredients.map((ing, i) => (
            <span
              key={i}
              className="text-xs bg-white px-2 py-1 rounded border border-slate-200"
            >
              {ing}
            </span>
          ))}
        </div>
      </div>

      {allergens.length > 0 && (
        <div className="mb-4">
          <p className="text-xs text-red-700 uppercase tracking-wide font-semibold mb-2">
            ⚠️ Allergens
          </p>
          <div className="flex flex-wrap gap-1">
            {allergens.map((allergen, i) => (
              <span key={i} className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">
                {allergen}
              </span>
            ))}
          </div>
        </div>
      )}

      <button className="w-full bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-2">
        View Recipe <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};

const DietPlanCard = ({
  name,
  purpose,
  restrictions,
  mealsPerDay,
  patients,
  duration,
  status,
}: {
  name: string;
  purpose: string;
  restrictions: string[];
  mealsPerDay: number;
  patients: number;
  duration: string;
  status: "active" | "inactive" | "planned";
}) => {
  const statusConfig = {
    active: { bg: "bg-green-50", badge: "Active", color: "text-green-700" },
    inactive: { bg: "bg-slate-50", badge: "Inactive", color: "text-slate-700" },
    planned: { bg: "bg-blue-50", badge: "Planned", color: "text-blue-700" },
  };

  const config = statusConfig[status];

  return (
    <div className={`${config.bg} rounded-lg border border-slate-200 p-6 hover:shadow-md transition-shadow`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{name}</h3>
          <p className="text-sm text-slate-500">{purpose}</p>
        </div>
        <span className={`text-xs font-semibold px-3 py-1 rounded-full bg-white border ${config.color} border-current`}>
          {config.badge}
        </span>
      </div>

      <div className="space-y-3 text-sm text-slate-600 mb-4">
        <div className="flex items-center justify-between">
          <span>Patients on Plan:</span>
          <span className="font-bold text-slate-900">{patients}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Meals Per Day:</span>
          <span className="font-medium text-slate-900">{mealsPerDay}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Duration:</span>
          <span className="font-medium text-slate-900">{duration}</span>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-xs text-slate-600 uppercase tracking-wide mb-2">Dietary Restrictions</p>
        <div className="flex flex-wrap gap-1">
          {restrictions.map((restriction, i) => (
            <span
              key={i}
              className="text-xs bg-white px-2 py-1 rounded border border-slate-200"
            >
              {restriction}
            </span>
          ))}
        </div>
      </div>

      <button className="w-full bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-2">
        Edit Plan <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};

const MealSchedule = ({
  date,
  mealType,
  items,
  portions,
  preparedBy,
  deliveryTime,
}: {
  date: string;
  mealType: string;
  items: string[];
  portions: number;
  preparedBy: string;
  deliveryTime: string;
}) => (
  <div className="border-b border-slate-200 py-4 last:border-b-0">
    <div className="flex items-start justify-between mb-3">
      <div>
        <h4 className="font-semibold text-slate-900">
          {mealType} - {date}
        </h4>
        <p className="text-xs text-slate-500">Prepared by: {preparedBy}</p>
      </div>
      <span className="text-xs font-semibold px-2 py-1 rounded bg-blue-100 text-blue-700">
        {portions} portions
      </span>
    </div>
    <div className="grid grid-cols-2 gap-4 text-sm">
      <div>
        <p className="text-slate-600">Menu Items</p>
        <ul className="mt-1 space-y-1">
          {items.map((item, i) => (
            <li key={i} className="text-sm text-slate-900">
              • {item}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className="text-slate-600">Delivery Time</p>
        <p className="mt-1 font-semibold text-slate-900">{deliveryTime}</p>
      </div>
    </div>
  </div>
);

export default function Kitchen() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isAddItemDialogOpen, setIsAddItemDialogOpen] = useState(false);
  const [isAddPlanDialogOpen, setIsAddPlanDialogOpen] = useState(false);
  const [isAddOrderDialogOpen, setIsAddOrderDialogOpen] = useState(false);
  const [isAddPatientMealDialogOpen, setIsAddPatientMealDialogOpen] = useState(false);
  const [isInventoryDialogOpen, setIsInventoryDialogOpen] = useState(false);
  
  const [itemForm, setItemForm] = useState({
    name: "",
    category: "",
    calories: "",
    protein: "",
    carbs: "",
    fats: "",
    fiber: "",
    ingredients: "",
    allergens: "",
    preparationTime: "",
    price: "",
  });
  
  const [planForm, setPlanForm] = useState({
    name: "",
    purpose: "",
    restrictions: "",
    mealsPerDay: "",
    duration: "",
    targetCalories: "",
    targetProtein: "",
    notes: "",
  });

  const [orderForm, setOrderForm] = useState({
    patientId: "",
    patientName: "",
    roomNumber: "",
    mealType: "breakfast",
    specialInstructions: "",
    dietaryRestrictions: "",
    deliveryTime: "",
  });

  const [patientMealForm, setPatientMealForm] = useState({
    patientId: "",
    patientName: "",
    dietPlan: "",
    allergies: "",
    preferences: "",
    restrictions: "",
    dailyCalories: "",
    notes: "",
  });

  const [inventoryForm, setInventoryForm] = useState({
    itemName: "",
    category: "vegetables",
    quantity: "",
    unit: "kg",
    expiryDate: "",
    supplier: "",
    reorderLevel: "",
  });

  const menuItems = [
    {
      name: "Grilled Chicken Breast with Rice",
      category: "Main Course",
      calories: 450,
      protein: "35g",
      ingredients: ["Chicken", "Rice", "Olive Oil", "Herbs"],
      allergens: [],
      availability: "available" as const,
    },
    {
      name: "Vegetable Soup",
      category: "Soup",
      calories: 150,
      protein: "8g",
      ingredients: ["Carrots", "Celery", "Onion", "Broth"],
      allergens: ["Celery"],
      availability: "available" as const,
    },
    {
      name: "Fresh Salad with Olive Oil",
      category: "Salad",
      calories: 200,
      protein: "12g",
      ingredients: ["Lettuce", "Tomato", "Cucumber", "Olive Oil"],
      allergens: [],
      availability: "available" as const,
    },
    {
      name: "Grilled Fish with Lemon",
      category: "Main Course",
      calories: 350,
      protein: "40g",
      ingredients: ["Fish Fillet", "Lemon", "Olive Oil", "Garlic"],
      allergens: ["Fish"],
      availability: "limited" as const,
    },
    {
      name: "Low-Sodium Pasta",
      category: "Main Course",
      calories: 300,
      protein: "15g",
      ingredients: ["Pasta", "Tomato Sauce", "Olive Oil"],
      allergens: ["Wheat"],
      availability: "available" as const,
    },
  ];

  const dietPlans = [
    {
      name: "Post-Surgery Recovery Diet",
      purpose: "Easy digestion and recovery",
      restrictions: ["Low Fiber", "Bland", "Easy to Chew"],
      mealsPerDay: 4,
      patients: 12,
      duration: "2-4 weeks",
      status: "active" as const,
    },
    {
      name: "Diabetic Management Plan",
      purpose: "Blood sugar control",
      restrictions: ["Low Sugar", "Controlled Carbs", "Low Sodium"],
      mealsPerDay: 3,
      patients: 28,
      duration: "Ongoing",
      status: "active" as const,
    },
    {
      name: "Cardiac Health Diet",
      purpose: "Heart disease management",
      restrictions: ["Low Fat", "Low Sodium", "High Fiber"],
      mealsPerDay: 3,
      patients: 18,
      duration: "Ongoing",
      status: "active" as const,
    },
    {
      name: "Renal Disease Diet",
      purpose: "Kidney function support",
      restrictions: ["Low Potassium", "Low Phosphorus", "Protein Controlled"],
      mealsPerDay: 3,
      patients: 8,
      duration: "Ongoing",
      status: "active" as const,
    },
  ];

  const schedule = [
    {
      date: "Jan 19, 2024",
      mealType: "Breakfast",
      items: ["Oatmeal with Honey", "Fresh Fruit"],
      portions: 45,
      preparedBy: "Chef Hassan",
      deliveryTime: "7:30 AM",
    },
    {
      date: "Jan 19, 2024",
      mealType: "Lunch",
      items: ["Grilled Chicken", "Rice", "Vegetable Medley"],
      portions: 85,
      preparedBy: "Chef Fatima",
      deliveryTime: "12:30 PM",
    },
    {
      date: "Jan 19, 2024",
      mealType: "Dinner",
      items: ["Fish Fillet", "Quinoa", "Steamed Vegetables"],
      portions: 75,
      preparedBy: "Chef Mohammed",
      deliveryTime: "6:00 PM",
    },
  ];

  // Mock data for patient meal orders
  const patientOrders = [
    { id: "ORD001", patientName: "Ahmed Mohammed", room: "201", mealType: "Breakfast", status: "preparing", time: "7:30 AM", dietPlan: "Diabetic", specialInstructions: "No sugar" },
    { id: "ORD002", patientName: "Sara Al-Rashid", room: "305", mealType: "Lunch", status: "ready", time: "12:30 PM", dietPlan: "Cardiac", specialInstructions: "Low sodium" },
    { id: "ORD003", patientName: "Mohammed Al-Harbi", room: "102", mealType: "Dinner", status: "delivered", time: "6:00 PM", dietPlan: "Post-Surgery", specialInstructions: "Soft food only" },
  ];

  // Mock data for inventory
  const inventory = [
    { id: "INV001", name: "Fresh Vegetables", category: "Vegetables", quantity: 150, unit: "kg", status: "good", expiryDate: "Jan 25, 2024", reorderLevel: 50 },
    { id: "INV002", name: "Chicken Breast", category: "Protein", quantity: 25, unit: "kg", status: "low", expiryDate: "Jan 22, 2024", reorderLevel: 30 },
    { id: "INV003", name: "Rice", category: "Grains", quantity: 180, unit: "kg", status: "good", expiryDate: "Mar 15, 2024", reorderLevel: 100 },
    { id: "INV004", name: "Olive Oil", category: "Oils", quantity: 15, unit: "L", status: "critical", expiryDate: "Jun 30, 2024", reorderLevel: 20 },
    { id: "INV005", name: "Fresh Fruits", category: "Fruits", quantity: 80, unit: "kg", status: "good", expiryDate: "Jan 23, 2024", reorderLevel: 40 },
  ];

  // Mock data for nutritionist consultations
  const consultations = [
    { id: "CON001", patientName: "Fatima Al-Dosari", date: "Jan 20, 2024", nutritionist: "Dr. Layla Ahmed", type: "Initial Assessment", status: "scheduled" },
    { id: "CON002", patientName: "Khalid Al-Mutairi", date: "Jan 19, 2024", nutritionist: "Dr. Layla Ahmed", type: "Follow-up", status: "completed" },
    { id: "CON003", patientName: "Noor Al-Otaibi", date: "Jan 21, 2024", nutritionist: "Dr. Sara Al-Ghamdi", type: "Diet Plan Review", status: "scheduled" },
  ];

  const filteredMenuItems = menuItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (categoryFilter === "all" || item.category === categoryFilter)
  );

  const totalPatients = dietPlans.reduce((sum, plan) => sum + plan.patients, 0);
  const mealsPerDay = schedule.reduce((sum, meal) => sum + meal.portions, 0);
  const lowStockItems = inventory.filter(item => item.status === "low" || item.status === "critical").length;

  return (
    <Layout>
      <div className="space-y-6">
        {/* Enhanced Header with Gradient */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 p-8 text-white shadow-xl">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-white/20 p-4 backdrop-blur-sm">
                <ChefHat className="h-10 w-10" />
              </div>
              <div>
                <h1 className="text-4xl font-bold">{t("navigation.kitchen")}</h1>
                <p className="mt-2 text-emerald-50">Complete nutrition and meal management system</p>
                <div className="mt-3 flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {mealsPerDay} meals today
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {totalPatients} patients served
                  </span>
                  <span className="flex items-center gap-1">
                    <Package className="h-4 w-4" />
                    {lowStockItems} low stock alerts
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <Button 
                variant="secondary" 
                className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm"
              >
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
              <Button 
                onClick={() => setIsAddItemDialogOpen(true)}
                className="bg-white text-emerald-600 hover:bg-emerald-50 shadow-lg"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Menu Item
              </Button>
            </div>
          </div>
        </div>

        {/* Enhanced Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <Card className="overflow-hidden border-l-4 border-l-emerald-500 hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-600">Menu Items</CardTitle>
                <div className="rounded-full bg-gradient-to-br from-emerald-100 to-emerald-200 p-2">
                  <Utensils className="h-5 w-5 text-emerald-600" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-bold text-gray-900">{menuItems.length}</p>
                <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">Active</Badge>
              </div>
              <p className="mt-2 text-xs text-gray-500">Available in system</p>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-l-4 border-l-blue-500 hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-600">Diet Plans</CardTitle>
                <div className="rounded-full bg-gradient-to-br from-blue-100 to-blue-200 p-2">
                  <ClipboardList className="h-5 w-5 text-blue-600" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-bold text-gray-900">{dietPlans.length}</p>
                <Badge variant="secondary" className="bg-blue-100 text-blue-700">Plans</Badge>
              </div>
              <p className="mt-2 text-xs text-gray-500">Specialized diet programs</p>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-l-4 border-l-teal-500 hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-600">Patients Served</CardTitle>
                <div className="rounded-full bg-gradient-to-br from-teal-100 to-teal-200 p-2">
                  <Heart className="h-5 w-5 text-teal-600" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-bold text-gray-900">{totalPatients}</p>
                <Badge variant="secondary" className="bg-teal-100 text-teal-700">Today</Badge>
              </div>
              <p className="mt-2 text-xs text-gray-500">On specialized diet plans</p>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-l-4 border-l-orange-500 hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-600">Daily Meals</CardTitle>
                <div className="rounded-full bg-gradient-to-br from-orange-100 to-orange-200 p-2">
                  <Activity className="h-5 w-5 text-orange-600" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-bold text-gray-900">{mealsPerDay}</p>
                <Badge variant="secondary" className="bg-orange-100 text-orange-700">Portions</Badge>
              </div>
              <p className="mt-2 text-xs text-gray-500">Scheduled for today</p>
            </CardContent>
          </Card>

          <Card className={`overflow-hidden border-l-4 ${lowStockItems > 0 ? 'border-l-red-500 bg-red-50/30' : 'border-l-green-500'} hover:shadow-lg transition-all duration-300`}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-600">Inventory Status</CardTitle>
                <div className={`rounded-full bg-gradient-to-br ${lowStockItems > 0 ? 'from-red-100 to-red-200' : 'from-green-100 to-green-200'} p-2`}>
                  <Package className={`h-5 w-5 ${lowStockItems > 0 ? 'text-red-600' : 'text-green-600'}`} />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <p className={`text-3xl font-bold ${lowStockItems > 0 ? 'text-red-600' : 'text-green-600'}`}>{lowStockItems}</p>
                <Badge variant="secondary" className={lowStockItems > 0 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}>
                  {lowStockItems > 0 ? 'Alerts' : 'Good'}
                </Badge>
              </div>
              <p className="mt-2 text-xs text-gray-500">Low stock items</p>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Tabs System */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-7 lg:w-auto lg:inline-grid bg-white p-1 rounded-lg shadow-sm border">
            <TabsTrigger value="overview" className="gap-2">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="menu" className="gap-2">
              <Utensils className="h-4 w-4" />
              <span className="hidden sm:inline">Menu Items</span>
            </TabsTrigger>
            <TabsTrigger value="diet-plans" className="gap-2">
              <ClipboardList className="h-4 w-4" />
              <span className="hidden sm:inline">Diet Plans</span>
            </TabsTrigger>
            <TabsTrigger value="patients" className="gap-2">
              <Heart className="h-4 w-4" />
              <span className="hidden sm:inline">Patient Meals</span>
            </TabsTrigger>
            <TabsTrigger value="orders" className="gap-2">
              <ShoppingCart className="h-4 w-4" />
              <span className="hidden sm:inline">Orders</span>
            </TabsTrigger>
            <TabsTrigger value="inventory" className="gap-2">
              <Package className="h-4 w-4" />
              <span className="hidden sm:inline">Inventory</span>
            </TabsTrigger>
            <TabsTrigger value="schedule" className="gap-2">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Schedule</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Today's Meal Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-emerald-600" />
                    Today's Meal Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="rounded-full bg-amber-100 p-2">
                          <Clock className="h-4 w-4 text-amber-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">Breakfast</p>
                          <p className="text-xs text-gray-500">7:00 AM - 9:00 AM</p>
                        </div>
                      </div>
                      <Badge className="bg-amber-100 text-amber-700">45 portions</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="rounded-full bg-blue-100 p-2">
                          <Clock className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">Lunch</p>
                          <p className="text-xs text-gray-500">12:00 PM - 2:00 PM</p>
                        </div>
                      </div>
                      <Badge className="bg-blue-100 text-blue-700">85 portions</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="rounded-full bg-purple-100 p-2">
                          <Clock className="h-4 w-4 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">Dinner</p>
                          <p className="text-xs text-gray-500">6:00 PM - 8:00 PM</p>
                        </div>
                      </div>
                      <Badge className="bg-purple-100 text-purple-700">75 portions</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Popular Menu Items */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-yellow-500" />
                    Popular Menu Items
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {menuItems.slice(0, 5).map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors">
                        <div className="flex items-center gap-3">
                          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-yellow-100 to-yellow-200 text-sm font-bold text-yellow-700">
                            {index + 1}
                          </span>
                          <div>
                            <p className="font-medium text-gray-900">{item.name}</p>
                            <p className="text-xs text-gray-500">{item.category}</p>
                          </div>
                        </div>
                        <Badge variant="outline">{item.calories} cal</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Diet Plans Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ClipboardList className="h-5 w-5 text-blue-600" />
                  Active Diet Plans Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {dietPlans.map((plan, index) => (
                    <div key={index} className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg border border-blue-100">
                      <p className="font-semibold text-gray-900 mb-1">{plan.name}</p>
                      <p className="text-xs text-gray-500 mb-3">{plan.purpose}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-blue-600">{plan.patients}</span>
                        <Badge className="bg-blue-100 text-blue-700">patients</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Orders & Inventory Alerts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Orders */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingCart className="h-5 w-5 text-emerald-600" />
                    Recent Orders
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {patientOrders.slice(0, 5).map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div>
                          <p className="font-medium text-gray-900">{order.patientName}</p>
                          <p className="text-xs text-gray-500">Room {order.room} • {order.mealType}</p>
                        </div>
                        <Badge 
                          className={
                            order.status === "delivered" ? "bg-green-100 text-green-700" :
                            order.status === "ready" ? "bg-blue-100 text-blue-700" :
                            "bg-yellow-100 text-yellow-700"
                          }
                        >
                          {order.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Inventory Alerts */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                    Inventory Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {inventory.filter(item => item.status !== "good").map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-100">
                        <div>
                          <p className="font-medium text-gray-900">{item.name}</p>
                          <p className="text-xs text-gray-500">{item.quantity} {item.unit} • Expires: {item.expiryDate}</p>
                        </div>
                        <Badge 
                          className={
                            item.status === "critical" ? "bg-red-100 text-red-700" :
                            "bg-yellow-100 text-yellow-700"
                          }
                        >
                          {item.status}
                        </Badge>
                      </div>
                    ))}
                    {inventory.filter(item => item.status !== "good").length === 0 && (
                      <div className="text-center py-6 text-gray-500">
                        <CheckCircle2 className="h-12 w-12 mx-auto mb-2 text-green-500" />
                        <p>All inventory items are well stocked!</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Menu Items Tab */}
          <TabsContent value="menu" className="space-y-6">
            {/* Search and Filter */}
            <div className="bg-white rounded-lg border border-slate-200 p-6 mb-8">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      placeholder={t('common.search')}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Categories</option>
                    <option value="Main Course">Main Course</option>
                    <option value="Soup">Soup</option>
                    <option value="Salad">Salad</option>
                  </select>
                  <button onClick={() => setIsAddItemDialogOpen(true)} className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                    <Plus className="w-5 h-5" />
                    {t('common.add')} Item
                  </button>
                </div>
              </div>

              {/* Menu Items Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMenuItems.map((item, index) => (
                  <MenuItemCard key={index} {...item} />
                ))}
              </div>

            {filteredMenuItems.length === 0 && (
              <div className="text-center py-12 bg-slate-50 rounded-lg border border-slate-200">
                <p className="text-slate-600">No menu items found matching your search.</p>
              </div>
            )}
          </TabsContent>

          {/* Diet Plans Tab */}
          <TabsContent value="diet-plans" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Specialized Diet Programs</h3>
                <p className="text-sm text-gray-500">Manage dietary plans for different patient needs</p>
              </div>
              <Button onClick={() => setIsAddPlanDialogOpen(true)} className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                <Plus className="w-4 h-4 mr-2" />
                Create Diet Plan
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {dietPlans.map((plan, index) => (
                <DietPlanCard key={index} {...plan} />
              ))}
            </div>
          </TabsContent>

          {/* Patient Meals Tab */}
          <TabsContent value="patients" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Patient Meal Management</h3>
                <p className="text-sm text-gray-500">Track individual patient dietary needs and preferences</p>
              </div>
              <Button onClick={() => setIsAddPatientMealDialogOpen(true)} className="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Patient Meal Plan
              </Button>
            </div>

            <Card>
              <CardContent className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Patient ID</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Patient Name</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Diet Plan</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Allergies</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Daily Calories</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Sample patient meal data */}
                      <tr className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm">P001</td>
                        <td className="py-3 px-4 text-sm font-medium">Ahmed Al-Farsi</td>
                        <td className="py-3 px-4"><Badge className="bg-blue-100 text-blue-700">Diabetic</Badge></td>
                        <td className="py-3 px-4 text-sm">Nuts, Dairy</td>
                        <td className="py-3 px-4 text-sm font-semibold">1800 kcal</td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm"><Eye className="h-4 w-4" /></Button>
                            <Button variant="ghost" size="sm"><Edit className="h-4 w-4" /></Button>
                          </div>
                        </td>
                      </tr>
                      <tr className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm">P002</td>
                        <td className="py-3 px-4 text-sm font-medium">Fatima Al-Said</td>
                        <td className="py-3 px-4"><Badge className="bg-red-100 text-red-700">Cardiac</Badge></td>
                        <td className="py-3 px-4 text-sm">None</td>
                        <td className="py-3 px-4 text-sm font-semibold">1600 kcal</td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm"><Eye className="h-4 w-4" /></Button>
                            <Button variant="ghost" size="sm"><Edit className="h-4 w-4" /></Button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Meal Orders Management</h3>
                <p className="text-sm text-gray-500">Track and manage patient meal orders</p>
              </div>
              <Button onClick={() => setIsAddOrderDialogOpen(true)} className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                <Plus className="w-4 h-4 mr-2" />
                New Order
              </Button>
            </div>

            <div className="grid gap-4">
              {patientOrders.map((order) => (
                <Card key={order.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="rounded-full bg-gradient-to-br from-purple-100 to-pink-100 p-3">
                          <ShoppingCart className="h-6 w-6 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{order.patientName}</p>
                          <p className="text-sm text-gray-500">Room {order.room} • {order.mealType} • {order.time}</p>
                          <p className="text-xs text-gray-400 mt-1">{order.specialInstructions}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className="bg-blue-100 text-blue-700">{order.dietPlan}</Badge>
                        <Badge 
                          className={
                            order.status === "delivered" ? "bg-green-100 text-green-700" :
                            order.status === "ready" ? "bg-blue-100 text-blue-700" :
                            "bg-yellow-100 text-yellow-700"
                          }
                        >
                          {order.status}
                        </Badge>
                        <Button variant="ghost" size="sm"><Eye className="h-4 w-4" /></Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Inventory Tab */}
          <TabsContent value="inventory" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Kitchen Inventory</h3>
                <p className="text-sm text-gray-500">Monitor stock levels and expiry dates</p>
              </div>
              <Button onClick={() => setIsInventoryDialogOpen(true)} className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Item
              </Button>
            </div>

            <Card>
              <CardContent className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Item Name</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Category</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Quantity</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Expiry Date</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Reorder Level</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inventory.map((item) => (
                        <tr key={item.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4 text-sm font-medium">{item.name}</td>
                          <td className="py-3 px-4 text-sm">{item.category}</td>
                          <td className="py-3 px-4 text-sm font-semibold">{item.quantity} {item.unit}</td>
                          <td className="py-3 px-4">
                            <Badge 
                              className={
                                item.status === "good" ? "bg-green-100 text-green-700" :
                                item.status === "low" ? "bg-yellow-100 text-yellow-700" :
                                "bg-red-100 text-red-700"
                              }
                            >
                              {item.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-sm">{item.expiryDate}</td>
                          <td className="py-3 px-4 text-sm text-gray-500">{item.reorderLevel} {item.unit}</td>
                          <td className="py-3 px-4">
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm"><Edit className="h-4 w-4" /></Button>
                              <Button variant="ghost" size="sm"><Trash2 className="h-4 w-4 text-red-500" /></Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Schedule Tab */}
          <TabsContent value="schedule" className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Daily Meal Schedule</h3>
              <p className="text-sm text-gray-500">Today's meal preparation and delivery schedule</p>
            </div>

            <Card>
              <CardContent className="p-6">
                <div className="divide-y divide-slate-200">
                  {schedule.map((meal, index) => (
                    <MealSchedule key={index} {...meal} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Add Menu Item Dialog */}
        <Dialog open={isAddItemDialogOpen} onOpenChange={setIsAddItemDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <UtensilsCrossed className="w-5 h-5 text-blue-600" />
                Add New Menu Item
              </DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2 col-span-2">
                <Label htmlFor="itemName">Item Name</Label>
                <Input
                  id="itemName"
                  value={itemForm.name}
                  onChange={(e) => setItemForm({ ...itemForm, name: e.target.value })}
                  placeholder="e.g., Grilled Chicken Breast with Rice"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={itemForm.category}
                  onValueChange={(value) => setItemForm({ ...itemForm, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Main Course">Main Course</SelectItem>
                    <SelectItem value="Soup">Soup</SelectItem>
                    <SelectItem value="Salad">Salad</SelectItem>
                    <SelectItem value="Dessert">Dessert</SelectItem>
                    <SelectItem value="Beverage">Beverage</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="calories">Calories (kcal)</Label>
                <Input
                  id="calories"
                  type="number"
                  value={itemForm.calories}
                  onChange={(e) => setItemForm({ ...itemForm, calories: e.target.value })}
                  placeholder="450"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="protein">Protein</Label>
                <Input
                  id="protein"
                  value={itemForm.protein}
                  onChange={(e) => setItemForm({ ...itemForm, protein: e.target.value })}
                  placeholder="35g"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="carbs">Carbohydrates</Label>
                <Input
                  id="carbs"
                  value={itemForm.carbs}
                  onChange={(e) => setItemForm({ ...itemForm, carbs: e.target.value })}
                  placeholder="50g"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fats">Fats</Label>
                <Input
                  id="fats"
                  value={itemForm.fats}
                  onChange={(e) => setItemForm({ ...itemForm, fats: e.target.value })}
                  placeholder="15g"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fiber">Fiber</Label>
                <Input
                  id="fiber"
                  value={itemForm.fiber}
                  onChange={(e) => setItemForm({ ...itemForm, fiber: e.target.value })}
                  placeholder="8g"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="preparationTime">Preparation Time (minutes)</Label>
                <Input
                  id="preparationTime"
                  type="number"
                  value={itemForm.preparationTime}
                  onChange={(e) => setItemForm({ ...itemForm, preparationTime: e.target.value })}
                  placeholder="25"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price (SAR)</Label>
                <Input
                  id="price"
                  type="number"
                  value={itemForm.price}
                  onChange={(e) => setItemForm({ ...itemForm, price: e.target.value })}
                  placeholder="45.00"
                />
              </div>
              <div className="space-y-2 col-span-2">
                <Label htmlFor="ingredients">Main Ingredients (comma separated)</Label>
                <Textarea
                  id="ingredients"
                  value={itemForm.ingredients}
                  onChange={(e) => setItemForm({ ...itemForm, ingredients: e.target.value })}
                  placeholder="Chicken, Rice, Olive Oil, Herbs"
                  rows={2}
                />
              </div>
              <div className="space-y-2 col-span-2">
                <Label htmlFor="allergens">Allergens (comma separated)</Label>
                <Input
                  id="allergens"
                  value={itemForm.allergens}
                  onChange={(e) => setItemForm({ ...itemForm, allergens: e.target.value })}
                  placeholder="None or list allergens"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddItemDialogOpen(false)}>
                {t('common.cancel')}
              </Button>
              <Button
                onClick={() => {
                  console.log('New Menu Item:', itemForm);
                  setItemForm({
                    name: "",
                    category: "",
                    calories: "",
                    protein: "",
                    carbs: "",
                    fats: "",
                    fiber: "",
                    ingredients: "",
                    allergens: "",
                    preparationTime: "",
                    price: "",
                  });
                  setIsAddItemDialogOpen(false);
                }}
              >
                {t('common.save')}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Add Diet Plan Dialog */}
        <Dialog open={isAddPlanDialogOpen} onOpenChange={setIsAddPlanDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Apple className="w-5 h-5 text-blue-600" />
                Create New Diet Plan
              </DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2 col-span-2">
                <Label htmlFor="planName">Plan Name</Label>
                <Input
                  id="planName"
                  value={planForm.name}
                  onChange={(e) => setPlanForm({ ...planForm, name: e.target.value })}
                  placeholder="e.g., Post-Surgery Recovery Diet"
                />
              </div>
              <div className="space-y-2 col-span-2">
                <Label htmlFor="purpose">Purpose</Label>
                <Input
                  id="purpose"
                  value={planForm.purpose}
                  onChange={(e) => setPlanForm({ ...planForm, purpose: e.target.value })}
                  placeholder="e.g., Easy digestion and recovery"
                />
              </div>
              <div className="space-y-2 col-span-2">
                <Label htmlFor="restrictions">Dietary Restrictions (comma separated)</Label>
                <Textarea
                  id="restrictions"
                  value={planForm.restrictions}
                  onChange={(e) => setPlanForm({ ...planForm, restrictions: e.target.value })}
                  placeholder="Low Fiber, Bland, Easy to Chew"
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mealsPerDay">Meals Per Day</Label>
                <Input
                  id="mealsPerDay"
                  type="number"
                  value={planForm.mealsPerDay}
                  onChange={(e) => setPlanForm({ ...planForm, mealsPerDay: e.target.value })}
                  placeholder="4"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  value={planForm.duration}
                  onChange={(e) => setPlanForm({ ...planForm, duration: e.target.value })}
                  placeholder="e.g., 2-4 weeks"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="targetCalories">Target Daily Calories</Label>
                <Input
                  id="targetCalories"
                  type="number"
                  value={planForm.targetCalories}
                  onChange={(e) => setPlanForm({ ...planForm, targetCalories: e.target.value })}
                  placeholder="1800"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="targetProtein">Target Daily Protein (g)</Label>
                <Input
                  id="targetProtein"
                  type="number"
                  value={planForm.targetProtein}
                  onChange={(e) => setPlanForm({ ...planForm, targetProtein: e.target.value })}
                  placeholder="80"
                />
              </div>
              <div className="space-y-2 col-span-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  value={planForm.notes}
                  onChange={(e) => setPlanForm({ ...planForm, notes: e.target.value })}
                  placeholder="Special instructions or guidelines..."
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddPlanDialogOpen(false)}>
                {t('common.cancel')}
              </Button>
              <Button
                onClick={() => {
                  console.log('New Diet Plan:', planForm);
                  setPlanForm({
                    name: "",
                    purpose: "",
                    restrictions: "",
                    mealsPerDay: "",
                    duration: "",
                    targetCalories: "",
                    targetProtein: "",
                    notes: "",
                  });
                  setIsAddPlanDialogOpen(false);
                }}
              >
                Create Plan
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Add Patient Order Dialog */}
        <Dialog open={isAddOrderDialogOpen} onOpenChange={setIsAddOrderDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-purple-600" />
                New Patient Meal Order
              </DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="patientId">Patient ID</Label>
                <Input
                  id="patientId"
                  value={orderForm.patientId}
                  onChange={(e) => setOrderForm({ ...orderForm, patientId: e.target.value })}
                  placeholder="P001"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="patientName">Patient Name</Label>
                <Input
                  id="patientName"
                  value={orderForm.patientName}
                  onChange={(e) => setOrderForm({ ...orderForm, patientName: e.target.value })}
                  placeholder="Ahmed Mohammed"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="roomNumber">Room Number</Label>
                <Input
                  id="roomNumber"
                  value={orderForm.roomNumber}
                  onChange={(e) => setOrderForm({ ...orderForm, roomNumber: e.target.value })}
                  placeholder="201"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mealType">Meal Type</Label>
                <Select
                  value={orderForm.mealType}
                  onValueChange={(value) => setOrderForm({ ...orderForm, mealType: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select meal type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="breakfast">Breakfast</SelectItem>
                    <SelectItem value="lunch">Lunch</SelectItem>
                    <SelectItem value="dinner">Dinner</SelectItem>
                    <SelectItem value="snack">Snack</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 col-span-2">
                <Label htmlFor="dietaryRestrictions">Dietary Restrictions</Label>
                <Input
                  id="dietaryRestrictions"
                  value={orderForm.dietaryRestrictions}
                  onChange={(e) => setOrderForm({ ...orderForm, dietaryRestrictions: e.target.value })}
                  placeholder="Diabetic, Low Sodium, etc."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="deliveryTime">Delivery Time</Label>
                <Input
                  id="deliveryTime"
                  type="time"
                  value={orderForm.deliveryTime}
                  onChange={(e) => setOrderForm({ ...orderForm, deliveryTime: e.target.value })}
                />
              </div>
              <div className="space-y-2 col-span-2">
                <Label htmlFor="specialInstructions">Special Instructions</Label>
                <Textarea
                  id="specialInstructions"
                  value={orderForm.specialInstructions}
                  onChange={(e) => setOrderForm({ ...orderForm, specialInstructions: e.target.value })}
                  placeholder="No sugar, extra vegetables, etc."
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddOrderDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  console.log('New Patient Order:', orderForm);
                  setOrderForm({
                    patientId: "",
                    patientName: "",
                    roomNumber: "",
                    mealType: "breakfast",
                    specialInstructions: "",
                    dietaryRestrictions: "",
                    deliveryTime: "",
                  });
                  setIsAddOrderDialogOpen(false);
                }}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                Create Order
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Add Patient Meal Plan Dialog */}
        <Dialog open={isAddPatientMealDialogOpen} onOpenChange={setIsAddPatientMealDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-teal-600" />
                Add Patient Meal Plan
              </DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="mealPatientId">Patient ID</Label>
                <Input
                  id="mealPatientId"
                  value={patientMealForm.patientId}
                  onChange={(e) => setPatientMealForm({ ...patientMealForm, patientId: e.target.value })}
                  placeholder="P001"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mealPatientName">Patient Name</Label>
                <Input
                  id="mealPatientName"
                  value={patientMealForm.patientName}
                  onChange={(e) => setPatientMealForm({ ...patientMealForm, patientName: e.target.value })}
                  placeholder="Ahmed Al-Farsi"
                />
              </div>
              <div className="space-y-2 col-span-2">
                <Label htmlFor="dietPlan">Diet Plan</Label>
                <Select
                  value={patientMealForm.dietPlan}
                  onValueChange={(value) => setPatientMealForm({ ...patientMealForm, dietPlan: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select diet plan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="diabetic">Diabetic Management</SelectItem>
                    <SelectItem value="cardiac">Cardiac Health</SelectItem>
                    <SelectItem value="renal">Renal Disease</SelectItem>
                    <SelectItem value="post-surgery">Post-Surgery Recovery</SelectItem>
                    <SelectItem value="weight-loss">Weight Loss</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 col-span-2">
                <Label htmlFor="allergies">Allergies</Label>
                <Input
                  id="allergies"
                  value={patientMealForm.allergies}
                  onChange={(e) => setPatientMealForm({ ...patientMealForm, allergies: e.target.value })}
                  placeholder="Nuts, Dairy, Gluten, etc."
                />
              </div>
              <div className="space-y-2 col-span-2">
                <Label htmlFor="preferences">Food Preferences</Label>
                <Input
                  id="preferences"
                  value={patientMealForm.preferences}
                  onChange={(e) => setPatientMealForm({ ...patientMealForm, preferences: e.target.value })}
                  placeholder="Vegetarian, No seafood, etc."
                />
              </div>
              <div className="space-y-2 col-span-2">
                <Label htmlFor="restrictions">Additional Restrictions</Label>
                <Textarea
                  id="restrictions"
                  value={patientMealForm.restrictions}
                  onChange={(e) => setPatientMealForm({ ...patientMealForm, restrictions: e.target.value })}
                  placeholder="Low sodium, No sugar, Soft food only, etc."
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dailyCalories">Daily Calorie Target</Label>
                <Input
                  id="dailyCalories"
                  type="number"
                  value={patientMealForm.dailyCalories}
                  onChange={(e) => setPatientMealForm({ ...patientMealForm, dailyCalories: e.target.value })}
                  placeholder="1800"
                />
              </div>
              <div className="space-y-2 col-span-2">
                <Label htmlFor="mealNotes">Additional Notes</Label>
                <Textarea
                  id="mealNotes"
                  value={patientMealForm.notes}
                  onChange={(e) => setPatientMealForm({ ...patientMealForm, notes: e.target.value })}
                  placeholder="Any special considerations or instructions..."
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddPatientMealDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  console.log('New Patient Meal Plan:', patientMealForm);
                  setPatientMealForm({
                    patientId: "",
                    patientName: "",
                    dietPlan: "",
                    allergies: "",
                    preferences: "",
                    restrictions: "",
                    dailyCalories: "",
                    notes: "",
                  });
                  setIsAddPatientMealDialogOpen(false);
                }}
                className="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700"
              >
                Save Meal Plan
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Add Inventory Item Dialog */}
        <Dialog open={isInventoryDialogOpen} onOpenChange={setIsInventoryDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Package className="w-5 h-5 text-amber-600" />
                Add Inventory Item
              </DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="itemName">Item Name</Label>
                <Input
                  id="itemName"
                  value={inventoryForm.itemName}
                  onChange={(e) => setInventoryForm({ ...inventoryForm, itemName: e.target.value })}
                  placeholder="Fresh Vegetables"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="invCategory">Category</Label>
                <Select
                  value={inventoryForm.category}
                  onValueChange={(value) => setInventoryForm({ ...inventoryForm, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vegetables">Vegetables</SelectItem>
                    <SelectItem value="protein">Protein</SelectItem>
                    <SelectItem value="grains">Grains</SelectItem>
                    <SelectItem value="dairy">Dairy</SelectItem>
                    <SelectItem value="fruits">Fruits</SelectItem>
                    <SelectItem value="oils">Oils & Fats</SelectItem>
                    <SelectItem value="spices">Spices & Herbs</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  value={inventoryForm.quantity}
                  onChange={(e) => setInventoryForm({ ...inventoryForm, quantity: e.target.value })}
                  placeholder="150"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="unit">Unit</Label>
                <Select
                  value={inventoryForm.unit}
                  onValueChange={(value) => setInventoryForm({ ...inventoryForm, unit: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kg">Kilograms (kg)</SelectItem>
                    <SelectItem value="g">Grams (g)</SelectItem>
                    <SelectItem value="L">Liters (L)</SelectItem>
                    <SelectItem value="ml">Milliliters (ml)</SelectItem>
                    <SelectItem value="pcs">Pieces</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input
                  id="expiryDate"
                  type="date"
                  value={inventoryForm.expiryDate}
                  onChange={(e) => setInventoryForm({ ...inventoryForm, expiryDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="supplier">Supplier</Label>
                <Input
                  id="supplier"
                  value={inventoryForm.supplier}
                  onChange={(e) => setInventoryForm({ ...inventoryForm, supplier: e.target.value })}
                  placeholder="Supplier name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reorderLevel">Reorder Level</Label>
                <Input
                  id="reorderLevel"
                  type="number"
                  value={inventoryForm.reorderLevel}
                  onChange={(e) => setInventoryForm({ ...inventoryForm, reorderLevel: e.target.value })}
                  placeholder="50"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsInventoryDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  console.log('New Inventory Item:', inventoryForm);
                  setInventoryForm({
                    itemName: "",
                    category: "",
                    quantity: "",
                    unit: "",
                    expiryDate: "",
                    supplier: "",
                    reorderLevel: "",
                  });
                  setIsInventoryDialogOpen(false);
                }}
                className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700"
              >
                Add to Inventory
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
}
