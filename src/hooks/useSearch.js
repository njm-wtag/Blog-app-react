import { useSelector } from "react-redux";

const useSearch = () => {
  const { queryInHome, queryInProfile, filteredTags } = useSelector(
    (state) => state.search
  );
  return {
    queryInHome,
    queryInProfile,
    filteredTags,
  };
};

export default useSearch;
