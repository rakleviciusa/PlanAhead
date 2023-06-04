import React, { useState, useEffect } from "react";
import DeadlineDates from "./DeadlineDates";

function PlanningForm() {

  const [timetableDate, setTimetableDate] = useState([]);
  const [deadlineTime, setDeadlineTime] = useState();
  const [deadlineDate, setDeadlineDate] = useState("");
  const [freeDate, setFreeDate] = useState([]);
  const [isDeadlineViable, setIsDeadlineViable] = useState(false);
  const [isDeadlineSet, setIsDeadlineSet] = useState(false)

  let totalTime = 0;
  let totalBusyHours = 0;
  let freeTime = 0;

  const currentDate = new Date();
  const deadlineDateObject = new Date(deadlineDate);

  function daysCounter() {
    const timeDiff = Math.abs(deadlineDateObject - currentDate);
    const leftDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    return leftDays;
  }

  function getTotalTime() {
    for (let i = 0; i < daysCounter(); i++) {
      totalTime += 24;
    }
  }

  useEffect(() => {
    fetch("http://localhost:8080/api/allTimes")
      .then((res) => res.json())
      .then((data) => {
        setTimetableDate(data);
      });
  }, []);

  const findDate = (e) => {
    e.preventDefault();

    getTotalTime();

    timetableDate.forEach((date) => {
      date.date = new Date(date.date);
    });

    // timetableDate.sort((a, b) => a.date - b.date);

    while (currentDate <= deadlineDateObject) {
      const matchingData = timetableDate.find((data) =>
        isSameDate(data.date, currentDate)
      );

      if (matchingData) {
        totalBusyHours += matchingData.busyHours;
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }

    console.log("total: " + totalTime);
    console.log("busy: " + totalBusyHours);

    freeTime = totalTime - totalBusyHours;

    if (freeTime >= deadlineTime) {
      setIsDeadlineViable(true);
    } else {
      setIsDeadlineViable(false);
    }

    const modifiedDate = timetableDate
      .filter((data) => data.date <= deadlineDateObject)
      .map((data) => {
        return {
          ...data,
          freeHours: 24 - data.busyHours,
        };
      });

    setFreeDate(modifiedDate);

    setIsDeadlineSet(true)

  };

  console.log(freeDate);

  const isSameDate = (date1, date2) =>
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate();


  return (
    <div>
      <form onSubmit={findDate}>
        <label htmlFor="deadline-time">
          Work est time
          <input
            type="number"
            name="deadlineTime"
            value={deadlineTime}
            onChange={(e) => setDeadlineTime(e.target.value)}
            required
          />
        </label>

        <label htmlFor="deadline-date">
          Deadline date
          <input
            type="date"
            name="deadlineDate"
            value={deadlineDate}
            onChange={(e) => setDeadlineDate(e.target.value)}
          />
        </label>
        <button type="submit">submit</button>
      </form>
      {isDeadlineSet &&
        (isDeadlineViable ? (
          <div>
            <p>You will be in time! 🥳</p>
            <DeadlineDates totalHours={totalTime} totalBusyHours ={totalBusyHours} days ={freeDate} deadlineTime = {deadlineTime}/>
          </div>
        ) : (
          <div>
            <p>You won't make it 😖</p>
          </div>
        ))}
      {!isDeadlineSet && <div>Put Your Deadline info</div>}
            
    </div>
  );
}

export default PlanningForm;
