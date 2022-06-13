import "./HomePageServices.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AvailableServices from "./AvailableServices/AvailableServices";
import EmployeeScheduleCustomerView from "../../EMPLOYEEPORTAL/EmployeeScheduleCustomerView/EmployeeScheduleCustomerView";
import EmployeeSelect from "../../EMPLOYEEPORTAL/EmployeeSelect/EmployeeSelect";
import * as employeesActions from "../../../store/employees";

function HomePageServices() {
  const dispatch = useDispatch();
  const [employeeId, setEmployeeId] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);
  const employeesObj = useSelector((state) => state.employees);
  const [selectedEmployee, setSelectedEmployee] = useState(Object.values(employeesObj)[0]);
  console.log(employeesObj, "employees object==========================");
  //
  let schedule = [10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14, 14.5, 15, 15.5, 16, 16.5, 17, 17.5, 18, 18.5];

  useEffect(() => {
    // const selectedEmployee = employeesArr.filter((employee) => employee.id == employeeId);
    setSelectedEmployee(employeesObj[employeeId]);
    console.log(selectedEmployee);
  }, [employeeId]);
  useEffect(() => {
    dispatch(employeesActions.getAllEmployees()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {isLoaded && (
        <div className="home__page__container">
          <div className="home__page__header">SERVICES</div>
          <EmployeeSelect employeeId={employeeId} setEmployeeId={setEmployeeId}></EmployeeSelect>
          <EmployeeScheduleCustomerView schedule={schedule}></EmployeeScheduleCustomerView>
          <AvailableServices selectedEmployee={selectedEmployee}></AvailableServices>
        </div>
      )}
    </>
  );
}

export default HomePageServices;
