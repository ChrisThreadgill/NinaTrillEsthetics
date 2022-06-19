import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./AvailableServicesCSS/AvailableServices.css";

function AvailableServices({ selectedEmployee, servicesId, setServicesId }) {
  //
  const sessionUser = useSelector((state) => state.session.user);
  const employeeCheck = useSelector((state) => state.currentEmployee.role);
  const history = useHistory();

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
              {sessionUser && !employeeCheck ? (
                <>
                  <button
                    className="available__service__add"
                    onClick={() => {
                      if (servicesId.includes(service.id)) return;
                      else {
                        setServicesId([...servicesId, service.id]);
                      }
                    }}
                  >
                    Add Service
                  </button>
                  <button
                    className="available__service__add"
                    onClick={() => {
                      if (servicesId.includes(service.id)) {
                        const idx = servicesId.indexOf(service.id);
                        servicesId.splice(idx, 1);

                        setServicesId([...servicesId]);
                      } else {
                        return;
                      }
                    }}
                  >
                    Remove Service
                  </button>
                </>
              ) : !employeeCheck ? (
                <div className="available__services__un__auth" onClick={() => history.push("/login")}>
                  Sign In to Schedule!
                </div>
              ) : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default AvailableServices;
