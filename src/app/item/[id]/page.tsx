"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export type Item = {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  totalPrice: number;
};

export default function ItemDetailPage({ params }: { params: { id: string } }) {
  const [item, setItem] = useState<Item | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchItem() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/item/${params.id}`,
          {
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const text = await response.text();
        if (!text) {
          setError("Item not found.");
          return;
        }

        const data: Item = JSON.parse(text);
        setItem(data);
      } catch (error: any) {
        console.error("Error fetching item:", error);
        setError(error.message);
      }
    }

    fetchItem();
  }, [params.id]);
  if (localStorage.getItem("authenticated") != "true") {
    router.push("/");
  }

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4">
      {item ? (
        <>
          <h2 className="text-2xl font-bold mb-2">{item.name}</h2>
          <p className="text-gray-700 mb-2">{item.description}</p>
          <p className="text-lg font-semibold">
            Price: ${item.price.toFixed(2)}
          </p>
          <p className="text-lg">Quantity: {item.quantity}</p>
          <p className="text-lg font-bold">
            Total Price: ${item.totalPrice.toFixed(2)}
          </p>
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => router.back()}
          >
            Go Back
          </button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
