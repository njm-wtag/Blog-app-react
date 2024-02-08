import { useSelector } from "react-redux";

const useSearch = () => {
  const { query } = useSelector((state) => state.search);
  return {
    query,
  };
};

export default useSearch;
