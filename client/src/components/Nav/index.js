import React from "react";
import "./index.css"

const Nav = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light ">
      <a className="navbar-brand text-warning" href="/">
ShiftMeets      </a>
      {/* Display this if the current state is loading */}
      {/* <a className="navbar-brand ml-auto">
          Loading...
        </a> */}
    </nav>
  );
};

export default Nav;
