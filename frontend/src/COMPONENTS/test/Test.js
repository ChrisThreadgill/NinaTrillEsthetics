// import "./DatePickerTest.css";
import DatePicker from "react-datepicker";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import * as servicesActions from "../../store/services.js";
import EditServiceModal from "../Modals/EditService.js";

import "react-datepicker/dist/react-datepicker.css";

function DatePickerTest() {
  //
  const dispatch = useDispatch();

  const services = useSelector((state) => state.services);
  const sessionUser = useSelector((state) => state.session);
  const [startDate, setStartDate] = useState(new Date());
  const [minHour, setMinHour] = useState(6);
  const [selectedDate, setSelectedDate] = useState("");
  const [weekDay, setWeekDay] = useState("");
  const [currentAppointments, setCurrentAppointments] = useState([]);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [hours, setHours] = useState("");

  // console.log(startDate);

  const handleDelete = (serviceId) => {
    dispatch(servicesActions.deleteOneService(serviceId));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const service = { title, description, price, hours };
    dispatch(servicesActions.addOneService(service));
  };
  let schedule = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

  let testApts = [
    [1122023, 12, 3],
    [1122023, 16, 2],
    [1122023, 8, 3],
  ];

  const formatDate = (date) => {
    console.log(date);
    // convert date from date picker to js string object
    const dateString = new String(date);
    //split by the space
    const dateArr = dateString.split(" ");
    console.log(dateArr);

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
    // console.log("this is at the bottom of the function ", weekDay, date);
    return { formattedDate, weekDay };
  };

  const checkAvailableTimes = (appointments, schedule) => {
    let bookedTimes = [];
    let availableTimes = [];
    // let newSchedule = schedule;
    for (let i = 0; i < appointments.length; i++) {
      let currAPP = appointments[i];
      let hours = currAPP[2];
      let startTime = currAPP[1];
      bookedTimes.push(startTime);
      if (hours > 1) {
        let appointmentOverlay = startTime;
        for (let i = 1; i < hours; i++) {
          appointmentOverlay++;
          bookedTimes.push(appointmentOverlay);
        }
      }
    }

    //logic for creating an available times array based on the booked times.
    // console.log(bookedTimes);
    // while (bookedTimes.length) {
    //   let currentBook = bookedTimes.pop();
    //   if (newSchedule.includes(currentBook)) {
    //     for(let i = 0; i < newSchedule.length; i++){

    //     }
    //     console.log("this is inside the newSchedule.includes current book", currentBook);
    //   }
    // }

    return bookedTimes;
  };

  useEffect(() => {
    setCurrentAppointments(checkAvailableTimes(testApts, schedule));
  }, [selectedDate]);

  console.log(currentAppointments);
  console.log(weekDay);
  useEffect(() => {
    dispatch(servicesActions.getAllServices());
  }, [dispatch]);
  return (
    <>
      <DatePicker
        selected={startDate}
        onChange={(date) => {
          const { formattedDate, weekDay } = formatDate(date);
          console.log(formattedDate, weekDay);
          setSelectedDate(formattedDate);
          setWeekDay(weekDay);
          setStartDate(date);
        }}
        dateFormat="MMMM d, yyyy h:mm aa"
        inline
      />
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          className="add__boat__inputs"
          type="text"
          name="model"
          value={title}
          maxLength={85}
          required
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <label>description</label>
        <input
          className="add__boat__inputs"
          type="text"
          name="model"
          value={description}
          maxLength={85}
          required
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <label>price</label>
        <input
          className="add__boat__inputs"
          type="text"
          name="model"
          value={price}
          maxLength={85}
          required
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        />
        <label>hours</label>
        <input
          className="add__boat__inputs"
          type="text"
          name="model"
          value={hours}
          maxLength={85}
          required
          onChange={(e) => {
            setHours(e.target.value);
          }}
        />
        <button>new service</button>
      </form>

      {Object.values(services).map((service, idx) => {
        return (
          <div key={idx}>
            <h1>{service.title}</h1>
            <div>{service.description}</div>
            <div>Price: {service.price}</div>
            <div>Hours: {service.hours}</div>
            <EditServiceModal service={service}></EditServiceModal>
            <button
              onClick={(e) => {
                e.preventDefault();
                handleDelete(service.id);
              }}
            >
              Delete
            </button>
          </div>
        );
      })}
    </>
  );
}

export default DatePickerTest;
