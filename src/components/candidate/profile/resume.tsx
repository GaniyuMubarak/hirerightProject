import Icons from "../../ui/icons";

export default function Resume() {
  return (
    <div className="space-y-4 pb-4 border-b">
      <h2 className="text-xl font-semibold text-[#020C10]">
        Experience and Certifications
      </h2>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex gap-2 text-[#1B1B1C] text-lg font-medium">
            <h3>Product Designer</h3> |{" "}
            <span>Compugeen Africa, Lagos, Nigeria</span>
          </div>
          <span>Jan 2023 - Oct 2023</span>
        </div>

        <p className="text-[#1B1B1C] ">
          Responsible for a variety of tasks and roles. Some roles and
          responsibilities include:
        </p>

        <div className="flex items-center gap-2.5">
          <Icons.link className="h-6 w-6" />
          http://localhost:5173/candidate/profile
        </div>
        <ul className=" list-disc list-outside px-4 text-[#1B1B1C] lg:w-7/12">
          <li className="list-item">
            User Research: Conducting usability testing to gather insights into
            user behaviors, needs, and pain points.
          </li>
          <li>
            Wireframing and Prototyping: Creating low-fidelity wireframes and
            interactive prototypes to visualize design concepts and workflows.
          </li>
          <li>
            UI Design: Creation of user interface elements, including icons,
            buttons, and navigation menus, to ensure consistency and usability
            across digital products.
          </li>
          <li>
            Information Architecture: Collaborating with Product Manager to
            organize and structure information in a way that enhances user
            understanding and navigation.
          </li>
        </ul>
      </div>

      <ResumeInfoCard />
      <ResumeInfoCard />
    </div>
  );
}

export function ResumeInfoCard() {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex gap-2 text-[#1B1B1C] text-lg font-medium">
          <h3>Product Designer</h3> |{" "}
          <span>Compugeen Africa, Lagos, Nigeria</span>
        </div>
        <span className="font-medium">Jan 2023 - Oct 2023</span>
      </div>

      <p className="text-[#1B1B1C] ">
        Responsible for a variety of tasks and roles. Some roles and
        responsibilities include:
      </p>

      <div className="flex items-center gap-2.5">
        <Icons.link className="h-6 w-6" />
        http://localhost:5173/dashboard/profile
      </div>
      <ul className=" list-disc list-outside px-4 text-[#1B1B1C] lg:w-7/12">
        <li className="list-item">
          User Research: Conducting usability testing to gather insights into
          user behaviors, needs, and pain points.
        </li>
        <li>
          Wireframing and Prototyping: Creating low-fidelity wireframes and
          interactive prototypes to visualize design concepts and workflows.
        </li>
        <li>
          UI Design: Creation of user interface elements, including icons,
          buttons, and navigation menus, to ensure consistency and usability
          across digital products.
        </li>
        <li>
          Information Architecture: Collaborating with Product Manager to
          organize and structure information in a way that enhances user
          understanding and navigation.
        </li>
      </ul>
    </div>
  );
}
