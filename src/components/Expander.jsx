import React, { useState } from "react";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";

export const Expander = ({ label, children }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="sk-expander">
      <div
        className="sk-work-item-title sk-expander-title"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? <FaMinusCircle /> : <FaPlusCircle />} {label}
      </div>
      {isExpanded ? (
        <div className="sk-expander-content">{children}</div>
      ) : null}
    </div>
  );
};
