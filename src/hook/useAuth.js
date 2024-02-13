import { useSelector } from "react-redux";

const useAuth = () => {
  const { authUser, success, error, errorMessage } = useSelector(
    (state) => state.auth
  );
  return {
    authUser,
    success,
    error,
    errorMessage,
  };
};

export default useAuth;
