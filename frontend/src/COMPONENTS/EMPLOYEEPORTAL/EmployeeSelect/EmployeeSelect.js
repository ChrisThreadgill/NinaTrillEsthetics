import "./EmployeeSelectCSS/EmployeeSelect.css";
import { useDispatch, useSelector } from "react-redux";

function EmployeeSelect({ employeeId, setEmployeeId }) {
  //
  const employeesObj = useSelector((state) => state.employees);

  return (
    <div className="employee__select__container">
      <div className="employee__picture"></div>
      <select className="employee__select" onChange={(e) => setEmployeeId(e.target.value)}>
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
