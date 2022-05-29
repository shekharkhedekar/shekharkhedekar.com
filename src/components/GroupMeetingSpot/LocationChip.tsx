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
}

export const LocationChip: React.FC<LocationChipProps> = ({
  location,
  idx,
  onRemove,
}) =>
  location ? (
    <div
      style={{
        margin: "0.5rem 0",
        background: "white",
        color: "#444",
        padding: "1rem",
        border: "1px solid #aaa",
        borderRadius: "10px",

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
            <a
              style={{ color: "rgb(112,112,255" }}
              href={`https://www.google.com/maps/search/?api=1&query=${
                location.place?.formatted_address &&
                encodeURIComponent(location.place?.formatted_address)
              }&query_place_id=${location.place?.place_id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {location.place?.name}
            </a>
          </div>
          <div style={{ color: "#aaa", fontSize: ".8rem" }}>
            {location.place?.formatted_address}
            <div>{location.distance}</div>
          </div>
        </div>
      </div>
      {idx !== "M" && (
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
