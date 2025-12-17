"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "../../../components/Navbar";
import { Plus, Minus, ArrowRight } from "lucide-react";
import { toast } from "sonner";

/* ====== بيانات مؤقتة (لاحقًا من Supabase) ====== */
const meals = [
  {
    id: 1,
    name: "بروست ملكي",
    description: "دجاج مقرمش مع خلطة ملكي الخاصة",
    price: 25,
    image: "/images/beefburger.jpg",
  },
];

/* ====== Options ====== */
const sizes = [
  { id: "small", name: "صغير", priceMultiplier: 0.8 },
  { id: "medium", name: "وسط", priceMultiplier: 1 },
  { id: "large", name: "كبير", priceMultiplier: 1.3 },
];

const spiceLevels = [
  { id: "none", name: "بدون حار" },
  { id: "mild", name: "حار خفيف" },
  { id: "medium", name: "حار متوسط" },
  { id: "hot", name: "حار جداً" },
];

const extras = [
  { id: "extra-sauce", name: "صوص إضافي", price: 3 },
  { id: "fries", name: "بطاطس مقلية", price: 8 },
  { id: "cheese", name: "جبنة", price: 6 },
];

export default function MealDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  const meal = meals.find((m) => m.id === Number(id));

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("medium");
  const [selectedSpice, setSelectedSpice] = useState("none");
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);

  if (!meal) {
    return (
      <div className="min-h-screen bg-[#F5F5F5]" dir="rtl">
        <Navbar />
        <div className="text-center py-20">
          <h2>الوجبة غير موجودة</h2>
          <button
            onClick={() => router.push("/menu")}
            className="mt-4 text-[#DC2B3F]"
          >
            العودة للقائمة
          </button>
        </div>
      </div>
    );
  }

  const sizeMultiplier =
    sizes.find((s) => s.id === selectedSize)?.priceMultiplier || 1;

  const extrasPrice = extras
    .filter((e) => selectedExtras.includes(e.id))
    .reduce((sum, e) => sum + e.price, 0);

  const totalPrice =
    (meal.price * sizeMultiplier + extrasPrice) * quantity;

  return (
    <div className="min-h-screen bg-[#F5F5F5]" dir="rtl">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Back */}
        <button
          onClick={() => router.push("/menu")}
          className="flex items-center gap-2 text-gray-600 hover:text-[#DC2B3F] mb-6"
        >
          <ArrowRight className="w-5 h-5" />
          العودة للقائمة
        </button>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden grid lg:grid-cols-2">
          {/* Image */}
          <div className="h-[400px] lg:h-full">
            <img
              src={meal.image}
              alt={meal.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="p-8">
            <h1 className="text-3xl font-extrabold mb-4">{meal.name}</h1>
            <p className="text-gray-600 mb-6">{meal.description}</p>

            <div className="text-3xl text-[#DC2B3F] font-bold mb-6">
              {totalPrice} ₪
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-6">
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 bg-[#DC2B3F] text-white rounded"
              >
                <Plus />
              </button>
              <span>{quantity}</span>
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 bg-[#DC2B3F] text-white rounded"
                disabled={quantity === 1}
              >
                <Minus />
              </button>
            </div>

            <button
              onClick={() => toast.success("تمت الإضافة للسلة")}
              className="w-full bg-[#DC2B3F] text-white py-3 rounded-lg"
            >
              إضافة إلى السلة
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
