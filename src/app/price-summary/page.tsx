"use client";

import { useState } from "react";

export default function PriceSummaryPage() {
  const [itemId, setItemId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/prices/summary`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            itemId: itemId,
            quantity: quantity,
          }),
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
      setError(null);
    } catch (error: any) {
      console.error("Error fetching price summary:", error);
      setError(error.message);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Price Summary</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Item ID"
          value={itemId}
          onChange={(e) => setItemId(e.target.value)}
          className="p-2 border rounded w-full"
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="p-2 border rounded w-full"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Get Price Summary
        </button>
      </form>

      {error && <p className="text-red-500 mt-3">{error}</p>}

      {result && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h3 className="text-lg font-bold text-black">
            Total Price: ${result.totalPrice}
          </h3>
          <ul>
            {Object.entries(result.cartItems).map(([name, qty]) => (
              <li key={name} className="text-black">
                {name}: {qty as string | number}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
