import { FC } from 'react';
import styled from 'styled-components';
import { GameState, useGameContext } from './hooks/useGameContext';

const ControlBoxContainer = styled.div`
    position: absolute;
    background-color: #111;
    color: #fff;
    top: 0;
    left: 0;
    padding: 1rem;
    border: 1px solid #222;
    border-radius: 0 0 5px 0;
`;

const ControlBoxRow = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;
`;

const ControlBoxLabel = styled.label`
    margin-right: 1rem;
    flex: 1;
`;

const ControlBoxInput = styled.input`
    background-color: #222222;
    border: 1px solid #333;
    color: #fff;
    padding: 0.5rem;
    border-radius: 5px;
    flex: 1;
`;

const ControlBoxButton = styled(ControlBoxInput)`
    padding: 1rem;
`;

export const ControlBox: FC = () => {
    const game = useGameContext();
    const buttons = [
        {
            shouldShow: game.state === GameState.IDLE,
            onClick: () => {
                game.setGameInProgress();
            },
            label: 'Play!',
        },
        {
            shouldShow: game.state === GameState.IN_PROGRESS,
            onCLick: () => {
                game.setGameInProgress();
            },
            label: 'Pause',
        },

        {
            shouldShow: game.state === GameState.OVER,
            onCLick: () => {
                game.setGameIdle();
            },
            label: 'Restart',
        },
    ];
    return (
        <ControlBoxContainer>
            <ControlBoxRow>
                <ControlBoxLabel>Size</ControlBoxLabel>
                <ControlBoxInput
                    type="number"
                    value={game.numCells}
                    onChange={(e) =>
                        game.setNumCells(parseInt(e.target.value, 10))
                    }
                />
            </ControlBoxRow>

            <ControlBoxRow>
                <ControlBoxLabel>Refresh Speed (ms)</ControlBoxLabel>
                <ControlBoxInput
                    type="number"
                    value={game.speed}
                    onChange={(e) =>
                        game.setSpeed(parseInt(e.target.value, 10))
                    }
                />
            </ControlBoxRow>

            <ControlBoxRow>
                {buttons.map((button) =>
                    button.shouldShow ? (
                        <ControlBoxButton as="button" onClick={button.onClick}>
                            {button.label}
                        </ControlBoxButton>
                    ) : null
                )}
            </ControlBoxRow>
        </ControlBoxContainer>
    );
};
