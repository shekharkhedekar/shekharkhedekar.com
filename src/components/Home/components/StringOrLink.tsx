import React from 'react';

export const StringOrLink: React.FC<{
    content: string | { href: string; title: string };
}> = ({ content }) => {
    if (typeof content === 'string') {
        return <> {content}</>;
    }

    const newTabProps = { target: '_blank', rel: 'noopener noreferrer' };
    const props = { href: content.href, ...newTabProps };

    return <a {...props}> {content.title}</a>;
};
