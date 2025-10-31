import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createBooking, validatePromo } from "../api/bookItApi";
import Loader from "../components/Loader";
import { Helmet } from "react-helmet";

export default function Checkout() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const exp = state?.exp;
  const slot = state?.slot;

  const [form, setForm] = useState({ name: "", email: "", promoCode: "" });
  const [loading, setLoading] = useState(false);
  const [promoStatus, setPromoStatus] = useState(null);
  const [error, setError] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // If no booking details, redirect back
  if (!exp || !slot) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 font-semibold text-lg mb-4">
            No booking details found.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Calculate pricing
  const subtotal = exp.price || 999;
  const taxes = Math.round(subtotal * 0.059); // ~5.9% tax
  const total = subtotal + taxes;

  // Handle promo code validation
  const handlePromoCheck = async () => {
    if (!form.promoCode.trim()) return;
    setPromoStatus(null);
    try {
      const res = await validatePromo(form.promoCode);
      if (res?.discountValue) {
        setPromoStatus({
          valid: true,
          message: `Promo applied! ${res.discountValue}${
            res.type === "percent" ? "%" : "₹"
          } off`,
        });
      } else {
        setPromoStatus({ valid: false, message: "Invalid promo code" });
      }
    } catch {
      setPromoStatus({ valid: false, message: "Invalid promo code" });
    }
  };

  // Submit booking
  const submitBooking = async (e) => {
    e.preventDefault();
    
    if (!agreedToTerms) {
      setError("Please agree to the terms and safety policy");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const newBooking = {
        experienceId: exp._id,
        slot,
        name: form.name,
        email: form.email,
        promoCode: form.promoCode || undefined,
      };

      const res = await createBooking(newBooking);
      setLoading(false);

      if (res.success) {
        navigate("/result", {
          state: { success: true, bookingId: res.bookingId, exp, slot },
        });
      } else {
        setError("Booking failed. Please try again.");
      }
    } catch (err) {
      setLoading(false);
      setError(
        err.response?.data?.error || "Booking failed! Please try again."
      );
    }
  };

  return (
    <>
      <Helmet>
        <title>Checkout – {exp.name} | BookIt</title>
        <meta
          name="description"
          content={`Complete your booking for ${exp.name}`}
        />
      </Helmet>

      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Back button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-6 transition"
          >
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            <span className="font-medium">Checkout</span>
          </button>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Section - Form */}
            <div className="lg:col-span-2">
              <form
                onSubmit={submitBooking}
                className="bg-white rounded-2xl shadow-sm p-6 md:p-8 space-y-6"
              >
                {/* Name & Email Row */}
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Full name
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      placeholder="Your name"
                      className="w-full px-4 py-3 bg-gray-100 border-0 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      placeholder="Your email"
                      className="w-full px-4 py-3 bg-gray-100 border-0 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                    />
                  </div>
                </div>

                {/* Promo Code */}
                <div>
                  <label
                    htmlFor="promo"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Promo code
                  </label>
                  <div className="flex gap-3">
                    <input
                      id="promo"
                      type="text"
                      placeholder="Promo code"
                      className="flex-1 px-4 py-3 bg-gray-100 border-0 rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                      value={form.promoCode}
                      onChange={(e) =>
                        setForm({ ...form, promoCode: e.target.value })
                      }
                    />
                    <button
                      type="button"
                      onClick={handlePromoCheck}
                      className="px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition"
                    >
                      Apply
                    </button>
                  </div>
                  {promoStatus && (
                    <p
                      className={`text-sm mt-2 ${
                        promoStatus.valid ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {promoStatus.message}
                    </p>
                  )}
                </div>

                {/* Terms Agreement */}
                <div className="flex items-start gap-3">
                  <input
                    id="terms"
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm text-gray-600 cursor-pointer"
                  >
                    I agree to the{" "}
                    <a
                      href="/terms"
                      className="text-blue-600 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      terms and safety policy
                    </a>
                  </label>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}
              </form>

              {/* Payment Icons */}
              <div className="mt-6 flex justify-center">
                <div className="flex items-center gap-4 bg-white px-6 py-4 rounded-xl shadow-sm">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                    alt="PayPal"
                    className="h-6"
                  />
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/b/b7/MasterCard_Logo.svg"
                    alt="Mastercard"
                    className="h-8"
                  />
                </div>
              </div>
            </div>

            {/* Right Section - Booking Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-8">
                <h3 className="text-lg font-semibold mb-4">Booking Summary</h3>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Experience</span>
                    <span className="font-medium text-gray-900">
                      {exp.name}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Date</span>
                    <span className="font-medium text-gray-900">
                      {slot.date}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Time</span>
                    <span className="font-medium text-gray-900">
                      {slot.time}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Qty</span>
                    <span className="font-medium text-gray-900">1</span>
                  </div>

                  <hr className="my-4" />

                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium text-gray-900">
                      ₹{subtotal}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Taxes</span>
                    <span className="font-medium text-gray-900">₹{taxes}</span>
                  </div>

                  <hr className="my-4" />

                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>₹{total}</span>
                  </div>
                </div>

                {/* Pay Button */}
                <button
                  type="submit"
                  onClick={submitBooking}
                  disabled={loading}
                  className="w-full mt-6 py-4 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader text="" />
                      Processing...
                    </span>
                  ) : (
                    "Pay and Confirm"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
