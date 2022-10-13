import React, { useEffect } from "react";

import Select, { SingleValue } from "react-select";
import { DisplayTable } from "./components/DisplayTable";
import { PictureCard } from "./components/PictureCard";
import { useVotes } from "./hooks/useVotes";
import { Vote } from "./types";

const PictorialCongressVotes = () => {
    const {
        getNextRecentVotesPage,
        getRecentVotes,
        getRollCallVotes,
        isRecentVotesLoading,
        recentVotes,
        selectedVote,
    } = useVotes();

    const handleVoteChange = (
        option: SingleValue<{ label: string; value: Vote }>
    ) => {
        if (!option) return;

        const vote = option.value;
        getRollCallVotes(vote);
    };
    const handleMenuScrollToBottom = () => {
        console.log("bottom");
        getNextRecentVotesPage();
    };

    useEffect(() => {
        getRecentVotes();
    }, []);

    return (
        <div style={{ display: "flex", gap: "5rem" }}>
            <div style={{ width: "40rem", margin: "1rem" }}>
                <h1>Pictorial Congress Votes</h1>
                <p>
                    See what the each vote looks like based on profile pictures and party
                    designation
                </p>
                <label htmlFor="vote-select">Select a vote:</label>

                <Select
                    options={recentVotes.map((vote: Vote) => ({
                        label: `${vote.bill.number} - ${vote.description}`,
                        value: vote,
                    }))}
                    onChange={handleVoteChange}
                    onMenuScrollToBottom={handleMenuScrollToBottom}
                    isLoading={isRecentVotesLoading}
                />

                {selectedVote && (
                    <>
                        <h2>
                            {selectedVote.chamber} Bill {selectedVote.bill.number}{" "}
                            {selectedVote.bill.short_title && (
                                <>
                                    &mdash; {selectedVote.bill.short_title}{" "}
                                    {selectedVote.amendment.number}
                                </>
                            )}
                        </h2>
                        <DisplayTable
                            data={[
                                { label: "Date", value: selectedVote.date },
                                { label: "Description", value: selectedVote.description },
                                { label: "Type of vote", value: selectedVote.vote_type },
                                { label: "Result", value: selectedVote.result },
                                {
                                    label: "Democrats",
                                    value: `Yes (${selectedVote.democratic.yes}) No (
              ${selectedVote.democratic.no})`,
                                },
                                {
                                    label: "Republicans",
                                    value: `Yes (${selectedVote.republican.yes}) No (
              ${selectedVote.republican.no})`,
                                },
                                {
                                    label: "Independents",
                                    value: `Yes (${selectedVote.independent.yes}) No (
              ${selectedVote.independent.no})`,
                                },
                            ]}
                        />
                    </>
                )}
            </div>
            <div style={{ flex: 1 }}>
                {selectedVote && (
                    <div>
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
                                            .sort((a, b) => (a.party > b.party ? 1 : -1))
                                            .map((vote) => (
                                                <PictureCard vote={vote} />
                                            ))}
                                    </div>
                                </div>
                            ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PictorialCongressVotes;
