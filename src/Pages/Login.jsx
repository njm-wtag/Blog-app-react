import AuthForm from "../components/AuthForm/AuthForm";
import { useEffect, React } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loggedInUser } from "../rtk/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";

const Login = () => {
  const { success } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (values) => {
    dispatch(loggedInUser(values));
  };

  useEffect(() => {
    if (success) {
      navigate("/");
    }
  }, [success]);

  return (
    <Layout>
      <h1>Login</h1>

      <AuthForm handleSubmit={handleSubmit} />
    </Layout>
  );
};

export default Login;
