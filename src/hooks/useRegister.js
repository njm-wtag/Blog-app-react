import { useSelector } from "react-redux";

const useRegister = () => {
  const { users, success, error } = useSelector((state) => state.register);

  return {
    users,
    success,
    error,
  };
};

export default useRegister;
