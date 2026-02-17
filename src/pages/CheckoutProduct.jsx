import React from "react";
import { useParams, useSearchParams } from "react-router";
import useFetch from "../hooks/useFetch";
import CardCheckout from "../components/checkout-product/CardCheckout";
import PaymentType from "../components/checkout-product/PaymentType";
import PaymentInfoDelivery from "../components/checkout-product/PaymentInfoDelivery";

export default function CheckoutProduct() {
  const [searchParams] = useSearchParams();
  const { id } = useParams();
  const data = useFetch("/product.json");

  if (!data) {
    return <p className="p-20">Loading...</p>;
  }

  const product = data.products.find((item) => item.id === Number(id));

  if (!product) {
    return <p className="p-20">Product not found</p>;
  }

  const qty = Number(searchParams.get("qty")) || 1;
  const size = searchParams.get("size") || "Regular";
  const temperature = searchParams.get("temperature") || "Ice";

  const tax = 4000;
  const order = qty * product.price;
  const subtotal = order + tax;

  return (
    <main className="mt-20">
      <h1 className="px-20 pt-20 pb-5 text-5xl font-semibold">
        Payment Details
      </h1>

      <section className="mt-10 grid grid-cols-[2fr_1fr] gap-8 px-18">
        {/* LEFT SIDE */}
        <div>
          <div className="flex items-center justify-between">
            <p className="text-xl font-semibold">Your Order</p>

            <button className="rounded bg-orange-400 px-3 py-2 text-sm hover:bg-orange-500 hover:text-white">
              + Add Menu
            </button>
          </div>

          <CardCheckout
            qty={qty}
            product={product}
            size={size}
            temperature={temperature}
          />
              <CardCheckout
            qty={qty}
            product={product}
            size={size}
            temperature={temperature}
          />
        </div>

        {/* RIGHT SIDE - SUMMARY */}
        <div className="sticky top-20">
          <p className="p-1 text-xl font-semibold">Total</p>

          <div className="mt-4 rounded-lg bg-gray-50 p-4">
            <div className="flex justify-between py-1">
              <p>Order</p>
              <p className="font-bold">Idr. {order.toLocaleString("id-ID")}</p>
            </div>

            <div className="flex justify-between py-1">
              <p>Delivery</p>
              <p className="font-bold">Idr. 0</p>
            </div>

            <div className="flex justify-between py-1">
              <p>Tax</p>
              <p className="font-bold">Idr. {tax.toLocaleString("id-ID")}</p>
            </div>

            <div className="my-3 h-px bg-gray-200" />

            <div className="flex justify-between">
              <p>Subtotal</p>
              <p className="font-bold">
                Idr. {subtotal.toLocaleString("id-ID")}
              </p>
            </div>
            <button className="mt-6 w-full rounded-lg bg-orange-500 py-3 font-semibold text-white hover:bg-orange-600">
              Checkout
            </button>
            <div className="py-4 font-light">
              <PaymentType />
            </div>
          </div>
        </div>
        <div>
          <PaymentInfoDelivery />
        </div>
      </section>
    </main>
  );
}
