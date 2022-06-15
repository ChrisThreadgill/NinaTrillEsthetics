import "./CustomerHomePage.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { unFormatDate } from "../utils/utils";
import * as appointmentsActions from "../../store/appointments";
import * as servicesActions from "../../store/services";
import CustomerAppointmentCard from "./CustomerAppointments/CustomerAppointmentCard";
const moment = require("moment");

function CustomerHomePage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session);
  const customerAppointments = useSelector((state) => state.appointments);
  const allServices = useSelector((state) => state.services);
  console.log(sessionUser);
  //
  const cancelAppointment = (appointmentId) => {
    dispatch(appointmentsActions.cancelAppointment(appointmentId));
  };
  useEffect(() => {
    dispatch(appointmentsActions.getAllAppointmentsForCustomer(sessionUser.user.id));
    dispatch(servicesActions.getAllServices());
  }, [dispatch]);
  return (
    <div className="customer__home__page__container">
      <div className="customer__home__page__welcome">Welcome back {sessionUser.user.fName}</div>
      {Object.values(customerAppointments).map((appointment) => {
        console.log(appointment.startTime.split("."));

        let appointmentTimeConvert = appointment.startTime.split(".");
        let appointmentTime = appointmentTimeConvert[0];
        let date = appointment.date.toString();
        let appointmentServicesArr = appointment.services.split(",");

        let day = date.slice(-6, -4);
        let year = date.slice(-4);
        let month = date.slice(0, -6);
        console.log(appointment.services.split(","));
        console.log(allServices);

        if (appointmentTimeConvert[1] == 5) {
          appointmentTime = `${appointmentTimeConvert[0]}:30`;
        }
        return (
          <CustomerAppointmentCard
            month={month}
            day={day}
            year={year}
            appointmentServicesArr={appointmentServicesArr}
            allServices={allServices}
            appointmentTime={appointmentTime}
            appointmentId={appointment.id}
            cancelAppointment={cancelAppointment}
          ></CustomerAppointmentCard>
        );
      })}
    </div>
  );
}

export default CustomerHomePage;
