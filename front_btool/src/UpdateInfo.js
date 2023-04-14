import React, { useState, useEffect } from "react";

function UpdateInfo(props){
    //item options
    const [nameOptions, setNameOptions] = useState([]);
    //item selection
    const [selectedName, setSelectedName] = useState('');
    //details option
    const [detailsOptions, setDetailsOptions] = useState([]);
    //details selection
    const [selectedDetails, setSelectedDetails] = useState('');

    //these control whether we force the Select and option value on the dropwdowns
    const [isOptionDisabled, setIsOptionDisabled] = useState(true);
    const [isOptionDisabled2, setIsOptionDisabled2] = useState(true);

    //Alloqing/stopping the default value to be selected
    const [allowDefault, setallowDefault] = useState(0);
    const [defaultOption, setDefaultOption] = useState('');


    useEffect(() => {
        fetch("http://localhost:5000/api/get_itemNames")
        .then(response => response.json())
        .then(data => setNameOptions(data.names))
        .catch(error => console.error(error));
    }, [props.entriesChange, props.pressedEnter, props.entryUpdated]);

    //bring down default option
    useEffect(() => {
        if (allowDefault === 1){
            setIsOptionDisabled(false)
            setIsOptionDisabled2(false)
            setDefaultOption('defaultOptionValue');
        }
    }, [allowDefault]);

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
            ("Post selected name was succesfull, now getting details list");
            return fetch('http://localhost:5000/api/get_itemDetails_Sender');
        })
        .then(response => response.json())
        .then(data => setDetailsOptions(data.details))
        .catch(error => console.error(error));
    }, [selectedName, props.pressedEnter]);

    //name drop down, Onchange
    const handleNameChange = (event) => {
        setIsOptionDisabled(true)
        setSelectedName(event.target.value)
        setallowDefault(0)
    }

    //details dropdown on change
    const handleDetailChange = (event) => {
    
        setIsOptionDisabled2(true)
        setSelectedDetails(event.target.value)
    }

    //get the entry from the user #onchange
    const handleUpdateGet = (event) => {
        //console log teh selected values
        console.log("the current item selected in name DD is " + selectedName)
        console.log("the current detail selected in details DD is " + selectedDetails)
        //get the entry value
        props.setChangedDetail(event.target.value)  
    }
    //send the entry
    const sendUpdateData = {
        name: selectedName,
        detail: selectedDetails,
        entry: props.changedDetail
    }
    //last step: send
    const handleUpdateSend = (event) => {
        event.preventDefault();
        fetch('http://localhost:5000/api/update_detail',{
            // post method is used to send data to the server
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Max-Age': '3600',
                'Access-Control-Request-Headers': 'content-type'
            },
            body: JSON.stringify(sendUpdateData)
        }).then(response => response.json())
        .then(data => {
            //only do this if we are udating the sold item entry
            if (data['UpdateIndex'] !== undefined){
                //set the flag to change the label
                props.setupdateSoldFlag(1)
                console.log("this shouldnt coem up")
                //set the sold items row index
                props.setupdatedSoldIndex(parseInt(data.UpdateIndex));
            }
            setallowDefault(1);
        })
        .catch(error => console.error(error));
        props.updateEntryLog();
    }

    return (
        <div>
        {/*select item to edit drop down*/}
        <label htmlFor="nameDropdown">Item Name:</label>
        <select className="nameDropdown" onChange={handleNameChange} value={isOptionDisabled ? selectedName : defaultOption}>
            <option disabled={isOptionDisabled} value="">Select an Option</option>
            {nameOptions.map(option => (
            <option key={option}>{option}</option>
            ))}
        </select>
        {/*select field to edit drop down if item to edit has been chosen*/}
        {detailsOptions != '' ? (
            <>
            <label htmlFor="detailsDropdown">Detail:</label>
            <select className="detailsDropdown" onChange={handleDetailChange} value={isOptionDisabled2 ? selectedDetails : defaultOption}>
                <option disabled={isOptionDisabled2} value="">Select an Option</option>
                {detailsOptions.map(option => (
                <option key={option}>{option}</option>
                ))}
            </select>
            </>
        ) : null}
        {detailsOptions != '' ? (
            <form onSubmit={handleUpdateSend}>
            <input type="text" value={props.changedDetail} onChange={handleUpdateGet} />
            <button type="submit">Submit</button>
          </form>
        ):null}

        </div>

    );
}
export default UpdateInfo