import React, { useState } from "react";
import Modal from "react-modal";
import { useHistory } from "react-router-dom";
Modal.setAppElement("#root");

const HomeModal = ({ modalIsOpen, setIsOpen }) => {
  const history = useHistory();
  const [id, setId] = useState("");
  const afterOpenModal = () => {
    // references are now sync'd and can be accessed.
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  const submit = (e) => {
    if (e.keyCode === 13) {
      history.push(`/join?id=${id}`);
    }
  };
  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <span className="flex items-center border-b border-nt-red-main py-2">
          <input
            value={id}
            onChange={(e) => {
              setId(e.target.value);
            }}
            onKeyDown={submit}
            className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Enter room id"
            aria-label="Full name"
          />
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

export default HomeModal;
