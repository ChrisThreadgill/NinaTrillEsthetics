import { csrfFetch } from "./csrf";
import rfdc from "rfdc";
const clone = rfdc();

const GET_ALL = "userServices/getAll";
const CLEAN = "userServices/clean";
const DELETE = "userServices/delete";
const ADD_RELATION = "userServices/addRELATION";

const allEmployeeServices = (employeeServices) => {
  return {
    type: GET_ALL,
    payload: employeeServices,
  };
};
const addRelation = (service) => {
  return {
    type: ADD_RELATION,
    payload: service,
  };
};
const deleteService = (serviceId) => {
  return {
    type: DELETE,
    payload: serviceId,
  };
};
const cleanServices = () => {
  return {
    type: CLEAN,
  };
};

export const getAllEmployeeServices = (employeeId) => async (dispatch) => {
  const response = await csrfFetch(`/api/services/employee/${employeeId}`, {
    method: "GET",
  });
  const employeeServices = await response.json();
  console.log(employeeServices.user.Services);

  dispatch(allEmployeeServices(employeeServices.user.Services));
  return employeeServices;
};

export const addServiceRelation = (userId, serviceId) => async (dispatch) => {
  const data = { userId, serviceId };
  console.log(data);
  const newService = await csrfFetch(`/api/services/${userId}/${serviceId}`, {
    method: "POST",
    body: JSON.stringify(data),
  });
  const response = await newService.json();
  console.log(response);
  if (response.newUserService) {
    const response = await csrfFetch(`/api/services/employee/${userId}`, {
      method: "GET",
    });
    const employeeServices = await response.json();
    console.log(employeeServices.user.Services);

    dispatch(allEmployeeServices(employeeServices.user.Services));
    return employeeServices;
  }
};

export const deleteOneService = (serviceId, userId) => async (dispatch) => {
  console.log("in the thunk");
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

// export const clean = () => (dispatch) => {
//   dispatch(cleanServices());
// };
const initialState = {};

const employeeServicesReducer = (state = initialState, action) => {
  let newState = clone(state);
  switch (action.type) {
    case ADD_RELATION:
      const newEmployeeServices = {};
      console.log(action.payload);
      for (let newEmployeeService of action.payload) {
        employeeServices[newEmployeeService.id] = newEmployeeService;
      }

      return { ...newEmployeeServices };
    case GET_ALL:
      const employeeServices = {};
      console.log(action.payload);
      for (let employeeService of action.payload) {
        employeeServices[employeeService.id] = employeeService;
      }

      return { ...employeeServices };
    // case DELETE:
    //   console.log(newState, "this is the new state");
    //   delete newState[action.payload];
    //   return newState;
    // case CLEAN:
    //   return {};
    default:
      return state;
  }
};

export default employeeServicesReducer;
