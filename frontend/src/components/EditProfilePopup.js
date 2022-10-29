import { useState, useEffect, useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import PopupWithForm from './PopupWithForm.js';

function EditProfilePopup(props) {
    const [name, setName] = useState('');
    const [about, setAbout] = useState('');

    const currentUser = useContext(CurrentUserContext);

    useEffect(() => {
        setName(currentUser.name);
        setAbout(currentUser.about);
      }, [currentUser]);
    
    function handleChangeName(event) {
        setName(event.target.value);
    }
    
    function handleChangeAbout(event) {
        setAbout(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        props.onUpdateUser({ name, about });
    };

    return (
        <PopupWithForm name={'profile'} title='Редактировать профиль' isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} buttonText='Сохранить'>
          <input
            className="popup__input popup__input_type_name"
            id="name"
            name="name"
            type="text"
            value={name || ""}
            required
            minLength="2"
            maxLength="40"
            onChange={handleChangeName}
          />
          <span className="popup__error" id="name-error"></span>
          <input
            className="popup__input popup__input_type_about"
            id="about"
            name="about"
            type="text"
            value={about || ""}
            required
            minLength="2"
            maxLength="200"
            onChange={handleChangeAbout}
          />
          <span className="popup__error" id="about-error"></span>
        </PopupWithForm>
    )
}

export default EditProfilePopup;