import React, { useState } from "react";
import "./Popup.css";
import Modal from "react-bootstrap/Modal";

function Popup({
    sendDataToParent,
    users,
    contactList,
    userId,
    show,
    setShow,
}) {
    const [name, setName] = useState("");
    const [nickname, setNickname] = useState("");
    const [server, setServer] = useState("");
    const [contact, setNewContact] = useState("");
    function handleChangeUserName(event) {
        setName(event.target.value);
    }
    function handleChangeNick(event) {
        setNickname(event.target.value);
    }
    function handleChangeServer(event) {
        setServer(event.target.value);
    }
    return (
        <Modal show={show} animation={false}>
            <Modal.Header>
                <Modal.Title>Adding new contact</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <label htmlFor="fname">Username: </label>
                    <input
                        type="text"
                        value={name}
                        onChange={handleChangeUserName}
                    />
                    <br></br>
                    <br></br>
                    <label htmlFor="fname">Nickname: </label>
                    <input
                        type="text"
                        value={nickname}
                        onChange={handleChangeNick}
                    />
                    <br></br>
                    <br></br>
                    <label htmlFor="fname">Server: </label>
                    <input
                        type="text"
                        value={server}
                        onChange={handleChangeServer}
                    />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button
                    type="button"
                    className="btn btn-primary btn-lg"
                    onClick={() => {
                        var newcontact = {
                            contactName: name,
                            userName: userId,
                            server: server,
                            nickName: nickname,
                            last: null,
                            lastDate: null,
                        };
                        var exist = false;
                        localStorage.setItem(
                            "newContact",
                            JSON.stringify(newcontact)
                        );
                        sendDataToParent();
                        setShow(false);
                    }}
                >
                    Add
                </button>
                <button
                    onClick={() => {
                        setShow(false);
                    }}
                    type="button"
                    className="btn btn-secondary btn-lg"
                    data-bs-dismiss="modal"
                >
                    Close
                </button>
            </Modal.Footer>
        </Modal>
    );
}
export default Popup;
