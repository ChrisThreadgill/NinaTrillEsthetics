import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as servicesActions from "../../store/services";
import * as employeeServicesActions from "../../store/employeeServices";
import "./FormsCSS/EditServiceForm.css";

function EditServiceForm({ service, setShowModal }) {
  const dispatch = useDispatch();
  const employee = useSelector((state) => state.currentEmployee);
  const [title, setTitle] = useState(service.title);
  const [description, setDescription] = useState(service.description);
  const [price, setPrice] = useState(service.price);
  const [hours, setHours] = useState(service.hours);
  const [errors, setErrors] = useState([]);
  const [hoursErr, setHoursErr] = useState([]);
  const [priceErr, setPriceErr] = useState([]);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    setHoursErr([]);
    setPriceErr([]);
    if (hours < 5) {
      setDisabled(false);
    }
    if (price > 1) {
      setDisabled(false);
    }
    if (hours > 5) {
      setDisabled(true);
      setHoursErr(["Services cannot exceed 5 hours"]);
    }
    if (price < 1) {
      setDisabled(true);
      setPriceErr(["Price must be between $1-$999"]);
    }
  }, [hours, price, disabled]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    const body = { price, description, title, hours };
    if (!title.length || title.trim().length === 0) return setErrors(["Please Provide a Service Name"]);

    // setShowModal(false);
    return dispatch(servicesActions.updateOneService(service.id, body))
      .then(() => {
        dispatch(employeeServicesActions.getAllEmployeeServices(employee.id));

        setShowModal(false);
      })

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
      {hoursErr.map((error, idx) => (
        <div className="edit__service__errors" key={idx}>
          {error}
        </div>
      ))}
      {priceErr.map((error, idx) => (
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
              maxLength={72}
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
              maxLength={3}
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
          <button className="edit__service__buttons" type="submit" disabled={disabled}>
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
