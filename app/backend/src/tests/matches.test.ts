import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const obj = {
  id: 1,
  homeTeam: 16,
  homeTeamGoals: 1,
  awayTeam: 8,
  awayTeamGoals: 1,
  inProgress: false,
  teamHome: {
    teamName: 'São Paulo'
  },
  teamAway: {
    teamName: 'Grêmio'
  }
}

describe('testa endpoint de matches', () => {
  it('ao clicar em partidas retorna retorna status 200 com lista de partidas', async () => {
    const data = await chai
    .request(app)
    .get('/matches')
    expect(data.status).to.be.equal(200)
    expect(data.body[0]).to.be.deep.equal(obj)
  })
})