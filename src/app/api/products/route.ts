import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'


// Client
export async function GET() {
  const { data, error } = await supabase.from('products').select('*')

  if (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}
