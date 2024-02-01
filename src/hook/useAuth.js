import { useSelector } from "react-redux";

const useAuth = () => {
  const { authUser, success, error } = useSelector((state) => state.auth);

  return {
    authUser,
    success,
    error,
  };
};

export default useAuth;
