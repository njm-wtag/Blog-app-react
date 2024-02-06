import { useSelector } from "react-redux";

const useBlogs = () => {
  const { blogs } = useSelector((state) => state.blogs);
  const reversedBlog = [...blogs].reverse();
  return reversedBlog;
};

export default useBlogs;
