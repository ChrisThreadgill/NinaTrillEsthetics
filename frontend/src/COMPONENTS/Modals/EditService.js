import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import EditServiceForm from "../FORMS/EditService";

function EditServiceModal({ service }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Edit Service</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditServiceForm service={service} setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default EditServiceModal;
