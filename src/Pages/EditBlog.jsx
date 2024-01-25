import { useParams } from "react-router-dom";
import AddBlogForm from "../components/AddBlogForm/AddBlogForm";
const EditBlog = () => {
  const { blogId } = useParams();
  console.log(blogId);
  return (
    <div>
      <AddBlogForm />
    </div>
  );
};

export default EditBlog;
