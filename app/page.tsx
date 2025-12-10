"use client";

import React, { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { Option } from "@/app/components/tsx-collections";
import { DISHES } from "./lib/data";

const bookingsData = [
  { day: "Mon", bookings: 12 },
  { day: "Tue", bookings: 18 },
  { day: "Wed", bookings: 22 },
  { day: "Thu", bookings: 28 },
  { day: "Fri", bookings: 42 },
  { day: "Sat", bookings: 55 },
  { day: "Sun", bookings: 47 },
];

const revenueBreakdown = [
  { name: "Dine-in", value: 58 },
  { name: "Takeaway", value: 26 },
  { name: "Delivery", value: 16 },
];

const COLORS = ["#4f46e5", "#ef4444", "#f59e0b"];

export default function Page() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [cart, setCart] = useState<Record<string, number>>({});
  const [reserved, setReserved] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", date: "", time: "", guests: "2" });

  useEffect(() => {
    // playful entrance analytics (not sending data, just local effect)
    const t = setTimeout(() => {
      const el = document.getElementById("hero-cta");
      el?.classList.add("ring-2", "ring-offset-2", "ring-[#1f5ad8]");
    }, 1600);
    return () => clearTimeout(t);
  }, []);

  const categories = useMemo(() => {
    return Array.from(new Set(DISHES.map((d) => d.category)));
  }, []);

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

  function handleReserve(e: React.FormEvent) {
    e.preventDefault();
    // fake reservation flow — show success animation
    setReserved(true);
    setTimeout(() => setReserved(false), 4000);
    setForm({ name: "", phone: "", date: "", time: "", guests: "2" });
  }

  const cartItems = Object.keys(cart).map((id) => {
    const dish = DISHES.find((d) => d.id === id)!;
    return { ...dish, qty: cart[id] };
  });

  return (
    <div className="min-h-screen bg-linear-to-b pt-20 from-[#fffaf0] to-[#f0f9ff] text-gray-900">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 items-center gap-8 pb-20">
          <motion.div initial={{ x: -40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-gray-900">
              Delizia Kitchen
            </h1>
            <p className="mt-4 text-lg text-gray-700 max-w-xl">
              Authentic meals, freshly prepared daily. Seasonal ingredients, modern technique, and the warmest welcome in town.
            </p>
            <div className="mt-6 flex gap-3 items-center">
              <a href="#menu" className="px-6 py-3 rounded-full bg-[#1f5ad8] text-white font-semibold shadow">View Full Menu</a>
              <a href="#reserve" className="px-4 py-2 rounded-full border border-gray-200 bg-white text-gray-800 font-medium">Reserve a Table</a>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-3">
              <div className="bg-white rounded-xl p-4 shadow">
                <div className="text-sm font-semibold">Open</div>
                <div className="text-xs text-gray-500">9am — 10pm</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow">
                <div className="text-sm font-semibold">Cuisine</div>
                <div className="text-xs text-gray-500">Italian + Modern Comfort</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow">
                <div className="text-sm font-semibold">Avg. Price</div>
                <div className="text-xs text-gray-500">₦2,500 / person</div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ scale: 0.98, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8 }} className="rounded-3xl overflow-hidden shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=1600&q=80&auto=format&fit=crop"
              alt="Delicious food"
              width={900}
              height={700}
              className="object-cover w-full h-full"
            />
          </motion.div>
        </div>

        {/* subtle pattern */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-white/90 to-transparent pointer-events-none" />
      </section>

      {/* BUSY MENU SECTION */}
      <section id="menu" className="py-20 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row gap-5 sm:gap-x-8 sm:items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold">Full Menu</h2>
              <p className="text-sm text-gray-500">Crafted daily — click items to add to your order.</p>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => setActiveCategory(null)} className={`px-3 py-2 rounded-full ${activeCategory === null ? "bg-[#1f5ad8] text-white" : "bg-white border"}`}>All</button>
              {categories.map((c) => (
                <button key={c} onClick={() => setActiveCategory((s) => s === c ? null : c)} className={`px-3 py-2 rounded-full ${activeCategory === c ? "bg-[#1f5ad8] text-white" : "bg-white border"}`}>{c}</button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {DISHES.filter((d) => (activeCategory ? d.category === activeCategory : true)).map((dish) => (
              <motion.article key={dish.id} whileHover={{ y: -6 }} className="bg-white rounded-2xl shadow-md overflow-hidden group">
                <div className="relative h-44">
                  <Image src={dish.img} alt={dish.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                  <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition flex items-end p-4">
                    <div>
                      <div className="text-sm text-white font-semibold">{dish.name}</div>
                      <div className="text-xs text-white/90">{dish.desc}</div>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold">{dish.name}</h3>
                      <p className="text-xs text-gray-500 mt-1">{dish.desc}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{dish.price}</div>
                      <div className="mt-2 flex gap-2">
                        <button onClick={() => removeFromCart(dish.id)} className="px-2 py-1 rounded bg-gray-100 text-sm">-</button>
                        <button onClick={() => addToCart(dish.id)} className="px-3 py-1 rounded bg-[#1f5ad8] text-white text-sm">Add</button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-4">Gallery</h2>
          <p className="text-sm text-gray-500 mb-6">Real shots from our kitchen & dining room.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "/images/demo/delizia-kitchen/gallery-0-shot.webp",
              "/images/demo/delizia-kitchen/gallery-1-shot.webp",
              "/images/demo/delizia-kitchen/gallery-2-shot.webp",
              "/images/demo/delizia-kitchen/gallery-3-shot.webp",
            ].map((src, i) => (
              <motion.div key={i} whileHover={{ scale: 1.03 }} className="rounded-xl overflow-hidden shadow">
                <Image src={src} alt={`gallery-${i}`} width={600} height={400} className="object-cover w-full h-48" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CHEF & STORY */}
      <section id="chef" className="py-20 bg-linear-to-br from-white to-[#fff5f0]">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold">Meet Chef Marco</h2>
            <p className="text-gray-700 mt-4">
              Marco brings rustic Italian technique with modern storytelling. Passion for markets, respect for ingredients, and a relentless focus on texture and balance.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-gray-600">
              <li>• 15 years in top kitchens across Europe</li>
              <li>• Seasonal tasting menus and chef’s table</li>
              <li>• Loves sourdough & late-night pizza runs</li>
            </ul>
            <div className="mt-6 flex gap-3">
              <a href="#reserve" className="px-4 py-2 rounded-lg bg-[#1f5ad8] text-white font-semibold">Dine with Marco</a>
              <a href="#menu" className="px-4 py-2 rounded-lg border">See Tasting Menu</a>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <Image src="/images/demo/delizia-kitchen/chef-marco.webp" alt="Chef" width={900} height={700} className="object-cover w-full h-full" />
          </div>
        </div>
      </section>

      {/* LIVE STATS: Recharts */}
      <section id="stats" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-6 items-start">
            <div className="block sm:hidden">
              <h3 className="text-xl font-semibold mb-4">Weekly Bookings</h3>
              <div style={{ width: "100%", height: 250 }}>
                <ResponsiveContainer>
                  <LineChart data={bookingsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="bookings" stroke="#2563eb" strokeWidth={3} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <p className="text-sm text-gray-500 mt-4">Bookings spike on weekends — consider special offers on Fridays.</p>
            </div>

            <div className="hidden sm:block lg:col-span-2 bg-linear-to-br from-[#f8fafc] to-white p-6 rounded-2xl shadow">
              <h3 className="text-xl font-semibold mb-4">Weekly Bookings</h3>
              <div style={{ width: "100%", height: 250 }}>
                <ResponsiveContainer>
                  <LineChart data={bookingsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="bookings" stroke="#2563eb" strokeWidth={3} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <p className="text-sm text-gray-500 mt-4">Bookings spike on weekends — consider special offers on Fridays.</p>
            </div>

            <div className="block sm:hidden">
              <h3 className="text-xl font-semibold mb-4">Revenue Mix</h3>
              <div style={{ width: "100%", height: 220 }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie data={revenueBreakdown} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label>
                      {revenueBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 text-sm text-gray-500">Dine-in remains primary revenue, but delivery is growing fast.</div>
            </div>

            <div className="hidden sm:block bg-white p-6 rounded-2xl shadow">
              <h3 className="text-xl font-semibold mb-4">Revenue Mix</h3>
              <div style={{ width: "100%", height: 220 }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie data={revenueBreakdown} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label>
                      {revenueBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 text-sm text-gray-500">Dine-in remains primary revenue, but delivery is growing fast.</div>
            </div>
          </div>

          <div className="mt-8 grid md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="text-sm text-gray-500">Avg. Wait</div>
              <div className="text-2xl font-bold">18 min</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="text-sm text-gray-500">Satisfaction</div>
              <div className="text-2xl font-bold">4.8 ⭐</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="text-sm text-gray-500">Monthly Covers</div>
              <div className="text-2xl font-bold">1,420</div>
            </div>
          </div>
        </div>
      </section>

      {/* RESERVATION */}
      <section id="reserve" className="py-20 bg-linear-to-br from-[#fffaf0] to-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="sm:bg-white sm:rounded-2xl sm:shadow-lg sm:p-8 sm:grid md:grid-cols-2 sm:gap-6 items-center">
            <div>
              <h3 className="text-2xl font-bold">Reserve a Table</h3>
              <p className="text-sm text-gray-500 mt-2">Quick reservation with instant confirmation animation.</p>

              <form onSubmit={handleReserve} className="mt-6 space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" className="px-4 py-3 border rounded-lg w-full h-10" />
                  <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone" className="px-4 py-3 border rounded-lg w-full h-10" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <input required value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} type="date" className="px-4 py-3 border rounded-lg h-10" />
                  <input required value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} type="time" className="px-4 py-3 border rounded-lg h-10" />
                  
                  <div className='flex flex-1 shrink-0 z-35'>
                    <Option
                      initialValue={{ value: form.guests}}
                      title={""}
                      options={['1', '2', '3', '4', '+5'].map(c => ({ value: c }))}
                      sendBack={(e) => setForm({ ...form, guests: e.value })}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button type="submit" className="px-6 py-3 rounded-full bg-[#1f5ad8] text-white font-semibold">Confirm Reservation</button>
                  <button type="button" onClick={() => { setForm({ name: "", phone: "", date: "", time: "", guests: "2" }); }} className="px-4 py-2 rounded-full border">Reset</button>

                  {reserved && (
                    <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="ml-4 text-green-600 font-semibold">
                      Reservation confirmed 🎉
                    </motion.div>
                  )}
                </div>
              </form>

              <div className="mt-6 text-sm text-gray-500">
                Prefer phone? <a href="tel:+234123456789" className="text-[#1f5ad8] font-semibold">+234 123 456 789</a>
              </div>
            </div>

            <div className="bg-linear-to-br from-[#fffbf0] to-white rounded-xl p-6">
              <h4 className="font-semibold">Why reserve?</h4>
              <ul className="mt-3 text-sm text-gray-600 space-y-2">
                <li>• Priority seating</li>
                <li>• Customized allergy & dietary notes</li>
                <li>• Early access to tasting menus</li>
              </ul>

              <div className="mt-6">
                <h5 className="text-sm font-semibold text-gray-700 mb-2">Popular times</h5>
                <div className="flex gap-2 flex-wrap">
                  {["6:00 PM", "6:30 PM", "7:00 PM", "8:00 PM"].map((t) => (
                    <button key={t} onClick={() => setForm({ ...form, time: t })} className="px-3 py-1 rounded bg-white border text-sm">{t}</button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEWSLETTER & MAP */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl font-bold">Stay in the loop</h3>
            <p className="text-sm text-gray-500 mt-2">Exclusive offers, pop-up nights, and behind-the-scenes.</p>
            <div className="mt-4 flex gap-2">
              <input placeholder="Your email" className="px-4 py-3 border rounded-lg w-full md:w-auto" />
              <button className="px-4 py-3 rounded-lg bg-[#1f5ad8] text-white">Subscribe</button>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-lg">
            <iframe
              title="Delizia Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126743.123456789!2d7.469!3d9.082!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0:0x0!2zMScwLjAnNDcgLCA3xKDAg!5e0!3m2!1sen!2sng!4v0000000000000"
              className="w-full h-48 border-0"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </div>
  );
}