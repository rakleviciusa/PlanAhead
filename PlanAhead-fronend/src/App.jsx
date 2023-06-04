import Times from "./pages/Times";
import Planning from "./pages/Planning";
import { Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Times />} />
        <Route path="/planning" element={<Planning />} />
      </Routes>
    </div>
  );
}

export default App;
