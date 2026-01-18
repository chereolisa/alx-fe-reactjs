import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [hover, setHover] = useState(false);
  const [hover1, setHover1] = useState(false);
  const [hover2, setHover2] = useState(false);
  const [hover3, setHover3] = useState(false);

  const divStyle = {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Inter",
  };
  const ulStyle = {
    display: "flex",
    padding: "0",
    gap: "2rem",
    textDecoration: "none",
    alignItems: "center",
    listStyle: "none",
  };
  const liStyle = {
    textDecoration: "none",
    listStyle: "none",
    backgroundColor: hover ? "#000" : "#fff",
    color: hover ? "#fff" : "#000",
    borderRadius: "10px",
    padding: "0.5rem 1rem",
  };
  const liStyle1 = {
    textDecoration: "none",
    listStyle: "none",
    backgroundColor: hover1 ? "#000" : "#fff",
    color: hover ? "#fff" : "#000",
    borderRadius: "10px",
    padding: "0.5rem 1rem",
  };
  const liStyle2 = {
    textDecoration: "none",
    listStyle: "none",
    backgroundColor: hover2 ? "#000" : "#fff",
    color: hover ? "#fff" : "#000",
    borderRadius: "10px",
    padding: "0.5rem 1rem",
  };
  const liStyle3 = {
    textDecoration: "none",
    listStyle: "none",
    backgroundColor: hover3 ? "#000" : "#fff",
    color: hover ? "#fff" : "#000",
    borderRadius: "10px",
    padding: "0.5rem 1rem",
  };
  const linkStyle = {
    textDecoration: "none",
    linkStyle: "none",

    fontFamily: "inherit",
  };
  const h2Style = {
    margin: "0",
  };

  return (
    <div style={divStyle}>
      <ul style={ulStyle}>
        <li style={liStyle}>
          <Link
            to="/"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={linkStyle}
          >
            <h2 style={h2Style}>Home</h2>
          </Link>
        </li>
        <li style={liStyle1}>
          <Link
            to="/about"
            onMouseEnter={() => setHover1(true)}
            onMouseLeave={() => setHover1(false)}
            style={linkStyle}
          >
            <h2 style={h2Style}>About</h2>
          </Link>
        </li>
        <li style={liStyle2}>
          <Link
            to="/contact"
            onMouseEnter={() => setHover2(true)}
            onMouseLeave={() => setHover2(false)}
            style={linkStyle}
          >
            <h2 style={h2Style}>Contact</h2>
          </Link>
        </li>
        <li style={liStyle3}>
          <Link
            to="/services"
            onMouseEnter={() => setHover3(true)}
            onMouseLeave={() => setHover3(false)}
            style={linkStyle}
          >
            <h2 style={h2Style}>Services</h2>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
