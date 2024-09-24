import BodyweightTracker from "./BodyweightTracker/BodyweightTracker";
import WorkoutFrequency from "./WorkoutFrequency/WorkoutFrequency";

export default function Home() {
  return (
    <div className="flex flex-col align-middle justify-center items-center w-[80%] mt-10 gap-12">
      <div className="w-[100%]">
        <h1 className="text-text-color text-3xl text-left">
          Welcome back <span className="text-header-color ml-1">Ibrahim</span>
        </h1>
      </div>
      <WorkoutFrequency />
      <BodyweightTracker />
    </div>
  );
}
