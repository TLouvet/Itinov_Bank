import clsx from 'clsx';
import { ChevronLeftIcon } from '../icons/ChevronLeftIcon';

type ReturnToPreviousProps = Readonly<{
  hidden: boolean;
  text: string;
  onClick: () => void;
}>;

export function ReturnToPrevious({ hidden, text, onClick }: ReturnToPreviousProps) {
  return (
    <button
      className={clsx({ hidden }, 'flex items-center font-semibold text-primary lg:hidden mb-4')}
      onClick={onClick}
    >
      <ChevronLeftIcon height={34} width={34} fill='currentcolor' /> {text}
    </button>
  );
}
