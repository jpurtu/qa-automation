const { PactV3, MatchersV3 } = require('@pact-foundation/pact');
const { like, eachLike } = MatchersV3;
const path = require('path');

const provider = new PactV3({
  consumer: 'QA Frontend',
  provider: 'User API',
  dir: path.resolve(__dirname, '../../pacts'),
});

describe('Contract Testing — User API', () => {

  test('GET /users devuelve lista de usuarios', async () => {
    await provider
      .given('usuarios existen')
      .uponReceiving('request para obtener usuarios')
      .withRequest({
        method: 'GET',
        path: '/users',
      })
      .willRespondWith({
        status: 200,
        body: eachLike({
          id: like(1),
          name: like('Juan Pablo'),
          email: like('jp@test.com'),
        }),
      })
      .executeTest(async (mockServer) => {
        const response = await fetch(`${mockServer.url}/users`);
        const data = await response.json();
        expect(response.status).toBe(200);
        expect(data.length).toBeGreaterThan(0);
        expect(data[0].email).toBeDefined();
      });
  });

  test('GET /users/:id devuelve usuario específico', async () => {
    await provider
      .given('usuario con id 1 existe')
      .uponReceiving('request para obtener usuario por id')
      .withRequest({
        method: 'GET',
        path: '/users/1',
      })
      .willRespondWith({
        status: 200,
        body: {
          id: like(1),
          name: like('Juan Pablo'),
          email: like('jp@test.com'),
        },
      })
      .executeTest(async (mockServer) => {
        const response = await fetch(`${mockServer.url}/users/1`);
        const data = await response.json();
        expect(response.status).toBe(200);
        expect(data.id).toBeDefined();
        expect(data.email).toBeDefined();
      });
  });

});
