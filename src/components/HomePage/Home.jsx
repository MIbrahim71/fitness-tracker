import BodyweightTracker from "./BodyweightTracker";
import WorkoutFrequency from "./WorkoutFrequency";

export default function Home() {
  return (
    <div className="flex flex-col align-middle justify-center items-center border w-[80%] my-8 gap-12">
      <div className="w-[100%]">
        <h1 className="text-yellow-400 text-4xl">Welcome back </h1>
      </div>
      <WorkoutFrequency />
      <BodyweightTracker />
    </div>
  );
}
