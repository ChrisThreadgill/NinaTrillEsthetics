import "./EmployeeScheduleCustomerViewCSS/EmployeeScheduleCustomerView.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  serviceSet,
}) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session);
  const allAppointments = useSelector((state) => state.appointments);
  const { formattedDate: todaysDate } = formatDate(new Date());

  const [startDate, setStartDate] = useState(new Date());
  const [currentAppointments, setCurrentAppointments] = useState([]);
  // const [selected, setSelected] = useState(false);
  const [selectedDate, setSelectedDate] = useState(todaysDate);
  const [selectedTime, setSelectedTime] = useState("");
  const [price, setPrice] = useState("");
  const [selectedHours, setSelectedHours] = useState("");

  const [weekDay, setWeekDay] = useState("");

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

        setCurrentAppointments(checkAvailableTimes(currentAppointments, schedule));
      }
      // console.log(currentAppointments, "current appoints");

      return () => {};

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
    // console.log(selectedServicesInfoArray);
    let total = 0;
    let hours = 0;
    for (let i = 0; i < selectedServicesInfoArray.length; i++) {
      let curService = selectedServicesInfoArray[i];
      let curPrice = parseInt(curService.price);
      let curHours = Number(curService.hours);
      console.log(curHours);
      total += curPrice;
      hours += curHours;

      // console.log(total);
    }
    setPrice(total);
    setSelectedHours(hours);

    // if (allAppointments.length) {
    //   // console.log("inside the filter");
    //   const currentAppointments = allAppointments?.filter(
    //     (appointment) => appointment.date == selectedDate && appointment.employeeId == employeeId
    //   );

    //   setCurrentAppointments(checkAvailableTimes(currentAppointments, schedule, selectedHours));
    // }
    // setCurrentAppointments(checkAvailableTimes(currentAppointments, schedule, selectedHours));
  }, [selectedServicesInfo]);
  // console.log(selectedHours, "hourssssssssssssssssssssssssssssss");

  useEffect(() => {
    //setting date to today's formatted date on component mount NOT WORKING
    // const { formattedDate } = formatDate(new Date());
    dispatch(appointmentsActions.getAllAppointments());
    return () => {
      // const { formattedDate } = formatDate(new Date());
      // setSelectedDate(formattedDate);
    };
  }, [dispatch]);
  // console.log(selectedTime);

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
                    if (typeof timeSlot === "string" && !Number(timeSlot)) {
                      // console.log(Number(timeSlot), "time slotttttttt");

                      const halfHourTime = timeSlot.split(".")[0];
                      // console.log(decimalTime, "decimal timeeeeeeeeeeeeeeeee");
                      setSelectedTime(`${halfHourTime}:30`);
                      // console.log(selectedTime, "new selected timeeeeeeeee");
                    } else {
                      // console.log(timeSlot);
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
          {/* {selectedTime % 1 === 0
            ? setSelectedTime(moment(selectedTime, "HH:mm").format("hh:mm a"))
          : setSelectedTime(moment(selectedTime.split(":")[0], "HH:mm").format("hh:mm a"))} */}
          <div>{selectedTime ? moment(selectedTime, "HH:mm").format("hh:mm a") : "Choose a time!"}</div>
          <div className="customer__appointment__selected__services">
            {selectedServicesInfo &&
              Object.values(selectedServicesInfo).map((service) => {
                return <li>{service.title}</li>;
              })}
          </div>
          <div>{`$${price}`}</div>
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
