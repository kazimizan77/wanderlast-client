import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { BiEdit } from "react-icons/bi";
import { LuMapPin } from "react-icons/lu";
import {
  TbPlane,
  TbWorld,
  TbTrendingUp,
  TbCurrencyDollar,
} from "react-icons/tb";

const ProfilePage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  const user = session?.user;

  // Fetch user bookings for stats
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/booking/${user?.id}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );
  const bookings = await res.json();

  const totalSpent = bookings.reduce((sum, b) => sum + Number(b.price), 0);
  const upcomingTrips = bookings.filter(
    (b) => new Date(b.departureDate) > new Date(),
  ).length;
  const countriesVisited = [...new Set(bookings.map((b) => b.country))].length;

  const stats = [
    {
      label: "Total Bookings",
      value: bookings.length,
      icon: <TbPlane className="text-cyan-500 text-2xl" />,
      bg: "bg-cyan-50",
    },
    {
      label: "Countries Visited",
      value: countriesVisited,
      icon: <TbWorld className="text-green-500 text-2xl" />,
      bg: "bg-green-50",
    },
    {
      label: "Upcoming Trips",
      value: upcomingTrips,
      icon: <TbTrendingUp className="text-orange-500 text-2xl" />,
      bg: "bg-orange-50",
    },
    {
      label: "Total Spent",
      value: `$${totalSpent.toLocaleString()}`,
      icon: <TbCurrencyDollar className="text-purple-500 text-2xl" />,
      bg: "bg-purple-50",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto mt-10">
      <h1 className="text-3xl font-bold">My Profile</h1>
      <p className="text-gray-500 mt-1">
        Manage your account settings and travel preferences
      </p>

      <div className="flex gap-8 mt-8">
        {/* Left — User Info */}
        <div className="border p-6 w-72 h-fit">
          <div className="flex flex-col items-center text-center">
            <div className="relative">
              {user?.image ? (
                <Image
                  src={user.image}
                  alt={user.name}
                  width={100}
                  height={100}
                  className="rounded-full object-cover w-24 h-24"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-cyan-500 flex items-center justify-center text-white text-3xl font-bold">
                  {user?.name?.charAt(0)}
                </div>
              )}
            </div>

            <h2 className="font-bold text-xl mt-3">{user?.name}</h2>
            <div className="flex items-center gap-1 text-gray-500 text-sm mt-1">
              <LuMapPin className="text-xs" />
              <span>Member</span>
            </div>
          </div>

          <div className="mt-6 space-y-3 text-sm border-t pt-4">
            <div className="flex justify-between">
              <span className="text-gray-500">Member since</span>
              <span className="font-semibold">
                {new Date(user?.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Email</span>
              <span className="font-semibold text-xs">{user?.email}</span>
            </div>
          </div>

          <Link href="#">
            <button className="mt-4 w-full flex items-center justify-center gap-2 bg-cyan-500 text-white py-2">
              <BiEdit /> Edit Profile
            </button>
          </Link>
        </div>

        {/* Right — Travel Stats */}
        <div className="flex-1">
          <h2 className="text-xl font-bold mb-4">Travel Statistics</h2>
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="border p-5 flex items-center justify-between"
              >
                <div>
                  <p className="text-gray-500 text-sm">{stat.label}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.bg}`}>{stat.icon}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
