import React, { useState, useEffect } from "react";

function NetBalance(props){
    const [netBalanceHeader, setNetBalanceHeader] = useState("");

//***Update net balance when enter is hit 
    useEffect(() => {
        fetch("http://localhost:5000/api/get_netBalance")
        .then(response => response.json())
        .then(data => setNetBalanceHeader(data.netBalance))
        .catch(error => console.error(error));

    }, [props.pressedEnter, props.entriesChange, props.hasReset, props.updateSoldFlag, props.entryUpdated]);

    const netBalanceClass = netBalanceHeader < 0 ? 'netBalanceNegative' : 'netBalancePositive';
    return(
        <>
            <h1>Balance:</h1>
            <label className={netBalanceClass}>{netBalanceHeader}$</label>
        </>
    );
}
export default NetBalance;
