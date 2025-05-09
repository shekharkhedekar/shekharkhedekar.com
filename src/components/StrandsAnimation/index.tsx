import { useMemo, useState } from 'react';
const size = 10;

export const StrandsAnimation = () => {
    const [done, setDone] = useState(false);
    const matrix = useMemo(() => {
        const rows = [];
        for (let i = 0; i < size; i++) {
            const row = [];
            for (let j = 0; j < size; j++) {
                row.push('x');
            }
            rows.push(row);
        }
        return rows;
    }, []);

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
            }}
        >
            <style>
                {`@keyframes pulse {
                    0% {
                        transform: scale(1);
                    }
                    50% {
                        transform: scale(1.5);
                    }
                    100% {
                        transform: scale(1)
                    }

                }`}
            </style>
            {matrix.map((row, i) => (
                <div
                    style={{
                        display: 'flex',
                        gap: '10px',
                    }}
                >
                    {row.map((cell, j) => (
                        <div
                            style={{
                                borderRadius: '50%',
                                backgroundColor: 'lightblue',
                                width: '50px',
                                height: '50px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                animationName: done ? 'pulse' : undefined,
                                animationDuration: done ? '200ms' : undefined,
                                animationDelay: done
                                    ? `${25 * (size * 2 - 2 - i - j)}ms`
                                    : undefined,
                            }}
                        >
                            {i},{j}
                        </div>
                    ))}
                </div>
            ))}
            <button
                onClick={() => {
                    setDone(true);
                    setTimeout(() => setDone(false), 1000);
                }}
            >
                Done
            </button>
            <button
                onClick={() => {
                    setDone(false);
                }}
            >
                Reset
            </button>
        </div>
    );
};
