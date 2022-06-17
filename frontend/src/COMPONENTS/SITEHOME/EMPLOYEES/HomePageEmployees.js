import "./HomePageEmployees.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import AvailableServices from "./AvailableServices/AvailableServices";
// import EmployeeScheduleCustomerView from "../../EMPLOYEEPORTAL/EmployeeScheduleCustomerView/EmployeeScheduleCustomerView";
// import EmployeeSelect from "../../EMPLOYEEPORTAL/EmployeeSelect/EmployeeSelect";
import * as employeesActions from "../../../store/employees";
import EmployeeHomeBioCard from "./EmployeeHomeBioCard/EmployeeHomeBioCard";
import Footer from "../../Footer/Footer";
import { ExternalLink } from "react-external-link";

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
  );
}

export default HomePageEmployees;
