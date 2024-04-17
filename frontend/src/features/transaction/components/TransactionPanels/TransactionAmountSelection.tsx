import { Input } from '@/ui/form/Input';
import { useTransactionContext } from '../../hooks/useTransactionContext';
import content from '../../content.json';

export function TransactionAmountSelection() {
  const { amount, reference, setAmount, setReference, errorAmount } = useTransactionContext();

  return (
    <div className='space-y-10'>
      <Input
        label={content.labels.amount}
        required
        type='number'
        className='border text-3xl font-bold'
        placeholder='0.00'
        autoComplete='off'
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        helperText={content.helperText.amount}
        errorText={errorAmount ? content.errors.amount : ''}
      />

      <Input
        label={content.labels.motive}
        required
        value={reference}
        onChange={(e) => setReference(e.target.value)}
        helperText={content.helperText.motive}
      />
    </div>
  );
}
