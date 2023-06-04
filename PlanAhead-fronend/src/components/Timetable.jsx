import React, { useState, useEffect } from 'react';

function Timetable() {
  const [allTimes, setAllTimes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/allTimes")
      .then(res => res.json())
      .then(data => {
        setAllTimes(data);
        console.log(data);
      });
  }, []);

  return (
    <main className='timetable'>
      <h1>Timetable</h1>
      <div className='timetable-content'>
        {allTimes.map(timetable => (
            <div className='timetable-content--times'>
                <p key={timetable.id}><span className='text-bold'>Date: </span>{timetable.date}</p>
                <p key={timetable.id}><span className='text-bold'>Busy Hours: </span>{timetable.busyHours}</p>
            </div>
        ))}
      </div>
    </main>
  );
}

export default Timetable;