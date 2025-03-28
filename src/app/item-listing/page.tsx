"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Dialog } from "@headlessui/react";

export type Item = {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
};

export default function ItemListingPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [formData, setFormData] = useState<Item>({
    id: 0,
    name: "",
    description: "",
    price: 0,
    quantity: 0,
  });
  const router = useRouter();

  useEffect(() => {
    async function fetchItems() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/item/itemListing`,
          { credentials: "include" }
        );
        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);
        const data: Item[] = await response.json();
        setItems(data);
      } catch (error: any) {
        setError(error.message);
      }
    }
    fetchItems();
  }, []);

  const openModal = (item?: Item) => {
    if (item) {
      setFormData(item);
      setIsEditing(true);
    } else {
      setFormData({ id: 0, name: "", description: "", price: 0, quantity: 0 });
      setIsEditing(false);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const method = isEditing ? "PUT" : "POST";
    const url = isEditing
      ? `${process.env.NEXT_PUBLIC_API_URL}/item/${formData.id}`
      : `${process.env.NEXT_PUBLIC_API_URL}/item`;

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Error saving item");
      closeModal();
      window.location.reload();
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/item/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) throw new Error("Error deleting item");
      window.location.reload();
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Item Listing</h2>
      {error && <p className="text-red-500">{error}</p>}

      <button
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={() => openModal()}
      >
        Add New Item
      </button>

      <ul className="space-y-4">
        {items.map((item) => (
          <li
            key={item.id}
            className="p-4 border rounded-lg shadow-md bg-white"
          >
            <h3 className="text-lg font-semibold text-black">{item.name}</h3>
            <p className="text-sm text-gray-600">{item.description}</p>
            <p className="mt-2 text-gray-800">
              Price: ${item.price.toFixed(2)}
            </p>
            <p className="text-gray-800">Quantity: {item.quantity}</p>
            <div className="mt-3 space-x-2">
              <button
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                onClick={() => openModal(item)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                onClick={() => handleDelete(item.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      <Dialog
        open={isModalOpen}
        onClose={closeModal}
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      >
        <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
          <h2 className="text-xl font-bold mb-4">
            {isEditing ? "Edit Item" : "Add New Item"}
          </h2>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-2"
            placeholder="Item Name"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-2"
            placeholder="Description"
          />
          <input
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-2"
            placeholder="Price"
          />
          <input
            name="quantity"
            type="number"
            value={formData.quantity}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-2"
            placeholder="Quantity"
          />
          <div className="flex justify-end space-x-2 mt-4">
            <button
              className="bg-gray-400 text-white px-3 py-1 rounded"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
