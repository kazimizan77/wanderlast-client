import { LuShieldCheck, LuHeadphones } from "react-icons/lu";
import { TbMap } from "react-icons/tb";

const WhyChooseUs = () => {
  return (
    <div className="bg-blue-50 py-16 mt-16">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-3xl font-bold">Why Choose Wanderlust</h1>
        <p className="text-gray-500 mt-2">
          Your trusted partner for exceptional travel experiences
        </p>

        <div className="grid grid-cols-3 gap-8 mt-10">
          <div className="text-left p-6 bg-white">
            <LuShieldCheck className="text-cyan-500 text-3xl mb-3" />
            <h3 className="font-bold text-lg">Safe & Secure</h3>
            <p className="text-gray-500 text-sm mt-2">
              Your safety is our priority with comprehensive travel insurance
              and 24/7 support.
            </p>
          </div>

          <div className="text-left p-6 bg-white">
            <TbMap className="text-cyan-500 text-3xl mb-3" />
            <h3 className="font-bold text-lg">Expert Guides</h3>
            <p className="text-gray-500 text-sm mt-2">
              Local experts who bring destinations to life with authentic
              cultural insights.
            </p>
          </div>

          <div className="text-left p-6 bg-white">
            <LuHeadphones className="text-cyan-500 text-3xl mb-3" />
            <h3 className="font-bold text-lg">24/7 Support</h3>
            <p className="text-gray-500 text-sm mt-2">
              Round-the-clock customer service to assist you wherever your
              journey takes you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
