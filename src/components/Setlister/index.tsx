import { FC, useState } from 'react';
import { generateTunings, getTuningSymbol, songs } from './setlist';
import { Song } from './Song';
import { Song as SongType } from './setlist';
import { Note } from './Note';

import SortableList, { SortableItem } from 'react-easy-sort';

export const Setlister: FC = () => {
    const [allSongs, setAllSongs] = useState<SongType[]>(songs);
    const [songOrder, setSongOrder] = useState<SongType[]>(
        songs.filter((song) => song.selected)
    );
    const tunings = generateTunings(songOrder);
    const allChanges = tunings.flatMap((tuning) => tuning.changes);

    return (
        <div style={{ margin: '1rem' }}>
            <h1>BK Setlister</h1>

            <h2>
                All Songs <Note>(select to add to set)</Note>
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
                {allSongs.map((song) => (
                    <label key={song.name}>
                        <input
                            onChange={(e) => {
                                const checked = e.target.checked;
                                setAllSongs((prev) => {
                                    return prev.map((prevSong) => {
                                        if (prevSong.name === song.name) {
                                            return {
                                                ...prevSong,
                                                selected: checked,
                                            };
                                        }
                                        return prevSong;
                                    });
                                });
                                setSongOrder((prev) => {
                                    if (
                                        prev.find(
                                            (prevSong) =>
                                                prevSong.name === song.name
                                        )
                                    ) {
                                        return prev.filter(
                                            (prevSong) =>
                                                prevSong.name !== song.name
                                        );
                                    } else {
                                        return [...prev, song];
                                    }
                                });
                            }}
                            type="checkbox"
                            key={song.name}
                            checked={song.selected}
                        />{' '}
                        {song.name} ({getTuningSymbol('P', song.peter)}
                        {getTuningSymbol('D', song.dave)}
                        {getTuningSymbol('R', song.rene)})
                    </label>
                ))}
            </div>

            <h2>
                Set <Note>(drag to reorder)</Note>
            </h2>

            <div>
                Number of changes: <strong>Peter</strong>(
                {allChanges.filter((tuning) => tuning.startsWith('P')).length}){' '}
                <strong>Dave</strong>(
                {allChanges.filter((tuning) => tuning.startsWith('D')).length}){' '}
                <strong>Rene</strong>(
                {allChanges.filter((tuning) => tuning.startsWith('R')).length}){' '}
            </div>

            <SortableList
                onSortEnd={(oldIndex, newIndex) =>
                    setSongOrder((prev) => {
                        const newOrder = [...prev];
                        const [removed] = newOrder.splice(oldIndex, 1);
                        newOrder.splice(newIndex, 0, removed);
                        return newOrder;
                    })
                }
                className="list"
                draggedItemClassName="dragged"
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                    }}
                >
                    {tunings.map((tuning, i) => (
                        <SortableItem key={tuning.name}>
                            <div>
                                <Song tuning={tuning} />
                            </div>
                        </SortableItem>
                    ))}
                </div>
            </SortableList>
        </div>
    );
};
