import { useEffect } from "react";
import { useDispatch } from "react-redux";
import AuthForm from "components/AuthForm/AuthForm";
import { useNavigate } from "react-router-dom";
import {
  registeredUser,
  resetRegisterState,
} from "../features/register/registerSlice";
import Layout from "../components/Layout/Layout";
import useRegister from "../hook/useRegister";
import { v4 as uuidv4 } from "uuid";

const Register = () => {
  const { success } = useRegister();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (user) => {
    user.id = uuidv4();
    user.joinedDate = new Date().toISOString();
    dispatch(registeredUser(user));
  };

  useEffect(() => {
    if (success) {
      dispatch(resetRegisterState());
      navigate("/login");
    }
  }, [success, navigate, dispatch]);

  return (
    <Layout>
      <h1>Register</h1>
      <AuthForm handleSubmit={handleSubmit} />
    </Layout>
  );
};

export default Register;
