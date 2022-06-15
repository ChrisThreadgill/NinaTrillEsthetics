import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./AvailableServicesCSS/AvailableServices.css";

function AvailableServices({
  selectedEmployee,
  selectedServices,
  setSelectedServices,
  serviceSet,
  setSelectedServicesInfo,
}) {
  //
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();

  console.log(sessionUser);
  const addService = (service) => {
    // console.log(service);
    // console.log(serviceSet.has(service));
    serviceSet.add(service);
    // console.log(serviceSet);
    // serviceSet.delete(service);
    // console.log(serviceSet);
  };

  return (
    <div className="available__services__container">
      {selectedEmployee?.Services.map((service) => {
        return (
          <div className="available__service__card" key={service.id}>
            <div className="available__service__info__container">
              <div className="available__service__title">{service.title}</div>
              <div className="available__service__description">{service.description}</div>
            </div>
            <div className="available__service__add__container">
              <div className="available__service__price">{`$${service.price}`}</div>
              {sessionUser ? (
                <button
                  className="available__service__add"
                  onClick={() => {
                    let services = {};
                    addService(service);

                    setSelectedServices(selectedServices.add(service));
                    for (let service of selectedServices) {
                      services[service.id] = service;
                    }
                    setSelectedServicesInfo(services);
                  }}
                >
                  Add Service
                </button>
              ) : (
                <div className="available__services__un__auth" onClick={() => history.push("/login")}>
                  Sign In to Schedule!
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default AvailableServices;
