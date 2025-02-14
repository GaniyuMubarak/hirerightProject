import CallToAction from "./components/landing/call-to-action";
import Header from "./components/landing/header";
import Hero from "./components/landing/hero";
import HowItWorks from "./components/landing/how-it-works";
import NewsLetters from "./components/landing/news-letters";
import Testimonies from "./components/landing/testimonies";
import WhyUs from "./components/landing/why-us";
import Copyright from "./components/shared/copyright";
import Footer from "./components/shared/footer";

function IndexPage() {
  return (
    <>
      <Header />
      <Hero />
      <HowItWorks />
      <WhyUs />
      <Testimonies />
      <CallToAction />
      <NewsLetters />
      <div className="mt-8">
        <Footer />
        <Copyright />
      </div>
    </>
  );
}

export default IndexPage;
