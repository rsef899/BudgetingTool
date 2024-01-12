import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems, fetchNetBalance, startEditing, stopEditing, updateItem, renderTempEdit } from "./store/slices";

function SoldItems(props){
    let items = useSelector(state => state.mySlice.items)
    let isEditing = useSelector(state => state.mySlice.editingCell)
    let tempEdit = useSelector(state => state.mySlice.renderTempEdit)
    console.log(items)
    const dispatch = useDispatch();
    

    //Update the sold for label everytime the sold for detail is updated
    useEffect(() => {
        //only updae, if the flag has been set
        if (props.updateSoldFlag == 1){
            //must get the most recent rows data
            
              props.setupdateSoldFlag(0)
        }
    }, [props.updateSoldFlag])

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

                //Table update
    }

    const handleCellClick = (item, columnName) => {
        console.log(`Clicked on item ${item.id}, Column: ${columnName}`);
        dispatch(startEditing({item_id : item.id, col : columnName}));
      };

    const handleBlur = () => {
        dispatch(stopEditing());
    };

    return (
        <>
            {props.entriesChange ? (
                <table className="soldItemsTable">
                    <thead>
                        <tr>
                            <th>Sold For:</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => {
                           
                                return (
                                <tr key={index}>
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
                                        ) : (item.sold_price)}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            ) : null}
        </>
    );
}
export default SoldItems;