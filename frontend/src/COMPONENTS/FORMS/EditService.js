import React, { useState } from "react";
import * as servicesActions from "../../store/services";
import { useDispatch, useSelector } from "react-redux";

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
    setShowModal(false);
    return dispatch(servicesActions.updateOneService(service.id, body)).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <label>
        Title
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </label>
      <label>
        Description
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
      </label>
      <label>
        Price
        <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} required />
      </label>
      <label>
        Hours
        <input type="text" value={hours} onChange={(e) => setHours(e.target.value)} required />
      </label>
      <button type="submit">Update</button>
    </form>
  );
}

export default EditServiceForm;
