import React, { useState } from "react";
import * as servicesActions from "../../store/services";
import { useDispatch, useSelector } from "react-redux";
import "./FormsCSS/EditServiceForm.css";

function EditServiceForm({ service, setShowModal }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  console.log(service);
  const [title, setTitle] = useState(service.title);
  const [description, setDescription] = useState(service.description);
  const [price, setPrice] = useState(service.price);
  const [hours, setHours] = useState(service.hours);
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    const body = { price, description, title, hours };
    if (!title.length || title.trim().length === 0) return setErrors(["Please Provide a Service Name"]);

    // setShowModal(false);
    return dispatch(servicesActions.updateOneService(service.id, body))
      .then(() => setShowModal(false))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  return (
    <div className="edit__service__form__container">
      {errors.map((error, idx) => (
        <div className="edit__service__errors" key={idx}>
          {error}
        </div>
      ))}

      <form onSubmit={handleSubmit} className="edit__service__form">
        <div>
          <label>
            <div>Title</div>
            <input
              className="edit__service__input"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>
          <label>
            <div>Description</div>
            <textarea
              className="edit__service__text__area"
              type="text"
              cols="50"
              rows="7"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="edit__service__update__container">
          <label>
            <div>Price</div>
            <input
              className="edit__service__input"
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </label>
          <label>
            <div>Time</div>
            <input
              className="edit__service__input"
              type="text"
              value={hours}
              maxLength={1}
              onChange={(e) => setHours(e.target.value)}
              required
            />
          </label>
          <button className="edit__service__buttons" type="submit">
            Update
          </button>
          <div className="edit__service__cancel" onClick={() => setShowModal(false)}>
            Cancel
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditServiceForm;
