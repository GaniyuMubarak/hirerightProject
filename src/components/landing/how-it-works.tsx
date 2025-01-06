export default function HowItWorks() {
  return (
    <div className="relative">
      <svg
        width="921"
        height="379"
        viewBox="0 0 921 379"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute -left-4 -to-4 max-lg:hidden"
      >
        <rect
          x="-480.936"
          y="118.254"
          width="1381.44"
          height="271.672"
          transform="rotate(-16.3976 -480.936 118.254)"
          fill="#253B7A"
        />
      </svg>

      <div
        className="container mx-auto px-4 lg:py-20 py-10 relative z-10"
        id="howItWorks"
      >
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

      <svg
        width="1010"
        height="244"
        viewBox="0 0 1010 244"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute -right-2 -bottom-2 max-lg:hidden"
      >
        <rect
          x="0.474609"
          y="394.688"
          width="1381.44"
          height="271.672"
          transform="rotate(-16.5965 0.474609 394.688)"
          fill="#253B7A"
        />
      </svg>
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
