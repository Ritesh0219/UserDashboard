import { Suspense } from "react"
import UserDashboard from "@/components/UserDashboard"

export default function Home() {
  return (
    <div className="min-h-screen  md:p-5">
      <div className="container mx-auto px-6 py-8">
        {/* Colorful Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            User Management Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your users with advanced filtering and real-time updates
          </p>
        </div>

        <Suspense
          fallback={
            <div className="flex justify-center items-center h-64">
              <div className="relative">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-200"></div>
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent absolute top-0 left-0"></div>
              </div>
            </div>
          }
        >
          <UserDashboard />
        </Suspense>
      </div>
    </div>
  )
}
