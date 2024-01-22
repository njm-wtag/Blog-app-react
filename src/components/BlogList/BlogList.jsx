import { mockBlogs } from "../../data/mockData";
import BlogCard from "../BlogCard/BlogCard";
import "./BlogList.scss";

const BlogList = () => {
  return (
    <div className="blog-list">
      {mockBlogs.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogList;
