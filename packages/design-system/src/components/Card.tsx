import React from 'react'

type CardProps = React.PropsWithChildren<{ title?: string; style?: React.CSSProperties }>

export const Card: React.FC<CardProps> = ({ title, children, style }) => (
  <div style={{ border: '1px solid #e5e7eb', borderRadius: 12, padding: 16, ...style }}>
    {title && <h3 style={{ margin: 0, marginBottom: 8, fontSize: 18 }}>{title}</h3>}
    {children}
  </div>
)
