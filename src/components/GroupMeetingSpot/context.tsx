import React, { createContext, ReactNode, useContext } from "react";
import { LatLngWithPlace } from "./LocationChip";

export interface GroupMeetingSpotContextType {
  locations: LatLngWithPlace[];
  setLocations: (locations: LatLngWithPlace[]) => void;
  meetingSpot?: LatLngWithPlace;
  setMeetingSpot: (meetingSpot?: LatLngWithPlace) => void;
  placeType?: string;
  setPlaceType: (placeType: string) => void;
  isMobile: boolean;
  map?: google.maps.Map;
  setMap: (map?: google.maps.Map) => void;
  setBounds: (bounds?: google.maps.LatLngBounds) => void;
}

const notInitializedFunc = () => {
  console.error("CONTEXT NOT INITIALIZED");
};
export const GroupMeetingSpotContext =
  createContext<GroupMeetingSpotContextType>({
    locations: [],
    setLocations: notInitializedFunc,
    setMeetingSpot: notInitializedFunc,
    setPlaceType: notInitializedFunc,
    isMobile: false,
    setMap: notInitializedFunc,
    setBounds: notInitializedFunc,
  });

export const GroupMeetingContextProvider: React.FC<{
  value: GroupMeetingSpotContextType;
  children: ReactNode;
}> = ({ value, children }) => (
  <GroupMeetingSpotContext.Provider value={value}>
    {children}
  </GroupMeetingSpotContext.Provider>
);

export const useGroupMeetingSpotContext = () =>
  useContext(GroupMeetingSpotContext);
