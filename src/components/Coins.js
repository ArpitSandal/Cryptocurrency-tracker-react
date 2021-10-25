import React from "react";

// Coins being rendered
function Coins(props) {
  let coin_prop=props.coin_prop;
  return (
    <div>
      <img src={coin_prop.image} alt={coin_prop.id}/>  
      <p>{coin_prop.name}</p>
      <p>{coin_prop.symbol}</p>
      <p>${coin_prop.current_price}</p>
      <p>${coin_prop.high_24h}</p>
      <p>${coin_prop.low_24h}</p>
      <p>{coin_prop.price_change_percentage_24h}%</p>
      <p>${coin_prop.market_cap}</p>
    </div>
  );
}

export default Coins;
