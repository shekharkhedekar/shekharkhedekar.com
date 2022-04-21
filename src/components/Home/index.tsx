import React, { useEffect } from "react";
import WebFont from "webfontloader";
import { FaArrowDown } from "react-icons/fa";
import { scroller, Element as ScrollElement } from "react-scroll";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import data from "./data.json";
import { Expander } from "../Expander";

import "../../scss/base.scss";
import "../../scss/intro.scss";
import "../../scss/play.scss";
import "../../scss/work.scss";

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

  return (
    <>
      <Helmet>
        <title>Shekhar Khedekar</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Helmet>
      <div className="sk-content-wrap">
        <div id="sk-intro">
          <div className="sk-intro-content-wrap sk-font-dependency">
            <h1 className="sk-intro-header">
              <p>Hi there!</p>

              <p>I'm Shekhar Khedekar.</p>
            </h1>
            <hr className="sk-hr" />

            <p className="sk-intro-content">
              I'm a front-end engineering leader, currently on a break from
              working to stay at home with my son. I'm also a drummer, cyclist,
              and home-brewer. If you'd like to get in touch,{" "}
              <a
                href="mailto:shekhar.khedekar+website@gmail.com?subject=Contacting you from shekharkhedekar.com"
                title="email"
                className="sk-link-dark"
              >
                email me,{" "}
              </a>
              connect on{" "}
              <a
                href="https://www.linkedin.com/in/shekharkhedekar"
                title="linkedIn"
                target="_blank"
                rel="noopener noreferrer"
                className="sk-link-dark"
              >
                LinkedIn,{" "}
              </a>
              or find me on{" "}
              <a
                href="https://www.facebook.com/shekhar.khedekar"
                title="facebook"
                target="_blank"
                rel="noopener noreferrer"
                className="sk-link-dark"
              >
                Facebook,{" "}
              </a>
              <a
                href="https://twitter.com/shekhar"
                title="twitter"
                target="_blank"
                rel="noopener noreferrer"
                className="sk-link-dark"
              >
                Twitter,{" "}
              </a>
              and{" "}
              <a
                href="https://www.instagram.com/shekhark"
                title="instagram"
                target="_blank"
                rel="noopener noreferrer"
                className="sk-link-dark"
              >
                Instagram
              </a>
              .
            </p>
          </div>
          <div
            className="sk-intro-down-arrow"
            onClick={() => {
              scroller.scrollTo("sk-work", { smooth: true });
            }}
          >
            <FaArrowDown />
          </div>
        </div>

        <ScrollElement id="sk-work" name="sk-work">
          <div className="sk-work-wrap sk-font-dependency">
            <h2 className="sk-main-header">Work</h2>
            <Link to="/resume" className="sk-work-resume sk-in">
              View Resume
            </Link>

            <div className="sk-work-categories">
              {data.work.map((w) => (
                <div className="sk-work-category">
                  <h3 className="sk-work-header">{w.name}</h3>
                  <hr className="sk-hr-dark sk-work-hr" />
                  {w.items.map((i) => (
                    <div className="sk-work-item">
                      <div className="sk-work-item-title">{i.title}</div>
                      <div className="sk-work-item-description">
                        {i.description}
                      </div>
                      <div className="sk-work-item-time">{i.time}</div>
                      <div className="sk-work-item-content">{i.content}</div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </ScrollElement>

        <div id="sk-play">
          <div className="sk-work-wrap sk-font-dependency">
            <h2 className="sk-main-header">Play</h2>

            <div className="sk-work-categories">
              {data.play.map((p) => (
                <div className="sk-work-category sk-play-category">
                  <h3 className="sk-work-item-title sk-play-title">
                    {p.title}
                  </h3>
                  <hr className="sk-hr-dark sk-work-hr" />
                  <div className="sk-work-item-content">
                    {p.description &&
                      p.description.map((d) =>
                        typeof d === "object" ? (
                          <>
                            <a
                              href={d.href}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {d.text}
                            </a>
                          </>
                        ) : (
                          d + " "
                        )
                      )}
                  </div>
                  {p.teachingGroups &&
                    p.teachingGroups.map((t) => (
                      <Expander label={`${t.title} (${t.location})`}>
                        <>
                          {t.subtitle &&
                            t.subtitle.map((s) => (
                              <>
                                <div className="sk-work-item-description">
                                  {s.title}
                                </div>

                                <div className="sk-work-item-content">
                                  {s.accolades && (
                                    <>
                                      <div className="sk-work-item-description">
                                        Achievements
                                      </div>
                                      {s.accolades.map((a) => (
                                        <li>{a}</li>
                                      ))}
                                    </>
                                  )}
                                </div>
                              </>
                            ))}
                          <a
                            href={t.href}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            website&raquo;
                          </a>
                        </>
                      </Expander>
                    ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
