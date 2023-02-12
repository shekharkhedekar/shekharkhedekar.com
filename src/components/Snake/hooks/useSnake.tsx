import { useContext } from 'react';
import { createContext, FC, ReactNode, useState } from 'react';
import { Coords, FCWithChildren, GridType } from '../types';
import { generateRandomCoord } from '../utils';
import { useGameContext } from './useGameContext';

export enum Direction {
    LEFT = 0,
    RIGHT = 1,
    UP = 2,
    DOWN = 3,
}

export const useSnake = (numCells: number) => {
    const [length, setLength] = useState(Math.ceil(numCells / 4));
    const [direction, setDirection] = useState<Direction>(Direction.LEFT);
    const [position, setPosition] = useState<Coords[]>(getInitialSnake());
    const game = useGameContext();

    function getInitialSnake() {
        const initialPosition: Coords[] = [generateRandomCoord(numCells)];

        while (initialPosition.length <= length) {
            const lastPoint = initialPosition[initialPosition.length - 1];

            const nextPoint: Coords = { ...lastPoint };
            if (lastPoint.x + 1 < numCells) {
                nextPoint.x = lastPoint.x + 1;
            } else {
                nextPoint.y =
                    lastPoint.y + 1 < numCells
                        ? lastPoint.y + 1
                        : lastPoint.y - 1;
            }

            initialPosition.push(nextPoint);
        }

        return initialPosition;
    }

    function isValidCoords({ x, y }: Coords) {
        return x >= 0 && x < numCells && y >= 0 && y < numCells;
    }

    function moveSnake(grid: GridType) {
        const newPosition: Coords[] = [];

        position.forEach((coord, i) => {
            let newCoord: Coords = { ...coord };
            if (i === 0) {
                /* eslint-disable indent */
                switch (direction) {
                    case Direction.LEFT:
                        newCoord.x = newCoord.x - 1;
                        break;
                    case Direction.RIGHT:
                        newCoord.x = newCoord.x + 1;
                        break;
                    case Direction.UP:
                        newCoord.y = newCoord.y + 1;
                        break;
                    case Direction.DOWN:
                        newCoord.x = newCoord.y - 1;
                        break;
                    /* eslint-enable indent */
                }
            } else if (position[i - 1]) {
                newCoord = { ...position[i - 1] };
            }

            if (isValidCoords(newCoord)) {
                newPosition.push(newCoord);
            } else {
                game.setGameOver();
            }
        });

        clearSnake(grid);

        setPosition(newPosition);
    }

    function clearSnake(grid: GridType) {
        position.forEach((coord) => {
            grid[coord.y][coord.x].hasSnake = false;
        });

        return grid;
    }

    const updateGrid = (grid: GridType) => {
        position.forEach((coord) => {
            try {
                grid[coord.y][coord.x].hasSnake = true;
            } catch (e) {
                console.log(`Cannot set hasSnake on ${JSON.stringify(coord)}`);
            }
        });
    };

    return { position, updateGrid, moveSnake };
};

export type SnakeContextType = {
    position: Coords[];
    updateGrid: (grid: GridType) => void;
    moveSnake: (grid: GridType) => void;
};

export const SnakeContext = createContext<SnakeContextType>({
    position: [],
    updateGrid: (grid: GridType) => {},
    moveSnake: (grid: GridType) => {},
});

export const useSnakeContext = () => useContext(SnakeContext);

export const SnakeContextProvider: FCWithChildren = ({ children }) => {
    const gameContext = useGameContext();
    const snake = useSnake(gameContext.numCells);
    return (
        <SnakeContext.Provider value={snake}>{children}</SnakeContext.Provider>
    );
};
