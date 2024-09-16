import { FC } from 'react';

import { getTuningSymbol, Permutation } from './setlist';

export interface SongProps {
    tuning: Permutation;
}

export const Song: FC<SongProps> = ({ tuning }) => {
    return (
        <div
            style={{
                border: '1px solid gray',
                padding: '1rem',
                borderRadius: '1rem',
                boxShadow: '.1rem 0.1rem .1rem rgba(0, 0, 0, 0.5)',
                transition: 'background-color 0.2s',
                backgroundColor: 'white',
                cursor: 'pointer',
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
                    <span key={tuning + i}>
                        {getTuningSymbol(member, tuning)}
                    </span>
                ))}
            </div>
        </div>
    );
};
