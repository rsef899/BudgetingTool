import React from 'react';

/* PCEntry represents every PC individually*/
const PCEntry = ({ pc,onClick }) => {
    const handleClick = () => {
        onClick(pc.id);
    }
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
                </div>
            </div>
        </div>
    );
};

export default PCEntry;