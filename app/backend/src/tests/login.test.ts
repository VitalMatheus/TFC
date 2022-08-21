import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a rota login', () => {
  it('ao tentar logar sem email retorna o status 400', async () => {
    const res = await chai
    .request(app)
    .post('/login')
    .send({ password: '123456' });
    expect(res.status).to.be.equal(400);
    expect(res.body).to.have.property('message');
    expect(res.body.message).to.be.equal('All fields must be filled');
  })

  it('ao tentar logar sem informar a senha retorna o status 400', async () => {
    const res = await chai
    .request(app)
    .post('/login')
    .send({ email: 'user@email.com' });
    expect(res.status).to.be.equal(400);
    expect(res.body).to.have.property('message');
    expect(res.body.message).to.be.equal('All fields must be filled');
  })

  it('ao tentar logar com email inválido retorna o status 401', async () => {
    const res = await chai
    .request(app)
    .post('/login')
    .send({ email: 'algum@email.com', password: 'senhaInvalida' });
    expect(res.status).to.be.equal(401);
    expect(res.body).to.have.property('message');
    expect(res.body.message).to.be.equal('Incorrect email or password');
  })

  it('ao tentar logar com senha inválida retorna o status 401', async () => {
    const res = await chai
    .request(app)
    .post('/login')
    .send({ email: 'algum@email.com', password: 'senhaInvalida' });
    expect(res.status).to.be.equal(401);
    expect(res.body).to.have.property('message');
    expect(res.body.message).to.be.equal('Incorrect email or password');
  })

  it('ao logar com sucesso retorna o status 200', async () => {
    const res = await chai
    .request(app)
    .post('/login')
    .send({ email: 'user@user.com', password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO' });
    expect(res.status).to.be.equal(200);
  });

  it('testa se ao logar, o frontend retorna os dados corretamente', async () => {
    const res = await chai
    .request(app)
    .get('/')
    expect(res.status).to.be.equal(200)
  });
});
