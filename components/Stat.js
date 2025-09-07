
export default function Stat({label, value}) {
  return (
    <div className="p-4 bg-gray-100 rounded-xl">
      <div className="sub">{label}</div>
      <div className="text-2xl font-semibold mt-1">{value}</div>
    </div>
  );
}
