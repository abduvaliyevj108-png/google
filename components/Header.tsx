import React from "react";
import { Search, Sparkles, X } from "lucide-react";

interface HeaderProps {
  totalCount: number;
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  totalCount,
  searchQuery,
  onSearchChange,
}) => {
  return (
    <header className="text-center max-w-3xl mx-auto mb-12">
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs sm:text-sm font-medium mb-4">
        <Sparkles className="w-4 h-4" />
        <span>Eng sara va saralangan {totalCount}+ veb-saytlar bazasi</span>
      </div>
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent mb-4">
        Veb-saytlar Ensiklopediyasi
      </h1>
      <p className="text-slate-400 text-base sm:text-lg">
        Internetdagi eng muhim, foydali, o&apos;rganish va ishlash uchun zarur
        bo&apos;lgan barcha saytlar haqida to&apos;liq ma&apos;lumot, imkoniyatlar
        va havolalar.
      </p>

      {/* Qidiruv qutisi */}
      <div className="mt-8 relative max-w-2xl mx-auto">
        <div className="relative flex items-center">
          <Search className="absolute left-4 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Sayt nomi, vazifasi yoki kalit so'z bo'yicha qidiring (masalan: Figma, Python, Video, PDF)..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-12 pr-10 py-4 bg-slate-900/90 border border-slate-800 rounded-2xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all shadow-xl shadow-black/40 text-sm sm:text-base backdrop-blur-md"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-4 text-slate-400 hover:text-slate-200 p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
