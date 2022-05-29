import { Autocomplete } from "@react-google-maps/api";
import { useRef, useState } from "react";
import { LatLngWithPlace, LocationChip } from "./LocationChip";
import styled from "styled-components";
import { boxShadow, boxShadowNoTop } from "./constants";
import { Expander } from "./Expander";
import { useGroupMeetingSpotContext } from "./context";

const inputStyle = {
  padding: "1rem",
  width: "100%",
  borderRadius: "10px",
  border: "1px solid #ccc",
  marginBottom: "0.5rem",
};

const Label = styled.label`
  font-weight: bold;
`;
export const ControlCard: React.FC = () => {
  // Context
  const {
    locations,
    setLocations,
    isMobile,
    placeType,
    setPlaceType,
    meetingSpot,
  } = useGroupMeetingSpotContext();

  // State
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete>();
  const inputRef = useRef<HTMLInputElement>(null);

  // Handlers
  const onAutocompleteLoad = (
    autocomplete: google.maps.places.Autocomplete
  ) => {
    setAutocomplete(autocomplete);
  };
  const onPlaceChanged = () => {
    if (!autocomplete) {
      console.error("autocomplete not defined");
      return;
    }

    const place = autocomplete.getPlace();
    const { geometry } = place;

    if (!geometry) {
      console.error("place.geometry not defined", place);
      return;
    }

    const { location } = geometry;

    if (!location) {
      console.error("place.geometry.location is not defined");
      return;
    }
    const newLocation: LatLngWithPlace = {
      lat: location.lat(),
      lng: location.lng(),
      place,
    };

    setLocations([...locations, newLocation]);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };
  const onRemove = (idx: number) => {
    locations[idx].directionsRenderer?.setDirections({ routes: [] });
    locations.splice(idx, 1);
    setLocations([...locations]);
  };

  return (
    <div
      style={{
        width: isMobile ? "auto" : "35rem",
        background: "white",
        boxShadow: isMobile ? boxShadow : boxShadowNoTop,
        zIndex: 1,
      }}
    >
      <div style={{ padding: "0.25rem 1rem" }}>
        <Label>
          Add at least two addresses
          <Autocomplete
            onLoad={onAutocompleteLoad}
            onPlaceChanged={onPlaceChanged}
          >
            <input
              placeholder="Add address"
              style={inputStyle}
              ref={inputRef}
            />
          </Autocomplete>
        </Label>
        <Label>
          Meeting Spot Search
          <input
            placeholder="e.g. restaurant, bar, coffee"
            style={inputStyle}
            value={placeType}
            onChange={({ target: { value } }) => setPlaceType(value)}
          />
        </Label>
      </div>
      {meetingSpot && (
        <>
          <div style={{ borderBottom: "1px solid #ccc" }} />
          <div style={{ padding: "0.25rem 1rem" }}>
            <Expander
              label={
                <h3 style={{ color: "green" }}>
                  Meet at {meetingSpot.place?.name}!
                </h3>
              }
              isMobile={isMobile}
            >
              <LocationChip location={meetingSpot} idx={"M"} />
            </Expander>
          </div>
        </>
      )}
      {Boolean(locations.length) && (
        <>
          <div style={{ borderBottom: "1px solid #ccc" }} />
          <div style={{ padding: "0.25rem 1rem" }}>
            <Expander label={<h3>Addresses</h3>} isMobile={isMobile}>
              <>
                {locations.map((location, idx) => (
                  <LocationChip
                    location={location}
                    idx={`${idx + 1}`}
                    onRemove={() => onRemove(idx)}
                    key={location.place?.place_id}
                  />
                ))}
              </>
            </Expander>
          </div>
        </>
      )}
    </div>
  );
};
