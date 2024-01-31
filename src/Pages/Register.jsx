import { useEffect, React } from "react";
import { useDispatch, useSelector } from "react-redux";
import AuthForm from "../components/AuthForm/AuthForm";
import { useNavigate } from "react-router-dom";
import {
  registeredUser,
  resetRegisterState,
} from "../rtk/features/register/registerSlice";
import Layout from "../components/Layout/Layout";

const Register = () => {
  const { success } = useSelector((state) => state.register);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (user) => {
    console.log(user);
    user.id = Date.now();
    dispatch(registeredUser(user));
  };

  useEffect(() => {
    if (success) {
      dispatch(resetRegisterState());
      navigate("/login");
    }
  }, [success, dispatch]);

  return (
    <Layout>
      <h1>Register</h1>
      <AuthForm handleSubmit={handleSubmit} />
    </Layout>
  );
};

export default Register;
