import DestinationCard from "@/components/DestinationCard";
import DestinationFilter from "@/components/DestinationFilter";

const DestinationPage = async ({ searchParams }) => {
  const { category, sort } = await searchParams;

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/destination`);
  let destinations = await res.json();

  if (category) {
    destinations = destinations.filter((d) => d.category === category);
  }

  if (sort === "price-asc") destinations.sort((a, b) => a.price - b.price);
  if (sort === "price-desc") destinations.sort((a, b) => b.price - a.price);

  return (
    <div className="max-w-7xl mx-auto mt-10">
      <h1 className="text-4xl font-bold">Explore All Destinations</h1>
      <p className="text-gray-500 mt-2">
        Find your perfect travel experience from our curated collection
      </p>

      <DestinationFilter />

      <p className="text-sm text-gray-500 mt-4">
        Showing {destinations.length} destinations
      </p>

      <div className="grid grid-cols-3 gap-5 mt-6">
        {destinations.map((destination) => (
          <DestinationCard key={destination._id} destination={destination} />
        ))}
      </div>
    </div>
  );
};

export default DestinationPage;
