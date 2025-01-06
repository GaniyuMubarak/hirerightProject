export default function HowItWorks() {
  return (
    <div className="container mx-auto px-4 lg:py-20 py-10">
      <div className="text-center max-w-xl mx-auto lg:space-y-8 space-y-4">
        <span className="text-[#EE7B36] text-sm border border-[#0A0F2914] rounded-full py-1 px-1.5">
          How it works #
        </span>

        <h1 className="text-[#1B1B1C] text-3xl lg:text-5xl font-abhaya font-extrabold tracking-tight">
          Match with jobs. Find top talent. Fast and easy.
        </h1>
      </div>
      <div className="grid lg:grid-cols-4 gap-6 lg:mt-20 mt-8">
        <HowItWorksCard
          title="Sign up"
          description="Create your profile in minutes—job seekers share their skills, employers
        post jobs with specific needs."
        />
        <HowItWorksCard
          title="Get Matched"
          description="Our AI connects job seekers with personalized opportunities and matches employers with qualified candidates, fast and accurately."
        />
        <HowItWorksCard
          title="Apply"
          description="Job seekers can directly apply to jobs that match their profile, making the application process quick and targeted."
        />
        <HowItWorksCard
          title="Hire Right"
          description="Employers review their matched candidates, interview, and hire the best fit efficiently."
        />
      </div>
    </div>
  );
}

export function HowItWorksCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="border-2 border-[#EE7B36] p-6 space-y-4 text-center text-[#0F132499]">
      <h2 className="text-lg font-medium  text-[#1B1B1C]">{title}</h2>
      <p>{description}</p>
    </div>
  );
}
