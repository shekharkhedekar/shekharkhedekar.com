import { FC, PropsWithChildren } from 'react';

export const Note: FC<PropsWithChildren<{}>> = ({ children }) => {
    return (
        <span
            style={{
                color: 'gray',
                fontStyle: 'italic',
                fontSize: '1rem',
            }}
        >
            {children}
        </span>
    );
};
