import * as React from 'react'
import clsx from 'clsx'
import defaultLogo from '../../icons/logoTeddy.svg?url'
import defaultCollapse from '../../icons/collapse-buttoon.svg?url'

export type SidebarItem = {
  key: string
  label: string
  href?: string
  disabled?: boolean
  badge?: number | string
  iconSrc: string
  iconActiveSrc?: string
  active?: boolean
}

export type SidebarProps = {
  items: SidebarItem[]
  className?: string
  logoSrc?: string
  selectedKey?: string
  defaultSelectedKey?: string
  onSelect?: (key: string, item: SidebarItem, ev: React.MouseEvent) => void
  activeColor?: string
  hidden?: boolean
  defaultHidden?: boolean
  onHiddenChange?: (hidden: boolean) => void
  collapseIconSrc?: string
}

const SIDEBAR_W = 260
const HEADER_H = 128
const LOGO_W = 100
const LOGO_H = 48.98
const COLLAPSE_ICON = 45

const cn = (...a: Parameters<typeof clsx>) => clsx(...a)

function ItemIcon({ src, active, activeSrc }: { src: string; active?: boolean; activeSrc?: string }) {
  const icon = active && activeSrc ? activeSrc : src
  return <img src={icon} alt="" aria-hidden className={cn('h-5 w-5 shrink-0', active ? 'opacity-100' : 'opacity-80')} />
}

export default function Sidebar(props: SidebarProps) {
  const {
    items,
    className,
    logoSrc = defaultLogo,
    selectedKey: selectedKeyProp,
    defaultSelectedKey,
    onSelect,
    activeColor = '#EE7D46',
    hidden: hiddenProp,
    defaultHidden = false,
    onHiddenChange,
    collapseIconSrc = defaultCollapse, 
  } = props

  const [internalKey, setInternalKey] = React.useState<string | undefined>(
    () => defaultSelectedKey ?? items.find(i => i.active)?.key ?? items[0]?.key
  )
  const selectedKey = selectedKeyProp ?? internalKey

  const handleItemClick = (it: SidebarItem) => (ev: React.MouseEvent) => {
    if (it.disabled) return
    if (!it.href || it.href === '#') ev.preventDefault()
    if (selectedKeyProp === undefined) setInternalKey(it.key)
    onSelect?.(it.key, it, ev)
  }

  const [internalHidden, setInternalHidden] = React.useState(defaultHidden)
  const hidden = hiddenProp ?? internalHidden
  const collapse = () => {
    if (!hidden) {
      if (hiddenProp === undefined) setInternalHidden(true)
      onHiddenChange?.(true)
    }
  }

  React.useEffect(() => {
    if (!hidden) {
      const prev = document.documentElement.style.overflow
      document.documentElement.style.overflow = 'hidden'
      return () => { document.documentElement.style.overflow = prev }
    }
  }, [hidden])

  return (
    <div
      className={cn('fixed inset-0 z-[60]', hidden ? 'pointer-events-none' : 'pointer-events-auto', className)}
      aria-hidden={hidden || undefined}
      role="dialog"
      aria-modal={!hidden || undefined}
    >
      <div className={cn('absolute inset-0 bg-black/40 transition-opacity duration-200', hidden ? 'opacity-0' : 'opacity-100')} />

      <aside
        className={cn(
          'absolute left-0 top-0 h-full w-[260px] flex flex-col rounded-br-lg overflow-hidden',
          'transform-gpu transition-transform duration-300 ease-out',
          hidden ? '-translate-x-full' : 'translate-x-0'
        )}
        aria-label="Sidebar"
      >
        <div
          className="relative flex items-center justify-center"
          style={{
            width: SIDEBAR_W,
            height: HEADER_H,
            background: '#FFFFFF0F',
            backdropFilter: 'blur(32px)',
          }}
        >
          {logoSrc && <img src={logoSrc} alt="Logo" style={{ width: LOGO_W, height: LOGO_H }} />}
        </div>

        <nav className="flex-1 bg-white px-2 py-6 w-[260px]">
          <ul className="space-y-3">
            {items.map(it => {
              const isActive = selectedKey ? it.key === selectedKey : !!it.active
              const Content = (
                <>
                  <ItemIcon src={it.iconSrc} activeSrc={it.iconActiveSrc} active={isActive} />
                  <span className={cn('truncate text-[15px] font-medium', !isActive && 'text-zinc-900')} style={isActive ? { color: activeColor } : undefined}>
                    {it.label}
                  </span>
                  {it.badge != null && (
                    <span className="ml-auto inline-flex min-w-5 items-center justify-center rounded-full bg-zinc-100 px-1.5 text-xs text-zinc-700">
                      {it.badge}
                    </span>
                  )}
                </>
              )

              return (
                <li key={it.key}>
                  {it.href ? (
                    <a
                      href={it.href}
                      onClick={handleItemClick(it)}
                      className={cn('group relative flex items-center gap-3 rounded-lg px-4 py-3', it.disabled && 'pointer-events-none opacity-40')}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {isActive && <span aria-hidden className="absolute right-[-8px] top-1/2 h-8 w-[3px] -translate-y-1/2 rounded-full" style={{ background: activeColor }} />}
                      {Content}
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={handleItemClick(it)}
                      className={cn('group relative flex w-full items-center gap-3 rounded-lg px-4 py-3', it.disabled && 'pointer-events-none opacity-40')}
                      aria-pressed={isActive || undefined}
                    >
                      {isActive && <span aria-hidden className="absolute right-[-8px] top-1/2 h-8 w-[3px] -translate-y-1/2 rounded-full" style={{ background: activeColor }} />}
                      {Content}
                    </button>
                  )}
                </li>
              )
            })}
          </ul>
        </nav>
      </aside>

      {!hidden && (
        <button
          type="button"
          onClick={collapse}
          aria-label="Ocultar navegação"
          title="Ocultar navegação"
          className="absolute p-0 m-0 bg-transparent border-0 cursor-pointer -translate-y-1/2"
          style={{ top: HEADER_H, left: SIDEBAR_W - COLLAPSE_ICON / 2, lineHeight: 0 }}
        >
          <img src={collapseIconSrc} alt="" style={{ width: COLLAPSE_ICON, height: COLLAPSE_ICON, display: 'block' }} />
        </button>
      )}
    </div>
  )
}

export { Sidebar }
