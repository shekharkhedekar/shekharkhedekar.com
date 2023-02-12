import { FC } from 'react';

export const About: FC = () => (
    <>
        <h2>About</h2>
        <p>
            Have a contact list that you want to convert into contacts for your
            phone? Paste a CSV file below with the <strong>firstName</strong>,{' '}
            <strong>lastName</strong>, <strong>email</strong>,{' '}
            <strong>phone</strong>, and <strong>info</strong> headers, and
            download the VCards below. After downloading them, open the VCF file
            with your contacts app.
        </p>
        <br />
        <p>
            This site does not store any of your information, it's all handled
            in your browser without making any network requests. See the source
            code{' '}
            <a
                href="https://github.com/shekharkhedekar/shekharkhedekar.com/tree/master/src/components/VCardGenerator"
                target="_blank"
                rel="noopener noreferrer"
            >
                here
            </a>
            .
        </p>
    </>
);
