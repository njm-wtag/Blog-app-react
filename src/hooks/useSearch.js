import { useSelector } from "react-redux";

const useSearch = () => {
  const { homeQuery, profileQuery } = useSelector((state) => state.search);
  return {
    homeQUery,
    profileQuery,
  };
};

export default useSearch;
