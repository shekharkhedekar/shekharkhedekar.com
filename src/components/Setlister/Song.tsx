import { FC } from 'react';

import { getTuningSymbol, Permutation } from './setlist';

export interface SongProps {
    tuning: Permutation;
}

export const Song: FC<SongProps> = ({ tuning }) => (
    <div
        style={{
            border: '1px solid #4e4e50',
            padding: '1rem',
            borderRadius: '1rem',
            transition: 'background-color 0.2s',
            backgroundColor: '#252121',
            cursor: 'pointer',
            color: 'white',
        }}
    >
        <div
            style={{
                fontWeight: 'bold',
            }}
        >
            {tuning.name}{' '}
            {tuning.changes.length > 0 && (
                <>
                    (
                    {tuning.changes.map((tuning, i) => (
                        <span key={tuning + i}>{tuning}</span>
                    ))}
                    )
                </>
            )}
        </div>

        <div
            style={{
                fontSize: '0.75rem',
                marginTop: '0.5rem',
            }}
        >
            {Object.entries(tuning.tunings).map(([member, tuning], i) => (
                <span key={tuning + i}>{getTuningSymbol(member, tuning)}</span>
            ))}
        </div>
    </div>
);
