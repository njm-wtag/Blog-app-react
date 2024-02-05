const useLocalStorageAuth = () => {
  const getAuthUser = localStorage.getItem("authUser");
  const auth = JSON.parse(getAuthUser);
  if (getAuthUser !== undefined && auth?.username && auth?.password) {
    return true;
  }
  return false;
};

export default useLocalStorageAuth;
