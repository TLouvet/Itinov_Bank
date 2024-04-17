import clsx from 'clsx';

type TransactionMenuItemProps<T> = Readonly<{
  title: string;
  Component: React.FC<T>;
  componentProps: any;
  onClick: () => void;
  selected?: boolean;
}>;

export function TransactionMenuItem<T>({
  Component,
  onClick,
  title,
  componentProps,
  selected,
}: TransactionMenuItemProps<T>) {
  return (
    <li
      className={clsx(
        'shadow-lg p-3 border cursor-pointer border-l-4',
        { 'border-l-transparent': !selected },
        { 'border-l-primary bg-slate-50': selected }
      )}
      role='tab'
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
    >
      <h3 className='text-lg font-semibold text-primary'>{title}</h3>
      <div className='animate-appear-fast flex items-center justify-between'>
        <Component {...componentProps} />
      </div>
    </li>
  );
}
