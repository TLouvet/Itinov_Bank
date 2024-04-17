import { SecondaryTitle } from '@/ui/Typography/SecondaryTitle';
import { Bar, CartesianGrid, ComposedChart, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { formatDate, swapDate } from '@/shared/utils/dateFormatting';
import { Statistic } from '../statistics.type';
import { traduceParameter } from '../utils';
import { Loading } from '@/ui/Loading/Loading';
import content from '../content.json';

type StatisticsChartProps = Readonly<{
  data: Statistic[];
  isLoading?: boolean;
}>;

export function StatisticsChart({ data, isLoading }: StatisticsChartProps) {
  const formatName = (name: string) => traduceParameter(name[0].toLocaleUpperCase('fr') + name.substring(1));

  if (isLoading) {
    return <Loading text="Chargement de l'historique..." />;
  }

  return (
    <>
      <SecondaryTitle className='mb-4'>{content.title}</SecondaryTitle>
      <div className='pb-6 border-b lg:block overflow-scroll xl:overflow-hidden'>
        <ResponsiveContainer width={'100%'} height={300} minWidth={1024} className='px-0'>
          <ComposedChart width={730} height={250} data={data}>
            <XAxis
              dataKey='name'
              tickFormatter={(value: string) => formatDate(value)}
              tick={{
                fill: '#9CA3AF',
                fontSize: 12,
              }}
            />
            <YAxis dataKey='income' orientation='right' type='number' tick={{ fill: '#9CA3AF', fontSize: 12 }} />
            <YAxis
              orientation='left'
              yAxisId='balance'
              dataKey='balance'
              type='number'
              tick={{
                fill: '#9CA3AF',
                fontSize: 12,
              }}
            />
            <Tooltip
              labelFormatter={(value) => `Date: ${formatDate(swapDate(value))}`}
              labelClassName='font-semibold text-primary text-lg'
              formatter={(value, name: string) => [`${value} €`, `${formatName(name)}`]}
              cursor={false}
              wrapperClassName='rounded-md text-sm font-semibold shadow-lg'
            />
            <Legend iconType='circle' formatter={(value) => formatName(value)} />
            <CartesianGrid stroke='#f5f5f5' />
            <Bar dataKey='income' barSize={4} fill='#4ade80' />
            <Bar dataKey='expense' barSize={4} fill='#f87171' />
            <Line
              yAxisId='balance'
              animateNewValues={false}
              isAnimationActive={false}
              type='monotone'
              dataKey='balance'
              stroke='#171D44'
              strokeWidth={2}
              dot={{
                strokeWidth: 1,
                r: 2,
              }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}
