import React from "react";

// Coins being rendered
function Coins(props) {
  return (
    <div>
      <p>{props.coin_prop.name}</p>
    </div>
  );
}

export default Coins;
