import React, { useContext, useEffect } from "react";
import ContactItem from "./ContactItem";
import ContactContext from "../../contexts/contacts/contactContext";
import Spinner from "../layout/Spinner";

const ContactList = () => {
  const contactContext = useContext(ContactContext);
  const { contacts, filteredContacts, loadContacts, loading } = contactContext;

  useEffect(() => {
    loadContacts();
  }, []);

  if (contacts !== null && contacts.length === 0) {
    return <h3>Add a contact</h3>;
  }

  return (
    <>
      {contacts !== null && !loading ? (
        <div className='container'>
          {filteredContacts !== null
            ? filteredContacts.map((contact) => {
                return <ContactItem key={contact._id} contact={contact} />;
              })
            : contacts !== null &&
              contacts.map((contact) => {
                return <ContactItem key={contact._id} contact={contact} />;
              })}
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default ContactList;
