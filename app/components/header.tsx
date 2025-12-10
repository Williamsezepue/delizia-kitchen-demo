"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { DISHES } from "@/app/lib/data";

export default function Navbar() {
  const [cart, setCart] = useState<Record<string, number>>({});

  function addToCart(id: string) {
    setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));
  }

  function removeFromCart(id: string) {
    setCart((c) => {
      const copy = { ...c };
      if (!copy[id]) return copy;
      copy[id] = copy[id] - 1;
      if (copy[id] <= 0) delete copy[id];
      return copy;
    });
  }

  useEffect(() => {
    // playful entrance analytics (not sending data, just local effect)
    const t = setTimeout(() => {
      const el = document.getElementById("hero-cta");
      el?.classList.add("ring-2", "ring-offset-2", "ring-[#1f5ad8]");
    }, 1600);
    return () => clearTimeout(t);
  }, []);

  const cartItems = Object.keys(cart).map((id) => {
    const dish = DISHES.find((d) => d.id === id)!;
    return { ...dish, qty: cart[id] };
  });

  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 gap-3 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="rounded-full bg-[#1f5ad8] p-2 w-12 h-12 flex items-center justify-center shadow-lg">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" fill="#fff" />
              <path d="M7 12h10M7 8h10M7 16h6" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <div className="text-sm font-semibold">Delizia Kitchen</div>
            <div className="text-xs text-gray-500 -mt-0.5">Authentic • Modern • Fresh</div>
          </div>
        </div>

        <nav className="hidden mdlg:flex items-center gap-6 text-sm">
          <a href="#menu" className="hover:text-[#1f5ad8] transition">Menu</a>
          <a href="#gallery" className="hover:text-[#1f5ad8] transition">Gallery</a>
          <a href="#chef" className="hover:text-[#1f5ad8] transition">Chef</a>
          <a href="#stats" className="hover:text-[#1f5ad8] transition">Live</a>
          <a href="#reserve" className="hover:text-[#1f5ad8] transition">Reserve</a>
        </nav>

        <div className="flex items-center gap-4">
          <button id="hero-cta" className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1f5ad8] text-white font-semibold shadow hover:opacity-95 transition">
            Book a Table
          </button>
          <div className="relative">
            <button className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-white border shadow-sm">
              <svg className="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="none"><path d="M3 3h18v2H3zM5 8h14l-1 11H6L5 8z" stroke="#4b5563" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <span className="text-sm font-medium">{Object.keys(cart).length}</span>
            </button>
            {Object.keys(cart).length > 0 && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg p-4">
                <div className="font-semibold mb-2">Your Order</div>
                <div className="space-y-2 max-h-48 overflow-auto">
                  {cartItems.map((it) => (
                    <div key={it.id} className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{it.name} <span className="text-xs text-gray-500">x{it.qty}</span></div>
                        <div className="text-xs text-gray-500">{it.price}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => removeFromCart(it.id)} className="px-2 py-1 bg-gray-100 rounded">-</button>
                        <button onClick={() => addToCart(it.id)} className="px-2 py-1 bg-gray-100 rounded">+</button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 flex justify-between items-center">
                  <a href="#reserve" className="px-4 py-2 bg-[#1f5ad8] text-white rounded-full font-semibold">Checkout</a>
                  <button onClick={() => setCart({})} className="text-sm text-gray-500">Clear</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export function NavLink({ href, closeMenu, children }: { href: string; closeMenu?: ()=> void; children: React.ReactNode }) {
  return (
    <Link href={href} className="relative group w-fit" onClick={closeMenu}>
      <span className="font-medium">{children}</span>
      <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-theme5 transition-all group-hover:w-full" />
    </Link>
  );
}
