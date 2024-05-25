import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GroupMeetingSpot from './components/GroupMeetingSpot';
import PictorialCongressVotes from './components/PictorialCongressVotes';
import { Home } from './components/Home';
import { Resume } from './components/Resume';
import FindMyBart from './components/FindMyBart';
import { GlobalStyle } from './components/GlobalStyle';
import { Snake } from './components/Snake';
import { VCardGenerator } from './components/VCardGenerator';
import { Helmet } from 'react-helmet';
import { Setlister } from './components/Setlister';

const App = () => {
    return (
        <>
            <Helmet>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, user-scalable=no, user-scalable=0"
                />
            </Helmet>
            <GlobalStyle />
            <Router>
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/resume" element={<Resume />}></Route>
                    <Route
                        path="/group-meeting-spot"
                        element={<GroupMeetingSpot />}
                    ></Route>
                    <Route
                        path="/pictorial-congress-votes"
                        element={<PictorialCongressVotes />}
                    ></Route>
                    <Route
                        path="/find-my-bart"
                        element={<FindMyBart />}
                    ></Route>
                    <Route path="/snake" element={<Snake />}></Route>
                    <Route
                        path="/vcard-generator"
                        element={<VCardGenerator />}
                    ></Route>
                    <Route path="/setlister" element={<Setlister />}></Route>
                </Routes>
            </Router>
        </>
    );
};
export default App;
