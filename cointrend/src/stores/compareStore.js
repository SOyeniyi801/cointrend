import axios from "axios";
import { create } from "zustand";
import debounce from "../helpers/debounce";
import React, { PureComponent } from "react";

const compareStore = create((set) => ({
  coins1: [],
  coins2: [],
  query1: "",
  query2: "",
  graphData1: [],
  graphData2: [],
  data: {},

  setQuery: (queryNumber, e) => {
    const newValue = typeof e === "string" ? e : e.target.value;
    if (queryNumber === 1) {
      set({ query1: newValue });
    } else {
      set({ query2: newValue });
    }
    if (newValue.length > 2) {
      compareStore.getState().searchCoins(queryNumber);
    }
  },

  searchCoins: debounce(async (queryNumber) => {
    set({ searching: true });
    const state = compareStore.getState();
    const query = queryNumber === 1 ? state.query1 : state.query2;

    if (query.length > 2) {
      const res = await axios.get(
        `https://api.coingecko.com/api/v3/search?query=${query}`,
        {
          headers: {
            "x-cg-demo-api-key": process.env.REACT_APP_COINGECKO_API_KEY,
          },
        }
      );

      const coins = res.data.coins.map((coin) => {
        return {
          name: coin.name,
          image: coin.large,
          id: coin.id,
        };
      });

      if (queryNumber === 1) {
        set({ coins1: coins });
      } else {
        set({ coins2: coins });
      }
    } else {
      set([]);
    }
  }, 500),

  // end of searchdebounce
  fetchData: async (id, coinSlot) => {
    const res = await Promise.all([
      axios.get(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=121`,
        {
          headers: {
            "x-cg-demo-api-key": process.env.REACT_APP_COINGECKO_API_KEY,
          },
        }
      ),
    ]);

    const [marketChartRes] = res;
    const graphData = marketChartRes.data.prices.map((price) => {
      const [timestamp, p] = price;
      const date = new Date(timestamp).toLocaleDateString("en-us");
      return {
        Date: date,
        Price: p,
      };
    });
    console.log("market", marketChartRes);

    if (coinSlot === 1) {
      set({ graphData1: graphData });
    } else {
      set({ graphData2: graphData });
    }
  }, // end of fetchdata
})); //end of compareStore

export default compareStore;
