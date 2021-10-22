import React, { Component } from "react";
import "./App.css";
import Coins from "./components/Coins";
import Pagination from "./components/Pagination";

class App extends Component {
  constructor() {
    super();

    this.state = {
      coins_data: [],
      current_page: 1,
      total_pages: 0,
      coins_per_page: 15,
      coin_search: "",
    };

    // The functions that are changing states
    this.setCurrentPage = this.setCurrentPage.bind(this);
    this.searchCoin = this.searchCoin.bind(this);
    this.gotoPage = this.gotoPage.bind(this);
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

  searchCoin(event) {
    this.setState({ coin_search: event.target.value });
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
    } 
    
    else {
      let cnt = 0;
      coin_arr = this.state.coins_data.map((val, inx) => {
        // Matching the entered value with coins
        if (val.name.toLowerCase().startsWith(coin_search.toLowerCase())) {
          cnt++;
          return <Coins coin_prop={val} key={inx} />;
        }
      });

      pagination_disable = true;  // disabling the next, prev and goto
      total_coins = cnt;  // total search results
    }

    // console.log(coin_search.length);

    return (
      <div>
        {/* To Search Coins (goto) */}
        <form>
          <input
            type="text"
            placeholder="Search"
            onChange={this.searchCoin}
          ></input>
        </form>

        {/* Coins being rendered */}
        {coin_arr}

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
