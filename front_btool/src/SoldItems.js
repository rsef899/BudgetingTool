import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems } from "./store/slices";

function SoldItems(props){
    let items = useSelector(state => state.items.items)
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
    function handleKeyPress(event, index) {
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
                dispatch(fetchItems())
            })
            .catch(error => console.error(error))

    }

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
                                    <td>
                                        {item.sold_price
                                            ? (<label>{item.sold_price}</label>) : (
                                            <form onSubmit={(event) => handleKeyPress(event, index)}>
                                                <input 
                                                type="number" 
                                                min= "0" 
                                                max = "10000"
                                                step="0.01"
                                                />
                                            </form>
                                        )}
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