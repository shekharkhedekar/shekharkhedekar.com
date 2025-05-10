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
    const [names, setNames] = useState<string>(
        ['Alice', 'Bob', 'Charlie', 'David', 'Eve'].join('\n')
    );
    const namesArray = names
        .split('\n')
        .map((name) => name.trim())
        .filter((name) => name);
    const [pickedName, setPickedName] = useState<string | null>(null);
    const pickRandomName = () => {
        if (hasDuplicates(namesArray)) {
            console.log('Duplicates found');
            return;
        }

        const getRandIndex = () =>
            Math.floor(Math.random() * namesArray.length);
        const index = getRandIndex();
        const name = namesArray[index];

        setPickedName(name);
    };
    return (
        <div style={{ padding: '1rem' }}>
            <h1>Random Name Picker</h1>
            <h2>Names</h2>
            <div>
                <textarea
                    rows={10}
                    onChange={(e) => {
                        const value = e.target.value;
                        setNames(value);
                    }}
                    value={names}
                />
            </div>
            <button onClick={pickRandomName}>Pick Name</button>
            {pickedName && (
                <div>
                    <h2>Picked Name</h2>
                    <p>{pickedName}</p>
                </div>
            )}
        </div>
    );
};
