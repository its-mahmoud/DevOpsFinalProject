"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";

/* ================= Types ================= */

type Step = 1 | 2 | 3 | 4;

export default function CheckoutPage() {
  const router = useRouter();
  const { items } = useCart();

  const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);

  /* ================= Wizard State ================= */

  const [step, setStep] = useState<Step>(1);

  const [orderType, setOrderType] = useState<"delivery" | "pickup" | null>(
    null
  );

  const [contact, setContact] = useState({
    firstName: "",
    lastName: "",
    phone: "",
  });

  const [address, setAddress] = useState("");
  const [branch, setBranch] = useState("");

  /* ================= Guards ================= */

  if (items.length === 0) {
    return (
      <div dir="rtl" className="min-h-screen bg-[#F5F5F5]">
        <Navbar variant="floating" />
        <div className="text-center mt-40 text-gray-500">السلة فارغة</div>
      </div>
    );
  }

  /* ================= UI ================= */

  return (
    <div dir="rtl" className="min-h-screen bg-[#F5F5F5]">
      <Navbar variant="floating" />

      <main className="max-w-3xl mx-auto px-4 py-10 mt-14">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-extrabold">إتمام الطلب</h1>

          <button
            onClick={() => router.push("/cart")}
            className="text-sm text-gray-500 hover:text-[#DC2B3F]"
          >
            إلغاء
          </button>
        </div>

        {/* Progress */}
        <div className="grid grid-cols-4 gap-2 mb-10 text-sm font-bold">
          {["نوع الطلب", "معلومات التواصل", "التفاصيل", "مراجعة"].map(
            (label, i) => (
              <div
                key={i}
                className={`text-center py-2 rounded-lg ${
                  step === i + 1
                    ? "bg-[#DC2B3F] text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {label}
              </div>
            )
          )}
        </div>

        {/* ================= STEP 1 ================= */}
        {step === 1 && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!orderType) return;
              setStep(2);
            }}
            className="bg-white p-6 rounded-2xl shadow space-y-6"
          >
            <h2 className="font-bold text-lg">نوع الطلب</h2>

            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setOrderType("delivery")}
                className={`py-6 rounded-xl border font-semibold ${
                  orderType === "delivery"
                    ? "border-[#DC2B3F] bg-[#DC2B3F]/10 text-[#DC2B3F]"
                    : "border-gray-200"
                }`}
              >
                توصيل
              </button>

              <button
                type="button"
                onClick={() => setOrderType("pickup")}
                className={`py-6 rounded-xl border font-semibold ${
                  orderType === "pickup"
                    ? "border-[#DC2B3F] bg-[#DC2B3F]/10 text-[#DC2B3F]"
                    : "border-gray-200"
                }`}
              >
                استلام من الفرع
              </button>
            </div>

            <button
              type="submit"
              disabled={!orderType}
              className="w-full bg-[#DC2B3F] text-white py-3 rounded-xl font-bold disabled:opacity-50"
            >
              المتابعة
            </button>
          </form>
        )}

        {/* ================= STEP 2 ================= */}
        {step === 2 && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!contact.firstName || !contact.lastName || !contact.phone)
                return;
              setStep(3);
            }}
            className="bg-white p-6 rounded-2xl shadow space-y-4"
          >
            <h2 className="font-bold text-lg">معلومات التواصل</h2>

            <div className="grid grid-cols-2 gap-4">
              <input
                required
                placeholder="الاسم"
                value={contact.firstName}
                onChange={(e) =>
                  setContact({ ...contact, firstName: e.target.value })
                }
                className="border rounded-lg p-3"
              />

              <input
                required
                placeholder="اسم العائلة"
                value={contact.lastName}
                onChange={(e) =>
                  setContact({ ...contact, lastName: e.target.value })
                }
                className="border rounded-lg p-3"
              />
            </div>

            <input
              required
              placeholder="رقم الهاتف"
              value={contact.phone}
              onChange={(e) =>
                setContact({ ...contact, phone: e.target.value })
              }
              className="w-full border rounded-lg p-3"
            />

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 border py-3 rounded-lg"
              >
                رجوع
              </button>

              <button
                type="submit"
                className="flex-1 bg-[#DC2B3F] text-white py-3 rounded-lg font-bold"
              >
                المتابعة
              </button>
            </div>
          </form>
        )}

        {/* ================= STEP 3 ================= */}
        {step === 3 && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (orderType === "delivery" && !address) return;
              if (orderType === "pickup" && !branch) return;
              setStep(4);
            }}
            className="bg-white p-6 rounded-2xl shadow space-y-4"
          >
            <h2 className="font-bold text-lg">
              {orderType === "delivery" ? "عنوان التوصيل" : "اختيار الفرع"}
            </h2>

            {orderType === "delivery" ? (
              <textarea
                required
                rows={4}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="المدينة، الشارع، تفاصيل إضافية"
                className="w-full border rounded-lg p-3 resize-none"
              />
            ) : (
              <select
                required
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="w-full border rounded-lg p-3"
              >
                <option value="">اختر الفرع</option>
                <option value="nablus">نابلس</option>
                <option value="ramallah">رام الله</option>
              </select>
            )}

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="flex-1 border py-3 rounded-lg"
              >
                رجوع
              </button>

              <button
                type="submit"
                className="flex-1 bg-[#DC2B3F] text-white py-3 rounded-lg font-bold"
              >
                المتابعة
              </button>
            </div>
          </form>
        )}

        {/* ================= STEP 4 ================= */}
        {step === 4 && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("هنا يتم إنشاء الطلب في Supabase");
            }}
            className="bg-white p-6 rounded-2xl shadow space-y-8"
          >
            <h2 className="font-bold text-xl">مراجعة الطلب</h2>

            {/* ================= Items ================= */}
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 border rounded-xl p-4">
                  {/* Image */}
                  <img
                    src={item.image || "/images/fallbackimage.jpg"}
                    alt={item.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />

                  {/* Info */}
                  <div className="flex-1">
                    <h4 className="font-bold text-sm mb-1">{item.name}</h4>

                    {/* Options */}
                    {item.options.length > 0 && (
                      <ul className="text-xs text-gray-600 space-y-0.5">
                        {item.options.map((opt) => (
                          <li key={opt.optionId}>• {opt.label}</li>
                        ))}
                      </ul>
                    )}

                    {/* Notes */}
                    {item.notes && (
                      <p className="text-xs text-gray-500 mt-1">
                        ملاحظة: {item.notes}
                      </p>
                    )}

                    {/* Quantity */}
                    <p className="text-xs text-gray-500 mt-1">
                      الكمية: {item.quantity}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="font-bold text-sm text-[#DC2B3F] whitespace-nowrap">
                    {item.totalPrice} ₪
                  </div>
                </div>
              ))}
            </div>

            <hr />

            {/* ================= Order Info ================= */}
            <div className="bg-gray-50 rounded-xl p-4 text-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">الاسم</span>
                <span className="font-medium">
                  {contact.firstName} {contact.lastName}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">الهاتف</span>
                <span className="font-medium">{contact.phone}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">
                  {orderType === "delivery" ? "العنوان" : "الفرع"}
                </span>
                <span className="font-medium text-right max-w-[60%]">
                  {orderType === "delivery" ? address : branch}
                </span>
              </div>
            </div>

            {/* ================= Total ================= */}
            <div className="flex justify-between items-center text-lg font-extrabold">
              <span>الإجمالي</span>
              <span className="text-[#DC2B3F]">{subtotal} ₪</span>
            </div>

            {/* ================= Actions ================= */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep(3)}
                className="flex-1 border py-3 rounded-lg"
              >
                رجوع
              </button>

              <button
                type="submit"
                className="flex-1 bg-[#DC2B3F] text-white py-3 rounded-lg font-bold"
              >
                تأكيد وإرسال الطلب
              </button>
            </div>
          </form>
        )}
      </main>
    </div>
  );
}
