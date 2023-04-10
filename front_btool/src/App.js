import './App.css';
import React, { useState, useEffect } from "react";
import Header from './Header';
import Entry from './Entry';
import Table from './Table';
import SoldItems from './SoldItems';


function App() {
  const [entriesChange, setEntriesChange] = useState(0);
  //monitoring refresh
  const [backendState, setBackendState] = useState(null);

  //function to add entry
  const addEntryChange = (entry) => {
    setEntriesChange((prevState) => prevState + 1);
  };

  //table will reset when page is refreshed
  useEffect(() => {
    window.onbeforeunload = () => {
      fetch("http://localhost:5000/api/reset_table", {
        method: "POST"
      });
    }
  }, []);

  return (
    <div>
      <Header />
      <div className='topBox'>
        <div className='EntryStyle'>
          <Entry addEntryChange ={addEntryChange} />
        </div>
        <div className="topBox2">
          <Table entriesChange={entriesChange}/>
          <SoldItems entriesChange={entriesChange}/>
        </div>
      </div>
    </div>
    
  );
}

export default App;
