import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loggedInUser } from "features/auth/authSlice";
import AuthForm from "components/AuthForm";
import Layout from "components/Layout";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    dispatch(loggedInUser({ user: values, navigate: navigate }));
  };

  return (
    <Layout data-testid="login-component">
      <h1>Login</h1>

      <AuthForm handleSubmit={handleSubmit} />
    </Layout>
  );
};

export default Login;
