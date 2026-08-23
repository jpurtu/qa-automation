const { setupServer } = require('msw/node');
const { handlers } = require('./handlers');

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('API Mock Testing con MSW', () => {

  test('GET usuarios devuelve lista mockeada', async () => {
    const response = await fetch('https://api.example.com/users');
    const data = await response.json();
    expect(response.status).toBe(200);
    expect(data.length).toBe(2);
    expect(data[0].email).toBe('jp@test.com');
  });

  test('GET usuario por ID devuelve datos correctos', async () => {
    const response = await fetch('https://api.example.com/users/1');
    const data = await response.json();
    expect(response.status).toBe(200);
    expect(data.id).toBe(1);
  });

  test('GET usuario inexistente devuelve 404', async () => {
    const response = await fetch('https://api.example.com/users/999');
    expect(response.status).toBe(404);
  });

  test('POST crea usuario correctamente', async () => {
    const response = await fetch('https://api.example.com/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Test User', email: 'test@test.com' })
    });
    const data = await response.json();
    expect(response.status).toBe(201);
    expect(data.name).toBe('Test User');
    expect(data.id).toBeDefined();
  });

  test('simula error 500 del servidor', async () => {
    const response = await fetch('https://api.example.com/error');
    expect(response.status).toBe(500);
  });

});
