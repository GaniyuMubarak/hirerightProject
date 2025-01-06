import Icons from "../ui/icons";

export default function Testimonies() {
  return (
    <div className="container mx-auto px-4 lg:py-20 py-10" id="testimonials">
      <div className="text-center max-w-5xl mx-auto lg:space-y-8 space-y-4 lg:px-8">
        <span className="text-[#EE7B36] text-sm border border-[#0A0F2914] rounded-full py-1 px-2 flex items-center gap-2 w-fit mx-auto">
          <Icons.star /> Testimonials <Icons.star />
        </span>

        <h1 className="text-[#1B1B1C] text-3xl lg:text-5xl font-abhaya font-extrabold tracking-tight">
          Hear from job seekers who found their perfect match and employers who
          hired the right talent, thanks to{" "}
          <span className="text-primary">Hire Right!</span>
        </h1>
      </div>
      <div className="grid lg:grid-cols-3 gap-6 py-20">
        <TestimoniesCard />
        <TestimoniesCard />
        <TestimoniesCard />
      </div>
    </div>
  );
}

export function TestimoniesCard() {
  return (
    <div className="bg-[#F8F8FD] border border-[#0A0F2914] rounded-[24px] p-10 space-y-10">
      <p className="text-2xl tracking-[-0.04em]">
        I have been using them for a year now. Everything is detailed and well
        organized and, of course, damn beautiful.
      </p>

      <div className="space-y-4">
        <img
          src="/images/testimonies/avatar.png"
          alt=""
          className="w-16 aspect-square"
        />
        <div>
          <h4 className="text-[#14151A] font-medium">Samson Bond</h4>
          <span className="text-[#0F132499]">Recruiter at Google</span>
        </div>
      </div>
    </div>
  );
}
