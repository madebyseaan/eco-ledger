import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import StudentDashboard from "./pages/StudentDashboard";
import FacultyPortal from "./pages/FacultyPortal";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<StudentDashboard />} />
        <Route path="/faculty-portal" element={<FacultyPortal />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
