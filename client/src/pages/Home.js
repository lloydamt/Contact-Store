import React from "react";
import ContactForm from "../components/contacts/ContactForm";
import ContactList from "../components/contacts/ContactList";
import ContactsFilter from "../components/contacts/ContactsFilter";

const Home = () => {
  return (
    <div className='container p-1'>
      <div className='grid-2'>
        <div>
          <ContactForm />
        </div>
        <div>
          <ContactsFilter />
          <ContactList />
        </div>
      </div>
    </div>
  );
};

export default Home;
