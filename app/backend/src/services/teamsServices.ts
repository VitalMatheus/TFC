import Team from '../database/models/teams';

const teamsServices = {
  getAll: async () => {
    const data = await Team.findAll();
    return data;
  },
};

export default teamsServices;
