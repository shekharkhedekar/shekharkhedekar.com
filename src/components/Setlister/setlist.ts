export type Tuning = 'Standard' | 'Drop' | 'Either';
export type Song = {
    name: string;
    selected?: boolean;
    rene: Tuning;
    dave: Tuning;
    peter: Tuning;
};
type SetList = Song[];

export const getTuningSymbol = (tuning: string) => {
    if (tuning === 'Standard') {
        return '⬆️';
    }

    if (tuning === 'Drop') {
        return '⬇️';
    }

    return '🤷';
};
export const songs: SetList = [
    { name: 'Blake', rene: 'Standard', dave: 'Standard', peter: 'Standard' },
    {
        name: 'Reindeer Games',
        rene: 'Standard',
        dave: 'Standard',
        peter: 'Standard',
    },
    { name: 'Elegy', rene: 'Standard', dave: 'Standard', peter: 'Standard' },
    { name: 'Sellout', rene: 'Standard', dave: 'Standard', peter: 'Standard' },
    { name: 'Clandestine', rene: 'Drop', dave: 'Drop', peter: 'Drop' },
    { name: 'Shame', rene: 'Drop', dave: 'Drop', peter: 'Drop' },
    { name: 'Nobody', rene: 'Drop', dave: 'Drop', peter: 'Drop' },
    { name: 'Refuge pt. 1 & 2', rene: 'Drop', dave: 'Drop', peter: 'Drop' },
    { name: 'Baxan', rene: 'Drop', dave: 'Standard', peter: 'Drop' },
    { name: 'Enmity', rene: 'Drop', dave: 'Drop', peter: 'Standard' },
    {
        name: 'Temporary',
        rene: 'Drop',
        dave: 'Drop',
        peter: 'Standard',
        selected: true,
    },
    {
        name: 'This Time',
        rene: 'Standard',
        dave: 'Standard',
        peter: 'Standard',
        selected: true,
    },
    {
        name: 'Excursions',
        rene: 'Standard',
        dave: 'Standard',
        peter: 'Standard',
        selected: true,
    },
    {
        name: '2010',
        rene: 'Drop',
        dave: 'Drop',
        peter: 'Standard',
        selected: true,
    },
    {
        name: 'Unsure',
        rene: 'Standard',
        dave: 'Drop',
        peter: 'Standard',
        selected: true,
    },
    {
        name: 'Interpret',
        rene: 'Drop',
        dave: 'Drop',
        peter: 'Either',
        selected: true,
    },
    {
        name: 'Tense',
        rene: 'Drop',
        dave: 'Drop',
        peter: 'Drop',
        selected: true,
    },
    {
        name: "Fuk'd Up",
        rene: 'Drop',
        dave: 'Drop',
        peter: 'Drop',
        selected: true,
    },
    {
        name: 'Yr Ok',
        rene: 'Drop',
        dave: 'Drop',
        peter: 'Standard',
        selected: true,
    },
    {
        name: 'Checkout Device',
        rene: 'Drop',
        dave: 'Drop',
        peter: 'Drop',
        selected: true,
    },
];

export type Permutation = {
    name: string;
    tunings: { rene: Tuning; dave: Tuning; peter: Tuning };
    changes: string[];
};

export const generateTunings = (setList: SetList) => {
    return setList.reduce((acc, item, i) => {
        const song = {
            name: item.name,
            tunings: { rene: item.rene, dave: item.dave, peter: item.peter },
            changes: [] as string[],
        };

        const lastSong = acc[acc.length - 1];
        if (lastSong) {
            ['rene', 'dave', 'peter'].forEach((member) => {
                // @ts-ignore
                const lastSongTuning: string = lastSong.tunings[member];
                // @ts-ignore
                const currentSongTuning: string = song.tunings[member];
                const tuningChanged =
                    lastSongTuning !== currentSongTuning &&
                    lastSongTuning !== 'Either' &&
                    currentSongTuning !== 'Either';
                if (tuningChanged) {
                    song.changes.push(
                        `${member.charAt(0).toUpperCase()}  ${getTuningSymbol(
                            currentSongTuning
                        )}`
                    );
                }
            });
        }

        acc.push(song);

        return acc;
    }, [] as Permutation[]);
};

export const getPermutations = (
    inputArr: SetList,
    options?: { logging: boolean }
) => {
    let result: SetList[] = [];
    let permuteCount = 0;

    const permute = (arr: SetList, m: SetList = []) => {
        permuteCount++;

        if (arr.length === 0) {
            result.push(m);
        } else {
            for (let i = 0; i < arr.length; i++) {
                let curr = arr.slice();
                let next = curr.splice(i, 1);
                permute(curr.slice(), m.concat(next));
            }
        }
    };

    permute(inputArr);

    return {
        count: permuteCount,
        resultCount: result.length,
        permutations: result.map(generateTunings),
    };
};

export type SortedPermutation = {
    permutation: Permutation[];
    numTunings: number;
};
export const getSorted = (permutations: Permutation[][]) => {
    const list: SortedPermutation[] = permutations.map((permutation) => {
        return {
            permutation,
            numTunings: permutation.reduce(
                (acc, curr) => acc + curr.changes.length,
                0
            ),
        };
    });

    return list.sort((a, b) => a.numTunings - b.numTunings);
};

export const cli = () => {
    console.log(`Making a setlist with ${songs.length} songs`);
    const { permutations } = getPermutations(songs, { logging: true });
    const sorted = getSorted(permutations);
    return sorted;
};

export const printOptions = (
    numOptions: number,
    sorted: SortedPermutation[]
) => {
    for (let i = 0; i < numOptions; i++) {
        console.log(`Setlist ${i + 1} (${sorted[i].numTunings} tunings): `);
        sorted[i].permutation.forEach((song) => {
            console.log(`${song.name} (${song.changes.join(',')})`);
        });
        console.log('\n');
    }
};
