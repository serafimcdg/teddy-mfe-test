export type CardProps = {
  title?: string;
  subtitle?: string;
  description?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  onSelect?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onEdit?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onDelete?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  addIconSrc?: string;
  editIconSrc?: string;
  deleteIconSrc?: string;
  className?: string;
  hoverable?: boolean;
  activeColor?: string;
  actionsPosition?: 'top-right' | 'bottom-right' | 'bottom-bar';
  style?: React.CSSProperties;
  selected?: boolean;
};
