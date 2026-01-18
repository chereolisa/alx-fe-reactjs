import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Inter",
      }}
    >
      <ul
        style={{
          display: "flex",
          padding: "0",
          gap: "2rem",
          textDecoration: "none",
          alignItems: "center",
          listStyle: "none",
        }}
      >
        <li style={{ textDecoration: "none", listStyle: "none" }}>
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "#292929",
              fontFamily: "inherit",
            }}
          >
            <h2>Home</h2>
          </Link>
        </li>
        <li>
          <Link
            to="/about"
            style={{
              textDecoration: "none",
              color: "#292929",
              fontFamily: "inherit",
            }}
          >
            <h2>About</h2>
          </Link>
        </li>
        <li>
          <Link
            to="/contact"
            style={{
              textDecoration: "none",
              color: "#292929",
              fontFamily: "inherit",
            }}
          >
            <h2>Contact</h2>
          </Link>
        </li>
        <li>
          <Link
            to="/services"
            style={{
              textDecoration: "none",
              color: "#292929",
              fontFamily: "inherit",
            }}
          >
            <h2>Services</h2>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
