import { cn } from "@/lib/utils";
import { Link } from "react-router";
import { buttonVariants } from "../ui/button";
import Icons from "../ui/icons";

export default function () {
  return (
    <div className="bg-[#F8F8FD] pt-24 pb-32">
      <div className="container mx-auto grid grid-cols-2">
        <div className=" w-11/12">
          <h1 className="text-7xl font-abhaya font-extrabold">
            Find Your Perfect Job Match with{" "}
            <span className="text-primary">Hire Right!</span>
          </h1>
          <img src="/images/lines.png" alt="" className="w-9/12 mt-6" />
          <p className="text-[#515B6F] text-xl w-11/12 mt-8">
            Job seekers get tailored recommendations, and companies find their
            ideal candidates instantly.
          </p>

          <Link
            to={"/candidate/dashboard"}
            className={cn(buttonVariants(), "mt-8 rounded-[6px] px-6")}
          >
            Explore More <Icons.arrowRight className="min-h-6 min-w-6" />
          </Link>
        </div>
        <div>
          <img src="/images/landing/hero.png" alt="Happy people" />
        </div>
      </div>
    </div>
  );
}
