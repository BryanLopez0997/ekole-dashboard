import type { DashboardStats, Student } from "../types"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export async function fetchDashboardStats(): Promise<DashboardStats> {
  const response = await fetch(`${API_BASE_URL}/dashboard/stats`)
  if (!response.ok) {
    throw new Error("Failed to fetch dashboard stats")
  }
  return response.json()
}

export async function fetchStudents(): Promise<Student[]> {
  const response = await fetch(`${API_BASE_URL}/students`)
  if (!response.ok) {
    throw new Error("Failed to fetch students")
  }
  return response.json()
}

export async function pickupStudent(id: string): Promise<{ success: boolean }> {
  const response = await fetch(`${API_BASE_URL}/students/${id}/pickup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
  if (!response.ok) {
    throw new Error("Failed to pickup student")
  }
  return response.json()
}

export async function searchStudents(query: string): Promise<Student[]> {
  const response = await fetch(`${API_BASE_URL}/students/search?q=${encodeURIComponent(query)}`)
  if (!response.ok) {
    throw new Error("Failed to search students")
  }
  return response.json()
}

