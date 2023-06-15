
import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar";
import ErrorCmp from "./components/Error";
import ViewAppointments from "./components/ViewAppointments";
import Home from "./screens/Home";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="view" element={<ViewAppointments /> } />
        <Route path="*" element={<ErrorCmp /> } />
      </Routes>
    </>
  );
}

export default App;
