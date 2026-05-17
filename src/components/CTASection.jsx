import Link from "next/link";

const CTASection = () => {
  return (
    <div className="bg-[url('/assets/CTA.png')] bg-cover bg-center mt-16 py-20 text-white text-center">
      <h1 className="text-4xl font-bold">Ready To Start Your Journey?</h1>
      <p className="mt-3 text-lg">
        Join thousands of travelers who have discovered the world with us.
      </p>
      <Link href="/destinations">
        <button className="mt-6 bg-white text-black px-8 py-3 uppercase font-semibold hover:bg-cyan-500 hover:text-white transition">
          Book Your Trip Today →
        </button>
      </Link>
    </div>
  );
};

export default CTASection;
