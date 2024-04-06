import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Student from "./pages/Student";
import StudentLogin from "./pages/Login";
import Home from "./pages/Home";
export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/student" element={<Student />} />
          <Route path="/student/login" element={<StudentLogin />} />
          <Route exact path="/" element={<Home />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
