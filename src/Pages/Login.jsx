import AuthForm from "../components/AuthForm/AuthForm";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLoggedIn } from "../rtk/features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [responseMessage, setResponseMessage] = useState("");

  const { success, error } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (values) => {
    dispatch(userLoggedIn(values));
  };

  useEffect(() => {
    if (success) {
      navigate("/");
    }
    if (error) setResponseMessage("Invalid username or password.");
  }, [success, error, navigate, setResponseMessage]);

  return (
    <>
      <h1>Login</h1>

      <AuthForm handleSubmit={handleSubmit} responseMessage={responseMessage} />
    </>
  );
};

export default Login;
