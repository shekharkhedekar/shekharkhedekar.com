import { CsvJson, Row } from './types';

const generateVCard = (row: Row, additionalInfo: string) => {
    const rowOutput = [
        'BEGIN:VCARD',
        'VERSION:4.0',
        `FN:${row.firstName} ${row.lastName}`,
        `N:${row.lastName};${row.firstName}`,
    ];

    if (row.email) {
        rowOutput.push(`EMAIL:${row.email}`);
    }

    if (row.phone) {
        rowOutput.push(`TEL:${row.phone}`);
    }

    if (additionalInfo || row.info) {
        const info = [];
        if (additionalInfo) info.push(additionalInfo);
        if (row.info) info.push(row.info);
        rowOutput.push(`ORG:${info.join(' - ')}`);
    }

    rowOutput.push('END:VCARD');

    return rowOutput.join('\n');
};

export const jsonArraysToObjects = (
    input: string[][],
    additionalInfo: string
) => {
    const [keys, ...rows] = input;
    const output: CsvJson = [];

    rows.forEach((row) => {
        const rowObj: Row = {};
        row.forEach((value, i) => {
            rowObj[keys[i]] = value;
        });
        rowObj.vcard = generateVCard(rowObj, additionalInfo);
        output.push(rowObj);
    });

    return output;
};
