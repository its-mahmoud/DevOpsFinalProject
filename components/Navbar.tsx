"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      dir="rtl"
      className={`
        fixed left-1/2 -translate-x-1/2 z-[999]
        w-[90%]
        flex items-center justify-between
        transition-all duration-500
        ${scrolled
          ? "top-0 bg-white shadow-md rounded-b-[20px] px-[30px] py-[5px]"
          : "top-[5vh] bg-white/90 shadow-xl rounded-[20px] px-[25px] py-[15px]"}
      `}
    >
      {/* زر الطلب */}
      <button
        className="bg-[#e63946] text-white px-[20px] py-[10px]
                   rounded-[10px] text-[16px] font-bold
                   transition hover:bg-[#ff2121]
                   hover:scale-110 hover:-translate-y-[3px]"
      >
        ! أطلب الآن
      </button>

      {/* زر الموبايل */}
      <div
        className="md:hidden text-[2em] cursor-pointer text-[#CD2E2E]"
        onClick={() => setOpen(!open)}
      >
        ☰
      </div>

      {/* الروابط */}
      <ul
        className={`
          nav-links
          md:flex gap-[45px]
          text-[#9f4949] text-[1.8em]
          transition-all
          ${
            open
              ? "flex flex-col absolute top-full right-0 w-full bg-white shadow-md p-4"
              : "hidden md:flex"
          }
        `}
      >
        <li><Link href="/">الرئيسية</Link></li>
        <li><Link href="/menu">قائمة الطعام</Link></li>
        <li><Link href="/branches">موقعنا</Link></li>
        <li><Link href="/about">حول</Link></li>
        <li><Link href="/contact_us">تواصل معنا</Link></li>
      </ul>

      {/* الشعار */}
      <h2 className="text-[26px] font-bold text-[#e63946]">
        Malaky
      </h2>
    </div>
  );
}
