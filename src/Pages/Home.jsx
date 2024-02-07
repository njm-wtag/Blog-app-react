import { useSelector } from "react-redux";
import Layout from "components/Layout/Layout";
import BlogList from "components/BlogList/BlogList";
import useBlogs from "hooks/useBlogs";

const Home = () => {
  const { blogs } = useBlogs();

  return (
    <Layout>
      <BlogList blogs={blogs} />
    </Layout>
  );
};

export default Home;
