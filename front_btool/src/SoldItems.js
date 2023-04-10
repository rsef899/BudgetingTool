import React, { useState, useEffect } from "react";

function SoldItems(props){
    const [rows, setRows] = useState([]);
    
    function addRow(newRows){
        setRows([...rows, newRows]);
    }

    useEffect(() => {
        if (props.entriesChange) {
          setRows([...rows, {}]);
        }
      }, [props.entriesChange]);

        // event listener function for the sold entry boxes
    function handleKeyPress(event, index) {
        if (event.keyCode === 13) {
            const updatedRows = [...rows];
            updatedRows[index].isEntered = true;
            setRows(updatedRows);
            console.log("Enter pressed in input at index", index);
            
            // send POST request to backend file with the entered value
            const enteredValue = event.target.value;
            console.log("lo0lol" + enteredValue);
            fetch('http://localhost:5000/api/recieve_sale_item', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ enteredValue })
            })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error(error));
        }
    }

    return(
        <div>
            <table className="soldItemsTable">
                <thead>
                    <tr>
                        <th>Sold Price</th>
                    </tr>
                </thead>
                <tbody>
                    {/*creates a new row based on the state variable rows*/}
                    {rows.map((row,index) => (
                        <tr key={index}>
                            {/*add a new entry with a text box inside*/}
                            <td><input 
                            type = "text" 
                            value = {row.column1}
                            onKeyDown={(event) => handleKeyPress(event, index)}
                            /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default SoldItems;