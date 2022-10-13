import React from 'react';
import { Element as ScrollElement } from 'react-scroll';
import styled from 'styled-components';

import data from '../data.json';
import {
    Categories,
    Category,
    CategoryContent,
    CategoryHeader,
    CategoryMeta,
    CategoryTitle,
    FlexCenterContent,
    MainHeader,
    Wrap,
} from './Common';
import { Divider } from './Divider';
import { Link } from './Link';

const ResumeLink = styled(Link)`
    position: absolute;
    top: 1.5rem;
    right: 0;
`;

export const Work: React.FC = () => {
    return (
        <ScrollElement name="sk-work" id="sk-work">
            <FlexCenterContent>
                <Wrap>
                    <MainHeader>Work</MainHeader>
                    <ResumeLink href="/resume" title="resume">
                        View Resume
                    </ResumeLink>

                    <Categories>
                        {data.work.map((w) => (
                            <Category>
                                <CategoryHeader>{w.name}</CategoryHeader>
                                <Divider />
                                {w.items.map((i) => (
                                    <>
                                        <CategoryTitle>{i.title}</CategoryTitle>
                                        <CategoryMeta>
                                            {i.description}
                                        </CategoryMeta>
                                        <CategoryMeta>{i.time}</CategoryMeta>
                                        <CategoryContent>
                                            {i.content}
                                        </CategoryContent>
                                    </>
                                ))}
                            </Category>
                        ))}
                    </Categories>
                </Wrap>
            </FlexCenterContent>
        </ScrollElement>
    );
};
