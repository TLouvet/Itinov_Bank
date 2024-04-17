import { SecondaryTitle } from '@/ui/Typography/SecondaryTitle';

type TransferActionPanelProps = Readonly<{
  title: string;
  componentProps: any;
  Component: React.FunctionComponent<any>;
}>;

export function TransactionActionPanel({ title, componentProps, Component }: TransferActionPanelProps) {
  return (
    <div role='tabpanel' className='animate-appear'>
      <SecondaryTitle className='text-center mb-2'>{title}</SecondaryTitle>
      <Component {...componentProps} />
    </div>
  );
}
