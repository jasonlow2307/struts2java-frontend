"use client";

import { useRouter } from "next/navigation";
import Header from "@/components/Header";

export default function MenuPage() {
  const router = useRouter();

  const handleItemListing = () => {
    router.push("/item-listing");
  };

  const handlePriceListing = () => {
    router.push("/price-listing");
  };

  const handlePriceSummary = () => {
    router.push("/price-summary");
  };

  if (localStorage.getItem("authenticated") != "true") {
    router.push("/");
  }

  return (
    <div>
      {/* <Header /> */}
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Menu</h2>

        <div className="flex flex-col gap-3">
          <button
            onClick={handleItemListing}
            className="w-fit px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Item
          </button>

          <button
            onClick={handlePriceListing}
            className="w-fit px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Price Listing
          </button>
          <button
            onClick={handlePriceSummary}
            className="w-fit px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Price Summary
          </button>
        </div>
      </div>
    </div>
  );
}
