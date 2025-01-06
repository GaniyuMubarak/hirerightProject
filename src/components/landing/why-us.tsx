import { Button } from "../ui/button";
import Icons from "../ui/icons";

export default function WhyUs() {
  return (
    <div className="bg-[#F8F8FD] relative" id="whyus">
      <div className=" mx-auto px-4 lg:py-20 py-10">
        <div className="text-center max-w-5xl mx-auto lg:space-y-8 space-y-4">
          <span className="text-[#EE7B36] text-sm border border-[#0A0F2914] rounded-full py-1 px-2 flex items-center gap-2 w-fit mx-auto">
            <Icons.check /> Why choose Hire Right
          </span>

          <h1 className="text-[#1B1B1C] text-5xl lg:text-5xl font-abhaya font-extrabold tracking-tight">
            Personalized job matches for seekers. AI-driven candidate matches
            for employers. Fast, accurate, and easy for both.
          </h1>
        </div>

        <div className="container mx-auto grid lg:grid-cols-2 gap-8 pt-20">
          <div>
            <div className="grid grid-cols-2 lg:gap-20 gap-4">
              <WhyUsCard
                img={"/images/why-us/job-seeker.png"}
                title="For Job Seekers"
                desc="Get personalized job recommendations, fast profile setup, and real-time job alerts tailored to your skills and career goals."
              />
              <WhyUsCard
                img={"/images/why-us/employer.png"}
                title="For Employers"
                desc="Post jobs easily, get AI-driven candidate matches, and access a pool of qualified talent ready to meet your hiring needs."
              />
              <WhyUsCard
                img={"/images/why-us/target.png"}
                title="Fast and Accurate Matches"
                desc="Our advanced technology ensures quick, precise matches, connecting the right people to the right opportunities."
              />
              <WhyUsCard
                img={"/images/why-us/streamlined.png"}
                title="Streamlined Experience"
                desc="Whether you're seeking a job or hiring, our intuitive platform makes the process easy and efficient."
              />
            </div>
            <Button className="rounded-[6px] mt-12 px-6">Get Started</Button>
          </div>
          <div className="relative ">
            <img
              src="/images/why-us/why-us.png"
              alt="Dashboard"
              className="lg:absolute lg:-right-20 lg:h-[548px] max-lg:-mr-10"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function WhyUsCard({
  img,
  desc,
  title,
}: {
  img: string;
  desc: string;
  title: string;
}) {
  return (
    <div className="flex flex-col gap-4 w-full">
      <img src={img} alt="" className="aspect-square w-11" />

      <div className="flex flex-col gap-1.5 ">
        <span className="text-lg font-medium  tracking-[-0.01em] text-[#14151A]">
          {title}
        </span>
        <span className="text-[#0F132499] tracking-[-0.01em]">{desc}</span>
      </div>
    </div>
  );
}
