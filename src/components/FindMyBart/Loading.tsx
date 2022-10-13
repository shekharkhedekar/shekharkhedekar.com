import React from "react";
import { FaSpinner } from "react-icons/fa";

export const Loading: React.FC = () => (
    <div
        style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#9cc0f9",
        }}
    >
        <div
            style={{
                color: "#000",
                fontSize: "1.5rem",
                textShadow: "0 0 2px white, 0 0 2px white, 0 0 2px white",
            }}
        >
            <FaSpinner className="fa-spin" />
            Loading map
        </div>
    </div>
);
