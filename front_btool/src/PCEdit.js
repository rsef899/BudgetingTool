import React, {useState} from "react";
import './PCEdit.css';
const PCEdit = ({ pc, onClose }) => {
    const [editedPC, setEditedPC] = useState(pc);
    const [newComponent,setNewComponent] = useState({component_type:'',name:'',price:''});
    const [deletedComponents, setDeletedComponents] = useState([]);

    const handleChange = (e, index) => {
        const updatedComponents = [...editedPC.components];
        updatedComponents[index][e.target.name] = e.target.value;
        setEditedPC({ ...editedPC, components: updatedComponents });
    };
    const handleDeleteComponent = (index) => {
        const updatedComponents = [...editedPC.components];
        updatedComponents.splice(index, 1);
        setEditedPC({ ...editedPC, components: updatedComponents });
        
        setDeletedComponents([...deletedComponents, editedPC.components[index]]);
    };
    const handleNewComponentType = (e) => {
        setNewComponent({ ...newComponent, component_type: e.target.value });
    }
    const handleNewComponentName= (e) => {
        setNewComponent({ ...newComponent, name: e.target.value });
    };

    const handleNewComponentPrice = (e) => {
        setNewComponent({ ...newComponent, price: e.target.value });
    };
    const handleAddComponent = () => {
        setEditedPC({
            ...editedPC,
            components: [...editedPC.components,newComponent]
        });

        setNewComponent({component_type:'',name:'',price:''});
    };
    // Function to filter out component types that are already present in the PC
    const filterComponentTypes = () => {
        const componentTypes = ['CPU', 'GPU', 'SSD1', 'SSD2', 'RAM', 'Case', 'Additional']; // Define all possible component types
        const pcComponentTypes = editedPC.components.map(component => component.component_type); // Get component types already present in PC
        return componentTypes.filter(type => !pcComponentTypes.includes(type)); // Filter out component types that are already present
    };

    const handleSubmit = (e) => {
        // e.preventDefault();
        // try {
        //     await fetch('/api/update_pc', {
        //         method: 'PUT',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify({ pcId: editedPC.id, editedPCData: editedPC }),
        //     });
        //     // Close the modal or perform other actions
        //     onClose();
        // } catch (error) {
        //     // Handle error
        //     console.error('Error updating PC:', error);
        // }
    };
    const handleDiscardChanges = () => {
        onClose();
    }

    return (
        <div className="modal-overlay">
        <div className="modal">
            <span className="close" onClick={onClose}>&times;</span>
            <h2>Edit PC</h2>
            <form onSubmit={handleSubmit}>
                <div className="component-entries">
                    {/* Display current components */}
                    {editedPC.components.map((component, index) => (
                        <div key={index} className="component-entry">
                            <h3 className="component-label">{component.component_type}:</h3>
                            <div className="component-inputs">
                                <div className="input-group">
                                    <label htmlFor={`componentName${index}`} className="input-label">Name:</label>
                                    <input type="text" id={`componentName${index}`} name="name" value={component.name} onChange={(e) => handleChange(e, index)} className="input-field" />
                                </div>
                                <div className="input-group">
                                    <label htmlFor={`componentPrice${index}`} className="input-label">Price:</label>
                                    <input type="number" id={`componentPrice${index}`} name="price" value={component.price} onChange={(e) => handleChange(e, index)} className="input-field" />
                                </div>
                                <button type="button" onClick={()=>handleDeleteComponent(index)}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Add new component */}
                <div className="new-components">
                    <div className="component-inputs">
                        <label>Component Type:</label>
                        <select value={newComponent.component_type} onChange={handleNewComponentType}>
                            <option value="">Select Component Type</option>
                            {filterComponentTypes().map((type, index) => (
                                <option key={index} value={type}>{type}</option>
                            ))}
                        </select>
                        {newComponent.component_type && (
                            <div>
                                <input type="text" placeholder="Component Name" value={newComponent.name} onChange={handleNewComponentName} />
                                <input type="number" placeholder="Component Price" value={newComponent.price} onChange={handleNewComponentPrice} />
                                <button type="button" onClick={handleAddComponent}>Add Component</button>
                            </div>
                        )}
                        
                    </div>
                    <div className="button-container">
                        <button type="submit">Save Changes</button>
                        <button type="discard" onClick={handleDiscardChanges}>Discard Changes</button>
                    </div>
                </div>
                
            </form>
        </div>
    </div>
    );
};

export default PCEdit;