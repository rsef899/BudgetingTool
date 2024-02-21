import React, {useState, useEffect} from 'react';
import Header from './Header';

function PcPage(){
    // States
    const [showPopup, setShowPopup] = useState(false);
    const [pcName,setPCName] = useState('');
    const [selectedComponent, setSelectedComponent] = useState('');
    const [componentName, setComponentName] = useState('');
    const [componentPrice, setComponentPrice] = useState('');
    const [pcComponents, setPcComponents] = useState([]);
    const [pcs,setPcs] = useState([]);

    // Useful Functions

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    const handlePCNameChange = (event) => {
        setPCName(event.target.value);
    }
    const handleComponentTypeChange = (event) => {
        setSelectedComponent(event.target.value);
    };

    // Function to handle component name input
    const handleComponentNameChange = (event) => {
        setComponentName(event.target.value);
    };

    // Function to handle component price input
    const handleComponentPriceChange = (event) => {
        setComponentPrice(event.target.value);
    };

    // Function to handle adding a new component
    const handleAddComponent = () => {
        
        const existingComponent = pcComponents.find(component => component.type === selectedComponent);
        // If the user has already used this component beforehand we just update the name and price of the component
        if (existingComponent) {
            existingComponent.name = componentName;
            existingComponent.price = componentPrice;
            setPcComponents([...pcComponents]);
        } else {
            // Create a new component object
            const newComponent = {
                type: selectedComponent,
                name: componentName,
                price: componentPrice
            };
            // Add the new component to the pcComponents array
            setPcComponents([...pcComponents, newComponent]);
            // Reset component fields after adding
            
        }
        setSelectedComponent('');
        setComponentName('');
        setComponentPrice('');
    };
    const handleSubmitPC = () => {
        const newPc =  {
            pc_data: {
                name:pcName
            },
            pc_components:pcComponents
        };
        fetch('http://localhost:5000/api/submit_pc',{
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(newPc)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.message);
            fetch_pcs();
        })
        .catch(error=> {
            console.error('Error submitting PC',error)
        });
    };

    // Function to fetch all the pcs in the database, can be called whenever
    const fetch_pcs = () => {
        fetch('http://localhost:5000/api/fetch_pcs')
            .then(response => response.json())
            .then(data => {
                setPcs(data);
            })
            .catch(error => console.error('Error fetching PCs',error))
    };


    useEffect(() => {
        fetch_pcs();
    },[]);

    return(
        <div>
            <div class="PcPageMainDiv">
                <Header/>
                <h1>This is the PC Page</h1>
                </div>
            
            <div className='newPCButton' >
                <button onClick={togglePopup}>Add New PC</button>
            </div>

            

            {showPopup && (
                <div className='popup'>
                    <span className='close' onClick={togglePopup}>&times;</span>
                    <h2>Add PC</h2>
                    {/* Dropdown to select component type */}
                    <label>PC Name:</label>
                    <input type='text' placeholder= 'PC Name' value={pcName} onChange={handlePCNameChange}></input>
                    <select value={selectedComponent} onChange={handleComponentTypeChange}>
                        <option value="">Select Component Type</option>
                        <option value="CPU">CPU</option>
                        <option value="GPU">GPU</option>
                        <option value="SSD1">SSD1</option>
                        <option value="SSD2">SSD2</option>
                        <option value="RAM">RAM</option>
                        <option value="Case">Case</option>
                        <option value="Additional">Additional</option>
                    </select>
                    {selectedComponent && (
                        <div>
                            <input type="text" placeholder="Component Name" value={componentName} onChange={handleComponentNameChange} />
                            <input type="number" placeholder="Component Price" value={componentPrice} onChange={handleComponentPriceChange} />
                            <button onClick={handleAddComponent}>Add Component</button>
                        </div>
                    )}
                    {/* Display the list of current PC components */}
                    <div className='pcComponentList'>
                        <h2>PC Components</h2>
                        <ul>
                            {pcComponents.map((component, index) => (
                                <li key={index}>
                                    {component.type} - {component.name} - ${component.price}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className='submitButton'>
                        <button onClick={handleSubmitPC}>Submit</button>
                    </div>
                </div>
            )}
            {/* Display fetched PCs */}
            <div className="pcsList">
                <h2>Fetched PCs</h2>
                <ul>
                    {pcs.map(pc => (
                        <li key={pc.id}>
                            {pc.name} - Total Price: ${pc.total_price}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        

    );
}

export default PcPage;