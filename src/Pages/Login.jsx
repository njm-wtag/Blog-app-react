import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm/AuthForm";
import authenticateUser from "../utils/authUtils";
import { useState } from "react";

const Login = () => {
  const [responseMessage, setResponseMessage] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (values) => {
    const authUser = authenticateUser(values);

    if (authUser) {
      localStorage.setItem("authUser", JSON.stringify(authUser));
      navigate("/");
    } else {
      setResponseMessage("Invalid username or password.");
    }
  };

  return (
    <>
      <h1>Login</h1>

      <AuthForm handleSubmit={handleSubmit} responseMessage={responseMessage} />
    </>
  );
};

export default Login;
