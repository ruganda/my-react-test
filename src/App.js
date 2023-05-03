import './App.css';
import React, { useState, useEffect } from 'react';
import SearchContext from './context/SearchContext'
import HomePage from './components/HomePage';


const App=()=> {
  
  const fetchDummyData = async () => {
    try{
    const response = await fetch('./data.json');
    const data = await response.json();
    setAllData(data)
    return data;
    }catch(error){
      console.log(error)
      return []
    }
  };
  

  const [searchResults, setSearchResults] = useState([]);
  const [allData, setAllData] = useState([]);

  useEffect(()=>{
    fetchDummyData();
  },[])

  return (
    <div className="App">
      <SearchContext.Provider value={[searchResults, setSearchResults, allData, setAllData]}>
        <HomePage fetchDummyData={fetchDummyData}/>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
