import React, { useState } from 'react';
import { FaPlusCircle, FaMinusCircle } from 'react-icons/fa';
import styled from 'styled-components';
import { CategoryTitle } from './Home/components/Common';

export interface ExpanderProps {
    label: string;
    children: React.ReactChild;
}

const ExpanderTitle = styled(CategoryTitle)`
    cursor: pointer;
`;

const ExpanderWrap = styled.div`
    margin-bottom: 1rem;
`;
export const Expander: React.FC<ExpanderProps> = ({ label, children }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <ExpanderWrap>
            <ExpanderTitle onClick={() => setIsExpanded(!isExpanded)}>
                {isExpanded ? <FaMinusCircle /> : <FaPlusCircle />} {label}
            </ExpanderTitle>
            {isExpanded ? (
                <div className="sk-expander-content">{children}</div>
            ) : null}
        </ExpanderWrap>
    );
};
