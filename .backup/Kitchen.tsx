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
} from "lucide-react";
import { useState } from "react";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("menu");
  const [categoryFilter, setCategoryFilter] = useState("all");

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

  const filteredMenuItems = menuItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (categoryFilter === "all" || item.category === categoryFilter)
  );

  const totalPatients = dietPlans.reduce((sum, plan) => sum + plan.patients, 0);
  const mealsPerDay = schedule.reduce((sum, meal) => sum + meal.portions, 0);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Kitchen & Nutrition</h1>
          <p className="text-lg text-slate-600">
            Menu management, diet plans, and meal scheduling
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <p className="text-sm text-slate-600 mb-1">Menu Items</p>
            <p className="text-3xl font-bold text-slate-900">{menuItems.length}</p>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <p className="text-sm text-slate-600 mb-1">Diet Plans</p>
            <p className="text-3xl font-bold text-blue-600">{dietPlans.length}</p>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <p className="text-sm text-slate-600 mb-1">Patients on Plans</p>
            <p className="text-3xl font-bold text-green-600">{totalPatients}</p>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-6">
            <p className="text-sm text-slate-600 mb-1">Daily Portions</p>
            <p className="text-3xl font-bold text-orange-600">{mealsPerDay}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-slate-200 overflow-x-auto">
          {[
            { id: "menu", label: "Menu Items" },
            { id: "diet-plans", label: "Diet Plans" },
            { id: "schedule", label: "Meal Schedule" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-4 font-medium border-b-2 transition-colors whitespace-nowrap ${
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
          {activeTab === "menu" && (
            <>
              {/* Search and Filter */}
              <div className="bg-white rounded-lg border border-slate-200 p-6 mb-8">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search menu items..."
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
                  <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                    <Plus className="w-5 h-5" />
                    Add Item
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
            </>
          )}

          {activeTab === "diet-plans" && (
            <>
              <div className="mb-8">
                <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                  <Plus className="w-5 h-5" />
                  Create New Diet Plan
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {dietPlans.map((plan, index) => (
                  <DietPlanCard key={index} {...plan} />
                ))}
              </div>
            </>
          )}

          {activeTab === "schedule" && (
            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-6">
                Today's Meal Schedule
              </h3>
              {schedule.map((meal, index) => (
                <MealSchedule key={index} {...meal} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
