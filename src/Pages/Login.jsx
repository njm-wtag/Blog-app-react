import AuthForm from "../components/AuthForm/AuthForm";
import authenticateUser from "../utils/authUtils";

const Login = () => {
  const handleSubmit = (values) => {
    const authUser = authenticateUser(values);

    if (authUser) {
      localStorage.setItem("authUser", JSON.stringify(authUser));
      window.alert("Login successful!");
      window.location.href = "/home";
    } else {
      window.alert("Invalid username or password.");
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
