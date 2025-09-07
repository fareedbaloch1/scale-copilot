
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const file = path.join(process.cwd(), 'public', 'data', 'summary.json');
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  return NextResponse.json(data.region_expected_value || []);
}
