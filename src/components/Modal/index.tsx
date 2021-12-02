import React from "react";
// import history from "../../History";
import { useHistory } from "react-router-dom";
interface modalProps {
  id: string;
  title: string;
  description: string;
  timer: number;
  button: string;
  active: boolean;
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal: React.FC<modalProps> = ({
  timer,
  title,
  description,
  button,
  id,
  active,
  closeModal,
}) => {
  const history = useHistory();
  const openModal = () => {
    setTimeout(() => {
      closeModal(false);
    }, timer * 1000);
  };

  if (active) {
    openModal();
  }
  const modalOpen = active ? "modal-open" : "";
  return (
    <>
      <div id={id} className={"modal " + modalOpen}>
        <div className="modal-box">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            {title}
          </h3>
          <p>{description}</p>
          <div className="modal-action">
            <a onClick={() => closeModal(false)} className="btn">
              {button}
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
