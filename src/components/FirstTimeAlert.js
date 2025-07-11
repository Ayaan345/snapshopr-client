// components/FirstTimeAlert.js
"use client";
export default function FirstTimeAlert({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md shadow-lg max-w-sm">
        <h2 className="text-lg font-bold mb-4">Notice</h2>
        <p className="mb-6">
          ⚠️ All items here are example products only—not actually sold by real sellers.
        </p>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Close
        </button>
      </div>
    </div>
  );
}