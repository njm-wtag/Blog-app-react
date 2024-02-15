import { useSelector } from "react-redux";

const useSearch = () => {
  const { queryInHome, queryInProfile } = useSelector((state) => state.search);
  return {
    queryInHome,
    queryInProfile,
  };
};

export default useSearch;
