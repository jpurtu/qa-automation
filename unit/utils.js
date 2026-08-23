function validateEmail(email) {
  if (!email) return false;
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function validatePassword(password) {
  if (!password || password.length < 8) return false;
  const hasNumber = /\d/.test(password);
  return hasNumber;
}

function formatBugReport(title, severity, browser = 'Unknown') {
  return {
    title,
    severity,
    browser,
    timestamp: new Date().toISOString(),
  };
}

module.exports = { validateEmail, validatePassword, formatBugReport };
