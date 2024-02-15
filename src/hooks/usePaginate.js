import { useSelector } from "react-redux";

const usePaginate = () => {
  const { blogsPerPageInHome, blogsPerPageInProfile } = useSelector(
    (state) => state.pagination
  );

  return {
    blogsPerPageInHome,
    blogsPerPageInProfile,
  };
};

export default usePaginate;
