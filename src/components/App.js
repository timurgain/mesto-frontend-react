import Header from "./Header.js";
import Register from "./Register.js";
import Login from "./Login.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import ImagePopup from "./ImagePopup.js";
import api from "../utils/api.js";
import ProtectedRoute from "./ProtectedRoute.js";
import * as auth from "./AuthUtils.js";
import {
  CurrentUserContext,
  defaultUser,
} from "../contexts/CurrentUserContext.js";

import AuthUserContext from "../contexts/AuthUserContext.js";

import usePopupClosing from "../hooks/usePopupClosing";

import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState(defaultUser);
  const [authUser, setAuthUser] = React.useState({ email: "none" });
  const [cards, setCards] = React.useState([]);

  const isPopupOpen =
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    isEditAvatarPopupOpen ||
    isConfirmPopupOpen ||
    isImagePopupOpen;

  const { escClose, clickClose } = usePopupClosing(isPopupOpen, closeAllPopups);
  React.useEffect(escClose, [isPopupOpen, escClose]);

  React.useEffect(() => {
    // API, get currentUser and cards according to edu task
    Promise.all([api.getUserMe(), api.getCards()])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards(cardsData);
      })
      .catch(reportError);

    // another API, check authUser token according to edu task
    const token = localStorage.getItem("token");
    if (token) {
      auth
        .authorize(token)
        .then((data) => {
          if (data.data.email) {
            setLoggedIn(true);
            setAuthUser(data.data);
            navigate("/", { replace: true });
          }
        })
        .catch(reportError);
    }
  }, [navigate]);

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsConfirmPopupOpen(false);
    setSelectedCard(null);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  function handleLikeClick(card) {
    const isLiked = card.likes.some((like) => currentUser._id === like._id);
    if (isLiked) {
      api.deleteLike(card._id).then(updateCardsList).catch(reportError);
    } else {
      api.putLike(card._id).then(updateCardsList).catch(reportError);
    }
  }

  function handleCardDelete(card) {
    setSelectedCard(card);
    setIsConfirmPopupOpen(true);
  }

  function handleConfirmCardDelete(evt) {
    evt.preventDefault();
    if (currentUser._id === selectedCard.owner._id) {
      api
        .deleteCard(selectedCard._id)
        .then(() => {
          cutCardsList(selectedCard);
          closeAllPopups();
        })
        .catch(reportError);
    }
  }

  function updateCardsList(updCard) {
    setCards((stateCards) =>
      stateCards.map((card) => (card._id === updCard._id ? updCard : card))
    );
  }

  function cutCardsList(cutCard) {
    setCards((stateCards) =>
      stateCards.filter((card) => card._id !== cutCard._id)
    );
  }

  function handleUpdateUser({ name, about }) {
    api
      .patchUserMe(name, about)
      .then((updUser) => {
        setCurrentUser(updUser);
        closeAllPopups();
      })
      .catch(reportError);
  }

  function handleUpdateAvatar({ link }) {
    api
      .patchUserMeAvatar(link)
      .then((updUser) => {
        setCurrentUser(updUser);
        closeAllPopups();
      })
      .catch(reportError);
  }

  function handleAddPlaceSubmit({ link, name }) {
    api
      .postCard(link, name)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(reportError);
  }

  function handleLogin() {
    setLoggedIn(true);
  }

  function handleLogout() {
    console.log('handleLogout')
    localStorage.removeItem('token');
    setLoggedIn(false);
    navigate('/sign-in', {replace: true});
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <AuthUserContext.Provider value={{ loggedIn, authUser }}>
        <Header onLogout={handleLogout} />

        <Routes>

          <Route path="/sign-up" element={<Register />} />
          <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />
          <Route element={<ProtectedRoute />}>
            <Route
              path="/"
              element={
                <Main
                  cards={cards}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  handleCardClick={handleCardClick}
                  handleLikeClick={handleLikeClick}
                  handleCardDelete={handleCardDelete}
                />
              }
            />
          </Route>

        </Routes>

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onUpdateUser={handleUpdateUser}
          onClose={clickClose}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onUpdateAvatar={handleUpdateAvatar}
          onClose={clickClose}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onAddPlace={handleAddPlaceSubmit}
          onClose={clickClose}
        />

        <ImagePopup
          isOpen={isImagePopupOpen}
          card={selectedCard}
          onClose={clickClose}
        />

        {/* popup confirm a card deletion */}
        <PopupWithForm
          name="confirm"
          title="Вы уверены?"
          saveBtnText="Да"
          isOpen={isConfirmPopupOpen}
          onSubmit={handleConfirmCardDelete}
          isValid={true}
          onClose={clickClose}
        />

        <Footer />
      </AuthUserContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
