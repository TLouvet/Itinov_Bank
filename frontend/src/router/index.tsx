import { createBrowserRouter } from 'react-router-dom';
import { ROUTES } from './routes';
import { lazy } from 'react';
import { Suspensed } from '@/ui/Suspense/SuspensedComponent';

const DashboardHomePage = lazy(() => import('@/features/dashboard/page/DashBoardHomePage'));
const DepositPage = lazy(() => import('@/features/transaction/pages/DepositPage'));
const WithdrawPage = lazy(() => import('@/features/transaction/pages/WithdrawPage'));
const TransferPage = lazy(() => import('@/features/transaction/pages/TransferPage'));
const SingleAccountPage = lazy(() => import('@/features/account/pages/SingleAccountPage'));

const approutes = [
  {
    path: ROUTES.HOME,
    element: (
      <Suspensed>
        <DashboardHomePage />
      </Suspensed>
    ),
  },
  {
    path: ROUTES.HISTORY,
    element: (
      <Suspensed>
        <SingleAccountPage />
      </Suspensed>
    ),
  },
  {
    path: ROUTES.DEPOSIT,
    element: (
      <Suspensed>
        <DepositPage />
      </Suspensed>
    ),
  },
  {
    path: ROUTES.WITHDRAW,
    element: (
      <Suspensed>
        <WithdrawPage />
      </Suspensed>
    ),
  },
  {
    path: ROUTES.TRANSFER,
    element: (
      <Suspensed>
        <TransferPage />
      </Suspensed>
    ),
  },
];

export const router = createBrowserRouter(approutes);
