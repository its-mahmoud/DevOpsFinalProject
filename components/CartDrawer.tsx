"use client";

import { X, ShoppingCart, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useCartUI } from "@/context/CartUIContext";

export default function CartDrawer() {
  const { items, removeFromCart, clearCart } = useCart();
  const { open, closeCart } = useCartUI();

  const total = items.reduce((sum, item) => sum + item.totalPrice, 0);

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          onClick={closeCart}
          className="fixed inset-0 bg-black/40 z-[900]"
        />
      )}

      {/* Drawer */}
      <div
        dir="rtl"
        className={`
          fixed top-0 left-0 h-full
          w-[90%] sm:w-[420px]
          bg-white z-[1000]
          shadow-2xl
          transform transition-transform duration-300
          flex flex-col
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <ShoppingCart size={20} />
            السلة
          </h2>
          <button onClick={closeCart}>
            <X />
          </button>
        </div>

        {/* Items */}
        <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-160px)]">
          {items.length === 0 && (
            <p className="text-center text-gray-500">السلة فارغة</p>
          )}

          {items.map((item) => (
            <div key={item.id} className="border rounded-lg p-3 flex gap-3">
              <img
                src={item.image}
                className="w-16 h-16 rounded object-cover"
                alt={item.name}
              />

              <div className="flex-1">
                <h4 className="font-bold text-sm">{item.name}</h4>
                <p className="text-xs text-gray-500">
                  الكمية: {item.quantity}
                </p>

                {item.notes && (
                  <p className="text-xs text-gray-500 mt-1">
                    📝 {item.notes}
                  </p>
                )}

                <p className="text-sm font-bold text-[#DC2B3F] mt-1">
                  {item.totalPrice} ₪
                </p>
              </div>

              <button onClick={() => removeFromCart(item.id)}>
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="border-t p-4 ">
          <div className="flex justify-between font-bold mb-4">
            <span>المجموع</span>
            <span className="text-[#DC2B3F]">{total} ₪</span>
          </div>

          <button className="w-full bg-[#DC2B3F] text-white py-3 rounded-lg">
            إتمام الطلب
          </button>

          {items.length > 0 && (
            <button
              onClick={clearCart}
              className="w-full mt-2 text-sm text-gray-500"
            >
              تفريغ السلة
            </button>
          )}
        </div>
      </div>
    </>
  );
}
