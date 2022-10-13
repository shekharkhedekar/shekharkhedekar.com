import { useState } from "react";
import axios from "axios";

export interface Station {
  abbr: string;
  address: string;
  city: string;
  county: string;
  gtfs_latitude: string;
  gtfs_longitude: string;
  name: string;
  state: string;
  zipcode: string;
}
export interface StationsResponse {
  data: {
    root: {
      stations: { station: Station[] };
    };
  };
}

export const useStations = () => {
    const [stations, setStations] = useState<Station[]>([]);
    const getStations = async () => {
        const {
            data: {
                root: {
                    stations: { station },
                },
            },
        } = await axios.get<null, StationsResponse>(
            `https://api.bart.gov/api/stn.aspx?cmd=stns&key=MW9S-E7SL-26DU-VV8V&json=y`
        );
        setStations(station);
    };
    return { getStations, stations };
};
