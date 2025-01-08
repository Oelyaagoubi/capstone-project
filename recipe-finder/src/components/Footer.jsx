import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="footer-logo">
          <img src={logo} alt="" />
          <p>
            Cookpal is a recipe website with a wide variety of delicious
            recipes, easy-to-use search function. Join our community and let's
            cook together!
          </p>
        </div>

        <p>
          &copy; {new Date().getFullYear()}{" "}
          <span style={{ color: "green", fontWeight: "bold" }}>
            Recipe Finder
          </span>
          . All rights reserved.
        </p>
      </footer>
    </>
  );
};

export default Footer;
