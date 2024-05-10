import React from "react";
import homeStore from "../stores/homeStore";
// import { Link } from 'react-router-dom'
import Header from "../components/Header";
import ListItem from "../components/ListItem";
import classNames from "classnames";
import SearchInput from "../components/SearchInput";

export default function Home() {
  const store = homeStore();
  React.useEffect(() => {
    if(store.trending.length === 0)store.fetchCoins();
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <Header />
      <header className="home-search">
        <div className="width">
          <h2>Search for a coin</h2>
          <SearchInput 
           value={store.query}
           onChange={store.setQuery}
           searching={store.searching}
          />
        </div>
      </header>
      <div className="home-cryptos">
        <div className="width">
          <h2>{store.searched ? 'Search Results' :"Trending coins"}</h2>
          <div className="home-cryptos-list">
            {store.coins.map((coin) => {
              return <ListItem key={coin.id} coin={coin} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
