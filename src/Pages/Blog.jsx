import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import BlogDetails from "../components/BlogDetails/BlogDetails";

const Blog = () => {
  const { blogId } = useParams();
  const { blogs } = useSelector((state) => state.blogs);
  const blogDetails = blogs.find((blog) => blog.id == blogId);
  return <BlogDetails blogDetails={blogDetails} />;
};

export default Blog;
