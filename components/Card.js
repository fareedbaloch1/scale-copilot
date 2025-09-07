
export default function Card({title, subtitle, children, right}) {
  return (
    <div className="card">
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="h2">{title}</div>
          {subtitle && <div className="sub mt-1">{subtitle}</div>}
        </div>
        {right}
      </div>
      {children}
    </div>
  );
}
