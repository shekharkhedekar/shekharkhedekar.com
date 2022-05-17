import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  Autocomplete,
  Marker,
} from "@react-google-maps/api";

import secrets from "../../secrets.json";
import { LatLngWithPlace, LocationChip } from "./LocationChip";
import { useDebounce } from "use-debounce";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const inputStyle = {
  padding: "1rem",
  width: "20rem",
  borderRadius: "10px",
  border: "1px solid #ccc",
  boxShadow: "0 0 10px rgba(0,0,0,0.3)",
  marginBottom: "0.5rem",
};
const libraries = ["places"];

function GroupMeetingSpot() {
  const { isLoaded } = useLoadScript({
    id: "google-map-script",
    googleMapsApiKey: secrets.GOOGLE_MAPS_API_KEY,
    // @ts-ignore
    libraries,
  });
  const [onLoadComplete, setOnLoadComplete] = useState(false);
  const [map, setMap] = useState<google.maps.Map>();
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete>();
  const [locations, setLocations] = useState<LatLngWithPlace[]>([]);
  const [bounds, setBounds] = useState<google.maps.LatLngBounds>();
  const [meetingSpot, setMeetingSpot] = useState<LatLngWithPlace>();
  const [mapCenter, setMapCenter] = useState<LatLngWithPlace>();
  const [placeType, setPlaceType] = useState("");
  const [value] = useDebounce(placeType, 250);

  const inputRef = useRef<HTMLInputElement>(null);

  const onLoad = useCallback(function callback(map: google.maps.Map) {
    setBounds(new window.google.maps.LatLngBounds());
    setMap(map);
  }, []);

  const getDirections = async () => {
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
  };

  useEffect(() => {
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
            query: placeType || "restaurant",
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

      if (map && bounds) {
        locations.forEach((location) => bounds?.extend(location));
        map.fitBounds(bounds);
      }
    } else {
      setMeetingSpot(undefined);
    }
  }, [locations, map, bounds, value, placeType]);

  useEffect(() => {
    getDirections();
  }, [meetingSpot]);

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

  const onUnmount = useCallback(function callback(map: google.maps.Map) {
    setMap(undefined);
  }, []);

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
  const onComplete = () => {
    if (!onLoadComplete) {
      setOnLoadComplete(true);
    }
  };

  return isLoaded ? (
    <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={mapCenter}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onTilesLoaded={onComplete}
      >
        <>
          {meetingSpot && <Marker position={meetingSpot} label="C" />}
          {locations.map((location, idx) => (
            <Marker
              position={location}
              label={`${idx + 1}`}
              key={location.place?.place_id}
            />
          ))}
        </>
      </GoogleMap>
      {onLoadComplete ? (
        <div style={{ position: "absolute", top: 75, left: 10 }}>
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
          <input
            placeholder="Type (e.g. 'restaurant', 'bar', 'coffee')"
            style={inputStyle}
            value={placeType}
            onChange={({ target: { value } }) => setPlaceType(value)}
          />
          <div>
            {meetingSpot && (
              <LocationChip location={meetingSpot} idx={"M"} isMeetingSpot />
            )}
            {locations.map((location, idx) => (
              <LocationChip
                location={location}
                idx={`${idx + 1}`}
                onRemove={() => onRemove(idx)}
                key={location.place?.place_id}
              />
            ))}
          </div>
        </div>
      ) : (
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
          }}
        >
          <div style={{ color: "#666", fontSize: "2rem" }}>Loading map...</div>
        </div>
      )}
    </>
  ) : null;
}

export default React.memo(GroupMeetingSpot);
