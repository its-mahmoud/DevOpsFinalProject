"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Phone, Mail, MessageCircle } from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 🔜 لاحقًا: إرسال البيانات إلى Supabase أو API
    console.log({ name, phone, message });

    alert("تم إرسال رسالتك بنجاح 🙌");
    setName("");
    setPhone("");
    setMessage("");
  };

  return (
    <main dir="rtl" className="min-h-screen bg-[#F5F5F5]">
      <Navbar variant="floating" />

      {/* ===== Title ===== */}
      <section className="max-w-5xl mx-auto px-4 pt-40 pb-10 text-center">
        <h1 className="text-4xl font-extrabold text-[#DC2B3F] mb-3">
          تواصل معنا
        </h1>
        <p className="text-gray-600">
          يسعدنا استقبال استفساراتكم واقتراحاتكم
        </p>
      </section>

      {/* ===== Content ===== */}
      <section className="max-w-5xl mx-auto px-4 pb-20 grid gap-8 md:grid-cols-2">
        {/* ===== Contact Info ===== */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h3 className="text-xl font-bold mb-6">معلومات التواصل</h3>

          <div className="flex items-center gap-3 mb-4 text-gray-700">
            <Phone className="text-[#DC2B3F]" />
            <span>1700-250-250</span>
          </div>

          <div className="flex items-center gap-3 mb-4 text-gray-700">
            <MessageCircle className="text-[#DC2B3F]" />
            <span>واتساب: 0599-123-456</span>
          </div>

          <div className="flex items-center gap-3 text-gray-700">
            <Mail className="text-[#DC2B3F]" />
            <span>malakybroast@gmail.com</span>
          </div>

          <p className="text-sm text-gray-500 mt-6">
            نعمل يوميًا من الساعة 10 صباحًا حتى 12 منتصف الليل
          </p>
        </div>

        {/* ===== Contact Form ===== */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-md p-6"
        >
          <h3 className="text-xl font-bold mb-6">أرسل لنا رسالة</h3>

          <div className="mb-4">
            <label className="block mb-1 text-sm font-semibold">
              الاسم
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="
                w-full rounded-lg border border-gray-300
                px-4 py-2
                focus:outline-none focus:border-[#DC2B3F]
              "
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-sm font-semibold">
              رقم الهاتف
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="
                w-full rounded-lg border border-gray-300
                px-4 py-2
                focus:outline-none focus:border-[#DC2B3F]
              "
            />
          </div>

          <div className="mb-6">
            <label className="block mb-1 text-sm font-semibold">
              رسالتك
            </label>
            <textarea
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="
                w-full rounded-lg border border-gray-300
                px-4 py-2
                resize-none
                focus:outline-none focus:border-[#DC2B3F]
              "
            />
          </div>

          <button
            type="submit"
            className="
              w-full bg-[#DC2B3F] text-white
              py-3 rounded-lg
              font-semibold
              hover:bg-[#C02436]
              transition
            "
          >
            إرسال الرسالة
          </button>
        </form>
      </section>
    </main>
  );
}
