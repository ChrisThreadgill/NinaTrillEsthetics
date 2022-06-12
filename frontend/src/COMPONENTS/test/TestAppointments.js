import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import { csrfFetch } from "../../store/csrf";
import * as appointmentsActions from "../../store/appointments";
const moment = require("moment");

function TestAppointments() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session);
  const allAppointments = useSelector((state) => state.appointments);

  const formatDate = (date) => {
    // console.log(date);
    // convert date from date picker to js string object
    const dateString = new String(date);
    //split by the space
    const dateArr = dateString.split(" ");
    // console.log(dateArr);

    //define the day,month, and year of client selection
    let day = dateArr[2];
    let year = dateArr[3];
    let month = dateArr[1];
    let weekDay = dateArr[0];

    //set selection to match db storage
    switch (month) {
      case "Jan":
        month = "1";
        break;
      case "Feb":
        month = "2";
        break;
      case "Mar":
        month = "3";
        break;
      case "Apr":
        month = "4";
        break;
      case "May":
        month = "5";
        break;
      case "Jun":
        month = "6";
        break;
      case "Jul":
        month = "7";
        break;
      case "Aug":
        month = "8";
        break;
      case "Sep":
        month = "9";
        break;
      case "Oct":
        month = "10";
        break;
      case "Nov":
        month = "11";
        break;
      case "Dec":
        month = "12";
        break;
    }
    let formattedDate = month + day + year;
    return { formattedDate, weekDay };
  };
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

  const checkAvailableTimes = (appointments, schedule) => {
    let bookedTimes = [];
    let availableTimes = schedule;

    for (let i = 0; i < appointments.length; i++) {
      let currAPP = appointments[i];
      let hours = currAPP.hours;
      let startTime = currAPP.startTime;

      bookedTimes.push(Number(startTime));

      if (hours > 0.5) {
        var bookedSlots = Number(startTime);

        for (let i = 0.5; i < hours; i += 0.5) {
          bookedSlots += 0.5;
          bookedTimes.push(bookedSlots);
        }
      }
    }

    while (bookedTimes.length) {
      let currentBook = bookedTimes.pop();
      if (availableTimes.includes(currentBook)) {
        for (let i = 0; i < availableTimes.length; i++) {
          if (availableTimes[i] === currentBook) {
            availableTimes.splice(i, 1);
          }
        }
      }
    }
    return availableTimes;
  };
  // console.log(allAppointments);

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
      const currentAppointments = allAppointments?.filter((appointment) => appointment.date == selectedDate);
      setCurrentAppointments(checkAvailableTimes(currentAppointments, schedule));
    }
  }, [selectedDate]);
  // console.log(currentAppointments);
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
