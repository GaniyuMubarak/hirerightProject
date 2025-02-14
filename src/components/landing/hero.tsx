import { cn } from "@/lib/utils";
import { Link } from "react-router";
import { buttonVariants } from "../ui/button";
import Icons from "../ui/icons";

export default function () {
  return (
    <div className="bg-[#F8F8FD] lg:pt-24 pt-12 lg:pb-32 pb-16">
      <div className="container px-4 mx-auto grid lg:grid-cols-2 gap-6">
        <div className=" lg:w-11/12 max-lg:text-center">
          <h1 className="text-5xl lg:text-7xl font-abhaya font-extrabold">
            Find Your Perfect Job Match with{" "}
            <span className="text-primary">Hire Right!</span>
          </h1>
          <img
            src="/images/lines.png"
            alt=""
            className="lg:w-9/12 w-6/12 max-lg:mx-auto lg:mt-6 mt-3"
          />
          <p className="text-[#515B6F] text-xl lg:w-11/12 mt-8">
            Job seekers get tailored recommendations, and companies find their
            ideal candidates instantly.
          </p>

          <Link
            to={"/account-type"}
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
