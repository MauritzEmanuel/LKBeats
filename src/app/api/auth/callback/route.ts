import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const supabase = createRouteHandlerClient({ cookies })

  const { event, session } = await request.json()

  if (event === 'SIGNED_IN' && session) {
    await supabase.auth.setSession(session)
  }

  if (event === 'SIGNED_OUT') {
    await supabase.auth.signOut()

    const response = NextResponse.json({ success: true })

    response.headers.append(
      'Set-Cookie',
      'sb-pngqxfmvpxljdrjiufrj-auth-token=; Path=/; HttpOnly; Secure; SameSite=Lax; Expires=Thu, 01 Jan 1970 00:00:00 GMT'
    )

    return response
  }

  return NextResponse.json({ success: true })
}