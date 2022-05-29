import React, { useCallback, useEffect, useState } from "react";
import { useLoadScript } from "@react-google-maps/api";

import secrets from "../../secrets.json";
import { LatLngWithPlace } from "./LocationChip";
import { Map } from "./Map";
import { useDebounce } from "use-debounce";
import { ControlCard } from "./ControlCard";
import { useMediaQuery } from "@react-hook/media-query";
import { Header } from "./Header";
import { GroupMeetingContextProvider } from "./context";

const libraries = ["places"];

function GroupMeetingSpot() {
  const { isLoaded } = useLoadScript({
    id: "google-map-script",
    googleMapsApiKey: secrets.GOOGLE_MAPS_API_KEY,
    // @ts-ignore
    libraries,
  });

  const isMobile = useMediaQuery("screen and (max-width: 600px)");
  const [map, setMap] = useState<google.maps.Map>();

  const [locations, setLocations] = useState<LatLngWithPlace[]>([]);
  const [bounds, setBounds] = useState<google.maps.LatLngBounds>();
  const [meetingSpot, setMeetingSpot] = useState<LatLngWithPlace>();
  const [mapCenter, setMapCenter] = useState<LatLngWithPlace>();
  const [placeType, setPlaceType] = useState("Restaurant");
  const [debouncedPlaceType] = useDebounce(placeType, 250);

  const getDirections = useCallback(async () => {
    if (!map) return;
    let directionsService = new google.maps.DirectionsService();

    for (const location of locations) {
      if (!location.directionsRenderer) {
        location.directionsRenderer = new google.maps.DirectionsRenderer({
          markerOptions: { visible: false },
          preserveViewport: true,
        });
        location.directionsRenderer.setMap(map);
      }

      location.directionsRenderer.setDirections({ routes: [] });

      if (!meetingSpot) {
        return;
      }

      const route: google.maps.DirectionsRequest = {
        origin: location,
        destination: meetingSpot,
        travelMode: google.maps.TravelMode.DRIVING,
      };
      const response = await directionsService.route(route);
      if (!response) {
        return;
      }

      location.directionsRenderer?.setDirections(response);
      var directionsData = response?.routes[0].legs[0];
      location.distance = directionsData?.distance?.text;

      setLocations(locations);
    }
  }, [locations, map, meetingSpot]);
  const getMeetingSpot = useCallback(() => {
    if (locations.length > 1) {
      const newCenter: google.maps.LatLngLiteral = locations.reduce(
        (acc, location) => {
          return {
            lat: acc.lat ? (acc.lat + location.lat) / 2 : location.lat,
            lng: acc.lng ? (acc.lng + location.lng) / 2 : location.lng,
          };
        }
      );
      if (map) {
        const placesService = new google.maps.places.PlacesService(map);
        placesService.findPlaceFromQuery(
          {
            locationBias: newCenter,
            fields: ["formatted_address", "name", "geometry"],
            query: debouncedPlaceType,
          },
          (res) => {
            if (!res) return;
            const place = res[0];
            const lat = place.geometry?.location?.lat();
            const lng = place.geometry?.location?.lng();

            if (lat && lng) {
              setMeetingSpot({ lat, lng, place });
            }
          }
        );
      }

      console.log({ map, bounds });
      if (map && bounds) {
        locations.forEach((location) => bounds?.extend(location));
        map.fitBounds(bounds);
      }
    } else {
      setMeetingSpot(undefined);
    }
  }, [bounds, debouncedPlaceType, locations, map]);

  useEffect(() => {
    getMeetingSpot();
  }, [getMeetingSpot]);

  useEffect(() => {
    if (meetingSpot) {
      getDirections();
    }
  }, [meetingSpot, getDirections]);

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
  const value = {
    locations,
    setLocations,
    meetingSpot,
    setMeetingSpot,
    placeType,
    setPlaceType,
    isMobile,
    map,
    setMap,
    setBounds,
  };

  if (!isLoaded) {
    return null;
  }

  return (
    <GroupMeetingContextProvider value={value}>
      {isMobile ? (
        <div
          style={{ display: "flex", flexDirection: "column", height: "100vh" }}
        >
          <Header />
          <Map />
          <ControlCard />
        </div>
      ) : (
        <div style={{ height: "100vh", width: "100%", position: "relative" }}>
          <Header />
          <div
            style={{
              display: "flex",
              height: "100%",
              width: "100%",
              flexDirection: isMobile ? "column-reverse" : "row",
            }}
          >
            <ControlCard />
            <Map />
          </div>
        </div>
      )}
    </GroupMeetingContextProvider>
  );
}

export default React.memo(GroupMeetingSpot);
