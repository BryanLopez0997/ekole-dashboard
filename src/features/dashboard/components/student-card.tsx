"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Clock } from "lucide-react"

interface StudentCardProps {
  name: string
  grade: string
  section: string
  waitTime: number
  onPickup: (id: string) => void
  id: string
}

export function StudentCard({ name, grade, section, waitTime, onPickup, id }: StudentCardProps) {
  return (
    <Card className="mb-3 border shadow-sm">
      <CardContent className="flex items-center justify-between p-4">
        <div className="space-y-1">
          <h3 className="font-medium">{name}</h3>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <span>
              {grade} {section}
            </span>
            <span className="mx-1">•</span>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{waitTime} min</span>
            </div>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={() => onPickup(id)}>
          Recoger
        </Button>
      </CardContent>
    </Card>
  )
}

