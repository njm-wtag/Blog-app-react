import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import useRegister from "hooks/useRegister";
import AuthForm from "components/AuthForm";
import {
  registeredUser,
  resetRegisterState,
} from "features/register/registerSlice";
import Layout from "components/Layout";

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
