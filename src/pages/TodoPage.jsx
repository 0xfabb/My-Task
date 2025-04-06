import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Body from "../Components/Body";
import Navbar from "../Components/Navbar";

const TodoPage = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn]);

  return (
    <div>
      <Navbar />
      <Body />
    </div>
  );
};

export default TodoPage;
