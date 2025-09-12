import React from 'react'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'danger'
}

const styles: Record<NonNullable<ButtonProps['variant']>, React.CSSProperties> = {
  primary:   { background: '#2563eb', color: '#fff', border: 0 },
  secondary: { background: '#e5e7eb', color: '#111827', border: 0 },
  danger:    { background: '#dc2626', color: '#fff', border: 0 }
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', style, ...rest }) => (
  <button style={{ padding: '10px 14px', borderRadius: 8, cursor: 'pointer', ...styles[variant], ...style }} {...rest} />
)
