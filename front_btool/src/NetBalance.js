import React, { useState, useEffect } from "react";

function NetBalance(props){
    const [netBalanceHeader, setNetBalanceHeader] = useState("");


    useEffect(() => {
        //fetch the net balance data first
        fetch("http://localhost:5000/api/get_netBalance")
        .then(response => response.json())
        .then(data => setNetBalanceHeader(data.netBalance))
        .catch(error => console.error(error));

    }, [props.pressedEnter]);
    return(
        <h1>{netBalanceHeader}</h1>
    );
}
export default NetBalance;