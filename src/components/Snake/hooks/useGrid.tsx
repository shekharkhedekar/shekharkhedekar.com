import { useContext, useEffect } from 'react';
import { createContext, useState } from 'react';
import { CellType, FCWithChildren, GridType } from '../types';
import { useGameContext } from './useGameContext';

export const useGrid = (numCells: number) => {
    const [grid, setGrid] = useState<GridType>();

    function generateRow() {
        return [];
    }
    function generateCell(): CellType {
        return {
            hasSnake: false,
            hasFood: false,
        };
    }
    function generateGrid(): GridType {
        let generated = new Array(numCells).fill(generateRow());
        generated = generated.map((row) => {
            const newRow = new Array(numCells);
            newRow.fill({});
            return newRow.map(generateCell);
        });

        return generated;
    }

    return { grid, setGrid, generateGrid };
};

export type GridContextType = {
    grid?: GridType;
    setGrid: (grid: GridType) => void;
    generateGrid: () => GridType;
};

export const GridContext = createContext<GridContextType>({
    setGrid: () => {},
    generateGrid: () => [],
});

export const useGridContext = () => useContext(GridContext);

export const GridContextProvider: FCWithChildren = ({ children }) => {
    const gameContext = useGameContext();
    console.log('GridContextProvider', gameContext.numCells);

    const grid = useGrid(gameContext.numCells);
    return <GridContext.Provider value={grid}>{children}</GridContext.Provider>;
};
