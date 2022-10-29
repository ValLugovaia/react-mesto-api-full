import { useEffect, useRef } from 'react';
import PopupWithForm from './PopupWithForm.js';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
    const avatarRef = useRef();

    useEffect(() => {
        avatarRef.current.value = "";
    }, [isOpen]);

    function handleSubmit(event) {
        event.preventDefault();

        onUpdateAvatar({
        avatar: avatarRef.current.value,
      });
    }

    return (
        <PopupWithForm name={'avatar'} title='Обновить аватар' isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} buttonText='Сохранить'>
          <input
            className="popup__input popup__input_type_link"
            id="avatar"
            name="avatar"
            type="url"
            placeholder="Ссылка на фото"
            required
            minLength="8"
            ref={avatarRef}
          />
          <span className="popup__error" id="about-error"></span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;