"use client";

import { useEffect, useState } from "react";
import Navbar from "components/Navbar";
import { supabase } from "lib/supabaseClient";

/* ================= Types ================= */

type Category = {
  id: number;
  name: string;
};

type MenuItem = {
  id: number;
  name: string;
  description: string | null;
  price: number;
  menu_item_images: {
    image_url: string;
    display_order: number;
  }[];
  menu_item_categories: {
    category_id: number;
  }[];
};

/* ================= Page ================= */

export default function MenuPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [items, setItems] = useState<MenuItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<number | "all">("all");

  /* ---------- Fetch categories ---------- */
  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await supabase
        .from("categories")
        .select("id, name")
        .eq("is_active", true)
        .order("display_order");

      setCategories(data || []);
    };

    fetchCategories();
  }, []);

  /* ---------- Fetch menu items ---------- */
  useEffect(() => {
    const fetchItems = async () => {
      const { data } = await supabase
        .from("menu_items")
        .select(`
          id,
          name,
          description,
          price,
          menu_item_images (
            image_url,
            display_order
          ),
          menu_item_categories (
            category_id
          )
        `)
        .eq("is_active", true)
        .order("display_order");

      setItems(data || []);
    };

    fetchItems();
  }, []);

  /* ---------- Filtering ---------- */
  const filteredItems =
    activeCategory === "all"
      ? items
      : items.filter((item) =>
          item.menu_item_categories.some(
            (c) => c.category_id === activeCategory
          )
        );

  return (
    <main dir="rtl" className="min-h-screen bg-[whitesmoke]">
      <Navbar />

      <h1 className="mt-40 text-center text-4xl font-extrabold text-red-700">
        قائمة الطعام
      </h1>

      {/* ===== Categories ===== */}
      <div className="mt-8 overflow-x-auto">
        <div className="mx-auto flex w-max gap-3 px-4">
          <button
            onClick={() => setActiveCategory("all")}
            className={`rounded-full px-5 py-2 text-sm font-semibold ${
              activeCategory === "all"
                ? "bg-red-600 text-white"
                : "bg-gray-200"
            }`}
          >
            الكل
          </button>

          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                activeCategory === cat.id
                  ? "bg-red-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* ===== Menu Grid ===== */}
      <section className="mx-auto mt-12 grid max-w-6xl grid-cols-1 gap-8 px-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((item) => {
          const image =
            item.menu_item_images?.sort(
              (a, b) => a.display_order - b.display_order
            )[0]?.image_url;

          return (
            <div
              key={item.id}
              className="overflow-hidden rounded-2xl bg-white shadow transition hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Image */}
              <div className="h-48 bg-red-100">
                {image && (
                  <img
                    src={image}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />
                )}
              </div>

              <div className="p-5">
                <h3 className="text-lg font-extrabold text-gray-900">
                  {item.name}
                </h3>

                {item.description && (
                  <p className="mt-2 text-sm text-gray-600">
                    {item.description}
                  </p>
                )}

                <div className="mt-5 flex items-center justify-between">
                  <span className="text-xl font-bold text-red-600">
                    {item.price} ₪
                  </span>

                  <button className="rounded-xl bg-red-600 px-4 py-2 text-sm font-bold text-white hover:bg-red-500">
                    أضف
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </main>
  );
}
