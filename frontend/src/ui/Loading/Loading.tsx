type LoadingProps = Readonly<{
  text: string;
}>;

export function Loading({ text }: LoadingProps) {
  return (
    <div className='text-center'>
      <div className='animate-spin w-6 h-6 rounded-full border-2 border-primary border-b-0' />
      <p>{text}</p>
    </div>
  );
}
