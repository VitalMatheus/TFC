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
