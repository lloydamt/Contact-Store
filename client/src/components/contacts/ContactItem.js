import React, { useContext } from "react";
import ContactContext from "../../contexts/contacts/contactContext";
import PropTypes from "prop-types";

const ContactItem = ({ contact }) => {
  const contactContext = useContext(ContactContext);
  const { deleteContact, setContact } = contactContext;

  const { _id, name, email, phone, type } = contact;

  //onDelete only requires ID as the only field being checked in the reducer is the contact's ID
  const onDelete = () => {
    deleteContact({ _id });
  };

  const onEdit = () => {
    setContact({ _id, name, email, phone, type });
  };

  return (
    <div className='card bg-light'>
      <div>
        <i className='fas fa-id-badge'></i> <strong>{name + " "}</strong>
        <p
          className={
            type === "professional" ? "badge bg-navy" : "badge bg-success"
          }
          style={{ float: "right" }}
        >
          {type[0].toUpperCase() + type.slice(1)}
        </p>
      </div>
      <div className='m'>
        {email && (
          <p>
            <i className='fas fa-at'></i>
            {" " + email}
          </p>
        )}
      </div>
      <div className='m'>
        {phone && (
          <p>
            <i className='fas fa-phone'></i>
            {" " + phone}
          </p>
        )}
      </div>
      <div>
        <button className='btn btn-sm bg-dark' onClick={onEdit}>
          Edit
        </button>
        <button className='btn btn-sm bg-danger' onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired,
};

export default ContactItem;
