import "./HomePageServices.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AvailableServices from "./AvailableServices/AvailableServices";
import EmployeeScheduleCustomerView from "../../EMPLOYEEPORTAL/EmployeeScheduleCustomerView/EmployeeScheduleCustomerView";
import EmployeeSelect from "../../EMPLOYEEPORTAL/EmployeeSelect/EmployeeSelect";
import * as employeesActions from "../../../store/employees";
import * as servicesActions from "../../../store/services";
import { ExternalLink } from "react-external-link";

function HomePageServices() {
  const dispatch = useDispatch();
  const [employeeId, setEmployeeId] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [schedule, setSchedule] = useState([]);
  const employeesObj = useSelector((state) => state.employees);
  const [selectedEmployee, setSelectedEmployee] = useState(Object.values(employeesObj)[0]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [servicesId, setServicesId] = useState([]);
  const [selectedServicesInfo, setSelectedServicesInfo] = useState([]);
  const [errors, setErrors] = useState({});
  let serviceSet = new Set();

  useEffect(() => {
    setSelectedEmployee(employeesObj[employeeId]);
    serviceSet = new Set();
    setSelectedServices(serviceSet);
    console.log(serviceSet, "--------------------");
    return () => {
      setSelectedServicesInfo("");
    };
  }, [employeeId]);

  useEffect(() => {
    // serviceSet = new Set();
    // setSelectedServices(serviceSet);
    console.log(serviceSet);
    dispatch(employeesActions.getAllEmployees()).then(() => setIsLoaded(true));
    dispatch(servicesActions.getAllServices());
  }, [dispatch]);

  return (
    <>
      {isLoaded && (
        <>
          <div className="home__page__container">
            <div className="home__page__header">SERVICES</div>
            <EmployeeSelect
              setErrors={setErrors}
              employeeId={employeeId}
              setEmployeeId={setEmployeeId}
              setServicesId={setServicesId}
            ></EmployeeSelect>
            <EmployeeScheduleCustomerView
              schedule={schedule}
              setSchedule={setSchedule}
              selectedEmployee={selectedEmployee}
              employeeId={employeeId}
              servicesId={servicesId}
              setServicesId={setServicesId}
              selectedServices={selectedServices}
              setSelectedServices={setSelectedServices}
              selectedServicesInfo={selectedServicesInfo}
              setSelectedServicesInfo={setSelectedServicesInfo}
              serviceSet={serviceSet}
              errors={errors}
              setErrors={setErrors}
            ></EmployeeScheduleCustomerView>
            <AvailableServices
              selectedEmployee={selectedEmployee}
              selectedServices={selectedServices}
              servicesId={servicesId}
              setServicesId={setServicesId}
              setSelectedServices={setSelectedServices}
              selectedServicesInfo={selectedServicesInfo}
              setSelectedServicesInfo={setSelectedServicesInfo}
              employeeId={employeeId}
              serviceSet={serviceSet}
              setErrors={setErrors}
              errors={errors}
            ></AvailableServices>
          </div>

          <div className="footer__container__about">
            <div>
              <div>NinaTrill Esthetics LLC</div>
              <span>1127 S Gutensohn Rd, Springdale, AR 72764</span>
              <span>(479) 301-4455</span>
            </div>
            <div>
              <div>Meet the dev</div>

              <ExternalLink className="about__links" href="https://www.linkedin.com/in/chris-threadgill-b05090185/">
                Portfolio
              </ExternalLink>
              <ExternalLink className="about__links" href="https://www.linkedin.com/in/chris-threadgill-b05090185/">
                LinkedIn
              </ExternalLink>
              <ExternalLink className="about__links" href="https://github.com/ChrisThreadgill">
                Github
              </ExternalLink>
            </div>
            <div>
              <div className="tech__used__container">Technologies Used</div>
              <container className="tech__links__div">
                <container className="tech__links__container">
                  <label className="technologies__links">JavaScript</label>
                  <label className="technologies__links">Express</label>
                  <label className="technologies__links">NodeJS</label>
                  <label className="technologies__links">Sequelize</label>
                  <label className="technologies__links">PostgreSQL</label>
                  <label className="technologies__links">Docker</label>
                </container>
                <container className="tech__links__container__right">
                  <label className="technologies__links">HTML/CSS</label>
                  <label className="technologies__links">React</label>
                  <label className="technologies__links">Redux</label>
                  <label className="technologies__links">Github</label>
                  <label className="technologies__links">YAML</label>
                </container>
              </container>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default HomePageServices;
