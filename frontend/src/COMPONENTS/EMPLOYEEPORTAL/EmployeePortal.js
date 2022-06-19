import "./EmployeePortalCSS.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as servicesActions from "../../store/services";
import * as employeeServicesActions from "../../store/employeeServices";
import * as appointmentsActions from "../../store/appointments";
import EmployeeScheduleCustomerView from "./EmployeeScheduleCustomerView/EmployeeScheduleCustomerView";
import EmployeeServices from "./EmployeeServices/EmployeeServices";
import EditEmployeeBio from "../FORMS/EditEmployeeBio";
import EmployeeAppointmentCalendar from "./EmployeeAppointments/EmployeeAppointmentCalendar";
import NewServiceForm from "../FORMS/NewService";
import EmployeeProfilePictureForm from "../FORMS/EmployeeProfilePicture";

function EmployeePortal() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session);

  //

  useEffect(() => {
    dispatch(servicesActions.getAllServices());
    if (sessionUser.user?.id) {
      dispatch(employeeServicesActions.getAllEmployeeServices(sessionUser.user?.id));
      dispatch(appointmentsActions.getAllAppointmentsForEmployee(sessionUser.user?.id));
    }
    return () => {
      dispatch(appointmentsActions.cleanAppointments());
    };
  }, [dispatch, sessionUser]);
  return (
    <div className="employee__portal__container">
      <div className="employee__portal__left">
        <EmployeeProfilePictureForm></EmployeeProfilePictureForm>
        {/* <div className="employee__profile__edit">
          <div className="employee__profile__title">Title</div>
          <div className="employee__profile__bio">BIO</div>
        </div> */}
        <EditEmployeeBio></EditEmployeeBio>
        <EmployeeServices></EmployeeServices>
      </div>
      <div className="employee__portal__right">
        <EmployeeAppointmentCalendar></EmployeeAppointmentCalendar>
        <NewServiceForm></NewServiceForm>
      </div>
      {/* <EmployeeServices></EmployeeServices> */}
      {/* <EmployeeScheduleCustomerView schedule={schedule}></EmployeeScheduleCustomerView> */}
    </div>
  );
}

export default EmployeePortal;
