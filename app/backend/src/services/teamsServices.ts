import Team from '../database/models/teams';

const teamsServices = {
  getAll: async () => {
    const data = await Team.findAll();
    return data;
  },

  getOne: async (id: number) => {
    const data = await Team.findByPk(id);
    return data;
  },
};

export default teamsServices;
