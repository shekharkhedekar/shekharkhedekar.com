export type Party = "D" | "R" | "ID";

export interface Position {
  vote_position: string;
  member_id: string;
  party: Party;
  name: string;
  state: string;
}

export interface VoteSummary {
  yes: number;
  no: number;
  present: number;
  not_voting: number;
  majority_position: "Yes" | "No";
}

export interface Vote {
  date: string;
  congress: string;
  chamber: string;
  session: string;
  roll_call: string;
  description: string;
  total: number;
  positions: Position[];
  bill: {
    number: string;
    short_title: string;
  };
  amendment: {
    number: string;
  };
  result: string;
  vote_type: "1/2" | "3/5";
  democratic: VoteSummary;
  republican: VoteSummary;
  independent: VoteSummary;
}
