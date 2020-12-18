import React,{useState} from "react";
import Loading from "../../pages/Loading";
import {useHistory} from "react-router-dom";
import authRequest from "../../utils/authRequest";
import Modal from "react-modal";
Modal.setAppElement("#root");

const DeleteModal = ({ modalIsOpen, setIsOpen, id }) => {
  const [loading,setLoading] = useState(false);
  const history = useHistory();
  const closeModal = () => {
    setIsOpen(false);
  };

  const handleClick = async () => {
    try {
      if (!id) return;
      setLoading(true)
      await authRequest(`/room/delete?id=${id}`);
      history.push("/");
    }catch (err) {
      setLoading(false);
      setIsOpen(false);
    }
  };

  if (!loading)

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <span className="flex items-center py-2 text-nt-red-main align-center ">
          Are you sure you wanna delete the room?

          <button
            onClick={handleClick}
            className="bg-nt-red-accent hover:bg-red-500 mx-4  p-2 rounded-full shadow-md flex justify-center items-center"
          >
            <svg
              className="text-white toggle__lock w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokelinecap="round"
                strokelinejoin="round"
                strokewidth="{2}"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </span>
      </Modal>
    </>
  );
  else 
    return <Loading />
};

const customStyles = {
  overlay: {},
  content: {
    display: "grid",
    background: "black",
    gridTemplateRows: "1fr auto 1fr",
    color: "white",
    height: "100px",
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

export default DeleteModal;
