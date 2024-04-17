import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../routes';

export function useNavigation() {
  const navigate = useNavigate();

  const goToDeposit = () => navigate(ROUTES.DEPOSIT);
  const goToWithdraw = () => navigate(ROUTES.WITHDRAW);
  const goToTransfer = () => navigate(ROUTES.TRANSFER);
  const goToSingleAccount = () => navigate(ROUTES.HISTORY);

  return {
    goToDeposit,
    goToWithdraw,
    goToTransfer,
    goToSingleAccount,
  };
}
