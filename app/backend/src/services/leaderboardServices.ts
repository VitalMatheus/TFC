import { IleaderBoard } from '../interfaces/interfaces';
import model from '../database/models';

const homeQuery = `SELECT
  teams.team_name AS name,
  sum(matches.home_team_goals > matches.away_team_goals) * 3 +
  sum(matches.home_team_goals = matches.away_team_goals) * 1 AS totalPoints,
  count(matches.home_team) AS totalGames,
  sum(matches.home_team_goals > matches.away_team_goals) AS totalVictories,
  sum(matches.home_team_goals = matches.away_team_goals) AS totalDraws,
  sum(matches.home_team_goals < matches.away_team_goals) AS totalLosses,
  sum(matches.home_team_goals) AS goalsFavor,
  sum(matches.away_team_goals) AS goalsOwn,
  sum(matches.home_team_goals - matches.away_team_goals) AS goalsBalance,
  round(((sum(matches.home_team_goals > matches.away_team_goals) * 3 +
  sum(matches.home_team_goals = matches.away_team_goals))/
  (count(matches.home_team)*3))*100, 2) AS efficiency
FROM TRYBE_FUTEBOL_CLUBE.matches AS matches
INNER JOIN TRYBE_FUTEBOL_CLUBE.teams AS teams
ON matches.home_team = teams.id
WHERE matches.in_progress = false
GROUP BY teams.team_name
ORDER BY totalPoints DESC, goalsBalance DESC, goalsFavor DESC, goalsOwn DESC;`;

const awayQuery = `SELECT
teams.team_name AS name,
sum(matches.home_team_goals < matches.away_team_goals) * 3 +
sum(matches.home_team_goals = matches.away_team_goals) * 1 AS totalPoints,
count(matches.away_team) AS totalGames,
sum(matches.home_team_goals < matches.away_team_goals) AS totalVictories,
sum(matches.home_team_goals = matches.away_team_goals) AS totalDraws,
sum(matches.home_team_goals > matches.away_team_goals) AS totalLosses,
sum(matches.away_team_goals) AS goalsFavor,
sum(matches.home_team_goals) AS goalsOwn,
sum(matches.away_team_goals - matches.home_team_goals) AS goalsBalance,
round(((sum(matches.away_team_goals > matches.home_team_goals) * 3 +
sum(matches.home_team_goals = matches.away_team_goals))/
(count(matches.away_team)*3))*100, 2) AS efficiency
FROM TRYBE_FUTEBOL_CLUBE.matches AS matches
INNER JOIN TRYBE_FUTEBOL_CLUBE.teams AS teams
ON matches.away_team = teams.id
WHERE matches.in_progress = false
GROUP BY teams.team_name
ORDER BY totalPoints DESC, goalsBalance DESC, goalsFavor DESC, goalsOwn DESC;`;

function calcEfficiency(totalPoints: number, totalGames: number): number {
  return +((totalPoints / (totalGames * 3)) * 100).toFixed(2);
}

function leaderBoardReturn(home: IleaderBoard, away: IleaderBoard) {
  return {
    name: home.name,
    totalPoints: +home.totalPoints + +away.totalPoints,
    totalGames: +home.totalGames + +away.totalGames,
    totalVictories: +home.totalVictories + +away.totalVictories,
    totalDraws: +home.totalDraws + +away.totalDraws,
    totalLosses: +home.totalLosses + +away.totalLosses,
    goalsFavor: +home.goalsFavor + +away.goalsFavor,
    goalsOwn: +home.goalsOwn + +away.goalsOwn,
    goalsBalance: +home.goalsBalance + +away.goalsBalance,
    efficiency: calcEfficiency(
      (+home.totalPoints + +away.totalPoints),
      (+home.totalGames + +away.totalGames),
    ),
  };
}

const leaderboardServices = {
  homeBoard: async () => {
    const [data] = await model.query(homeQuery);
    return data;
  },

  awayBoard: async () => {
    const [data] = await model.query(awayQuery);
    return data;
  },

  leaderBoard: async () => {
    const [home] = await model.query(homeQuery) as Array<IleaderBoard[]>;
    const [away] = await model.query(awayQuery) as Array<IleaderBoard[]>;
    const data = home.map((obj: IleaderBoard) => {
      const equivalent = away.find((each: IleaderBoard) => each.name === obj.name) as IleaderBoard;
      return leaderBoardReturn(obj, equivalent);
    });
    return data;
  },
};

export default leaderboardServices;
