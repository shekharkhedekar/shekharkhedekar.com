import axios from "axios";
import { useEffect, useState } from "react";
import { Station } from "./useStations";

export interface Estimate {
  color: string;
  hexcolor: string;
  minutes: string;
  direction: "North" | "South";
}
export interface Etd {
  abbreviation: string;
  destination: string;
  estimate: Estimate[];
}
export interface EtdResponse {
  data: { root: { station: { etd: Etd[] }[] } };
}
export const useEtd = () => {
    const [etds, setEtds] = useState<Record<string, Etd[]>>({});
    // const [etds, setEtds] = useState<string>();
    const [intervalId, setIntervalId] = useState<NodeJS.Timer>();
    const [stations, setStations] = useState<Station[]>([]);

    const getEtd = async (s: Station) => {
        const {
            data: {
                root: { station },
            },
        } = await axios.get<null, EtdResponse>(
            `https://api.bart.gov/api/etd.aspx?cmd=etd&orig=${s.abbr}&key=MW9S-E7SL-26DU-VV8V&json=y`
        );
        const { etd } = station[0];
        return etd;
    };

    const startEtdPolling = (stations: Station[]) => {
    // Update state to call memoized getEtds
        setStations(stations);
    };

    useEffect(() => {
    // Clear existing poll
        clearInterval(intervalId);

        const newEtds: Record<string, Etd[]> = {};
        const id = setInterval(async () => {
            await Promise.all(
                stations.map(async (s) => {
                    newEtds[s.abbr] = await getEtd(s);
                })
            );
            setEtds({ ...newEtds });
        }, 1000);
        setIntervalId(id);
    }, [stations]);

    return { etds, startEtdPolling };
};
