import React, { useState, useEffect } from "react";
import './Functionality.css';

function Table(props){
    const [tableHtml, setTableHtml] = useState("");
    
    useEffect(() => {
        fetch("http://localhost:5000/api/get_table")
          .then(response => response.json())
          .then(data => setTableHtml(data.table_html))
          .catch(error => console.error(error));
      }, [props.entriesChange]);
    return(
        /* This renders the string as an html command*/
        <div dangerouslySetInnerHTML={{ __html: tableHtml }} className="itemsTable"></div>);
}
export default Table;