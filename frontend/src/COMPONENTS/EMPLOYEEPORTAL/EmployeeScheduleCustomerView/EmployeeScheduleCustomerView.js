import "./EmployeeScheduleCustomerViewCSS/EmployeeScheduleCustomerView.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { csrfFetch } from "../../../store/csrf";
import DatePicker from "react-datepicker";
import * as appointmentsActions from "../../../store/appointments";
import { checkAvailableTimes, formatDate } from "../../utils/utils";
const moment = require("moment");

function EmployeeScheduleCustomerView({ schedule, setSchedule, selectedEmployee, employeeId }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session);
  const allAppointments = useSelector((state) => state.appointments);
  const { formattedDate: todaysDate } = formatDate(new Date());
  // const schedule = selectedEmployee?.Schedule.hours.split(" ");
  console.log(selectedEmployee?.Schedule.hours.split(" "));
  const testSchedule = selectedEmployee?.Schedule.hours.split(" ");

  const [startDate, setStartDate] = useState(new Date());
  const [currentAppointments, setCurrentAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(todaysDate);
  const [selectedTime, setSelectedTime] = useState("");
  const [weekDay, setWeekDay] = useState("");
  // let schedule = [10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14, 14.5, 15, 15.5, 16, 16.5, 17, 17.5, 18, 18.5];

  const bookAppointment = async (e) => {
    e.preventDefault();
    const appointment = {
      date: selectedDate,
      startTime: 12,
      hours: 2,
      employeeId: 1,
      customerId: 3,
      services: "1 2 3 4",
    };
    const newAppointment = await csrfFetch(`/api/appointments`, {
      method: "POST",
      body: JSON.stringify(appointment),
    }).catch(async (res) => {
      const data = await res.json();

      console.log(data.errors);
    });
    // if (response.newAppointment) {
    // }
  };

  //FILTERS ALL APPOINTMENTS BY DAY AND EMPLOYEEID
  useEffect(() => {
    if (selectedEmployee) {
      const schedule = selectedEmployee.Schedule.hours.split(" ");
      setSchedule(schedule);
      if (allAppointments.length && schedule) {
        // console.log("inside the filter");
        const currentAppointments = allAppointments?.filter(
          (appointment) => appointment.date == selectedDate && appointment.employeeId == employeeId
        );

        setCurrentAppointments(checkAvailableTimes(currentAppointments, testSchedule));
      }
      // console.log(currentAppointments, "current appoints");

      return () => {};

      // setCurrentAppointments(checkAvailableTimes(currentAppointments, schedule));
    }
  }, [selectedDate, employeeId]);
  console.log(employeeId, "employeeID");
  console.log("all appointments", allAppointments);
  console.log("scheuldeeeeeeeeeeeeee", schedule);
  console.log(currentAppointments, "current appointments in the customer view");

  useEffect(() => {
    //setting date to today's formatted date on component mount NOT WORKING
    // const { formattedDate } = formatDate(new Date());
    dispatch(appointmentsActions.getAllAppointments());
    return () => {
      // const { formattedDate } = formatDate(new Date());
      // setSelectedDate(formattedDate);
    };
  }, [dispatch]);
  // console.log(selectedDate);

  return (
    <div className="employee__schedule__customer__view__container">
      <div className="employee__schedule__customer__calendar__container">
        <h2>Select a date!</h2>
        <DatePicker
          onChange={(date) => {
            const { formattedDate, weekDay } = formatDate(date);
            // console.log(formattedDate, weekDay);
            setSelectedDate(formattedDate);
            setWeekDay(weekDay);
            setStartDate(date);
            setSelectedTime("");
          }}
          dateFormat="MMMM d, yyyy h:mm aa"
          inline
        />
      </div>
      <div className="available__appointment__times__container">
        <h2>Choose a time!</h2>
        <div className="available__appointment__times">
          {currentAppointments.map((timeSlot, idx) => {
            {
              timeSlot % 1 === 0 ? (timeSlot = timeSlot) : (timeSlot = `${timeSlot}:30`);
            }
            return (
              <div
                className="available__appointment__time__slot"
                key={idx}
                onClick={
                  () => {
                    if (typeof timeSlot === "string") {
                      const decimalTime = timeSlot.split(":")[0];
                      console.log(Number(decimalTime));
                      setSelectedTime(Number(decimalTime));
                    } else {
                      console.log(timeSlot);
                      setSelectedTime(timeSlot);
                    }
                  }
                  // setSelectedTime()
                }
              >
                {moment(timeSlot, "HH:mm").format("hh:mm A")}
              </div>
            );
          })}
        </div>
      </div>
      <div className="customer__appointment__form__container">
        <div className="customer__appointment__selected__options">
          <div>SELECTED APPOINTMENT TIME</div>
          <div>SELECTED SERVICES</div>
          <div>PRICE</div>
        </div>
        <div className="customer__appointment__errors"></div>
        <form className="customer__appointment__form" onSubmit={(e) => bookAppointment(e)}>
          <button>Schedule Now!</button>
        </form>
      </div>
    </div>
  );
}

export default EmployeeScheduleCustomerView;
