import { updateCurrentAccount } from '@/features/account/store/useAccountStore';
import { useNavigation } from '@/router/hooks/useNavigation';

export function useDashboardAccountsLogic() {
  const { goToSingleAccount } = useNavigation();

  function onAccountClick(id: number) {
    updateCurrentAccount(id);
    goToSingleAccount();
  }

  return {
    onAccountClick,
  };
}
