import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import * as servicesActions from "../../store/services.js";
import * as employeeServicesActions from "../../store/employeeServices";
import EditServiceModal from "../Modals/EditService.js";

import "react-datepicker/dist/react-datepicker.css";

function DatePickerTest() {
  //
  const dispatch = useDispatch();

  const services = useSelector((state) => state.services);
  const sessionUser = useSelector((state) => state.session);
  const employeeServices = useSelector((state) => state.employeeServices);

  //MANAGER ADDITION OF SERVICE
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [hours, setHours] = useState("");

  //EMPLOYEE ADDING SERVICE
  const [employeeServiceId, setEmployeeServiceId] = useState("");

  const handleDelete = (serviceId) => {
    dispatch(servicesActions.deleteOneService(serviceId));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const service = { title, description, price, hours };
    dispatch(servicesActions.addOneService(service));
  };

  const addEmployeeService = async (e) => {
    e.preventDefault();
    dispatch(employeeServicesActions.addServiceRelation(sessionUser.user.id, employeeServiceId));
  };

  const removeService = (serviceId, userId) => {
    dispatch(employeeServicesActions.deleteOneService(serviceId, userId));
  };

  useEffect(() => {
    dispatch(servicesActions.getAllServices());
    dispatch(employeeServicesActions.getAllEmployeeServices(sessionUser.user.id));
  }, [dispatch]);

  return (
    <>
      <h1>SUBMIT NEW SERVICE FORM</h1>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          className="add__boat__inputs"
          type="text"
          name="model"
          value={title}
          maxLength={85}
          required
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <label>description</label>
        <input
          className="add__boat__inputs"
          type="text"
          name="model"
          value={description}
          maxLength={85}
          required
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <label>price</label>
        <input
          className="add__boat__inputs"
          type="text"
          name="model"
          value={price}
          maxLength={85}
          required
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        />
        <label>hours</label>
        <input
          className="add__boat__inputs"
          type="text"
          name="model"
          value={hours}
          maxLength={85}
          required
          onChange={(e) => {
            setHours(e.target.value);
          }}
        />
        <button>new service</button>
      </form>

      {Object.values(services).map((service, idx) => {
        return (
          <div key={idx}>
            <h1>{service.title}</h1>
            <div>{service.description}</div>
            <div>Price: {service.price}</div>
            <div>Hours: {service.hours}</div>
            <EditServiceModal service={service}></EditServiceModal>
            <button
              onClick={(e) => {
                e.preventDefault();
                handleDelete(service.id);
              }}
            >
              Delete
            </button>
          </div>
        );
      })}
      <div>==================================================================================================</div>
      <h1>ADD USER/EMPLOYEE SERVICE</h1>
      <form onSubmit={addEmployeeService}>
        <select value={employeeServiceId} onChange={(e) => setEmployeeServiceId(e.target.value)}>
          {Object.values(services).map((service, idx) => {
            return <option value={service.id}>{service.title}</option>;
          })}
        </select>
        <button>submit</button>
      </form>
      <h3>Employee's Services</h3>
      {Object.values(employeeServices).map((employeeService) => {
        return (
          <div>
            <h1>{employeeService.title}</h1>
            <div>{employeeService.description}</div>
            <div>{employeeService.price}</div>
            <div>{employeeService.hours}</div>
            <button
              onClick={() => {
                removeService(employeeService.id, sessionUser.user.id);
              }}
            >
              Remove Service
            </button>
          </div>
        );
      })}
    </>
  );
}

export default DatePickerTest;
