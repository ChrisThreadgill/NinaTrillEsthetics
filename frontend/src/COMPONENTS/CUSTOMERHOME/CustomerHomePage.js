import "./CustomerHomePage.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../Footer/Footer";
import * as appointmentsActions from "../../store/appointments";
import * as servicesActions from "../../store/services";
import * as appointmentEditActions from "../../store/appointmentEdit";
import * as employeesActions from "../../store/employees";
import CustomerAppointmentCard from "./CustomerAppointments/CustomerAppointmentCard";

function CustomerHomePage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session);
  const employees = useSelector((state) => state.employees);
  const customerAppointments = useSelector((state) => state.appointments);
  const allServices = useSelector((state) => state.services);
  const [loaded, setLoaded] = useState(false);

  const cancelAppointment = (appointmentId) => {
    dispatch(appointmentsActions.cancelAppointment(appointmentId));
  };
  useEffect(() => {
    dispatch(servicesActions.getAllServices());
    dispatch(appointmentEditActions.editAppointmentGetAll());
    dispatch(employeesActions.getAllEmployees());
    dispatch(appointmentsActions.getAllAppointmentsForCustomer(sessionUser?.user?.id)).then(() => setLoaded(true));
    return () => {
      dispatch(appointmentsActions.cleanAppointments());
      dispatch(appointmentEditActions.cleanAppointmentEdit());
    };
  }, [dispatch]);
  return (
    <div className="customer__home__page__container">
      <div className="customer__home__page__welcome">Welcome back {sessionUser?.user?.fName}</div>
      {loaded ? (
        <div className="customer__appointment__cards__container">
          {Object.values(customerAppointments).map((appointment) => {
            let appointmentTimeConvert = appointment.startTime.split(".");
            let appointmentTime = appointmentTimeConvert[0];
            let date = appointment.date.toString();
            let appointmentServicesArr = appointment.services.split(",");
            let day = date.slice(-6, -4);
            let year = date.slice(-4);
            let month = date.slice(0, -6);

            if (appointmentTimeConvert[1] == 5) {
              appointmentTime = `${appointmentTimeConvert[0]}:30`;
            }
            return (
              <CustomerAppointmentCard
                month={month}
                day={day}
                year={year}
                appointment={appointment}
                employees={employees}
                appointmentServicesArr={appointmentServicesArr}
                allServices={allServices}
                appointmentTime={appointmentTime}
                appointmentId={appointment.id}
                cancelAppointment={cancelAppointment}
              ></CustomerAppointmentCard>
            );
          })}
        </div>
      ) : (
        <h1 className="loading__customer__home">Loading...</h1>
      )}
      <Footer></Footer>
    </div>
  );
}

export default CustomerHomePage;
