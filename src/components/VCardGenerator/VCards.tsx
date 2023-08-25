import { FC, MouseEvent } from 'react';
import { CsvJson } from './types';

export interface VCardsProps {
    json: CsvJson;
}
export const VCards: FC<VCardsProps> = ({ json }) => {
    const downloadAllVcardsSeparately = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        var link = document.createElement('a');

        link.setAttribute('download', '');
        link.style.display = 'none';

        document.body.appendChild(link);

        for (var i = 0; i < json.length; i++) {
            const row = json[i];
            link.setAttribute(
                'href',
                `data:text/plain;charset=utf-8,${encodeURIComponent(row.vcard)}`
            );
            link.setAttribute(
                'download',
                `${row.firstName} ${row.lastName}.vcf`
            );
            link.click();
        }

        document.body.removeChild(link);
    };

    return (
        <>
            <h2>VCards</h2>
            <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem' }}>
                <a
                    style={{ color: 'blue' }}
                    href={`data:text/plain;charset=utf-8,${encodeURIComponent(
                        json.map((row) => row.vcard).join('\n\n')
                    )}`}
                    download={`contacts.vcf`}
                >
                    Download All-in-one Contact
                </a>

                <a
                    style={{ color: 'blue' }}
                    href="#"
                    onClick={downloadAllVcardsSeparately}
                >
                    Download All Individual Contacts
                </a>
            </div>

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
                                data-vcard="true"
                            >
                                Download{' '}
                                {`${row.firstName} ${row.lastName}.vcf`}
                            </a>
                        </div>
                    </pre>
                ))}
            </div>
        </>
    );
};
