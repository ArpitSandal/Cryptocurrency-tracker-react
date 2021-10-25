import React from "react";

// Coins being rendered
function Coins(props) {
  let coin_prop = props.coin_prop;
  return (
    <div className="coin">
      <div className="img-name-symbol">
        <span>
          <img src={coin_prop.image} alt={coin_prop.id} />
          {coin_prop.name}
        </span>
        {coin_prop.symbol}
      </div>
      <div className="categories">
        <p>${coin_prop.current_price}</p>
        <p>${coin_prop.high_24h}</p>
        <p>${coin_prop.low_24h}</p>
        <p>{coin_prop.price_change_percentage_24h}%</p>
        <p>${coin_prop.market_cap}</p>
      </div>
    </div>
  );
}

export default Coins;
