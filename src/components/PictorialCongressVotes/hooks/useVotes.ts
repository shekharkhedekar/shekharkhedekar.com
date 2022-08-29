import axios from "axios";
import { useState } from "react";

import secrets from "../../../secrets.json";
import { Vote } from "../types";

const HEADERS = { "X-API-Key": secrets.PROPUBLICA_API_KEY };

export const useVotes = () => {
  const [recentVotes, setRecentVotes] = useState<Vote[]>([]);
  const [selectedVote, setSelectedVote] = useState<Vote>();
  const [isRecentVotesLoading, setIsRecentVotesLoading] = useState(false);
  const [offset, setOffset] = useState(0);

  const getRecentVotes = async () => {
    const RECENT_VOTES_URL = `https://api.propublica.org/congress/v1/both/votes/recent.json?offset=${offset}`;

    try {
      setIsRecentVotesLoading(true);
      const response = await axios.get(RECENT_VOTES_URL, { headers: HEADERS });
      setRecentVotes([...recentVotes, ...response.data.results.votes]);
    } catch (e) {
      console.error(e);
    }
    setIsRecentVotesLoading(false);
  };

  const getNextRecentVotesPage = async () => {
    setOffset(offset + 20);
    return getRecentVotes();
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

  return {
    getNextRecentVotesPage,
    getRecentVotes,
    getRollCallVotes,
    isRecentVotesLoading,
    recentVotes,
    selectedVote,
  };
};
