import React, { useCallback, useEffect, useState } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";

import { LatLngWithPlace } from "./LocationChip";
import { useGroupMeetingSpotContext } from "./context/GroupMeetingSpot";
import { useColorThemeContext } from "./context/ColorTheme";
import { FaSpinner } from "react-icons/fa";

const containerStyle = {
  width: "100%",
  height: "100%",
};

export const Map: React.FC = () => {
  // Context
  const { locations, meetingSpot, setMap, setBounds } =
    useGroupMeetingSpotContext();
  const { theme } = useColorThemeContext();

  // State
  const [onLoadComplete, setOnLoadComplete] = useState(false);
  const [mapCenter, setMapCenter] = useState<LatLngWithPlace>();

  const onLoad = useCallback(
    function callback(map: google.maps.Map) {
      setBounds(new google.maps.LatLngBounds());
      setMap(map);
    },
    [setMap, setBounds]
  );

  useEffect(() => {
    try {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude: lat, longitude: lng } = position.coords;
          setMapCenter({ lat, lng });
        },
        (error) => {
          throw error;
        }
      );
    } catch (e) {
      console.error("navigator.geolocation error", e);
    }
  }, [mapCenter?.lat, mapCenter?.lng]);

  const onUnmount = useCallback(
    function callback(map: google.maps.Map) {
      setMap(undefined);
    },
    [setMap]
  );

  const onComplete = () => {
    if (!onLoadComplete) {
      setOnLoadComplete(true);
    }
  };

  return (
    <div style={{ position: "relative", height: "100%", width: "100%" }}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={mapCenter}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onTilesLoaded={onComplete}
      >
        <>
          {meetingSpot && <Marker position={meetingSpot} label="M" />}
          {locations.map((location, idx) => (
            <Marker
              position={location}
              label={`${idx + 1}`}
              key={location.place?.place_id}
            />
          ))}
        </>
      </GoogleMap>
      {!onLoadComplete && (
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
      )}
    </div>
  );
};
