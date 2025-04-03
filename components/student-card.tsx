"use client"

import { Clock, CheckCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

type Student = {
  id: string
  name: string
  grade: string
  waiting: number
  status: string
}

type StudentCardProps = {
  student: Student
  variant?: "green" | "yellow" | "red" | "gray"
  onPickUp?: (id: string) => void
  showPickUpButton?: boolean
}

export function StudentCard({ student, variant = "green", onPickUp, showPickUpButton = true }: StudentCardProps) {
  const variantStyles = {
    green: "border-green-200 bg-green-50",
    yellow: "border-yellow-200 bg-yellow-50",
    red: "border-red-200 bg-red-50",
    gray: "border-gray-200 bg-gray-50",
  }

  const badgeStyles = {
    green: "bg-green-100 text-green-800 hover:bg-green-100",
    yellow: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
    red: "bg-red-100 text-red-800 hover:bg-red-100",
    gray: "bg-gray-100 text-gray-800 hover:bg-gray-100",
  }

  return (
    <Card className={`border ${variantStyles[variant]}`}>
      <CardContent className="p-4 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <p className="font-medium">{student.name}</p>
            {student.status === "picked" && (
              <Badge variant="outline" className={badgeStyles.gray}>
                Recogido
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
            <span>{student.grade}</span>
            {student.status === "waiting" && (
              <>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{student.waiting} min</span>
                </div>
              </>
            )}
          </div>
        </div>

        {showPickUpButton && student.status === "waiting" && (
          <Button size="sm" variant="outline" className="gap-1" onClick={() => onPickUp?.(student.id)}>
            <CheckCircle className="h-4 w-4" />
            <span>Recoger</span>
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

