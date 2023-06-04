import React, { useState } from "react";

function Days() {
  const [busyHours, setBusyHours] = useState();
  const [date, setDate] = useState("");

  const postTime = (e) => {
    e.preventDefault();

    const timetable = { date, busyHours };

    fetch("http://localhost:8080/api/addTime", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(timetable),
    })
      .then((res) => res.json())
      .then((data) => {
        window.location.reload(false);
      });
  };

  return (
    <div>
      <form onSubmit={postTime} className="busy-form">
        <label htmlFor="date">
          Date
          <input
            className="busy-form--input"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </label>

        <label htmlFor="busyHours">
          Busy Hours (Please include sleep time 🙂)
          <input
            className="busy-form--input"
            type="number"
            min="0"
            max="24"
            value={busyHours}
            onChange={(e) => setBusyHours(e.target.value)}
            required
            placeholder="0"
          />
        </label>

        <div>
          <button type="submit">Submit</button>
          <a href="/planning" className="busy-form--deadline--btn">
            Set Deadline
          </a>
        </div>
      </form>
    </div>
  );
}

export default Days;
