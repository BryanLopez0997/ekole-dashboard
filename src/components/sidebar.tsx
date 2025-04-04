"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Users, Clock, Bell, BarChart, Settings, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()

  const routes = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
      active: pathname === "/dashboard",
    },
    {
      label: "Estudiantes",
      icon: Users,
      href: "/estudiantes",
      active: pathname === "/estudiantes",
    },
    {
      label: "Horarios",
      icon: Clock,
      href: "/horarios",
      active: pathname === "/horarios",
    },
    {
      label: "Notificaciones",
      icon: Bell,
      href: "/notificaciones",
      active: pathname === "/notificaciones",
    },
    {
      label: "Reportes",
      icon: BarChart,
      href: "/reportes",
      active: pathname === "/reportes",
    },
  ]

  return (
    <div className={cn("flex h-full flex-col border-r bg-white", className)}>
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-green-100 text-green-700">
            <span className="text-lg font-bold">E</span>
          </div>
          <span className="text-xl">Ekole</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 text-sm font-medium">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
                route.active ? "bg-gray-100 text-gray-900" : "text-gray-500 hover:bg-gray-100 hover:text-gray-900",
              )}
            >
              <route.icon className="h-4 w-4" />
              {route.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="mt-auto border-t p-2">
        <nav className="grid items-start px-2 text-sm font-medium">
          <Link
            href="/configuracion"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:bg-gray-100 hover:text-gray-900",
              pathname === "/configuracion" && "bg-gray-100 text-gray-900",
            )}
          >
            <Settings className="h-4 w-4" />
            Configuración
          </Link>
          <Button
            variant="ghost"
            className="flex w-full justify-start gap-3 px-3 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
          >
            <LogOut className="h-4 w-4" />
            Cerrar sesión
          </Button>
        </nav>
      </div>
    </div>
  )
}

