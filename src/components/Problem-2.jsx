import React from "react";
import { Reoverlay } from "reoverlay";
import ModalA from "./ModalA";
import { useNavigate } from "react-router-dom";

const getAllContacts = async () => {
  const res = await fetch("https://contact.mediusware.com/api/contacts/");
  const allContacts = await res.json();
  return allContacts.results;
};

const getUsContacts = async () => {
  const res = await fetch(
    "https://contact.mediusware.com/api/country-contacts/united%20states/"
  );
  const usContacts = await res.json();
  return usContacts.results;
};

const Problem2 = () => {
  const navigate = useNavigate();
  const handleAllContacts = async () => {
    navigate("/problem-2?contact=all-contacts");
    Reoverlay.hideAll();
    const allContacts = await getAllContacts();
    Reoverlay.showModal(ModalA, {
      content: allContacts,
    });
  };

  const handleUsContacts = async () => {
    navigate("/problem-2?contact=us-contacts");
    Reoverlay.hideAll();
    const usContacts = await getUsContacts();
    Reoverlay.showModal(ModalA, {
      content: usContacts,
    });
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

        <div className="d-flex justify-content-center gap-3">
          <button
            className="btn btn-lg btn-outline-primary"
            type="button"
            onClick={handleAllContacts}
          >
            All Contacts
          </button>
          <button
            className="btn btn-lg btn-outline-warning"
            type="button"
            onClick={handleUsContacts}
          >
            US Contacts
          </button>
        </div>
      </div>
    </div>
  );
};

export default Problem2;
