import { DashboardView } from "@/features/dashboard/components/dashboard-view"

export default function DashboardPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard de Recogida</h1>
      </div>
      <DashboardView />
    </div>
  )
}

