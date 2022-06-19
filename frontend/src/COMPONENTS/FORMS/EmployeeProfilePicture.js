import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as currentEmployeeActions from "../../store/currentEmployee";
import "./FormsCSS/EmployeeProfilePictureForm.css";

function EmployeeProfilePictureForm() {
  //
  const [image, setImage] = useState(null);
  // for multuple file upload

  const [errors, setErrors] = useState([]);

  const dispatch = useDispatch();
  const employee = useSelector((state) => state.currentEmployee);

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = [];
    let userId = employee.id;
    dispatch(currentEmployeeActions.updateEmployeeProfilePicture({ image, userId }))
      .then(() => {
        setImage(null);
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          newErrors = data.errors;
          setErrors(newErrors);
        }
      });
  };

  const updateFile = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };
  return (
    <div className="employee__profile__picture__edit">
      <img className="employee__profile__pic" src={employee.profilePicture.profileUrl}></img>
      {/* <div className="employee__profile__pic" src="https://i.ibb.co/HTBdQC1/ninatrill-profile-pic.jpg"></div> */}
      {/* <label>
        <input type="file" onChange={updateFile} />
      </label> */}
      {/* <div className="employee__profile__pic__upload" onClick={handleSubmit}>
        UPLOADBUTTON
      </div> */}
    </div>
  );
}

export default EmployeeProfilePictureForm;
