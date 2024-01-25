import { useParams } from "react-router-dom";
import AddBlogForm from "../components/AddBlogForm/AddBlogForm";
import { useSelector } from "react-redux";
const EditBlog = () => {
  const { blogId } = useParams();
  const { blogs } = useSelector((state) => state.blogs);
  const blogDetails = blogs.find((blog) => blog.id == blogId);

  return (
    <div>
      <AddBlogForm blogDetails={blogDetails} />
    </div>
  );
};

export default EditBlog;
