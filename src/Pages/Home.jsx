import { useSelector } from "react-redux";
import HomeBanner from "../components/HomeBanner/HomeBanner";
import BlogList from "../components/BlogList/BlogList";

const Home = () => {
  const { authUser } = useSelector((state) => state.auth);
  const { blogs } = useSelector((state) => state.blogs);
  return (
    <div>
      <HomeBanner blogs={blogs} />
      <BlogList blogs={blogs} authUser={authUser} />
    </div>
  );
};

export default Home;
