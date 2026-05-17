import Image from "next/image";

const testimonials = [
  {
    id: 1,
    text: "The Bali Trip Was Absolutely Magical! Every Detail Was Perfectly Planned. The Resorts Were Luxurious And The Cultural Experiences Were Unforgettable.",
    name: "Michael Chen",
    location: "Singapore",
    image: "/assets/person1.png",
  },
  {
    id: 2,
    text: "Swiss Alps Adventure Exceeded All Expectations. The Mountain Views Were Breathtaking And Our Guide Was Incredibly Knowledgeable. Highly Recommend!",
    name: "Sarah Johnson",
    location: "New York, USA",
    image: "/assets/person2.png",
  },
];

const Testimonials = () => {
  return (
    <div className="max-w-7xl mx-auto mt-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">What Travelers Say</h1>
          <p className="text-gray-500">
            Real experiences from our happy travelers
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8">
        {testimonials.map((t) => (
          <div key={t.id} className="flex gap-5 items-start">
            <div className="flex-1">
              <p className="text-gray-700 italic">"{t.text}"</p>
              <p className="mt-4 text-cyan-500 font-semibold">— {t.name}</p>
              <p className="text-gray-400 text-sm">{t.location}</p>
            </div>
            <Image
              src={t.image}
              alt={t.name}
              width={100}
              height={100}
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
