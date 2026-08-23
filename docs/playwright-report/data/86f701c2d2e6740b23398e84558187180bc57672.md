# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: api.spec.js >> API Testing — JSONPlaceholder >> GET — obtener lista de usuarios
- Location: tests/api.spec.js:5:3

# Error details

```
Error: apiRequestContext.get: read ECONNRESET
Call log:
  - → GET https://jsonplaceholder.typicode.com/users
    - user-agent: Playwright/1.62.1 (x64; endeavouros unknown) node/26.7
    - accept: */*
    - accept-encoding: gzip,deflate,br

```

# Test source

```ts
  1  | const { test, expect } = require('@playwright/test');
  2  | 
  3  | test.describe('API Testing — JSONPlaceholder', () => {
  4  | 
  5  |   test('GET — obtener lista de usuarios', async ({ request }) => {
> 6  |     const response = await request.get('https://jsonplaceholder.typicode.com/users');
     |                                    ^ Error: apiRequestContext.get: read ECONNRESET
  7  |     expect(response.status()).toBe(200);
  8  |     const body = await response.json();
  9  |     expect(body.length).toBe(10);
  10 |     expect(body[0].email).toBeDefined();
  11 |   });
  12 | 
  13 |   test('GET — obtener usuario por ID', async ({ request }) => {
  14 |     const response = await request.get('https://jsonplaceholder.typicode.com/users/2');
  15 |     expect(response.status()).toBe(200);
  16 |     const body = await response.json();
  17 |     expect(body.id).toBe(2);
  18 |     expect(body.name).toBeDefined();
  19 |     expect(body.email).toBeDefined();
  20 |   });
  21 | 
  22 |   test('GET — usuario no existe devuelve 404', async ({ request }) => {
  23 |     const response = await request.get('https://jsonplaceholder.typicode.com/users/999');
  24 |     expect(response.status()).toBe(404);
  25 |   });
  26 | 
  27 |   test('POST — crear usuario', async ({ request }) => {
  28 |     const response = await request.post('https://jsonplaceholder.typicode.com/users', {
  29 |       data: { name: 'Juan Pablo', job: 'QA Engineer' }
  30 |     });
  31 |     expect(response.status()).toBe(201);
  32 |     const body = await response.json();
  33 |     expect(body.name).toBe('Juan Pablo');
  34 |     expect(body.id).toBeDefined();
  35 |   });
  36 | 
  37 |   test('PUT — actualizar usuario', async ({ request }) => {
  38 |     const response = await request.put('https://jsonplaceholder.typicode.com/users/2', {
  39 |       data: { name: 'Juan Pablo', job: 'Senior QA Engineer' }
  40 |     });
  41 |     expect(response.status()).toBe(200);
  42 |     const body = await response.json();
  43 |     expect(body.name).toBe('Juan Pablo');
  44 |   });
  45 | 
  46 |   test('DELETE — eliminar usuario', async ({ request }) => {
  47 |     const response = await request.delete('https://jsonplaceholder.typicode.com/users/2');
  48 |     expect(response.status()).toBe(200);
  49 |   });
  50 | 
  51 | });
  52 | 
```