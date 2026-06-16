import { Link } from "react-router-dom";
import "../css/nav.css";

function Navbar() {
  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo">RealEstate</div>

      {/* Links */}
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/Properties">Properties</Link>
        <Link to="/About">About</Link>
        <Link to="/Contact">Contact</Link>
        <Link to = "/AddProperties">Add Property</Link>
      </div>

      {/* Search */}
      <div className="nav-search">
        <input type="text" placeholder="Search properties..." />
      </div>
    </nav>
  );
}

export default Navbar;