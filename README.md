# QA Automation - Playwright
## Reporte de tests en vivo
https://jpurtu.github.io/qa-automation

Suite de pruebas E2E automatizadas con Playwright para la app Swag Labs.

## Tests incluidos

- Login válido
- Login con credenciales inválidas
- Validación de campos vacíos
- Usuario bloqueado
- Flujo completo: login → agregar producto → verificar carrito

## Stack

- Playwright 1.62
- Node.js
- JavaScript

## Ejecutar tests

Instalar dependencias:
\```
npm install
npx playwright install
\```

Ejecutar todos los tests:
\```
npx playwright test
\```

Modo visual:
\```
npx playwright test --headed
\```
