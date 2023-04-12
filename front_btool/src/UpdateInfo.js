import React, { useState, useEffect } from "react";


function UpdateInfo(props){
    const [nameOptions, setNameOptions] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/get_itemNames")
        .then(response => response.json())
        .then(data => setNameOptions(data.names))
        .catch(error => console.error(error));
    }, [props.entriesChange]);

    return (
        <>
        <label for="nameDropdown">Item Name:</label>
        <select className="nameDropdown">
            {nameOptions.map(option => (
                <option key={option}>{option}</option>
            ))}
        </select>
        </>

    );
}
export default UpdateInfo