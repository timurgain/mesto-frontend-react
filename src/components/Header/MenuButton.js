import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthUserContext from "../../contexts/AuthUserContext.js";

function MenuButton({ onClick, isMenuOpened, ...props }) {


  return (
      <button
        className="header__menu-btn"
        type="button"
        onClick={() => {}}
      />
  );
}

export default MenuButton;
