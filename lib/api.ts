import { Website } from "@/types/website";
import { Mahsulot } from "@/types/mahsulot";

// Mahalliy Django server bazaviy URL manzili
export const API_BASE_URL = "http://127.0.0.1:8000";

/**
 * Django backend (http://127.0.0.1:8000/websites/) dan saytlar ro'yxatini oladi.
 * Agar backend vaqtincha ishlamasa yoki ulanish uzilsa, zaxira (fallback) data/websites.json dan oladi.
 */
export async function getWebsites(): Promise<Website[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/websites/`, {
      cache: "no-store", // Har safar yangi JSON ma'lumot olish
    });
    if (!res.ok) {
      throw new Error(`Server status: ${res.status}`);
    }
    const data: Website[] = await res.json();
    return data;
  } catch (error) {
    console.warn("Django backend ulanmadi, zaxira JSON ishlatilmoqda:", error);
    // Zaxira mahalliy JSON ma'lumot
    const fallback = await import("@/data/websites.json");
    return fallback.default as Website[];
  }
}

/**
 * Django backend (http://127.0.0.1:8000/mahsulot/) dan mahsulotlar ro'yxatini oladi.
 */
export async function getMahsulotlar(): Promise<Mahsulot[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/mahsulot/`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error(`Server status: ${res.status}`);
    }
    const data: Mahsulot[] = await res.json();
    return data;
  } catch (error) {
    console.warn("Django mahsulot API ulanmadi:", error);
    return [];
  }
}

/**
 * Yangi mahsulot qo'shish (POST http://127.0.0.1:8000/mahsulot/)
 */
export async function createMahsulot(payload: {
  name: string;
  price: number;
  description: string;
}): Promise<Mahsulot> {
  const res = await fetch(`${API_BASE_URL}/mahsulot/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Mahsulotni saqlashda server xatolik berdi");
  }

  return await res.json();
}
