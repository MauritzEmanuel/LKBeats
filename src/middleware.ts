import { NextResponse, NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  console.log("MIDDLEWARE TRIGGERED");
  
  const tokenName = process.env.SUPABASE_AUTH_TOKEN!;
  const token = req.cookies.get(tokenName)?.value

  if (!token && req.nextUrl.pathname.startsWith('/backoffice')) {
    const loginUrl = req.nextUrl.clone()
    loginUrl.pathname = '/login'
    return NextResponse.redirect(loginUrl)
  }

  // Du kan validera JWT token manuellt här om du vill

  return NextResponse.next()
}

export const config = {
  matcher: ['/backoffice/:path*'],
}
