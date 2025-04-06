import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-dark3 text-white p-4 flex justify-between items-center shadow-md">
      <Link to="/" className="text-xl font-bold">ToDo App</Link>
      <div className="space-x-4">
        {isLoggedIn ? (
          <>
            <Link to="/todos" className="hover:underline">My Todos</Link>
            <button
              onClick={handleLogout}
              className="bg-accent hover:bg-accent2 px-4 py-2 rounded-md transition-all"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/signup" className="hover:underline">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
