import React from "react";
import Modal from "react-modal";
Modal.setAppElement("#root");

const InviteModal = ({ modalIsOpen, setIsOpen, id }) => {
  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <span className="flex items-center text-nt-red-main underline py-2">
          link
        </span>
      </Modal>
    </>
  );
};

const customStyles = {
  overlay: {},
  content: {
    display: "grid",
    background: "black",
    gridTemplateRows: "1fr auto 1fr",
    color: "white",
    height: "10vh",
    width: "50vw",
    borderRadius: "0.25rem",
    top: "10%",
    left: "50%",
    right: "auto",
    borderStyle: "none",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export default InviteModal;
