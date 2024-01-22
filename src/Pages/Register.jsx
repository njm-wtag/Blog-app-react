import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AuthForm from "../components/AuthForm/AuthForm";
import { useNavigate } from "react-router-dom";
import {
  registeredUser,
  resetRegisterState,
} from "../rtk/features/register/registerSlice";

const Register = () => {
  const { success, error } = useSelector((state) => state.register);

  const [responseMessage, setResponseMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    dispatch(registeredUser(values));
  };

  useEffect(() => {
    if (success) {
      dispatch(resetRegisterState());
      navigate("/login");
    }

    if (error) setResponseMessage(error);
  }, [success, error, navigate, dispatch]);

  return (
    <>
      <h1>Register</h1>
      <AuthForm handleSubmit={handleSubmit} responseMessage={responseMessage} />
    </>
  );
};

export default Register;
