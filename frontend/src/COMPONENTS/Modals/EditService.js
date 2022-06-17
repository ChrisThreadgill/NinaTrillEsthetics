import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import EditServiceForm from "../FORMS/EditService";
import "./EditService.css";

function EditServiceModal({ service }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="edit__service__modal__quill" onClick={() => setShowModal(true)}></div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditServiceForm service={service} setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default EditServiceModal;
