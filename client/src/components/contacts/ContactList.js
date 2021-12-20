import React, { useContext } from "react";
import { v4 as uuid } from "uuid";
import ContactItem from "./ContactItem";
import ContactContext from "../../contexts/contacts/contactContext";

const ContactList = () => {
  const contactContext = useContext(ContactContext);
  const { contacts, filteredContacts } = contactContext;
  return (
    <div className='container'>
      {filteredContacts
        ? filteredContacts.map((contact) => {
            if (!contact.id) {
              contact.id = uuid();
            }
            return <ContactItem key={contact.id} contact={contact} />;
          })
        : contacts.map((contact) => {
            if (!contact.id) {
              contact.id = uuid();
            }
            return <ContactItem key={contact.id} contact={contact} />;
          })}
    </div>
  );
};

export default ContactList;
