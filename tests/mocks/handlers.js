const { rest } = require('msw');

const handlers = [
  rest.get('https://api.example.com/users', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        { id: 1, name: 'Juan Pablo', email: 'jp@test.com', role: 'admin' },
        { id: 2, name: 'María García', email: 'mg@test.com', role: 'user' },
      ])
    );
  }),

  rest.get('https://api.example.com/users/:id', (req, res, ctx) => {
    const { id } = req.params;
    if (id === '999') {
      return res(ctx.status(404), ctx.json({ error: 'User not found' }));
    }
    return res(ctx.status(200), ctx.json({ id: Number(id), name: 'Juan Pablo', email: 'jp@test.com' }));
  }),

  rest.post('https://api.example.com/users', async (req, res, ctx) => {
    const body = await req.json();
    return res(ctx.status(201), ctx.json({ id: 3, ...body }));
  }),

  rest.get('https://api.example.com/error', (req, res, ctx) => {
    return res(ctx.status(500), ctx.json({ error: 'Internal Server Error' }));
  }),
];

module.exports = { handlers };
