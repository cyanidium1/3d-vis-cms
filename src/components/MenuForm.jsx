// src/components/MenuForm.js
import React, { useState, useEffect } from 'react';

const MenuForm = ({ onAddItem, cloudName, apiKey, apiSecret, uploadPreset }) => {
    const [itemName, setItemName] = useState('');
    const [imageName, setImageName] = useState('');
    const [imageURL, setImageURL] = useState('');

    useEffect(() => {
        // Initialize Cloudinary widget
        const widget = window.cloudinary.createUploadWidget(
            {
                cloudName: cloudName,
                apiKey: apiKey,
                uploadPreset: uploadPreset,
                sources: ['local', 'url'],
            },
            (error, result) => {
                if (!error && result && result.event === 'success') {
                    setImageURL(result.info.secure_url);
                }
            }
        );

        // Attach event listener to open Cloudinary widget on button click
        document.getElementById('upload_widget').addEventListener('click', () => {
            widget.open();
        });
    }, [cloudName, apiKey, uploadPreset]);

    const handleItemNameChange = (event) => {
        setItemName(event.target.value);
    };

    const handleImageNameChange = (event) => {
        setImageName(event.target.value);
    };

    const handleAddItem = () => {
        onAddItem(itemName, imageURL, imageName);
        setItemName('');
        setImageName('');
        setImageURL('');
    };

    return (
        <div>
            <h2>Добавить новое блюдо</h2>
            <label>
                Название блюда:
                <input type="text" value={itemName} onChange={handleItemNameChange} />
            </label>
            <br />
            <label>
                Название изображения:
                <input type="text" value={imageName} onChange={handleImageNameChange} />
            </label>
            <br />
            <button id="upload_widget">Выбрать изображение</button>
            <br />
            {imageURL && <img src={imageURL} alt="Preview" style={{ maxWidth: '300px' }} />}
            <br />
            <button onClick={handleAddItem}>Добавить блюдо</button>
        </div>
    );
};

export default MenuForm;
