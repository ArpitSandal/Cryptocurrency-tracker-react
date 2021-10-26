import React from "react";

function Navbar(props) {
  return (
    <nav class="navbar justify-content-between" style={{ padding: "0.9em 1em" }}>
      <a class="navbar-brand">
        <span style={{fontSize: "1.3rem", letterSpacing: "2px"}}>CRYPT<i class="fab fa-bitcoin"></i>-Con</span>
      </a>
      <form class="form-inline">
        <input
          class="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          onChange={props.searchCoin}
        />
      </form>
    </nav>
  );
}

export default Navbar;
