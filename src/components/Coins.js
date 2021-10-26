import React from "react";

// Coins being rendered
function Coins(props) {
  let coin_prop = props.coin_prop;
  let price_change = coin_prop.price_change_percentage_24h;
  let price_change_color = "#38b000";

  if (price_change < 0) price_change_color = "red";
  
  return (

    <div className="coin">
      <div className="img-name-symbol">
        <span>
          <img src={coin_prop.image} alt={coin_prop.id} />
          <span className="coin-name">{coin_prop.name}</span>
        </span>
        <span className="coin-symbol">{coin_prop.symbol}</span>
      </div>

      <div className="categories">
        <p>
          ${coin_prop.current_price < 1 ? coin_prop.current_price : coin_prop.current_price.toLocaleString()}
        </p>

        <p
        >${coin_prop.high_24h < 1 ? coin_prop.high_24h : coin_prop.high_24h.toLocaleString()}
        </p>

        <p>
          ${coin_prop.low_24h < 1 ? coin_prop.low_24h: coin_prop.low_24h.toLocaleString()}
        </p>

        <p style={{color: price_change_color}}>
          {coin_prop.price_change_percentage_24h}%
        </p>

        <p>
          ${coin_prop.market_cap.toLocaleString()}
        </p>

      </div>
    </div>
  );
}

export default Coins;
