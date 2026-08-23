const { test, expect } = require('@playwright/test');

test.describe('API Testing — JSONPlaceholder', () => {

  test('GET — obtener lista de usuarios', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/users');
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.length).toBe(10);
    expect(body[0].email).toBeDefined();
  });

  test('GET — obtener usuario por ID', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/users/2');
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.id).toBe(2);
    expect(body.name).toBeDefined();
    expect(body.email).toBeDefined();
  });

  test('GET — usuario no existe devuelve 404', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/users/999');
    expect(response.status()).toBe(404);
  });

  test('POST — crear usuario', async ({ request }) => {
    const response = await request.post('https://jsonplaceholder.typicode.com/users', {
      data: { name: 'Juan Pablo', job: 'QA Engineer' }
    });
    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body.name).toBe('Juan Pablo');
    expect(body.id).toBeDefined();
  });

  test('PUT — actualizar usuario', async ({ request }) => {
    const response = await request.put('https://jsonplaceholder.typicode.com/users/2', {
      data: { name: 'Juan Pablo', job: 'Senior QA Engineer' }
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.name).toBe('Juan Pablo');
  });

  test('DELETE — eliminar usuario', async ({ request }) => {
    const response = await request.delete('https://jsonplaceholder.typicode.com/users/2');
    expect(response.status()).toBe(200);
  });

});
