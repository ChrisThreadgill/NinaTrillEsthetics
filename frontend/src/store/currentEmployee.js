import { csrfFetch } from "./csrf";
// import rfdc from "rfdc";
// const clone = rfdc();

const GET_CURR = "currentEmployee/getCurr";
const UPDATE = "currentEmployee/update";
const CLEAN = "currentEmployee/clean";

const setCurrentEmployee = (employee) => {
  return {
    type: GET_CURR,
    payload: employee.currentUser,
  };
};
const updateEmployee = (employee) => {
  return {
    type: UPDATE,
    payload: employee.currentUser,
  };
};
export const cleanCurrentEmployee = () => {
  return {
    type: CLEAN,
  };
};

export const checkEmployment = (userId) => async (dispatch) => {
  if (!userId) return;
  const response = await csrfFetch(`/api/users/${userId}`, {
    method: "GET",
  });
  const employee = await response.json();
  if (employee.currentUser.role > 1) {
    dispatch(setCurrentEmployee(employee));
  }

  // return employee;
};
export const updateEmployeeProfilePicture = (image, userId) => async (dispatch) => {
  const formData = new FormData();
  formData.append("userId", userId);
  if (image) formData.append("image", image);
  const response = await csrfFetch(`/api/profilePictures`, {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: formData,
  });

  const employee = await response.json();
  // dispatch(setCurrentEmployee(employee));
};
const initialState = {};

const currentEmployeeReducer = (state = initialState, action) => {
  // let newState = clone(state);
  switch (action?.type) {
    case GET_CURR:
      return action.payload;
    case CLEAN:
      return {};
    default:
      return state;
  }
};

export default currentEmployeeReducer;
