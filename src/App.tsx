import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GroupMeetingSpot from './components/GroupMeetingSpot';
import PictorialCongressVotes from './components/PictorialCongressVotes';
import { Home } from './components/Home';
import { Resume } from './components/Resume';
import FindMyBart from './components/FindMyBart';
import { GlobalStyle } from './components/GlobalStyle';

const App = () => {
    return (
        <>
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
                </Routes>
            </Router>
        </>
    );
};
export default App;
