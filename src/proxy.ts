import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import path from 'path'
import { auth } from '@/lib/auth'
 

export async function proxy(request: NextRequest) {
    const {pathname}= request.nextUrl
    const publicRoute=["/login","/verify","/message" ,"/register","/api/auth","/favicon.ico","/_next"]
    if(publicRoute.some((path)=>pathname.startsWith(path))){
        return NextResponse.next();
    }
    const session= await auth();
    if(!session){
        const loginUrl= new URL("/login",request.url)
        loginUrl.searchParams.set("callbackUrl",request.url)
        return NextResponse.redirect(loginUrl)

    }
    return NextResponse.next();
    
 
}
export const config = {
  matcher:[
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|webp|svg|css|js)$).*)',
  ]
}