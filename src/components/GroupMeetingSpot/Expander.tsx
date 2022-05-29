import { useMediaQuery } from "@react-hook/media-query";
import React, { useState } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";

export interface ExpanderProps {
  label: React.ReactNode;
  children: React.ReactNode;
  isMobile: boolean;
}
export const Expander: React.FC<ExpanderProps> = ({
  label,
  children,
  isMobile,
}) => {
  const [isExpanded, setIsExpanded] = useState(!isMobile);

  return (
    <div>
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {label}
        {isExpanded ? <FaChevronDown /> : <FaChevronRight />}
      </div>
      {isExpanded ? <div>{children}</div> : null}
    </div>
  );
};
