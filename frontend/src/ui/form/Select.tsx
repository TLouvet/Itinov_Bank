import { useId } from 'react';

type InputProps = Readonly<
  {
    label: string;
    value: string | number;
    helperText?: string;
    options: { label: string; value: string | number }[];
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  } & React.InputHTMLAttributes<HTMLSelectElement>
>;

export function Select({ label, value, onChange, helperText, options, ...props }: InputProps) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className='text-primary'>
        {label}
      </label>
      <select
        type='text'
        id={id}
        onChange={onChange}
        value={value}
        {...props}
        className='shadow-lg border rounded p-3 w-full'
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {helperText && <p className='mt-2 text-xs text-muted'>{helperText}</p>}
    </div>
  );
}
