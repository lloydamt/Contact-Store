import React, { useContext } from "react";
import AlertContext from "../../contexts/alert/alertContext";

const Alert = () => {
  const alertContext = useContext(AlertContext);
  const { alerts } = alertContext;
  return (
    alerts.length > 0 &&
    alerts.map((alert) => (
      <div key={alert.id} className={`alert alert-${alert.type}`}>
        <p>
          <i className='fas fa-exclamation-circle'></i>
          {" " + alert.msg}
        </p>
      </div>
    ))
  );
};

export default Alert;
