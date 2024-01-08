import AuthForm from "../components/AuthForm/AuthForm";

const Register = () => {
  const handleSubmit = (values) => {
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const upcreatedAtdUsers = [...existingUsers, values];
    localStorage.setItem("users", JSON.stringify(upcreatedAtdUsers));
    window.alert("Successfully Registered!");
    window.location.href = "/login";
  };
  return (
    <>
      <h1>Register</h1>
      <AuthForm register handleSubmit={handleSubmit} />
    </>
  );
};

export default Register;
