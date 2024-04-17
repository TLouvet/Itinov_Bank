import clsx from 'clsx';
import { useId } from 'react';

type InputProps = Readonly<
  {
    label: string;
    value: string | number;
    helperText?: string;
    errorText?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  } & React.InputHTMLAttributes<HTMLInputElement>
>;

export function Input({ label, value, onChange, helperText, errorText, ...props }: InputProps) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className='text-primary'>
        {label}
      </label>
      <input
        type='text'
        id={id}
        onChange={onChange}
        value={value}
        {...props}
        className={clsx('shadow-lg border rounded p-3 w-full', { 'border-error': !!errorText })}
      />
      {helperText && <p className='mt-2 text-xs text-muted'>{helperText}</p>}
      {errorText && <p className='mt-2 text-xs text-error'>{errorText}</p>}
    </div>
  );
}
