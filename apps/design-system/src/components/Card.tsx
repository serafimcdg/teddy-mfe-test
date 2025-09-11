import React from 'react'
export default function Card({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <div className="rounded-2xl border p-4 shadow-sm bg-white">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <div>{children}</div>
    </div>
  )
}
