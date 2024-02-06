import { mockBlogs } from "../../data/mockData";
import { getCategoryById } from "utils/helperData";
import "./HomeBanner.scss";

const HomeBanner = () => {
  const authUser = JSON.parse(localStorage.getItem("authUser"));
  const category = getCategoryById(mockBlogs[1].categoryId);
  return (
    <div className="home-banner">
      <div className="home-banner__background-image"></div>
      {authUser ? (
        <h2 className="home-banner__blog-title">{mockBlogs[1].title}</h2>
      ) : (
        <div className="home-banner__card">
          <h2 className="home-banner__card_blog-title">{mockBlogs[1].title}</h2>
          <p className="home-banner__card_category-name">{category.name}</p>
        </div>
      )}
    </div>
  );
};

export default HomeBanner;
