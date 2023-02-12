import { FC, useEffect } from 'react';
import styled from 'styled-components';
import useInterval from 'use-interval';
import { useFoodContext } from './hooks/useFood';
import { GameState, useGameContext } from './hooks/useGameContext';
import { useGridContext } from './hooks/useGrid';
import { useSnakeContext } from './hooks/useSnake';
import { Row } from './Row';

const GridContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: stretch;
`;

export const Grid: FC = () => {
    const game = useGameContext();
    const { grid, setGrid, generateGrid } = useGridContext();
    const snake = useSnakeContext();
    const food = useFoodContext();

    useEffect(() => {
        setGrid(generateGrid());
    }, [game.numCells]);

    useEffect(() => {
        if (!snake.position || !grid) {
            return;
        }

        snake.updateGrid(grid);
        setGrid([...grid]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [snake.position]);

    useEffect(() => {
        if (!food.position || !grid) {
            return;
        }

        grid[food.position.y][food.position.x].hasFood = true;
        setGrid([...grid]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [food.position]);

    useInterval(() => {
        if (!grid) return;

        if (game.state === GameState.IN_PROGRESS) {
            snake.moveSnake(grid);
        }
    }, game.speed);

    return (
        <GridContainer>
            {grid?.map((row, i) => (
                <Row row={row} key={i} />
            ))}
        </GridContainer>
    );
};
