"use client";

import React, { useState } from "react";
import {
  Globe,
  Sparkles,
  PlusCircle,
  Menu,
  X,
  Send,
  LogIn,
  Crown,
  User,
  LogOut,
} from "lucide-react";

interface NavbarProps {
  totalCount: number;
  user: { name: string; email: string; isPro: boolean } | null;
  onOpenAuth: () => void;
  onOpenPricing: () => void;
  onLogout: () => void;
  onSelectCategory?: (category: string) => void;
  onFocusSearch?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  totalCount,
  user,
  onOpenAuth,
  onOpenPricing,
  onLogout,
  onSelectCategory,
  onFocusSearch,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [suggestModalOpen, setSuggestModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [siteName, setSiteName] = useState("");
  const [siteUrl, setSiteUrl] = useState("");
  const [siteDesc, setSiteDesc] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!siteName || !siteUrl) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setSuggestModalOpen(false);
      setSiteName("");
      setSiteUrl("");
      setSiteDesc("");
    }, 2000);
  };

  return (
    <>
      <nav className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* 1. LOGO */}
            <div className="flex items-center gap-3">
              <a
                href="/"
                className="flex items-center gap-2.5 group cursor-pointer"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-indigo-600/30 group-hover:scale-105 transition-transform">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-extrabold text-white text-lg sm:text-xl tracking-tight flex items-center gap-1.5">
                    VebPedia
                    {user?.isPro ? (
                      <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                        <Crown className="w-3 h-3 text-amber-400" /> PRO
                      </span>
                    ) : (
                      <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 hidden sm:inline">
                        Beta
                      </span>
                    )}
                  </span>
                  <span className="text-[10px] text-slate-400 block -mt-1">
                    Saytlar ensiklopediyasi
                  </span>
                </div>
              </a>
            </div>

            {/* 2. O'RTA MENYU (DESKTOP) */}
            <div className="hidden md:flex items-center gap-1 bg-slate-900/60 border border-slate-800/80 p-1.5 rounded-2xl backdrop-blur-md text-xs sm:text-sm font-medium text-slate-300">
              <button
                onClick={() => {
                  if (onSelectCategory) onSelectCategory("ai");
                  if (onFocusSearch) onFocusSearch();
                }}
                className="px-3 py-1.5 rounded-xl hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer"
              >
                AI Vositalar
              </button>
              <button
                onClick={() => {
                  if (onSelectCategory) onSelectCategory("dev");
                  if (onFocusSearch) onFocusSearch();
                }}
                className="px-3 py-1.5 rounded-xl hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer"
              >
                Dasturlash
              </button>
              <button
                onClick={() => {
                  if (onSelectCategory) onSelectCategory("design");
                  if (onFocusSearch) onFocusSearch();
                }}
                className="px-3 py-1.5 rounded-xl hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer"
              >
                Dizayn
              </button>
              <button
                onClick={() => {
                  if (onSelectCategory) onSelectCategory("education");
                  if (onFocusSearch) onFocusSearch();
                }}
                className="px-3 py-1.5 rounded-xl hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer"
              >
                Ta&apos;lim
              </button>
              <button
                onClick={() => {
                  if (onSelectCategory) onSelectCategory("tools");
                  if (onFocusSearch) onFocusSearch();
                }}
                className="px-3 py-1.5 rounded-xl hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer"
              >
                Foydali vositalar
              </button>
            </div>

            {/* 3. O'NG TOMON: OBUNA, KIRISH VA PROFIL TUGMALARI */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Obuna sotib olish tugmasi */}
              <button
                onClick={onOpenPricing}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-gradient-to-r from-amber-500/20 to-amber-600/20 border border-amber-500/40 hover:border-amber-400 text-amber-300 font-semibold text-xs transition-all shadow-md shadow-amber-950/40 cursor-pointer"
              >
                <Crown className="w-3.5 h-3.5 text-amber-400" />
                <span>{user?.isPro ? "PRO tarif" : "Obuna bo'lish"}</span>
              </button>

              {/* Kirish yoki Foydalanuvchi profili */}
              {user ? (
                <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-1 pr-2.5 rounded-xl">
                  <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-xs font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-xs font-medium text-slate-200 hidden sm:inline max-w-[90px] truncate">
                    {user.name}
                  </span>
                  <button
                    onClick={onLogout}
                    title="Chiqish"
                    className="p-1 text-slate-400 hover:text-rose-400 transition-colors ml-1 cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={onOpenAuth}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 hover:bg-slate-800 text-slate-200 font-medium text-xs sm:text-sm transition-all cursor-pointer"
                >
                  <LogIn className="w-4 h-4 text-slate-400" />
                  <span>Kirish</span>
                </button>
              )}

              {/* Sayt taklif qilish */}
              <button
                onClick={() => setSuggestModalOpen(true)}
                title="Sayt taklif qilish"
                className="p-2 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 hover:bg-indigo-600 hover:text-white transition-colors hidden sm:flex cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
              </button>

              {/* Mobil menyu tugmasi */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 md:hidden transition-colors cursor-pointer"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* MOBIL MENYU */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-800 bg-slate-950 px-4 pt-3 pb-5 space-y-2 text-sm text-slate-300">
            <button
              onClick={() => {
                if (onSelectCategory) onSelectCategory("ai");
                if (onFocusSearch) onFocusSearch();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-900 text-slate-200"
            >
              🤖 Sun&apos;iy intellekt (AI)
            </button>
            <button
              onClick={() => {
                if (onSelectCategory) onSelectCategory("dev");
                if (onFocusSearch) onFocusSearch();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-900 text-slate-200"
            >
              💻 Dasturlash & IT
            </button>
            <button
              onClick={() => {
                if (onSelectCategory) onSelectCategory("design");
                if (onFocusSearch) onFocusSearch();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-900 text-slate-200"
            >
              🎨 Dizayn & Grafika
            </button>
            <button
              onClick={() => {
                if (onSelectCategory) onSelectCategory("education");
                if (onFocusSearch) onFocusSearch();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-900 text-slate-200"
            >
              🎓 Ta&apos;lim & Kurslar
            </button>
            <button
              onClick={() => {
                setSuggestModalOpen(true);
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-900 text-indigo-400 font-medium"
            >
              + Sayt taklif qilish
            </button>
          </div>
        )}
      </nav>

      {/* SAYT TAKLIF QILISH MODAL OYNASI */}
      {suggestModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setSuggestModalOpen(false)}
        >
          <div
            className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSuggestModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
              <PlusCircle className="w-5 h-5 text-indigo-400" />
              Yangi sayt taklif qilish
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Katalogga qo&apos;shilmagan foydali saytni bilsangiz, ma&apos;lumotlarini
              yuboring.
            </p>

            {submitted ? (
              <div className="p-6 text-center bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-400 text-sm font-semibold">
                ✓ Rahmat! Sayt qabul qilindi va tekshirilib qo&apos;shiladi.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Sayt nomi *
                  </label>
                  <input
                    type="text"
                    required
                    value={siteName}
                    onChange={(e) => setSiteName(e.target.value)}
                    placeholder="Masalan: Cursor yoki Claude"
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Sayt havolasi (URL) *
                  </label>
                  <input
                    type="url"
                    required
                    value={siteUrl}
                    onChange={(e) => setSiteUrl(e.target.value)}
                    placeholder="https://example.com"
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Qisqacha nima vazifa bajaradi?
                  </label>
                  <textarea
                    rows={3}
                    value={siteDesc}
                    onChange={(e) => setSiteDesc(e.target.value)}
                    placeholder="Saytning asosiy foydasi haqida..."
                    className="w-full px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setSuggestModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-slate-400 hover:text-white text-xs font-medium"
                  >
                    Bekor qilish
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-1.5 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-600/30"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Yuborish</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};
