# QA Automation Suite

Suite completa de pruebas automatizadas construida con Playwright y k6.

## Reporte de tests en vivo
https://jpurtu.github.io/qa-automation

## Suites incluidas

### E2E Testing — Playwright
- Login válido, inválido, campos vacíos y usuario bloqueado
- Flujo completo: login → agregar producto → verificar carrito
- Page Object Model implementado

### API Testing — Playwright
- GET lista de recursos
- GET recurso por ID
- GET recurso inexistente (404)
- POST crear recurso
- PUT actualizar recurso
- DELETE eliminar recurso

### Performance Testing — k6
- Load test con 10 usuarios virtuales concurrentes
- Rampa de subida, carga sostenida y rampa de bajada
- Thresholds: p(95) < 500ms, error rate < 1%
- Resultados: p(95) = 166ms, 0% errores HTTP

## Stack
- Playwright 1.62
- k6
- Node.js
- JavaScript
- GitHub Actions (CI/CD)

## Ejecutar tests

Instalar dependencias:
\```
npm install
npx playwright install
\```

E2E y API tests:
\```
npx playwright test
\```

Performance tests:
\```
k6 run tests/performance/load.test.js
\```

Modo visual:
\```
npx playwright test --headed
\```
