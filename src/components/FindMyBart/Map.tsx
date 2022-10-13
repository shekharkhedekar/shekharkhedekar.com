import React, { useCallback, useEffect, useState } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";

import { LatLngWithPlace } from "./LocationChip";
import { Station, useStations } from "./hooks/useStations";
import { useEtd } from "./hooks/useEtds";
import { useRoutes } from "./hooks/useRoutes";
import { StationMarker } from "./StationMarker";
import { Loading } from "./Loading";
import { useGtfsRT } from "./hooks/useGtfsRT";

const containerStyle = {
    width: "100%",
    height: "100%",
};

export const Map: React.FC = () => {
    // State
    const [onLoadComplete, setOnLoadComplete] = useState(false);
    const [mapCenter, setMapCenter] = useState<LatLngWithPlace>();
    const [currentLocation, setCurrentLocation] = useState<LatLngWithPlace>();
    const [map, setMap] = useState<google.maps.Map>();
    const [bounds, setBounds] = useState<google.maps.LatLngBounds>();
    const [filteredStations, setFilteredStations] = useState<Station[]>([]);
    const { getStations, stations } = useStations();
    const { startEtdPolling, etds } = useEtd();
    const { getRoutes, routes } = useRoutes();
    const { getGtfsRT } = useGtfsRT();

    const onLoad = useCallback(function callback(map: google.maps.Map) {
        setMap(map);
    }, []);

    useEffect(() => {
        setFilteredStations(
            stations.filter((station) => {
                const position: LatLngWithPlace = {
                    lat: parseFloat(station.gtfs_latitude),
                    lng: parseFloat(station.gtfs_longitude),
                };

                return bounds?.contains(position);
            })
        );
    }, [stations, bounds]);

    useEffect(() => {
        filteredStations.forEach((s) => {
            const etd = etds[s.abbr];

            if (!etd) {
                return;
            }

            etd.forEach((e) => {
                const { abbreviation } = e;
                const trainMarkers = { abbreviation };
                e.estimate.forEach((estimate) => {
                    const routeKey = `${estimate.color}-${estimate.direction}`;
                    const previousStation = {
                        estimate,
                        routeKey,
                        route: routes[routeKey],
                    };
                });
                // console.log(trainMarkers);
            });
        });
    }, [filteredStations, etds, routes]);

    useEffect(() => {
        startEtdPolling(filteredStations);
    }, [filteredStations]);

    useEffect(() => {
        try {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude: lat, longitude: lng } = position.coords;
                    // DEBUG
                    setMapCenter({ lat: 37.8953812, lng: -122.3004276 });
                    //setMapCenter({ lat, lng });
                    setCurrentLocation({ lat, lng });
                },
                (error) => {
                    throw error;
                }
            );
        } catch (e) {
            console.error("navigator.geolocation error", e);
        }
    }, [mapCenter?.lat, mapCenter?.lng]);

    useEffect(() => {
        getStations();
        getRoutes();
        getGtfsRT();
    }, []);

    const onUnmount = useCallback(function callback(map: google.maps.Map) {
        setMap(undefined);
    }, []);
    const onComplete = () => {
        if (!onLoadComplete) {
            setOnLoadComplete(true);
        }
    };
    const onBoundsChanged = () => {
        setBounds(map?.getBounds());
    };

    return (
        <div style={{ position: "relative", height: "100%", width: "100%" }}>
            <GoogleMap
                center={mapCenter}
                mapContainerStyle={containerStyle}
                onBoundsChanged={onBoundsChanged}
                onLoad={onLoad}
                onTilesLoaded={onComplete}
                onUnmount={onUnmount}
                zoom={15}
            >
                <>
                    {/* Visible Stations */}
                    {filteredStations.map((station) => {
                        const position: LatLngWithPlace = {
                            lat: parseFloat(station.gtfs_latitude),
                            lng: parseFloat(station.gtfs_longitude),
                        };

                        return <StationMarker position={position} text={station.abbr} />;
                    })}
                    {/* Current Location */}
                    {currentLocation && <Marker position={currentLocation} label={"★"} />}
                </>
            </GoogleMap>
            {/* Loading Screen */}
            {!onLoadComplete && <Loading />}
        </div>
    );
};
