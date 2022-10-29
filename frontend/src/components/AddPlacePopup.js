import { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm.js'; 

function AddPlacePopup({ isOpen, onClose, onUpdatePlace }) {
    const [link, setLink] = useState('');
    const [name, setName] = useState('');

    function handleChangePlaceLink(event) {
        setLink(event.target.value);
    }

    function handleChangePlaceName(event) {
        setName(event.target.value);
    }

    useEffect(() => {
        setName('');
        setLink('');
    }, [isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        onUpdatePlace({ name, link });
    }

    return (
        <PopupWithForm name={'photo'} title='Новое место' isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} buttonText='Сохранить'>
          <input
            className="popup__input popup__input_type_title"
            id="title"
            name="name"
            type="text"
            placeholder="Название"
            required
            minLength="2"
            maxLength="30"
            onChange={handleChangePlaceName}
            value={name || ""}
          />
          <span className="popup__error" id="title-error"></span>
          <input
            className="popup__input popup__input_type_link"
            id="url"
            name="link"
            type="url"
            placeholder="Ссылка на картинку"
            required
            minLength="8"
            onChange={handleChangePlaceLink}
            value={link || ""}
          />
          <span className="popup__error" id="url-error"></span>
        </PopupWithForm>
    )
}

export default AddPlacePopup;