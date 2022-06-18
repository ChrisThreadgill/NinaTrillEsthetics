import { csrfFetch } from "./csrf";
import rfdc from "rfdc";
const clone = rfdc();

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
  console.log(appointments);

  dispatch(allAppointments(appointments));
  return appointments;
};
// export const cancelAppointment = (appointmentId) => async (dispatch) => {
//   console.log("in the thunk");
//   const cancelledAppointment = await csrfFetch(`/api/appointments/${appointmentId}`, {
//     method: "DELETE",
//   });
//   const response = await cancelledAppointment.json();

//   dispatch(cancelOneAppointment(appointmentId));
//   return response;
// };

export const clean = () => (dispatch) => {
  dispatch(cleanAppointmentEdit());
};
const initialState = {};

const appointmentEditReducer = (state = initialState, action) => {
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
    // case ALL_CUSTOMER:
    //   const customerAppointments = {};
    //   console.log(action.payload);
    //   for (let appointment of action.payload.appointments) {
    //     customerAppointments[appointment.id] = appointment;
    //   }

    //   return { ...customerAppointments };

    // case DELETE:
    //   delete newState[action.payload];
    //   return newState;
    case CLEAN:
      return {};
    default:
      return state;
  }
};

export default appointmentEditReducer;
