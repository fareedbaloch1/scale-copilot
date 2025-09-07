
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req) {
  const body = await req.json();
  const id = body.deal_id || 'DL-5001';
  const owner = body.owner || 'AE';
  const crmFile = path.join(process.cwd(), 'public', 'data', 'crm.json');
  const deals = JSON.parse(fs.readFileSync(crmFile, 'utf8'));
  const deal = deals.find(d => d.deal_id === id);
  if(!deal) return NextResponse.json({ ok:false, message:'Deal not found' });
  const subject = `Quick next step for your ${deal.industry} practice`;
  const bodyText = `Hi, based on our recent demo, teams like yours in ${deal.region} saw faster payments and fewer missed appointments. Shall we pencil a 15-min call this week to align on rollout?\n\n— ${owner}`;
  return NextResponse.json({ ok:true, subject, body: bodyText });
}
