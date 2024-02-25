import React, { useState } from 'react';

/* PCEntry represents every PC individually*/
const PCEntry = ({ pc,onClick }) => {

    const handleClick = () => {
        onClick(pc.id);
    };

    return (
        <div className="pcBox" onClick={handleClick}>
            <div className = "pcName">
                <h3>  {pc.name}</h3>
                <div className = "total_price" >
                    <p>Total Price: ${pc.total_price}</p>
                    <ul>
                        {pc.components.map(component => (
                            <li key={component.id} className="componentListLayout">
                                {component.component_type}: {component.name} - Price: ${component.price}
                            </li>
                        ))}
                    </ul>
                    {pc.sold_price != null && <p> Sold Price: ${pc.sold_price}</p>}
                    {pc.sold_price != null && <h3> Profit: ${pc.sold_price - pc.total_price} </h3>}
                </div>
            </div>
        </div>
    );
};

export default PCEntry;