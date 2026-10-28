import React from "react";
import {
  Globe,
  Sparkles,
  Heart,
  Send,
  ShieldCheck,
  Zap,
  Layers,
} from "lucide-react";

interface FooterProps {
  totalCount: number;
}

export const Footer: React.FC<FooterProps> = ({ totalCount }) => {
  return (
    <footer className="relative z-10 border-t border-slate-800/80 bg-slate-950/80 backdrop-blur-md mt-24 text-slate-400">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* 1-ustun: Brend va Tavsif */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-indigo-600/40">
                <Globe className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-white text-lg tracking-tight">
                VebPedia
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Dunyoning eng sara, samarali va foydali veb-saytlari haqida to&apos;liq
              ma&apos;lumot beruvchi ochiq ensiklopediya portali.
            </p>
            <div className="flex items-center gap-2 text-xs text-indigo-400 font-medium">
              <Zap className="w-3.5 h-3.5" />
              <span>{totalCount}+ tasdiqlangan saytlar</span>
            </div>
          </div>

          {/* 2-ustun: Asosiy yo'nalishlar */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-indigo-400" />
              <span>Kategoriyalar</span>
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="hover:text-indigo-400 transition-colors cursor-pointer">
                Sun&apos;iy intellekt (AI) vositalari
              </li>
              <li className="hover:text-indigo-400 transition-colors cursor-pointer">
                Dasturlash va IT kutubxonalar
              </li>
              <li className="hover:text-indigo-400 transition-colors cursor-pointer">
                Dizayn va UI/UX resurslari
              </li>
              <li className="hover:text-indigo-400 transition-colors cursor-pointer">
                Ta&apos;lim va Onlayn kurslar
              </li>
              <li className="hover:text-indigo-400 transition-colors cursor-pointer">
                Samaradorlik va biznes vositalari
              </li>
            </ul>
          </div>

          {/* 3-ustun: Imkoniyatlar */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Afzalliklar</span>
            </h4>
            <ul className="space-y-2 text-xs">
              <li>✓ Xolis plyus va minuslar tahlili</li>
              <li>✓ Bepul va pullik tariflar taqqosi</li>
              <li>✓ Real havola va muqobil xizmatlar</li>
              <li>✓ Muntazam yangilanib turuvchi baza</li>
              <li>✓ Reklamasiz va tezkor qidiruv</li>
            </ul>
          </div>

          {/* 4-ustun: Aloqa va Hamkorlik */}
          <div>
            <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <Send className="w-3.5 h-3.5 text-sky-400" />
              <span>Aloqa & Taklif</span>
            </h4>
            <p className="text-xs text-slate-400 mb-3 leading-relaxed">
              O&apos;z saytingizni yoki foydali xizmatni katalogga qo&apos;shishni
              xohlaysizmi?
            </p>
            <a
              href="https://t.me"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-800 text-xs text-slate-200 hover:text-white transition-all shadow-sm"
            >
              <Send className="w-3.5 h-3.5 text-sky-400" />
              <span>Telegram orqali bog&apos;lanish</span>
            </a>
          </div>
        </div>

        {/* Pastki mualliflik qismi */}
        <div className="pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="flex items-center gap-1 text-slate-500">
            © 2026 VebPedia. Barcha huquqlar himoyalangan.
          </p>

          <div className="flex items-center gap-1 text-slate-500">
            <span>Dasturchilar va foydalanuvchilar uchun mehr bilan</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>yaratildi</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span className="hover:text-slate-200 cursor-pointer">Maxfiylik</span>
            <span>•</span>
            <span className="hover:text-slate-200 cursor-pointer">Foydalanish shartlari</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
