export default function ProgressBar() {
  return (
    <div className="flex flex-col gap-2 max-w-xs mx-auto space-y-1.5 text-xs font-medium">
      <span>Setup progress</span>
      <div className="flex gap-2 items-center w-full">
        <div className="w-full bg-border rounded-full h-2 ">
          <div
            className="bg-primary h-2 rounded-full"
            style={{ width: "5%" }}
          ></div>{" "}
        </div>{" "}
        <span>5%</span>
      </div>
    </div>
  );
}
