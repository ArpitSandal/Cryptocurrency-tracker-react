import React from "react";

function Navbar(props) {
  return (
    <nav className="navbar justify-content-between" style={{ padding: "0.9em 1.1em" }}>
      <a className="navbar-brand" href="https://arpitsandal.github.io/Cryptocurrency-tracker-react/">
        <span style={{letterSpacing: "2px"}}>CRYPT<i className="fab fa-bitcoin"></i>-Con</span>
      </a>
      <form className="form-inline">
        <input
          className="form-control"
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
