import Match from '../database/models/matches';
import Team from '../database/models/teams';
import { Imatch } from '../interfaces/interfaces';

const matchesServices = {
  getAll: async () => {
    const data = await Match.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: ['teamName'] },
        { model: Team, as: 'teamAway', attributes: ['teamName'] }],
    });
    return data;
  },

  insertMatch: async (match: Imatch) => {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = match;
    const data = await Match.create({
      homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true,
    });
    return data;
  },

  updateInProgress: async (id: number) => {
    await Match.update({ inProgress: false }, { where: { id } });
  },
};

export default matchesServices;
