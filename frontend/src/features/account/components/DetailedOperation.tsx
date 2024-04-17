import { Amount } from '@/shared/components/Amount';
import { ChevronLeftIcon } from '@/ui/icons/ChevronLeftIcon';

type DetailedOperationProps = Readonly<{
  amount: string;
  date: Date;
  description: string;
  onClose: () => void;
}>;

export function DetailedOperation({ amount, date, description, onClose }: DetailedOperationProps) {
  const formattedDate = new Date(date).toLocaleDateString('fr');

  return (
    <div className='px-3 py-4 border rounded-md fixed top-0 left-0 right-0 bottom-0 animate-rtl z-10 bg-white lg:h-fit lg:block lg:sticky lg:top-1 lg:flex-1'>
      <button className='flex items-center font-semibold text-primary lg:hidden mb-4' onClick={onClose}>
        <ChevronLeftIcon height={34} width={34} fill='currentcolor' /> Revenir à l'historique
      </button>
      <h3 className='font-semibold text-primary text-center mb-4'>Informations</h3>
      <hr className='mb-4' />
      <p>Type d'opération: Virement</p>
      <p>Libellé: {description}</p>
      <div className='flex space-x-2'>
        <span>Montant:</span> <Amount value={Number(amount)} />
      </div>
      <p>Date: {formattedDate}</p>
    </div>
  );
}
