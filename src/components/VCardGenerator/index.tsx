import { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';

import csv from 'csvtojson';

import { Header } from '../common/Header';
import { Helmet } from 'react-helmet';

export type Row = Record<string, string>;

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

const jsonArraysToObjects = (input: string[][], additionalInfo: string) => {
    const [keys, ...rows] = input;
    const output: Row[] = [];

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

export const VCardGenerator: FC = () => {
    // TODO validation
    const [json, setJson] = useState<Row[]>([]);
    const [value, setValue] =
        useState<string>(`firstName,lastName,email,phone,info
Bob,Loblaw,bob.loblaw@gmail.com,510-555-9999,My Lawyer
`);
    const [additionalInfo, setAdditionalInfo] = useState('');

    const parseCsv = useCallback(() => {
        csv({
            noheader: true,
            output: 'csv',
        })
            .fromString(value)
            .then((output) => {
                const jsonObject = jsonArraysToObjects(output, additionalInfo);
                setJson(jsonObject);
            });
    }, [value, additionalInfo]);

    const onTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.target.value);
    };

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAdditionalInfo(e.target.value);
    };

    useEffect(() => {
        if (value) {
            parseCsv();
        }
    }, [value, parseCsv, additionalInfo]);

    return (
        <>
            <Helmet>
                <title>Generate Contacts (vCards) with a CSV</title>

                <meta
                    name="keywords"
                    content="Group, Meeting, Spot, Map, meetup"
                />
                <link
                    rel="icon"
                    type="image/png"
                    href="vcard.png"
                    sizes="20x16"
                />
            </Helmet>
            <Header>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <img src="vcard.png" width={31} height={24} alt="logo" />
                    Generate VCards from CSV
                </div>
            </Header>
            <div style={{ padding: '1rem' }}>
                <h2>About</h2>
                <p>
                    Have a contact list that you want to convert into contacts
                    for your phone? Paste a CSV file below with the{' '}
                    <strong>firstName</strong>, <strong>lastName</strong>,{' '}
                    <strong>email</strong>, <strong>phone</strong>, and{' '}
                    <strong>info</strong> headers, and download the VCards
                    below. After downloading them, opening the VCF file will add
                    them to your contacts.
                </p>
                <p>
                    This site does not store any of your information, it's all
                    handled in the browser without making any network requests.
                    See the source code here.
                </p>
                <h2>CSV Input</h2>
                <div>Paste or type your CSV here:</div>
                <textarea
                    value={value}
                    rows={25}
                    style={{ width: '100%' }}
                    onChange={onTextAreaChange}
                />
                <label>
                    Additional Info to add to all contacts:
                    <input
                        placeholder="E.g. name of your child's school etc"
                        type="text"
                        style={{ marginLeft: '0.5rem' }}
                        value={additionalInfo}
                        onChange={onInputChange}
                    />
                </label>

                <h2>VCards</h2>
                <a
                    style={{
                        color: 'blue',
                        display: 'block',
                        marginBottom: '1rem',
                    }}
                    href={`data:text/plain;charset=utf-8,${encodeURIComponent(
                        json.map((row) => row.vcard).join('\n\n')
                    )}`}
                    download={`contacts.vcf`}
                >
                    Download All
                </a>

                <div
                    style={{
                        display: 'flex',
                        gap: '1rem',
                        flexWrap: 'wrap',
                    }}
                >
                    {json.map((row) => (
                        <pre
                            style={{
                                background: '#eee',
                                padding: '1rem',
                                borderRadius: '10px',
                                border: '1px solid #ccc',
                                margin: 0,
                            }}
                        >
                            <div>{row.vcard}</div>
                            <div style={{ marginTop: '1rem' }}>
                                <a
                                    style={{ color: 'blue' }}
                                    href={`data:text/plain;charset=utf-8,${encodeURIComponent(
                                        row.vcard
                                    )}`}
                                    download={`${row.firstName} ${row.lastName}.vcf`}
                                >
                                    Download
                                </a>
                            </div>
                        </pre>
                    ))}
                </div>
            </div>
        </>
    );
};
