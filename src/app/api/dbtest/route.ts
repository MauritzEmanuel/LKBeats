import { NextResponse } from 'next/server'
import sql from '@/lib/db'

export async function GET() {
  try {
    const result = await sql`SELECT NOW() AS current_time`
    return NextResponse.json({ success: true, time: result[0].current_time })
  } catch (error) {
    console.error('DB error:', error)
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 })
  }
}
