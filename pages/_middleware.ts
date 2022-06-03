import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest, ev: NextFetchEvent) {
    console.log('middleware seen from server')
    return NextResponse.next()

/*   return new Response("Access Denied", {
      status: 401,
      headers: {
          'x-token': 'DoenstExist',
      }
  }); */
}
