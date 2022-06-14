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
  const [schedule, setSchedule] = useState([]);
  const employeesObj = useSelector((state) => state.employees);
  const [selectedEmployee, setSelectedEmployee] = useState(Object.values(employeesObj)[0]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedServicesInfo, setSelectedServicesInfo] = useState([]);
  let serviceSet = new Set();

  useEffect(() => {
    setSelectedEmployee(employeesObj[employeeId]);
    console.log(selectedServicesInfo);
  }, [employeeId, selectedServicesInfo]);

  useEffect(() => {
    serviceSet = new Set();
    setSelectedServices(serviceSet);
    console.log(serviceSet);
    dispatch(employeesActions.getAllEmployees()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {isLoaded && (
        <div className="home__page__container">
          <div className="home__page__header">SERVICES</div>
          <EmployeeSelect employeeId={employeeId} setEmployeeId={setEmployeeId}></EmployeeSelect>
          <EmployeeScheduleCustomerView
            schedule={schedule}
            setSchedule={setSchedule}
            selectedEmployee={selectedEmployee}
            employeeId={employeeId}
            selectedServices={selectedServices}
            selectedServicesInfo={selectedServicesInfo}
            setSelectedServicesInfo={setSelectedServicesInfo}
            serviceSet={serviceSet}
          ></EmployeeScheduleCustomerView>
          <AvailableServices
            selectedEmployee={selectedEmployee}
            selectedServices={selectedServices}
            setSelectedServices={setSelectedServices}
            selectedServicesInfo={selectedServicesInfo}
            setSelectedServicesInfo={setSelectedServicesInfo}
            employeeId={employeeId}
            serviceSet={serviceSet}
          ></AvailableServices>
        </div>
      )}
    </>
  );
}

export default HomePageServices;
