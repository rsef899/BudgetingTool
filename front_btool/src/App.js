import './App.css';
import React, { useState } from "react";
import Header from './Header';
import Entry from './Entry';
import Table from './Table';
import SoldItems from './SoldItems';


function App() {
  const [entriesChange, setEntriesChange] = useState(0);

  //function to add entry
  const addEntryChange = (entry) => {
    setEntriesChange((prevState) => prevState + 1);
  };

  return (
    <div>
      <Header />
      <div className='topBox'>
        <div className='EntryStyle'>
          <Entry addEntryChange ={addEntryChange} />
        </div>
          <Table entriesChange={entriesChange}/>
          <SoldItems entriesChange={entriesChange}/>
      </div>
    </div>
    
  );
}

export default App;
