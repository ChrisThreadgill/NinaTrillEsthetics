import "./AvailableServicesCSS/AvailableServices.css";

function AvailableServices({ selectedEmployee }) {
  //
  console.log(selectedEmployee, "in the available services component");

  return (
    <div className="available__services__container">
      {selectedEmployee?.Services.map((service) => {
        return (
          <div className="available__service__card">
            <div>{service.title}</div>
            <div>{service.description}</div>
            <div className="available__service__add__container">
              <div>{service.price}</div>
              <div>Add Service</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default AvailableServices;
