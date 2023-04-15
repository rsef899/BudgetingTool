import React, { useState, useEffect, useRef } from "react";

function SoldItems(props){

    const [rows, setRows] = useState([]);
    //sold items entry warning
    const [showWarning, setShowWarning] = useState(false);

    function addRow(newRows){
        setRows([...rows, newRows]);
    }

    useEffect(() => {
        if (props.entriesChange) {
          setRows([...rows, {}]);
        }
      }, [props.entriesChange]);

    //Update the sold for label everytime the sold for detail is updated
    useEffect(() => {
        //only updae, if the flag has been set
        if (props.updateSoldFlag == 1){
            //must get the most recent rows data
            setRows(prevRows => {
                const updatedRows = [...prevRows];
                //change the value to the changed detail
                updatedRows[props.updatedSoldIndex].column1 = props.changedDetail;
                return updatedRows;
              }); 
              //reset the flag
              props.setupdateSoldFlag(0)
        }
    }, [props.updateSoldFlag])

    const inputRef = useRef(null);

    // event listener function for the sold entry boxes
    function handleKeyPress(event, index) {
        if (event.keyCode === 13) {

            //use HTML5 custom warning Label, to show our warning
            if (!inputRef.current.checkValidity()) {
                //deisplay the warning label
                inputRef.current.reportValidity();
                return;
            }
            props.prop2();
            //create a copy of the current rows to use
            const updatedRows = [...rows];
            //declaring isEnterd to change to labels
            updatedRows[index].isEntered = true;
            //seeting to new rows
            setRows(updatedRows);
            console.log("Enter pressed in input at index", index);

            
            // send POST request to backend file with the entered value
            const enteredValue = event.target.value;
            const soldItemsData = {
                itemNumber : index,
                enteredValue: enteredValue
            };
        
            fetch('http://localhost:5000/api/recieve_sale_item', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(soldItemsData)
            })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                const updatedRows = [...rows];
                updatedRows[index].isEntered = true;
                updatedRows[index].column1 = enteredValue;
                setRows(updatedRows); 
            })
            .catch(error => {console.error(error)});
        }
    }

    return(
        <>
            {props.entriesChange ? (
                <table className="soldItemsTable">
                <thead>
                    <tr>
                        <th>Sold For:</th>
                    </tr>
                </thead>
                <tbody>
                    {/*creates a new row based on the state variable rows*/}
                    {rows.map((row,index) => (
                        <tr key={index}>
                            {row.isEntered ? (
                            //if item has been entered, render a label with its value
                                <td><label>{row.column1}</label></td>
                            ) : (
                            //if the item hasnt been entered it should still be an entry field
                            <td>
                                <input 
                                required="required"
                                type="number" 
                                min= "0" 
                                max = "10000"
                                step="1"
                                value={row.column1}
                                //we are creating a reference to the inputs dom element
                                ref={inputRef}
                                onKeyDown={(event) => {
                                    
                                    setShowWarning(false);
                                    handleKeyPress(event, index)}}
                            />
                            </td>
                        )}
                        </tr>
                    ))}
                </tbody>
            </table>
            ): null}
        </>
    );
}
export default SoldItems;