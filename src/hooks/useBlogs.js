import { useSelector } from "react-redux";

const useBlogs = () => {
  const { blogs } = useSelector((state) => state.blogs);
  return blogs;
};

export default useBlogs;
