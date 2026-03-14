import { Button } from "../ui/button";

export default function CallToAction() {
  return (
    <div className="bg-primary">
      <div className="container px-4 mx-auto lg:py-28 py-10 grid lg:grid-cols-2 gap-6">
        <div className="p-[50px] w-full relative rounded-[12px] overflow-hidden">
          <img
            src="/images/call-to-action/candidate-&-employers.jpg "
            alt=""
            className="absolute inset-0 h-full w-full rounded-[12px] overflow-hidden"
          />

          <div className="relative">
            <div className=" bg-[#14151A40]  text-white w-7/12 space-y-4">
              <h3 className="text-2xl font-medium pt-1">Become a Job Seeker</h3>
              <p className="text-sm opacity-80">
                Create your profile once and get discovered by recruiters
                looking for your exact skills. No endless applications. Just the
                right opportunities, delivered to you.
              </p>
            </div>

            <Button className="mt-7 bg-white text-[#EE7B36] px-6 rounded-[6px]">
              Start Job Search
            </Button>
          </div>
        </div>
        {/* Image not ovelapping on mobile */}
        <div className="p-[50px] w-full relative rounded-[12px] overflow-hidden bg-white min-h-[300px]">
          <div className="relative z-10">
            <div className="text-white md:w-7/12 space-y-4">
              <h3 className="text-2xl font-medium text-[#1B1B1C] pt-1">
                Become an Employer
              </h3>
              <p className="text-sm text-[#1B1B1CB2] opacity-80 max-w-[60%] md:max-w-none">
                Tell us what you need and get smart candidate recommendations.
                Skip the flood of unqualified applicants. Find your perfect hire
                faster and easier than ever before.
              </p>
            </div>

            <Button className="mt-7 px-6 rounded-[6px]">Post a Job</Button>
          </div>

          <img
            src="/images/call-to-action/become-employer.png"
            alt=""
            className="absolute right-0 bottom-0 w-[280px] pointer-events-none"
          />
        </div>
      </div>
    </div>
  );
}
