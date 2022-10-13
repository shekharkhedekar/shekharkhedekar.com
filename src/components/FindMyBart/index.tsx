import React from "react";
import { useLoadScript } from "@react-google-maps/api";
import styled from "styled-components";
import { Helmet } from "react-helmet";

import secrets from "../../secrets.json";
import { Map } from "./Map";
import { ControlCard } from "./ControlCard";
import { useMediaQuery } from "@react-hook/media-query";
import { Header } from "./Header";
import { ColorThemeContextProvider } from "./context/ColorTheme";

const libraries = ["places"];

const MobileContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-height: -webkit-fill-available;
`;

function FindMyBart() {
    const { isLoaded } = useLoadScript({
        id: "google-map-script",
        googleMapsApiKey: secrets.GOOGLE_MAPS_API_KEY,
        // @ts-ignore
        libraries,
    });

    const isMobile = useMediaQuery("screen and (max-width: 600px)");

    if (!isLoaded) {
        return null;
    }

    return (
        <ColorThemeContextProvider>
            <Helmet>
                <title>Find My BART Train</title>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, user-scalable=no, user-scalable=0"
                />
                <meta name="keywords" content="Group, Meeting, Spot, Map, meetup" />
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
                <div style={{ height: "100vh", width: "100%", position: "relative" }}>
                    <Header />
                    <div
                        style={{
                            display: "flex",
                            height: "100%",
                            width: "100%",
                            flexDirection: isMobile ? "column-reverse" : "row",
                        }}
                    >
                        <ControlCard />
                        <Map />
                    </div>
                </div>
            )}
        </ColorThemeContextProvider>
    );
}

export default React.memo(FindMyBart);
