import Banner from "@/components/Banner";
import Featured from "@/components/Featured";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";

export default function Home() {
  return (
    <div>
      <Banner />
      <Featured />
      <WhyChooseUs />
      <Testimonials />
      <CTASection />
    </div>
  );
}