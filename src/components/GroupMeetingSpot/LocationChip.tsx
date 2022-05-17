import React from "react";
import { FaTimes } from "react-icons/fa";
export interface LatLngWithPlace extends google.maps.LatLngLiteral {
  place?: google.maps.places.PlaceResult;
  distance?: string;
  directionsRenderer?: google.maps.DirectionsRenderer;
}

export interface LocationChipProps {
  location?: LatLngWithPlace;
  idx: string;
  onRemove?: () => void;
  isMeetingSpot?: boolean;
}

export const LocationChip: React.FC<LocationChipProps> = ({
  location,
  idx,
  onRemove,
  isMeetingSpot,
}) =>
  location ? (
    <div
      style={{
        margin: "0.5rem 0",
        background: "white",
        color: "#444",
        padding: "1rem",
        border: "1px solid #ccc",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{ display: "flex", alignItems: "center", marginRight: "1rem" }}
      >
        <div
          style={{
            background: "#f40",
            borderRadius: "50%",
            width: "2rem",
            height: "2rem",
            textAlign: "center",
            padding: "0.5rem",
            marginRight: "1rem",
            lineHeight: "1rem",
          }}
        >
          {idx}
        </div>
        <div>
          <div>
            {isMeetingSpot && <strong>Meeting Spot:</strong>}
            {location.place?.name}
          </div>
          <div style={{ color: "#aaa", fontSize: ".8rem" }}>
            {location.place?.formatted_address}
            <div>{location.distance}</div>
          </div>
        </div>
      </div>
      {!isMeetingSpot && (
        <button
          style={{ border: 0, background: "transparent", cursor: "pointer" }}
          onClick={onRemove}
          type="button"
        >
          <FaTimes />
        </button>
      )}
    </div>
  ) : null;
