import React, { useReducer } from "react";
import { v4 as uuid } from "uuid";
import axios from "axios";
import ContactContext from "./contactContext";
import contactReducer from "./contactReducer";
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

const ContactState = (props) => {
  const initialState = {
    contacts: null,
    currentContact: null,
    filteredContacts: null,
    error: null,
    loading: true,
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  // Load Contacts
  const loadContacts = async () => {
    try {
      const res = await axios.get("/api/contacts");
      dispatch({ type: LOAD_CONTACTS, payload: res.data });
    } catch (err) {
      dispatch({ type: CONTACTS_ERROR, payload: err.response.data.msg });
    }
  };

  // Add a contact
  const addContact = async (contact) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/contacts", contact, config);
      dispatch({ type: ADD_CONTACT, payload: res.data });
    } catch (err) {
      dispatch({ type: CONTACTS_ERROR, payload: err.response.data.msg });
    }
  };

  // Delete a contact
  const deleteContact = async (contact) => {
    try {
      await axios.delete(`/api/contacts/${contact._id}`);
      dispatch({ type: DELETE_CONTACT, payload: contact });
    } catch (err) {
      dispatch({ type: CONTACTS_ERROR, payload: err.response.data.msg });
    }
  };

  // Set a contact
  const setContact = (contact) => {
    dispatch({ type: SET_CONTACT, payload: contact });
  };

  // Update a contact
  const updateContact = async (contact) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.put(
        `/api/contacts/${contact._id}`,
        contact,
        config
      );
      dispatch({ type: UPDATE_CONTACT, payload: res.data });
    } catch (err) {
      dispatch({ type: CONTACTS_ERROR, payload: err.response.data.msg });
    }
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

  // Clear error
  const clearError = () => {
    dispatch({ type: CLEAR_ERROR });
  };

  const emptyContacts = () => {
    dispatch({ type: EMPTY_CONTACTS });
  };

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        currentContact: state.currentContact,
        filteredContacts: state.filteredContacts,
        loadContacts,
        addContact,
        deleteContact,
        setContact,
        updateContact,
        clearCurrent,
        setFilter,
        clearFilter,
        clearError,
        emptyContacts,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
