import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./EmployeeServicesCSS/EmployeeServices.css";
import * as employeeServicesActions from "../../../store/employeeServices";

function EmployeeServices() {
  const dispatch = useDispatch();
  const services = useSelector((state) => state.services);
  const sessionUser = useSelector((state) => state.session);
  const employeeServices = useSelector((state) => state.employeeServices);
  const employeeServicesArr = Object.values(employeeServices);
  const servicesArr = Object.values(services);
  // const employeeServicesIdArr = employeeServicesArr.filter((employeeService) => {
  //   employeeServicesArr.includes(employeeService);

  //   return employeeService.id;
  // });

  const [employeeServiceId, setEmployeeServiceId] = useState("");
  //

  const removeService = (serviceId, userId) => {
    dispatch(employeeServicesActions.deleteOneService(serviceId, userId));
  };
  const addEmployeeService = async (e) => {
    e.preventDefault();
    dispatch(employeeServicesActions.addServiceRelation(sessionUser.user.id, employeeServiceId));
  };
  return (
    <div className="employee__services__container">
      <h3 className="employee__services__header">Offer a New Service</h3>
      <form onSubmit={addEmployeeService} className="employee__service__add__form">
        <select
          className="employee__services__select"
          value={employeeServiceId}
          onChange={(e) => setEmployeeServiceId(e.target.value)}
        >
          <option className="option__placeholder" value="" disabled selected hidden>
            Select a service
          </option>
          {servicesArr.map((service, idx) => {
            return (
              <option key={idx} className="employee__services__option" value={service.id}>
                {service.title}
              </option>
            );
          })}
        </select>
        <button className="employee__service__add__button">Add Service</button>
      </form>
      <div className="employee__services__remove__container">
        {employeeServicesArr
          .filter((employeeService) => {
            employeeServicesArr.includes(employeeService);
            return employeeService;
          })
          .map((employeeService) => {
            return (
              <div key={employeeService.id} className="employee__service__remove__card">
                <div>{employeeService.title}</div>
                <button
                  className="employee__service__remove__button"
                  onClick={() => {
                    removeService(employeeService.id, sessionUser.user.id);
                  }}
                >
                  Remove Service
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default EmployeeServices;
