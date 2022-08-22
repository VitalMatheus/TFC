import Match from '../database/models/matches';
import Team from '../database/models/teams';

const matchesServices = {
  getAll: async () => {
    const data = await Match.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: ['teamName'] },
        { model: Team, as: 'teamAway', attributes: ['teamName'] }],
    });
    return data;
  },
};

export default matchesServices;
