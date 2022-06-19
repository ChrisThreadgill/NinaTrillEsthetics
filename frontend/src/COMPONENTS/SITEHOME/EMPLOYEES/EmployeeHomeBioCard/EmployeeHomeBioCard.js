import "./EmployeeHomeBioCardCSS/EmployeeHomeBioCard.css";

function EmployeeHomeBioCard({ employee }) {
  //
  // console.log(employee);
  return (
    <div className="employee__home__bio__card__container">
      {/* <div className="employee__bio__profile__picture"></div> */}
      <img className="employee__bio__profile__picture" src={employee?.profilePicture?.profileUrl}></img>
      <div className="employee__bio__contents">
        <div className="employee__bio__name">
          {employee.fName} {employee.lName}
        </div>
        <div className="employee__bio__title">{employee.title}</div>
        <div className="employee__bio">{employee.bio}</div>
      </div>
    </div>
  );
}

export default EmployeeHomeBioCard;
