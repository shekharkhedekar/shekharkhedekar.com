import React, { useEffect } from "react";
import WebFont from "webfontloader";
import { Helmet } from "react-helmet";
import styled from "styled-components";

import data from "./data.json";
import { Expander } from "../Expander";

import { StringOrLink } from "./components/StringOrLink";
import { Intro } from "./components/Intro";
import { Divider } from "./components/Divider";
import { GlobalStyle } from "../GlobalStyle";
import { Work } from "./components/Work";

export const Home = () => {
  const loadWebFonts = (cb: () => void) => {
    try {
      WebFont.load({
        google: {
          families: ["Arvo", "Source Sans Pro"],
        },
        active: cb,
        inactive: cb,
      });
    } catch (e) {
      console.error("Error loading web fonts.");
    }
  };

  useEffect(() => {
    loadWebFonts(() => {});
  }, []);

  const ContentWrap = styled.div`
    height: 100%;
  `;

  return (
    <>
      <Helmet>
        <title>Shekhar Khedekar</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Helmet>
      <GlobalStyle />
      <ContentWrap>
        <Intro />
        <Work />

        <div id="sk-play">
          <div className="sk-work-wrap sk-font-dependency">
            <h2 className="sk-main-header">Play</h2>

            <div className="sk-work-categories">
              {data.play.map((p) => (
                <div className="sk-work-category sk-play-category">
                  <h3 className="sk-work-item-title sk-play-title">
                    {p.title}
                  </h3>
                  <Divider />
                  <div className="sk-work-item-content">
                    {p.description &&
                      p.description.map((d) => <StringOrLink content={d} />)}
                  </div>
                  {p.subItems?.map((t) => (
                    <Expander
                      label={
                        `${t.title} ` +
                        ("location" in t ? `(${t.location})` : "")
                      }
                    >
                      <>
                        {"subtitle" in t &&
                          t.subtitle.map((s) => (
                            <>
                              <div className="sk-work-item-description">
                                {s.title}
                              </div>

                              <div className="sk-work-item-content">
                                {"accolades" in s && (
                                  <>
                                    <div className="sk-work-item-description">
                                      Achievements
                                    </div>
                                    {s.accolades?.map((a) => (
                                      <li>
                                        <StringOrLink content={a} />
                                      </li>
                                    ))}
                                  </>
                                )}
                              </div>
                            </>
                          ))}
                        {"href" in t && (
                          <a
                            href={t.href}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            website&raquo;
                          </a>
                        )}
                      </>
                    </Expander>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </ContentWrap>
    </>
  );
};
