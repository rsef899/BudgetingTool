import React, { useState, useRef, useEffect } from "react";

function EntryForm(props) {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [dateBought, setDate] = useState("");
    const [hasDupes, setHasDupes] = useState(false);

    //refernce to names entry dom
    const nameInputRef = useRef(null);
    const priceInputRef = useRef(null);
    const dateInputRef = useRef(null);
    
    //Seperate function ofr checking for dupes, as it should be an asynchronus operation
    const checkForDupes = () => {
        //set the name we are checking for dupes
        const dupesData = {
            name: name
        } 
        fetch('http://localhost:5000/api/check_name_dupes',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dupesData)
        })
        .then(response => response.json())
        .then((data) => {
            //The entry is a suplicaet:
            if (data['Outcome'] === true) {
                setHasDupes(true);
            } else {
                setHasDupes(false);
            }
        })
        .catch(error => console.error(error));
    }

    //evaluate the dupe checker, as soon as it changes
    useEffect(() => {
        if (hasDupes === true) {
            nameInputRef.current.setCustomValidity("No duplicated item names"); 
        } else {
            nameInputRef.current.setCustomValidity("");
        }
    }, [hasDupes]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const [year, month, day] = dateBought.split('-');
        //formting date using a template literal
        const dateBoughtFormatted = `${day}/${month}/${year.slice(-2)}`;
        //run the asynchronus operation for checking for the dupes
        checkForDupes();
        const formData = {
            name: name,
            price: price,
            dateBought: dateBoughtFormatted
        };

        fetch('http://localhost:5000/api/add_entry',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then((data) => {
            props.addEntryChange();
        })
        .catch(error => console.error(error));

        setName("");
        setDate("");
        setPrice("");
    };

    return (
        <form onSubmit={handleSubmit} className="mainEntry">
            <label>
                Item Name:
                <input required="required" type="text" value={name} ref={nameInputRef} onChange={(e) => {
                    setName(e.target.value);
                    setHasDupes(false);
                }} />
            </label>
            <br />

            <label>
                Date Purchased:
                <input required="required" type="date" value={dateBought} ref={dateInputRef} onChange={(e) => setDate(e.target.value)} />
            </label>
            <br />

            <label>
                Price:
                <input required="required" type="number" min="0" step="0.01" max="10000" value={price} ref={priceInputRef} onChange={(e) => setPrice(e.target.value)} />
            </label>
            <br />
            <button type="submit">Add Expense</button>
        </form>
        
    );
}

export default EntryForm;
