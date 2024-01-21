import AuthForm from "../components/AuthForm/AuthForm";
import authenticateUser from "../utils/authUtils";

const Login = () => {
  const handleSubmit = (values) => {
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

    console.log({ existingUsers });

    const authUser = existingUsers.find(
      (user) =>
        user.username === values.username && user.password === values.password
    );

    if (authUser) {
      localStorage.setItem("authUser", JSON.stringify(authUser));
    }
  };

  return (
    <>
      <h1>Login</h1>

      <AuthForm handleSubmit={handleSubmit} />
    </>
  );
};

export default Login;
