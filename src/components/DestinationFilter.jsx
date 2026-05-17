"use client";

import { useRouter, useSearchParams } from "next/navigation";

const DestinationFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFilter = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/destinations?${params.toString()}`);
  };

  return (
    <div className="flex gap-4 mt-6">
      <select
        defaultValue={searchParams.get("category") || ""}
        className="border px-4 py-2 w-full uppercase text-sm"
        onChange={(e) => handleFilter("category", e.target.value)}
      >
        <option value="">CATEGORY</option>
        <option value="Beach">Beach</option>
        <option value="Mountain">Mountain</option>
        <option value="City">City</option>
        <option value="Adventure">Adventure</option>
        <option value="Cultural">Cultural</option>
        <option value="Luxury">Luxury</option>
      </select>

      <select
        defaultValue={searchParams.get("sort") || ""}
        className="border px-4 py-2 w-full uppercase text-sm"
        onChange={(e) => handleFilter("sort", e.target.value)}
      >
        <option value="">SORT BY</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
      </select>
    </div>
  );
};

export default DestinationFilter;
