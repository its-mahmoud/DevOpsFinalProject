"use client";

import Navbar from "@/components/Navbar";
import { MapPin, Clock } from "lucide-react";

type Branch = {
  id: number;
  name: string;
  address: string;
  workingDays: string;
  workingHours: string;
};

const branches: Branch[] = [
  {
    id: 1,
    name: "فرع سفيان",
    address: "نابلس – آخر شارع سفيان ",
    workingDays: "يومياََ",
    workingHours: "10:00 صباحاً - 12:00 منتصف الليل",
  },
  {
    id: 2,
    name: "فرع فيصل",
    address: "نابلس – شارع فيصل - مقابل هلا كار",
    workingDays: "يوميًا",
    workingHours: "11:00 صباحًا – 1:00 بعد منتصف الليل",
  },
  {
    id: 3,
    name: "فرع الطيرة",
    address: "رام الله – الطيرة - خلف السرية",
    workingDays: "يومياً",
    workingHours: "10:00 صباحًا – 11:00 مساءً",
  },
];

export default function BranchesPage() {
  return (
    <main dir="rtl" className="min-h-screen bg-[#F5F5F5]">
      <Navbar variant="floating" />

      {/* ===== Title ===== */}
      <section className="max-w-6xl mx-auto px-4 pt-40 pb-12 text-center">
        <h1 className="text-4xl font-extrabold text-[#DC2B3F] mb-3">
          فروعنا وأوقات العمل
        </h1>
        <p className="text-gray-600">
          يسعدنا خدمتكم في جميع فروعنا
        </p>
      </section>

      {/* ===== Branches Grid ===== */}
      <section className="max-w-6xl mx-auto px-4 pb-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {branches.map((branch) => (
          <div
            key={branch.id}
            className="
              bg-white rounded-2xl
              shadow-md hover:shadow-xl
              transition-all duration-300
              p-6
            "
          >
            {/* Branch Name */}
            <h3 className="text-xl font-bold mb-4 text-gray-900">
              {branch.name}
            </h3>

            {/* Address */}
            <div className="flex items-start gap-2 mb-3 text-gray-700">
              <MapPin className="w-5 h-5 text-[#DC2B3F] mt-0.5" />
              <span>{branch.address}</span>
            </div>

            {/* Working Days */}
            <div className="flex items-start gap-2 mb-2 text-gray-700">
              <Clock className="w-5 h-5 text-[#DC2B3F] mt-0.5" />
              <span>{branch.workingDays}</span>
            </div>

            {/* Working Hours */}
            <p className="text-sm text-gray-600 mt-2">
              ⏰ {branch.workingHours}
            </p>

            {/* Action */}
            <button
              className="
                mt-5 w-full
                bg-[#DC2B3F]/10 text-[#DC2B3F]
                py-2 rounded-lg
                font-semibold
                hover:bg-[#DC2B3F] hover:text-white
                transition
              "
            >
              عرض الموقع
            </button>
          </div>
        ))}
      </section>
    </main>
  );
}
