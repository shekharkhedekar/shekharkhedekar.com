import React, { useState } from 'react';
import { FaPlusCircle, FaMinusCircle } from 'react-icons/fa';
import styled from 'styled-components';
import { CategoryTitle } from './Home/components/Common';

export interface ExpanderProps {
    label: string;
    children: React.ReactChild;
}

const ExpanderWrap = styled.div`
    margin-bottom: 1rem;
`;
const ExpanderTitle = styled(CategoryTitle)`
    cursor: pointer;
    display: flex;
    gap: 0.5rem;
    align-items: center;
`;
const ExpanderContent = styled.div`
    padding: 0.5rem 0 1rem 1.5rem;
    font-size: 1rem;
`;

export const Expander: React.FC<ExpanderProps> = ({ label, children }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <ExpanderWrap>
            <ExpanderTitle onClick={() => setIsExpanded(!isExpanded)}>
                {isExpanded ? <FaMinusCircle /> : <FaPlusCircle />}{' '}
                <div>{label}</div>
            </ExpanderTitle>
            {isExpanded ? <ExpanderContent>{children}</ExpanderContent> : null}
        </ExpanderWrap>
    );
};
