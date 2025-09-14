export type SidebarItem = {
  key: string;
  label: string;
  href?: string;
  disabled?: boolean;
  badge?: number | string;
  iconSrc: string;
  iconActiveSrc?: string;
  active?: boolean;
};

export type SidebarProps = Readonly<{
  items: SidebarItem[];
  className?: string;
  logoSrc?: string;
  selectedKey?: string;
  defaultSelectedKey?: string;
  onSelect?: (key: string, item: SidebarItem, ev: React.MouseEvent) => void;
  activeColor?: string;
  hidden?: boolean;
  defaultHidden?: boolean;
  onHiddenChange?: (hidden: boolean) => void;
  collapseIconSrc?: string;
}>;
