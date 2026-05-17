import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { DeleteAlert } from "@/components/DeleteAlert";
import { EditModal } from "@/components/EditModal";
import { TbPlane, TbUsers, TbCurrencyDollar, TbMapPin } from "react-icons/tb";

const AdminPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  // Fetch all destinations
  const destRes = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/destination`,
  );
  const destinations = await destRes.json();

  // Fetch all bookings
  const bookingRes = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/booking/${session?.user?.id}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );
  const bookings = await bookingRes.json();

  const totalRevenue = bookings.reduce((sum, b) => sum + Number(b.price), 0);

  const stats = [
    {
      label: "Total Destinations",
      value: destinations.length,
      icon: <TbMapPin className="text-cyan-500 text-2xl" />,
      bg: "bg-cyan-50",
    },
    {
      label: "Total Bookings",
      value: bookings.length,
      icon: <TbPlane className="text-green-500 text-2xl" />,
      bg: "bg-green-50",
    },
    {
      label: "Total Revenue",
      value: `$${totalRevenue.toLocaleString()}`,
      icon: <TbCurrencyDollar className="text-purple-500 text-2xl" />,
      bg: "bg-purple-50",
    },
    {
      label: "Total Users",
      value: "—",
      icon: <TbUsers className="text-orange-500 text-2xl" />,
      bg: "bg-orange-50",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto mt-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-500 mt-1">
            Manage your travel packages and bookings
          </p>
        </div>
        <Link href="/add-destination">
          <button className="bg-cyan-500 text-white px-5 py-2 flex items-center gap-2">
            + Add New Package
          </button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-10">
        {stats.map((stat, i) => (
          <div key={i} className="border p-5 flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">{stat.label}</p>
              <p className="text-2xl font-bold mt-1">{stat.value}</p>
            </div>
            <div className={`p-3 rounded-full ${stat.bg}`}>{stat.icon}</div>
          </div>
        ))}
      </div>

      {/* Destinations Table */}
      <h2 className="text-xl font-bold mb-4">All Destinations</h2>
      <div className="border">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left p-4">Destination</th>
              <th className="text-left p-4">Country</th>
              <th className="text-left p-4">Category</th>
              <th className="text-left p-4">Price</th>
              <th className="text-left p-4">Duration</th>
              <th className="text-left p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {destinations.map((destination) => (
              <tr key={destination._id} className="border-b hover:bg-gray-50">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <Image
                      src={destination.imageUrl}
                      alt={destination.destinationName}
                      width={50}
                      height={50}
                      className="object-cover w-12 h-12"
                    />
                    <span className="font-semibold">
                      {destination.destinationName}
                    </span>
                  </div>
                </td>
                <td className="p-4 text-gray-500">{destination.country}</td>
                <td className="p-4">
                  <span className="bg-cyan-50 text-cyan-600 px-2 py-1 text-xs">
                    {destination.category}
                  </span>
                </td>
                <td className="p-4 font-semibold">${destination.price}</td>
                <td className="p-4 text-gray-500">{destination.duration}</td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <EditModal destination={destination} />
                    <DeleteAlert destination={destination} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPage;
