import "./EmployeeAppointmentsCSS/EmployeeAppointmentCalendar.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import EmployeeAppointmentCard from "./EmployeeAppointmentCard";
import DatePicker from "react-datepicker";
import { formatDate } from "../../utils/utils";

function EmployeeAppointmentCalendar() {
  const dispatch = useDispatch();
  const allEmployeeAppointments = useSelector((state) => state.appointments);
  const allEmployeeAppointmentsArr = Object.values(allEmployeeAppointments);
  const dateManip = new Date();
  let yesterday = new Date(dateManip);
  yesterday.setDate(yesterday.getDate() - 1);
  const { formattedDate } = formatDate(yesterday);
  const [selectedDate, setSelectedDate] = useState(formattedDate);
  const [selectedAppointments, setSelectedAppointments] = useState([]);

  useEffect(() => {
    setSelectedAppointments(allEmployeeAppointmentsArr.filter((appointment) => appointment.date == selectedDate));
  }, [selectedDate, allEmployeeAppointmentsArr]);
  //

  // const dateManip = new Date();
  // let yesterday = new Date(dateManip);
  // yesterday.setDate(yesterday.getDate() - 1);
  let tomorrow = new Date(dateManip);
  tomorrow.setDate(tomorrow.getDate() + 1);

  return (
    <div className="employee__appointment__calendar__view__container">
      <div className="employee__appointments__container">
        <div className="employee__appointments__header">Your Appointments</div>
        {selectedAppointments.map((appointment) => {
          return <EmployeeAppointmentCard key={appointment.id} appointment={appointment}></EmployeeAppointmentCard>;
        })}
      </div>
      <div className="employee__appointment__calendar__container">
        <DatePicker
          minDate={tomorrow}
          selected={yesterday}
          showDateDisplay={false}
          onChange={(date) => {
            const { formattedDate, weekDay } = formatDate(date);
            setSelectedDate(formattedDate);
          }}
          dateFormat="MMMM d, yyyy h:mm aa"
          inline
        />
      </div>
    </div>
  );
}

export default EmployeeAppointmentCalendar;
