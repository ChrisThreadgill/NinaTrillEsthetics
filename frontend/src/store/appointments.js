import { csrfFetch } from "./csrf";
import rfdc from "rfdc";
const clone = rfdc();

const GET_ALL = "appointments/getAll";
const ALL_CUSTOMER = "appointments/customerAll";
const CLEAN = "appointments/clean";
const DELETE = "appointments/delete";
const ADD_RELATION = "appointments/addRELATION";

const allAppointments = (appointments) => {
  return {
    type: GET_ALL,
    payload: appointments,
  };
};
const allCustomerAppointments = (appointments) => {
  return {
    type: ALL_CUSTOMER,
    payload: appointments,
  };
};
const cancelOneAppointment = (appointmentId) => {
  return {
    type: DELETE,
    payload: appointmentId,
  };
};
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
export const getAllAppointmentsForCustomer = (customerId) => async (dispatch) => {
  const response = await csrfFetch(`/api/appointments/customer/${customerId}`, {
    method: "GET",
  });
  const appointments = await response.json();
  console.log(appointments);

  dispatch(allCustomerAppointments(appointments));
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

export const cancelAppointment = (appointmentId) => async (dispatch) => {
  console.log("in the thunk");
  const cancelledAppointment = await csrfFetch(`/api/appointments/${appointmentId}`, {
    method: "DELETE",
  });
  const response = await cancelledAppointment.json();

  dispatch(cancelOneAppointment(appointmentId));
  return response;
};

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
    case ALL_CUSTOMER:
      const customerAppointments = {};
      console.log(action.payload);
      for (let appointment of action.payload.appointments) {
        customerAppointments[appointment.id] = appointment;
      }

      return { ...customerAppointments };
    case DELETE:
      delete newState[action.payload];
      return newState;
    // case CLEAN:
    //   return {};
    default:
      return state;
  }
};

export default appointmentsReducer;
