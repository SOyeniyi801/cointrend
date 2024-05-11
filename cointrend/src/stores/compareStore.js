import axios from "axios";
import {create} from 'zustand';
import debounce from "../helpers/debounce";

const compareStore = create((set) => ({
   coins1: [], 
   coins2: [],
   query1: "",
   query2:"",
   searching: false,
  searched: false,

   setQuery: (queryNumber, e) => {
    const newValue = e.target.value
if(queryNumber === 1){
    set({ query1: newValue });
} else {
    set({ query2: newValue });
} 
    if(newValue.length > 2){
        compareStore.getState().searchCoins(queryNumber);
    }
    
  },

  searchCoins:debounce(async(queryNumber) => {
    set({searching: true});
    const state = compareStore.getState();
    const query = queryNumber === 1 ? state.query1 : state.query2;
    

    if (query.length > 2) {
        const res = await axios.get(
          `https://api.coingecko.com/api/v3/search?query=${query}`, {
            headers: {
              'x-cg-demo-api-key': process.env.REACT_APP_COINGECKO_API_KEY
            }
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
        set({ coins1: coins, searching: false, searched: true });
      } else {
        set({ coins2: coins, searching: false, searched: true });
      }
    } else {
      set({ searching: false, searched: false });
    }

  }, 500),
  
  // end of searchdebounce
    
})); //end of compareStore

export default compareStore
