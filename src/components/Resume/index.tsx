import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { animateScroll } from "react-scroll";

import data from "./data.json";
import "../../scss/resume.scss";

export const Resume = () => {
  useEffect(() => {
    animateScroll.scrollToTop({ duration: 0 });
  }, []);
  return (
    <div className="resume">
      <Helmet>
        <title>Shekhar Khedekar - Resume</title>
      </Helmet>
      <div className="sk-resume-left-col">
        <div>
          <div className="sk-resume-name">Shekhar Khedekar</div>
          <div className="sk-resume-contact">
            <div className="sk-resume-header">Contact</div>
            <div>
              <a
                href="mailto:shekhar.khedekar@gmail.com"
                className="sk-resume-contact"
              >
                shekhar.khedekar@gmail.com
              </a>
            </div>
            <div>
              <a href="tel:510.220.9106" className="sk-resume-contact">
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
      </div>

      <div className="sk-resume-right-col">
        {data.sections &&
          data.sections.map((section) => (
            <div className="sk-resume-section">
              <div className="sk-resume-header">{section.name}</div>
              <div className="sk-resume-section-content">
                {section.description}
              </div>

              {section.items &&
                section.items.map((item) => (
                  <>
                    <div className="sk-resume-item-title">{item.title}</div>
                    <div className="sk-resume-item-subtitle">
                      {item.subtitle}
                    </div>
                    <div className="sk-resume-item-time">{item.time}</div>
                    {"description" in item && (
                      <div className="sk-resume-item-description">
                        {item.description}
                      </div>
                    )}
                  </>
                ))}

              {section.lists &&
                section.lists.map((list) => (
                  <>
                    <div className="sk-resume-list-name">{list.name}</div>
                    <div className="sk-resume-list-content">{list.content}</div>
                  </>
                ))}
            </div>
          ))}
      </div>
    </div>
  );
};
