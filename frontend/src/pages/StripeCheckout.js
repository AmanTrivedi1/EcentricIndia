import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import CheckoutForm from "./CheckoutForm";

import { selectCurrentOrder } from "../features/order/orderSlice";
import { useCurrency } from "../context/CurrencyContext";

const stripePromise = loadStripe(
  "pk_test_51LO0nNSBfCKAZDAkKq9TINx0QylNNPZB2VuFPQwLPnlRudxwz0x0PPTAl3I3SVjp6479PpXtgkTswBseoBwm8MWk002drvO5f4"
);

export default function StripeCheckout() {
  const { selectedCurrency } = useCurrency();
  const [clientSecret, setClientSecret] = useState("");
  const currentOrder = useSelector(selectCurrentOrder);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        totalAmount: currentOrder.totalAmount,
        orderId: currentOrder.id,
        currency: selectedCurrency,
        user: currentOrder.user,
        selectedAddress: currentOrder.selectedAddress,
      }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="Stripe">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}
