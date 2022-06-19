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
  const { formattedDate } = formatDate(new Date());
  const [selectedDate, setSelectedDate] = useState(formattedDate);
  const [selectedAppointments, setSelectedAppointments] = useState([]);

  useEffect(() => {
    const filtered = allEmployeeAppointmentsArr.filter((appointment) => console.log(selectedDate, appointment.date));
    setSelectedAppointments(allEmployeeAppointmentsArr.filter((appointment) => appointment.date == selectedDate));
  }, [selectedDate]);
  //
  console.log(selectedAppointments);

  return (
    <div className="employee__appointment__calendar__view__container">
      <div className="employee__appointments__container">
        {selectedAppointments.map((appointment) => {
          return <EmployeeAppointmentCard key={appointment.id} appointment={appointment}></EmployeeAppointmentCard>;
        })}
      </div>
      <div className="employee__appointment__calendar__container">
        <DatePicker
          // selected={yesterday}
          showDateDisplay={false}
          minDate={new Date()}
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
