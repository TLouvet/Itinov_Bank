import { useNavigation } from '@/router/hooks/useNavigation';
import { Button } from '@/ui/Button/Button';
import { SecondaryTitle } from '@/ui/Typography/SecondaryTitle';
import content from '../content.json';

export function DashboardActions() {
  const { goToDeposit, goToWithdraw, goToTransfer } = useNavigation();

  return (
    <>
      <SecondaryTitle>{content.actions.title}</SecondaryTitle>
      <Button onClick={goToDeposit}>{content.actions.deposit}</Button>
      <Button onClick={goToWithdraw}>{content.actions.withdraw}</Button>
      <Button onClick={goToTransfer}>{content.actions.transfer}</Button>
    </>
  );
}
