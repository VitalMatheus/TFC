import * as sinon from 'sinon';
import * as chai from 'chai';
import * as Jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import { any, object } from 'joi';
import { request } from 'http';
import Match from '../database/models/matches';

chai.use(chaiHttp);

const { expect } = chai;

describe('Realiza testes do enpoint macthes', () => {
  after(() => {
    sinon.restore();
  });

  it('ao clicar em partidas retorna retorna status 200 com lista de partidas', async () => {
    const data = await chai
    .request(app)
    .get('/matches')
    expect(data.status).to.be.equal(200)
    expect(typeof data.body).to.be.equal('object')

    // expect(data.body[0]).to.be.deep.equal(obj)
  })

  it('ao usar o filtro de "em andamento" retorna apenas lista de partidas em progresso', async () => {
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
    expect(typeof data.body).to.be.equal('object')
    // expect(data.body[0]).to.be.deep.equal(finished)
  })

  it('ao inserir uma partida retorna um objeto com status 201', async () => {
    const secret = process.env.JWT_SECRET || 'jwt_secret';
    const token = Jwt.sign({ token: 'valid_token' }, secret);
    
    const data = await chai
    .request(app)
    .post('/matches')
    .set({ 'Authorization': token })
    .send({
      homeTeam: 16, 
      awayTeam: 8,
      homeTeamGoals: 2,
      awayTeamGoals: 2,
    })
    expect(data.status).to.be.equal(201)
    expect(typeof data.body).to.be.equal('object')
  })

  it('verifica que não deve ser possível inserir uma partida com times iguais', async ()=> {
    const data = await chai
    .request(app)
    .post('/matches')
    .send({
      homeTeam: 8, 
      awayTeam: 8,
      homeTeamGoals: 2,
      awayTeamGoals: 2,
    })
    expect(data.status).to.be.equal(401)
    expect(data.body.message).to.be.equal('It is not possible to create a match with two equal teams')
  })

  it('verifica que não deve ser possível inserir um time que não exista na tabela Teams', async () => {
    const data = await chai
    .request(app)
    .post('/matches')
    .send({
      homeTeam: 20, 
      awayTeam: 21,
      homeTeamGoals: 2,
      awayTeamGoals: 1,
    })
    expect(data.status).to.be.equal(404)
    expect(data.body.message).to.be.equal('There is no team with such id!')
  })

  
  it('Verifica que não deve ser possível inserir uma partida sem um token válido', (done) => {
    const token = 'invalid_token';
    chai
    .request(app)
    .post('/matches')
    .set({ 'Authorization': token })
    .send({
      homeTeam: 2, 
      awayTeam: 5,
      homeTeamGoals: 2,
      awayTeamGoals: 1,
    })
    .end((err, res) => {
      if (err) done(err);
        expect(res.status).to.equal(401);
        done()
    })
  })

  it('verifica se é possível atualizar os gols de uma partida', async () => {
    const data = await chai
    .request(app)
    .patch('/matches/1')
    .send({
      "homeTeamGoals": 3,
      "awayTeamGoals": 1
    })
    expect(data.status).to.be.equal(200);
  }) 
})
