import React, { useState, useEffect } from 'react';

function Timetable() {
  const [allTimes, setAllTimes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/allTimes")
      .then(res => res.json())
      .then(data => {
        setAllTimes(data);
        console.log(data.date);
      });
  }, []);

  return (
    <div>
      <h1>Timetable</h1>
      <div>
        {allTimes.map(timetable => (
            <div>
                <p key={timetable.id}>Date: {timetable.date}</p>
                <p key={timetable.id}>Busy Hours: {timetable.busyHours}</p>
            </div>
        ))}
      </div>
    </div>
  );
}

export default Timetable;