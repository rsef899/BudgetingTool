import './App.css';
import React, { useState, useEffect } from "react";
import Header from './Header';
import Entry from './Entry';
import Table from './Table';
import SoldItems from './SoldItems';
import NetBalance from './NetBalance';


function App() {
  const [entriesChange, setEntriesChange] = useState(0);

  //function to add entry
  const addEntryChange = (entry) => {
    setEntriesChange((prevState) => prevState + 1);
  };
  //pressed enter state
  const [pressedEnter, setPressedEnter] = useState(0);

  //function to detect enter pressed
  const addEnterPressedChange = (entry) => {
      setPressedEnter((prevState) => prevState + 1);
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
          {!entriesChange ? (
            <h1 className='EmptyEntryHeader'>Enter an entry to get started</h1>
          ):(
            //only one componant can be returned in a ternery operator hence <>, allows both to render 
            <>
              <Table entriesChange={entriesChange}/>
              <SoldItems prop1={entriesChange} prop2={addEnterPressedChange} />
            </>
          )}
        </div>
      </div>
      <NetBalance pressedEnter={pressedEnter}/>
    </div>
    
  );
}

export default App;
