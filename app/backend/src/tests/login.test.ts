import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Espera que a exista a rota login', () => {
  it('ao logar com sucesso retorna o status 200', async () => {
    const res = await chai.request(app)
    .post('/login')
    .send({ email: 'user@email.com', password: '123456' });
    expect(res.status).to.be.equal(200);
  });
});
