import iconPath from "../images/success_icon.svg";

function InfoTooltip({ isOpen, isSuccess, onClose, ...props }) {
  return (
    <div
      className={isOpen ? `popup popup_opened` : `popup`}
      aria-label="Info Tooltip popup"
      onMouseDown={onClose}
    >
      <div className={`popup__container popup__container_type_tooltip`}>
        <button className="popup__close-btn" type="button" />

        <img className="popup__sign" src={iconPath} alt="Значок" />

        <p className="popup__info-tooltip">Вы успешно зарегистрировались!</p>
      </div>
    </div>
  );
}

export default InfoTooltip;
