import React from 'react'
import Timetable from '../components/Timetable'
import Days from '../components/Days'
import '../assets/TimesPageStyle.scss'

function Times() {
  return (
    <div>
        <section className='form-section'>
          <h1>PlanAhead</h1>
          <Days />
        </section>
        
        <Timetable />
    </div>
  )
}

export default Times