"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { SidebarProvider } from "@/components/ui/sidebar"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { StudentCard } from "@/components/student-card"
import { StudentStats } from "@/components/student-stats"

const mockData = [
  { id: "125", name: "Ximena G.", grade: "3ro A", waiting: 12, status: "waiting" },
  { id: "103", name: "Sebastián E.", grade: "3ro A", waiting: 0, status: "picked" },
  { id: "205", name: "Luis D.", grade: "2do B", waiting: 8, status: "waiting" },
  { id: "304", name: "Sofía C.", grade: "1ro A", waiting: 16, status: "waiting" },
  { id: "126", name: "Miguel A.", grade: "3ro B", waiting: 3, status: "waiting" },
  { id: "127", name: "Ana P.", grade: "2do A", waiting: 2, status: "waiting" },
  { id: "128", name: "Carlos M.", grade: "1ro B", waiting: 7, status: "waiting" },
  { id: "129", name: "Laura T.", grade: "3ro A", waiting: 14, status: "waiting" },
  { id: "130", name: "Diego R.", grade: "2do C", waiting: 1, status: "picked" },
  { id: "131", name: "Valentina S.", grade: "1ro A", waiting: 9, status: "waiting" },
]

export default function Dashboard() {
  const [students, setStudents] = useState(mockData)
  const [search, setSearch] = useState("")

  const filtered = students.filter(
    (s) => s.name.toLowerCase().includes(search.toLowerCase()) || s.grade.toLowerCase().includes(search.toLowerCase()),
  )

  const waiting = filtered.filter((s) => s.status === "waiting")
  const picked = filtered.filter((s) => s.status === "picked")

  const shortWait = waiting.filter((s) => s.waiting <= 5)
  const mediumWait = waiting.filter((s) => s.waiting > 5 && s.waiting <= 10)
  const longWait = waiting.filter((s) => s.waiting > 10)

  const markAsPickedUp = (id: string) => {
    setStudents(students.map((student) => (student.id === id ? { ...student, status: "picked", waiting: 0 } : student)))
  }

  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="flex-1 overflow-hidden">
        <DashboardHeader />

        <div className="container mx-auto p-6 space-y-6">
          <StudentStats
            total={students.length}
            waiting={waiting.length}
            picked={picked.length}
            urgent={longWait.length}
          />

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Buscar por nombre o grado..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 max-w-sm"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-0">
                <div className="p-4 border-b bg-green-50">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Esperando (0-5 min)</h2>
                    <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                      {shortWait.length}
                    </Badge>
                  </div>
                </div>
                <ScrollArea className="h-[400px] p-4">
                  <div className="space-y-3">
                    {shortWait.length === 0 ? (
                      <p className="text-center text-muted-foreground py-4">No hay estudiantes en esta categoría</p>
                    ) : (
                      shortWait.map((student) => (
                        <StudentCard key={student.id} student={student} onPickUp={markAsPickedUp} variant="green" />
                      ))
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-0">
                <div className="p-4 border-b bg-yellow-50">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Esperando (5-10 min)</h2>
                    <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                      {mediumWait.length}
                    </Badge>
                  </div>
                </div>
                <ScrollArea className="h-[400px] p-4">
                  <div className="space-y-3">
                    {mediumWait.length === 0 ? (
                      <p className="text-center text-muted-foreground py-4">No hay estudiantes en esta categoría</p>
                    ) : (
                      mediumWait.map((student) => (
                        <StudentCard key={student.id} student={student} onPickUp={markAsPickedUp} variant="yellow" />
                      ))
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-0">
                <div className="p-4 border-b bg-red-50">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Urgente (+10 min)</h2>
                    <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">
                      {longWait.length}
                    </Badge>
                  </div>
                </div>
                <ScrollArea className="h-[400px] p-4">
                  <div className="space-y-3">
                    {longWait.length === 0 ? (
                      <p className="text-center text-muted-foreground py-4">No hay estudiantes en esta categoría</p>
                    ) : (
                      longWait.map((student) => (
                        <StudentCard key={student.id} student={student} onPickUp={markAsPickedUp} variant="red" />
                      ))
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="p-4 border-b">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Recogidos</h2>
                  <Badge variant="outline">{picked.length}</Badge>
                </div>
              </div>
              <ScrollArea className="h-[200px] p-4">
                <div className="space-y-3">
                  {picked.length === 0 ? (
                    <p className="text-center text-muted-foreground py-4">No hay estudiantes recogidos</p>
                  ) : (
                    picked.map((student) => (
                      <StudentCard key={student.id} student={student} variant="gray" showPickUpButton={false} />
                    ))
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </main>
    </SidebarProvider>
  )
}

