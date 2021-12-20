import {
  ADD_CONTACT,
  UPDATE_CONTACT,
  DELETE_CONTACT,
  SET_CONTACT,
  CLEAR_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
} from "../types";

const contactReducer = (state, action) => {
  switch (action.type) {
    case ADD_CONTACT:
      return {
        ...state,
        contacts: [...state.contacts, action.payload],
      };
    case DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(
          (contact) => contact.id !== action.payload.id
        ),
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
          if (contact.id !== action.payload.id) {
            return contact;
          }
          return action.payload;
        }),
        currentContact: null,
      };
    case CLEAR_CONTACT:
      return {
        ...state,
        currentContact: null,
      };
    case FILTER_CONTACTS:
      const regex = new RegExp(action.payload, "gi");
      return {
        ...state,
        filteredContacts: state.contacts.filter(
          (contact) => contact.name.match(regex) || contact.email.match(regex)
        ),
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filteredContacts: null,
      };
    default:
      return state;
  }
};

export default contactReducer;
