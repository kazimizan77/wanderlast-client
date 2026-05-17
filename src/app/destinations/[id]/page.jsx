import BookingCard from "@/components/BookingCard";
import { DeleteAlert } from "@/components/DeleteAlert";
import { EditModal } from "@/components/EditModal";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { FaRegCalendar, FaStar } from "react-icons/fa6";
import { LuMapPin } from "react-icons/lu";
import { FaArrowLeft, FaCheck } from "react-icons/fa6";

const DestinationDetailsPage = async ({ params }) => {
  const { id } = await params;
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/destination/${id}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );
  const destination = await res.json();

  const {
    imageUrl,
    price,
    destinationName,
    duration,
    country,
    description,
    highlights,
    itinerary,
  } = destination;

  return (
    <div className="max-w-7xl mx-auto mt-5">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-4">
        <Link
          href="/destinations"
          className="flex items-center gap-2 text-gray-500 hover:text-black"
        >
          <FaArrowLeft /> Back to Destinations
        </Link>
        <div className="flex gap-3">
          <EditModal destination={destination} />
          <DeleteAlert destination={destination} />
        </div>
      </div>

      {/* Hero Image */}
      <Image
        className="w-full h-96 object-cover"
        alt={destinationName}
        src={imageUrl}
        height={500}
        width={1200}
      />

      <div className="flex justify-between gap-10 mt-6">
        {/* Left Content */}
        <div className="flex-1">
          <div className="flex items-center gap-1 text-gray-500">
            <LuMapPin /> <span>{country}</span>
          </div>

          <h1 className="text-4xl font-bold mt-1">{destinationName}</h1>

          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-1 text-yellow-400">
              <FaStar /> <span className="text-black font-semibold">4.9</span>
              <span className="text-gray-400 text-sm">(234 reviews)</span>
            </div>
            <div className="flex items-center gap-1 text-gray-500">
              <FaRegCalendar />{" "}
              <span className="font-semibold">{duration}</span>
            </div>
          </div>

          {/* Overview */}
          <h2 className="text-2xl font-bold mt-8">Overview</h2>
          <p className="text-gray-600 mt-2">{description}</p>

          {/* Highlights */}
          {highlights?.length > 0 && (
            <>
              <h2 className="text-2xl font-bold mt-8">Highlights</h2>
              <p className="text-gray-600 mt-2">{description}</p>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {highlights.map((h, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-gray-600"
                  >
                    <FaCheck className="text-cyan-500" /> {h}
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Itinerary */}
          {itinerary?.length > 0 && (
            <>
              <h2 className="text-2xl font-bold mt-8">Itinerary</h2>
              <div className="space-y-4 mt-4">
                {itinerary.map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full border-2 border-cyan-500 flex items-center justify-center text-cyan-500 font-bold text-sm">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div>
                      <h3 className="font-bold">{item.title}</h3>
                      <p className="text-gray-500 text-sm">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Right — Booking Card */}
        <BookingCard destination={destination} />
      </div>
    </div>
  );
};

export default DestinationDetailsPage;
