import { StudentCard } from "./student-card"
import type { Student } from "@/features/dashboard/types"

interface StudentListProps {
  title: string
  count: number
  students: Student[]
  onPickup: (id: string) => void
  className?: string
}

export function StudentList({ title, count, students, onPickup, className }: StudentListProps) {
  return (
    <div className={className}>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">{title}</h2>
        <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800">{count}</span>
      </div>
      <div className="space-y-2">
        {students.map((student) => (
          <StudentCard
            key={student.id}
            id={student.id}
            name={student.name}
            grade={student.grade}
            section={student.section}
            waitTime={student.waitTime}
            onPickup={onPickup}
          />
        ))}
      </div>
    </div>
  )
}

