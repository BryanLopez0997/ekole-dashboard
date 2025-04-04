"use client"

import { useState, useEffect } from "react"
import { Users, Clock, CheckCircle, AlertTriangle } from "lucide-react"
import { StatsCard } from "./stats-card"
import { SearchBar } from "./search-bar"
import { StudentList } from "./student-list"
import type { Student, DashboardStats } from "../types"
import { fetchDashboardStats, fetchStudents, pickupStudent, searchStudents } from "../services/api"
import { useToast } from "@/components/ui/use-toast"

export function DashboardView() {
  const [stats, setStats] = useState<DashboardStats>({
    totalStudents: 0,
    waiting: 0,
    picked: 0,
    urgent: 0,
  })
  const [students, setStudents] = useState<Student[]>([])
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setIsLoading(true)
        const [statsData, studentsData] = await Promise.all([fetchDashboardStats(), fetchStudents()])
        setStats(statsData)
        setStudents(studentsData)
        setFilteredStudents(studentsData)
      } catch (error) {
        toast({
          title: "Error",
          description: "No se pudo cargar los datos del dashboard",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadDashboard()
    // Polling cada 30 segundos para mantener los datos actualizados
    const interval = setInterval(loadDashboard, 30000)
    return () => clearInterval(interval)
  }, [toast])

  const handlePickup = async (id: string) => {
    try {
      await pickupStudent(id)
      // Actualizar la lista de estudiantes
      const updatedStudents = students.map((student) =>
        student.id === id ? { ...student, status: "picked" as const } : student,
      )
      setStudents(updatedStudents)
      setFilteredStudents(updatedStudents)

      // Actualizar estadísticas
      setStats((prev) => ({
        ...prev,
        waiting: prev.waiting - 1,
        picked: prev.picked + 1,
      }))

      toast({
        title: "Éxito",
        description: "Estudiante recogido correctamente",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo marcar al estudiante como recogido",
        variant: "destructive",
      })
    }
  }

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setFilteredStudents(students)
      return
    }

    try {
      const results = await searchStudents(query)
      setFilteredStudents(results)
    } catch (error) {
      toast({
        title: "Error",
        description: "Error al buscar estudiantes",
        variant: "destructive",
      })
    }
  }

  // Filtrar estudiantes por categoría
  const earlyWaiting = filteredStudents.filter((s) => s.status === "waiting" && s.waitTime < 5)
  const midWaiting = filteredStudents.filter((s) => s.status === "waiting" && s.waitTime >= 5 && s.waitTime < 10)
  const urgent = filteredStudents.filter((s) => s.status === "urgent" || s.waitTime >= 10)

  if (isLoading) {
    return <div className="flex h-full items-center justify-center">Cargando...</div>
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          icon={<Users className="h-6 w-6 text-blue-600" />}
          title="Total Estudiantes"
          value={stats.totalStudents}
          iconClassName="bg-blue-100"
        />
        <StatsCard
          icon={<Clock className="h-6 w-6 text-amber-600" />}
          title="En Espera"
          value={stats.waiting}
          iconClassName="bg-amber-100"
        />
        <StatsCard
          icon={<CheckCircle className="h-6 w-6 text-green-600" />}
          title="Recogidos"
          value={stats.picked}
          iconClassName="bg-green-100"
        />
        <StatsCard
          icon={<AlertTriangle className="h-6 w-6 text-red-600" />}
          title="Urgentes (+10 min)"
          value={stats.urgent}
          iconClassName="bg-red-100"
        />
      </div>

      <div className="my-6">
        <SearchBar onSearch={handleSearch} />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <StudentList
          title="Esperando (0-5 min)"
          count={earlyWaiting.length}
          students={earlyWaiting}
          onPickup={handlePickup}
          className="rounded-md bg-green-50 p-4"
        />
        <StudentList
          title="Esperando (5-10 min)"
          count={midWaiting.length}
          students={midWaiting}
          onPickup={handlePickup}
          className="rounded-md bg-amber-50 p-4"
        />
        <StudentList
          title="Urgente (+10 min)"
          count={urgent.length}
          students={urgent}
          onPickup={handlePickup}
          className="rounded-md bg-red-50 p-4"
        />
      </div>
    </div>
  )
}

