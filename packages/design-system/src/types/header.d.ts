export type HeaderNavItem = {
  key: string;
  label: string;
  href?: string;
  active?: boolean;
  onClick?: (e: React.MouseEvent) => void;
};

export type HeaderProps = Readonly<{
  logoSrc?: string;
  onToggleNav: () => void;
  navHidden?: boolean;
  navItems?: HeaderNavItem[];
  userName?: string;
  className?: string;
  hamburgerIconSrc?: string;
  activeColor?: string;
}>;
