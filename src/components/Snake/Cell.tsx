import React, { FC } from 'react';
import styled from 'styled-components';
import { CellType } from './types';

const CellContainer = styled.div<{ cell: CellType }>`
    background-color: black;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    outline: 1px dashed rgba(255, 255, 255, 0.2);
    color: rgba(255, 255, 255, 0.5);
    text-shadow: 0 0 1px rgba(0, 0, 0);

    background-color: ${({ cell }) => {
        if (!cell) {
            return 'transparent';
        }

        if (cell.hasFood) {
            return 'red';
        } else if (cell.hasSnake) {
            return 'yellow';
        }
    }};
`;

export const Cell: FC<{ cell: CellType; index: number }> = ({
    cell,
    index,
}) => {
    return <CellContainer cell={cell}>{index}</CellContainer>;
};
