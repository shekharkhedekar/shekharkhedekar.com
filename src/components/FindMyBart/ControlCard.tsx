import { useMediaQuery } from "@react-hook/media-query";
import styled from "styled-components";

import { boxShadow, boxShadowNoTop } from "./constants";
import { useColorThemeContext, ColorTheme } from "./context/ColorTheme";

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 0.25rem;
  display: block;
`;

const Divider = styled.div<{ theme: ColorTheme }>`
  border-bottom: 1px solid ${({ theme }) => theme.borderColorPrimary};
`;

export const ControlCard: React.FC = () => {
    const { theme } = useColorThemeContext();
    const isMobile = useMediaQuery("screen and (max-width: 600px)");

    return (
        <div
            style={{
                width: isMobile ? "auto" : "35rem",
                background: theme.backgroundColorPrimary,
                color: theme.textColorPrimary,
                boxShadow: isMobile ? boxShadow : boxShadowNoTop,
                zIndex: 1,
                padding: "1rem 0",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <div style={{ padding: "0.25rem 1rem" }}>
                <Label htmlFor="address">Choose your line:</Label>
                <Divider theme={theme} />
                Radio list
            </div>
        </div>
    );
};
