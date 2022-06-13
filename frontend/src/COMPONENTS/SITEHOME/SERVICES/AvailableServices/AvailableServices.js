import "./AvailableServicesCSS/AvailableServices.css";

function AvailableServices({ selectedEmployee }) {
  //
  console.log(selectedEmployee, "in the available services component");

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
              <div className="available__service__price">{service.price}</div>
              <button className="available__service__add">Add Service</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default AvailableServices;
