import { csrfFetch } from "./csrf";
import rfdc from "rfdc";
const clone = rfdc();

const GET_ALL = "services/getAll";
const GET_ONE = "services/getone";
const UPDATE = "/services/update";
const CLEAN = "services/clean";
const DELETE = "services/delete";

const allServices = (services) => {
  return {
    type: GET_ALL,
    payload: services,
  };
};

const oneService = (service) => {
  return {
    type: GET_ONE,
    payload: service,
  };
};

const updateService = (service) => {
  return {
    type: UPDATE,
    payload: service,
  };
};
const deleteService = () => {
  return {
    type: CLEAN,
  };
};
const cleanServices = () => {
  return {
    type: CLEAN,
  };
};

export const getAllServices = () => async (dispatch) => {
  const response = await csrfFetch(`/api/services`, {
    method: "GET",
  });
  const services = await response.json();

  dispatch(allServices(services));
  return services;
};
export const updateOneService = (serviceId, body) => async (dispatch) => {
  const response = await csrfFetch(`/api/services/${serviceId}`, {
    method: "PUT",
    body: JSON.stringify(body),
  });
  const service = await response.json();
  console.log(service);

  dispatch(updateService(service.serviceToUpdate));
};
export const deleteOneService = (serviceId) => async (dispatch) => {
  const serviceToDelete = await csrfFetch(`/api/services/${serviceId}`, {
    method: "DELETE",
  });
  const response = await serviceToDelete.json();
  console.log(response);

  dispatch(deleteService(serviceId));
  return serviceToDelete;
};

export const clean = () => (dispatch) => {
  dispatch(cleanServices());
};
const initialState = {};

const servicesReducer = (state = initialState, action) => {
  let newState = clone(state);
  switch (action.type) {
    case GET_ALL:
      const services = {};

      for (let service of action.payload.services) {
        services[service.id] = service;
      }

      return { ...services };
    case UPDATE:
      // delete newState[action.payload.id];

      newState[action.payload.id] = action.payload;

      return newState;

    case DELETE:
      delete newState[action.payload];
      return newState;
    case CLEAN:
      return {};
    default:
      return state;
  }
};

export default servicesReducer;
