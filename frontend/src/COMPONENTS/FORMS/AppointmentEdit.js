import { checkAvailableTimes, formatDate } from "../utils/utils";
import "./FormsCSS/AppointmentEditForm.css";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import { csrfFetch } from "../../store/csrf";
const moment = require("moment");

function AppointmentEditForm({ appointmentId, setShowModal }) {
  // const history = useHistory();
  //
  // getting all variables needed for the available times function
  const allAppointments = useSelector((state) => state.appointmentEdit);
  const employees = useSelector((state) => state.employees);
  const sessionUser = useSelector((state) => state.session.user);
  const { formattedDate } = formatDate(new Date());
  const [selectedDate, setSelectedDate] = useState(formattedDate);
  const [enableButton, setEnableButton] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");
  const [availableTimes, setAvailableTImes] = useState([]);
  const [errors, setErrors] = useState([]);

  const currentAppointment = allAppointments.filter((appointment) => appointment.id == appointmentId);
  const currentAppointmentEmployee = employees[currentAppointment[0].employeeId];
  const currentEmployeesAppointments = allAppointments.filter(
    (appointments) => appointments.employeeId == currentAppointmentEmployee.id
  );
  const currentEmployeeScheduleArr = currentAppointmentEmployee.Schedule.hours.split(" ");

  //date display
  let day = currentAppointment[0].date.toString().slice(-6, -4);
  let year = currentAppointment[0].date.toString().slice(-4);
  let month = currentAppointment[0].date.toString().slice(0, -6);

  //appointment hours
  let hours = currentAppointment[0].hours;

  //military time in
  let appointmentTime = Number(currentAppointment[0].startTime);
  //formatting for moment if .5
  if (appointmentTime % 1 !== 0) appointmentTime = `${Math.floor(appointmentTime)}:30`;

  //setup for controlled calendar input
  useEffect(() => {
    const dailyAppointments = currentEmployeesAppointments.filter((appointments) => appointments.date == selectedDate);
    setAvailableTImes(checkAvailableTimes(dailyAppointments, currentEmployeeScheduleArr));
  }, [selectedDate]);

  const dateManip = new Date();
  let yesterday = new Date(dateManip);
  yesterday.setDate(yesterday.getDate() - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const date = Number(selectedDate);
    const customerId = sessionUser.id;
    const numberHours = Number(hours);

    if (selectedTime.includes(":")) {
      let timeManipulation = selectedTime.split(":")[0];
      let startTime = Number(timeManipulation);
      startTime += 0.5;
      const appointmentUpdate = {
        date,
        customerId,
        hours: numberHours,
        employeeId: currentAppointmentEmployee.id,
        startTime,
      };
      const updatedAppointment = await csrfFetch(`/api/appointments/${currentAppointment[0].id}`, {
        method: "PUT",
        body: JSON.stringify(appointmentUpdate),
      })
        .then(async (res) => {
          const data = await res.json();
          if (data.appointmentToUpdate) {
            window.location.reload();
          }
        })
        .catch(async (res) => {
          const data = await res.json();
          if (data.errors) setErrors(data.errors);
        });
    } else {
      const startTime = selectedTime;
      const appointmentUpdate = {
        date,
        customerId,
        hours: numberHours,
        employeeId: currentAppointmentEmployee.id,
        startTime,
      };
      const updatedAppointment = await csrfFetch(`/api/appointments/${currentAppointment[0].id}`, {
        method: "PUT",
        body: JSON.stringify(appointmentUpdate),
      })
        .then(async (res) => {
          const data = await res.json();
          if (data.appointmentToUpdate) {
            window.location.reload();
          }
        })
        .catch(async (res) => {
          const data = await res.json();
          if (data.errors) setErrors(data.errors);
        });
    }
  };
  let tomorrow = new Date(dateManip);
  tomorrow.setDate(tomorrow.getDate() + 1);

  return (
    <div className="appointment__edit__form__container">
      <div>
        <div className="appointment__edit__form__details">
          Your Appointment with {currentAppointmentEmployee.fName} is scheduled at{" "}
          <p>{moment(appointmentTime, "HH:mm").format("hh:mm a")}</p> on <p>{` ${month}/${day}/${year}`}</p>
        </div>
      </div>

      <div className="appointment__edit__calendar__container">
        <form className="appointment__edit__form" onSubmit={handleSubmit}>
          <div className="appointment__edit__time__header">Your New Appointment Time</div>
          <div className="appointment__edit__details">
            {selectedTime ? moment(selectedTime, "HH:mm").format("hh:mm a") : null}
          </div>
          {hours && hours < 1 ? (
            <div className="appointment__edit__details">30 minutes</div>
          ) : (
            <div className="appointment__edit__details">{hours} hours</div>
          )}

          {enableButton ? (
            <button className="appointment__reschedule__button" type="submit">
              Reschedule
            </button>
          ) : (
            <></>
          )}
        </form>
        <div className="appointment__edit__date__picker__container">
          <div className="appointment__calendar__header__date">Select a new appointment date</div>
          <DatePicker
            minDate={tomorrow}
            selected={yesterday}
            showDateDisplay={false}
            onChange={(date) => {
              setErrors([]);
              setEnableButton(true);
              const { formattedDate } = formatDate(date);
              setSelectedDate(formattedDate);
              setSelectedTime("");
            }}
            dateFormat="MMMM d, yyyy h:mm aa"
            inline
          />
        </div>
        <div>
          <div className="appointment__calendar__header__time">Available Times</div>
          {enableButton ? (
            <div className="available__appointment__times2">
              {availableTimes.map((timeSlot, idx) => {
                {
                  timeSlot % 1 === 0 ? (timeSlot = timeSlot) : (timeSlot = `${timeSlot}:30`);
                }
                return (
                  <div
                    className="available__appointment__time__slot"
                    key={idx}
                    onClick={() => {
                      if (typeof timeSlot === "string" && !Number(timeSlot)) {
                        setErrors([]);
                        const halfHourTime = timeSlot.split(".")[0];
                        setSelectedTime(`${halfHourTime}:30`);
                      } else {
                        setErrors([]);
                        setSelectedTime(timeSlot);
                      }
                    }}
                  >
                    {moment(timeSlot, "HH:mm").format("hh:mm A")}
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>
      </div>
      {errors.map((error, idx) => (
        <div className="edit__service__errors" key={idx}>
          {error}
        </div>
      ))}
      <div className="appointment__edit__go__back">
        <span>If you need to change your services please cancel your appointment and rebook.</span>
        <div onClick={() => setShowModal(false)}>Go Back</div>
      </div>
    </div>
  );
}

export default AppointmentEditForm;
