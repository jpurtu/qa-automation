const { validateEmail, validatePassword, formatBugReport } = require('./utils');

describe('Utils — Validadores QA', () => {

  describe('validateEmail', () => {
    test('email válido retorna true', () => {
      expect(validateEmail('user@test.com')).toBe(true);
    });
    test('email sin @ retorna false', () => {
      expect(validateEmail('usertest.com')).toBe(false);
    });
    test('email vacío retorna false', () => {
      expect(validateEmail('')).toBe(false);
    });
    test('email con espacios retorna false', () => {
      expect(validateEmail('user @test.com')).toBe(false);
    });
  });

  describe('validatePassword', () => {
    test('contraseña válida retorna true', () => {
      expect(validatePassword('Secret123!')).toBe(true);
    });
    test('contraseña menor a 8 caracteres retorna false', () => {
      expect(validatePassword('abc')).toBe(false);
    });
    test('contraseña sin número retorna false', () => {
      expect(validatePassword('SecretPass!')).toBe(false);
    });
    test('contraseña vacía retorna false', () => {
      expect(validatePassword('')).toBe(false);
    });
  });

  describe('formatBugReport', () => {
    test('genera reporte con campos correctos', () => {
      const bug = formatBugReport('Login falla', 'critical', 'Chrome');
      expect(bug.title).toBe('Login falla');
      expect(bug.severity).toBe('critical');
      expect(bug.browser).toBe('Chrome');
      expect(bug.timestamp).toBeDefined();
    });
    test('reporte sin browser usa "Unknown"', () => {
      const bug = formatBugReport('Error 500', 'major');
      expect(bug.browser).toBe('Unknown');
    });
  });

});
