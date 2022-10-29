import successImage from '../images/auth/auth-success.svg';
import errorImage from '../images/auth/auth-error.svg';

function InfoTooltip({ isSignup, isOpen, onClose }) {

    return (
        <section className={`popup popup_type_auth ${isOpen ? "popup_opened" : ""}`}>
            <div className="popup__container">
            <button className="popup__close-button" type="button" onClick={onClose}></button>
            <img className="popup__auth-image" src={isSignup ? successImage : errorImage} alt={isSignup ? "Успешная регистрация." : "Ошибка регистрации."} />
            <h2 className="popup__title">{isSignup ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</h2>
            </div>
        </section>
    );
}

export default InfoTooltip;