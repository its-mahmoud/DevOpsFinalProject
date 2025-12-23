"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/context/AuthContext";
import { supabaseBrowser } from "@/lib/supabaseBrowser";

/* ================= Types ================= */

type OrderOption = {
  optionId: number;
  label: string;
  price?: number;
};


type OrderItem = {
  id: number;
  quantity: number;
  unit_price: number;
  notes: string | null;
  options: OrderOption[];
  menu_items: {
    name: string;
    image: string | null;
  }[];
};

type Order = {
  id: number;
  created_at: string;
  status: string;
  order_type: "delivery" | "pickup";
  subtotal: number;
  delivery_price: number;
  total_price: number;
  notes: string | null;
  order_items: OrderItem[];
};

/* ================= Page ================= */

export default function OrderDetailsPage() {
  const { orderId } = useParams<{ orderId: string }>();
  const router = useRouter();
  const { user, loading } = useAuth();

  const [order, setOrder] = useState<Order | null>(null);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    if (!user || !orderId) return;

    const fetchOrder = async () => {
      const { data, error } = await supabaseBrowser
        .from("orders")
        .select(
          `
          id,
          created_at,
          status,
          order_type,
          subtotal,
          delivery_price,
          total_price,
          notes,
          user_id,
          order_items (
            id,
            quantity,
            unit_price,
            notes,
            options,
            menu_items (
              name,
              image
            )
          )
        `
        )
        .eq("id", orderId)
        .single();

      if (error || !data) {
        router.replace("/orders");
        return;
      }

      // 🔒 تأكيد أن الطلب يخص المستخدم نفسه
      if (data.user_id !== user.id) {
        router.replace("/orders");
        return;
      }

      setOrder(data as Order);
      setPageLoading(false);
    };

    fetchOrder();
  }, [user, orderId, router]);

  if (loading || pageLoading) return null;
  if (!order) return null;

  return (
    <div dir="rtl" className="min-h-screen bg-[#F5F5F5]">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 py-28 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-extrabold">تفاصيل الطلب #{order.id}</h1>
          <p className="text-sm text-gray-500">
            {new Date(order.created_at).toLocaleString("ar")}
          </p>
        </div>

        {/* Status */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="font-bold">
            الحالة: <span className="text-[#DC2B3F]">{order.status}</span>
          </p>
        </div>

        {/* Items */}
        <div className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
          <h2 className="font-bold text-lg">العناصر</h2>

          {order.order_items.map((item) => {
            const menuItem = item.menu_items[0];

            return (
              <div key={item.id} className="flex gap-4 border rounded-xl p-4">
                <img
                  src={menuItem?.image || "/images/fallbackimage.jpg"}
                  alt={menuItem?.name || "وجبة"}
                  className="w-16 h-16 rounded-lg object-cover"
                />

                <div className="flex-1">
                  <h4 className="font-bold text-sm">{menuItem?.name}</h4>

                  <p className="text-xs text-gray-500">
                    الكمية: {item.quantity}
                  </p>

                  {item.options?.length > 0 && (
                    <ul className="text-xs text-gray-600 mt-1 space-y-0.5">
                      {item.options.map((opt: OrderOption, i: number) => (

                        <li key={i}>• {opt.label}</li>
                      ))}
                    </ul>
                  )}

                  {item.notes && (
                    <p className="text-xs text-gray-500 mt-1">
                      ملاحظة: {item.notes}
                    </p>
                  )}
                </div>

                <div className="font-bold text-sm text-[#DC2B3F] whitespace-nowrap">
                  {item.unit_price * item.quantity} ₪
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary */}
        <div className="bg-white rounded-2xl shadow-sm p-6 space-y-2 text-sm">
          <div className="flex justify-between">
            <span>السعر الفرعي</span>
            <span>{order.subtotal} ₪</span>
          </div>

          {order.order_type === "delivery" && (
            <div className="flex justify-between">
              <span>سعر التوصيل</span>
              <span>{order.delivery_price} ₪</span>
            </div>
          )}

          <hr />

          <div className="flex justify-between text-lg font-extrabold">
            <span>الإجمالي</span>
            <span className="text-[#DC2B3F]">{order.total_price} ₪</span>
          </div>
        </div>
      </main>
    </div>
  );
}
