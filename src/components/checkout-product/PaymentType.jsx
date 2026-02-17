import bri from "../../assets/checkout-product/Bank-BRI.svg";
import dana from "../../assets/checkout-product/logo-DANA.svg";
import bca from "../../assets/checkout-product/Bank-BCA.svg";
import gopay from "../../assets/checkout-product/logo-GoPay.svg";
import ovo from "../../assets/checkout-product/Ovo.svg";
import paypal from "../../assets/checkout-product/logo_paypal.svg";

const paymentMethods = [
  { value: "bri", src: bri, alt: "Bank BRI" },
  { value: "dana", src: dana, alt: "DANA" },
  { value: "bca", src: bca, alt: "Bank BCA" },
  { value: "gopay", src: gopay, alt: "GoPay" },
  { value: "ovo", src: ovo, alt: "OVO" },
  { value: "paypal", src: paypal, alt: "PayPal" },
];

export function PaymentType() {
  return (
    <div className="w-full">
      <p>We Accept</p>
      {/* Grid logo pembayaran */}
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
        {paymentMethods.map(({ value, src, alt }) => (
          <label key={value} className="cursor-pointer">
            <input
              type="radio"
              name="payment_type"
              value={value}
              className="peer sr-only"
            />
            {/*peer ada di input, peer-checked langsung ke div sibling berikutnya */}
            <div className="flex h-16 w-full items-center justify-center rounded-xl p-3 transition-all duration-200 peer-checked:border-orange-400 peer-checked:bg-orange-400 peer-checked:shadow-md hover:border-orange-300">
              <img
                src={src}
                alt={alt}
                className="h-full w-full object-center"
              />
            </div>
          </label>
        ))}
      </div>

      <p className="mt-3 text-sm text-gray-400">
        *Get discount if you pay with Bank Central Asia
      </p>
    </div>
  );
}

export default PaymentType;
