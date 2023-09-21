import React from "react";
import { ModalWrapper, Reoverlay } from "reoverlay";

import "reoverlay/lib/ModalWrapper.css";
import styles from "./ModalA.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useDeferredValue } from "react";
import ModalB from "./ModalB";

const getAllContacts = async (q) => {
  const res = await fetch(
    `https://contact.mediusware.com/api/contacts/${q ? "?search=" + q : ""}`
  );
  const allContacts = await res.json();
  return allContacts.results;
};

const getUsContacts = async (q) => {
  const res = await fetch(
    `https://contact.mediusware.com/api/country-contacts/united%20states/${
      q ? "?search=" + q : ""
    }`
  );
  const usContacts = await res.json();
  return usContacts.results;
};

const ModalA = ({ content, onAllContact, onUsContacts }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [contacts, setContacts] = useState(content);
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const navigate = useNavigate();
  const [isEven, setIsEven] = useState(false);
  const closeModal = () => {
    Reoverlay.hideModal();
    navigate("/problem-2");
  };

  const handleAllContacts = async () => {
    navigate("/problem-2?contact=all-contacts");
    Reoverlay.hideModal();
    const allContacts = await getAllContacts();
    Reoverlay.showModal(ModalA, {
      content: allContacts,
    });
  };

  const handleUsContacts = async () => {
    navigate("/problem-2?contact=us-contacts");
    Reoverlay.hideModal();
    const usContacts = await getUsContacts();
    Reoverlay.showModal(ModalA, {
      content: usContacts,
    });
  };

  const handleChange = (e) => {
    if (e.target.checked) {
      setIsEven(true);
    } else {
      setIsEven(false);
    }
  };

  const handleTyping = async (e) => {
    setQuery(e.target.value);
    if (searchParams.get("contact") === "all-contacts") {
      const cont = await getAllContacts(deferredQuery);
      setContacts(cont);
    } else if (searchParams.get("contact") === "us-contacts") {
      const cont = await getUsContacts(deferredQuery);
      setContacts(cont);
    }
  };

  const handleContactClick = (contact, e) => {
    Reoverlay.showModal(ModalB, {
      content: contact,
    });
  };

  return (
    <ModalWrapper>
      <div
        style={{
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "100%",
            padding: "25px 30px",
          }}
        >
          <input
            type="text"
            value={query}
            style={{ width: "100%" }}
            onChange={handleTyping}
          />
        </div>
      </div>
      <div
        style={{
          padding: "25px 50px",
          maxHeight: "90vh",
          // overflow: "auto",
        }}
      >
        <ul
          style={{
            listStyle: "none",
            padding: "0",
            display: "flex",
            flexDirection: "column",
            maxHeight: "70vh",
            overflow: "auto",
          }}
        >
          {contacts?.map((contact) => {
            if (!isEven) {
              return (
                <li className={styles.contact}>
                  <button
                    className={styles.contact}
                    style={{
                      backgroundColor: "transparent",
                      border: "0",
                      width: "100%",
                      padding: "10px 0",
                    }}
                    onClick={handleContactClick.bind("", contact)}
                  >
                    {contact?.phone}
                  </button>
                </li>
              );
            } else {
              if (contact.id % 2 === 0) {
                return (
                  <li className={styles.contact}>
                    <button
                      className={styles.contact}
                      style={{
                        backgroundColor: "transparent",
                        border: "0",
                        width: "100%",
                        padding: "10px 0",
                      }}
                    >
                      {contact?.phone}
                    </button>
                  </li>
                );
              }
            }
          })}
        </ul>
        <div
          style={{
            display: "flex",
            gap: "5px",
            alignItems: "center",
          }}
        >
          <div>
            <input type="checkbox" id="only-even" onChange={handleChange} />
            <label htmlFor="only-even">Only Even</label>
          </div>
          <button
            onClick={handleAllContacts}
            style={{
              backgroundColor: "#46139f",
              color: "white",
              padding: "10px 20px",
              border: "0",
              borderRadius: "5px",
            }}
          >
            All Contacts
          </button>
          <button
            onClick={handleUsContacts}
            style={{
              backgroundColor: "#ff7f50",
              color: "white",
              padding: "10px 20px",
              border: "0",
              borderRadius: "5px",
            }}
          >
            Us Contacts
          </button>
          <button
            onClick={closeModal}
            style={{
              backgroundColor: "white",
              border: "1px solid #46139f",
              color: "black",
              padding: "10px 20px",
              borderRadius: "5px",
            }}
          >
            Close
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default ModalA;
