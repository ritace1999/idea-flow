import React from "react";
import { Link } from "react-router-dom";
import { Frown } from "lucide-react";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Frown className="w-20 h-20 text-blue-600 mb-4" />
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        404 - Page Not Found
      </h1>
      <p className="text-gray-600 mb-6">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
      >
        Back to Home
      </Link>
    </div>
  );
}

export default NotFound;
