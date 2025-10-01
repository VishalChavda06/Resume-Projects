import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Allroutes from "./Routes/Allroutes";

function App() {
  return (
    <Router>
      <Allroutes />
      <div className="p-6">
        <Routes>
          <Route path="/" element={<h2 className="text-2xl font-bold">Home Page</h2>} />
          <Route path="/about" element={<h2 className="text-2xl font-bold">About Page</h2>} />
          <Route path="/services" element={<h2 className="text-2xl font-bold">Services Page</h2>} />
          <Route path="/contact" element={<h2 className="text-2xl font-bold">Contact Page</h2>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
