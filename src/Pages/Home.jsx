import { Link } from "react-router-dom";
import Layout from "components/Layout/Layout";
import { useSelector } from "react-redux";

const Home = () => {
  const { blogs } = useSelector((state) => state.blogs);
  console.log(blogs);
  return (
    <Layout>
      <h1> Home </h1>
      <Link to={`/me`}>Profile</Link>
    </Layout>
  );
};

export default Home;
