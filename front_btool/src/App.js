import './App.css';
import React, { useState, useEffect } from "react";
import Header from './Header';
import Entry from './Entry';
import Table from './Table';
import SoldItems from './SoldItems';
import NetBalance from './NetBalance';
import UpdateInfo from './UpdateInfo';


function App() {
/*******entry Change detection */
  const [entriesChange, setEntriesChange] = useState(0);
  //function to add entry
  const addEntryChange = (entry) => {
    setEntriesChange((prevState) => prevState + 1);
  };
/*******Submited sales price detection */
  const [pressedEnter, setPressedEnter] = useState(0);
  //function to detect enter pressed
  const addEnterPressedChange = (entry) => {
      setPressedEnter((prevState) => prevState + 1);
  };
/*******Reset detection */
  const [hasReset, sethasReset] = useState(0);
  //function to detect enter pressed
  const addhasReset = (entry) => {
    sethasReset((prevState) => prevState + 1);
  };

  //table will reset when page is refreshed
  useEffect(() => {
    window.onbeforeunload = () => {
      fetch("http://localhost:5000/api/reset_table", {
        method: "POST"
      });
      addhasReset();
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
            <h1 className='EmptyEntryHeader'>Enter an entry to get started</h1>):(
            //only one componant can be returned in a ternery operator hence <>, allows both to render 
            <>
              <Table entriesChange={entriesChange}/>
              <SoldItems prop1={entriesChange} prop2={addEnterPressedChange} />
            </>)}
        </div>
        
          <div className='NetBalanceDiv'>
            <NetBalance pressedEnter={pressedEnter} entriesChange={entriesChange} hasReset={hasReset}/>
          </div>
          <div className='updateDiv'>
            {entriesChange ? (<UpdateInfo entriesChange={entriesChange} pressedEnter={pressedEnter} />):(null)}  
          </div>
      </div>
    </div>
       
          
           
      
  );
}

export default App;
