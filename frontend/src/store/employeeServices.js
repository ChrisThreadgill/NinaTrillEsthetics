import { csrfFetch } from "./csrf";
// import rfdc from "rfdc";
// const clone = rfdc();

const GET_ALL = "userServices/getAll";
// const CLEAN = "userServices/clean";
// const DELETE = "userServices/delete";
const ADD_RELATION = "userServices/addRELATION";

const allEmployeeServices = (employeeServices) => {
  return {
    type: GET_ALL,
    payload: employeeServices,
  };
};
// const addRelation = (service) => {
//   return {
//     type: ADD_RELATION,
//     payload: service,
//   };
// };
// const deleteService = (serviceId) => {
//   return {
//     type: DELETE,
//     payload: serviceId,
//   };
// };
// const cleanServices = () => {
//   return {
//     type: CLEAN,
//   };
// };

export const getAllEmployeeServices = (employeeId) => async (dispatch) => {
  const response = await csrfFetch(`/api/services/employee/${employeeId}`, {
    method: "GET",
  });
  const employeeServices = await response.json();

  dispatch(allEmployeeServices(employeeServices.user.Services));
  return employeeServices;
};

export const addServiceRelation = (userId, serviceId) => async (dispatch) => {
  const data = { userId, serviceId };
  const newService = await csrfFetch(`/api/services/${userId}/${serviceId}`, {
    method: "POST",
    body: JSON.stringify(data),
  });
  const response = await newService.json();
  if (response.newUserService) {
    const response = await csrfFetch(`/api/services/employee/${userId}`, {
      method: "GET",
    });
    const employeeServices = await response.json();

    dispatch(allEmployeeServices(employeeServices.user.Services));
    return employeeServices;
  }
};

export const deleteOneService = (serviceId, userId) => async (dispatch) => {
  const serviceToDelete = await csrfFetch(`/api/services/userServices`, {
    method: "DELETE",
    body: JSON.stringify({ serviceId, userId }),
  });
  const response = await serviceToDelete.json();

  if (response.message) {
    const response = await csrfFetch(`/api/services/employee/${userId}`, {
      method: "GET",
    });
    const employeeServices = await response.json();

    dispatch(allEmployeeServices(employeeServices.user.Services));
    return employeeServices;
  }
};

const initialState = {};

const employeeServicesReducer = (state = initialState, action) => {
  // let newState = clone(state);
  switch (action.type) {
    case ADD_RELATION:
      const newEmployeeServices = {};
      for (let newEmployeeService of action.payload) {
        employeeServices[newEmployeeService.id] = newEmployeeService;
      }

      return { ...newEmployeeServices };
    case GET_ALL:
      const employeeServices = {};
      for (let employeeService of action.payload) {
        employeeServices[employeeService.id] = employeeService;
      }

      return { ...employeeServices };
    default:
      return state;
  }
};

export default employeeServicesReducer;
