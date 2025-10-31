import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getExperienceById } from "../api/bookItApi";
import Loader from "../components/Loader";
import { Helmet } from "react-helmet";

export default function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [exp, setExp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        setLoading(true);
        const data = await getExperienceById(id);
        setExp(data);
        
        // Auto-select first available slot
        const firstAvailable = data.slots?.find(s => s.available);
        if (firstAvailable) {
          setSelectedDate(firstAvailable.date);
          setSelectedTime(firstAvailable.time);
        }
      } catch (error) {
        console.error('Failed to fetch experience:', error);
        setExp(null);
      } finally {
        setLoading(false);
      }
    };

    fetchExperience();
  }, [id]);

  // Get unique dates
  const availableDates = exp?.slots
    ?.filter(s => s.available)
    .reduce((acc, slot) => {
      if (!acc.some(d => d.date === slot.date)) {
        acc.push({ date: slot.date, count: exp.slots.filter(s => s.date === slot.date && s.available).length });
      }
      return acc;
    }, []) || [];

  // Get times for selected date
  const availableTimes = exp?.slots
    ?.filter(s => s.available && s.date === selectedDate)
    .map(s => ({ time: s.time, available: s.available })) || [];

  // Calculate pricing
  const basePrice = exp?.price || 0;
  const subtotal = basePrice * quantity;
  const taxRate = 0.06; // 6% tax
  const taxes = Math.round(subtotal * taxRate);
  const total = subtotal + taxes;

  // Format date for display
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('-');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[parseInt(month) - 1]} ${parseInt(day)}`;
  };

  // Handle confirm booking
  const handleConfirm = () => {
    if (!selectedDate || !selectedTime) {
      alert('Please select a date and time');
      return;
    }

    navigate('/checkout', {
      state: {
        exp,
        slot: { date: selectedDate, time: selectedTime },
        quantity,
        subtotal,
        taxes,
        total
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader text="Loading experience..." />
      </div>
    );
  }

  if (!exp) {
    return (
      <>
        <Helmet>
          <title>Experience Not Found – Highway Delite</title>
        </Helmet>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Experience not found</h2>
            <Link to="/" className="text-blue-600 hover:text-blue-700 font-medium">
              ← Back to home
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{exp.name} – Highway Delite</title>
        <meta name="description" content={exp.description} />
        <meta property="og:title" content={`${exp.name} – Highway Delite`} />
        <meta property="og:description" content={exp.description} />
        <meta property="og:image" content={exp.imageUrl} />
        <meta property="og:type" content="product" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${exp.name} – Highway Delite`} />
        <meta name="twitter:description" content={exp.description} />
        <meta name="twitter:image" content={exp.imageUrl} />
      </Helmet>

      <main className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 lg:px-6 py-6 md:py-8">
          {/* Back Button */}
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900 font-medium mb-6 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Details
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Experience Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Hero Image */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
                <img 
                  src={exp.imageUrl} 
                  alt={exp.name}
                  className="w-full h-64 md:h-96 object-cover"
                />
              </div>

              {/* Experience Info */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  {exp.name}
                </h1>
                <p className="text-gray-600 mb-4">
                  {exp.description}
                </p>

                {/* Date Selection */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Choose date
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {availableDates.map(({ date, count }) => (
                      <button
                        key={date}
                        onClick={() => setSelectedDate(date)}
                        className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                          selectedDate === date
                            ? 'bg-yellow-400 border-yellow-400 text-gray-900'
                            : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400'
                        }`}
                      >
                        {formatDate(date)}
                        {count > 1 && (
                          <span className="ml-1 text-xs text-gray-500">
                            {count} left
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time Selection */}
                {selectedDate && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Choose time
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {availableTimes.map(({ time }) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all relative ${
                            selectedTime === time
                              ? 'bg-yellow-400 border-yellow-400 text-gray-900'
                              : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400'
                          }`}
                        >
                          {time}
                          {selectedTime === time && (
                            <span className="absolute -top-2 -right-2 'bg-yellow-400 border-yellow-400 text-gray-900 text-xs px-2 py-0.5 rounded-full">
                              Selected
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      All times are in IST (GMT +5:30)
                    </p>
                  </div>
                )}

                {/* About Section */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    About
                  </h3>
                  <p className="text-sm text-gray-600">
                    Scenic routes, trained guides, and safety briefing. Minimum age 10.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Booking Summary - SMALLER */}
<div className="lg:col-span-1">
  <div className="bg-gray-100 rounded-2xl p-4 sticky top-20">
    <h3 className="text-base font-semibold text-gray-900 mb-3">
      Booking Summary
    </h3>

    {/* Price */}
    <div className="flex justify-between items-center mb-3">
      <span className="text-sm text-gray-600">Starts at</span>
      <span className="text-xl font-bold text-gray-900">₹{basePrice}</span>
    </div>

    {/* Quantity Selector */}
    <div className="flex justify-between items-center mb-3">
      <span className="text-sm text-gray-600">Quantity</span>
      <div className="flex items-center gap-2.5">
        <button
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          className="w-7 h-7 rounded-lg border border-gray-300 hover:bg-gray-200 transition-colors flex items-center justify-center text-base"
          disabled={quantity <= 1}
        >
          −
        </button>
        <span className="text-base font-medium w-6 text-center">{quantity}</span>
        <button
          onClick={() => setQuantity(quantity + 1)}
          className="w-7 h-7 rounded-lg border border-gray-300 hover:bg-gray-200 transition-colors flex items-center justify-center text-base"
        >
          +
        </button>
      </div>
    </div>

    {/* Subtotal */}
    <div className="flex justify-between items-center mb-1.5">
      <span className="text-sm text-gray-600">Subtotal</span>
      <span className="text-sm text-gray-900 font-medium">₹{subtotal}</span>
    </div>

    {/* Taxes */}
    <div className="flex justify-between items-center mb-3 pb-3 border-b border-gray-300">
      <span className="text-sm text-gray-600">Taxes</span>
      <span className="text-sm text-gray-900 font-medium">₹{taxes}</span>
    </div>

    {/* Total */}
    <div className="flex justify-between items-center mb-4">
      <span className="text-base font-semibold text-gray-900">Total</span>
      <span className="text-xl font-bold text-gray-900">₹{total}</span>
    </div>

    {/* Confirm Button */}
    <button
      onClick={handleConfirm}
      disabled={!selectedDate || !selectedTime}
      className="w-full py-2.5 bg-yellow-300 hover:bg-yellow-400 disabled:bg-gray-300 disabled:cursor-not-allowed rounded-lg font-semibold text-sm text-black transition-colors"
    >
      Confirm
    </button>
  </div>
</div>

          </div>
        </div>
      </main>
    </>
  );
}
