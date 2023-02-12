import React, { FC } from 'react';
import styled from 'styled-components';
import { ControlBox } from './ControlBox';

import { Grid } from './Grid';
import { GameContextProvider } from './hooks/useGameContext';

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: black;
`;

const SquareContainer = styled.div`
    @media (min-aspect-ratio: 1/1) and (max-aspect-ratio: 100/1) {
        width: 100vh;
        height: 100vh;
    }
    @media (min-aspect-ratio: 1/100) and (max-aspect-ratio: 1/1) {
        width: 100vw;
        height: 100vw;
    }
`;

export const Snake: FC = () => {
    return (
        <GameContextProvider>
            <Wrapper>
                <SquareContainer>
                    <Grid />
                </SquareContainer>
                <ControlBox />
            </Wrapper>
        </GameContextProvider>
    );
};
