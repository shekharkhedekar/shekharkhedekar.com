import React from 'react';
import { Expander } from '../../Expander';

import data from '../data.json';
import {
    Category,
    CategoryContent,
    CategoryItem,
    CategoryItems,
    CategoryMeta,
    CategoryTitle,
    FlexCenterContent,
    MainHeader,
    Wrap,
} from './Common';
import { Divider } from './Divider';
import { Link } from './Link';
import { StringOrLink } from './StringOrLink';

export const Play = () => {
    return (
        <FlexCenterContent>
            <Wrap>
                <MainHeader>Play</MainHeader>
                <Category>
                    <CategoryItems>
                        {data.play.map((p) => (
                            <CategoryItem>
                                <CategoryTitle>{p.title}</CategoryTitle>
                                <Divider />
                                <CategoryContent>
                                    {p.description &&
                                        p.description.map((d) => (
                                            <StringOrLink content={d} />
                                        ))}
                                </CategoryContent>
                                {p.subItems?.map((t) => (
                                    <Expander label={`${t.title} `}>
                                        <>
                                            <>{'location' in t && t.location}</>
                                            {'subtitle' in t &&
                                                t.subtitle.map((s) => (
                                                    <>
                                                        <CategoryMeta>
                                                            {s.title}
                                                        </CategoryMeta>

                                                        <CategoryContent>
                                                            {'accolades' in
                                                                s && (
                                                                <>
                                                                    <CategoryMeta>
                                                                        Achievements
                                                                    </CategoryMeta>
                                                                    {s.accolades?.map(
                                                                        (a) => (
                                                                            <li>
                                                                                <StringOrLink
                                                                                    content={
                                                                                        a
                                                                                    }
                                                                                />
                                                                            </li>
                                                                        )
                                                                    )}
                                                                </>
                                                            )}
                                                        </CategoryContent>
                                                    </>
                                                ))}
                                            {'href' in t && (
                                                <Link
                                                    href={t.href}
                                                    title={t.title}
                                                >
                                                    Check it out&raquo;
                                                </Link>
                                            )}
                                        </>
                                    </Expander>
                                ))}
                            </CategoryItem>
                        ))}
                    </CategoryItems>
                </Category>
            </Wrap>
        </FlexCenterContent>
    );
};
