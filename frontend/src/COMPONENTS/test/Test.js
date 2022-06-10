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
  console.log(startDate);

  const handleDelete = (serviceId) => {
    dispatch(servicesActions.deleteOneService(serviceId));
  };

  useEffect(() => {
    dispatch(servicesActions.getAllServices());
  }, [dispatch]);
  return (
    <>
      <DatePicker
        selected={startDate}
        onChange={(date) => {
          let newMin = minHour;
          newMin++;
          setMinHour(newMin);
          setStartDate(date);
        }}
        showTimeSelect
        minTime={setHours(setMinutes(new Date(), 0), minHour)}
        maxTime={setHours(setMinutes(new Date(), 0), 17)}
        dateFormat="MMMM d, yyyy h:mm aa"
        inline
      />
      {Object.values(services).map((service, idx) => {
        return (
          <div key={idx}>
            <h1>{service.title}</h1>
            <div>{service.description}</div>
            <div>Price: {service.price}</div>
            <div>Hours: {service.hours}</div>
            <EditServiceModal service={service}></EditServiceModal>
            <button onClick={() => handleDelete(service.id)}>Delete</button>
          </div>
        );
      })}
    </>
  );
}

export default DatePickerTest;
