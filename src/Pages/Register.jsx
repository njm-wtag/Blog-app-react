import { useState } from "react";
import AuthForm from "../components/AuthForm/AuthForm";

const Register = () => {
  const [responseMessage, setResponseMessage] = useState("");
  const handleSubmit = (values) => {
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = [...existingUsers, values];
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setResponseMessage("Successfully Registered!");
    window.location.href = "/login";
  };
  return (
    <>
      <h1>Register</h1>
      <AuthForm
        register
        handleSubmit={handleSubmit}
        responseMessage={responseMessage}
      />
    </>
  );
};

export default Register;
