import { useHistory } from "react-router-dom";
import "./CustomerAppointments/CustomerAppointmentCard.css";
import AppointmentEditModal from "../../Modals/AppointmentEdit";
const moment = require("moment");

function CustomerAppointmentCard({
  month,
  day,
  year,
  cancelAppointment,
  appointmentId,
  appointmentServicesArr,
  allServices,
  appointmentTime,
  appointment,
  employees,
}) {
  const history = useHistory();
  //
  const appointmentOwner = employees[appointment.employeeId];
  console.log(appointmentOwner, "employee id in the customer appointment card");

  return (
    <div className="customer__appointment__card__container">
      <h3 className="customer__appointment__card__header">
        Your appointment with {appointmentOwner?.fName} has been confirmed!
      </h3>
      <div className="customer__appointment__card__details__container">
        {appointmentServicesArr.map((integer) => {
          // console.log(allServices[integer]);
          if (integer) {
            return (
              <div className="customer__appointment__card__services">
                <div>{allServices[integer]?.title}</div>
                <div>{`$${allServices[integer]?.price}`}</div>
              </div>
            );
          }
        })}
        {/* <div className="customer__appointment__card__services">services</div> */}
      </div>
      <div className="customer__appointment__card__time__date">{`Your appointment is set for ${month}/${day}/${year} at ${moment(
        appointmentTime,
        "HH:mm"
      ).format("hh:mm A")}.`}</div>
      <div className="customer__appointment__card__buttons">
        {/* <div
          className="customer__appointment__reschedule"
          onClick={() => history.push(`/appointments/${appointmentId}`)}
        >
          Reschedule
        </div> */}
        <AppointmentEditModal appointmentId={appointmentId}></AppointmentEditModal>
        <div className="customer__appointment__cancel" onClick={() => cancelAppointment(appointmentId)}>
          Cancel
        </div>
      </div>

      {/* <li>{moment(appointmentTime, "HH:mm").format("hh:mm A")}</li>
      <li>
        {appointmentServicesArr.map((integer) => {
          // console.log(allServices[integer]);
          return <li>{allServices[integer]?.title}</li>;
        })}
      </li>
      <li>{month + "/" + day + "/" + year}</li> */}
    </div>
  );
}

export default CustomerAppointmentCard;
