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

@media print {
  html,
  body {
    height: 100%;
    overflow: hidden;
  }
}

a {
  color: inherit;
  text-decoration: none;
}
`;
const ResumeWrap = styled.div`
    background: white;
    color: ${COLORS.resume.primaryColor};
    font-family: Helvetica Neue, Helvetica, Sans-Serif;
    font-size: 10pt;
    margin: 1rem;
    display: flex;
    @media screen and (max-width: 600px) {
        display: block;
        padding-bottom: 1rem;
    }
`;
const ResumeLeftColumn = styled.div`
    flex: 1;
    margin: 15rem 2rem 0;
    @media screen and (max-width: 600px) {
        margin: 1rem 0;
    }
`;
const ResumeRightColumn = styled.div`
    flex: 4;
    margin-right: 2rem;
    padding-top: 2rem;
`;
const ResumeHeader = styled.div`
    border: 1px solid ${COLORS.resume.primaryColorLight};
    border-width: 1px 0 0 0;
    color: ${COLORS.resume.primaryColorLight};
    font-size: 14pt;
    font-weight: 400;
    margin-bottom: 0.5em;
    padding-top: 0.25em;
`;
const ResumeName = styled.div`
    color: ${COLORS.resume.primaryColorLight};
    font-size: 24pt !important;
    font-weight: 400;
    margin-bottom: 0.5em;
`;
const ResumeSection = styled.div`
    display: block;
    width: 100%;
    margin-bottom: 3em;
`;
const ResumeItemTitle = styled.div`
    font-weight: bold;
`;
const ResumeItemTime = styled.div`
    font-style: italic;
`;
const ResumeItem = styled.div`
    margin-bottom: 0.75em;
`;
const ResumeListName = styled.div`
    font-weight: bold;
    width: 2rem;
    position: absolute;
`;
const ResumeListContent = styled.div`
    margin-left: 3.5rem;
    margin-bottom: 1em;
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
            <ResumeLeftColumn>
                <div>
                    <ResumeName>Shekhar Khedekar</ResumeName>
                    <div className="sk-resume-contact">
                        <ResumeHeader>Contact</ResumeHeader>
                        <div>
                            <a
                                href="mailto:shekhar.khedekar@gmail.com"
                                className="sk-resume-contact"
                            >
                                shekhar.khedekar@gmail.com
                            </a>
                        </div>
                        <div>
                            <a
                                href="tel:510.220.9106"
                                className="sk-resume-contact"
                            >
                                510.220.9106
                            </a>
                        </div>
                        <div>
                            <a
                                href="http://www.linkedin.com/in/shekharkhedekar"
                                className="sk-resume-contact"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                linkedin.com/in/shekharkhedekar
                            </a>
                        </div>
                        <div>
                            <a
                                href="http://www.facebook.com/shekhar.khedekar"
                                className="sk-resume-contact"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                facebook.com/shekhar.khedekar
                            </a>
                        </div>
                    </div>
                </div>
            </ResumeLeftColumn>

            <ResumeRightColumn>
                {data.sections &&
                    data.sections.map((section) => (
                        <ResumeSection>
                            <ResumeHeader>{section.name}</ResumeHeader>
                            <div className="sk-resume-section-content">
                                {section.description}
                            </div>

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

                            {section.lists &&
                                section.lists.map((list) => (
                                    <>
                                        <ResumeListName>
                                            {list.name}
                                        </ResumeListName>
                                        <ResumeListContent>
                                            {list.content}
                                        </ResumeListContent>
                                    </>
                                ))}
                        </ResumeSection>
                    ))}
            </ResumeRightColumn>
        </ResumeWrap>
    );
};
