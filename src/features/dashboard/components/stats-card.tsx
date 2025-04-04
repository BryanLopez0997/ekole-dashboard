import type { ReactNode } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface StatsCardProps {
  icon: ReactNode
  title: string
  value: string | number
  className?: string
  iconClassName?: string
}

export function StatsCard({ icon, title, value, className, iconClassName }: StatsCardProps) {
  return (
    <Card className="border shadow-sm">
      <CardContent className="flex items-center gap-4 p-6">
        <div className={cn("flex h-12 w-12 items-center justify-center rounded-full", iconClassName)}>{icon}</div>
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </CardContent>
    </Card>
  )
}

