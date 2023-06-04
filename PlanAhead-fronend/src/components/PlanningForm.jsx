import React, { useState, useEffect } from "react";
import DeadlineDates from "./DeadlineDates";
import '../assets/BusyDays.scss'

function PlanningForm() {
  const [timetableDate, setTimetableDate] = useState([]);
  const [deadlineTime, setDeadlineTime] = useState();
  const [deadlineDate, setDeadlineDate] = useState("");
  const [freeDate, setFreeDate] = useState([]);
  const [isDeadlineViable, setIsDeadlineViable] = useState(false);
  const [isDeadlineSet, setIsDeadlineSet] = useState(false);

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

    while (currentDate <= deadlineDateObject) {
      const matchingData = timetableDate.find((data) =>
        isSameDate(data.date, currentDate)
      );

      if (matchingData) {
        totalBusyHours += matchingData.busyHours;
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }

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

    setIsDeadlineSet(true);
  };

  const isSameDate = (date1, date2) =>
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate();

  return (
    <div>
        
      <form onSubmit={findDate} className="form-section busy-form">
        <h1>PlanAhead</h1>
        <label htmlFor="deadline-time">
          Work est time (hours)
          <input
            type="number"
            name="deadlineTime"
            className="busy-form--input"
            min="0"
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
            className="busy-form--input"
            value={deadlineDate}
            onChange={(e) => setDeadlineDate(e.target.value)}
          />
        </label>
        <div>
          <button type="submit">Submit</button>
          <a href="/planning" className="busy-form--deadline--btn">
            Set Busy Dates
          </a>
        </div>
      </form>
      {isDeadlineSet &&
        (isDeadlineViable ? (
          <div>
            <p className="deadline-text">You will be in time! 🥳</p>
            <DeadlineDates
              totalHours={totalTime}
              totalBusyHours={totalBusyHours}
              days={freeDate}
              deadlineTime={deadlineTime}
            />
          </div>
        ) : (
          <div>
            <p className="deadline-text">You won't make it 😖</p>
          </div>
        ))}
      {!isDeadlineSet && <div className="deadline-text">Please Put Your Deadline Info</div>}
    </div>
  );
}

export default PlanningForm;
