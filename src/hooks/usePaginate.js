import { useSelector } from "react-redux";

const usePaginate = () => {
  const {
    blogsPerPageInHome,
    blogsPerPageInProfile,
    currentProfilePage,
    currentHomePage,
  } = useSelector((state) => state.pagination);

  return {
    blogsPerPageInHome,
    blogsPerPageInProfile,
    currentProfilePage,
    currentHomePage,
  };
};

export default usePaginate;
