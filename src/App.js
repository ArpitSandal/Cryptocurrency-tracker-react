import React, { Component } from "react";
import "./App.css";
import "./font-awesome/css/all.css";
import "./assets/Loader.css";
import Coins from "./components/Coins";
import Pagination from "./components/Pagination";
import Navbar from "./components/Navbar";

class App extends Component {
  constructor() {
    super();

    this.state = {
      coins_data: [],
      current_page: 1,
      total_pages: 0,
      coins_per_page: 15,
      coin_search: "",
      is_sorted_alpha: 1,
      is_sorted_price: 0,
    };

    // The functions that are changing states
    this.setCurrentPage = this.setCurrentPage.bind(this);
    this.searchCoin = this.searchCoin.bind(this);
    this.gotoPage = this.gotoPage.bind(this);
    this.sortAccTo = this.sortAccTo.bind(this);
  }

  // Fetching the data from the api
  componentDidMount() {
    fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=market_cap_desc&per_page=250&page=1&sparkline=false"
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          coins_data: data,
          total_pages: Math.ceil(data.length / this.state.coins_per_page),
        });
      });
  }

  // Previous and Next page button
  setCurrentPage(page_no) {
    if (page_no <= 0) page_no = 1;
    if (page_no > this.state.total_pages) page_no = this.state.total_pages;
    this.setState({ current_page: page_no });
  }

  // Goto page
  gotoPage(event) {
    let page_no = parseInt(event.target.value);

    if (isNaN(page_no) || page_no <= 0 || page_no > this.state.total_pages) {
      event.target.value = "";
      this.setState({ current_page: 1 });
      return;
    }
    this.setState({ current_page: page_no });
  }

  // Searching the coin in search bar
  searchCoin(event) {
    this.setState({ coin_search: event.target.value });
    console.log("jai mata di");
  }

  // Sorting the coins acc. to alphabetical order or price
  sortAccTo(val) {
    let arr = this.state.coins_data;
    let alpha = this.state.is_sorted_alpha;
    let price = this.state.is_sorted_price;
    if (val === "alpha") {
      if (alpha) {
        arr.sort((a, b) => {
          return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
        });
      } else {
        arr.sort((b, a) => {
          return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
        });
      }
      this.setState({
        coins_data: arr,
        is_sorted_alpha: alpha ^ 1,
        current_page: 1,
      });
    } else {
      if (price) {
        arr.sort((a, b) => {
          return a.current_price - b.current_price;
        });
      } else {
        arr.sort((b, a) => {
          return a.current_price - b.current_price;
        });
      }
      this.setState({
        coins_data: arr,
        is_sorted_price: price ^ 1,
        current_page: 1,
      });
    }
  }

  render() {
    let coins_per_page = this.state.coins_per_page;
    let current_page = this.state.current_page;
    let total_coins = this.state.coins_data.length;
    let last_coin = Math.min(coins_per_page * current_page, total_coins);
    let coin_search = this.state.coin_search;

    let coin_arr = [];
    let pagination_disable = false;

    // If the search bar is empty
    if (coin_search.length === 0) {
      let arr = this.state.coins_data.slice(
        last_coin - coins_per_page,
        last_coin
      );
      coin_arr = arr.map((val, inx) => {
        return <Coins coin_prop={val} key={inx} />;
      });
    } else {
      let cnt = 0;
      coin_arr = this.state.coins_data.map((val, inx) => {
        // Matching the entered value with coins
        if (val.name.toLowerCase().startsWith(coin_search.toLowerCase())) {
          cnt++;
          return <Coins coin_prop={val} key={inx} />;
        }
        return <></>;
      });

      pagination_disable = true; // disabling the next, prev and goto
      total_coins = cnt; // total search results
    }

    // if the data is not received yet
    if (this.state.coins_data.length === 0) {
      return (
        <div
          className="loader-container"
          style={{ backgroundColor: "rgb(56, 97, 251)" }}
        >
          <div className="pong-loader"></div>
        </div>
      );
    }

    return (
      <div>
        {/* To Search Coins */}
        <Navbar searchCoin={this.searchCoin} key="appy" />

        {/* Coins being rendered */}
        <div className="coin-container">
          <div className="inner-coin-container">
            <div
              className="coin"
              style={{
                border: "0px",
                borderBottom: "2px solid rgb(231, 228, 228)",
                fontWeight: "bold",
              }}
            >
              <div className="c-category">
                <span
                  className="sort-button"
                  onClick={() => this.sortAccTo("alpha")}
                >
                  <span>Coin</span> <i className="fas fa-sort"></i>
                </span>
              </div>

              <div className="categories">
                <p>
                  <span
                    className="sort-button"
                    onClick={() => this.sortAccTo("price")}
                  >
                    <span>Price</span> <i className="fas fa-sort"></i>
                  </span>
                </p>
                <p>24h Max.</p>
                <p>24h Min.</p>
                <p>Price Chg.</p>
                <p>Mkt. Cap</p>
              </div>
            </div>

            {coin_arr}
          </div>
        </div>

        {/* Going to different pages */}
        <Pagination
          setCurrentPage={this.setCurrentPage}
          total_pages={this.state.total_pages}
          current_page={this.state.current_page}
          gotoPage={this.gotoPage}
          pagination_disable={pagination_disable}
          total_coins={total_coins}
        />
      </div>
    );
  }
}

export default App;
