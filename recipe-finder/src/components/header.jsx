import banner from "../assets/banner.jpg";
import chef from "../assets/chef.png";

const Header = () => {
  return (
    <header>
      <div className="banner">
        <div className="bannerText">
          <p>Trending now</p>
          <h1>Mike’s famous salad with cheese</h1>
          <p className="author">By John Mike</p>
        </div>
        <img src={banner} alt="" />
      </div>
      <div className="AIchef">
        <img src={chef} alt="kjk" />
        <h1>Chef AI</h1>
      </div>
    </header>
  );
};
export default Header;
