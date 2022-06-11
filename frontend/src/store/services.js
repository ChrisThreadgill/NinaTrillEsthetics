import { csrfFetch } from "./csrf";
import rfdc from "rfdc";
const clone = rfdc();

const GET_ALL = "services/getAll";
const GET_ONE = "services/getone";
const UPDATE = "/services/update";
const CLEAN = "services/clean";
const DELETE = "services/delete";
const ADD_SERVICE = "services/add";

const allServices = (services) => {
  return {
    type: GET_ALL,
    payload: services,
  };
};
const addService = (service) => {
  return {
    type: ADD_SERVICE,
    payload: service,
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

export const getAllServices = () => async (dispatch) => {
  const response = await csrfFetch(`/api/services`, {
    method: "GET",
  });
  const services = await response.json();

  dispatch(allServices(services));
  return services;
};

export const addOneService = (service) => async (dispatch) => {
  const newService = await csrfFetch(`/api/services`, {
    method: "POST",
    body: JSON.stringify(service),
  });
  const response = await newService.json();
  console.log(response);

  dispatch(addService(response.newService));
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
  console.log("in the thunk");
  const serviceToDelete = await csrfFetch(`/api/services/managerDelete`, {
    method: "DELETE",
    body: JSON.stringify({ serviceId }),
  });
  const response = await serviceToDelete.json();
  console.log(response);

  dispatch(deleteService(serviceId));
};

export const clean = () => (dispatch) => {
  dispatch(cleanServices());
};
const initialState = {};

const servicesReducer = (state = initialState, action) => {
  let newState = clone(state);
  switch (action.type) {
    case ADD_SERVICE:
      newState[action.payload.id] = action.payload;
      return newState;
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
      console.log(newState, "this is the new state");
      delete newState[action.payload];
      return newState;
    case CLEAN:
      return {};
    default:
      return state;
  }
};

export default servicesReducer;
