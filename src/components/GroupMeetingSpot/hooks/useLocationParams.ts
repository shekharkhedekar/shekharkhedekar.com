import { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGroupMeetingSpotContext } from "../context/GroupMeetingSpot";
import { LatLngWithPlace } from "../LocationChip";

export const useLocationParams = () => {
    const navigate = useNavigate();
    const { search } = useLocation();
    const { map, locations, setLocations, placeType, setPlaceType } =
    useGroupMeetingSpotContext();
    const searchParams = useMemo(() => new URLSearchParams(search), [search]);

    const getParams = (key: "l" | "t") =>
        searchParams
            .get(key)
            ?.split(",")
            .filter((p) => p);

    const fetchPlace = async (
        placesService: google.maps.places.PlacesService,
        placeId: string
    ): Promise<LatLngWithPlace> => {
        return new Promise((resolve, reject) => {
            placesService.getDetails(
                {
                    placeId,
                    fields: ["formatted_address", "name", "geometry", "place_id"],
                },
                (place) => {
                    const lat = place?.geometry?.location?.lat();
                    const lng = place?.geometry?.location?.lng();

                    if (!place || !lat || !lng) {
                        reject();
                        return;
                    }

                    resolve({ lat, lng, place });
                }
            );
        });
    };

    const hydrateFromParams = async () => {
        if (!map) {
            console.log("no map");
            return;
        }

        // Fetch places and set locations
        const locationParams = getParams("l");
        if (locationParams) {
            const placesService = new google.maps.places.PlacesService(map);
            const intialLocations: LatLngWithPlace[] = [];
            for (const location of locationParams) {
                intialLocations.push(await fetchPlace(placesService, location));
            }
            setLocations(intialLocations);
        }

        const placeTypeParams = getParams("t");
        if (placeTypeParams) {
            setPlaceType(placeTypeParams[0]);
        }
    };

    useEffect(() => {
        if (!map) {
            return;
        }
        const params: string[] = [];

        if (locations.length) {
            params.push(`l=${locations.map((l) => l.place?.place_id).join()}`);
        }

        if (placeType) {
            params.push(`t=${placeType}`);
        }

        const to = `/group-meeting-spot?${params.join("&")}`;

        navigate(to, { replace: true });
    }, [navigate, locations, placeType, map]);

    return { hydrateFromParams };
};
