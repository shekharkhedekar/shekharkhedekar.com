export const generateRandomCoord = (numCells: number) => ({
    x: Math.floor(Math.random() * numCells),
    y: Math.floor(Math.random() * numCells),
});
