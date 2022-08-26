import model from '../database/models';

const query = ` SELECT
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

const leaderboardServices = {
  homeBoard: async () => {
    const [data] = await model.query(query);
    return data;
  },
};

export default leaderboardServices;
