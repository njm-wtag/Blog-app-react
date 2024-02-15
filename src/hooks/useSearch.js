import { useSelector } from "react-redux";

const useSearch = () => {
  const { query, filteredTags } = useSelector((state) => state.search);
  return {
    query,
    filteredTags,
  };
};

export default useSearch;
