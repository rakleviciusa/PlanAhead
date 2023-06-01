import Times from './pages/Times'
import Planning from './pages/Planning';
import {Routes, Route } from "react-router-dom";
import './App.css'

function App() {

  return (
    <>
      <h1>PlanAhead</h1>
      <Routes>
          <Route path='/' element={<Times />}/>
          <Route path='/planning' element={<Planning />}/>
      </Routes>
    </>
  )
}

export default App
