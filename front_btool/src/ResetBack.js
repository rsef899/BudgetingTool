import React, { useEffect } from "react";

//componant for purely reseting
function ResetBack(props){
    useEffect(() => {
        console.log("page has been reset")
        fetch("http://139.144.99.223:5000/api/reset_table", {
            method: "POST"
          });
          props.addhasReset();
    },[])
    
    return null;
}
export default ResetBack;