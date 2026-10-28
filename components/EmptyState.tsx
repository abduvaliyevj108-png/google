import React from "react";
import { Info } from "lucide-react";

interface EmptyStateProps {
  onReset: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onReset }) => {
  return (
    <div className="text-center py-20 bg-slate-900/40 border border-slate-800/60 rounded-3xl mt-6">
      <Info className="w-12 h-12 text-slate-500 mx-auto mb-3" />
      <h3 className="text-lg font-semibold text-slate-300">
        Hech qanday sayt topilmadi
      </h3>
      <p className="text-slate-500 text-sm mt-1 max-w-sm mx-auto">
        Qidiruv so&apos;zini o&apos;zgartirib ko&apos;ring yoki filtrlarni tozalang.
      </p>
      <button
        onClick={onReset}
        className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-medium transition-colors cursor-pointer"
      >
        Filtrlarni bekor qilish
      </button>
    </div>
  );
};
