import styled from 'styled-components';
import { COLORS, SIZES } from '../../GlobalStyle';

export const FlexCenterContent = styled.div`
    display: flex;
    justify-content: center;
`;

export const Wrap = styled.div`
    width: ${SIZES.maxWidth};
    position: relative;
    margin-top: 4rem;
    @media screen and (max-width: 600px) {
        width: auto;
        margin: 1rem;
    }
`;

export const MainHeader = styled.h2``;

export const Categories = styled.div`
    padding-bottom: 1rem;
`;

export const Category = styled.div`
    font-size: 18px;
    line-height: 24px;
`;

export const CategoryHeader = styled.h3`
    font-size: 23px;
    font-weight: 100;
`;
export const CategoryItems = styled.div`
    display: flex;
    gap: 10%;
    flex-wrap: wrap;
`;

export const CategoryItem = styled.div`
    width: 26%;
    margin-bottom: 2rem;
    @media screen and (max-width: 600px) {
        width: 100%;
        margin-bottom: 1rem;
    }
`;

export const CategoryMeta = styled.div`
    font-weight: bold;
    font-style: italic;
    color: ${COLORS.primaryColor};
`;
export const CategoryTitle = styled(CategoryMeta)`
    font-style: normal;
    color: ${COLORS.secondaryColorLight};
`;

export const CategoryContent = styled.div`
    margin: 1rem 0;
    font-style: italic;
    color: ${COLORS.primaryColorLight};
`;
