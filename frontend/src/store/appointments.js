import { csrfFetch } from "./csrf";
import rfdc from "rfdc";
const clone = rfdc();

const GET_ALL = "appointments/getAll";
const ALL_CUSTOMER = "appointments/customerAll";
const ALL_EMPLOYEE = "appointments/employeeAll";
const CLEAN = "appointments/clean";
const DELETE = "appointments/delete";
// const ADD_RELATION = "appointments/addRELATION";

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
const allEmployeeAppointments = (appointments) => {
  return {
    type: ALL_EMPLOYEE,
    payload: appointments,
  };
};
const cancelOneAppointment = (appointmentId) => {
  return {
    type: DELETE,
    payload: appointmentId,
  };
};
export const cleanAppointments = () => {
  return {
    type: CLEAN,
  };
};

export const getAllAppointments = () => async (dispatch) => {
  const response = await csrfFetch(`/api/appointments`, {
    method: "GET",
  });
  const appointments = await response.json();

  dispatch(allAppointments(appointments));
  return appointments;
};
export const getAllAppointmentsForCustomer = (customerId) => async (dispatch) => {
  const response = await csrfFetch(`/api/appointments/customer/${customerId}`, {
    method: "GET",
  });
  const appointments = await response.json();

  dispatch(allCustomerAppointments(appointments));
  return appointments;
};
export const getAllAppointmentsForEmployee = (employeeId) => async (dispatch) => {
  const response = await csrfFetch(`/api/appointments/employee/${employeeId}`, {
    method: "GET",
  });
  const appointments = await response.json();

  dispatch(allEmployeeAppointments(appointments));
  return appointments;
};

export const cancelAppointment = (appointmentId) => async (dispatch) => {
  const cancelledAppointment = await csrfFetch(`/api/appointments/${appointmentId}`, {
    method: "DELETE",
  });
  const response = await cancelledAppointment.json();

  dispatch(cancelOneAppointment(appointmentId));
  return response;
};

const initialState = {};

const appointmentsReducer = (state = initialState, action) => {
  let newState = clone(state);
  switch (action.type) {
    case GET_ALL:
      return action.payload.appointments;
    case ALL_CUSTOMER:
      const customerAppointments = {};

      for (let appointment of action.payload.appointments) {
        customerAppointments[appointment.id] = appointment;
      }

      return { ...customerAppointments };
    case ALL_EMPLOYEE:
      const employeeAppointments = {};

      for (let appointment of action.payload.appointments) {
        employeeAppointments[appointment.id] = appointment;
      }

      return { ...employeeAppointments };

    case DELETE:
      delete newState[action.payload];
      return newState;
    case CLEAN:
      return {};
    default:
      return state;
  }
};

export default appointmentsReducer;
