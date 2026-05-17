import { BookingCancelAlert } from "@/components/BookingCancelAlert";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { FaRegCalendar, FaRegEye } from "react-icons/fa6";
import { LuMapPin } from "react-icons/lu";

const MyBookingPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  const user = session?.user;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/booking/${user?.id}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );
  const bookings = await res.json();

  return (
    <div className="max-w-7xl mx-auto mt-10">
      <h1 className="text-3xl font-bold">My Bookings</h1>
      <p className="text-gray-500 mt-1">
        Manage and view your upcoming travel plans
      </p>

      <div className="space-y-5 mt-6">
        {bookings.map((booking) => (
          <div key={booking._id} className="flex gap-5 border p-5 items-center">
            <Image
              src={booking.imageUrl}
              alt={booking.destinationName}
              height={150}
              width={200}
              className="object-cover h-36"
            />
            <div className="flex-1">
              {/* Status Badge */}
              <div
                className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full border mb-2"
                style={{
                  color: booking.status === "pending" ? "#f59e0b" : "#10b981",
                  borderColor:
                    booking.status === "pending" ? "#f59e0b" : "#10b981",
                }}
              >
                ✓ {booking.status === "pending" ? "Pending" : "Confirmed"}
              </div>

              <h1 className="font-bold text-2xl">{booking.destinationName}</h1>

              <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                <FaRegCalendar />
                <span>
                  Departure:{" "}
                  {new Date(booking.departureDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>

              <div className="flex items-center gap-1 text-sm text-gray-500">
                <LuMapPin />
                <span>Booking ID: {booking._id}</span>
              </div>

              <p className="text-2xl font-bold text-cyan-500 mt-2">
                ${booking.price}
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-2">
              <BookingCancelAlert bookingId={booking._id} />
              <Link href={`/destinations/${booking.destinationId}`}>
                <button className="flex items-center gap-2 border border-cyan-500 text-cyan-500 px-4 py-2">
                  <FaRegEye /> View
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookingPage;
