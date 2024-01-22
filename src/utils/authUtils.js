const authenticateUser = (values) => {
  const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

  const authUser = existingUsers.find(
    (user) =>
      user.username === values.username && user.password === values.password
  );
  if (authUser !== undefined) return authUser;
};

export default authenticateUser;
