import { Autocomplete } from "@react-google-maps/api";
import { useRef, useState } from "react";
import pluralize from "pluralize";
import { FaInfoCircle } from "react-icons/fa";

import { LatLngWithPlace, LocationChip } from "./LocationChip";
import styled from "styled-components";
import { boxShadow, boxShadowNoTop } from "./constants";
import { Expander } from "./Expander";
import { useGroupMeetingSpotContext } from "./context/GroupMeetingSpot";
import { useColorThemeContext } from "./context/ColorTheme";

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
  const { theme } = useColorThemeContext();

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

  // Styled Components
  const Label = styled.label`
    font-weight: bold;
    margin-bottom: 0.25rem;
    display: block;
  `;

  const Helper = styled.div`
    padding: 0.5rem 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: ${theme.textColorSecondary};
    font-size: 0.75rem;
  `;
  const inputStyle = {
    padding: "1rem",
    width: "100%",
    borderRadius: "10px",
    border: `1px solid ${theme.borderColorPrimary}`,
    marginBottom: "0.5rem",
    background: theme.backgroundColorPrimary,
    color: theme.textColorPrimary,
  };
  const Divider = styled.div`
    border-bottom: 1px solid ${theme.borderColorPrimary};
  `;

  return (
    <div
      style={{
        width: isMobile ? "auto" : "35rem",
        background: theme.backgroundColorPrimary,
        color: theme.textColorPrimary,
        boxShadow: isMobile ? boxShadow : boxShadowNoTop,
        zIndex: 1,
        padding: "1rem 0",
      }}
    >
      <div style={{ padding: "0.25rem 1rem" }}>
        <Label htmlFor="address">Add at least two addresses</Label>
        <Autocomplete
          onLoad={onAutocompleteLoad}
          onPlaceChanged={onPlaceChanged}
        >
          <input
            style={inputStyle}
            placeholder="Add address"
            ref={inputRef}
            id="address"
            type="text"
          />
        </Autocomplete>
        <Label htmlFor="meetingSpot">Type of Meeting Spot</Label>
        <input
          style={inputStyle}
          placeholder="e.g. restaurant, bar, coffee"
          value={placeType}
          onChange={({ target: { value } }) => setPlaceType(value)}
          id="meetingSpot"
        />
      </div>
      {locations.length < 2 ? (
        <Helper>
          <FaInfoCircle />
          <div>
            Enter at least {2 - locations.length} more{" "}
            {pluralize("addresses", 2 - locations.length)}
          </div>
        </Helper>
      ) : null}
      {meetingSpot && (
        <>
          <Divider />
          <div style={{ padding: "0.25rem 1rem" }}>
            <Expander
              label={
                <h3 style={{ color: theme.textColorSuccess }}>
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
          <Divider />
          <div style={{ padding: "0.25rem 1rem" }}>
            <Expander
              label={<h3>Addresses ({locations.length})</h3>}
              isMobile={isMobile}
            >
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
