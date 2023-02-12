import { useContext } from 'react';
import { createContext, useState } from 'react';
import { Coords, FCWithChildren } from '../types';
import { generateRandomCoord } from '../utils';
import { useGameContext } from './useGameContext';

export const useFood = (numCells: number) => {
    const generateFoodPosition = () => {
        return generateRandomCoord(numCells);
    };
    const [position, setPosition] = useState<Coords>(generateFoodPosition());

    return { position };
};

export type FoodContextType = { position?: Coords };

export const FoodContext = createContext<FoodContextType>({});

export const useFoodContext = () => useContext(FoodContext);

export const FoodContextProvider: FCWithChildren = ({ children }) => {
    const gameContext = useGameContext();
    const food = useFood(gameContext.numCells);

    return <FoodContext.Provider value={food}>{children}</FoodContext.Provider>;
};
