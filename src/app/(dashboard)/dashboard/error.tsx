"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <h2 className="mb-4 text-2xl font-bold">Algo salió mal</h2>
      <p className="mb-6 text-muted-foreground">
        Ocurrió un error al cargar el dashboard. Por favor, intenta de nuevo.
      </p>
      <Button onClick={reset}>Intentar de nuevo</Button>
    </div>
  )
}

