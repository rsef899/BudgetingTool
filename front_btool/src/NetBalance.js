import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {set_net_balance, fetchNetBalance} from "./store/slices"


function NetBalance(props){
    const [netBalanceHeader, setNetBalanceHeader] = useState("");

    let netBalance = useSelector(state => state.mySlice.netBalance)
    const dispatch = useDispatch()

//***Update net balance when enter is hit 
    useEffect(() => { 
        dispatch(fetchNetBalance)
    }, [props.pressedEnter, props.entriesChange, props.hasReset, props.updateSoldFlag, props.entryUpdated]);

    const netBalanceClass = netBalance < 0 ? 'netBalanceNegative' : 'netBalancePositive';
    return(
        <>
            <h1>Balance:</h1>
            <label className={netBalanceClass}>{netBalance}$</label>
        </>
    );
}
export default NetBalance;
