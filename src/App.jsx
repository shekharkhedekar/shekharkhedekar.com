import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GroupMeetingSpot from "./components/GroupMeetingSpot";
import { Home } from "./components/Home";
import { Resume } from "./components/Resume";

const App = () => {
  return (
    <Router>
      {" "}
      <Routes>
        <Route index path="/" element={<Home />}></Route>
        <Route path="/resume" element={<Resume />}></Route>
        <Route
          path="/group-meeting-spot"
          element={<GroupMeetingSpot />}
        ></Route>
      </Routes>
    </Router>
  );
};
export default App;
