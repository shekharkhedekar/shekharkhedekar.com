import React, { useEffect } from 'react';
import WebFont from 'webfontloader';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';

import data from './data.json';
import { Expander } from '../Expander';

import { StringOrLink } from './components/StringOrLink';
import { Intro } from './components/Intro';
import { Divider } from './components/Divider';
import { GlobalStyle } from '../GlobalStyle';
import { Work } from './components/Work';
import { Play } from './components/Play';

export const Home = () => {
    const loadWebFonts = (cb: () => void) => {
        try {
            WebFont.load({
                google: {
                    families: ['Arvo', 'Source Sans Pro'],
                },
                active: cb,
                inactive: cb,
            });
        } catch (e) {
            console.error('Error loading web fonts.');
        }
    };

    useEffect(() => {
        loadWebFonts(() => {});
    }, []);

    const ContentWrap = styled.div`
        height: 100%;
    `;

    return (
        <>
            <Helmet>
                <title>Shekhar Khedekar</title>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
            </Helmet>
            <GlobalStyle />
            <ContentWrap>
                <Intro />
                <Work />
                <Play />
            </ContentWrap>
        </>
    );
};
