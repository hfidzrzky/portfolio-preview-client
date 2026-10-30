import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * ============================================================================
 * SITE LOCK / MAINTENANCE SWITCH (KILL SWITCH)
 * ============================================================================
 * - Ubah ke `true`  : Mengunci seluruh web dan langsung menampilkan halaman 404.
 * - Ubah ke `false` : Web kembali aktif dan normal 100%.
 * - (Atau Anda bisa langsung menghapus file ini jika sudah lunas sepenuhnya).
 * ============================================================================
 */
const IS_LOCKED = false;

export function middleware(request: NextRequest) {
  if (IS_LOCKED) {
    // Teruskan semua request halaman ke /not-found internal rewrite (menghasilkan status 404)
    return NextResponse.rewrite(new URL("/not-found", request.url), {
      status: 404,
    });
  }

  return NextResponse.next();
}

export default middleware;

export const config = {
  // Intercept semua route halaman, lewati file aset statis dan API internal
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|images|our-client|selected-works).*)",
  ],
};
