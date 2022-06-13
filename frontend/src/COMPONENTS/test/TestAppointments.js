import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import { csrfFetch } from "../../store/csrf";
import * as appointmentsActions from "../../store/appointments";
import { checkAvailableTimes, formatDate } from "../utils/utils";
const moment = require("moment");

function TestAppointments() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session);
  const allAppointments = useSelector((state) => state.appointments);

  const [startDate, setStartDate] = useState(new Date());
  const [minHour, setMinHour] = useState(6);
  const { formattedDate: todaysDate } = formatDate(new Date());
  // console.log(todaysDate);
  const [selectedDate, setSelectedDate] = useState(todaysDate);
  const [selectedTime, setSelectedTime] = useState("");
  const [weekDay, setWeekDay] = useState("");
  const [currentAppointments, setCurrentAppointments] = useState([]);
  const [trigger, setTrigger] = useState(false);
  // console.log(allAppointments, "all appointments");
  // console.log(currentAppointments);
  //
  // console.log(moment(13, "HH:mm").format("hh:mm a"));
  let schedule = [10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14, 14.5, 15, 15.5, 16, 16.5, 17, 17.5, 18, 18.5];

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
  useEffect(() => {
    if (allAppointments.length) {
      const currentAppointments = allAppointments?.filter(
        (appointment) => appointment.date == selectedDate && appointment.employeeId == 2
      );
      console.log(currentAppointments);
      setCurrentAppointments(checkAvailableTimes(currentAppointments, schedule));
    }
  }, [selectedDate]);
  console.log(currentAppointments);
  useEffect(() => {
    //setting date to today's formatted date on component mount
    const { formattedDate } = formatDate(new Date());
    dispatch(appointmentsActions.getAllAppointments());
    return () => {
      const { formattedDate } = formatDate(new Date());
      setSelectedDate(formattedDate);
    };
  }, [dispatch]);
  return (
    <div>
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
      {currentAppointments.map((timeSlot, idx) => {
        {
          timeSlot % 1 === 0 ? (timeSlot = timeSlot) : (timeSlot = `${timeSlot}:30`);
        }
        return (
          <li
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
          </li>
        );
      })}
      <form onSubmit={(e) => bookAppointment(e)}>
        <button>NEW APPOINTMENT</button>
      </form>
    </div>
  );
}

export default TestAppointments;
