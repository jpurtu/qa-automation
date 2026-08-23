import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

const errorRate = new Rate('errors');

export const options = {
  stages: [
    { duration: '30s', target: 10 },  // sube a 10 usuarios en 30s
    { duration: '1m',  target: 10 },  // mantiene 10 usuarios por 1 minuto
    { duration: '30s', target: 0  },  // baja a 0 usuarios en 30s
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'],  // 95% de requests bajo 500ms
    errors: ['rate<0.01'],             // menos de 1% de errores
  },
};

export default function () {
  // Test 1 — GET lista de usuarios
  const listResponse = http.get('https://jsonplaceholder.typicode.com/users');
  check(listResponse, {
    'status es 200': (r) => r.status === 200,
    'responde en menos de 500ms': (r) => r.timings.duration < 500,
    'devuelve usuarios': (r) => JSON.parse(r.body).length === 10,
  });
  errorRate.add(listResponse.status !== 200);

  sleep(1);

  // Test 2 — GET usuario por ID
  const userResponse = http.get('https://jsonplaceholder.typicode.com/users/1');
  check(userResponse, {
    'status es 200': (r) => r.status === 200,
    'tiene email': (r) => JSON.parse(r.body).email !== undefined,
  });
  errorRate.add(userResponse.status !== 200);

  sleep(1);
}
