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

export interface IleaderBoard {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: number
}
