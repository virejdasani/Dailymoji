import { NextResponse, NextRequest } from "next/server";
export async function middleware(req, ev) {
  const { pathname } = req.nextUrl;
  // redirect to /journal when user goes to /
  if (pathname == "/") {
    return NextResponse.redirect("/journal");
  }
  return NextResponse.next();
}
