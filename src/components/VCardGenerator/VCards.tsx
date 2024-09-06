import { FC, MouseEvent } from 'react';
import { CsvJson } from './types';
import { BlobWriter, TextReader, ZipWriter } from '@zip.js/zip.js';

export interface VCardsProps {
    json: CsvJson;
}

async function getZipFileBlob(json: CsvJson) {
    const zipWriter = new ZipWriter(new BlobWriter('application/zip'));
    await Promise.all(
        json.map(({ vcard, firstName, lastName }) => {
            if (firstName === '' && lastName === '') {
                return Promise.resolve();
            }

            const name = `contacts/${firstName} ${lastName}.vcf`;
            return zipWriter.add(name, new TextReader(vcard));
        })
    );

    return zipWriter.close();
}

function downloadFile(blob: Blob, filename: string) {
    const link = document.createElement('a');
    link.download = filename;
    link.href = URL.createObjectURL(blob);
    link.click();
    document.body.removeChild(link);
}

export const VCards: FC<VCardsProps> = ({ json }) => {
    const downloadAllVcards = async (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const blob = await getZipFileBlob(json);
        downloadFile(blob, 'all-contacts.zip');
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
                    download={`all-contacts.vcf`}
                >
                    Download All-in-one Contact
                </a>

                <a
                    style={{ color: 'blue' }}
                    href="/"
                    onClick={downloadAllVcards}
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
