import { FC, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
    @page {
        size: auto;
        margin: 0;
    }

    font-size: 3.5rem;
    font-weight: bold;
    width: 100%;
    height: 100%;
`;

export const PrintSetList: FC = () => {
    const { search } = useLocation();
    const tunings = useMemo(() => {
        const params = new URLSearchParams(search);
        try {
            return JSON.parse(params.get('tunings') || '[]');
        } catch {
            return [];
        }
    }, [search]);

    useEffect(() => {
        window.print();
    }, []);
    return (
        <Container>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '85%',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                    }}
                >
                    {tunings.map((tuning: string) => (
                        <div key={tuning}>{tuning}</div>
                    ))}
                </div>
            </div>
        </Container>
    );
};
