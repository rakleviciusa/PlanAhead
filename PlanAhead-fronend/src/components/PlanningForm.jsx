import React, { useState, useEffect } from 'react'

function PlanningForm() {

    const [date, setDate] = useState([])
    const [deadlineTime, setDeadlineTime] = useState()
    const [deadlineDate, setDeadlineDate] = useState('')
    const [freeDate, setFreeDate] = useState([])

    let totalTime = 0
    let totalBusyHours = 0
    let freeTime = 0

    const currentDate = new Date()
    const deadlineDateObject = new Date(deadlineDate) 

    function daysCounter(){
        const timeDiff = Math.abs(deadlineDateObject - currentDate);
        const leftDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

        return leftDays
    }

    function getTotalTime(){
        for (let i = 0; i < daysCounter(); i++) {
            totalTime += 24
        }
    }


    useEffect(() => {
        fetch("http://localhost:8080/api/allTimes")
          .then(res => res.json())
          .then(data => {
            setDate(data);
          });
      }, []);

        const findDate = (e) => {
            e.preventDefault();

            getTotalTime()

                date.forEach( date => {
                    date.date = new Date(date.date)
                })

                date.sort((a, b) => a.date - b.date)

                while (currentDate <= deadlineDateObject){

                    const matchingData = date.find(data => isSameDate(data.date, currentDate))

                    if (matchingData){
                        totalBusyHours += matchingData.busyHours
                    }

                    currentDate.setDate(currentDate.getDate() + 1);
                }

            console.log("total: " + totalTime);
            console.log("busy: " + totalBusyHours);
            console.log(deadlineTime);

            freeTime = totalTime - totalBusyHours

            if (freeTime >= deadlineTime){
                console.log("Good to go");
            } else {
                console.log("You're not making it");
            }

            const modifiedDate = date
                .filter(data => data.date <= deadlineDateObject)
                .map(data => {
                    return {
                        ...data, 
                        freeHours: 24 - data.busyHours
                    }
                })

            freeDate.forEach(data => {
                delete data.busyHours
            })

            setFreeDate(modifiedDate)

        };

        const isSameDate = (date1, date2) => 
            date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate();

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