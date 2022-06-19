import "./EmployeeSelectCSS/EmployeeSelect.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

function EmployeeSelect({ setErrors, setServicesId, employeeId, setEmployeeId }) {
  //
  const [selectedEmployee, setSelectedEmployee] = useState();
  const employeesObj = useSelector((state) => state.employees);
  const employeesArr = Object.values(employeesObj);
  useEffect(() => {
    setSelectedEmployee(employeesArr.filter((employee) => employee.id == employeeId));
  }, [employeeId]);
  return (
    <div className="employee__select__container">
      {/* <div className="employee__picture"></div> */}
      {selectedEmployee && selectedEmployee.length ? (
        <img
          className="employee__picture"
          src={selectedEmployee.length ? selectedEmployee[0].profilePicture.profileUrl : null}
        ></img>
      ) : (
        <div className="employee__select__header">SELECT AN EMPLOYEE TO SEE AVAILABLE TIMES</div>
      )}
      {/* <img
        className="employee__picture"
        src={selectedEmployee.length ? selectedEmployee[0].profilePicture.profileUrl : null}
      ></img> */}
      <select
        className="employee__select"
        onChange={(e) => {
          setErrors([]);
          setServicesId([]);
          setEmployeeId(e.target.value);
        }}
      >
        <option className="option__placeholder" disabled selected hidden>
          Select an Employee
        </option>
        {Object?.values(employeesObj).map((employee) => {
          return (
            <option key={employee.id} value={employee.id} className="employee__select__option">
              {employee.fName} {employee.lName}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default EmployeeSelect;
