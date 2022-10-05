import React from "react";
import { Element as ScrollElement, Link as ScrollLink } from "react-scroll";
import styled from "styled-components";
import { SIZES } from "../../GlobalStyle";

import data from "../data.json";
import { Divider } from "./Divider";
import { Link } from "./Link";

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

        <div className="sk-work-categories">
          {data.work.map((w) => (
            <div className="sk-work-category">
              <h3 className="sk-work-header">{w.name}</h3>
              <Divider />
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
      </WorkWrap>
    </ScrollElement>
  );
};
