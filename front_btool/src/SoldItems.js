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
                            <td>{row.column1}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default SoldItems;