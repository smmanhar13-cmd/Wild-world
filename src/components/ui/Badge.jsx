const badgeVariants = {
  'Best Seller': 'bg-brand text-white',
  Sale: 'bg-red-500 text-white',
  New: 'bg-accent text-white',
  Premium: 'bg-gray-900 text-white',
  Limited: 'bg-purple-700 text-white',
  default: 'bg-stone text-gray-700',
};

export default function Badge({ label, className = '' }) {
  const style = badgeVariants[label] || badgeVariants.default;
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${style} ${className}`}
    >
      {label}
    </span>
  );
}
