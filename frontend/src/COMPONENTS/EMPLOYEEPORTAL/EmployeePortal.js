import "./EmployeePortalCSS.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as servicesActions from "../../store/services";
import * as employeeServicesActions from "../../store/employeeServices";
import EmployeeScheduleCustomerView from "./EmployeeScheduleCustomerView/EmployeeScheduleCustomerView";
import EmployeeServices from "./EmployeeServices/EmployeeServices";

function EmployeePortal() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session);
  //

  useEffect(() => {
    dispatch(servicesActions.getAllServices());
    dispatch(employeeServicesActions.getAllEmployeeServices(sessionUser.user.id));
  }, [dispatch]);
  return (
    <div className="employee__portal__container">
      <div className="employee__portal__left">
        <div className="employee__profile__edit">
          <div className="employee__profile__pic">PIC</div>
          <div className="employee__profile__pic__upload">UPLOADBUTTON</div>
        </div>
        <EmployeeServices></EmployeeServices>
      </div>
      <EmployeeServices></EmployeeServices>
      {/* <EmployeeScheduleCustomerView schedule={schedule}></EmployeeScheduleCustomerView> */}
    </div>
  );
}

export default EmployeePortal;
