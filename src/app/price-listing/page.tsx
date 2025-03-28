"use client";

import { useEffect, useState } from "react";

export type Item = {
  id: number;
  name: string;
  price: number;
};

export default function PriceListingPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPrices() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/prices/list`,
          {
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: Item[] = await response.json();
        setItems(data);
      } catch (error: any) {
        console.error("Error fetching prices:", error);
        setError(error.message);
      }
    }

    fetchPrices();
  }, []);

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Price Listing</h2>
      <ul className="space-y-3">
        {items.length > 0 ? (
          items.map((item) => (
            <li key={item.id} className="p-4 bg-gray-100 rounded shadow">
              <h3 className="text-lg font-semibold text-black">{item.name}</h3>
              <p className="text-gray-700">Price: ${item.price.toFixed(2)}</p>
            </li>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </ul>
    </div>
  );
}
