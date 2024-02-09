import React, { useEffect } from "react";

import { useDispatch, useSelector } from 'react-redux';
import { fetchItems, fetchNetBalance, startEditing, stopEditing, updateItem, renderTempEdit } from "./store/slices";

function Table(props){
    const dispatch = useDispatch();
    let items = useSelector(state => state.mySlice.items)
    let isEditing = useSelector(state => state.mySlice.editingCell)

    useEffect(() => {
      dispatch(fetchItems());      
      dispatch(fetchNetBalance())
    }, [props.entriesChange, props.entryUpdated]);

    //Table update
    const handleCellClick = (item, columnName) => {
        console.log(items)
        console.log(`Clicked on item ${item.id}, Column: ${columnName}`);
        dispatch(startEditing({item_id : item.id, col : columnName}));
      };

    const handleBlur = () => {
        dispatch(stopEditing());
    };

    const handleUpdate = (event, item_id, column_name) => {
  
        event.preventDefault(); // Prevent the default Enter key behavior (e.g., form submission)

        dispatch(updateItem({
            item_id: item_id, 
            column_name: column_name, 
            new_value: event.target.elements[0].value
        })).then(()=>{
            dispatch(stopEditing())
            dispatch(renderTempEdit(event.target.elements[0].value))
            dispatch(fetchItems())
            if (column_name === "price" || column_name === "sold_price"){ dispatch(fetchNetBalance()) }
        });
            

    }

    // event listener function for the sold entry boxes
    function handleKeyPress(event, index, column_name) {
        event.preventDefault();

            console.log("Enter pressed in input at index", index);

            fetch(`http://localhost:5000/api/recieve_sale_item/${index}`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({sold_price : event.target.elements[0].value})
            })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                dispatch(renderTempEdit(event.target.elements[0].value))
                dispatch(stopEditing())
                dispatch(fetchItems())
                dispatch(fetchNetBalance())
            })
            .catch(error => console.error(error))
    }

    let counter = 0;

    return(
        /* This renders the string as an html command*/
        /*<div dangerouslySetInnerHTML={{ __html: tableHtml }} className="itemsTable"></div>*/
        <div className="itemsTable">
            <table>
            <thead>
                <tr>
                    <th className="idTh">ID</th>
                    <th>Name</th>
                    <th>Date</th>
                    <th>Price</th>
                    <th>Sold Price</th>
                </tr>
            </thead>
            <tbody>
                {items.length > 0 ? (
                    items.map(item => (
                    <tr key={item.id}>
                        <td>
                            {item.id}
                        </td>
                        <td onDoubleClick = {() => handleCellClick(item, 'name')}>
                            {isEditing && item.id === isEditing.item_id && isEditing.col === 'name' ? (
                            <form onSubmit={(e) => handleUpdate(e, item.id, 'name')}>
                                <input
                                type="text"
                                defaultValue={item.name}
                                onBlur={handleBlur}
                                autoFocus
                              />
                            </form>
                            ) : (item.name)}
                        </td>
                        <td onDoubleClick = {() => handleCellClick(item, 'date')}>
                            {isEditing && item.id === isEditing.item_id && isEditing.col === 'date' ? (
                                <form onSubmit={(e) => handleUpdate(e, item.id, 'date')}>
                                    <input
                                    type="text"
                                    defaultValue={item.date}
                                    onBlur={handleBlur}
                                    autoFocus
                                    />
                                </form>
                                ) : (item.date)}
                        </td>
                        <td onDoubleClick={() => handleCellClick(item, 'price')}>
                            {isEditing && item.id === isEditing.item_id && isEditing.col === 'price' ? (
                                 <form onSubmit={(e) => handleUpdate(e, item.id, 'price')}>
                                    <input
                                    type="number"
                                    min="0" 
                                    step="0.01" 
                                    max="10000"
                                    defaultValue={item.price}
                                    onBlur={handleBlur}
                                    autoFocus
                                    />
                                </form>
                                ) : (item.price.toFixed(2))} 
                        </td>
                        <td onDoubleClick = {() => handleCellClick(item, 'sold_price')}>
                                        {(isEditing && item.id === isEditing.item_id && isEditing.col === 'sold_price') || !item.sold_price ? (
                                        <form onSubmit={(e) => handleKeyPress(e, item.id, 'sold_price')}>
                                            <input
                                            type="number" 
                                            min= "0" 
                                            max = "10000"
                                            step="0.01"
                                            defaultValue={item.sold_price}
                                            onBlur={handleBlur}
                                            autoFocus
                                        />
                                        </form>
                                        ) : (item.sold_price.toFixed(2))}
                        </td>
                    </tr>
                ))
              ) : (
                <tr>
                    <td>Getting the Items</td>
                </tr>
              )}
            </tbody>
        </table>

        </div>
        
        );
}
export default Table;