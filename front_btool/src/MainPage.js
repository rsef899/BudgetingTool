import './App.css'; 
import React, { useState} from "react";
import Header from './Header';
import Entry from './Entry';
import Table from './Table';
import NetBalance from './NetBalance';
import ResetBack from './ResetBack';
import LoadingScreen from './LoadingScreen';

function MainPage() {
/*******After Main Loading Screen */
const[onHomeScreen, setOnHomeScreen] = useState(true)
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
  const addhasReset = () => {
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


  const handleResize = () => {
    if (window.innerWidth < 768) {
        require('./Functionality-Small.css');
        console.log("resize detected")
    } else {
        require('./Functionality-Big.css');
    } 
  }

  // Call it initially and whenever the window resizes
  handleResize();
  window.addEventListener('resize', handleResize);

  return (
    <div>
      {onHomeScreen ? (
        <>
         <LoadingScreen setOnHomeScreen={setOnHomeScreen} addhasReset={addhasReset} hasReset={hasReset}/>
         <ResetBack hasReset={hasReset}/>
        </>
        ):(
          <>
            <Header />  
            <div class="main-grid-container">     
              <div className='entry-div'>
                <Entry addEntryChange ={addEntryChange} />
              </div>
              
                <div className='net-balance-div'>
                  <NetBalance pressedEnter={pressedEnter} entriesChange={entriesChange} hasReset={hasReset} 
                  updateSoldFlag={updateSoldFlag} entryUpdated={entryUpdated}/>
                </div>
              <div className="entire-top-table-div">
                    {!entriesChange ? (
                      <h1 className='EmptyEntryHeader'>Enter an entry to get started</h1>):(
                      //only one componant can be returned in a ternery operator hence <>, allows both to render 
                      <>
                        <Table entriesChange={entriesChange} entryUpdated={entryUpdated}/>
                      </>)}
              </div>
            </div>
          </>
        )}
     
      
    {/*MainDiv end */}
    </div>  
  );
}

export default MainPage;
