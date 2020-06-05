module.exports = {
  server: {
    port: 3000,
    launchTimeout: 10000,
    command: 'serve ./examples -p 8080'
    // command: `vite --port 8080`
  },
  launch: {
    dumpio: false,
    headless: process.env.HEADLESS !== 'false'
  },
  browser: 'chromium',
  browserContext: 'default'
}
