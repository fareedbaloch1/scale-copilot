
'use client';
import { useEffect, useState } from 'react';
import Card from '../components/Card';
import Stat from '../components/Stat';
import { BarChart3, MapPin, Mail } from 'lucide-react';

export default function Page() {
  const [summary, setSummary] = useState(null);
  const [topRegions, setTopRegions] = useState([]);
  const [dealId, setDealId] = useState('');
  const [nudge, setNudge] = useState(null);

  useEffect(() => {
    fetch('/api/summary').then(r => r.json()).then(setSummary);
    fetch('/api/top-regions').then(r => r.json()).then(setTopRegions);
  }, []);

  const sendNudge = async () => {
    setNudge(null);
    const r = await fetch('/api/nudge-lead', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ deal_id: dealId || 'DL-5001', owner: 'Alex (AE)' })
    });
    const data = await r.json();
    setNudge(data);
  };

  if(!summary) return <div className="text-center text-gray-500">Loading…</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="h1">ScalePilot™ Dashboard</h1>
        <span className="sub">Generated at {new Date(summary.generated_at).toLocaleString()}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Stat label="Stale Opps (7d+)" value={summary.stale_opportunities} />
        <Stat label="High Attrition (est.)" value={summary.high_attrition_count} />
        <Stat label="Top Support Terms" value={(summary.top_support_cluster_terms||[]).slice(0,3).join(', ')} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Support → Engineering load" subtitle="Where users struggle most" right={<BarChart3 className="text-gray-400" />}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <img src="/tickets_by_component.png" alt="Tickets by component" className="rounded-xl border" />
            <img src="/issues_by_component.png" alt="Issues by component" className="rounded-xl border" />
          </div>
        </Card>

        <Card title="GTM Focus Map" subtitle="Expected value by region" right={<MapPin className="text-gray-400" />}>
          <img src="/region_expected_value.png" alt="EV by region" className="rounded-xl border w-full" />
          <div className="mt-4">
            <table className="w-full text-sm">
              <thead><tr><th className="text-left p-2">Region</th><th className="text-right p-2">Expected Value</th></tr></thead>
              <tbody>
                {topRegions.map((r,i)=> (
                  <tr key={i} className="border-t">
                    <td className="p-2">{r.region}</td>
                    <td className="p-2 text-right">£{Math.round(r.expected_value).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card title="Recommendations" subtitle="Actionable playbook">
          <ul className="space-y-3">
            {(summary.recommendations||[]).map((rec, i)=> (
              <li key={i} className="p-3 rounded-xl border">
                <div className="text-xs uppercase tracking-wide text-gray-500">{rec.category}</div>
                <div className="font-semibold">{rec.insight}</div>
                <div className="text-sm text-gray-600 mt-1">{rec.action}</div>
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Nudge an Opportunity" subtitle="Generate a tailored follow-up" right={<Mail className="text-gray-400" />}>
          <div className="flex gap-2 items-end">
            <div className="flex-1">
              <label className="sub">Deal ID</label>
              <input className="mt-1 w-full border rounded-xl px-3 py-2" placeholder="DL-5001" value={dealId} onChange={e=>setDealId(e.target.value)} />
            </div>
            <button className="btn" onClick={sendNudge}>Generate</button>
          </div>
          {nudge && (
            <div className="mt-4 p-4 bg-gray-50 rounded-xl border">
              {!nudge.ok && <div className="text-red-600 text-sm">{nudge.message}</div>}
              {nudge.ok && (
                <>
                  <div className="font-semibold">{nudge.subject}</div>
                  <pre className="whitespace-pre-wrap text-sm mt-2">{nudge.body}</pre>
                </>
              )}
            </div>
          )}
          <div className="sub mt-2">Try: DL-5001 or pick one from <a className="underline" href="/data/crm.json" target="_blank" rel="noreferrer">crm.json</a></div>
        </Card>
      </div>
    </div>
  );
}
