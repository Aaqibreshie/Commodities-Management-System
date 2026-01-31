"use client";

import { useQuery, gql } from "@apollo/client";
import ProtectedLayout from "@/components/ProtectedLayout";

const DASHBOARD_STATS_QUERY = gql`
  query DashboardStats {
    dashboardStats {
      totalProducts
      totalQuantity
      totalValue
      lowStockProducts
      categoryStats {
        category
        count
        totalQuantity
      }
    }
  }
`;

export default function DashboardPage() {
  const { data, loading, error } = useQuery(DASHBOARD_STATS_QUERY);

  return (
    <ProtectedLayout requireManager={true}>
      <div className="animate-fade-in">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Overview of your commodity inventory
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
          </div>
        ) : error ? (
          <div className="p-6 rounded-2xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400">
            Error loading dashboard: {error.message}
          </div>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard
                title="Total Products"
                value={data.dashboardStats.totalProducts}
                icon={<ProductsIcon />}
                color="blue"
              />
              <StatCard
                title="Total Quantity"
                value={data.dashboardStats.totalQuantity.toLocaleString()}
                icon={<QuantityIcon />}
                color="green"
              />
              <StatCard
                title="Total Value"
                value={`$${data.dashboardStats.totalValue.toLocaleString()}`}
                icon={<ValueIcon />}
                color="purple"
              />
              <StatCard
                title="Low Stock Items"
                value={data.dashboardStats.lowStockProducts}
                icon={<WarningIcon />}
                color="orange"
                warning={data.dashboardStats.lowStockProducts > 0}
              />
            </div>

            {/* Category Stats */}
            <div className="glass rounded-2xl p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Category Breakdown
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.dashboardStats.categoryStats.map(
                  (cat: any, index: number) => (
                    <div
                      key={cat.category}
                      className="p-4 rounded-xl bg-gray-50 dark:bg-dark-bg card-hover animate-slide-up"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                          {cat.category}
                        </span>
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
                          {cat.count} items
                        </span>
                      </div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {cat.totalQuantity.toLocaleString()}
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                        units in stock
                      </p>

                      {/* Progress bar */}
                      <div className="mt-3 h-2 rounded-full bg-gray-200 dark:bg-dark-border overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-primary-500 to-primary-600"
                          style={{
                            width: `${Math.min((cat.totalQuantity / data.dashboardStats.totalQuantity) * 100, 100)}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </ProtectedLayout>
  );
}

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: "blue" | "green" | "purple" | "orange";
  warning?: boolean;
}

function StatCard({ title, value, icon, color, warning }: StatCardProps) {
  const colorClasses = {
    blue: "from-blue-500 to-blue-600",
    green: "from-green-500 to-green-600",
    purple: "from-purple-500 to-purple-600",
    orange: "from-orange-500 to-orange-600",
  };

  return (
    <div
      className={`glass rounded-2xl p-6 card-hover ${warning ? "ring-2 ring-orange-500" : ""}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {title}
          </p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
            {value}
          </p>
        </div>
        <div
          className={`p-3 rounded-xl bg-gradient-to-br ${colorClasses[color]} shadow-lg`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

function ProductsIcon() {
  return (
    <svg
      className="w-6 h-6 text-white"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
      />
    </svg>
  );
}

function QuantityIcon() {
  return (
    <svg
      className="w-6 h-6 text-white"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
      />
    </svg>
  );
}

function ValueIcon() {
  return (
    <svg
      className="w-6 h-6 text-white"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg
      className="w-6 h-6 text-white"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
      />
    </svg>
  );
}
