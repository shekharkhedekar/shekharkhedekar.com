import { FC } from 'react';
import styled from 'styled-components';
import { Cell } from './Cell';
import { RowType } from './types';

const RowContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: stretch;
    flex: 1;
`;

export const Row: FC<{ row: RowType }> = ({ row }) => {
    return (
        <RowContainer>
            {row?.map((cell, i) => (
                <Cell cell={cell} key={i} index={i} />
            ))}
        </RowContainer>
    );
};
