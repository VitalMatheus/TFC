import { Imatch } from '../interfaces/interfaces';
import Team from '../database/models/teams';

export default async function matchesValidate(match: Imatch) {
  const { homeTeam, awayTeam } = match;
  console.log({ homeTeam });
  if (!homeTeam || !awayTeam) {
    return { status: 404, message: { message: 'There is no team with such id!' } };
  }
  if (homeTeam === awayTeam) {
    return {
      status: 401,
      message: { message: 'It is not possible to create a match with two equal teams' } };
  }
  const home = await Team.findByPk(homeTeam);
  const away = await Team.findByPk(awayTeam);
  if (!home || !away) {
    return {
      status: 404,
      message: { message: 'There is no team with such id!' } };
  }
}
