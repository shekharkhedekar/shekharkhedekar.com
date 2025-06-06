import React from 'react';
import { FaArrowDown } from 'react-icons/fa';
import { scroller } from 'react-scroll';
import styled from 'styled-components';
import { COLORS, FONTS, FONT_SIZES, SIZES } from '../../GlobalStyle';
import { Divider } from './Divider';
import { Link } from './Link';

const IntroContainer = styled.div`
    height: 100vh;
    min-height: -webkit-fill-available;
    display: flex;
    justify-content: center;
    align-items: center;
    @media screen and (max-width: 600px) {
        align-items: flex-start;
        padding-top: 2rem;
    }
`;

const IntroGradient = styled.div`
    content: ' ';
    background-image: radial-gradient(
        circle,
        rgba(0, 0, 0, 0.75) 0%,
        rgba(0, 0, 0, 1) 75%,
        rgba(0, 0, 0, 1) 100%
    );
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
`;

const IntroContentWrap = styled.div`
    z-index: 1;
    max-width: ${SIZES.maxWidth};
    text-align: center;
`;

const IntroHeader = styled.h1`
    color: ${COLORS.secondaryColorLight};
    font-size: ${FONT_SIZES.xlarge};
    font-family: ${FONTS.headerFontFamily};
`;

const IntroContent = styled.p`
    font-size: ${FONT_SIZES.large};
    line-height: 33px; // TODO Text component
    font-family: ${FONTS.bodyFontFamily};
    color: ${COLORS.primaryColorLight};
`;

const DownArrow = styled.div`
    color: ${COLORS.secondaryColor};
    position: absolute;
    bottom: 40px;
    left: 50%;
    font-size: 25px;
    cursor: pointer;
    z-index: 2;
`;

export const Intro: React.FC = () => {
    return (
        <IntroContainer>
            <IntroGradient />
            <IntroContentWrap>
                <IntroHeader>
                    <p>Hi there!</p>

                    <p>I'm Shekhar Khedekar.</p>
                </IntroHeader>
                <Divider />

                <IntroContent>
                    I'm a front end engineering leader and a drummer, cyclist,
                    and home-brewer. If you'd like to get in touch,{' '}
                    <Link
                        href="mailto:shekhar.khedekar+website@gmail.com?subject=Contacting you from shekharkhedekar.com"
                        title="email"
                        isDark
                    >
                        email me
                    </Link>
                    , connect on{' '}
                    <Link
                        href="https://www.linkedin.com/in/shekharkhedekar"
                        title="linkedIn"
                        isDark
                    >
                        LinkedIn
                    </Link>
                    , or find me on{' '}
                    <Link
                        href="https://www.facebook.com/shekhar.khedekar"
                        title="facebook"
                        isDark
                    >
                        Facebook
                    </Link>
                    ,{' '}
                    <Link
                        href="https://twitter.com/shekhar"
                        title="twitter"
                        isDark
                    >
                        Twitter
                    </Link>
                    , and{' '}
                    <Link
                        href="https://www.instagram.com/shekhark"
                        title="instagram"
                        isDark
                    >
                        Instagram
                    </Link>
                    .
                </IntroContent>
            </IntroContentWrap>
            <DownArrow
                onClick={() => {
                    scroller.scrollTo('sk-work', {
                        smooth: true,
                        duration: 200,
                    });
                }}
            >
                <FaArrowDown />
            </DownArrow>
        </IntroContainer>
    );
};
