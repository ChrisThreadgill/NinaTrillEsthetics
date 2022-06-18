import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import AppointmentEditForm from "../FORMS/AppointmentEdit";

function AppointmentEditModal({ appointmentId }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="customer__appointment__reschedule" onClick={() => setShowModal(true)}>
        Reschedule
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <AppointmentEditForm appointmentId={appointmentId} setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default AppointmentEditModal;
