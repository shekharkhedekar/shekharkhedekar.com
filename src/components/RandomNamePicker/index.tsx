import { useState } from 'react';

const hasDuplicates = (arr: string[]) => {
    const set = new Set();
    for (let i = 0; i < arr.length; i++) {
        if (set.has(arr[i])) {
            return true;
        }
        set.add(arr[i]);
    }
    return false;
};

export const RandomNamePicker = () => {
    const [names, setNames] = useState<string[]>([
        'Alice',
        'Bob',
        'Charlie',
        'David',
        'Eve',
    ]);
    const [error, setError] = useState<string | null>(null);
    const [value, setValue] = useState<string>('');

    const [pickedName, setPickedName] = useState<string | null>(null);
    const pickRandomName = () => {
        setError(null);
        if (hasDuplicates(names)) {
            setError('Duplicates found');
            return;
        }

        const getRandIndex = () => Math.floor(Math.random() * names.length);
        const index = getRandIndex();
        const name = names[index];

        setPickedName(name);
    };
    return (
        <div
            style={{
                padding: '1rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                alignItems: 'flex-start',
            }}
        >
            <h1>Random Name Picker</h1>
            <h2>Names</h2>
            {names.map((name, index) => (
                <div key={index} style={{ display: 'flex', gap: '0.5rem' }}>
                    {name}
                    <button
                        onClick={() => {
                            setNames((prev) => {
                                return prev.filter((_, i) => i !== index);
                            });
                        }}
                    >
                        -
                    </button>
                </div>
            ))}
            <form onSubmit={(e) => e.preventDefault()}>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <input
                        type="text"
                        onChange={(e) => {
                            const value = e.target.value;
                            setValue(value);
                        }}
                        value={value}
                        placeholder="Add a name"
                    />
                    <button
                        type="submit"
                        onClick={() => {
                            setNames((prev) => {
                                return [...prev, value];
                            });
                            setValue('');
                        }}
                    >
                        +
                    </button>
                </div>
            </form>
            <button onClick={pickRandomName}>Pick Name</button>
            {pickedName && (
                <div>
                    <h2>Picked Name</h2>
                    <p>{pickedName}</p>
                </div>
            )}
            {error && (
                <div style={{ color: 'red' }}>
                    <h2>Error</h2>
                    <p>{error}</p>
                </div>
            )}
        </div>
    );
};
