import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import { object } from 'joi';

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

const inProgress = {
  "id": 41,
  "homeTeam": 16,
  "homeTeamGoals": 2,
  "awayTeam": 9,
  "awayTeamGoals": 0,
  "inProgress": true,
  "teamHome": {
    "teamName": "São Paulo"
  },
  "teamAway": {
    "teamName": "Internacional"
  }
}

const finished = {
  "id": 1,
  "homeTeam": 16,
  "homeTeamGoals": 1,
  "awayTeam": 8,
  "awayTeamGoals": 1,
  "inProgress": false,
  "teamHome": {
    "teamName": "São Paulo"
  },
  "teamAway": {
    "teamName": "Grêmio"
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

  it('ao usar o filtro de "em andamento" retorna apenas lista de partidas em progresso', async () => {
    const data = await chai
    .request(app)
    .get('/matches?inProgress=true')
    expect(data.status).to.be.equal(200)
    expect(data.body[0]).to.be.deep.equal(inProgress)
  })

  it('ao usar o filtro "Finalizado" retorna apenas lista de partidas finalizadas', async () => {
    const data = await chai
    .request(app)
    .get('/matches?inProgress=false')
    expect(data.status).to.be.equal(200)
    expect(data.body[0]).to.be.deep.equal(finished)
  })

  it('ao inserir uma partida retorna um objeto com status 201', async () => {
    const data = await chai
    .request(app)
    .post('/matches')
    .send({
      homeTeam: 16, 
      awayTeam: 8,
      homeTeamGoals: 2,
      awayTeamGoals: 2,
    })
    expect(data.status).to.be.equal(201)
    expect(typeof data.body).to.be.equal('object')
  })
})