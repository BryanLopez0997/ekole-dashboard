export interface Student {
  id: string
  name: string
  grade: string
  section: string
  waitTime: number
  status: "waiting" | "picked" | "urgent"
}

export interface DashboardStats {
  totalStudents: number
  waiting: number
  picked: number
  urgent: number
}

