import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TodoPage from "./pages/TodoPage";
import SignUp from "./pages/Signup";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-dark4">
        <Routes>
          <Route path="/" element={<TodoPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
