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
import {
  CurrentUserContext,
  defaultUser,
} from "../contexts/CurrentUserContext.js";

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
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
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getUserMe(), api.getCards()])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards(cardsData);
      })
      .catch(reportError);
  }, []);

  const isPopupOpen =
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    isEditAvatarPopupOpen ||
    isConfirmPopupOpen ||
    isImagePopupOpen;

  React.useEffect(() => {
    function handleEscClose(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }

    if (isPopupOpen) {
      document.addEventListener("keydown", handleEscClose);
    }
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [isPopupOpen]);

  function handleClickClose(evt) {
    const isClosing = ["popup", "popup__close-btn"].some((cls) =>
      Array.from(evt.target.classList).includes(cls)
    );
    if (isClosing) {
      closeAllPopups();
    }
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

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsConfirmPopupOpen(false);
    setSelectedCard(null);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header />

      <Routes>
        
        <Route path="/sign-up" element={<Register />} />
        <Route path="/sign-in" element={<Login />} />

        <Route
          path="/"
          element={
            <ProtectedRoute
              element={Main}
              loggedIn = {loggedIn}
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

      </Routes>

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onUpdateUser={handleUpdateUser}
        onClose={handleClickClose}
      />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onUpdateAvatar={handleUpdateAvatar}
        onClose={handleClickClose}
      />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onAddPlace={handleAddPlaceSubmit}
        onClose={handleClickClose}
      />

      <ImagePopup
        isOpen={isImagePopupOpen}
        card={selectedCard}
        onClose={handleClickClose}
      />

      {/* popup confirm a card deletion */}
      <PopupWithForm
        name="confirm"
        title="Вы уверены?"
        saveBtnText="Да"
        isOpen={isConfirmPopupOpen}
        onSubmit={handleConfirmCardDelete}
        isValid={true}
        onClose={handleClickClose}
      />

      <Footer />
    </CurrentUserContext.Provider>
  );
}

export default App;
