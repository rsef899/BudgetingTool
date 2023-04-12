import React, { useState, useEffect } from "react";

function UpdateInfo(props){
    const [nameOptions, setNameOptions] = useState([]);
    const [selectedName, setSelectedName] = useState('');
    const [detailsOptions, setDetailsOptions] = useState([]);
    
    useEffect(() => {
        fetch("http://localhost:5000/api/get_itemNames")
        .then(response => response.json())
        .then(data => setNameOptions(data.names))
        .catch(error => console.error(error));
    }, [props.entriesChange, props.pressedEnter]);

    //this is what are sending for the details list
    const sendItemSelected = {
        Item: selectedName
    }
    useEffect(() => {
        fetch('http://localhost:5000/api/get_itemDetails_Reciever',{
            // post method is used to send data to the server
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sendItemSelected)
        })
        //cannot chain a fetch inside an arrow function
        .then(response => {
            console.log("Post selected name was succesfull, now getting details list");
            return fetch('http://localhost:5000/api/get_itemDetails_Sender');
        })
        .then(response => response.json())
        .then(data => setDetailsOptions(data.details))
        .catch(error => console.error(error));
    }, [selectedName]);

    const handleNameChange = (event) => {
        setSelectedName(event.target.value);
      
    }

    return (
        <div>

        <label htmlFor="nameDropdown">Item Name:</label>
        <select className="nameDropdown" onChange={handleNameChange}>
            {nameOptions.map(option => (
            <option key={option}>{option}</option>
            ))}
        </select>
        {detailsOptions != '' ? (
            <>
            <label htmlFor="detailsDropdown">Detail:</label>
            <select className="detailsDropdown">
                {detailsOptions.map(option => (
                <option key={option}>{option}</option>
                ))}
            </select>
            </>
        ) : null}

        </div>

    );
}
export default UpdateInfo