#!/usr/bin/env node

const { spawn } = require('node:child_process');
const { existsSync, mkdirSync, rmSync } = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '../..');
const baseUrl = process.env.GALEN_BASE_URL || 'http://127.0.0.1:3000';
const reportDir = path.join(root, 'tests/galen/reports');
const galenBin = path.join(root, 'node_modules/.bin/galen');
const chromedriver = path.join(root, 'node_modules/chromedriver/lib/chromedriver/chromedriver');
const galenConfig = path.join(root, 'tests/galen/galen.config');

const devices = [
  { name: 'desktop', size: '1440x900' },
  { name: 'tablet', size: '768x1024' },
  { name: 'mobile', size: '390x844' },
];

const pages = [
  { name: 'landing', url: '/', spec: 'landing.gspec' },
  { name: 'dashboard', url: '/?galenView=dashboard', spec: 'app.gspec' },
  { name: 'learn', url: '/?galenView=learn', spec: 'app.gspec' },
  { name: 'databank', url: '/?galenView=databank', spec: 'app.gspec' },
  { name: 'refresher', url: '/?galenView=refresher', spec: 'app.gspec' },
  { name: 'demo-copilot', url: '/?galenView=demo-copilot', spec: 'app.gspec' },
  { name: 'scorecard', url: '/?galenView=scorecard', spec: 'app.gspec' },
  { name: 'settings', url: '/?galenView=settings', spec: 'app.gspec' },
  { name: 'cms', url: '/?galenView=cms', spec: 'app.gspec' },
];

const run = (command, args, options = {}) => new Promise((resolve, reject) => {
  const child = spawn(command, args, {
    cwd: root,
    stdio: options.stdio || 'inherit',
    env: {
      ...process.env,
      ...options.env,
    },
  });

  child.on('error', reject);
  child.on('exit', (code) => {
    if (code === 0) resolve();
    else reject(new Error(`${command} ${args.join(' ')} exited with ${code}`));
  });
});

const checkJava = () => run('java', ['-version'], { stdio: 'ignore' }).catch(() => {
  throw new Error(
    'Galen layout tests require a Java runtime. Install Java locally, or run in CI where Temurin Java 17 is configured.'
  );
});

const waitForServer = async () => {
  const deadline = Date.now() + 120_000;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(baseUrl);
      if (response.ok) return;
    } catch {
      // Vite is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  throw new Error(`Timed out waiting for ${baseUrl}`);
};

const startServer = () => {
  const child = spawn('npm', ['run', 'dev', '--', '--host', '127.0.0.1'], {
    cwd: root,
    stdio: 'inherit',
    env: {
      ...process.env,
      VITE_AIRFRAME_E2E_AUTH: '1',
    },
  });

  child.on('error', (error) => {
    console.error(error);
    process.exit(1);
  });

  return child;
};

const runGalen = async () => {
  if (!existsSync(galenBin)) throw new Error('Missing Galen binary. Run npm install first.');
  if (!existsSync(chromedriver)) throw new Error('Missing chromedriver binary. Run npm install first.');

  rmSync(reportDir, { recursive: true, force: true });
  mkdirSync(reportDir, { recursive: true });

  for (const page of pages) {
    for (const device of devices) {
      const spec = path.join(root, 'tests/galen/specs', page.spec);
      const name = `${page.name}-${device.name}`;
      const url = `${baseUrl}${page.url}`;
      const htmlReport = path.join(reportDir, name);
      const junitReport = path.join(reportDir, `${name}.xml`);

      console.log(`\n[Galen] ${name}: ${url} @ ${device.size}`);
      await run(galenBin, [
        'check',
        spec,
        '--url', url,
        '--size', device.size,
        '--include', `${device.name},${page.name}`,
        '--config', galenConfig,
        '--htmlreport', htmlReport,
        '--junitreport', junitReport,
        `-Dwebdriver.chrome.driver=${chromedriver}`,
      ]);
    }
  }
};

(async () => {
  let server;
  try {
    await checkJava();
    server = startServer();
    await waitForServer();
    await runGalen();
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  } finally {
    if (server) server.kill('SIGTERM');
  }
})();
