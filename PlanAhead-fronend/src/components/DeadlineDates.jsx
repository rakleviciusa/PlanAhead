import React from "react";

function DeadlineDates(props) {
  const freeHours = props.totalHours - props.totalBusyHours;

  let daysWithWork = props.days.map((day) => ({
    ...day,
    workHours: null,
  }));

  let hoursLeftToAssign = props.deadlineTime;

  while (true) {
    const daysWithoutWork = daysWithWork.filter(
      (day) => day.workHours === null
    );

    const averageHours = hoursLeftToAssign / daysWithoutWork.length;

    const doAllDaysHaveAverageTime = daysWithoutWork.every(
      (day) => day.freeHours >= averageHours
    );

    if (doAllDaysHaveAverageTime) {
      daysWithoutWork.forEach((day) => {
        day.workHours = averageHours;
      });
      break;
    }

    daysWithoutWork.forEach((day) => {
      if (day.freeHours <= averageHours) {
        day.workHours = day.freeHours;
        hoursLeftToAssign -= day.workHours;
      }
    });
  }

  daysWithWork = daysWithWork.map((day) => ({
    ...day,
    workMinutes: day.workHours * 60,
  }));

  daysWithWork = daysWithWork.map((day) => ({
    ...day,
    workHours: Math.round(day.workHours * 100) / 100,
  }));

  return (
    <div className="timetable-content">
      {daysWithWork.map((date) => (
        <div key={date.date} className="timetable-content--times">
          <p>Date: {date.date.toISOString().split("T")[0]}</p>
          <p>Work Minutes: {date.workMinutes}</p>
          <p>Work Hours: {date.workHours}</p>
        </div>
      ))}
    </div>
  );
}

export default DeadlineDates;
