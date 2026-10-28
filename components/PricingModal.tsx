"use client";

import React, { useState } from "react";
import { X, Check, Crown, Zap, Shield, Sparkles } from "lucide-react";

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubscribeSuccess: (planName: string) => void;
}

export const PricingModal: React.FC<PricingModalProps> = ({
  isOpen,
  onClose,
  onSubscribeSuccess,
}) => {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("yearly");
  const [isProcessing, setIsProcessing] = useState(false);
  const [successPlan, setSuccessPlan] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSelectPlan = (planName: string) => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setSuccessPlan(planName);
      setTimeout(() => {
        onSubscribeSuccess(planName);
        setSuccessPlan(null);
        onClose();
      }, 1500);
    }, 1000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Sarlavha */}
        <div className="text-center max-w-xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-3">
            <Crown className="w-4 h-4" />
            <span>VebPedia PRO obuna rejalari</span>
          </div>
          <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
            Imkoniyatlaringizni kengaytiring
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            AI tahlillar, yashirin IT vositalar va cheksiz saralangan kutubxonaga
            to&apos;liq kirish huquqiga ega bo&apos;ling.
          </p>

          {/* Oylik / Yillik selektor */}
          <div className="inline-flex items-center p-1 bg-slate-950 border border-slate-800 rounded-xl mt-6">
            <button
              onClick={() => setBillingPeriod("monthly")}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                billingPeriod === "monthly"
                  ? "bg-slate-800 text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Oylik to&apos;lov
            </button>
            <button
              onClick={() => setBillingPeriod("yearly")}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                billingPeriod === "yearly"
                  ? "bg-indigo-600 text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <span>Yillik to&apos;lov</span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.2 rounded font-bold">
                -20% Chegirma
              </span>
            </button>
          </div>
        </div>

        {successPlan ? (
          <div className="py-12 text-center text-emerald-400">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold">Tabriklaymiz!</h4>
            <p className="text-sm text-slate-300 mt-1">
              Siz muvaffaqiyatli {successPlan} obunachisi bo&apos;ldingiz.
            </p>
          </div>
        ) : (
          /* Tarif kartalari */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 1. BEPUL TARIF */}
            <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-white text-lg">Boshlang&apos;ich</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Oddiy qidiruv va tanishish uchun
                </p>
                <div className="mt-4 mb-6">
                  <span className="text-3xl font-extrabold text-white">0</span>
                  <span className="text-xs text-slate-400"> so&apos;m / doimiy</span>
                </div>

                <ul className="space-y-2.5 text-xs text-slate-300 border-t border-slate-800/80 pt-4">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>110+ saytlar qidiruvi</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Asosiy tavsif va havolalar</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Kategoriyalar filtri</span>
                  </li>
                </ul>
              </div>

              <button
                disabled
                className="w-full mt-6 py-2.5 bg-slate-800 text-slate-400 rounded-xl text-xs font-semibold cursor-not-allowed"
              >
                Hozirgi tarifingiz
              </button>
            </div>

            {/* 2. PRO TARIF (ENG OMMABOP) */}
            <div className="relative bg-gradient-to-b from-indigo-950/40 to-slate-900 border-2 border-indigo-500 rounded-2xl p-6 flex flex-col justify-between shadow-xl shadow-indigo-950/50">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-indigo-600 text-white text-[11px] font-bold uppercase tracking-wider shadow-md">
                Eng ommabop
              </div>

              <div>
                <h4 className="font-bold text-white text-lg flex items-center gap-1.5">
                  <span>VebPedia PRO</span>
                  <Sparkles className="w-4 h-4 text-amber-400" />
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  Mutaxassislar va dasturchilar uchun
                </p>
                <div className="mt-4 mb-6">
                  <span className="text-3xl font-extrabold text-white">
                    {billingPeriod === "yearly" ? "39,000" : "49,000"}
                  </span>
                  <span className="text-xs text-slate-400"> so&apos;m / oy</span>
                </div>

                <ul className="space-y-2.5 text-xs text-slate-200 border-t border-indigo-500/20 pt-4">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-indigo-400" />
                    <span>Barcha yashirin IT va AI vositalar</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-indigo-400" />
                    <span>Cheksiz saytlarni saqlash (Bookmarks)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-indigo-400" />
                    <span>Saytlarning yashirin promokodlari</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-indigo-400" />
                    <span>Haftalik yangi saytlar xabarnomasi</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => handleSelectPlan("VebPedia PRO")}
                disabled={isProcessing}
                className="w-full mt-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-indigo-600/40 transition-all cursor-pointer"
              >
                {isProcessing ? "To'lov jarayonida..." : "PRO obuna sotib olish"}
              </button>
            </div>

            {/* 3. BUSINESS / JAMOA */}
            <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-white text-lg">Jamoaviy (Team)</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Kompaniyalar va startaplar uchun
                </p>
                <div className="mt-4 mb-6">
                  <span className="text-3xl font-extrabold text-white">
                    {billingPeriod === "yearly" ? "99,000" : "129,000"}
                  </span>
                  <span className="text-xs text-slate-400"> so&apos;m / oy</span>
                </div>

                <ul className="space-y-2.5 text-xs text-slate-300 border-t border-slate-800/80 pt-4">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>10 tagacha jamoa a&apos;zolari</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Barcha PRO imkoniyatlar</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Shaxsiy API orqali integratsiya</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>24/7 ustuvor qo&apos;llab-quvvatlash</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => handleSelectPlan("Team Business")}
                disabled={isProcessing}
                className="w-full mt-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold transition-all cursor-pointer"
              >
                {isProcessing ? "To'lov jarayonida..." : "Jamoa rejasini tanlash"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
