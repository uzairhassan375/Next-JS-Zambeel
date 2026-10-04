import { NextResponse } from 'next/server';
import { pingDB } from '../../../lib/db';

export const dynamic = 'force-dynamic';

const NO_STORE = { 'Cache-Control': 'no-store' };

export async function GET() {
  const started = Date.now();

  try {
    await pingDB();
    const ms = Date.now() - started;
    return NextResponse.json(
      { status: 'ok', db: 'up', ms },
      { status: 200, headers: NO_STORE },
    );
  } catch (error) {
    const ms = Date.now() - started;
    return NextResponse.json(
      {
        status: 'error',
        db: 'down',
        error: error?.name || 'Error',
        ms,
      },
      { status: 503, headers: NO_STORE },
    );
  }
}
