import React, { useEffect, useState } from "react";
import compareStore from "../stores/compareStore";
import SearchInput from "../components/SearchInput";
import Header from "../components/Header";
import ListItem from "../components/ListItem";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


export default function Compare() {
  const {query1, query2, coins1, coins2, setQuery, fetchData,graphData1, graphData2} = compareStore();
  const [selectedCoin1, setSelectedCoin1] = useState(null);
  const [selectedCoin2, setSelectedCoin2] = useState(null);
  const [graphData, setGraphData] = useState([])
  

  const handleClick = (coinSlot, coin) => {
    if (coinSlot === 1) {
      setSelectedCoin1(coin);
      setQuery(1, '')
      fetchData(coin.id)
    } else if (coinSlot === 2) {
      setSelectedCoin2(coin);
      setQuery(2, '')
      fetchData(coin.id)
    }
    
  };

  const mergeData = (data1, data2) => {
    const merged ={}
    data1.forEach(item => {
      const { Date, Price } = item
      if(!merged[Date]) merged[Date] = { Date }
      merged[Date].selectedCoin1Price = Price
    })
    data2.forEach(item => {
      const { Date, Price } = item
      if(!merged[Date]) merged[Date] = { Date }
      merged[Date].selectedCoin2Price = Price
    })
    return Object.values(merged)
    
  }

  useEffect(() => {
    if(selectedCoin1){
      fetchData(selectedCoin1.id, 1)
    }
  }, [selectedCoin1,selectedCoin2])

  useEffect(() => {
    if(graphData1.length && graphData2.length){
      const mergedGraphData = mergeData(graphData1, graphData2)
      setGraphData(mergedGraphData)
    }
  }, [graphData1, graphData2])
  console.log(mergeData)
  


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
        {!selectedCoin1 && ( <div className="home-cryptos-list">
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
        </div>)}
       
        {(selectedCoin1) && (
          <div>
            <h5>Selected 1: {selectedCoin1.name}</h5>
            <img src={selectedCoin1.image} alt={selectedCoin1.name}  />
          </div>
        )}

        <div className="home-search">
          <SearchInput
            value={query2}
            onChange={(e) => setQuery(2, e)}
          />
        </div>
        {!selectedCoin2 && ( <div className="home-cryptos-list">
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
        </div>) }
       
        {(selectedCoin2) && (
          <div>
            <h5>Selected 2: {selectedCoin2.name}</h5>
            <img src={selectedCoin2.image} alt={selectedCoin2.name}  />
          </div>
        )}
      </div>
      
      <LineChart
          width={500}
          height={300}
          data={graphData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="selectedCoin1" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="selectedCoin2" stroke="#82ca9d" activeDot={{ r: 8 }}/>
        </LineChart>
      
    </div>
  ); 

  


}
