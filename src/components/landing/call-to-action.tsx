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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                cursus a dolor convallis efficitur.
              </p>
            </div>

            <Button className="mt-7 bg-white text-[#EE7B36] px-6 rounded-[6px]">
              Start Job Search
            </Button>
          </div>
        </div>
        <div className="p-[50px] w-full relative rounded-[12px] overflow-hidden bg-white ">
          <div className="relative">
            <div className="  text-white w-7/12 space-y-4">
              <h3 className="text-2xl font-medium text-[#1B1B1C] pt-1">
                Become an Employer
              </h3>
              <p className="text-sm text-[#1B1B1CB2] opacity-80">
                Cras in massa pellentesque, mollis ligula non, luctus dui. Morbi
                sed efficitur dolor. Pelque augue risus, aliqu.
              </p>
            </div>

            <Button className="mt-7 px-6 rounded-[6px]">Post a Job</Button>
          </div>
          <img
            src="/images/call-to-action/become-employer.png"
            alt=""
            className="absolute -right-0 -bottom-0 w-[280px]"
          />
        </div>
      </div>
    </div>
  );
}
