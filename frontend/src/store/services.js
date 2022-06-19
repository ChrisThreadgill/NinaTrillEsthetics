import { csrfFetch } from "./csrf";
import rfdc from "rfdc";
const clone = rfdc();

const GET_ALL = "services/getAll";
// const GET_ONE = "services/getone";
const UPDATE = "/services/update";
const CLEAN = "services/clean";
const DELETE = "services/delete";
const ADD_SERVICE = "services/add";
// const ADD_RELATION = "services/addRELATION";

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

// const addServiceRelation = (service) => {
//   return {
//     type: ADD_RELATION,
//     payload: service,
//   };
// };

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

  dispatch(addService(response.newService));
};

export const updateOneService = (serviceId, body) => async (dispatch) => {
  const response = await csrfFetch(`/api/services/${serviceId}`, {
    method: "PUT",
    body: JSON.stringify(body),
  });
  const service = await response.json();

  dispatch(updateService(service.serviceToUpdate));
};
export const deleteOneService = (serviceId) => async (dispatch) => {
  const serviceToDelete = await csrfFetch(`/api/services/managerDelete`, {
    method: "DELETE",
    body: JSON.stringify({ serviceId }),
  });
  const response = await serviceToDelete.json();
  dispatch(deleteService(serviceId));
  return response;
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
      delete newState[action.payload];
      return newState;
    case CLEAN:
      return {};
    default:
      return state;
  }
};

export default servicesReducer;
