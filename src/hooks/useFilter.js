import { useSelector } from "react-redux";

const useFilter = () => {
  const { filteredTagsInHome, filteredTagsInProfile } = useSelector(
    (state) => state.filter
  );
  return {
    filteredTagsInHome,
    filteredTagsInProfile,
  };
};

export default useFilter;
