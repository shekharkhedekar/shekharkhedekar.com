import { FC, ReactNode } from 'react';

export type CellType = {
    hasFood: boolean;
    hasSnake: boolean;
};
export type RowType = CellType[];
export type GridType = RowType[];

export type Coords = {
    x: number;
    y: number;
};

export type FCWithChildren = FC<{ children: ReactNode }>;
