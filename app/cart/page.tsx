"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";

export default function CartPage() {
  const { items, removeFromCart, clearCart } = useCart();

  const total = items.reduce((sum, item) => sum + item.totalPrice, 0);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">سلة الطلبات</h1>

      {items.length === 0 && (
        <p className="text-center text-gray-500">السلة فارغة</p>
      )}

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex gap-4 border rounded-lg p-4"
          >
            <Image
              src={item.image}
              alt=""
              width={80}
              height={80}
              className="rounded object-cover"
            />

            <div className="flex-1">
              <h3 className="font-bold">{item.name}</h3>
              <p className="text-sm text-gray-500">
                الكمية: {item.quantity}
              </p>
              {item.notes && (
                <p className="text-sm text-gray-500">
                  📝 {item.notes}
                </p>
              )}
            </div>

            <div className="text-right">
              <p className="font-bold text-[#DC2B3F]">
                {item.totalPrice} ₪
              </p>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-sm text-gray-500 mt-2"
              >
                حذف
              </button>
            </div>
          </div>
        ))}
      </div>

      {items.length > 0 && (
        <div className="mt-8 border-t pt-6">
          <div className="flex justify-between text-xl font-bold mb-4">
            <span>المجموع</span>
            <span className="text-[#DC2B3F]">{total} ₪</span>
          </div>

          <button className="w-full bg-[#DC2B3F] text-white py-3 rounded-lg mb-2">
            إتمام الطلب
          </button>

          <button
            onClick={clearCart}
            className="w-full text-sm text-gray-500"
          >
            تفريغ السلة
          </button>
        </div>
      )}
    </div>
  );
}
