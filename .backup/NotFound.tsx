import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Layout from "@/components/Layout";
import { AlertCircle, Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
              <AlertCircle className="w-10 h-10 text-red-600" />
            </div>
          </div>

          <h1 className="text-6xl font-bold text-slate-900 mb-2">404</h1>
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">
            Page Not Found
          </h2>

          <p className="text-lg text-slate-600 mb-2">
            Sorry, we couldn't find the page you're looking for.
          </p>
          <p className="text-slate-600 mb-8">
            The page at{" "}
            <code className="bg-slate-100 px-3 py-1 rounded text-sm font-mono text-slate-900">
              {location.pathname}
            </code>{" "}
            doesn't exist.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              <Home className="w-5 h-5" />
              Go to Homepage
            </Link>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-900 px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Go Back
            </button>
          </div>

          <div className="mt-12 pt-8 border-t border-slate-200">
            <p className="text-sm text-slate-600 mb-6">
              Looking for something? Here are some useful links:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link
                to="/patients"
                className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-left"
              >
                <h3 className="font-semibold text-slate-900">Patients</h3>
                <p className="text-sm text-slate-600">
                  Manage patient records and appointments
                </p>
              </Link>
              <Link
                to="/departments"
                className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-left"
              >
                <h3 className="font-semibold text-slate-900">Departments</h3>
                <p className="text-sm text-slate-600">
                  View hospital departments and staff
                </p>
              </Link>
              <Link
                to="/staff"
                className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-left"
              >
                <h3 className="font-semibold text-slate-900">Medical Staff</h3>
                <p className="text-sm text-slate-600">
                  Manage doctors and nurses
                </p>
              </Link>
              <Link
                to="/finance"
                className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-left"
              >
                <h3 className="font-semibold text-slate-900">Finance</h3>
                <p className="text-sm text-slate-600">
                  Billing and financial operations
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
