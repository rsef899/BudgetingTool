import React, { useState, useEffect } from "react";
import './Functionality.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems, fetchNetBalance, startEditing, stopEditing, updateItem } from "./store/slices";

function Table(props){
    const dispatch = useDispatch();
    let items = useSelector(state => state.mySlice.items)
    let isEditing = useSelector(state => state.mySlice.editingCell)

    useEffect(() => {
      dispatch(fetchItems());
      console.log("Table")
      console.log(items)
      
      dispatch(fetchNetBalance())
    }, [props.entriesChange, props.entryUpdated]);

    //Table update
    const handleCellClick = (item, columnName) => {
        console.log(`Clicked on item ${item.id}, Column: ${columnName}`);
        dispatch(startEditing({item_id : item.id, col : columnName}));
      };

    const handleBlur = () => {
        dispatch(stopEditing());
    };

    const handleUpdate = (event, item_id, column_name) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent the default Enter key behavior (e.g., form submission)

            if ((column_name === "price" || column_name === "sold_price") && isNaN(event.target.value)) {
                console.log("Not a number")
                return; // Return early if it's not a number
              }

            dispatch(updateItem({
                item_id: item_id, 
                column_name: column_name, 
                new_value: event.target.value
            })).then(()=>{
                dispatch(stopEditing())
                dispatch(fetchItems())
                if (column_name === "price" || column_name === "sold_price"){ dispatch(fetchNetBalance()) }
            });
            
          }
    }

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
                        <td>
                            {item.id}
                        </td>
                        <td onDoubleClick = {() => handleCellClick(item, 'name')}>
                            {isEditing && item.id === isEditing.item_id && isEditing.col === 'name' ? (
                                <input
                                type="text"
                                defaultValue={item.name}
                                onBlur={handleBlur}
                                autoFocus
                                onKeyDown={(e) => handleUpdate(e, item.id, 'name')}
                              />
                            ) : (item.name)}
                        </td>
                        <td onDoubleClick = {() => handleCellClick(item, 'date')}>
                            {isEditing && item.id === isEditing.item_id && isEditing.col === 'date' ? (
                                    <input
                                    type="text"
                                    defaultValue={item.date}
                                    onBlur={handleBlur}
                                    autoFocus
                                    onKeyDown={(e) => handleUpdate(e, item.id, 'date')}
                                />
                                ) : (item.date)}
                        </td>
                        <td onDoubleClick={() => handleCellClick(item, 'price')}>
                            {isEditing && item.id === isEditing.item_id && isEditing.col === 'price' ? (
                                    <input
                                    type="number"
                                    min="0" 
                                    step="0.01" 
                                    max="10000"
                                    defaultValue={item.price.toFixed(2)}
                                    onBlur={handleBlur}
                                    autoFocus
                                    onKeyDown={(e) => handleUpdate(e, item.id, 'price')}
                                />
                                ) : (item.price.toFixed(2))}
                            
                        </td>
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