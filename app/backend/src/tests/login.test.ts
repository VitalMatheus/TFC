import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a rota login', () => {
  it('ao logar com email email inválido ou sem email retorna o status 400', async () => {
    const res = await chai
    .request(app)
    .post('/login')
    .send({ password: '123456' });
    expect(res.status).to.be.equal(400);
  })

  it('ao logar com senha inválida ou não informar a senha retorna o status 400', async () => {
    const res = await chai
    .request(app)
    .post('/login')
    .send({ email: 'user@email.com' });
    expect(res.status).to.be.equal(400);
  })

  it('ao logar com sucesso retorna o status 200', async () => {
    const res = await chai
    .request(app)
    .post('/login')
    .send({ email: 'user@user.com', password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO' });
    expect(res.status).to.be.equal(200);
  });
});
