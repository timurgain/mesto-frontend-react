import React from "react";
import { useNavigate } from "react-router-dom";
import successIconPath from "../images/success_icon.svg";
import failIconPath from "../images/fail_icon.svg";


function InfoTooltip({ isOpen, isSuccessful, onClose, ...props }) {

  const navigate = useNavigate();

  React.useEffect(() => {
    if (isSuccessful && !isOpen) {
      console.log('redirect ...')
      navigate('/sign-in', {replace: true});
    }
  }, [isOpen, isSuccessful, navigate])

  function getIconPath() {
    if (isSuccessful) return successIconPath;
    if (!isSuccessful) return failIconPath;
  }

  function getMsg() {
    if (isSuccessful) return 'Вы успешно зарегистрировались!';
    if (!isSuccessful) return 'Что-то пошло не так! Попробуйте еще раз.';
  }

  return (
    <div
      className={isOpen ? `popup popup_opened` : `popup`}
      aria-label="Info Tooltip popup"
      onMouseDown={onClose}
    >
      <div className={`popup__container popup__container_type_tooltip`}>
        <button className="popup__close-btn" type="button" />

        <img className="popup__sign" src={getIconPath()} alt="Значок" />

        <p className="popup__info-tooltip">{getMsg()}</p>
      </div>
    </div>
  );
}

export default InfoTooltip;
