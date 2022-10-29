import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
    const currentUser = useContext(CurrentUserContext);

    function handleClick() {
        onCardClick(card);
    }

    function handleLikeClick() {
        onCardLike(card);
    }
    
    function handleDeleteClick() {
        onCardDelete(card);
    }

    const isOwn = card.owner._id === currentUser._id;
    const cardDeleteButtonClassName = (
        `card__delete-button ${isOwn ? 'card__delete-button_visible' : 'card__delete-button_hidden'}`
    );

    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = `card__like-button ${isLiked && 'card__like-button_active'}`; 
    
    return (
        <div className="card">
            <button className={cardDeleteButtonClassName} onClick={handleDeleteClick} type="button" />
            <img className="card__image" src={card.link} alt={`Фото ${card.name}.`} onClick={handleClick} />
            <div className="card__caption">
                <h2 className="card__title">{card.name}</h2>
                <div className="card__like" onClick={handleLikeClick}>
                    <button className={cardLikeButtonClassName} onClick={handleLikeClick} type="button"></button>
                    <span className="card__like-number">{card.likes.length}</span>
                </div>
            </div>
        </div>
    )
  } 
  
  export default Card; 