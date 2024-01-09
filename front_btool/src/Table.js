import React, { useState, useEffect } from "react";
import './Functionality.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems, fetchNetBalance, startEditing, stopEditing } from "./store/slices";

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
                                />
                                ) : (item.date)}
                        </td>
                        <td onDoubleClick={() => handleCellClick(item, 'price')}>
                            {isEditing && item.id === isEditing.item_id && isEditing.col === 'price' ? (
                                    <input
                                    type="number"
                                    defaultValue={item.price.toFixed(2)}
                                    onBlur={handleBlur}
                                    autoFocus
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