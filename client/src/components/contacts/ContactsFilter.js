import React, { useState, useEffect, useRef, useContext } from "react";
import ContactContext from "../../contexts/contacts/contactContext";

const ContactsFilter = () => {
  const contactContext = useContext(ContactContext);
  const { setFilter, filteredContacts, clearFilter } = contactContext;
  const [input, setInput] = useState("");
  const inputRef = useRef();

  useEffect(() => {
    setFilter(input);
    if (input === "") {
      clearFilter();
    }
  }, [input]);

  const onInputChange = (e) => {
    setInput(e.target.value);
  };

  const onButtonClick = () => {
    setInput("");
    inputRef.current.focus();
  };

  return (
    <div className='container'>
      <input
        ref={inputRef}
        type='text'
        name='input'
        value={input}
        onChange={onInputChange}
        style={filteredContacts ? filterStyle : defaultStyle}
        placeholder='Search...'
      />
      {filteredContacts && (
        <button
          style={{ display: "inline-block", marginLeft: "1em" }}
          className='btn btn-default btn-sm'
          onClick={onButtonClick}
        >
          Clear
        </button>
      )}
    </div>
  );
};

const filterStyle = {
  display: "inline-block",
  width: "82%",
};

const defaultStyle = {
  width: "100%",
};

export default ContactsFilter;
