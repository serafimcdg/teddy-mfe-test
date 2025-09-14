import * as React from 'react'
import clsx from 'clsx'

import plusIcon from '../../icons/mais.svg?url'
import editIcon from '../../icons/edit.svg?url'
import trashIcon from '../../icons/lixeira.svg?url'

const ACTIVE = '#EE7D46'

export type CardProps = {
  title?: string
  subtitle?: string         
  description?: string      
  children?: React.ReactNode
  footer?: React.ReactNode

  onAdd?: (e: React.MouseEvent<HTMLButtonElement>) => void
  onEdit?: (e: React.MouseEvent<HTMLButtonElement>) => void
  onDelete?: (e: React.MouseEvent<HTMLButtonElement>) => void

  addIconSrc?: string
  editIconSrc?: string
  deleteIconSrc?: string

  className?: string
  hoverable?: boolean
  activeColor?: string
  actionsPosition?: 'top-right' | 'bottom-right' | 'bottom-bar'
  style?: React.CSSProperties
}

function IconButton({
  src,
  label,
  onClick,
  testId,
}: {
  src: string
  label: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  testId?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      data-testid={testId}
      className={clsx(
        'h-8 w-8 p-0 bg-transparent border-0 cursor-pointer',
        'inline-flex items-center justify-center select-none'
      )}
    >
      <img src={src} alt="" aria-hidden className="h-5 w-5 block pointer-events-none" />
      <span className="sr-only">{label}</span>
    </button>
  )
}

export default function Card({
  title,
  subtitle,
  description,
  children,
  footer,
  onAdd,
  onEdit,
  onDelete,
  addIconSrc = plusIcon,
  editIconSrc = editIcon,
  deleteIconSrc = trashIcon,
  className,
  hoverable = false,
  activeColor = ACTIVE,
  actionsPosition = 'bottom-bar',
  style,
}: CardProps) {
  const hasHeaderMeta = title || subtitle || description

  const ActionsBottomBar = (
  <div className="mt-[5rem] grid grid-cols-3 items-center">
      <div className="justify-self-start">
        <IconButton src={addIconSrc} label="Adicionar" onClick={onAdd} testId="card-action-add" />
      </div>
      <div className="justify-self-center">
        <IconButton src={editIconSrc} label="Editar" onClick={onEdit} testId="card-action-edit" />
      </div>
      <div className="justify-self-end">
        <IconButton src={deleteIconSrc} label="Excluir" onClick={onDelete} testId="card-action-delete" />
      </div>
    </div>
  )

  const ActionsTopRight = (
    <div className="flex items-center gap-2">
      <IconButton src={addIconSrc} label="Adicionar" onClick={onAdd} testId="card-action-add" />
      <IconButton src={editIconSrc} label="Editar" onClick={onEdit} testId="card-action-edit" />
      <IconButton src={deleteIconSrc} label="Excluir" onClick={onDelete} testId="card-action-delete" />
    </div>
  )

  return (
    <section
      role="region"
      className={clsx(
  'relative bg-white rounded-md p-4 flex flex-col shadow-sm',
  'w-full h-[138px] opacity-100',
        hoverable && 'hover:shadow-md transition-shadow',
        className,
      )}
    >
      <div className="flex-1 min-h-0">
        {hasHeaderMeta && actionsPosition === 'bottom-bar' && (
          <div className="text-center">
            {title && <h3 className="text-base font-semibold text-zinc-900">{title}</h3>}
            {subtitle && <p className="text-sm text-zinc-700 mt-2">{subtitle}</p>}
            {description && <p className="text-sm text-zinc-700 mt-2">{description}</p>}
          </div>
        )}
        {hasHeaderMeta && actionsPosition !== 'bottom-bar' && (
          <div className="mb-3 flex items-start justify-between gap-3">
            <div className="min-w-0">
              {title && <h3 className="text-base font-semibold text-zinc-900 truncate" title={title}>{title}</h3>}
              {subtitle && <p className="text-sm text-zinc-700 mt-2 truncate" title={subtitle}>{subtitle}</p>}
              {description && (
                <p
                  className="mt-2 font-inter font-normal text-[14px] leading-[17px] text-black opacity-100 bg-black w-[130px] h-[17px]"
                  style={{
                    fontStyle: 'normal',
                    letterSpacing: 0,
                  }}
                  title={description}
                >
                  {description}
                </p>
              )}
            </div>
            {actionsPosition === 'top-right' && ActionsTopRight}
          </div>
        )}
        {children && (
          <div className={clsx('mt-1', actionsPosition === 'bottom-bar' && 'text-center text-sm text-zinc-700')}>
            {children}
          </div>
        )}
      </div>
      {footer && actionsPosition !== 'bottom-bar' && <div className="mt-2">{footer}</div>}
      <div className="mt-2">
        {actionsPosition === 'bottom-bar' && ActionsBottomBar}
        {actionsPosition === 'bottom-right' && <div className="flex justify-end">{ActionsTopRight}</div>}
      </div>
    </section>
  )
}
