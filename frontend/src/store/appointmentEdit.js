import { csrfFetch } from "./csrf";
// import rfdc from "rfdc";
// const clone = rfdc();

const GET_ALL = "appointmentEdit/getAll";
const CLEAN = "appointmentEdit/clean";

const allAppointments = (appointments) => {
  return {
    type: GET_ALL,
    payload: appointments,
  };
};
export const cleanAppointmentEdit = () => {
  return {
    type: CLEAN,
  };
};

export const editAppointmentGetAll = () => async (dispatch) => {
  const response = await csrfFetch(`/api/appointments`, {
    method: "GET",
  });
  const appointments = await response.json();

  dispatch(allAppointments(appointments));
  return appointments;
};

export const clean = () => (dispatch) => {
  dispatch(cleanAppointmentEdit());
};
const initialState = {};

const appointmentEditReducer = (state = initialState, action) => {
  // let newState = clone(state);
  switch (action.type) {
    case GET_ALL:
      return action.payload.appointments;
    case CLEAN:
      return {};
    default:
      return state;
  }
};

export default appointmentEditReducer;
