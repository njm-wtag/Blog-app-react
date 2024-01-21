import AuthForm from "../components/AuthForm/AuthForm";

const Register = () => {
  const handleSubmit = (values) => {
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = [...existingUsers, values];
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };
  return (
    <>
      <h1>Register</h1>
      <AuthForm register handleSubmit={handleSubmit} />
    </>
  );
};

export default Register;
