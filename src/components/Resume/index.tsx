import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { animateScroll } from 'react-scroll';
import styled, { createGlobalStyle } from 'styled-components';
import { COLORS } from '../GlobalStyle';

import data from './data.json';

const ResumeGlobalStyle = createGlobalStyle`
    @page {
    size: auto;
    margin: 0;
    }

    html,
    body {
        width: 8.5in;
        @media screen and (max-width: 600px) {
           width: 100%;
        }
    }

    a {
    color: inherit;
    text-decoration: none;
    }
`;
const ResumeWrap = styled.div`
    color: ${COLORS.resume.primaryColor};
    font-family: Helvetica Neue, Helvetica, Sans-Serif;
    font-size: 10pt;
    padding: 20pt;
    @media screen and (max-width: 600px) {
        display: block;
    }
`;

const ResumeTitle = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 10pt 0;
    @media screen and (max-width: 600px) {
        display: block;
    }
`;

const ResumeHeader = styled.h1`
    border: 1px solid ${COLORS.resume.primaryColorLight};
    border-width: 0 0 1px 0;
    color: ${COLORS.resume.primaryColorLight};
    font-size: 18pt;
    font-weight: 400;
    padding: 5pt 0;
`;
const ResumeName = styled.div`
    color: ${COLORS.resume.primaryColorLight};
    font-size: 30pt;
    font-weight: 500;
    margin-bottom: 5pt;
`;
const ResumeSection = styled.div`
    display: block;
    width: 100%;
    margin-bottom: 20pt;
    line-height: 16pt;
`;
const ResumeItems = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.22in;
`;
const ResumeItem = styled.div`
    margin-bottom: 5pt;
    width: 2.5in;
`;
const ResumeItemTitle = styled.div`
    font-weight: bold;
`;
const ResumeItemTime = styled.div`
    font-style: italic;
`;
const ResumeList = styled.div`
    display: flex;
`;
const ResumeListName = styled.div`
    font-weight: bold;
    width: 1in;
`;
const ResumeListContent = styled.div`
    margin-bottom: 10pt;
`;
export const Resume = () => {
    useEffect(() => {
        animateScroll.scrollToTop({ duration: 0 });
    }, []);

    return (
        <ResumeWrap>
            <Helmet>
                <title>Shekhar Khedekar - Resume</title>
            </Helmet>
            <ResumeGlobalStyle />

            <ResumeTitle>
                <ResumeName>Shekhar Khedekar</ResumeName>
                <div>
                    <div>
                        <a href="mailto:shekhar.khedekar@gmail.com">
                            shekhar.khedekar@gmail.com
                        </a>
                    </div>
                    <div>
                        <a href="tel:510.220.9106">510.220.9106</a>
                    </div>
                    <div>
                        <a
                            href="http://www.linkedin.com/in/shekharkhedekar"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            linkedin.com/in/shekharkhedekar
                        </a>
                    </div>
                </div>
            </ResumeTitle>

            {data.sections &&
                data.sections.map((section) => (
                    <ResumeSection>
                        <ResumeHeader>{section.name}</ResumeHeader>
                        <div>{section.description}</div>

                        <ResumeItems>
                            {section.items &&
                                section.items.map((item) => (
                                    <ResumeItem>
                                        <ResumeItemTitle>
                                            {item.title}
                                        </ResumeItemTitle>
                                        <div>{item.subtitle}</div>
                                        <ResumeItemTime>
                                            {item.time}
                                        </ResumeItemTime>
                                        {'description' in item && (
                                            <div>{item.description}</div>
                                        )}
                                    </ResumeItem>
                                ))}
                        </ResumeItems>

                        {section.lists &&
                            section.lists.map((list) => (
                                <ResumeList>
                                    <ResumeListName>{list.name}</ResumeListName>
                                    <ResumeListContent>
                                        {list.content}
                                    </ResumeListContent>
                                </ResumeList>
                            ))}
                    </ResumeSection>
                ))}
        </ResumeWrap>
    );
};
