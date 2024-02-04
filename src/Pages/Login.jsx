import AuthForm from "components/AuthForm/AuthForm";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loggedInUser } from "features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import Layout from "components/Layout/Layout";
import useAuth from "../hook/useAuth";

const Login = () => {
  const { success } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    dispatch(loggedInUser(values));
  };

  useEffect(() => {
    if (success) {
      navigate("/");
    }
  }, [success, navigate]);

  return (
    <Layout>
      <h1>Login</h1>

      <AuthForm handleSubmit={handleSubmit} />
    </Layout>
  );
};

export default Login;
