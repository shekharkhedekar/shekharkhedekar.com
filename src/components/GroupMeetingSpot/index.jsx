import React, { useCallback, useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  Autocomplete,
  Marker,
} from "@react-google-maps/api";

import secrets from "../../secrets.json";
const containerStyle = {
  width: "100%",
  height: "100%",
};

const LocationChip = ({ location, idx }) => (
  <div style={{ margin: "1rem 0", background: "white", padding: "1rem" }}>
    {idx + 1}. {location.label}
  </div>
);

function GroupMeetingSpot() {
  const { isLoaded } = useLoadScript({
    id: "google-map-script",
    googleMapsApiKey: secrets.GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const [map, setMap] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);
  const [locations, setLocations] = useState([]);
  const [bounds, setBounds] = useState();
  const [meetingSpot, setMeeetingSpot] = useState();

  const onLoad = useCallback(function callback(map) {
    setBounds(new window.google.maps.LatLngBounds());
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude: lat, longitude: lng } = position.coords;
        map.setCenter({ lat, lng });
        setMap(map);
      });
    } else {
      setMap(map);
    }
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  const onAutocompleteLoad = (autocomplete) => {
    setAutocomplete(autocomplete);
  };

  const onPlaceChanged = () => {
    const place = autocomplete.getPlace();
    const { geometry, formatted_address } = place;
    const { location } = geometry;
    const newLocation = {
      lat: location.lat(),
      lng: location.lng(),
      label: formatted_address,
    };
    bounds.extend(newLocation);
    setMeeetingSpot(bounds.getCenter());
    map.fitBounds(bounds);
    setLocations([...locations, newLocation]);
  };

  return isLoaded ? (
    <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        <>
          {meetingSpot && <Marker position={meetingSpot} label="C" />}
          {locations.map((location, idx) => (
            <Marker position={location} label={`${idx + 1}`} />
          ))}
        </>
      </GoogleMap>
      <div style={{ position: "absolute", top: 75, left: 10 }}>
        <Autocomplete
          onLoad={onAutocompleteLoad}
          onPlaceChanged={onPlaceChanged}
        >
          <input
            placeholder="Add address"
            style={{ padding: "1rem", width: "20rem" }}
          />
        </Autocomplete>
        <div>
          {locations.map((location, idx) => (
            <LocationChip location={location} idx={idx} />
          ))}
        </div>
      </div>
    </>
  ) : null;
}

export default React.memo(GroupMeetingSpot);
