import "./HomeBanner.scss";
const HomeBanner = () => {
  return (
    <div className="home-banner">
      <div className="home-banner__background-image"></div>
      <h2 className="home-banner__blog-title">Your Blog Title</h2>
      <div className="home-banner__card">
        <h2 className="home-banner__card_blog-title">Your Blog Title</h2>
        <p className="home-banner__card_category-name">Category Name</p>
      </div>
    </div>
  );
};

export default HomeBanner;
