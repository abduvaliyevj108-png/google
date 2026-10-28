"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { Website } from "@/types/website";
import { Mahsulot } from "@/types/mahsulot";
import { getWebsites, getMahsulotlar, createMahsulot } from "@/lib/api";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AuthModal } from "@/components/AuthModal";
import { PricingModal } from "@/components/PricingModal";
import {
  Search,
  Sparkles,
  ExternalLink,
  Star,
  Users,
  CreditCard,
  Building2,
  Calendar,
  CheckCircle2,
  XCircle,
  Layers,
  ArrowRight,
  X,
  Compass,
  Package,
  Plus,
  RefreshCw,
  Server,
} from "lucide-react";

const POPULAR_TAGS = [
  "ChatGPT",
  "Figma",
  "GitHub",
  "YouTube",
  "Notion",
  "TradingView",
  "Dizayn",
  "Dasturlash",
  "Sun'iy intellekt",
  "PDF",
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSite, setSelectedSite] = useState<Website | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // 1. Django Backend dan olinadigan Saytlar ro'yxati (http://127.0.0.1:8000/websites/)
  const [websites, setWebsites] = useState<Website[]>([]);
  const [loadingWebsites, setLoadingWebsites] = useState<boolean>(true);

  // 2. Django Backend dan olinadigan Mahsulotlar (http://127.0.0.1:8000/mahsulot/)
  const [mahsulotlar, setMahsulotlar] = useState<Mahsulot[]>([]);
  const [loadingMahsulot, setLoadingMahsulot] = useState<boolean>(true);
  const [isLiveApi, setIsLiveApi] = useState<boolean>(false);

  // Yangi mahsulot qo'shish formasi
  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Foydalanuvchi holati (Auth & Subscription)
  const [user, setUser] = useState<{
    name: string;
    email: string;
    isPro: boolean;
  } | null>(null);

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [pricingModalOpen, setPricingModalOpen] = useState(false);

  // Django Backend (http://127.0.0.1:8000) dan barcha JSON ma'lumotlarni yuklab olish
  const loadDataFromBackend = async () => {
    setLoadingWebsites(true);
    setLoadingMahsulot(true);

    try {
      const [fetchedWebsites, fetchedMahsulotlar] = await Promise.all([
        getWebsites(),
        getMahsulotlar(),
      ]);

      setWebsites(fetchedWebsites);
      setMahsulotlar(fetchedMahsulotlar);
      setIsLiveApi(true);
    } catch (err) {
      console.error("Backend fetch error:", err);
      setIsLiveApi(false);
    } finally {
      setLoadingWebsites(false);
      setLoadingMahsulot(false);
    }
  };

  useEffect(() => {
    loadDataFromBackend();
  }, []);

  // Yangi mahsulotni POST qilish
  const handleCreateMahsulot = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newPrice) return;

    setSubmitting(true);
    try {
      const created = await createMahsulot({
        name: newName,
        price: parseInt(newPrice, 10),
        description: newDesc,
      });

      setMahsulotlar((prev) => [created, ...prev]);
      setNewName("");
      setNewPrice("");
      setNewDesc("");
      setShowAddForm(false);
    } catch (err: any) {
      alert(err.message || "Xatolik yuz berdi");
    } finally {
      setSubmitting(false);
    }
  };

  // Qidiruv bo'yicha takliflar (Search dropdown / Suggestions)
  const matchingSites = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return [];

    return websites.filter((site) => {
      return (
        site.name.toLowerCase().includes(query) ||
        site.description.toLowerCase().includes(query) ||
        site.tags.some((tag) => tag.toLowerCase().includes(query)) ||
        site.categoryLabel.toLowerCase().includes(query)
      );
    });
  }, [searchQuery, websites]);

  const handleSelectSite = (site: Website) => {
    setSelectedSite(site);
  };

  const handleClear = () => {
    setSearchQuery("");
    setSelectedSite(null);
  };

  const handleFocusSearch = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleCategoryFromNav = (catKey: string) => {
    const firstMatch = websites.find((w) => w.category === catKey);
    if (firstMatch) {
      setSearchQuery(firstMatch.categoryLabel);
    }
  };

  const handleSubscribeSuccess = (planName: string) => {
    if (user) {
      setUser({ ...user, isPro: true });
    } else {
      setUser({ name: "Foydalanuvchi", email: "user@vebpedia.uz", isPro: true });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-indigo-500 selection:text-white flex flex-col justify-between">
      {/* NAVBAR */}
      <Navbar
        totalCount={websites.length || 112}
        user={user}
        onOpenAuth={() => setAuthModalOpen(true)}
        onOpenPricing={() => setPricingModalOpen(true)}
        onLogout={() => setUser(null)}
        onSelectCategory={handleCategoryFromNav}
        onFocusSearch={handleFocusSearch}
      />

      {/* Orqa fon nur effektlari */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-indigo-600/15 rounded-full blur-[140px]"></div>
        <div className="absolute top-1/3 left-1/3 w-[400px] h-[350px] bg-purple-600/10 rounded-full blur-[120px]"></div>
      </div>

      <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 w-full pt-12 sm:pt-16 pb-12 flex-1">
        {/* LOGO VA SARLAVHA */}
        <div className="text-center mb-8 sm:mb-12">
          {/* Jonli Backend Ulanish Ko'rsatkichi */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-300 font-medium mb-4 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <Server className="w-3.5 h-3.5 text-indigo-400" />
            <span>
              Django API: <strong className="text-emerald-400">http://127.0.0.1:8000</strong>
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-indigo-300 font-semibold">
              {websites.length} ta sayt yuklandi
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent mb-3">
            Sayt Qidiruvi
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-md mx-auto">
            Sayt nomi, sohasi yoki vazifasini yozing — u haqida to&apos;liq ma&apos;lumot beramiz.
          </p>
        </div>

        {/* KATTA INPUT VA AVTOMATIK TAKLIFLAR QUTISI */}
        <div className="relative w-full max-w-3xl mx-auto mb-6">
          <div className="relative flex items-center bg-slate-900/90 border-2 border-slate-700/80 hover:border-indigo-500/60 focus-within:border-indigo-500 rounded-3xl shadow-2xl shadow-black/80 transition-all duration-300 backdrop-blur-xl">
            <div className="pl-6 text-slate-400">
              <Search className="w-7 h-7 text-indigo-400" />
            </div>

            <input
              ref={inputRef}
              type="text"
              autoFocus
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (!e.target.value.trim()) {
                  setSelectedSite(null);
                }
              }}
              placeholder="Qaysi sayt haqida bilmoqchisiz? (masalan: Figma, GitHub, ChatGPT)..."
              className="w-full py-5 sm:py-6 pl-4 pr-12 bg-transparent text-slate-100 placeholder-slate-500 text-base sm:text-xl font-medium focus:outline-none"
            />

            {searchQuery && (
              <button
                onClick={handleClear}
                className="absolute right-5 p-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Qidiruv natijalari takliflar ro'yxati (Dropdown) */}
          {searchQuery.trim() !== "" && !selectedSite && (
            <div className="absolute left-0 right-0 top-full mt-3 bg-slate-900/95 border border-slate-800 rounded-2xl shadow-2xl shadow-black/90 backdrop-blur-xl overflow-hidden z-30 max-h-96 overflow-y-auto divide-y divide-slate-800/60">
              {matchingSites.length > 0 ? (
                matchingSites.map((site) => (
                  <button
                    key={site.id}
                    onClick={() => handleSelectSite(site)}
                    className="w-full text-left p-4 hover:bg-indigo-600/10 flex items-center justify-between gap-4 transition-colors group cursor-pointer"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center font-bold text-slate-200 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                        {site.name.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-slate-200 group-hover:text-indigo-400 text-base">
                            {site.name}
                          </h3>
                          <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                            {site.categoryLabel}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 line-clamp-1 max-w-md mt-0.5">
                          {site.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-500 group-hover:text-indigo-400 shrink-0">
                      <span>Ko&apos;rish</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </button>
                ))
              ) : (
                <div className="p-8 text-center text-slate-400">
                  <p className="text-base font-medium">Sayt topilmadi</p>
                  <p className="text-xs text-slate-500 mt-1">
                    Boshqa so&apos;z yoki nom bilan qidirib ko&apos;ring.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* TEZ-TEZ QIDIRILADIGAN TEGLAR */}
        {!selectedSite && searchQuery.trim() === "" && (
          <div className="text-center max-w-2xl mx-auto mt-6">
            <div className="flex items-center justify-center gap-2 text-xs font-medium text-slate-500 mb-3">
              <Compass className="w-4 h-4" />
              <span>Ommabop qidiruvlar:</span>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {POPULAR_TAGS.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSearchQuery(tag)}
                  className="px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 hover:border-indigo-500/50 hover:bg-indigo-500/10 text-slate-300 hover:text-indigo-300 text-xs sm:text-sm transition-all cursor-pointer"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* TANLANGAN SAYT HAQIDA TO'LIQ KATTA MA'LUMOT KARTASI */}
        {selectedSite && (
          <div className="mt-8 bg-slate-900 border-2 border-indigo-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-indigo-950/60 animate-fade-in relative backdrop-blur-xl">
            {/* Yopish tugmasi */}
            <button
              onClick={() => setSelectedSite(null)}
              className="absolute top-6 right-6 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              title="Yopish"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Sarlavha qismi */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-extrabold text-2xl sm:text-3xl shadow-lg shadow-indigo-600/30">
                {selectedSite.name.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                    {selectedSite.name}
                  </h2>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      selectedSite.pricing === "Bepul"
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        : selectedSite.pricing === "Freemium"
                        ? "bg-sky-500/20 text-sky-400 border border-sky-500/30"
                        : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                    }`}
                  >
                    {selectedSite.pricing}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-400 mt-1.5">
                  <span className="text-indigo-400 font-semibold">
                    {selectedSite.categoryLabel}
                  </span>
                  {selectedSite.company && (
                    <>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Building2 className="w-3.5 h-3.5" />{" "}
                        {selectedSite.company}
                      </span>
                    </>
                  )}
                  {selectedSite.foundedYear && (
                    <>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />{" "}
                        {selectedSite.foundedYear}-yil
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* To'liq tavsifi */}
            <div className="bg-slate-950/60 p-5 rounded-2xl border border-slate-800 mb-6">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Sayt nima vazifani bajaradi?
              </h3>
              <p className="text-slate-200 text-base sm:text-lg leading-relaxed">
                {selectedSite.description}
              </p>
            </div>

            {/* Kimlar uchun & Narx shartlari */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-slate-800/40 border border-slate-800 p-4 sm:p-5 rounded-2xl">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase text-indigo-400 mb-2 tracking-wider">
                  <Users className="w-4 h-4" />
                  <span>Kimlar uchun mo&apos;ljallangan</span>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {selectedSite.targetAudience}
                </p>
              </div>

              <div className="bg-slate-800/40 border border-slate-800 p-4 sm:p-5 rounded-2xl">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase text-emerald-400 mb-2 tracking-wider">
                  <CreditCard className="w-4 h-4" />
                  <span>Tarif va Narx imkoniyatlari</span>
                </div>
                <div className="space-y-1 text-xs sm:text-sm">
                  {selectedSite.freePlanDetails && (
                    <p className="text-slate-300">
                      <strong className="text-slate-100">Bepul:</strong>{" "}
                      {selectedSite.freePlanDetails}
                    </p>
                  )}
                  {selectedSite.paidPlanDetails && (
                    <p className="text-slate-400">
                      <strong className="text-slate-200">Pullik obuna:</strong>{" "}
                      {selectedSite.paidPlanDetails}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Plyus va Minuslari */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {selectedSite.pros && selectedSite.pros.length > 0 && (
                <div className="bg-emerald-950/20 border border-emerald-900/40 p-4 sm:p-5 rounded-2xl">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Afzalliklari (Plyuslari)</span>
                  </h4>
                  <ul className="space-y-2">
                    {selectedSite.pros.map((pro, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-xs sm:text-sm text-slate-200"
                      >
                        <span className="text-emerald-400 font-bold shrink-0">
                          ✓
                        </span>
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedSite.cons && selectedSite.cons.length > 0 && (
                <div className="bg-rose-950/20 border border-rose-900/40 p-4 sm:p-5 rounded-2xl">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-rose-400 mb-3 flex items-center gap-2">
                    <XCircle className="w-4 h-4" />
                    <span>Kamchiliklari (Minuslari)</span>
                  </h4>
                  <ul className="space-y-2">
                    {selectedSite.cons.map((con, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-xs sm:text-sm text-slate-300"
                      >
                        <span className="text-rose-400 font-bold shrink-0">
                          ✕
                        </span>
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Asosiy funksiyalari */}
            <div className="bg-slate-950/50 border border-slate-800 p-5 rounded-2xl mb-6">
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                Asosiy xususiyatlari
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                {selectedSite.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 bg-slate-900 p-2.5 rounded-xl border border-slate-800/80 text-xs text-slate-200"
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Muqobillar va O'tish tugmasi */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-800">
              {selectedSite.alternatives && selectedSite.alternatives.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                  <span className="flex items-center gap-1 font-medium text-slate-300">
                    <Layers className="w-3.5 h-3.5 text-indigo-400" /> Muqobillari:
                  </span>
                  {selectedSite.alternatives.map((alt) => (
                    <button
                      key={alt}
                      onClick={() => {
                        setSearchQuery(alt);
                        const found = websites.find(
                          (w) => w.name.toLowerCase() === alt.toLowerCase()
                        );
                        if (found) setSelectedSite(found);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium transition-colors cursor-pointer"
                    >
                      {alt}
                    </button>
                  ))}
                </div>
              )}

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 text-slate-400">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="font-bold text-white text-base">
                    {selectedSite.rating}
                  </span>
                  <span className="text-xs text-slate-500">/ 5.0</span>
                </div>

                <a
                  href={selectedSite.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-600/40 hover:scale-105 transition-all"
                >
                  <span>Saytga kirish</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* BACKEND (DJANGO API) INTEGRATSIYASI: MAHSULOTLAR BO'LIMI */}
        {/* ======================================================== */}
        <section className="mt-16 pt-12 border-t border-slate-800/80">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
                  Django REST API
                </span>
                <span className="text-xs text-slate-400">• http://127.0.0.1:8000/mahsulot/</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white mt-1 flex items-center gap-2">
                <Package className="w-6 h-6 text-indigo-400" />
                <span>Backend Mahsulotlar Ro&apos;yxati</span>
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={loadDataFromBackend}
                title="Qayta yuklash"
                className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <RefreshCw
                  className={`w-4 h-4 ${loadingMahsulot ? "animate-spin" : ""}`}
                />
              </button>

              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Yangi mahsulot</span>
              </button>
            </div>
          </div>

          {/* Yangi mahsulot qo'shish formasi */}
          {showAddForm && (
            <form
              onSubmit={handleCreateMahsulot}
              className="bg-slate-900 border border-indigo-500/40 rounded-2xl p-5 mb-6 space-y-4 shadow-xl"
            >
              <h3 className="text-sm font-bold text-white">
                Django PostgreSQL bazasiga yangi mahsulot qo&apos;shish
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Nomi *
                  </label>
                  <input
                    type="text"
                    required
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Mahsulot nomi"
                    className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Narxi (so&apos;m) *
                  </label>
                  <input
                    type="number"
                    required
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    placeholder="Masalan: 50000"
                    className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Tavsifi
                </label>
                <input
                  type="text"
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Mahsulot haqida qisqacha ma'lumot"
                  className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-3.5 py-1.5 text-xs text-slate-400 hover:text-white"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold disabled:opacity-50"
                >
                  {submitting ? "Saqlanmoqda..." : "Saqlash"}
                </button>
              </div>
            </form>
          )}

          {/* Mahsulotlar kartalari */}
          {loadingMahsulot && mahsulotlar.length === 0 ? (
            <div className="text-center py-8 text-slate-500 text-xs">
              Django API orqali mahsulotlar yuklanmoqda...
            </div>
          ) : mahsulotlar.length === 0 ? (
            <div className="text-center py-8 text-slate-500 text-xs bg-slate-900/40 rounded-2xl border border-slate-800">
              Hozircha mahsulotlar mavjud emas. Yuqoridagi &quot;Yangi mahsulot&quot; tugmasi orqali qo&apos;shing.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {mahsulotlar.map((item) => (
                <div
                  key={item.id}
                  className="bg-slate-900/80 border border-slate-800 hover:border-indigo-500/50 rounded-2xl p-4 flex flex-col justify-between transition-all"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h4 className="font-bold text-white text-sm line-clamp-1">
                        {item.name}
                      </h4>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                        #{item.id}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-3">
                      {item.description || "Tavsif berilmagan."}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <span className="text-indigo-400 font-extrabold text-sm">
                      {item.price.toLocaleString("uz-UZ")} so&apos;m
                    </span>
                    <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded">
                      Mavjud
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* FOOTER */}
      <Footer totalCount={websites.length || 112} />

      {/* MODAL OYNALAR */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onLoginSuccess={(loggedUser) => setUser(loggedUser)}
      />

      <PricingModal
        isOpen={pricingModalOpen}
        onClose={() => setPricingModalOpen(false)}
        onSubscribeSuccess={handleSubscribeSuccess}
      />
    </div>
  );
}
