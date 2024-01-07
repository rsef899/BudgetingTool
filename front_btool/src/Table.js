import React, { useState, useEffect } from "react";
import './Functionality.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems } from "./store/slices";

function Table(props){
    const [tableHtml, setTableHtml] = useState("");

    const dispatch = useDispatch();
    let items = useSelector(state => state.items.items)

    useEffect(() => {
      dispatch(fetchItems());
      console.log("Table")
      console.log(items)
      fetch("http://localhost:5000/api/get_table")
          .then(response => response.json())
          .then(data => setTableHtml(data.table_html))
          .catch(error => console.error(error));
    }, [props.entriesChange, props.entryUpdated]);
    return(
        /* This renders the string as an html command*/
        /*<div dangerouslySetInnerHTML={{ __html: tableHtml }} className="itemsTable"></div>*/
        <div className="itemsTable">
            <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Date</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                {items.length > 0 ? (items.map(item => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.date}</td>
                        <td>{item.price.toFixed(2)}</td>
                    </tr>
                ))
              ) : (
                <td>Getting the Items</td>
              )}
            </tbody>
        </table>

        </div>
        
        );
}
export default Table;