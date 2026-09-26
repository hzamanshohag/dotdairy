import AboutSection from "@/components/home/AboutSection";
import HeroSection from "@/components/home/HeroSection";
import OrderSection from "@/components/home/OrderSection";
import ProductsSection from "@/components/home/ProductsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import WhyUsSection from "@/components/home/WhyUsSection";
import Footer from "@/components/shared/Footer";
import WhatsAppButton from './../../components/home/WhatsAppButton';



const page = async () => {

  return (
    <div className="bg-[#fff8eb]">
      <main>
        <HeroSection />
        <AboutSection />

        {/* Other sections */}
        <section id="products">
          <ProductsSection />
        </section>

        <section id="why-us">
          <WhyUsSection />
        </section>

        <section id="order">
          <OrderSection />
        </section>

        <section id="testimonials">
          <TestimonialsSection />
        </section>

         <WhatsAppButton/>

        <section id="contact">
          <Footer />
        </section>
      </main>
    </div>
  );
};

export default page;
