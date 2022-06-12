import { csrfFetch } from "./csrf";
import rfdc from "rfdc";
const clone = rfdc();

const GET_ALL = "appointments/getAll";
const CLEAN = "appointments/clean";
const DELETE = "appointments/delete";
const ADD_RELATION = "appointments/addRELATION";

const allAppointments = (appointments) => {
  return {
    type: GET_ALL,
    payload: appointments,
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

export const getAllAppointments = () => async (dispatch) => {
  const response = await csrfFetch(`/api/appointments`, {
    method: "GET",
  });
  const appointments = await response.json();
  console.log(appointments);

  dispatch(allAppointments(appointments));
  return appointments;
};
// export const bookAppointment = (appointment) => async (dispatch) => {

//   const appointment = {
//     date: selectedDate,
//     startTime: 12,
//     hours: 2,
//     employeeId: 1,
//     customerId: 3,
//     services: "1 2 3 4",
//   };
//   const newAppointment = await csrfFetch(`/api/appointments`, {
//     method: "POST",
//     body: JSON.stringify(appointment),
//   });
//   const data = await newAppointment.json();
//   console.log(response);
//   if (response.newAppointment) {
//   }
// };

// export const deleteOneService = (serviceId, userId) => async (dispatch) => {
//   console.log("in the thunk");
//   const serviceToDelete = await csrfFetch(`/api/services/appointments`, {
//     method: "DELETE",
//     body: JSON.stringify({ serviceId, userId }),
//   });
//   const response = await serviceToDelete.json();

//   if (response.message) {
//     const response = await csrfFetch(`/api/services/employee/${userId}`, {
//       method: "GET",
//     });
//     const employeeServices = await response.json();

//     dispatch(allEmployeeServices(employeeServices.user.Services));
//     return employeeServices;
//   }
// };

// export const clean = () => (dispatch) => {
//   dispatch(cleanServices());
// };
const initialState = {};

const appointmentsReducer = (state = initialState, action) => {
  let newState = clone(state);
  switch (action.type) {
    // case ADD_RELATION:
    //   const newEmployeeServices = {};
    //   console.log(action.payload);
    //   for (let newEmployeeService of action.payload) {
    //     employeeServices[newEmployeeService.id] = newEmployeeService;
    //   }

    //   return { ...newEmployeeServices };
    case GET_ALL:
      console.log(action.payload);

      return action.payload.appointments;
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

export default appointmentsReducer;
