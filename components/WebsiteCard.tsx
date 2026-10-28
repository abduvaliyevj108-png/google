import React from "react";
import { Website } from "@/types/website";
import {
  ExternalLink,
  Star,
  Bookmark,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  XCircle,
  Tag,
  Sparkles,
  Users,
  CreditCard,
  Building2,
  Calendar,
  Layers,
  ArrowRight,
} from "lucide-react";

interface WebsiteCardProps {
  site: Website;
  isSaved: boolean;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onToggleSave: (id: string, e: React.MouseEvent) => void;
}

export const WebsiteCard: React.FC<WebsiteCardProps> = ({
  site,
  isSaved,
  isExpanded,
  onToggleExpand,
  onToggleSave,
}) => {
  return (
    <div
      onClick={onToggleExpand}
      className={`group relative bg-slate-900/70 border rounded-3xl p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 backdrop-blur-sm cursor-pointer ${
        isExpanded
          ? "border-indigo-500 bg-slate-900 shadow-2xl shadow-indigo-950/70 ring-2 ring-indigo-500/30 md:col-span-2 lg:col-span-3"
          : "border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/90 hover:shadow-xl hover:shadow-black/40"
      }`}
    >
      <div>
        {/* Tepa qism: Logo, Nomi, Kategoriya, Saqlash & Ochish tugmasi */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3.5">
            <div
              className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center font-extrabold text-xl transition-all duration-300 ${
                isExpanded
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/40 rotate-1"
                  : "bg-slate-800/90 border border-slate-700/60 text-slate-200 group-hover:border-indigo-500/50"
              }`}
            >
              {site.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="font-bold text-slate-100 text-lg sm:text-xl group-hover:text-indigo-400 transition-colors">
                  {site.name}
                </h2>
                {isExpanded && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 animate-pulse">
                    <Sparkles className="w-3.5 h-3.5" /> To&apos;liq tahliliy rejim
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                <span className="text-indigo-400/90 font-medium">
                  {site.categoryLabel}
                </span>
                {site.company && (
                  <>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-slate-400">
                      <Building2 className="w-3 h-3" /> {site.company}
                    </span>
                  </>
                )}
                {site.foundedYear && (
                  <>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-slate-400">
                      <Calendar className="w-3 h-3" /> {site.foundedYear}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={(e) => onToggleSave(site.id, e)}
              title="Sevimlilarga saqlash"
              className="p-2 rounded-xl text-slate-500 hover:text-amber-400 hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <Bookmark
                className={`w-4 h-4 ${isSaved ? "fill-amber-400 text-amber-400" : ""}`}
              />
            </button>

            <button
              type="button"
              className={`p-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-all ${
                isExpanded ? "text-indigo-400 bg-slate-800" : ""
              }`}
            >
              {isExpanded ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Tavsif */}
        <p
          className={`text-slate-300 leading-relaxed mb-4 ${
            isExpanded
              ? "text-slate-200 text-base sm:text-lg font-normal bg-slate-950/40 p-4 rounded-2xl border border-slate-800/60"
              : "line-clamp-3 text-slate-400 text-sm"
          }`}
        >
          {site.description}
        </p>

        {/* ===================== KENGAYGANDA KO'RINADIGAN BOYLASHTIRILGAN BLOKLAR ===================== */}
        {isExpanded && (
          <div className="space-y-5 my-6 animate-fade-in">
            {/* 1. Kimlar uchun & Tarif shartlari (Grid 2 ustun) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {site.targetAudience && (
                <div className="bg-slate-800/40 border border-slate-800 p-4 rounded-2xl">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase text-indigo-400 mb-2 tracking-wider">
                    <Users className="w-4 h-4" />
                    <span>Kimlar uchun mo&apos;ljallangan</span>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {site.targetAudience}
                  </p>
                </div>
              )}

              <div className="bg-slate-800/40 border border-slate-800 p-4 rounded-2xl">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase text-emerald-400 mb-2 tracking-wider">
                  <CreditCard className="w-4 h-4" />
                  <span>Tarif va Narxlash shartlari ({site.pricing})</span>
                </div>
                <div className="space-y-1.5 text-xs sm:text-sm">
                  {site.freePlanDetails && (
                    <p className="text-slate-300">
                      <strong className="text-slate-100">Bepul versiya:</strong>{" "}
                      {site.freePlanDetails}
                    </p>
                  )}
                  {site.paidPlanDetails && (
                    <p className="text-slate-400">
                      <strong className="text-slate-200">Pullik obuna:</strong>{" "}
                      {site.paidPlanDetails}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* 2. Plyus va Minuslari (Pros & Cons) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {site.pros && site.pros.length > 0 && (
                <div className="bg-emerald-950/20 border border-emerald-900/40 p-4 rounded-2xl">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Kuchli tomonlari (Afzalliklari)</span>
                  </h3>
                  <ul className="space-y-2">
                    {site.pros.map((pro, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-xs sm:text-sm text-slate-200"
                      >
                        <span className="text-emerald-400 font-bold shrink-0 mt-0.5">
                          ✓
                        </span>
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {site.cons && site.cons.length > 0 && (
                <div className="bg-rose-950/20 border border-rose-900/40 p-4 rounded-2xl">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-rose-400 mb-3 flex items-center gap-2">
                    <XCircle className="w-4 h-4" />
                    <span>E&apos;tiborga olish kerak (Kamchiliklari)</span>
                  </h3>
                  <ul className="space-y-2">
                    {site.cons.map((con, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-xs sm:text-sm text-slate-300"
                      >
                        <span className="text-rose-400 font-bold shrink-0 mt-0.5">
                          ✕
                        </span>
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* 3. Barcha imkoniyatlar (Features) */}
            <div className="bg-slate-950/50 border border-slate-800 p-4 sm:p-5 rounded-2xl">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                Barcha asosiy xususiyatlari va funksiyalari
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                {site.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 bg-slate-900/80 p-2.5 rounded-xl border border-slate-800/80 text-xs text-slate-200"
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Muqobil saytlar (Alternatives) */}
            {site.alternatives && site.alternatives.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 pt-2 text-xs text-slate-400">
                <span className="flex items-center gap-1 font-medium text-slate-300">
                  <Layers className="w-3.5 h-3.5 text-indigo-400" /> O&apos;xshash muqobillari:
                </span>
                {site.alternatives.map((alt) => (
                  <span
                    key={alt}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-200 font-medium border border-slate-700/60"
                  >
                    {alt}
                  </span>
                ))}
              </div>
            )}

            {/* 5. Teglar */}
            <div className="flex flex-wrap items-center gap-1.5 pt-2">
              <Tag className="w-3.5 h-3.5 text-slate-500 mr-1" />
              {site.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-lg bg-indigo-950/50 border border-indigo-800/40 text-indigo-300 text-xs font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Standart (Kichik) holatdagi xususiyatlar */}
        {!isExpanded && (
          <div className="space-y-1.5 mb-4">
            {site.features.slice(0, 2).map((feat, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 text-xs text-slate-400"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400/80 shrink-0"></div>
                <span className="truncate">{feat}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Kartochka pastki qismi */}
      <div>
        {!isExpanded && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {site.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-md bg-slate-800/70 text-slate-400 text-[11px] font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
          <div className="flex items-center gap-3">
            <span
              className={`px-2.5 py-1 rounded-lg font-semibold text-xs ${
                site.pricing === "Bepul"
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                  : site.pricing === "Freemium"
                  ? "bg-sky-500/10 text-sky-400 border border-sky-500/20"
                  : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
              }`}
            >
              {site.pricing}
            </span>
            <div className="flex items-center gap-1 text-slate-400">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span className="font-bold text-slate-200 text-sm">
                {site.rating}
              </span>
              <span className="text-[11px] text-slate-500">/ 5.0</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-slate-400 hover:text-slate-200 text-xs font-medium">
              {isExpanded ? "▲ Yopish" : "▼ Batafsil ma'lumot"}
            </span>
            <a
              href={site.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl font-semibold transition-all shadow-md ${
                isExpanded
                  ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30 scale-102"
                  : "bg-slate-800 hover:bg-indigo-600 text-slate-200 hover:text-white"
              }`}
            >
              <span>Saytga kirish</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
