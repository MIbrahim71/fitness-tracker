import { useEffect } from "react";
import { useState } from "react";
import { getCheckIns, handleCheckIn } from "../../services/checkIn";

export default function FrequencyWidget() {
  const [days, setDays] = useState([]);
  const [checkedInDays, setCheckedInDays] = useState({});

  useEffect(() => {
    const getLast5days = () => {
      const daysArray = [];

      for (let i = 4; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        daysArray.push({
          date: date.toISOString().split("T")[0],
          day:
            i === 0
              ? "Today"
              : date.toLocaleString("en-UK", { weekday: "narrow" }),
        });
      }
      setDays(daysArray);
    };

    const loadCheckIns = async () => {
      const recentCheckIns = await getCheckIns();
      const checkedDays = recentCheckIns.reduce((acc, checkIn) => {
        acc[checkIn.date] = checkIn.checkedIn;
        return acc;
      }, {});
      setCheckedInDays(checkedDays);
    };

    getLast5days();
    loadCheckIns();
  }, []);

  const handleClick = async (date) => {
    // Update the local state
    setCheckedInDays((prev) => ({
      ...prev,
      [date]: !prev[date],
    }));

    await handleCheckIn(date);
  };

  return (
    <div className="flex flex-col w-full bg-bg-secondary rounded-md cursor-pointer gap-2 py-2">
      <div className="w-full flex p-1">
        <h1 className="pl-4 text-xl sm:text-lg md:text-2xl lg:text-3xl ">
          Workout Frequency
        </h1>
      </div>
      <div className="flex justify-evenly gap-3 my-1">
        {days.map((day) => {
          return (
            <div
              key={day.date}
              className={`w-10 h-8 sm:w-8 sm:h-8 md:w-10 md:h-10 px-6 rounded-md flex justify-center items-center border border-transparent cursor-pointer transition transform hover:scale-105 text-black tracking-wide ${
                checkedInDays[day.date]
                  ? "bg-header-color text-text-color"
                  : "bg-text-color"
              }`}
              onClick={() => handleClick(day.date)}
            >
              {day.day}
            </div>
          );
        })}
      </div>
    </div>
  );
}
