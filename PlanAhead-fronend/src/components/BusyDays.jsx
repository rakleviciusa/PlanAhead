import React, { useState } from 'react'

function BusyDays() {

    const [dateValue, setDateValue] = useState('')
    const [busyHours, setBusyHours] = useState()

    const postTime = (e) => {
        e.preventDefault()

        const timetable = {dateValue, busyHours}

        fetch("http://localhost:8080/api/addTime", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(timetable)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })

        console.log(dateValue);
    }
    


  return (
    <div>
        <form onSubmit={postTime}>
            <label htmlFor="date">
                Date
                <input type="date" value={dateValue} onChange={e => setDateValue(e.target.value)}/>
            </label>
            
            <label htmlFor="busyHours">
                Busy Hours
                <input type="number" value={busyHours} onChange={e => setBusyHours(e.target.value)}/>
            </label>

            <button type='submit'>Submit</button>
        </form>
    </div>
  )
}

export default BusyDays