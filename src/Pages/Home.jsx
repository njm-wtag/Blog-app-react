import { useSelector } from "react-redux";
import BlogList from "../components/BlogList/BlogList";

const Home = () => {
  const { blogs } = useSelector((state) => state.blogs);
  return (
    <div>
      <BlogList blogs={blogs} />
    </div>
  );
};

export default Home;
