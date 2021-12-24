import React, { useState, useContext, useEffect } from "react";
import ContactContext from "../../contexts/contacts/contactContext";

const ContactForm = () => {
  const contactContext = useContext(ContactContext);
  const { addContact, currentContact, updateContact, clearCurrent } =
    contactContext;
  const initialState = {
    name: "",
    email: "",
    phone: "",
    type: "personal",
  };
  const [state, setInput] = useState(initialState);
  const { name, email, phone, type } = state;

  useEffect(() => {
    currentContact && setInput(currentContact);
  }, [currentContact]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setInput({
      ...state,
      [name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (currentContact) {
      updateContact(state);
    } else {
      addContact(state);
    }
    setInput(initialState);
    clearCurrent();
  };

  const onClearClick = () => {
    clearCurrent();
    setInput(initialState);
  };

  return (
    <div className='form-container'>
      <h1 className='text-center text-primary'>
        {currentContact ? "Update Contact" : "Add Contact"}
      </h1>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input
            type='text'
            name='name'
            value={name}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='name'>Email Address</label>
          <input
            type='email'
            name='email'
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='phone'>Phone</label>
          <input type='text' name='phone' value={phone} onChange={onChange} />
        </div>
        <div className='form-group'>
          <label htmlFor='type'>Professional </label>
          <input
            type='radio'
            name='type'
            className='pr-2'
            value='professional'
            onChange={onChange}
            checked={type === "professional"}
          />
          {"      "}
          <label htmlFor='type' value='Personal'>
            Personal{" "}
          </label>
          <input
            type='radio'
            name='type'
            value='personal'
            onChange={onChange}
            checked={type === "personal"}
          />
        </div>
        <input
          type='submit'
          value={currentContact ? "Update" : "Add Contact"}
          className='btn btn-lg btn-block bg-dark-grey'
        />
      </form>
      {(name || email || phone) && (
        <div>
          <input
            type='button'
            value='Clear'
            className='btn btn-lg btn-block bg-dark'
            onClick={onClearClick}
          />
        </div>
      )}
    </div>
  );
};

export default ContactForm;
