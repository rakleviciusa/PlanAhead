import React, { useState } from 'react'

function Days() {

    const [busyHours, setBusyHours] = useState()
    const [date, setDate] = useState("")

    const postTime = (e) => {
        e.preventDefault()

        const timetable = {date, busyHours}

        fetch("http://localhost:8080/api/addTime", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(timetable)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                window.location.reload(false);
            })
    }

  return (
    <div>
        <form onSubmit={postTime}>
            <label htmlFor="date">
                Date
                <input type="date" value={date} onChange={e => setDate(e.target.value)}/>
            </label>
            
            <label htmlFor="busyHours">
                Busy Hours (Please include sleep time:))
                <input type="number" value={busyHours} onChange={e => setBusyHours(e.target.value)}/>
            </label>

            <button type='submit'>Submit</button>
        </form>
    </div>
  )
}

export default Days