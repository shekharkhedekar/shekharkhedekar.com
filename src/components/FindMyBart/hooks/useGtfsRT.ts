//@ts-ignore
import GTFSRealTimeBindings from "gtfs-realtime-bindings";
import axios from "axios";

export const useGtfsRT = () => {
  const getGtfsRT = async () => {
    const data = await axios.get(`http://api.bart.gov/gtfsrt/tripupdate.aspx`);
    //@ts-ignore
    const feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(data);
    console.log({ data, feed });
  };

  return { getGtfsRT };
};
