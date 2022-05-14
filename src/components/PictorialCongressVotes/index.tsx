import React, { useEffect, useState } from "react";
import axios from "axios";
import Select, { SingleValue } from "react-select";

import secrets from "../../secrets.json";

export interface Vote {
  congress: string;
  chamber: string;
  session: string;
  roll_call: string;
  description: string;
  total: number;
  positions: {
    vote_position: string;
    member_id: string;
    party: string;
    name: string;
    state: string;
  }[];
}

const HEADERS = { "X-API-Key": secrets.PROPUBLICA_API_KEY };

const PictorialCongressVotes = () => {
  const [recentVotes, setRecentVotes] = useState<Vote[]>([]);
  const [selectedVote, setSelectedVote] = useState<Vote>();

  const getRecentVotes = async () => {
    const RECENT_VOTES_URL =
      "https://api.propublica.org/congress/v1/senate/votes/recent.json";

    try {
      const response = await axios.get(RECENT_VOTES_URL, { headers: HEADERS });
      setRecentVotes(response.data.results.votes);
    } catch (e) {
      console.error(e);
    }
  };

  const getRollCallVotes = async (vote: Vote) => {
    setSelectedVote(undefined);
    const ROLL_CALL_VOTES_URL = `https://api.propublica.org/congress/v1/${vote.congress}/${vote.chamber}/sessions/${vote.session}/votes/${vote.roll_call}.json`;
    try {
      const response = await axios.get(ROLL_CALL_VOTES_URL, {
        headers: HEADERS,
      });

      setSelectedVote(response.data.results.votes.vote);
    } catch (e) {
      console.error(e);
    }
  };
  const handleVoteChange = (
    option: SingleValue<{ label: string; value: Vote }>
  ) => {
    if (!option) return;

    const vote = option.value;
    getRollCallVotes(vote);
  };

  useEffect(() => {
    getRecentVotes();
  }, []);

  return (
    <>
      <Select
        options={recentVotes.map((vote: Vote) => ({
          label: `${vote.roll_call} - ${vote.description}`,
          value: vote,
        }))}
        onChange={handleVoteChange}
      />
      {selectedVote && (
        <div style={{ display: "flex" }}>
          {Object.entries(selectedVote.total)
            .filter(([_, total]) => total)
            .map(([position, total]) => (
              <div style={{ flex: 1 }}>
                <h3 style={{ textTransform: "capitalize" }}>
                  {position.replace("_", " ")} ({total})
                </h3>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {selectedVote.positions
                    .filter(
                      (vote) => vote.vote_position.toLowerCase() === position
                    )
                    .map((vote) => (
                      <div>
                        <div
                          style={{
                            backgroundImage: `url('https://theunitedstates.io/images/congress/original/${vote.member_id}.jpg')`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover",
                            width: 150,
                            height: 150,
                            borderRadius: "50%",
                            borderColor:
                              vote.party === "D" ? "#0015BC" : "#E9141D",
                            borderWidth: "10px",
                            borderStyle: "solid",
                          }}
                          title={vote.name}
                        />
                        <div>{vote.name}</div>
                        <div>
                          ({vote.party} - {vote.state})
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
        </div>
      )}
    </>
  );
};

export default PictorialCongressVotes;
