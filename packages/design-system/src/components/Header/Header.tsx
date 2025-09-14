import { HeaderNavItem, HeaderProps } from '../../types/header';
import clsx from 'clsx';

import defaultLogo from '../../icons/logoTeddy.svg';
import defaultHamburger from '../../icons/hamburguer.svg';

const ACTIVE = '#EE7D46'

export default function Header({
  logoSrc = defaultLogo,
  onToggleNav,
  navHidden,
  navItems = [],
  userName = 'Usuário',
  className,
  hamburgerIconSrc = defaultHamburger,
  activeColor = ACTIVE,
}: Readonly<HeaderProps>) {
  const handleNavClick = (it: HeaderNavItem) => (e: React.MouseEvent) => {
    if (it.onClick) {
      e.preventDefault()
      it.onClick(e)
    }
  }

  return (
    <header
      className={clsx(
        'relative z-40 w-full h-[100px] bg-white border-b border-zinc-200 font-sans',
        className
      )}
      role="banner"
    >
      <div className="max-[866px]:flex max-[866px]:items-center max-[866px]:justify-between max-[866px]:mb-2 w-full h-full min-[867px]:hidden relative">
        <button
          type="button"
          onClick={onToggleNav}
          aria-label={navHidden ? 'Mostrar navegação' : 'Ocultar navegação'}
          aria-expanded={!navHidden}
          className="p-0 m-0 bg-transparent border-0 cursor-pointer absolute left-2 ml-5 top-1/2 -translate-y-1/2"
          style={{ lineHeight: 0 }}
        >
          <img src={hamburgerIconSrc} alt="" aria-hidden className="w-[28px] h-[24px] block" />
        </button>
        {logoSrc && (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <img src={logoSrc} alt="Teddy" className="w-[80px] h-[38px] select-none pointer-events-none" />
          </div>
        )}
      </div>
      <div className="hidden min-[867px]:block">
        <button
          type="button"
          onClick={onToggleNav}
          aria-label={navHidden ? 'Mostrar navegação' : 'Ocultar navegação'}
          aria-expanded={!navHidden}
          className="absolute left-[50px] top-[40px] p-0 m-0 bg-transparent border-0 cursor-pointer"
          style={{ lineHeight: 0 }}
        >
          <img src={hamburgerIconSrc} alt="" aria-hidden className="w-[24px] h-[20px] block" />
        </button>
        {logoSrc && (
          <img
            src={logoSrc}
            alt="Teddy"
            className="absolute left-[120px] top-[26px] w-[100px] h-[48.98px] select-none pointer-events-none"
          />
        )}
        <nav
          className="absolute left-1/2 -translate-x-1/2 top-[40px] flex items-center gap-8"
          aria-label="Topo"
        >
          {navItems.map((it) => {
            const active = !!it.active
            return (
              <a
                key={it.key}
                href={it.href ?? '#'}
                onClick={handleNavClick(it)}
                aria-current={active ? 'page' : undefined}
                className={clsx(
                  'font-sans text-[16px] font-normal leading-[100%] tracking-[0] text-zinc-700 hover:text-zinc-900 transition-colors',
                  active && 'underline underline-offset-8 decoration-2'
                )}
                style={active ? { color: activeColor, textDecorationColor: activeColor } : undefined}
              >
                {it.label}
              </a>
            )
          })}
        </nav>
        <div className="absolute right-[140px] top-[40px] text-[16px] leading-[100%] tracking-normal text-zinc-700">
          Olá, <strong className="font-bold">{userName}</strong>!
        </div>
      </div>
    </header>
  )
}
