import React, { useState } from 'react';
import './SoldScreen.css';

const SoldScreen = ({onClose,onSave }) => {
    const [soldPrice, setSoldPrice] = useState('');

    const handleSave = () => {
        onSave(soldPrice);
        onClose();
    };

    return (
        <div className='sold-screen'>
            <div className='sold_content'>
                <span className='close' onClick={onClose}>&times;</span>
                <h2>Sold Price</h2>
                <input
                    type='number'
                    placeholder='Enter Sold Price'
                    value={soldPrice}
                    onChange={(e) => setSoldPrice(e.target.value)}
                />
                <button onClick={handleSave}>Save Price</button>
            </div>
        </div>
    );
};

export default SoldScreen;
