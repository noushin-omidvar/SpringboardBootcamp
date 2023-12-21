import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";
import { FaShoppingCart } from "react-icons/fa"; // Import the shopping cart icon from React Icons

const ACTIVE_STYLES = {
  fontWeight: "bold",
  backgroundColor: "white",
  color: "black",
};

const NavBar = ({ cartItemCount }) => {
  return (
    <nav className="MyNavBarClass">
      <NavLink className="MyNavLink" exact to="/" activeStyle={ACTIVE_STYLES}>
        Home
      </NavLink>
      <NavLink
        className="MyNavLink"
        exact
        to="/cart"
        activeStyle={ACTIVE_STYLES}
      >
        Cart <FaShoppingCart /> {/* Shopping cart icon */}
        {cartItemCount > 0 && ( // Display count if cart has items
          <span className="cart-count">{cartItemCount}</span>
        )}
      </NavLink>
    </nav>
  );
};

export default NavBar;
