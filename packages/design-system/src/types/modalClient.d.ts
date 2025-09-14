export type ModalClientProps = Readonly<{
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { nome: string; salario: string; empresa: string }) => void;
  initialData?: { nome: string; salario: string; empresa: string };
  title?: string;
  buttonText?: string;
}>;
