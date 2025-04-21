'use client';

type Props = {
  title: string;
  value: number;
  color: string;
  description: string;
};

const SummaryCard: React.FC<Props> = ({ title, value, color, description }) => {
  const formatDiff = (value: number) => {
    const prefix = value > 0 ? '+' : '';
    return `${prefix}₴${value.toLocaleString('uk-UA')}`;
  };
  return (
    <div className={`bg-${color}-50 p-4 rounded-lg border border-${color}-100 shadow-sm`}>
      <div className={`flex items-center gap-2 font-medium text-${color}-700`}>{title}</div>
      <p className={`text-${color}-600 font-bold text-lg`}>{formatDiff(value)}</p>
      <p className="text-xs text-gray-600 mt-1">{description}</p>
    </div>
  );
};
export default SummaryCard;
