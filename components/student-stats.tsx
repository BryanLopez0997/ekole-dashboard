"use client"

import { Users, Clock, CheckCircle, AlertTriangle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

type StudentStatsProps = {
  total: number
  waiting: number
  picked: number
  urgent: number
}

export function StudentStats({ total, waiting, picked, urgent }: StudentStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-6 flex items-center gap-4">
          <div className="rounded-full bg-blue-100 p-3">
            <Users className="h-6 w-6 text-blue-700" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Estudiantes</p>
            <p className="text-2xl font-bold">{total}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6 flex items-center gap-4">
          <div className="rounded-full bg-yellow-100 p-3">
            <Clock className="h-6 w-6 text-yellow-700" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">En Espera</p>
            <p className="text-2xl font-bold">{waiting}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6 flex items-center gap-4">
          <div className="rounded-full bg-green-100 p-3">
            <CheckCircle className="h-6 w-6 text-green-700" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Recogidos</p>
            <p className="text-2xl font-bold">{picked}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6 flex items-center gap-4">
          <div className="rounded-full bg-red-100 p-3">
            <AlertTriangle className="h-6 w-6 text-red-700" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Urgentes (+10 min)</p>
            <p className="text-2xl font-bold">{urgent}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

