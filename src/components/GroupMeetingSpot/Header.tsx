import React from "react";
import { boxShadow } from "./constants";
import { useColorThemeContext } from "./context/ColorTheme";

export const Header = () => {
    const { theme } = useColorThemeContext();

    return (
        <div
            style={{
                boxShadow,
                zIndex: 1,
                background: theme.backgroundColorPrimary,
                color: theme.textColorPrimary,
                padding: "0.25rem 1rem",
                position: "relative",
                borderBottom: `1px solid ${theme.borderColorPrimary}`,
            }}
        >
            <h1 style={{ fontSize: "1.25rem" }}>Find a Meeting Spot!</h1>
        </div>
    );
};
