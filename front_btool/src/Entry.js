import React, { useState } from "react";

function EntryForm(props) {
    //[1,2], 1 is name of the state, 2 is the chnaging function of the state
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [dateBought, setDate] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = {
            name: name,
            price: price,
            dateBought: dateBought
        };

        fetch('http://localhost:5000/api/add_entry',{
            // post method is used to send data to the server
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then((data) => {
            console.log(data)
            //update the entries counter
            props.addEntryChange();
        })
        .catch(error => console.error(error));

        console.log({ name, dateBought, price})
    };

    return (
        <form onSubmit={handleSubmit} className="mainEntry">
            <label>
                Item Name:
                {/*e.taget.value leads to the name variable*/}
                <input type="text" value={name} onChange = {(e) => setName(e.target.value)} />
            </label>
            <br />

            <label>
                Date Purchased:
                {/*e.taget.value leads to the name variable*/}
                <input type="text" value={dateBought} onChange = {(e) => setDate(e.target.value)} />
            </label>
            <br />

            <label>
                Price:
                {/*e.taget.value leads to the name variable*/}
                <input type="text" value={price} onChange = {(e) => setPrice(e.target.value)} />
            </label>
            <br />
            <button type = "submit">Add Expense</button>
        </form>
        
    );
}

export default EntryForm;