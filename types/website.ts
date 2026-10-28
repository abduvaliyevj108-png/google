export interface Website {
  id: string;
  name: string;
  url: string;
  category: 'ai' | 'dev' | 'design' | 'education' | 'productivity' | 'tools' | 'entertainment' | 'finance';
  categoryLabel: string;
  description: string;
  features: string[];
  pricing: 'Bepul' | 'Freemium' | 'Pullik';
  tags: string[];
  rating: number;
  // Yangi qo'shilgan boyitilgan ma'lumotlar:
  targetAudience?: string;      // Kimlar uchun mos (Maqsadli auditoriya)
  freePlanDetails?: string;     // Bepul tarifda nimalar beriladi
  paidPlanDetails?: string;     // Pullik versiyada nimalar ochiladi
  pros?: string[];              // Kuchli tomonlari (Plyuslari)
  cons?: string[];              // Kamchiliklari (Minuslari)
  alternatives?: string[];      // O'xshash muqobil saytlar
  foundedYear?: number;         // Tashkil topgan yili
  company?: string;             // Yaratuvchi kompaniya yoki muallif
}
