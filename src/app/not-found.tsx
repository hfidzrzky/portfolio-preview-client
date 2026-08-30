import type { Metadata } from "next";
import Link from "next/link";
import { FilmRollSvg } from "@/shared/ui";

export const metadata: Metadata = {
  title: "404 - Page Not Found | Frame Not Found",
  description:
    "The requested page or footage could not be found or is currently unavailable.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="fixed inset-0 z-99999 bg-dark flex flex-col items-center justify-center p-6 select-none overflow-hidden">
      {/* Background cinematic subtle lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-100 h-100 bg-white/2 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-md w-full text-center flex flex-col items-center my-auto">
        {/* Film Reel SVG Icon with subtle hover & scale */}
        <div className="mb-6">
          <FilmRollSvg size={140} />
        </div>

        {/* Main Title */}
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
          404 - Page Not Found
        </h1>

        {/* Description */}
        <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mb-8 max-w-sm">
          The requested page or sequence could not be found or is currently unavailable in the editing room.
        </p>

        {/* Action Button */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-2.5 rounded-lg bg-white text-black font-semibold text-sm hover:bg-zinc-200 transition-all shadow-lg active:scale-95 cursor-pointer"
          >
            Reload Scene
          </Link>
        </div>
      </div>
    </div>
  );
}

