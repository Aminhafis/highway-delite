import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Result() {
  const { state } = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Booking Result – BookIt</title>
        <meta name="description" content="Your booking status" />
      </Helmet>

      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full text-center">
          {state?.success ? (
            <>
              {/* Success Icon */}
              <div className="mb-6 flex justify-center">
                <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                  <svg
                    className="w-12 h-12 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>

              {/* Success Message */}
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Booking Confirmed
              </h1>

              {/* Reference ID */}
              <p className="text-gray-600 mb-8">
                Ref ID: <span className="font-semibold text-gray-900">{state.bookingId}</span>
              </p>

              {/* Back to Home Button */}
              <button
                onClick={() => navigate('/')}
                className="px-8 py-3 bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium rounded-lg transition"
              >
                Back to Home
              </button>
            </>
          ) : (
            <>
              {/* Error Icon */}
              <div className="mb-6 flex justify-center">
                <div className="w-24 h-24 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
                  <svg
                    className="w-12 h-12 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
              </div>

              {/* Error Message */}
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Booking Failed
              </h1>

              <p className="text-gray-600 mb-8">
                Unfortunately, something went wrong. Please try again.
              </p>

              {/* Back to Home Button */}
              <button
                onClick={() => navigate('/')}
                className="px-8 py-3 bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium rounded-lg transition"
              >
                Back to Home
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
