export type ModalDeleteClientProps = Readonly<{
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
  clientName?: string;
}>;
