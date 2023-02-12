import { FC } from 'react';
import { CsvJson } from './types';

export interface VCardsProps {
    json: CsvJson;
}
export const VCards: FC<VCardsProps> = ({ json }) => (
    <>
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
                            Download {`${row.firstName} ${row.lastName}.vcf`}
                        </a>
                    </div>
                </pre>
            ))}
        </div>
    </>
);
