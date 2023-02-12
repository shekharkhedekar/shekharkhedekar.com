import { createContext, FC, ReactNode, useContext, useState } from 'react';
import { FoodContextProvider } from './useFood';
import { GridContextProvider } from './useGrid';
import { SnakeContextProvider } from './useSnake';

export enum GameState {
    IDLE = 'IDLE',
    IN_PROGRESS = 'IN_PROGRESS',
    PAUSED = 'PAUSED',
    OVER = 'OVER',
}

export const useGame = () => {
    const [numCells, setNumCells] = useState<number>(10);
    const [speed, setSpeed] = useState<number>(1000);
    const [state, setState] = useState<GameState>(GameState.IDLE);

    const setGameOver = () => {
        setState(GameState.OVER);
    };
    const setGameInProgress = () => {
        setState(GameState.IN_PROGRESS);
    };
    const setGamePaused = () => {
        setState(GameState.PAUSED);
    };
    const setGameIdle = () => {
        setState(GameState.IDLE);
    };

    return {
        numCells,
        setNumCells,
        setGameOver,
        setGameInProgress,
        setGamePaused,
        setGameIdle,
        speed,
        setSpeed,
        state,
    };
};

export type GameContextType = {
    numCells: number;
    speed: number;
    setSpeed: (speed: number) => void;
    setNumCells: (numCells: number) => void;
    setGameOver: () => void;
    setGameInProgress: () => void;
    setGamePaused: () => void;
    setGameIdle: () => void;
    state: GameState;
};

export const GameContext = createContext<GameContextType>({
    numCells: 10,
    speed: 1000,
    setSpeed: (speed: number) => {},
    setNumCells: () => {},
    setGameOver: () => {},
    setGameInProgress: () => {},
    setGamePaused: () => {},
    setGameIdle: () => {},
    state: GameState.IDLE,
});

export const useGameContext = () => useContext(GameContext);

export const GameContextProvider: FC<{ children: ReactNode }> = ({
    children,
}) => {
    const game = useGame();
    console.log('GameContextProvider', game.numCells);
    return (
        <GameContext.Provider value={game}>
            <GridContextProvider>
                <FoodContextProvider>
                    <SnakeContextProvider>{children}</SnakeContextProvider>
                </FoodContextProvider>
            </GridContextProvider>
        </GameContext.Provider>
    );
};
