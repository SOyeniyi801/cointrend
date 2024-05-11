import React, { useState } from "react";
import compareStore from "../stores/compareStore";
import SearchInput from "../components/SearchInput";
import Header from "../components/Header";
import ListItem from "../components/ListItem";

export default function Compare() {
  const {query1, query2, coins1, coins2, setQuery} = compareStore();
  const [selectedCoin1, setSelectedCoin1] = useState(null);
  const [selectedCoin2, setSelectedCoin2] = useState(null);
  

  const handleClick = (coinSlot, coin) => {
    if (coinSlot === 1) {
      setSelectedCoin1(coin);
    } else if (coinSlot === 2) {
      setSelectedCoin2(coin);
    }
  };

  return (
    <div>
      <Header />
      <h2>Select two coins to compare their value</h2>
      <div className="compare-search">
        <div className="home-search">
          <SearchInput
            value={query1}
            onChange={(e) => setQuery(1, e)}
          />
        </div>
        <div className="home-cryptos-list">
          {coins1.map((coin) => {
            return (
              <ListItem
                key={coin.id}
                coin={coin}
                onClick={() => handleClick(1,coin)}
                isComparePage={true}
              />
            );
          })}
        </div>
        {(selectedCoin1) && (
          <div>
            <h5>Selected 1: {selectedCoin1.name}</h5>
            {/* <img src={selectedCoin.image} alt={selectedCoin.name}  /> */}
          </div>
        )}

        <div className="home-search">
          <SearchInput
            value={query2}
            onChange={(e) => setQuery(2, e)}
          />
        </div>
        <div className="home-cryptos-list">
          {coins2.map((coin) => {
            return (
              <ListItem
                key={coin.id}
                coin={coin}
                onClick={() => handleClick(2,coin)}
                isComparePage={true}
              />
            );
          })}
        </div>
        {(selectedCoin2) && (
          <div>
            <h5>Selected 2: {selectedCoin2.name}</h5>
            {/* <img src={selectedCoin.image} alt={selectedCoin.name}  /> */}
          </div>
        )}
      </div>
    </div>
  );
}
