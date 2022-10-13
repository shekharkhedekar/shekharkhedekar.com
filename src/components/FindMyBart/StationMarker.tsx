import { Marker } from "@react-google-maps/api";
import React from "react";
import { LatLngWithPlace } from "./LocationChip";

export interface StationMarkerProps {
  position: LatLngWithPlace;
  text: string;
}

export const StationMarker: React.FC<StationMarkerProps> = ({
    position,
    text,
}) => {
    return (
        <Marker
            position={position}
            label={{ text, color: "#fff" }}
            key={text}
            icon={{
                path: google.maps.SymbolPath.CIRCLE,
                scale: 25,
                fillColor: "#06F",
                fillOpacity: 0.75,
                strokeColor: "#fff",
                strokeOpacity: 1,
                strokeWeight: 3,
            }}
        />
    );
};
