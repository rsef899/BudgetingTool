import React, { useEffect } from "react";

//componant for purely reseting
function ResetBack(props){
    useEffect(() => {
        console.log("page has been reset")
        fetch("http://localhost:5000/api/reset_table", {
            method: "POST"
          });
    },[props.hasReset])
    
    return null;
}
export default ResetBack;