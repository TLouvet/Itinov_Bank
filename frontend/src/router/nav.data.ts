import { ROUTES } from '@/router/routes';
import { HomeIcon } from '../ui/icons/HomeIcon';
import { WithdrawIcon } from '@/ui/icons/WithdrawIcon';
import { DepositIcon } from '@/ui/icons/DepositIcon';
import { HistoryIcon } from '@/ui/icons/HistoryIcon';
import { TransferIcon } from '@/ui/icons/TransferIcon';

export const navLinks = [
  {
    to: ROUTES.HOME,
    Icon: HomeIcon,
    label: 'Accueil',
  },
  {
    to: ROUTES.HISTORY,
    Icon: HistoryIcon,
    label: "Historique d'opérations",
  },
  {
    to: ROUTES.DEPOSIT,
    Icon: DepositIcon,
    label: 'Dépôt',
  },
  {
    to: ROUTES.WITHDRAW,
    Icon: WithdrawIcon,
    label: 'Retrait',
  },
  {
    to: ROUTES.TRANSFER,
    Icon: TransferIcon,
    label: 'Virement',
  },
];
