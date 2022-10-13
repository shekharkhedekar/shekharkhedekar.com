import axios from "axios";
import { useEffect, useState } from "react";

export interface Route {
  abbr: string;
  color: string;
  direction: string;
  hexcolor: string;
  name: string;
  number: string;
  routeID: string;
}
export interface RoutesResponse {
  data: { root: { routes: { route: Route[] } } };
}
export interface RouteResponse {
  data: { root: { routes: { route: Route } } };
}
export type RouteMap = Record<string, Route>;

export const useRoutes = () => {
    const [routes, setRoutes] = useState<RouteMap>({});

    const getRoutes = async () => {
        const {
            data: {
                root: {
                    routes: { route },
                },
            },
        } = await axios.get<null, RoutesResponse>(
            "https://api.bart.gov/api/route.aspx?cmd=routes&key=MW9S-E7SL-26DU-VV8V&json=y"
        );
        const routeMap: RouteMap = route.reduce((acc, r) => {
            const k = `${r.color}-${r.direction}`;
            acc[k] = r;
            return acc;
        }, {} as RouteMap);

        for (const r in routeMap) {
            const route = await getRoute(routeMap[r].number);
            // Replace with full definition
            routeMap[r] = route;
        }

        setRoutes(routeMap);
    };

    const getRoute = async (routeNumber: string) => {
        const {
            data: {
                root: {
                    routes: { route },
                },
            },
        } = await axios.get<null, RouteResponse>(
            `https://api.bart.gov/api/route.aspx?cmd=routeinfo&route=${routeNumber}&key=MW9S-E7SL-26DU-VV8V&json=y`
        );
        return route;
    };

    return { getRoutes, routes };
};
