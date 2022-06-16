import "./FormsCSS/EditEmployeeBio.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function EditEmployeeBio() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session?.user);
  const currentEmployee = useSelector((state) => state.currentEmployee);
  const [employeeBio, setEmployeeBio] = useState("");
  const [bioErrors, setBioErrors] = useState({});
  const [titleActive, setTitleActive] = useState(false);
  const [bioActive, setBioActive] = useState(false);

  //

  useEffect(() => {
    setBioErrors([]);
    if (!employeeBio) setBioErrors({ bio: "Please Provide a Bio" });
    if (employeeBio?.length > 995) setBioErrors({ bio: "Your Bio needs to be less than 995 characters" });
  }, [employeeBio]);

  useEffect(() => {
    setEmployeeBio(currentEmployee.bio);
  }, [dispatch]);

  const editEmployeeProfile = (e) => {
    e.preventDefault();
  };

  return (
    <div className="employee__profile__edit">
      <form onSubmit={editEmployeeProfile} className="employee__profile__edit__form">
        <div className="employee__profile__title">Welcome, {currentEmployee?.fName}</div>
        <div className="employee__profile__bio">Edit your bio here</div>
        {bioErrors && bioErrors.bio && <div className="employee__portal__errors">{bioErrors.bio}</div>}
        <textarea
          className="employee__portal__bio__input"
          type="text"
          cols="50"
          rows="7"
          value={employeeBio || bioActive ? employeeBio : currentEmployee.bio}
          onFocus={() => setBioActive(true)}
          onBlur={() => setBioActive(false)}
          onChange={(e) => setEmployeeBio(e.target.value)}
        ></textarea>
      </form>
    </div>
  );
}

export default EditEmployeeBio;
