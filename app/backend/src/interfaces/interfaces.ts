export interface Iuser {
  email: string,
  password: string,
}

export interface Iinfos {
  id: number,
  username: string,
  email: string,
  password: string,
  role: string,
}

export interface Imatch {
  homeTeam: number,
  awayTeam: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
}

export interface IupdateGoals {
  id: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
}

// export interface IhomePanel {
//   homeTeam: number;
//   homeTeamGoals: number;
//   awayTeam: number;
//   awayTeamGoals: number;
//   inProgress: boolean;
//   teamHome: {
//     teamName: string;
//   };
//   teamAway: {
//     teamName: string;
//   };
// }
