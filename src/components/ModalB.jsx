import React from "react";
import { ModalWrapper, Reoverlay } from "reoverlay";

import "reoverlay/lib/ModalWrapper.css";

export default ({ content }) => {
  console.log(content);
  const closeModal = () => {
    Reoverlay.hideModal();
  };

  return (
    <ModalWrapper>
      <div
        style={{
          padding: "25px",
        }}
      >
        <p>
          <strong>Contact Id:</strong> {content.id}
        </p>
        <p>
          <strong>Contact Number:</strong> {content.phone}
        </p>
        <p>
          <strong>Country Id:</strong> {content.country.id}
        </p>
        <p>
          <strong>Country Name:</strong> {content.country.name}
        </p>
        <button
          onClick={closeModal}
          style={{
            display: "block",
            margin: "0 auto",
            padding: "5px 15px",
            border: "0",
            backgroundColor: "crimson",
            color: "white",
          }}
        >
          Close
        </button>
      </div>
    </ModalWrapper>
  );
};
