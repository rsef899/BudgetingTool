import React, { useState, useEffect } from "react";

function SoldItems(props){

    const [rows, setRows] = useState([]);

    function addRow(newRows){
        setRows([...rows, newRows]);
    }

    useEffect(() => {
        if (props.prop1) {
          setRows([...rows, {}]);
        }
      }, [props.prop1]);

    // event listener function for the sold entry boxes
    function handleKeyPress(event, index) {
        if (event.keyCode === 13) {
            props.prop2();
            //create the entry box after every entry is added
            const updatedRows = [...rows];
            //declating isEnterd
            updatedRows[index].isEntered = true;
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
            .catch(error => console.error(error));
        }
    }

    return(
        <div>
            {props.prop1 ? (
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
                            <td><input 
                                type="text" 
                                value={row.column1}
                                onKeyDown={(event) => handleKeyPress(event, index)}
                            /></td>
                        )}
                        </tr>
                    ))}
                </tbody>
            </table>
            ): null}
        </div>
    );
}
export default SoldItems;