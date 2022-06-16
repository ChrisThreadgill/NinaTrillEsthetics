import "./HomePageEmployees.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import AvailableServices from "./AvailableServices/AvailableServices";
// import EmployeeScheduleCustomerView from "../../EMPLOYEEPORTAL/EmployeeScheduleCustomerView/EmployeeScheduleCustomerView";
// import EmployeeSelect from "../../EMPLOYEEPORTAL/EmployeeSelect/EmployeeSelect";
import * as employeesActions from "../../../store/employees";
import EmployeeHomeBioCard from "./EmployeeHomeBioCard/EmployeeHomeBioCard";

function HomePageEmployees() {
  const dispatch = useDispatch();
  const [employeeId, setEmployeeId] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);

  const employeesObj = useSelector((state) => state.employees);

  // useEffect(() => {
  //   setSelectedEmployee(employeesObj[employeeId]);
  //   console.log(selectedServicesInfo);
  // }, [employeeId, selectedServicesInfo]);

  useEffect(() => {
    dispatch(employeesActions.getAllEmployees()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {isLoaded && (
        <div className="home__page__container">
          <div className="home__page__employees__header">Meet The Staff</div>
          {Object.values(employeesObj).map((employee) => {
            return <EmployeeHomeBioCard employee={employee}></EmployeeHomeBioCard>;
          })}
        </div>
      )}
    </>
  );
}

export default HomePageEmployees;
