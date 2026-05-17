import { Button } from "@heroui/react";
import { FiExternalLink } from "react-icons/fi";
import Image from "next/image";
import { LuMapPin } from "react-icons/lu";
import { FaRegCalendar, FaStar } from "react-icons/fa6";
import Link from "next/link";

const DestinationCard = ({ destination }) => {
  const { _id, imageUrl, price, destinationName, duration, country } =
    destination;

  return (
    <div className="border">
      <div className="relative">
        <Image
          alt={destinationName}
          src={imageUrl}
          height={400}
          width={400}
          className="w-full"
        />
        {/* Rating Badge */}
        <div className="absolute top-2 right-2 bg-white text-black text-xs font-bold px-2 py-1 flex items-center gap-1">
          <FaStar className="text-yellow-400" /> 4.5
        </div>
      </div>

      <div className="p-2">
        <div className="flex items-center gap-1">
          <LuMapPin /> <span>{country}</span>
        </div>
        <div className="flex justify-between">
          <div>
            <h2 className="text-xl font-bold">{destinationName}</h2>
            <div className="flex gap-1 items-center">
              <FaRegCalendar /> {duration}
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold">$ {price}</h3>
          </div>
        </div>
        <Link href={`/destinations/${_id}`}>
          <Button variant="ghost" className="mt-1 text-cyan-500">
            <FiExternalLink /> Book Now
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default DestinationCard;
