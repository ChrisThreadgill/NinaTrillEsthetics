import "./EmployeeAppointmentsCSS/EmployeeAppointmentCard.css";
import * as appointmentsActions from "../../../store/appointments";
import { useDispatch } from "react-redux";
const moment = require("moment");

function EmployeeAppointmentCard({ appointment }) {
  const dispatch = useDispatch();
  let date = appointment.date.toString();
  // const [showServices,setShowServices]

  let day = date.slice(-6, -4);
  let year = date.slice(-4);
  let month = date.slice(0, -6);
  const cancel = async () => {
    dispatch(appointmentsActions.cancelAppointment(appointment.id));
    // setRefilter(true);
    // setRefilter(false);
  };

  return (
    <div className="employee__appointment__card__container">
      <div className="employee__appointment__time__details">
        <div className="employee__appointment__time">
          {moment(appointment.startTime, "HH:mm").format("hh:mm A")}

          {/* {`Your Appointment on ${month}/${day}/${year}`} */}
        </div>
        {appointment.hours > 0.5 ? (
          <div className="employee__appointment__hours">{appointment.hours} hour(s)</div>
        ) : (
          <div className="employee__appointment__hours">30 minutes</div>
        )}
      </div>
      {/* {showServices && } onClick={cancelAppointment} */}
      <div className="employee__appointment__cancel" onClick={cancel}>
        Cancel
      </div>
    </div>
  );
}

export default EmployeeAppointmentCard;
