import react from "react";
import styled from "styled-components";

export const Divider = styled.hr<{ dark?: boolean }>`
    border: 1px solid ${(isDark) =>
      isDark ? "rgba(0, 0, 0, 0.3)" : "rgba(255, 255, 255, 0.3)"};
    height: 4px;
    border-width: 1px 0;
    margin: 23px auto;
    padding: 0;
  }
`;
