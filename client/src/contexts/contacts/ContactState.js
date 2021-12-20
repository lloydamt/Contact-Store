import React, { useReducer } from "react";
import { v4 as uuid } from "uuid";
import ContactContext from "./contactContext";
import contactReducer from "./contactReducer";
import {
  ADD_CONTACT,
  UPDATE_CONTACT,
  DELETE_CONTACT,
  SET_CONTACT,
  CLEAR_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
} from "../types";

const ContactState = (props) => {
  const initialState = {
    contacts: [
      {
        name: "Ken Smith",
        email: "ken@gmail.com",
        phone: "111-111-1111",
        type: "professional",
      },
      {
        name: "Jen Blem",
        email: "jen@gmail.com",
        phone: "222-222-2222",
        type: "professional",
      },
      {
        name: "Phil Collins",
        email: "phil@gmail.com",
        phone: "333-333-3333",
        type: "personal",
      },
    ],
    currentContact: null,
    filteredContacts: null,
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  // Add a contact
  const addContact = (contact) => {
    contact.id = uuid();
    dispatch({ type: ADD_CONTACT, payload: contact });
  };

  // Delete a contact
  const deleteContact = (contact) => {
    dispatch({ type: DELETE_CONTACT, payload: contact });
  };

  // Set a contact
  const setContact = (contact) => {
    dispatch({ type: SET_CONTACT, payload: contact });
  };

  // Update a contact
  const updateContact = (contact) => {
    dispatch({ type: UPDATE_CONTACT, payload: contact });
  };

  // Clear current contact
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CONTACT });
  };

  // Filter the contacts
  const setFilter = (text) => {
    dispatch({ type: FILTER_CONTACTS, payload: text });
  };

  // Empty the filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        currentContact: state.currentContact,
        filteredContacts: state.filteredContacts,
        addContact,
        deleteContact,
        setContact,
        updateContact,
        clearCurrent,
        setFilter,
        clearFilter,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
