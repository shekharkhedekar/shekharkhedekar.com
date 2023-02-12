import React, { FC, ReactNode } from 'react';
import { boxShadow } from '../GroupMeetingSpot/constants';
import { useColorThemeContext } from '../GroupMeetingSpot/context/ColorTheme';

export const Header: FC<{ children: ReactNode }> = ({ children }) => {
    const { theme } = useColorThemeContext();

    return (
        <div
            style={{
                boxShadow,
                zIndex: 1,
                background: theme.backgroundColorPrimary,
                color: theme.textColorPrimary,
                padding: '0.25rem 1rem',
                position: 'sticky',
                top: 0,
                borderBottom: `1px solid ${theme.borderColorPrimary}`,
            }}
        >
            <h1 style={{ fontSize: '1.25rem' }}>{children}</h1>
        </div>
    );
};
