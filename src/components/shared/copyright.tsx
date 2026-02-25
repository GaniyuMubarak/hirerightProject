export default function Copyright() {
  const currentYear = new Date().getFullYear();

  return (
    <p className="text-[#0D112666] text-sm font-medium my-6 text-center">
      <span className="text-primary">
        Hire<span className="text-brandOrange">Right</span>
      </span> All rights reserved. © {currentYear}
    </p>
  );
}
