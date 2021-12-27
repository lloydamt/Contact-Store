import {
  LOAD_CONTACTS,
  ADD_CONTACT,
  UPDATE_CONTACT,
  DELETE_CONTACT,
  SET_CONTACT,
  CLEAR_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  EMPTY_CONTACTS,
  CONTACTS_ERROR,
  CLEAR_ERROR,
} from "../types";

const contactReducer = (state, action) => {
  switch (action.type) {
    case LOAD_CONTACTS:
      return {
        ...state,
        contacts: action.payload,
        loading: false,
      };
    case ADD_CONTACT:
      return {
        ...state,
        contacts: [action.payload, ...state.contacts],
        loading: false,
      };
    case DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(
          (contact) => contact._id !== action.payload._id
        ),
        loading: false,
      };
    case SET_CONTACT:
      return {
        ...state,
        currentContact: action.payload,
      };
    case UPDATE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map((contact) => {
          if (contact._id !== action.payload._id) {
            return contact;
          }

          return action.payload;
        }),
        currentContact: null,
        loading: false,
      };
    case CLEAR_CONTACT:
      return {
        ...state,
        currentContact: null,
      };
    case EMPTY_CONTACTS:
      return {
        contacts: null,
        loading: true,
        error: null,
        filteredContacts: null,
      };
    case FILTER_CONTACTS:
      const regex = new RegExp(`${action.payload}`, "gi");
      return {
        ...state,
        filteredContacts:
          state.contacts !== null &&
          state.contacts.filter(
            (contact) => contact.name.match(regex) || contact.email.match(regex)
          ),
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filteredContacts: null,
      };
    case CONTACTS_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export default contactReducer;
