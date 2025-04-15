const fs = require('fs');
const os = require('os');

module.exports = async () => {
  // Global setup logic (e.g., DB seeding, env checks)
  console.log('Global setup complete.');

  // Write Allure environment info for reporting
  const allureEnvPath = 'allure-results/environment.properties';
  const envInfo = [
    `OS=${os.platform()} ${os.release()}`,
    `Node=${process.version}`,
    `BaseURL=${process.env.BASE_URL}`,
    `Browser=Playwright Default`,
    `Date=${new Date().toISOString()}`
  ].join('\n');

  fs.mkdirSync('allure-results', { recursive: true });
  fs.writeFileSync(allureEnvPath, envInfo);
};
