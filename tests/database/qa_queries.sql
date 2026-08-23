-- QA Database Testing Queries
-- Base de datos: qa_practice

-- 1. Verificar usuarios activos/inactivos
SELECT email, active, role FROM users ORDER BY active DESC;

-- 2. Verificar integridad de órdenes
SELECT o.id, u.email, u.active, o.product, o.status
FROM orders o
JOIN users u ON o.user_id = u.id;

-- 3. Detectar órdenes de usuarios inactivos (bug)
SELECT o.* FROM orders o
JOIN users u ON o.user_id = u.id
WHERE u.active = false;

-- 4. Total de ventas por estado
SELECT status, COUNT(*), SUM(amount)
FROM orders
GROUP BY status;

-- 5. Usuarios sin órdenes
SELECT u.email FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE o.id IS NULL;
