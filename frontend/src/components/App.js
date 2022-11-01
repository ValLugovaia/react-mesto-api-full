/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import api from '../utils/Api.js';
import { register, authorize, getContent, logout } from '../utils/Auth.js';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import Register from './Register.js';
import Login from './Login.js';
import ProtectedRoute from './ProtectedRoute.js';
import InfoTooltip from './InfoTooltip.js';

function App() {
  const history = useHistory();
  const [isEditAvatarPopupOpen, setEditAvatarPopup] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopup] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopup] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopup] = useState(false); 
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [currentUser, setCurrentUser] = useState({});

  function onRegister(email, password) {
    return register(email, password)
      .then((res) => {
        if (res.data._id) {
          setIsSignup(true);
          setIsInfoTooltipPopup(true);
          history.push("/sign-in");
        }
      })
      .catch(err => {
        console.log(err);
        setIsSignup(false);
        setIsInfoTooltipPopup(true);
      });
  }

  function onLogin(email, password) {
    return authorize(email, password)
    .then((res) => {
      console.log(res);
      if (res) {
        localStorage.setItem('jwt', res.token);
        setEmail(email);
        setLoggedIn(true);
        history.replace({ pathname: "/" });
      }
    })
      .catch(err => {
        console.log(err);
        setIsInfoTooltipPopup(true);
      });
  }

  function onSignOut() {
    return logout()
        .then(() => {
          localStorage.removeItem('token');
          setEmail('');
          setLoggedIn(false);
          history.push("/sign-in");
        })
        .catch(err => {
          console.log(err)
        });
  }

  function tokenCheck() {
    const token = localStorage.getItem('jwt');
    if (token) {
      getContent(token)
        .then((res) => {
          setEmail(res.email);
          setLoggedIn(true);
          history.push("/");
        })
        .catch(err => {
          console.log(err)
        });
      }
  }

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([data, cards]) => {
          console.log(cards);
          setCurrentUser(data);
          setCards(cards);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  useEffect(() => {
    tokenCheck();
  }, [history]);

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch(err => {
      console.log(err)
    });
}

  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
        setCards((state) => state.filter((deleteCard) => deleteCard._id !== card._id));
      })
      .catch(err => {
        console.log(err)
      });
  }

  function handleUpdateUser({ name, about }) {
    api.changeUserInfo({ name, about }).then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err)
      });
  }

  function handleUpdateAvatar(avatar) {
    api.editAvatar(avatar).then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err)
      });
  }

  function handleAddPlaceSubmit(data) {
    api.addCard(data).then((data) => {
        setCards([data, ...cards]);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err)
      });
  }

  function handleEditAvatarClick() {
    setEditAvatarPopup(true);
  };

  function handleEditProfileClick() {
    setIsEditProfilePopup(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopup(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setEditAvatarPopup(false);
    setIsEditProfilePopup(false);
    setIsAddPlacePopup(false);
    setIsInfoTooltipPopup(false)
    setSelectedCard(null);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <Header userEmail={email} onSignOut={onSignOut} />
        <Switch>
          <ProtectedRoute exact path="/" loggedIn={loggedIn} component={Main} cards={cards} onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onCardClick={handleCardClick} onCardLike={handleCardLike} onCardDelete={handleCardDelete} />
          <Route path="/sign-up">
            <Register onRegister={onRegister} />
          </Route>
          <Route path="/sign-in">
            <Login onLogin={onLogin} />
          </Route>
          <Route>{loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}</Route>
        </Switch>
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onUpdatePlace={handleAddPlaceSubmit} />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <InfoTooltip isSignup={isSignup} isOpen={isInfoTooltipPopupOpen} onClose={closeAllPopups} />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;