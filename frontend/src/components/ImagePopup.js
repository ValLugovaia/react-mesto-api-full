function ImagePopup(props) {
    return (
        <section className={`popup popup_type_view ${props.card ? "popup_opened" : ""}`}>
            <div className="popup__container-view">
            <button className="popup__close-button" name="close-view" type="button" onClick={props.onClose}></button>
            <form className="popup__form-view" name="view">
                <img className="popup__view-photo" src={props.card?.link} alt={`Фото ${props.card?.name}.`} />
                <p className="popup__view-title">{props.card?.name}</p>
            </form>
            </div>
        </section>
    );
}

export default ImagePopup;