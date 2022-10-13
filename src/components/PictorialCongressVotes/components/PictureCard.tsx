import React, { useEffect, useState } from 'react';

import { Party, Position } from '../types';

export interface PictureCardProps {
    vote: Position;
}

const PARTY_COLORS: Record<Party, string> = {
    D: '#0015BC',
    R: '#E9141D',
    ID: '#000',
};
export const PictureCard: React.FC<PictureCardProps> = ({ vote }) => {
    const url = `https://theunitedstates.io/images/congress/original/${vote.member_id}.jpg`;
    const [backgroundImage, setBackgroundImage] = useState(url);

    useEffect(() => {
        const getBackgroundImage = async () => {
            const image = new Image();
            image.src = url;
            image.onload = () => {
                setBackgroundImage(`url(${url})`);
            };
            image.onerror = () => {
                const newImage = `url(https://ui-avatars.com/api/?name=${encodeURIComponent(
                    vote.name
                )})`;
                console.warn(`Could not find image for ${vote.name}`);
                setBackgroundImage(newImage);
            };
        };
        getBackgroundImage();
    }, [url, vote]);

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                margin: '0 1rem 1rem 0',
                width: '10rem',
            }}
        >
            <div
                style={{
                    backgroundImage,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    width: 150,
                    height: 150,
                    borderRadius: '50%',
                    borderColor: PARTY_COLORS[vote.party],
                    borderWidth: '5px',
                    borderStyle: 'solid',
                }}
                title={vote.name}
            />
            <div style={{ maxWidth: '10rem', textAlign: 'center' }}>
                {vote.name}
            </div>
            <div>
                ({vote.party} - {vote.state})
            </div>
        </div>
    );
};
