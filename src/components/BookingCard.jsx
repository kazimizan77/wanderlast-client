"use client";

import { Button, Card } from "@heroui/react";
import React, { useState } from "react";
import { DateField, Label } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { FaCheck, FaMinus, FaPlus } from "react-icons/fa6";

const BookingCard = ({ destination }) => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const [departureDate, setDepartureDate] = useState(null);
  const [travelers, setTravelers] = useState(1);

  const { price, _id, destinationName, imageUrl, country } = destination;
  const totalPrice = price * travelers;

  const handleBooking = async () => {
    const bookingData = {
      userId: user?.id,
      userImage: user?.image,
      userName: user?.name,
      destinationId: _id,
      destinationName,
      price: totalPrice,
      imageUrl,
      country,
      departureDate: new Date(departureDate),
      travelers,
      status: "confirmed",
    };

    const { data: tokenData } = await authClient.token();

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/booking`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${tokenData?.token}`,
      },
      body: JSON.stringify(bookingData),
    });

    const data = await res.json();
    toast.success("Booked successfully!");
  };

  return (
    <Card className="rounded-none border mt-5 p-5 w-80 h-fit">
      <p className="text-sm text-gray-500">Starting from</p>
      <h2 className="text-3xl font-bold text-cyan-500">${price}</h2>
      <p className="text-sm text-gray-500">per person</p>

      {/* Date Picker */}
      <DateField
        onChange={setDepartureDate}
        className="w-full mt-4"
        name="date"
      >
        <Label>Departure Date</Label>
        <DateField.Group>
          <DateField.Input>
            {(segment) => <DateField.Segment segment={segment} />}
          </DateField.Input>
        </DateField.Group>
      </DateField>

      {/* Number of Travelers */}
      <div className="mt-4">
        <p className="text-sm font-medium mb-2">Number of Travelers</p>
        <div className="flex items-center gap-4 border w-fit px-4 py-2">
          <button
            onClick={() => setTravelers((t) => Math.max(1, t - 1))}
            className="text-gray-500 hover:text-black"
          >
            <FaMinus />
          </button>
          <span className="font-semibold">{travelers}</span>
          <button
            onClick={() => setTravelers((t) => t + 1)}
            className="text-gray-500 hover:text-black"
          >
            <FaPlus />
          </button>
        </div>
      </div>

      {/* Total Price */}
      <div className="mt-4">
        <p className="text-sm text-gray-500">Total Price</p>
        <p className="text-2xl font-bold">${totalPrice}</p>
      </div>

      <Button
        onClick={handleBooking}
        className="w-full rounded-none bg-cyan-500 mt-4"
      >
        Book Now →
      </Button>

      {/* Perks */}
      <div className="mt-4 space-y-1 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <FaCheck className="text-cyan-500" /> Free cancellation up to 7 days
        </div>
        <div className="flex items-center gap-2">
          <FaCheck className="text-cyan-500" /> Travel insurance included
        </div>
        <div className="flex items-center gap-2">
          <FaCheck className="text-cyan-500" /> 24/7 customer support
        </div>
      </div>
    </Card>
  );
};

export default BookingCard;
