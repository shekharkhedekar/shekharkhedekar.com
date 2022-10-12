import React from 'react';
import { Element as ScrollElement } from 'react-scroll';
import styled from 'styled-components';
import { SIZES } from '../../GlobalStyle';

import data from '../data.json';
import {
    Categories,
    Category,
    CategoryContent,
    CategoryHeader,
    CategoryItem,
    CategoryMeta,
    CategoryTitle,
} from './Categoory';
import { Divider } from './Divider';
import { Link } from './Link';

const WorkWrap = styled.div`
    width: ${SIZES.maxWidth};
    position: relative;
`;

const MainHeader = styled.h2``;

const ResumeLink = styled(Link)`
    position: absolute;
    top: 75px;
    right: 0;
`;

export const Work: React.FC = () => {
    return (
        <ScrollElement name="sk-work" id="sk-work">
            <WorkWrap>
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
                                <CategoryItem>
                                    <CategoryTitle>{i.title}</CategoryTitle>
                                    <CategoryMeta>{i.description}</CategoryMeta>
                                    <CategoryMeta>{i.time}</CategoryMeta>
                                    <CategoryContent>
                                        {i.content}
                                    </CategoryContent>
                                </CategoryItem>
                            ))}
                        </Category>
                    ))}
                </Categories>
            </WorkWrap>
        </ScrollElement>
    );
};
