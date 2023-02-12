import { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';

import csv from 'csvtojson';

import { Header } from '../common/Header';
import { Helmet } from 'react-helmet';
import { About } from './About';
import { Inputs } from './Inputs';
import { Row } from './types';
import { VCards } from './VCards';
import { jsonArraysToObjects } from './utils';

const DEFAULT_CSV = `firstName,lastName,email,phone,info
Bob,Loblaw,bob.loblaw@gmail.com,510-555-9999,My Lawyer
`;

export const VCardGenerator: FC = () => {
    // TODO validation
    const [json, setJson] = useState<Row[]>([]);
    const [value, setValue] = useState<string>(DEFAULT_CSV);
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
                <h1
                    style={{
                        display: 'flex',
                        gap: '0.5rem',
                        alignItems: 'center',
                        fontSize: '1.33rem',
                    }}
                >
                    <img src="vcard.png" width={31} height={24} alt="logo" />
                    Generate VCards from CSV
                </h1>
            </Header>
            <div style={{ padding: '1rem' }}>
                <About />
                <Inputs
                    csvValue={value}
                    onCsvValueChange={onTextAreaChange}
                    additionalInfo={additionalInfo}
                    onAdditionalInfoChange={onInputChange}
                />
                <VCards json={json} />
            </div>
        </>
    );
};
