import React, { useCallback, useEffect, useState } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import styled from 'styled-components';

import secrets from '../../secrets.json';
import { LatLngWithPlace } from './LocationChip';
import { Map } from './Map';
import { useDebounce } from 'use-debounce';
import { ControlCard } from './ControlCard';
import { useMediaQuery } from '@react-hook/media-query';
import { Header } from './Header';
import {
    GroupMeetingContextProvider,
    GroupMeetingSpotContextType,
} from './context/GroupMeetingSpot';
import { Helmet } from 'react-helmet';
import { ColorThemeContextProvider } from './context/ColorTheme';

const libraries = ['places'];

const MobileContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    max-height: -webkit-fill-available;
`;

const DesktopWrapper = styled.div`
    height: 100vh;
    width: 100%;
    position: relative;
`;

const DesktopContainer = styled.div<{ isMobile: boolean }>`
    display: flex;
    height: 100%;
    width: 100%;
    flexdirection: ${(isMobile) => (isMobile ? 'column-reverse' : 'row')};
`;

function GroupMeetingSpot() {
    const { isLoaded } = useLoadScript({
        id: 'google-map-script',
        googleMapsApiKey: secrets.GOOGLE_MAPS_API_KEY,
        // @ts-ignore
        libraries,
    });

    const isMobile = useMediaQuery('screen and (max-width: 600px)');
    const [map, setMap] = useState<google.maps.Map>();

    const [locations, setLocations] = useState<LatLngWithPlace[]>([]);
    const [bounds, setBounds] = useState<google.maps.LatLngBounds>();
    const [mapCenter, setMapCenter] = useState<LatLngWithPlace>();
    const [placeType, setPlaceType] = useState('Restaurant');
    const [debouncedPlaceType] = useDebounce(placeType, 250);

    const [meetingSpot, setMeetingSpot] = useState<LatLngWithPlace>();
    const [isMeetingSpotLoading, setIsMeetingSpotLoading] = useState(true);

    const getDirections = useCallback(async () => {
        if (!map) return;
        let directionsService = new google.maps.DirectionsService();

        for (const location of locations) {
            if (!location.directionsRenderer) {
                location.directionsRenderer =
                    new google.maps.DirectionsRenderer({
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
                        lat: acc.lat
                            ? (acc.lat + location.lat) / 2
                            : location.lat,
                        lng: acc.lng
                            ? (acc.lng + location.lng) / 2
                            : location.lng,
                    };
                }
            );

            if (!map) {
                return;
            }

            const placesService = new google.maps.places.PlacesService(map);
            setIsMeetingSpotLoading(true);
            placesService.findPlaceFromQuery(
                {
                    locationBias: newCenter,
                    fields: ['formatted_address', 'name', 'geometry'],
                    query: debouncedPlaceType,
                },
                (res) => {
                    setIsMeetingSpotLoading(false);
                    if (!res) {
                        setMeetingSpot(undefined);
                        return;
                    }
                    const place = res[0];

                    const lat = place.geometry?.location?.lat();
                    const lng = place.geometry?.location?.lng();

                    if (lat && lng) {
                        setMeetingSpot({ lat, lng, place });
                    } else {
                        setMeetingSpot(undefined);
                    }
                }
            );

            if (bounds) {
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
            console.error('navigator.geolocation error', e);
        }
    }, [mapCenter?.lat, mapCenter?.lng]);
    const value: GroupMeetingSpotContextType = {
        locations,
        setLocations,
        meetingSpot,
        setMeetingSpot,
        isMeetingSpotLoading,
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
        <ColorThemeContextProvider>
            <GroupMeetingContextProvider value={value}>
                <Helmet>
                    <title>Find a Meeting Spot!</title>
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1, user-scalable=no, user-scalable=0"
                    />
                    <meta
                        name="keywords"
                        content="Group, Meeting, Spot, Map, meetup"
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        href="groupMeetingSpot.png"
                        sizes="16x16"
                    />
                </Helmet>
                {isMobile ? (
                    <MobileContainer>
                        <Header />
                        <Map />
                        <ControlCard />
                    </MobileContainer>
                ) : (
                    <DesktopWrapper>
                        <Header />
                        <DesktopContainer isMobile={isMobile}>
                            <ControlCard />
                            <Map />
                        </DesktopContainer>
                    </DesktopWrapper>
                )}
            </GroupMeetingContextProvider>
        </ColorThemeContextProvider>
    );
}

export default React.memo(GroupMeetingSpot);
