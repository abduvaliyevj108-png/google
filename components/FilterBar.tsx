import React from "react";
import {
  Globe,
  Sparkles,
  Code2,
  Palette,
  GraduationCap,
  Briefcase,
  Wrench,
  Tv,
  Coins,
  Bookmark,
  SlidersHorizontal,
} from "lucide-react";

export const CATEGORIES = [
  { key: "all", label: "Barchasi", icon: Globe },
  { key: "ai", label: "Sun'iy intellekt", icon: Sparkles },
  { key: "dev", label: "Dasturlash & IT", icon: Code2 },
  { key: "design", label: "Dizayn & Grafika", icon: Palette },
  { key: "education", label: "Ta'lim & O'rganish", icon: GraduationCap },
  { key: "productivity", label: "Samaradorlik", icon: Briefcase },
  { key: "tools", label: "Foydali vositalar", icon: Wrench },
  { key: "entertainment", label: "Ko'ngilochar", icon: Tv },
  { key: "finance", label: "Moliya & Kripto", icon: Coins },
];

interface FilterBarProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  selectedPricing: string;
  onSelectPricing: (pricing: string) => void;
  filteredCount: number;
  savedCount: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  selectedCategory,
  onSelectCategory,
  selectedPricing,
  onSelectPricing,
  filteredCount,
  savedCount,
}) => {
  return (
    <section className="mb-8">
      {/* Kategoriyalar tugmalari */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 pt-1 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const isActive = selectedCategory === cat.key;
          return (
            <button
              key={cat.key}
              onClick={() => onSelectCategory(cat.key)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 cursor-pointer ${
                isActive
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 scale-102"
                  : "bg-slate-900/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 border border-slate-800/80"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Narxlash filtri va Statistika */}
      <div className="flex flex-wrap items-center justify-between gap-4 mt-4 pt-4 border-t border-slate-800/60 text-xs sm:text-sm text-slate-400">
        <div className="flex items-center gap-2">
          <span className="font-medium text-slate-300">
            Topildi: <span className="text-indigo-400 font-bold">{filteredCount}</span> ta sayt
          </span>
          {savedCount > 0 && (
            <span className="text-amber-400/90 ml-3 flex items-center gap-1">
              <Bookmark className="w-3.5 h-3.5 fill-amber-400" /> {savedCount} saqlangan
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-slate-500" />
          <span>Narxi:</span>
          {(["all", "Bepul", "Freemium", "Pullik"] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => onSelectPricing(mode)}
              className={`px-2.5 py-1 rounded-lg text-xs transition-colors cursor-pointer ${
                selectedPricing === mode
                  ? "bg-slate-800 text-indigo-400 font-semibold border border-indigo-500/30"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {mode === "all" ? "Hammasi" : mode}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
