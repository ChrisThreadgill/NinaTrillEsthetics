import "./FormsCSS/NewServiceForm.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as servicesActions from "../../store/services.js";
import EditServiceModal from "../Modals/EditService";

function NewServiceForm() {
  //
  const dispatch = useDispatch();

  const services = useSelector((state) => state.services);
  const sessionUser = useSelector((state) => state.session);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [hours, setHours] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const service = { title, description, price, hours };
    if (!title.length || title.trim().length === 0) return setErrors(["Please Provide a Service Name"]);
    dispatch(servicesActions.addOneService(service))
      .then(() => {
        setErrors([]);
        setTitle("");
        setPrice("");
        setDescription("");
        setHours("");
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  const handleDelete = (serviceId) => {
    dispatch(servicesActions.deleteOneService(serviceId));
  };

  return (
    <div className="new__service__container">
      {/* <h1>SUBMIT NEW SERVICE FORM</h1> */}
      <div className="new__service__form__container">
        <div className="new__service__header">New Service</div>
        <ul>
          {errors.map((error, idx) => (
            <div className="new__service__error" key={idx}>
              {error}
            </div>
          ))}
        </ul>
        <form onSubmit={handleSubmit} className="new__service__form">
          <div className="new__service__description__container">
            <label>Name</label>
            <input
              className="new__service__add__input"
              type="text"
              name="model"
              value={title}
              maxLength={85}
              required
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <label>Description</label>
            <textarea
              className="new__service__text__area"
              type="text"
              name="model"
              value={description}
              maxLength={85}
              cols="40"
              rows="5"
              required
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </div>
          <div className="new__service__price__submit">
            <div>
              <label>$</label>
              <input
                className="new__service__add__input"
                type="text"
                name="model"
                value={price}
                maxLength={3}
                required
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
            </div>
            <div>
              <label>Hours</label>
              <input
                className="new__service__add__input"
                type="text"
                name="model"
                value={hours}
                maxLength={1}
                required
                onChange={(e) => {
                  setHours(e.target.value);
                }}
              />
            </div>
            <button className="new__service__button">new service</button>
          </div>
        </form>
      </div>
      <div className="employee__all__services__container">
        {Object.values(services).map((service, idx) => {
          return (
            <div key={idx} className="employee__service__container">
              <div>
                <div className="employee__service__title">{service.title}</div>
                <div className="employee__service__price">${service.price}</div>
                <div>Time: {service.hours}</div>
              </div>
              <div className="employee__service__edit__container">
                <EditServiceModal service={service}></EditServiceModal>
                <div
                  className="employee__service__delete"
                  onClick={(e) => {
                    e.preventDefault();
                    handleDelete(service.id);
                  }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default NewServiceForm;
