const Modal = (props) => {
  return (
    <div
      className={`modal__wrapper ${props.isOpened ? "open" : "close"}`}
      style={{ ...props.style }}
    >
      <div className="modal__body">
        <div className="modal__close" onClick={props.onModalClose}>
          x
        </div>
        {props.children}
      </div>
    </div>
  );
};

export default Modal;
