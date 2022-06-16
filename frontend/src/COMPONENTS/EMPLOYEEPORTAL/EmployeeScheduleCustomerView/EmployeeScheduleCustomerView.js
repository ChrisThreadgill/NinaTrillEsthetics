import "./EmployeeScheduleCustomerViewCSS/EmployeeScheduleCustomerView.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { csrfFetch } from "../../../store/csrf";
import DatePicker from "react-datepicker";
import * as appointmentsActions from "../../../store/appointments";
import { checkAvailableTimes, formatDate } from "../../utils/utils";
const moment = require("moment");

function EmployeeScheduleCustomerView({
  schedule,
  setSchedule,
  selectedEmployee,
  employeeId,
  selectedServices,
  selectedServicesInfo,
  setSelectedServicesInfo,
  serviceSet,
}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session);
  const allAppointments = useSelector((state) => state.appointments);
  const { formattedDate: todaysDate } = formatDate(new Date());

  const [startDate, setStartDate] = useState(new Date());
  const [currentAppointments, setCurrentAppointments] = useState([]);
  // const [selected, setSelected] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [price, setPrice] = useState("");
  const [formServices, setFormServices] = useState("");
  const [selectedHours, setSelectedHours] = useState("");
  const [errors, setErrors] = useState({});

  const [weekDay, setWeekDay] = useState("");
  const bookAppointment = async (e) => {
    e.preventDefault();
    if (selectedTime.includes(":")) {
      let timeManipulation = selectedTime.split(":")[0];
      let integerTime = Number(timeManipulation);
      integerTime += 0.5;
      const appointment = {
        date: selectedDate,
        startTime: integerTime,
        hours: selectedHours,
        employeeId: employeeId,
        customerId: sessionUser.user.id,
        services: formServices,
      };
      const newAppointment = await csrfFetch(`/api/appointments`, {
        method: "POST",
        body: JSON.stringify(appointment),
      })
        .then(async (res) => {
          const data = await res.json();
          if (!data.errors) history.push("/profile");
        })
        .catch(async (res) => {
          const data = await res.json();
          if (data.errors) {
            let normErrs = {};
            for (let i = 0; i < data.errors.length; i++) {
              let error = data.errors[i];
              switch (error) {
                case "Please select an appointment time.":
                  normErrs["startTime"] = "Please select an appointment time.";
                  break;
                case "Error calculating appointment hours":
                  normErrs["noHours"] = "Make sure you've selected services.";
                  break;
                case "Error with employeeId":
                  normErrs["noEmployee"] = "Please choose an employee to book with.";
                  break;
                case "Error with customerId":
                  normErrs["customerId"] =
                    "Please contact NinaTrill Esthetics directly for appointments at this time. 479-301-4455";
                  break;
                case "Please select a date":
                  normErrs["date"] = "Make sure to choose a date";
                  break;
                case "This time slot has been booked, please select another time.":
                  normErrs["booked"] = "This time slot has been booked, please select another time.";
                  break;
                case "This time slot overlaps an already booked appointment, please select another time.":
                  normErrs["overlap"] =
                    "This time slot overlaps an already booked appointment, please select another time.";
                  break;
              }
              setErrors(normErrs);
            }
            return;
          }
        });
    } else {
      const appointment = {
        date: selectedDate,
        startTime: selectedTime,
        hours: selectedHours,
        employeeId: employeeId,
        customerId: sessionUser.user.id,
        services: formServices,
      };
      const newAppointment = await csrfFetch(`/api/appointments`, {
        method: "POST",
        body: JSON.stringify(appointment),
      })
        .then(async (res) => {
          const data = await res.json();

          if (!data.errors) history.push("/profile");
        })
        .catch(async (res) => {
          const data = await res.json();

          if (data.errors) {
            let normErrs = {};
            for (let i = 0; i < data.errors.length; i++) {
              let error = data.errors[i];
              switch (error) {
                case "Please select an appointment time.":
                  normErrs["startTime"] = "Please select an appointment time.";
                  break;
                case "Error calculating appointment hours":
                  normErrs["noHours"] = "Make sure you've selected services.";
                  break;
                case "Error with employeeId":
                  normErrs["noEmployee"] = "Please choose an employee to book with.";
                  break;
                case "Error with customerId":
                  normErrs["customerId"] =
                    "Please contact NinaTrill Esthetics directly for appointments at this time. 479-301-4455";
                  break;
                case "Please select a date":
                  normErrs["date"] = "Make sure to choose a date";
                  break;
                case "This time slot has been booked, please select another time.":
                  normErrs["booked"] = "This time slot has been booked, please select another time.";
                  break;
                case "This time slot overlaps an already booked appointment, please select another time.":
                  normErrs["overlap"] =
                    "This time slot overlaps an already booked appointment, please select another time.";
                  break;
              }
              setErrors(normErrs);
            }
            return;
          }
        });
    }
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

        setCurrentAppointments(checkAvailableTimes(currentAppointments, schedule));
      }
      // console.log(currentAppointments, "current appoints");

      return () => {
        setPrice("");
        setSelectedHours("");
        setFormServices("");
        setSelectedServicesInfo("");
        setSelectedTime("");
      };

      // setCurrentAppointments(checkAvailableTimes(currentAppointments, schedule));
    }
  }, [selectedDate, employeeId]);

  // const calculateServices = (servicesArr)=>{
  //   for (let i = 0; i < servicesArr.length; i++) {
  //     console.log(selectedServicesInfoArray[i]);
  //   }
  // }
  useEffect(() => {
    const selectedServicesInfoArray = Object.values(selectedServicesInfo);

    let total = 0;
    let hours = 0;
    let services = "";

    for (let i = 0; i < selectedServicesInfoArray.length; i++) {
      let curService = selectedServicesInfoArray[i];
      let curPrice = parseInt(curService.price);
      let curHours = Number(curService.hours);
      let curServiceId = curService.id.toString();
      console.log(curServiceId);
      total += curPrice;
      hours += curHours;
      services += curServiceId + ",";
    }
    setPrice(total);
    setSelectedHours(hours);
    setFormServices(services);
  }, [selectedServicesInfo]);

  useEffect(() => {
    //setting date to today's formatted date on component mount NOT WORKING
    // const { formattedDate } = formatDate(new Date());
    if (sessionUser.user) {
      dispatch(appointmentsActions.getAllAppointments());
    }

    return () => {
      // const { formattedDate } = formatDate(new Date());
      setSelectedDate(todaysDate);
    };
  }, [dispatch]);
  // console.log(selectedTime);

  return (
    <div className="employee__schedule__customer__view__container">
      <div className="employee__schedule__customer__calendar__container">
        <h2>Select a date!</h2>
        <DatePicker
          // selected={startDate}
          showDateDisplay={false}
          minDate={new Date()}
          onChange={
            sessionUser.user
              ? (date) => {
                  console.log(date.getDate());
                  console.log(date.getMonth());
                  const { formattedDate, weekDay } = formatDate(date);
                  // console.log(formattedDate, weekDay);
                  setSelectedDate(formattedDate);
                  setWeekDay(weekDay);
                  setStartDate(date);
                  setSelectedTime("");
                }
              : (date) => {
                  setStartDate(date);
                }
          }
          dateFormat="MMMM d, yyyy h:mm aa"
          inline
        />
      </div>
      <div className="available__appointment__times__container">
        {sessionUser.user ? <h2>Choose a time!</h2> : <h2>Login To view Available Times</h2>}
        <div>{errors && errors.booked && `set this page to refresh if this error occurs`}</div>
        {sessionUser.user ? (
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
                      if (typeof timeSlot === "string" && !Number(timeSlot)) {
                        // console.log(Number(timeSlot), "time slotttttttt");

                        const halfHourTime = timeSlot.split(".")[0];
                        // console.log(decimalTime, "decimal timeeeeeeeeeeeeeeeee");
                        setSelectedTime(`${halfHourTime}:30`);
                        if (errors.startTime) errors.startTime = null;
                        // console.log(selectedTime, "new selected timeeeeeeeee");
                      } else {
                        // console.log(timeSlot);
                        if (errors.startTime) errors.startTime = null;
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
        ) : null}
      </div>
      {sessionUser.user ? (
        <div className="customer__appointment__form__container">
          <div className="customer__appointment__selected__options">
            {/* {selectedTime % 1 === 0
            ? setSelectedTime(moment(selectedTime, "HH:mm").format("hh:mm a"))
          : setSelectedTime(moment(selectedTime.split(":")[0], "HH:mm").format("hh:mm a"))} */}
            <div>{errors && errors.startTime}</div>
            <div>{selectedTime ? moment(selectedTime, "HH:mm").format("hh:mm a") : "Choose a time!"}</div>
            <div className="customer__appointment__selected__services">
              {selectedServicesInfo &&
                Object.values(selectedServicesInfo).map((service) => {
                  return <li>{service.title}</li>;
                })}
            </div>
            <div>{errors && errors.noHours}</div>
            <div>{`$${price}`}</div>
            <div>{`Time: ${selectedHours} Hours`}</div>
          </div>
          <div className="customer__appointment__errors"></div>
          <form className="customer__appointment__form" onSubmit={(e) => bookAppointment(e)}>
            <button>Schedule Now!</button>
          </form>
        </div>
      ) : null}
    </div>
  );
}

export default EmployeeScheduleCustomerView;
