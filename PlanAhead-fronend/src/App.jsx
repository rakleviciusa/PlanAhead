import { useState } from 'react'
import BusyDays from './components/BusyDays'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>PlanAhead</h1>
      <BusyDays />
    </>
  )
}

export default App
