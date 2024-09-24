export default function WorkoutFrequency() {
  const days = ["M", "T", "W", "T", "F", "S", "S"];

  return (
    <div className="flex flex-col w-full bg-bg-secondary rounded-md cursor-pointer py-2">
      <div className="w-full flex p-1">
        <h1 className="pl-4">Workout Frequency</h1>
      </div>
      <div className="flex justify-evenly p-2 gap-2">
        {days.map((day, i) => {
          return (
            <div
              key={i}
              className="w-8 h-7 rounded-full border cursor-pointer transition transform hover:scale-105 bg-text-color text-black"
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
}
