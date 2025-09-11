import React from 'react'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary'
}
export default function Button({ variant='primary', className='', ...props }: Props) {
  const base = 'px-4 py-2 rounded-2xl font-medium shadow'
  const styles = variant === 'primary'
    ? 'bg-blue-600 text-white hover:opacity-90'
    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
  return <button {...props} className={`${base} ${styles} ${className}`} />
}
