import { useSelector } from "react-redux";

const useSearch = () => {
  const { homeQUery, profileQuery } = useSelector((state) => state.search);
  return {
    homeQUery,
    profileQuery,
  };
};

export default useSearch;
