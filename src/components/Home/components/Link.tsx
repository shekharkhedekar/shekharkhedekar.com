import React from "react";

import { COLORS } from "../../GlobalStyle";

export const Link: React.FC<{
  href: string;
  title: string;
  children: React.ReactNode;
  isDark?: boolean;
}> = ({ isDark, children, ...restProps }) => {
  return (
    <a
      {...restProps}
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: isDark ? COLORS.linkColorLight : COLORS.linkColor }}
    >
      {children}
    </a>
  );
};
