import React, { useState, useEffect } from 'react'

function PlanningForm() {

    const [date, setDate] = useState([])
    const [deadlineTime, setDeadlineTime] = useState()
    const [deadlineDate, setDeadlineDate] = useState('')

    useEffect(() => {
        fetch("http://localhost:8080/api/allTimes")
          .then(res => res.json())
          .then(data => {
            setDate(data);
          });
      }, []);

        const findDate = (e) => {
            e.preventDefault();
        
            const foundDate = date.find((item) => item.date === deadlineDate);

            if (foundDate) {
                console.log('Date found:', foundDate.date);
            } else {
                console.log('Date not found');
            }
        };

  return (
    <div>
        <form onSubmit={findDate}>
            <label htmlFor="deadline-time">Work est time
                <input type="number" name='deadlineTime' value={deadlineTime} onChange={e => setDeadlineTime(e.target.value)}/>
            </label>

            <label htmlFor="deadline-date">Deadline date
                <input type="date" name='deadlineDate' value={deadlineDate} onChange={e => setDeadlineDate(e.target.value)} />
            </label>
            <button type='submit'>submit</button>
        </form>
        <p>Free hours: </p>
    </div>
  )
}

export default PlanningForm