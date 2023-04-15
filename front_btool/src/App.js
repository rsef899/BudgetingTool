import './App.css';
import React, { useState, useEffect } from "react";
import Header from './Header';
import Entry from './Entry';
import Table from './Table';
import SoldItems from './SoldItems';
import NetBalance from './NetBalance';
import UpdateInfo from './UpdateInfo';
import ResetBack from './ResetBack';
import LoadingScreen from './LoadingScreen';


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
  /*******Submited Update tableUpdate */
  const [entryUpdated, setEntryUpdated] = useState(0);
  //function to detect enter pressed
  const updateEntryLog = (entry) => {
    setEntryUpdated((prevState) => prevState + 1);
  };
  //*********Updating sold table state variables */
  const [updateSoldFlag, setupdateSoldFlag] = useState(0);
  const [updatedSoldIndex, setupdatedSoldIndex] = useState(0);
  //changed detail
  const [changedDetail, setChangedDetail] = useState('');

  return (
    <div>
      <LoadingScreen/>
      {/* <ResetBack addhasReset={addhasReset}/>
      <Header />  
      <div class="main-grid-container">   
          <div className='grid-container-mover'>
            <div class="grid-container">     
                <div className='entry-div'>
                  <Entry addEntryChange ={addEntryChange} />
                </div>
                
                  <div className='net-balance-div'>
                    <NetBalance pressedEnter={pressedEnter} entriesChange={entriesChange} hasReset={hasReset} 
                    updateSoldFlag={updateSoldFlag} entryUpdated={entryUpdated}/>
                  </div>
                  
                    {entriesChange ? (
                      <div className='update-div'>
                        <UpdateInfo entriesChange={entriesChange} pressedEnter={pressedEnter} updateEntryLog={updateEntryLog}
                        setupdateSoldFlag={setupdateSoldFlag} setupdatedSoldIndex={setupdatedSoldIndex} 
                        setChangedDetail={setChangedDetail} changedDetail={changedDetail} 
                        entryUpdated={entryUpdated} />
                        </div> ):(null)}  
                </div>
            
          </div>
          <div className="entire-top-table-div">
                {!entriesChange ? (
                  <h1 className='EmptyEntryHeader'>Enter an entry to get started</h1>):(
                  //only one componant can be returned in a ternery operator hence <>, allows both to render 
                  <>
                    <Table entriesChange={entriesChange} entryUpdated={entryUpdated}/>
                    <SoldItems entriesChange={entriesChange} prop2={addEnterPressedChange} 
                    updateSoldFlag={updateSoldFlag} setupdateSoldFlag={setupdateSoldFlag} updatedSoldIndex={updatedSoldIndex}
                    changedDetail={changedDetail} />
                  </>)}
              </div>
      </div> */}
    {/*MainDiv end */}
    </div>  
  );
}

export default App;
