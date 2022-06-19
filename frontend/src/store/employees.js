import { csrfFetch } from "./csrf";
// import rfdc from "rfdc";
// const clone = rfdc();

const GET_ALL = "employees/getAll";
// const CLEAN = "employees/clean";

const allEmployees = (employees) => {
  return {
    type: GET_ALL,
    payload: employees,
  };
};

export const getAllEmployees = () => async (dispatch) => {
  const response = await csrfFetch(`/api/users/employees`, {
    method: "GET",
  });
  const employees = await response.json();

  dispatch(allEmployees(employees));
  return employees;
};

const initialState = {};

const employeesReducer = (state = initialState, action) => {
  // let newState = clone(state);
  switch (action.type) {
    case GET_ALL:
      const employees = {};
      for (let employee of action.payload.employees) {
        employees[employee.id] = employee;
      }
      return employees;
    default:
      return state;
  }
};

export default employeesReducer;
