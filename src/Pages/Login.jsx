import AuthForm from "../components/AuthForm/AuthForm";

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
