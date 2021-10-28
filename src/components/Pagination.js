import React from "react";

function Pagination(props) {
  let current_page = props.current_page;
  let total_pages = props.total_pages;

  if (props.pagination_disable)
    return (
      <div className="total-search-results">
        <p>
          <span style={{ color: "gray" }}>Total results:-</span>{" "}
          {props.total_coins}
        </p>
      </div>
    );

  return (
    <div className="pagination-container">
      <ul className="pagination">
        <li
          className="page-item page-link"
          onClick={() => {
            props.setCurrentPage(current_page - 1);
          }}
        >
          {"<"} Prev
        </li>
        <li
          className="page-item page-link"
          onClick={() => {
            props.setCurrentPage(current_page + 1);
          }}
        >
          Next {">"}
        </li>
      </ul>
      <input
        className="form-control"
        id="goto"
        type="number"
        placeholder={"1/" + total_pages}
        onChange={props.gotoPage}
      ></input>
    </div>
  );
}

export default Pagination;
