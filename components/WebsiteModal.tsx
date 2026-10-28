import React from "react";
import { Website } from "@/types/website";
import { X, ChevronRight, Star, ExternalLink } from "lucide-react";

interface WebsiteModalProps {
  site: Website | null;
  onClose: () => void;
}

export const WebsiteModal: React.FC<WebsiteModalProps> = ({
  site,
  onClose,
}) => {
  if (!site) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Yopish tugmasi */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-indigo-600/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-extrabold text-2xl">
            {site.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold text-white">{site.name}</h2>
              <span
                className={`px-2 py-0.5 rounded text-xs font-semibold ${
                  site.pricing === "Bepul"
                    ? "bg-emerald-500/20 text-emerald-400"
                    : site.pricing === "Freemium"
                    ? "bg-sky-500/20 text-sky-400"
                    : "bg-amber-500/20 text-amber-400"
                }`}
              >
                {site.pricing}
              </span>
            </div>
            <p className="text-slate-400 text-sm mt-0.5">
              {site.categoryLabel}
            </p>
          </div>
        </div>

        {/* To'liq tavsif */}
        <div className="mb-6">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Sayt haqida batafsil
          </h3>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {site.description}
          </p>
        </div>

        {/* Asosiy xususiyatlar */}
        <div className="mb-6">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2.5">
            Asosiy imkoniyatlari
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {site.features.map((feat, i) => (
              <div
                key={i}
                className="flex items-start gap-2 bg-slate-800/40 p-2.5 rounded-xl border border-slate-800 text-xs sm:text-sm text-slate-200"
              >
                <ChevronRight className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Teglar */}
        <div className="mb-6">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Kalit so&apos;zlar
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {site.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 text-xs"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Pastki harakat tugmalari */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-1.5">
            <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
            <span className="font-bold text-white text-base">
              {site.rating}
            </span>
            <span className="text-xs text-slate-500">/ 5.0 reyting</span>
          </div>

          <a
            href={site.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-semibold transition-all shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50"
          >
            <span>Saytga kirish</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};
