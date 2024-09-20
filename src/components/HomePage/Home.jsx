import BodyweightTracker from "./BodyweightTracker/BodyweightTracker";
import WorkoutFrequency from "./WorkoutFrequency/WorkoutFrequency";

export default function Home() {
  return (
    <div className="flex flex-col align-middle justify-center items-center border w-[80%] mt-10 gap-12">
      <div className="w-[100%]">
        <h1 className="text-yellow-400 text-3xl">Welcome back Ibrahim</h1>
      </div>
      <WorkoutFrequency />
      <BodyweightTracker />
    </div>
  );
}
