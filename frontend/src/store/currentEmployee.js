import { csrfFetch } from "./csrf";
import rfdc from "rfdc";
const clone = rfdc();

const GET_CURR = "currentEmployee/getCurr";
const CLEAN = "currentEmployee/clean";

const setCurrentEmployee = (employee) => {
  return {
    type: GET_CURR,
    payload: employee.currentUser,
  };
};
export const cleanCurrentEmployee = () => {
  return {
    type: CLEAN,
  };
};

export const checkEmployment = (userId) => async (dispatch) => {
  console.log("in the thunk");
  if (!userId) return;
  const response = await csrfFetch(`/api/users/${userId}`, {
    method: "GET",
  });
  console.log(response);
  const employee = await response.json();
  console.log(employee.currentUser.role);
  if (employee.currentUser.role > 1) {
    dispatch(setCurrentEmployee(employee));
  }

  // return employee;
};

const initialState = {};

const currentEmployeeReducer = (state = initialState, action) => {
  let newState = clone(state);
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
