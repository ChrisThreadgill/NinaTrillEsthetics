import "./EmployeePortalCSS.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import EmployeeScheduleCustomerView from "./EmployeeScheduleCustomerView/EmployeeScheduleCustomerView";

function EmployeePortal() {
  // const sessionUser = useSelector((state) => state.session);
  //

  return (
    <div className="employee__portal__container">
      {/* <EmployeeScheduleCustomerView schedule={schedule}></EmployeeScheduleCustomerView> */}
    </div>
  );
}

export default EmployeePortal;
